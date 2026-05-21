import { MetricsData } from "./mock"
import { BaseProvider } from "../base"
import { getProviderType } from "@/lib/config"
import { createMetricsMockProvider } from "./mock"

export interface MetricsProvider extends BaseProvider<MetricsData> {
  getMetrics(): Promise<MetricsData[]>
}

interface ApiMeasurement {
  id: number
  pm25: number
  pm10: number
  temperature: number
  humidity: number
  recordedAt: string
}

function getStatus(value: number, type: string): "critical" | "warning" | "moderate" | "normal" {
  if (type === "pm25") {
    if (value > 55) return "critical"
    if (value > 35) return "warning"
    if (value > 20) return "moderate"
    return "normal"
  }
  if (type === "pm10") {
    if (value > 150) return "critical"
    if (value > 100) return "warning"
    if (value > 50) return "moderate"
    return "normal"
  }
  return "normal"
}

export function createMetricsProvider(): MetricsProvider {
  const providerType = getProviderType("metrics")

  switch (providerType) {
    case "mock":
      return createMetricsMockProvider()
    case "api":
      return createMetricsApiProvider()
    default:
      return createMetricsMockProvider()
  }
}

function createMetricsApiProvider(): MetricsProvider {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

  async function fetchLatestWithHistory(): Promise<{ latest: ApiMeasurement[]; previous: ApiMeasurement[] }> {
    const now = new Date()
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)
    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000)

    const currentRes = await fetch(`${API_BASE}/api/measurements?from=${oneHourAgo.toISOString()}&to=${now.toISOString()}`)
    const prevRes = await fetch(`${API_BASE}/api/measurements?from=${twoHoursAgo.toISOString()}&to=${oneHourAgo.toISOString()}`)

    const current: ApiMeasurement[] = currentRes.ok ? await currentRes.json() : []
    const previous: ApiMeasurement[] = prevRes.ok ? await prevRes.json() : []

    return { latest: current, previous }
  }

  return {
    type: "api",
    async getAll() {
      const { latest, previous } = await fetchLatestWithHistory()
      if (latest.length === 0) return []

      const avg = (arr: ApiMeasurement[], field: keyof ApiMeasurement) =>
        arr.length > 0 ? arr.reduce((sum, m) => sum + (Number(m[field]) || 0), 0) / arr.length : 0

      const currentPm25 = avg(latest, "pm25")
      const prevPm25 = avg(previous, "pm25")
      const pm25Change = prevPm25 > 0 ? ((currentPm25 - prevPm25) / prevPm25) * 100 : 0

      const currentPm10 = avg(latest, "pm10")
      const prevPm10 = avg(previous, "pm10")
      const pm10Change = prevPm10 > 0 ? ((currentPm10 - prevPm10) / prevPm10) * 100 : 0

      const currentTemp = avg(latest, "temperature")
      const currentHum = avg(latest, "humidity")

      return [
        {
          label: "PM 2.5",
          value: Math.round(currentPm25),
          unit: "μg/m³",
          status: getStatus(currentPm25, "pm25"),
          change: `${pm25Change >= 0 ? "↑" : "↓"} ${Math.abs(Math.round(pm25Change))}% FROM PREV HOUR`,
          changeType: pm25Change >= 0 ? "up" : "down",
        },
        {
          label: "PM 10",
          value: Math.round(currentPm10),
          unit: "μg/m³",
          status: getStatus(currentPm10, "pm10"),
          change: `${pm10Change >= 0 ? "↑" : "↓"} ${Math.abs(Math.round(pm10Change))}% FROM PREV HOUR`,
          changeType: pm10Change >= 0 ? "up" : "down",
        },
        {
          label: "Temperature",
          value: Math.round(currentTemp * 10) / 10,
          unit: "°C",
          status: "normal",
        },
        {
          label: "Humidity",
          value: Math.round(currentHum),
          unit: "%",
          status: "normal",
        },
      ]
    },
    async getById(id: string) {
      const metrics = await this.getAll()
      return metrics.find((m) => m.label === id) || null
    },
    async getMetrics() {
      return this.getAll()
    },
  }
}