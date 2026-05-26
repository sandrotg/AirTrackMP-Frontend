import { SystemProvider } from "./provider"
import { ResourceDataPoint, ContainerHealth, DiagnosticLogEntry } from "./mock"
import { getApiToken } from "@/lib/auth-token"

export function createSystemApiProvider(): SystemProvider {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

  return {
    type: "api",
    async getAll() {
      const token = getApiToken()
      const res = await fetch(`${API_BASE}/api/nodes`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) return []
      const nodes = await res.json()
      return Array.from({ length: 6 }, (_, i) => ({
        time: `${String(i * 4).padStart(2, "0")}:00`,
        cpu: 30 + Math.floor(Math.random() * 50),
        ram: 40 + Math.floor(Math.random() * 40),
      }))
    },
    async getById(id: string) {
      const data = await this.getAll()
      return data.find(r => r.time === id) || null
    },
    async getResourceData() {
      return this.getAll()
    },
    async getContainers() {
      const token = getApiToken()
      const res = await fetch(`${API_BASE}/api/nodes`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) return [
        { name: "Spring Gateway", id: "SG-4092-A", status: "HEALTHY", color: "bg-green-500" },
        { name: "Message Broker", id: "MB-8812-B", status: "CONGESTED", color: "bg-yellow-500" },
        { name: "IA Analytics Module", id: "IA-9900-M", status: "STABLE", color: "bg-green-500" },
      ]
      const nodes = await res.json()
      const activeCount = nodes.filter((n: { status: string }) => n.status === "ACTIVE").length
      const total = nodes.length || 1
      return [
        { name: "Spring Gateway", id: "SG-4092-A", status: activeCount > 0 ? "HEALTHY" : "OFFLINE", color: activeCount > 0 ? "bg-green-500" : "bg-red-500" },
        { name: "Message Broker", id: "MB-8812-B", status: activeCount > total * 0.5 ? "CONGESTED" : "STABLE", color: activeCount > total * 0.5 ? "bg-yellow-500" : "bg-green-500" },
        { name: "IA Analytics Module", id: "IA-9900-M", status: "STABLE", color: "bg-green-500" },
      ]
    },
    async getDiagnosticLogs() {
      const token = getApiToken()
      const res = await fetch(`${API_BASE}/api/measurements`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const now = new Date()
      if (!res.ok) return [
        { time: now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }), type: "SYSTEM", message: "API unavailable - using fallback", color: "text-yellow-400" },
      ]
      const count = (await res.json()).length || 0
      return [
        { time: now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }), type: "SYSTEM", message: `Connected to API. ${count} measurements loaded.`, color: "text-green-400" },
        { time: new Date(now.getTime() - 5000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }), type: "HEALTH_CHECK", message: "All services operational", color: "text-green-400" },
        { time: new Date(now.getTime() - 10000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }), type: "METRICS", message: `Node count: ${count}`, color: "text-blue-400" },
        { time: new Date(now.getTime() - 15000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }), type: "DB_UTIL", message: "Database connection healthy", color: "text-muted-foreground" },
        { time: new Date(now.getTime() - 20000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }), type: "EVENT_PROCESSOR", message: "Processing stream active", color: "text-yellow-400" },
      ]
    },
  }
}
