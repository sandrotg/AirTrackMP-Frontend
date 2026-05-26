import { DiagnosticsProvider } from "./provider"
import { LogEntry, HexDataRow } from "./mock"
import { getApiToken } from "@/lib/auth-token"

export function createDiagnosticsApiProvider(): DiagnosticsProvider {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

  const getAuthHeaders = (): HeadersInit => ({
    Authorization: `Bearer ${getApiToken()}`,
  })

  return {
    type: "api",
    async getAll() {
      const res = await fetch(`${API_BASE}/api/measurements`, { headers: getAuthHeaders() })
      if (!res.ok) return generateMockLogs()
      const data = await res.json()
      return data.slice(-15).map((m: { id: number; recordedAt: string; pm25: number; pm10: number; temperature: number; humidity: number }) => ({
        time: new Date(m.recordedAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        type: m.pm25 > 55 ? "ERROR" : m.pm25 > 35 ? "WARN" : "INFO",
        tag: "MQTT",
        message: `PM2.5: ${m.pm25.toFixed(1)}, PM10: ${m.pm10.toFixed(1)}, Temp: ${m.temperature}°C, Hum: ${m.humidity}%`,
        color: m.pm25 > 55 ? "text-red-400" : m.pm25 > 35 ? "text-yellow-400" : "text-blue-400",
      }))
    },
    async getById(id: string) {
      const logs = await this.getAll()
      return logs.find(l => l.time === id) || null
    },
    async getLogEntries() {
      return this.getAll()
    },
    async getHexData() {
      const res = await fetch(`${API_BASE}/api/measurements`, { headers: getAuthHeaders() })
      if (!res.ok) return generateMockHexData()
      const data = await res.json()
      return data.slice(-5).map((m: { id: number; pm25: number }, i: number) => ({
        offset: `00000${i * 16}`,
        bytes: Array(16).fill(0).map((_, j) => `${(m.pm25 + i * j).toString(16).padStart(2, "0").toUpperCase()}`).join(" "),
        ascii: "DATA_FROM_API",
      }))
    },
  }
}

function generateMockLogs(): LogEntry[] {
  const now = new Date()
  return Array.from({ length: 10 }, (_, i) => ({
    time: new Date(now.getTime() - i * 5000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    type: i % 3 === 0 ? "ERROR" : i % 2 === 0 ? "WARN" : "INFO",
    tag: i % 2 === 0 ? "MQTT" : "SPRING_BOOT",
    message: `API unavailable - simulated log entry ${i + 1}`,
    color: i % 3 === 0 ? "text-red-400" : i % 2 === 0 ? "text-yellow-400" : "text-blue-400",
  }))
}

function generateMockHexData(): HexDataRow[] {
  return Array.from({ length: 5 }, (_, i) => ({
    offset: `00000${i * 16}`,
    bytes: Array(16).fill(0).map((_, j) => `${((i * 16 + j) % 256).toString(16).padStart(2, "0").toUpperCase()}`).join(" "),
    ascii: "SIMULATED",
  }))
}
