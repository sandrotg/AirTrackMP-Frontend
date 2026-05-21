"use client"

import { useState, useEffect, useMemo } from "react"
import { createMetricsProvider, MetricsProvider, MetricsData } from "@/lib/providers/metrics"
import { mockMetricsData } from "@/lib/providers/metrics/mock"

interface UseMetricsResult {
  metrics: MetricsData[]
  loading: boolean
  error: Error | null
}

export function useMetrics(): UseMetricsResult {
  const [metrics, setMetrics] = useState<MetricsData[]>(mockMetricsData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const provider = useMemo(() => createMetricsProvider(), [])

  useEffect(() => {
    let mounted = true
    
    async function loadData() {
      try {
        const data = await provider.getMetrics()
        if (mounted && data.length > 0) {
          setMetrics(data)
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error("Failed to load metrics"))
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

  return { metrics, loading, error }
}