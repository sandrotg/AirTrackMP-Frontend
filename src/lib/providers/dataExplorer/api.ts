import { DataExplorerProvider } from "./provider"
import { WeeklyDataPoint, ScatterDataPoint, mockWeeklyData, mockScatterData } from "./mock"
import { getApiToken } from "@/lib/auth-token"
import { createMetricsProvider } from "@/lib/providers/metrics"

const DAY_NAMES = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

export function createDataExplorerApiProvider(): DataExplorerProvider {
  const metrics = createMetricsProvider(getApiToken())

  return {
    type: "api",
    async getAll() {
      return this.getWeeklyData()
    },
    async getById(id: string) {
      const data = await this.getWeeklyData()
      return data.find(d => d.day === id) || null
    },
    async getWeeklyData() {
      const measurements = await metrics.getRawMeasurements(100)
      if (measurements.length === 0) return mockWeeklyData

      const byDay: Record<number, { pm25: number[]; pm10: number[] }> = {}

      measurements.forEach(m => {
        const day = new Date(m.recordedAt).getDay()
        if (!byDay[day]) byDay[day] = { pm25: [], pm10: [] }
        byDay[day].pm25.push(m.pm25)
        byDay[day].pm10.push(m.pm10)
      })

      return Object.entries(byDay).map(([dayIndex, values]) => ({
        day: DAY_NAMES[Number(dayIndex)],
        pm25: Math.round(values.pm25.reduce((a, b) => a + b, 0) / values.pm25.length),
        pm10: Math.round(values.pm10.reduce((a, b) => a + b, 0) / values.pm10.length),
      }))
    },
    async getScatterData() {
      const measurements = await metrics.getRawMeasurements(50)
      if (measurements.length === 0) return mockScatterData

      return measurements.map(m => ({
        humidity: Math.round(m.humidity),
        pm10: Math.round(m.pm10),
        z: Math.round(m.pm25 * 2),
      }))
    },
  }
}
