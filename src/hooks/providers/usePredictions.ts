"use client"

import { useState, useEffect, useMemo } from "react"
import { createPredictionsProvider, PredictionDataPoint, ProbabilityZone, InfluenceFactor, ForecastingData } from "@/lib/providers/predictions"
import { getApiToken } from "@/lib/auth-token"
import { showErrorToast } from "@/lib/error-handler"

const defaultForecastingData: ForecastingData = {
  confidenceInterval: 0,
  processingNode: "",
  riskLevel: "",
  aqiPrediction: 0,
  peakPollutant: "",
  inversionProbability: 0,
  aiInsight: "",
}

interface UsePredictionsResult {
  predictionData: PredictionDataPoint[]
  probabilityZones: ProbabilityZone[]
  influenceFactors: InfluenceFactor[]
  forecastingData: ForecastingData
  loading: boolean
  error: Error | null
}

export function usePredictions(): UsePredictionsResult {
  const [predictionData, setPredictionData] = useState<PredictionDataPoint[]>([])
  const [probabilityZones, setProbabilityZones] = useState<ProbabilityZone[]>([])
  const [influenceFactors, setInfluenceFactors] = useState<InfluenceFactor[]>([])
  const [forecastingData, setForecastingData] = useState<ForecastingData>(defaultForecastingData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const provider = useMemo(() => createPredictionsProvider(), [])
  const token = getApiToken()

  useEffect(() => {
    let mounted = true

    async function loadData() {
      setLoading(true)
      try {
        const [predictions, zones, factors, forecast] = await Promise.all([
          provider.getPredictionData(),
          provider.getProbabilityZones(),
          provider.getInfluenceFactors(),
          provider.getForecastingData(),
        ])
        if (mounted) {
          setPredictionData(predictions)
          setProbabilityZones(zones)
          setInfluenceFactors(factors)
          setForecastingData(forecast)
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error("Failed to load predictions"))
          showErrorToast(err, "Failed to load predictions")
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

  return { predictionData, probabilityZones, influenceFactors, forecastingData, loading, error }
}