import { MapProvider, type SensorNodeData } from "./provider"

export interface MapNode {
  id: string
  name: string
  location: string
  longitude: number
  latitude: number
  status: "critical" | "warning" | "normal"
  pm25: number
  pm10: number
}

// Mock sensor node data matching what the component expects
export const mockSensorNodes: SensorNodeData[] = [
  {
    id: 1,
    name: "IND-001",
    location: "Zona Industrial",
    latitude: 19.4226,
    longitude: -99.0832,
    status: "ACTIVE",
    model: "ESP32-Sensor-Pro",
    battery: 87,
    batteryReplace: "Mar 2025",
    mac: "A4:CF:12:34:56:78",
    rssi: "-62 dBm",
    firmware: "v2.4.1-stable",
    latestPm25: 68,
    latestPm10: 120,
    latestTemperature: 28.5,
    latestHumidity: 65,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 2,
    name: "CTR-002",
    location: "Zona Centro",
    latitude: 19.4426,
    longitude: -99.1332,
    status: "ACTIVE",
    model: "ESP32-Sensor-Basic",
    battery: 92,
    batteryReplace: "Jun 2025",
    mac: "A4:CF:12:34:56:79",
    rssi: "-58 dBm",
    firmware: "v2.4.1-stable",
    latestPm25: 18,
    latestPm10: 35,
    latestTemperature: 24.2,
    latestHumidity: 58,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 3,
    name: "NRT-003",
    location: "Zona Norte",
    latitude: 19.4826,
    longitude: -99.1432,
    status: "ACTIVE",
    model: "ESP32-Sensor-Pro",
    battery: 76,
    batteryReplace: "Feb 2025",
    mac: "A4:CF:12:34:56:7A",
    rssi: "-65 dBm",
    firmware: "v2.4.1-stable",
    latestPm25: 22,
    latestPm10: 40,
    latestTemperature: 26.8,
    latestHumidity: 72,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 4,
    name: "SUR-004",
    location: "Zona Sur",
    latitude: 19.3826,
    longitude: -99.1232,
    status: "MAINTENANCE",
    model: "ESP32-Sensor-Basic",
    battery: 34,
    batteryReplace: "Immediate",
    mac: "A4:CF:12:34:56:7B",
    rssi: "-71 dBm",
    firmware: "v2.3.2",
    latestPm25: 38,
    latestPm10: 65,
    latestTemperature: 25.1,
    latestHumidity: 60,
    lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
  },
  {
    id: 5,
    name: "ORT-005",
    location: "Zona Oriente",
    latitude: 19.4326,
    longitude: -99.0732,
    status: "ACTIVE",
    model: "ESP32-Sensor-Pro",
    battery: 95,
    batteryReplace: "Aug 2025",
    mac: "A4:CF:12:34:56:7C",
    rssi: "-55 dBm",
    firmware: "v2.4.1-stable",
    latestPm25: 15,
    latestPm10: 28,
    latestTemperature: 23.9,
    latestHumidity: 52,
    lastUpdated: new Date().toISOString(),
  },
]

export function createMapMockProvider(): MapProvider {
  return {
    type: "mock",
    async getAll() {
      // Convert sensor nodes to map nodes for backward compatibility
      return mockSensorNodes.map(node => ({
        id: `sensor-${node.id}`,
        name: node.name,
        location: node.location,
        longitude: node.longitude,
        latitude: node.latitude,
        // Determine status based on PM2.5 levels for map display
        status: node.latestPm25 > 55 ? "critical" : node.latestPm25 > 20 ? "warning" : "normal",
        pm25: node.latestPm25,
        pm10: node.latestPm10,
      }))
    },
    async getById(id: string) {
      const nodeId = parseInt(id.replace("sensor-", ""))
      const node = mockSensorNodes.find(n => n.id === nodeId)
      if (!node) return null
      
      return {
        id: `sensor-${node.id}`,
        name: node.name,
        location: node.location,
        longitude: node.longitude,
        latitude: node.latitude,
        // Determine status based on PM2.5 levels for map display
        status: node.latestPm25 > 55 ? "critical" : node.latestPm25 > 20 ? "warning" : "normal",
        pm25: node.latestPm25,
        pm10: node.latestPm10,
      }
    },
    async getSensorNodes() {
      return mockSensorNodes
    },
  }
}
