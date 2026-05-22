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

export type MapProvider = BaseProvider<MapNode>

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
