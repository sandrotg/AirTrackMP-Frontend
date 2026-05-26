import { MetricsData } from "./mock"
import { BaseProvider } from "../base"
import { getProviderType } from "@/lib/config"
import { createMetricsMockProvider } from "./mock"
import { createMetricsApiProvider } from "./api"

export interface ChartDataPoint {
  time: string
  pm25: number
  pm10: number
}

export interface CorrelationDataPoint {
  humidity: number
  pollutant: number
}

export interface HourlyDataPoint {
  hour: number
  value: number
}

export interface MetricsProvider extends BaseProvider<MetricsData> {
  getMetrics(): Promise<MetricsData[]>
  getAqiData(): Promise<ChartDataPoint[]>
  getCorrelationData(): Promise<CorrelationDataPoint[]>
  getHourlyData(): Promise<HourlyDataPoint[]>
}

export function createMetricsProvider(authToken: string | null = null): MetricsProvider {
    const providerType = getProviderType("metrics")

    switch (providerType) {
        case "mock":
            return createMetricsMockProvider()
        case "api":
            return createMetricsApiProvider(authToken)
        default:
            return createMetricsMockProvider()
    }
}
