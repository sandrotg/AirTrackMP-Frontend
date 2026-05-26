import { EmergencyProvider } from "./provider"
import { getApiToken } from "@/lib/auth-token"
import { Building2, Home, TrafficCone } from "lucide-react"

interface ApiAlert {
  id: number
  type: string
  message: string
  createdAt: string
  node: { id: number; name: string; location: string }
  measurement?: { pm25: number; temperature: number }
}

const authorityIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Home,
  TrafficCone,
}

export function createEmergencyApiProvider(): EmergencyProvider {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

  return {
    type: "api",
    async getAll() {
      const token = getApiToken()
      const res = await fetch(`${API_BASE}/api/alert`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) return []
      const alerts: ApiAlert[] = await res.json()
      return alerts.map(a => ({
        id: `emergency-${a.id}`,
        nodeId: a.node?.name || String(a.id),
        location: a.node?.location || "Unknown",
        value: a.measurement?.pm25 || 0,
        unit: "μg/m³",
        duration: "Active",
        status: a.type.includes("CRITICAL") ? "CRITICAL" : "WARNING",
      }))
    },
    async getById(id: string) {
      const alertId = id.replace("emergency-", "")
      const token = getApiToken()
      const res = await fetch(`${API_BASE}/api/alert/${alertId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) return null
      const a: ApiAlert = await res.json()
      return {
        id: `emergency-${a.id}`,
        nodeId: a.node?.name || String(a.id),
        location: a.node?.location || "Unknown",
        value: a.measurement?.pm25 || 0,
        unit: "μg/m³",
        duration: "Active",
        status: a.type.includes("CRITICAL") ? "CRITICAL" : "WARNING",
      }
    },
    async getActiveAlerts() {
      const all = await this.getAll()
      return all.filter(a => a.status === "CRITICAL" || a.status === "WARNING")
    },
    async getCorrelationData() {
      const token = getApiToken()
      try {
        const res = await fetch(`${API_BASE}/api/measurements`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
        if (!res.ok) return []
        const data = await res.json()
        return data.slice(-20).map((m: { temperature: number; pm25: number }) => ({
          time: String(m.temperature),
          pm25: m.pm25,
          temp: m.temperature,
        }))
      } catch {
        return []
      }
    },
    async getProtocols() {
      return [
        { id: "beta", name: "PROTOCOL BETA: TRAFFIC DIVERSION", description: "Restrict heavy traffic on 40th St and redirect inbound logistics to East Gate bypass.", selected: false },
        { id: "gamma", name: "PROTOCOL GAMMA: INDUSTRIAL PAUSE", description: "Issue mandatory standby order for high-emission facilities within a 2km radius.", selected: false },
        { id: "alpha", name: "PUBLIC ALERT: ADVISORY 1A", description: "Push mobile notifications to residents with high-sensitivity respiratory profiles.", selected: true },
      ]
    },
    async getAuthorities() {
      return [
        { name: "Mayor's Office", icon: authorityIconMap["Building2"], status: "READ", statusColor: "text-status-good" },
        { name: "Environmental Agency", icon: authorityIconMap["Home"], status: "DELIVERED", statusColor: "text-primary" },
        { name: "Traffic Management", icon: authorityIconMap["TrafficCone"], status: "SENT", statusColor: "text-muted-foreground" },
      ]
    },
  }
}
