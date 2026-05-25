"use client"

import { useState, useEffect, useMemo } from "react"
import { createPredictionsProvider, PredictionsProvider, PredictionDataPoint, ProbabilityZone, InfluenceFactor, ForecastingData } from "@/lib/providers/predictions"
import { mockPredictionData, mockProbabilityZones, mockInfluenceFactors, mockForecastingData } from "@/lib/providers/predictions/mock"

interface UsePredictionsResult {
  predictionData: PredictionDataPoint[]
  probabilityZones: ProbabilityZone[]
  influenceFactors: InfluenceFactor[]
  forecastingData: ForecastingData | null
  loading: boolean
  error: Error | null
}

export function usePredictions(): UsePredictionsResult {
  const [predictionData, setPredictionData] = useState<PredictionDataPoint[]>(mockPredictionData)
  const [probabilityZones, setProbabilityZones] = useState<ProbabilityZone[]>(mockProbabilityZones)
  const [influenceFactors, setInfluenceFactors] = useState<InfluenceFactor[]>(mockInfluenceFactors)
  const [forecastingData, setForecastingData] = useState<ForecastingData>(mockForecastingData ?? {
    confidenceInterval: 0,
    processingNode: "",
    riskLevel: "",
    aqiPrediction: 0,
    peakPollutant: "",
    inversionProbability: 0,
    aiInsight: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const provider = useMemo(() => createPredictionsProvider(), [])

  useEffect(() => {
    let mounted = true
    
    async function loadData() {
      try {
        const [predictions, zones, factors, forecast] = await Promise.all([
          provider.getPredictionData(),
          provider.getProbabilityZones(),
          provider.getInfluenceFactors(),
          provider.getForecastingData(),
        ])
        if (mounted) {
          if (predictions.length > 0) setPredictionData(predictions)
          if (zones.length > 0) setProbabilityZones(zones)
          if (factors.length > 0) setInfluenceFactors(factors)
          if (forecast) setForecastingData(forecast)
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error("Failed to load predictions"))
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

  return { predictionData, probabilityZones, influenceFactors, forecastingData, loading, error }
}