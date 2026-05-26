import { BaseProvider } from "../base"

export interface ResourceDataPoint {
  time: string
  cpu: number
  ram: number
}

export interface ContainerHealth {
  name: string
  id: string
  status: string
  color: string
}

export interface DiagnosticLogEntry {
  time: string
  type: string
  message: string
  color: string
}

export const mockResourceData: ResourceDataPoint[] = [
  { time: "00:00", cpu: 35, ram: 45 },
  { time: "04:00", cpu: 28, ram: 42 },
  { time: "08:00", cpu: 45, ram: 55 },
  { time: "12:00", cpu: 62, ram: 68 },
  { time: "16:00", cpu: 78, ram: 72 },
  { time: "20:00", cpu: 85, ram: 78 },
  { time: "23:59", cpu: 55, ram: 60 },
]

export const mockContainers: ContainerHealth[] = [
  { name: "Spring Gateway", id: "SG-4092-A", status: "HEALTHY", color: "bg-green-500" },
  { name: "Message Broker", id: "MB-8812-B", status: "CONGESTED", color: "bg-yellow-500" },
  { name: "IA Analytics Module", id: "IA-9900-M", status: "STABLE", color: "bg-green-500" },
]

export const mockDiagnosticLogs: DiagnosticLogEntry[] = [
  { time: "14:32:01", type: "SYSTEM", message: "Authentication handshake successful with VPC-991.", color: "text-green-400" },
  { time: "14:32:05", type: "EVENT_PROCESSOR", message: "Frequency adjusted to 450ms based on traffic analysis.", color: "text-yellow-400" },
  { time: "14:32:10", type: "HEALTH_CHECK", message: "Spring Container nodes responding within nominal limits (2ms).", color: "text-green-400" },
  { time: "14:32:12", type: "METRICS", message: "CPU utilization peaked at 42% on Node-A.", color: "text-blue-400" },
  { time: "14:32:15", type: "DB_UTIL", message: "Backup scheduled for 00:00 UTC remains pending.", color: "text-muted-foreground" },
]

export interface SystemMockProvider extends BaseProvider<ResourceDataPoint> {
  getResourceData(): Promise<ResourceDataPoint[]>
  getContainers(): Promise<ContainerHealth[]>
  getDiagnosticLogs(): Promise<DiagnosticLogEntry[]>
}

export function createSystemMockProvider(): SystemMockProvider {
  return {
    type: "mock",
    async getAll() { return mockResourceData },
    async getById(id: string) { return mockResourceData.find(r => r.time === id) || null },
    async getResourceData() { return mockResourceData },
    async getContainers() { return mockContainers },
    async getDiagnosticLogs() { return mockDiagnosticLogs },
  }
}