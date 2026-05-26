import { BaseProvider } from "../base"
import { getProviderType } from "@/lib/config"
import { getApiToken } from "@/lib/auth-token"
import { createAnalyticsMockProvider } from "./mock"
import { createAnalyticsApiProvider } from "./api"

export interface AnalyticsData {
  id: string
  timestamp: string
  value: number
  metric: string
  unit: string
}

export interface ChartDataPoint {
  time: string
  value: number
}

export interface CorrelationDataPoint {
  x: number
  y: number
}

export interface AnalyticsProvider extends BaseProvider<AnalyticsData> {
  getAnalytics(): Promise<AnalyticsData[]>
  getChartData(): Promise<ChartDataPoint[]>
  getCorrelationData(): Promise<CorrelationDataPoint[]>
  getSummary(): Promise<Record<string, number>>
}

export function createAnalyticsProvider(): AnalyticsProvider {
  const providerType = getProviderType("analytics")
  const authToken = getApiToken()

  switch (providerType) {
    case "mock":
      return createAnalyticsMockProvider()
    case "api":
      return createAnalyticsApiProvider(authToken)
    default:
      return createAnalyticsMockProvider()
  }
}