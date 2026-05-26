import { BaseProvider } from "../base"
import { AnalyticsData } from "./provider"

export const mockAnalyticsData: AnalyticsData[] = [
  { id: "1", timestamp: "2026-05-25T10:00:00Z", value: 45.2, metric: "PM2.5", unit: "μg/m³" },
  { id: "2", timestamp: "2026-05-25T10:00:00Z", value: 68.5, metric: "PM10", unit: "μg/m³" },
  { id: "3", timestamp: "2026-05-25T10:00:00Z", value: 22.8, metric: "Temperature", unit: "°C" },
  { id: "4", timestamp: "2026-05-25T10:00:00Z", value: 65.0, metric: "Humidity", unit: "%" },
]

export const mockChartData: ChartDataPoint[] = [
  { time: "00:00", value: 35 },
  { time: "03:00", value: 32 },
  { time: "06:00", value: 45 },
  { time: "09:00", value: 52 },
  { time: "12:00", value: 48 },
  { time: "15:00", value: 55 },
  { time: "18:00", value: 65 },
  { time: "21:00", value: 58 },
  { time: "23:59", value: 50 }
]

export const mockCorrelationData: CorrelationDataPoint[] = [
  { x: 40, y: 45 },
  { x: 50, y: 55 },
  { x: 60, y: 72 },
  { x: 70, y: 85 },
  { x: 75, y: 78 },
  { x: 80, y: 65 }
]

export const mockSummary = {
  "PM2.5": 45.2,
  "PM10": 68.5,
  "Temperature": 22.8,
  "Humidity": 65.0
}

export interface AnalyticsMockProvider extends BaseProvider<AnalyticsData> {
  getAnalytics(): Promise<AnalyticsData[]>
  getChartData(): Promise<ChartDataPoint[]>
  getCorrelationData(): Promise<CorrelationDataPoint[]>
  getSummary(): Promise<Record<string, number>>
}

export function createAnalyticsMockProvider(): AnalyticsMockProvider {
  return {
    type: "mock",
    async getAll() {
      return mockAnalyticsData
    },
    async getById(id: string) {
      return mockAnalyticsData.find((d) => d.id === id) || null
    },
    async getAnalytics() {
      return mockAnalyticsData
    },
    async getChartData() {
      return mockChartData
    },
    async getCorrelationData() {
      return mockCorrelationData
    },
    async getSummary() {
      return mockSummary
    }
  }
}