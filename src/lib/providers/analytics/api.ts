import { AnalyticsData, AnalyticsProvider } from "./provider"

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

function mapToAnalyticsData(measurements: ApiMeasurementWithNode[]): AnalyticsData[] {
  return measurements.flatMap(m => [
    {
      id: `pm25-${m.id}`,
      timestamp: m.recordedAt,
      value: m.pm25,
      metric: "PM2.5",
      unit: "μg/m³"
    },
    {
      id: `pm10-${m.id}`,
      timestamp: m.recordedAt,
      value: m.pm10,
      metric: "PM10",
      unit: "μg/m³"
    },
    {
      id: `temp-${m.id}`,
      timestamp: m.recordedAt,
      value: m.temperature,
      metric: "Temperature",
      unit: "°C"
    },
    {
      id: `humidity-${m.id}`,
      timestamp: m.recordedAt,
      value: m.humidity,
      metric: "Humidity",
      unit: "%"
    }
  ])
}

export function createAnalyticsApiProvider(authToken: string | null = null): AnalyticsProvider {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

  async function fetchWithAuth(url: string): Promise<Response> {
    const headers: HeadersInit = {}
    if (authToken && typeof window !== "undefined") {
      headers.Authorization = `Bearer ${authToken}`
    }
    return fetch(url, { headers })
  }

  async function fetchMeasurements(): Promise<ApiMeasurementWithNode[]> {
    const res = await fetchWithAuth(`${API_BASE}/api/measurements`)
    if (!res.ok) throw new Error("Failed to fetch measurements")
    return res.json()
  }

  return {
    type: 'api',
    async getAll() {
      const measurements = await fetchMeasurements()
      return mapToAnalyticsData(measurements)
    },
    async getById(id: string) {
      const all = await this.getAll()
      return all.find((m) => m.id === id) || null
    },
    async getAnalytics() {
      return this.getAll()
    },
    async getChartData() {
      const measurements = await fetchMeasurements()
      const last24 = measurements.slice(-24)
      return last24.map((m) => ({
        time: new Date(m.recordedAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        value: m.pm25 // Using PM2.5 for chart data by default
      }))
    },
    async getCorrelationData() {
      const measurements = await fetchMeasurements()
      return measurements.slice(-50).map((m) => ({
        x: m.humidity,
        y: m.pm25
      }))
    },
    async getSummary() {
      const measurements = await fetchMeasurements()
      const latest = measurements.reduce((latest, current) => 
        new Date(latest.recordedAt) > new Date(current.recordedAt) ? latest : current
      )
      
      return {
        "PM2.5": latest.pm25,
        "PM10": latest.pm10,
        "Temperature": latest.temperature,
        "Humidity": latest.humidity
      }
    }
  }
}