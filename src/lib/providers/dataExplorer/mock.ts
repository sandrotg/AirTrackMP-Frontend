import { BaseProvider } from "../base"

export interface WeeklyDataPoint {
  day: string
  pm25: number
  pm10: number
}

export interface ScatterDataPoint {
  humidity: number
  pm10: number
  z: number
}

export const mockWeeklyData: WeeklyDataPoint[] = [
  { day: "MON", pm25: 28, pm10: 42 },
  { day: "TUE", pm25: 35, pm10: 52 },
  { day: "WED", pm25: 48, pm10: 68 },
  { day: "THU", pm25: 52, pm10: 75 },
  { day: "FRI", pm25: 58, pm10: 72 },
  { day: "SAT", pm25: 45, pm10: 65 },
  { day: "SUN", pm25: 38, pm10: 55 },
]

export const mockScatterData: ScatterDataPoint[] = [
  { humidity: 20, pm10: 15, z: 100 },
  { humidity: 35, pm10: 28, z: 100 },
  { humidity: 50, pm10: 45, z: 100 },
  { humidity: 65, pm10: 55, z: 100 },
  { humidity: 80, pm10: 72, z: 100 },
  { humidity: 90, pm10: 85, z: 100 },
]

export interface DataExplorerMockProvider extends BaseProvider<WeeklyDataPoint> {
  getWeeklyData(): Promise<WeeklyDataPoint[]>
  getScatterData(): Promise<ScatterDataPoint[]>
}

export function createDataExplorerMockProvider(): DataExplorerMockProvider {
  return {
    type: "mock",
    async getAll() { return mockWeeklyData },
    async getById(id: string) { return mockWeeklyData.find(d => d.day === id) || null },
    async getWeeklyData() { return mockWeeklyData },
    async getScatterData() { return mockScatterData },
  }
}