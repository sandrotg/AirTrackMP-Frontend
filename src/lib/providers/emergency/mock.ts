import { BaseProvider } from "../base"
import { Building2, Home, TrafficCone } from "lucide-react"

export interface EmergencyAlert {
  nodeId: string
  location: string
  value: number
  duration: string
  status: "CRITICAL" | "WARNING"
}

export interface CorrelationDataPoint {
  time: string
  pm25: number
  temp: number
}

export interface Protocol {
  id: string
  name: string
  description: string
  selected: boolean
}

export interface Authority {
  name: string
  icon: React.ComponentType<{ className?: string }>
  status: string
  statusColor: string
}

export const mockActiveAlerts: EmergencyAlert[] = [
  { nodeId: "NODE-7724", location: "Harbor District - North Quay", value: 142.8, duration: "02:14:10", status: "CRITICAL" },
  { nodeId: "NODE-4189", location: "Downtown Transit Hub", value: 88.5, duration: "00:45:02", status: "WARNING" },
  { nodeId: "NODE-9022", location: "Industrial Sector 4", value: 112.1, duration: "01:05:33", status: "CRITICAL" },
]

export const mockCorrelationData: CorrelationDataPoint[] = [
  { time: "1", pm25: 45, temp: 22 },
  { time: "2", pm25: 52, temp: 23 },
  { time: "3", pm25: 48, temp: 24 },
  { time: "4", pm25: 65, temp: 25 },
  { time: "5", pm25: 58, temp: 24 },
  { time: "6", pm25: 72, temp: 26 },
  { time: "7", pm25: 68, temp: 25 },
]

export const mockProtocols: Protocol[] = [
  { id: "beta", name: "PROTOCOL BETA: TRAFFIC DIVERSION", description: "Restrict heavy traffic on 40th St and redirect inbound logistics to East Gate bypass.", selected: true },
  { id: "gamma", name: "PROTOCOL GAMMA: INDUSTRIAL PAUSE", description: "Issue mandatory standby order for high-emission facilities within a 2km radius.", selected: false },
  { id: "alert", name: "PUBLIC ALERT: ADVISORY 1A", description: "Push mobile notifications to residents with high-sensitivity respiratory profiles.", selected: false },
]

export const mockAuthorities: Authority[] = [
  { name: "Mayor's Office", icon: Building2, status: "READ", statusColor: "text-status-good" },
  { name: "Environmental Agency", icon: Home, status: "DELIVERED", statusColor: "text-primary" },
  { name: "Traffic Management", icon: TrafficCone, status: "SENT", statusColor: "text-muted-foreground" },
]

export interface EmergencyMockProvider extends BaseProvider<EmergencyAlert> {
  getActiveAlerts(): Promise<EmergencyAlert[]>
  getCorrelationData(): Promise<CorrelationDataPoint[]>
  getProtocols(): Promise<Protocol[]>
  getAuthorities(): Promise<Authority[]>
}

export function createEmergencyMockProvider(): EmergencyMockProvider {
  return {
    type: "mock",
    async getAll() { return mockActiveAlerts },
    async getById(id: string) { return mockActiveAlerts.find(a => a.nodeId === id) || null },
    async getActiveAlerts() { return mockActiveAlerts },
    async getCorrelationData() { return mockCorrelationData },
    async getProtocols() { return mockProtocols },
    async getAuthorities() { return mockAuthorities },
  }
}