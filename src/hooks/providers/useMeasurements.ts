"use client"

import { useMetrics } from "./useMetrics"

interface UseMeasurementsResult {
  hourlyData: { hour: number; value: number }[]
}

export function useMeasurements(): UseMeasurementsResult {
  const { hourlyData } = useMetrics()
  return { hourlyData }
}
