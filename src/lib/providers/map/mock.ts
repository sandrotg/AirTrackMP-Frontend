import { MapProvider } from "./provider"

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

export const mockMapNodes: MapNode[] = [
  {
    id: "sensor-1",
    name: "IND-001",
    location: "Zona Industrial",
    longitude: -99.0832,
    latitude: 19.4226,
    status: "critical",
    pm25: 68,
    pm10: 120,
  },
  {
    id: "sensor-2",
    name: "CTR-002",
    location: "Zona Centro",
    longitude: -99.1332,
    latitude: 19.4426,
    status: "normal",
    pm25: 18,
    pm10: 35,
  },
  {
    id: "sensor-3",
    name: "NRT-003",
    location: "Zona Norte",
    longitude: -99.1432,
    latitude: 19.4826,
    status: "normal",
    pm25: 22,
    pm10: 40,
  },
  {
    id: "sensor-4",
    name: "SUR-004",
    location: "Zona Sur",
    longitude: -99.1232,
    latitude: 19.3826,
    status: "warning",
    pm25: 38,
    pm10: 65,
  },
  {
    id: "sensor-5",
    name: "ORT-005",
    location: "Zona Oriente",
    longitude: -99.0732,
    latitude: 19.4326,
    status: "normal",
    pm25: 15,
    pm10: 28,
  },
]

export function createMapMockProvider(): MapProvider {
  return {
    type: "mock",
    async getAll() {
      return mockMapNodes
    },
    async getById(id: string) {
      return mockMapNodes.find((n) => n.id === id) || null
    },
  }
}
