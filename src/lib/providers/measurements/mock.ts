import { BaseProvider } from "../base"

export interface ChartDataPoint {
  time: string
  pm25: number
  pm10: number
}

export interface CorrelationDataPoint {
  humidity: number
  pollutant: number
}

export interface HourlyDataPoint {
  hour: number
  value: number
}

export const mockAqiData: ChartDataPoint[] = [
  { time: "00:00", pm25: 35, pm10: 28 },
  { time: "03:00", pm25: 32, pm10: 25 },
  { time: "06:00", pm25: 45, pm10: 38 },
  { time: "09:00", pm25: 52, pm10: 42 },
  { time: "12:00", pm25: 48, pm10: 40 },
  { time: "15:00", pm25: 55, pm10: 45 },
  { time: "18:00", pm25: 65, pm10: 52 },
  { time: "21:00", pm25: 58, pm10: 48 },
  { time: "23:59", pm25: 50, pm10: 42 },
]

export const mockCorrelationData: CorrelationDataPoint[] = [
  { humidity: 40, pollutant: 45 },
  { humidity: 50, pollutant: 55 },
  { humidity: 60, pollutant: 72 },
  { humidity: 70, pollutant: 85 },
  { humidity: 75, pollutant: 78 },
  { humidity: 80, pollutant: 65 },
]

export const mockHourlyData: HourlyDataPoint[] = [
  { hour: 0, value: 18.2 },
  { hour: 1, value: 17.5 },
  { hour: 2, value: 16.8 },
  { hour: 3, value: 15.9 },
  { hour: 4, value: 15.2 },
  { hour: 5, value: 16.1 },
  { hour: 6, value: 18.5 },
  { hour: 7, value: 22.3 },
  { hour: 8, value: 28.4 },
  { hour: 9, value: 32.1 },
  { hour: 10, value: 34.8 },
  { hour: 11, value: 36.2 },
  { hour: 12, value: 35.5 },
  { hour: 13, value: 34.1 },
  { hour: 14, value: 33.2 },
  { hour: 15, value: 32.5 },
  { hour: 16, value: 31.8 },
  { hour: 17, value: 29.4 },
  { hour: 18, value: 26.2 },
  { hour: 19, value: 23.5 },
  { hour: 20, value: 21.2 },
  { hour: 21, value: 19.8 },
  { hour: 22, value: 18.9 },
  { hour: 23, value: 18.4 },
]

export interface MeasurementsMockProvider extends BaseProvider<ChartDataPoint> {
  getAqiData(): Promise<ChartDataPoint[]>
  getCorrelationData(): Promise<CorrelationDataPoint[]>
  getHourlyData(): Promise<HourlyDataPoint[]>
}

export function createMeasurementsMockProvider(): MeasurementsMockProvider {
  return {
    type: "mock",
    async getAll() {
      return mockAqiData
    },
    async getById(id: string) {
      return mockAqiData.find((d) => d.time === id) || null
    },
    async getAqiData() {
      return mockAqiData
    },
    async getCorrelationData() {
      return mockCorrelationData
    },
    async getHourlyData() {
      return mockHourlyData
    },
  }
}