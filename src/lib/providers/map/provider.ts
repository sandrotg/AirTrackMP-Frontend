import { BaseProvider } from "../base"
import { getProviderType } from "@/lib/config"
import { createMapMockProvider } from "./mock"
import { createMapApiProvider } from "./api"

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

export interface SensorNodeData {
  id: number
  name: string
  location: string
  latitude: number
  longitude: number
  status: "ACTIVE" | "INACTIVE" | "MAINTENANCE" | "OFFLINE" | "CALIBRATION"
  model?: string
  battery?: number
  batteryReplace?: string
  mac?: string
  rssi?: string
  firmware?: string
  latestPm25: number
  latestPm10: number
  latestTemperature?: number
  latestHumidity?: number
  lastUpdated: string
}

export interface MapProvider extends BaseProvider<MapNode> {
  getSensorNodes(): Promise<SensorNodeData[]>
}

export function createMapProvider(): MapProvider {
  const providerType = getProviderType("map")

  switch (providerType) {
    case "mock":
      return createMapMockProvider()
    case "api":
      return createMapApiProvider()
    default:
      return createMapMockProvider()
  }
}
