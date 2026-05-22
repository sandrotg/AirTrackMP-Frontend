import { MapProvider, type MapNode } from "./provider"

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
    latitude: number
    longitude: number
    status: string
  }
}

function getAirQualityStatus(pm25: number, pm10: number): MapNode["status"] {
  const byPm25 = pm25 > 55 ? "critical" as const : pm25 > 20 ? "warning" as const : "normal" as const
  const byPm10 = pm10 > 150 ? "critical" as const : pm10 > 50 ? "warning" as const : "normal" as const
  const order = ["normal", "warning", "critical"]
  return order[Math.max(order.indexOf(byPm25), order.indexOf(byPm10))] as MapNode["status"]
}

export function createMapApiProvider(): MapProvider {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

  return {
    type: "api",
    async getAll() {
      const res = await fetch(`${API_BASE}/api/measurements`)
      if (!res.ok) return []
      const all: ApiMeasurement[] = await res.json()

      const latestByNode = new Map<number, ApiMeasurement>()
      for (const m of all) {
        const existing = latestByNode.get(m.node.id)
        if (!existing || m.recordedAt > existing.recordedAt) {
          latestByNode.set(m.node.id, m)
        }
      }

      return Array.from(latestByNode.values()).map((m) => ({
        id: `sensor-${m.node.id}`,
        name: m.node.name,
        location: m.node.location,
        longitude: m.node.longitude,
        latitude: m.node.latitude,
        pm25: m.pm25,
        pm10: m.pm10,
        status: getAirQualityStatus(m.pm25, m.pm10),
      }))
    },
    async getById(id: string) {
      const nodeId = id.replace("sensor-", "")
      const res = await fetch(`${API_BASE}/api/measurements/node/${nodeId}/latest`)
      if (!res.ok) return null
      const data: ApiMeasurement[] = await res.json()
      if (!data.length) return null
      const m = data[0]
      return {
        id: `sensor-${m.node.id}`,
        name: m.node.name,
        location: m.node.location,
        longitude: m.node.longitude,
        latitude: m.node.latitude,
        pm25: m.pm25,
        pm10: m.pm10,
        status: getAirQualityStatus(m.pm25, m.pm10),
      }
    },
  }
}
