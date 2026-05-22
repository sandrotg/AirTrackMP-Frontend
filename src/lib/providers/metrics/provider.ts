import { MetricsData } from "./mock"
import { BaseProvider } from "../base"
import { getProviderType } from "@/lib/config"
import { createMetricsMockProvider } from "./mock"
import { createMetricsApiProvider } from "./api"

export interface MetricsProvider extends BaseProvider<MetricsData> {
  getMetrics(): Promise<MetricsData[]>
}

export function createMetricsProvider(): MetricsProvider {
  const providerType = getProviderType("metrics")

  switch (providerType) {
    case "mock":
      return createMetricsMockProvider()
    case "api":
      return createMetricsApiProvider()
    default:
      return createMetricsMockProvider()
  }
}
