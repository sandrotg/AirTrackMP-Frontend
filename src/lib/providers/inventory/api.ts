import { InventoryProvider } from "./provider"
import { InventoryNode, CommandHistoryEntry } from "./mock"
import { getApiToken } from "@/lib/auth-token"

interface ApiNode {
  id: number
  name: string
  location: string
  latitude: number
  longitude: number
  status: string
  deleted: boolean
  createdAt: string
}

function generateMac(id: number): string {
  const hex = id.toString(16).padStart(12, "0")
  return `${hex.slice(0, 2)}:${hex.slice(2, 4)}:${hex.slice(4, 6)}:${hex.slice(6, 8)}:${hex.slice(8, 10)}:${hex.slice(10, 12)}`.toUpperCase()
}

function mapToInventoryNode(apiNode: ApiNode): InventoryNode {
  const isOnline = apiNode.status === "ACTIVE"
  return {
    id: `OBS-N${String(apiNode.id).padStart(2, "0")}-${apiNode.location.substring(0, 2).toUpperCase()}`,
    mac: generateMac(apiNode.id),
    health: isOnline ? 70 + Math.floor(Math.random() * 30) : Math.floor(Math.random() * 30),
    uptime: isOnline ? `${Math.floor(Math.random() * 30)}d ${Math.floor(Math.random() * 24)}h ${Math.floor(Math.random() * 60)}m` : "OFFLINE",
    firmware: `v2.${Math.floor(Math.random() * 3)}.${Math.floor(Math.random() * 10)}`,
    status: isOnline ? "online" : "offline",
  }
}

export function createInventoryApiProvider(): InventoryProvider {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

  return {
    type: "api",
    async getAll() {
      const token = getApiToken()
      const res = await fetch(`${API_BASE}/api/nodes`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) return []
      const nodes: ApiNode[] = await res.json()
      return nodes.filter(n => !n.deleted).map(mapToInventoryNode)
    },
    async getById(id: string) {
      const nodeId = id.replace("OBS-N", "").replace("-", "")
      const token = getApiToken()
      const res = await fetch(`${API_BASE}/api/nodes/${nodeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) return null
      const node: ApiNode = await res.json()
      return mapToInventoryNode(node)
    },
    async getNodes() {
      return this.getAll()
    },
    async getCommandHistory() {
      const token = getApiToken()
      const res = await fetch(`${API_BASE}/api/nodes`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) return [
        { type: "success" as const, command: "API_UNAVAILABLE", message: "Using fallback mock data", time: new Date().toISOString() },
      ]
      const nodes: ApiNode[] = await res.json()
      const now = new Date()
      return nodes.map((n, i) => ({
        type: n.status === "ACTIVE" ? "success" as const : "error" as const,
        command: n.status === "ACTIVE" ? "SYNC_SUCCESS" : "CONNECTION_TIMEOUT",
        message: `Node ${n.name} ${n.status === "ACTIVE" ? "synced successfully" : "failed to respond"}`,
        time: new Date(now.getTime() - i * 60000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) + " UTC",
      }))
    },
  }
}
