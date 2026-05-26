import { BaseProvider } from '../base'
import { MetricData } from '@/lib/types'

export interface MetricsData extends MetricData {
    icon?: React.ReactNode
}

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

export const mockMetricsData: MetricsData[] = [
    {
        label: 'PM 2.5',
        value: 67,
        unit: 'μg/m³',
        status: 'critical',
        change: '↑ 12% FROM PREV HOUR',
        changeType: 'up'
    },
    {
        label: 'PM 10',
        value: 45,
        unit: 'μg/m³',
        status: 'moderate',
        change: '↓ 4% FROM PREV HOUR',
        changeType: 'down'
    },
    {
        label: 'Temperature',
        value: 28,
        unit: '°C',
        status: 'normal'
    },
    {
        label: 'Humidity',
        value: 72,
        unit: '%',
        status: 'normal'
    }
]

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

export interface MeasurementRecord {
  id: number
  pm25: number
  pm10: number
  temperature: number
  humidity: number
  recordedAt: string
}

export const mockMeasurementRecords: MeasurementRecord[] = [
  { id: 1, pm25: 45.2, pm10: 38.1, temperature: 28.0, humidity: 72.0, recordedAt: "2026-05-26T10:00:00" },
  { id: 2, pm25: 12.5, pm10: 20.3, temperature: 24.1, humidity: 65.0, recordedAt: "2026-05-26T09:55:00" },
  { id: 3, pm25: 67.8, pm10: 55.2, temperature: 30.2, humidity: 58.0, recordedAt: "2026-05-26T09:50:00" },
  { id: 4, pm25: 38.0, pm10: 42.5, temperature: 26.8, humidity: 70.0, recordedAt: "2026-05-26T09:45:00" },
  { id: 5, pm25: 22.1, pm10: 30.0, temperature: 23.5, humidity: 68.0, recordedAt: "2026-05-26T09:40:00" },
  { id: 6, pm25: 55.3, pm10: 48.7, temperature: 29.0, humidity: 60.0, recordedAt: "2026-05-26T09:35:00" },
  { id: 7, pm25: 35.2, pm10: 40.1, temperature: 27.0, humidity: 71.0, recordedAt: "2026-05-26T09:30:00" },
  { id: 8, pm25: 8.5, pm10: 15.0, temperature: 22.0, humidity: 75.0, recordedAt: "2026-05-26T09:25:00" },
  { id: 9, pm25: 72.0, pm10: 60.5, temperature: 31.5, humidity: 55.0, recordedAt: "2026-05-26T09:20:00" },
  { id: 10, pm25: 28.4, pm10: 35.8, temperature: 25.0, humidity: 69.0, recordedAt: "2026-05-26T09:15:00" },
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

export interface MetricsMockProvider extends BaseProvider<MetricsData> {
    getMetrics(): Promise<MetricsData[]>
    getAqiData(): Promise<ChartDataPoint[]>
    getCorrelationData(): Promise<CorrelationDataPoint[]>
    getHourlyData(): Promise<HourlyDataPoint[]>
    getRawMeasurements(limit?: number): Promise<MeasurementRecord[]>
}

export function createMetricsMockProvider(): MetricsMockProvider {
    return {
        type: 'mock',
        async getAll() {
            return mockMetricsData
        },
        async getById(id: string) {
            return mockMetricsData.find((m) => m.label === id) || null
        },
        async getMetrics() {
            return mockMetricsData
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
        async getRawMeasurements(limit) {
            const records = mockMeasurementRecords
            return limit ? records.slice(-limit) : records
        }
    }
}
