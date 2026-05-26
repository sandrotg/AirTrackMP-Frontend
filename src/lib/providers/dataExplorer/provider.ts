import { WeeklyDataPoint, ScatterDataPoint } from "./mock"
import { BaseProvider } from "../base"
import { getProviderType } from "@/lib/config"
import { createDataExplorerMockProvider } from "./mock"
import { createDataExplorerApiProvider } from "./api"

export interface DataExplorerProvider extends BaseProvider<WeeklyDataPoint> {
  getWeeklyData(): Promise<WeeklyDataPoint[]>
  getScatterData(): Promise<ScatterDataPoint[]>
}

export function createDataExplorerProvider(): DataExplorerProvider {
  const providerType = getProviderType("dataExplorer")
  switch (providerType) {
    case "mock": return createDataExplorerMockProvider()
    case "api": return createDataExplorerApiProvider()
    default: return createDataExplorerMockProvider()
  }
}