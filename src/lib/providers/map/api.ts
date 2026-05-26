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

export function createMapApiProvider(authToken: string | null = null): MapProvider {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

    async function fetchWithAuth(url: string): Promise<Response> {
        const headers: HeadersInit = {}
        if (authToken && typeof window !== "undefined") {
            headers.Authorization = `Bearer ${authToken}`
        }
        return fetch(url, { headers })
    }

    return {
        type: "api",
        async getAll() {
            const res = await fetchWithAuth(`${API_BASE}/api/measurements`)
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
            const res = await fetchWithAuth(`${API_BASE}/api/measurements/node/${nodeId}/latest`)
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
        async getSensorNodes() {
            const res = await fetchWithAuth(`${API_BASE}/api/measurements`)
            if (!res.ok) return []
            const all: ApiMeasurement[] = await res.json()

            const latestByNode = new Map<number, ApiMeasurement>()
            for (const m of all) {
                const existing = latestByNode.get(m.node.id)
                if (!existing || m.recordedAt > existing.recordedAt) {
                    latestByNode.set(m.node.id, m)
                }
            }

            // Convert to sensor node format expected by components
            return Array.from(latestByNode.values()).map((m) => {
                // Map API status to component status
                const apiStatus = m.node.status.toUpperCase()
                let status: "online" | "offline" | "error" = "online"
                
                if (apiStatus === "OFFLINE") {
                    status = "offline"
                } else if (apiStatus === "MAINTENANCE" || apiStatus === "CALIBRATION") {
                    status = "error"
                }

                return {
                    id: m.node.id,
                    name: m.node.name,
                    location: m.node.location,
                    latitude: m.node.latitude,
                    longitude: m.node.longitude,
                    status: status as "ACTIVE" | "INACTIVE" | "MAINTENANCE" | "OFFLINE" | "CALIBRATION",
                    // Provide sensible defaults for missing fields
                    model: "ESP32-Sensor",
                    battery: Math.floor(Math.random() * 100), // Random for demo - in real app would come from device telemetry
                    batteryReplace: status === "offline" ? "Immediate" : "6-12 months",
                    mac: `${m.node.id.toString(16).padStart(12, '0').toUpperCase().match(/.{1,2}/g)?.join(':')}`,
                    rssi: `${-(Math.floor(Math.random() * 30) + 60)} dBm`, // Random RSSI for demo
                    firmware: "v2.4.1-stable",
                    latestPm25: m.pm25,
                    latestPm10: m.pm10,
                    latestTemperature: m.temperature,
                    latestHumidity: m.humidity,
                    lastUpdated: m.recordedAt,
                }
            })
        },
    }
}
