import { ChartDataPoint, CorrelationDataPoint, HourlyDataPoint } from "./mock"
import { BaseProvider } from "../base"
import { getProviderType } from "@/lib/config"
import { createMeasurementsMockProvider } from "./mock"

export interface MeasurementsProvider extends BaseProvider<ChartDataPoint> {
  getAqiData(): Promise<ChartDataPoint[]>
  getCorrelationData(): Promise<CorrelationDataPoint[]>
  getHourlyData(): Promise<HourlyDataPoint[]>
}

interface ApiMeasurement {
  id: number
  pm25: number
  pm10: number
  temperature: number
  humidity: number
  recordedAt: string
  node: {
    id: number
    name: string
    location: string
  }
}

export function createMeasurementsProvider(): MeasurementsProvider {
  const providerType = getProviderType("measurements")

  switch (providerType) {
    case "mock":
      return createMeasurementsMockProvider()
    case "api":
      return createMeasurementsApiProvider()
    default:
      return createMeasurementsMockProvider()
  }
}

function createMeasurementsApiProvider(): MeasurementsProvider {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

  return {
    type: "api",
    async getAll() {
      const response = await fetch(`${API_BASE}/api/measurements`)
      if (!response.ok) throw new Error("Failed to fetch measurements")
      const data: ApiMeasurement[] = await response.json()
      return data.slice(-20).map((m) => ({
        time: new Date(m.recordedAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        pm25: m.pm25,
        pm10: m.pm10,
      }))
    },
    async getById(id: string) {
      const response = await fetch(`${API_BASE}/api/measurements/${id}`)
      if (!response.ok) return null
      const m: ApiMeasurement = await response.json()
      return {
        time: new Date(m.recordedAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        pm25: m.pm25,
        pm10: m.pm10,
      }
    },
    async getAqiData() {
      const response = await fetch(`${API_BASE}/api/measurements`)
      if (!response.ok) throw new Error("Failed to fetch AQI data")
      const data: ApiMeasurement[] = await response.json()
      const last24 = data.slice(-24)
      return last24.map((m) => ({
        time: new Date(m.recordedAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        pm25: m.pm25,
        pm10: m.pm10,
      }))
    },
    async getCorrelationData() {
      const response = await fetch(`${API_BASE}/api/measurements`)
      if (!response.ok) throw new Error("Failed to fetch correlation data")
      const data: ApiMeasurement[] = await response.json()
      return data.slice(-50).map((m) => ({
        humidity: m.humidity,
        pollutant: m.pm25,
      }))
    },
    async getHourlyData() {
      const now = new Date()
      const from = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString()
      const to = now.toISOString()
      const response = await fetch(`${API_BASE}/api/measurements?from=${from}&to=${to}&groupBy=hour`)
      if (!response.ok) throw new Error("Failed to fetch hourly data")
      const data: { period: string; avgPm25: number }[] = await response.json()
      return data.map((d) => ({
        hour: new Date(d.period).getHours(),
        value: d.avgPm25,
      }))
    },
  }
}