"use client"

import { useState, useEffect, useMemo } from "react"
import { createMeasurementsProvider, MeasurementsProvider, ChartDataPoint, CorrelationDataPoint, HourlyDataPoint } from "@/lib/providers/measurements"
import { mockAqiData, mockCorrelationData, mockHourlyData } from "@/lib/providers/measurements/mock"

interface UseMeasurementsResult {
  aqiData: ChartDataPoint[]
  correlationData: CorrelationDataPoint[]
  hourlyData: HourlyDataPoint[]
  loading: boolean
  error: Error | null
}

export function useMeasurements(): UseMeasurementsResult {
  const [aqiData, setAqiData] = useState<ChartDataPoint[]>(mockAqiData)
  const [correlationData, setCorrelationData] = useState<CorrelationDataPoint[]>(mockCorrelationData)
  const [hourlyData, setHourlyData] = useState<HourlyDataPoint[]>(mockHourlyData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const provider = useMemo(() => createMeasurementsProvider(), [])

  useEffect(() => {
    let mounted = true
    
    async function loadData() {
      try {
        const [aqi, correlation, hourly] = await Promise.all([
          provider.getAqiData(),
          provider.getCorrelationData(),
          provider.getHourlyData(),
        ])
        if (mounted) {
          if (aqi.length > 0) setAqiData(aqi)
          if (correlation.length > 0) setCorrelationData(correlation)
          if (hourly.length > 0) setHourlyData(hourly)
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error("Failed to load measurements"))
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadData()

    return () => {
      mounted = false
    }
  }, [provider])

  return { aqiData, correlationData, hourlyData, loading, error }
}