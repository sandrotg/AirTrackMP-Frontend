"use client"

import { useState, useEffect, useMemo } from "react"
import { createDataExplorerProvider, WeeklyDataPoint, ScatterDataPoint } from "@/lib/providers/dataExplorer"
import { getApiToken } from "@/lib/auth-token"
import { showErrorToast } from "@/lib/error-handler"

interface UseDataExplorerResult {
  weeklyData: WeeklyDataPoint[]
  scatterData: ScatterDataPoint[]
  loading: boolean
  error: Error | null
}

export function useDataExplorer(): UseDataExplorerResult {
  const [weeklyData, setWeeklyData] = useState<WeeklyDataPoint[]>([])
  const [scatterData, setScatterData] = useState<ScatterDataPoint[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const provider = useMemo(() => createDataExplorerProvider(), [])
  const token = getApiToken()

  useEffect(() => {
    let mounted = true

    async function loadData() {
      setLoading(true)
      try {
        const [weekly, scatter] = await Promise.all([
          provider.getWeeklyData(),
          provider.getScatterData(),
        ])
        if (mounted) {
          setWeeklyData(weekly)
          setScatterData(scatter)
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error("Failed to load data explorer"))
          showErrorToast(err, "Failed to load data explorer")
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
  }, [provider, token])

  return { weeklyData, scatterData, loading, error }
}