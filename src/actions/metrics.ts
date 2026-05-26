'use server'

import { createMetricsApiProvider } from '@/lib/providers/metrics/api'

// Server actions for metrics data
export async function fetchMetricsAction(authToken: string | null = null) {
  const provider = createMetricsApiProvider(authToken)
  return await provider.getMetrics()
}

export async function fetchAqiDataAction(authToken: string | null = null) {
  const provider = createMetricsApiProvider(authToken)
  return await provider.getAqiData()
}

export async function fetchCorrelationDataAction(authToken: string | null = null) {
  const provider = createMetricsApiProvider(authToken)
  return await provider.getCorrelationData()
}

export async function fetchHourlyDataAction(authToken: string | null = null) {
  const provider = createMetricsApiProvider(authToken)
  return await provider.getHourlyData()
}

// Combined action to fetch all metrics data
export async function fetchAllMetricsAction(authToken: string | null = null) {
  const provider = createMetricsApiProvider(authToken)
  
  const [
    metrics,
    aqiData,
    correlationData,
    hourlyData
  ] = await Promise.all([
    provider.getMetrics(),
    provider.getAqiData(),
    provider.getCorrelationData(),
    provider.getHourlyData()
  ])
  
  return {
    metrics,
    aqiData,
    correlationData,
    hourlyData
  }
}