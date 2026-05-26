import { MetricsData, MeasurementRecord } from './mock'
import { MetricsProvider } from './provider'

interface ApiMeasurement {
    id: number
    pm25: number
    pm10: number
    temperature: number
    humidity: number
    recordedAt: string
}

interface ApiNodeRef {
    id: number
    name: string
    location: string
    status: string
}

interface ApiMeasurementWithNode extends ApiMeasurement {
    node: ApiNodeRef
}

function getStatus(
    value: number,
    type: string
): 'critical' | 'warning' | 'moderate' | 'normal' {
    if (type === 'pm25') {
        if (value > 55) return 'critical'
        if (value > 35) return 'warning'
        if (value > 20) return 'moderate'
        return 'normal'
    }
    if (type === 'pm10') {
        if (value > 150) return 'critical'
        if (value > 100) return 'warning'
        if (value > 50) return 'moderate'
        return 'normal'
    }
    return 'normal'
}

function avg(arr: ApiMeasurement[], field: keyof ApiMeasurement): number {
    return arr.length > 0
        ? arr.reduce((sum, m) => sum + (Number(m[field]) || 0), 0) / arr.length
        : 0
}

export function createMetricsApiProvider(authToken: string | null = null): MetricsProvider {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'
  
      async function fetchWithAuth(url: string): Promise<Response> {
          const headers: HeadersInit = {}
          if (authToken && typeof window !== "undefined") {
              headers.Authorization = `Bearer ${authToken}`
          }
          return fetch(url, { headers })
      }
  
      async function fetchAllMeasurements(): Promise<ApiMeasurement[]> {
          console.log(`
  Fetching measurements from API at ${API_BASE}
  			`)
          const res = await fetchWithAuth(`${API_BASE}/api/measurements`)
          // console.log({ res })
          if (!res.ok) return []
          const data: ApiMeasurementWithNode[] = await res.json()
          // console.log({ data })
          return data.map(({ node: _, ...m }) => m)
      }
  
      return {
          type: 'api',
          async getAll() {
              const all = await fetchAllMeasurements()
              if (all.length === 0) return []
  
              const now = new Date()
              const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)
              const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000)
  
              const current = all.filter((m) => {
                  const t = new Date(m.recordedAt)
                  return t >= oneHourAgo && t <= now
              })
              const previous = all.filter((m) => {
                  const t = new Date(m.recordedAt)
                  return t >= twoHoursAgo && t < oneHourAgo
              })
  
              const currentPm25 = avg(current, 'pm25')
              const prevPm25 = avg(previous, 'pm25')
              const pm25Change =
                  prevPm25 > 0 ? ((currentPm25 - prevPm25) / prevPm25) * 100 : 0
  
              const currentPm10 = avg(current, 'pm10')
              const prevPm10 = avg(previous, 'pm10')
              const pm10Change =
                  prevPm10 > 0 ? ((currentPm10 - prevPm10) / prevPm10) * 100 : 0
  
              const currentTemp = avg(current, 'temperature')
              const currentHum = avg(current, 'humidity')
  
              return [
                  {
                      label: 'PM 2.5',
                      value: Math.round(currentPm25),
                      unit: 'μg/m³',
                      status: getStatus(currentPm25, 'pm25'),
                      change: `${pm25Change >= 0 ? '↑' : '↓'} ${Math.abs(Math.round(pm25Change))}% FROM PREV HOUR`,
                      changeType: pm25Change >= 0 ? 'up' : 'down'
                  },
                  {
                      label: 'PM 10',
                      value: Math.round(currentPm10),
                      unit: 'μg/m³',
                      status: getStatus(currentPm10, 'pm10'),
                      change: `${pm10Change >= 0 ? '↑' : '↓'} ${Math.abs(Math.round(pm10Change))}% FROM PREV HOUR`,
                      changeType: pm10Change >= 0 ? 'up' : 'down'
                  },
                  {
                      label: 'Temperature',
                      value: Math.round(currentTemp * 10) / 10,
                      unit: '°C',
                      status: 'normal'
                  },
                  {
                      label: 'Humidity',
                      value: Math.round(currentHum),
                      unit: '%',
                      status: 'normal'
                  }
              ]
          },
          async getById(id: string) {
              const metrics = await this.getAll()
              return metrics.find((m) => m.label === id) || null
          },
          async getMetrics() {
              return this.getAll()
          },
          async getAqiData() {
              const res = await fetchWithAuth(`${API_BASE}/api/measurements`)
              if (!res.ok) throw new Error("Failed to fetch AQI data")
              const data: ApiMeasurementWithNode[] = await res.json()
              const last24 = data.slice(-24)
              return last24.map((m) => ({
                  time: new Date(m.recordedAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
                  pm25: m.pm25,
                  pm10: m.pm10,
              }))
          },
          async getCorrelationData() {
              const res = await fetchWithAuth(`${API_BASE}/api/measurements`)
              if (!res.ok) throw new Error("Failed to fetch correlation data")
              const data: ApiMeasurementWithNode[] = await res.json()
              return data.slice(-50).map((m) => ({
                  humidity: m.humidity,
                  pollutant: m.pm25,
              }))
          },
          async getHourlyData() {
              const now = new Date()
              const from = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString()
              const to = now.toISOString()
              const res = await fetchWithAuth(`${API_BASE}/api/measurements?from=${from}&to=${to}&groupBy=hour`)
              if (!res.ok) throw new Error("Failed to fetch hourly data")
              const data: { period: string; avgPm25: number }[] = await res.json()
              return data.map((d) => ({
                  hour: new Date(d.period).getHours(),
                  value: d.avgPm25,
              }))
          },
          async getRawMeasurements(limit) {
              const all = await fetchAllMeasurements()
              if (!limit) return all as MeasurementRecord[]
              return all.slice(-limit) as MeasurementRecord[]
          }
      }
  }
