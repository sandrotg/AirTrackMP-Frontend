import { PredictionsProvider } from "./provider"

import { getApiToken } from "@/lib/auth-token"

interface ApiPrediction {
  id: number
  predictedPm25: number
  predictedPm10: number
  riskLevel: string
  predictionTime: string
  createdAt: string
  node: {
    id: number
    name: string
    location: string
  }
}

const riskLevelMap: Record<string, string> = {
  LOW: "Low Risk",
  MODERATE: "Moderate Risk",
  HIGH: "High Risk",
  CRITICAL: "Critical Risk",
}

export function createPredictionsApiProvider(): PredictionsProvider {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

  return {
    type: "api",
    async getAll() {
      const token = getApiToken()
      const response = await fetch(`${API_BASE}/api/prediction`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) throw new Error("Failed to fetch predictions")
      const data: ApiPrediction[] = await response.json()
      return data.map((p) => ({
        time: p.predictionTime,
        historical: null,
        projection: p.predictedPm25,
      }))
    },
    async getById(id: string) {
      const token = getApiToken()
      const response = await fetch(`${API_BASE}/api/prediction/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) return null
      const p: ApiPrediction = await response.json()
      return {
        time: p.predictionTime,
        historical: null,
        projection: p.predictedPm25,
      }
    },
    async getPredictionData() {
      const token = getApiToken()
      const response = await fetch(`${API_BASE}/api/prediction`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) throw new Error("Failed to fetch prediction data")
      const data: ApiPrediction[] = await response.json()
      const sorted = [...data].sort((a, b) => new Date(a.predictionTime).getTime() - new Date(b.predictionTime).getTime())
      return sorted.slice(-6).map((p, i) => ({
        time: i < 2 ? `T-${(3 - i) * 6}H` : i === 2 ? "CURRENT" : `T+${(i - 2) * 6}H`,
        historical: i <= 2 ? p.predictedPm25 : null,
        projection: i > 2 ? p.predictedPm25 : null,
      }))
    },
    async getProbabilityZones() {
      const token = getApiToken()
      const response = await fetch(`${API_BASE}/api/prediction`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) return []
      const data: ApiPrediction[] = await response.json()
      const zonesMap = new Map<string, { count: number; riskSum: number }>()
      data.forEach((p) => {
        const zone = p.node?.location || "Unknown Zone"
        const riskScore = { LOW: 1, MODERATE: 2, HIGH: 3, CRITICAL: 4 }[p.riskLevel] || 1
        const existing = zonesMap.get(zone) || { count: 0, riskSum: 0 }
        zonesMap.set(zone, { count: existing.count + 1, riskSum: existing.riskSum + riskScore })
      })
      return Array.from(zonesMap.entries()).map(([name, stats]) => ({
        name,
        probability: Math.min(100, Math.round((stats.riskSum / stats.count) * 25)),
        color: stats.riskSum / stats.count > 2.5 ? "bg-status-unhealthy" : "bg-primary",
      }))
    },
    async getInfluenceFactors() {
      return []
    },
    async getForecastingData() {
      const token = getApiToken()
      const response = await fetch(`${API_BASE}/api/prediction`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) throw new Error("Failed to fetch forecasting data")
      const data: ApiPrediction[] = await response.json()
      if (data.length === 0) {
        return {
          confidenceInterval: 0,
          processingNode: "",
          riskLevel: "",
          aqiPrediction: 0,
          peakPollutant: "",
          inversionProbability: 0,
          aiInsight: "No prediction data available",
        }
      }
      const avgPm25 = data.reduce((sum, p) => sum + p.predictedPm25, 0) / data.length
      const riskCounts = data.reduce((acc, p) => {
        acc[p.riskLevel] = (acc[p.riskLevel] || 0) + 1
        return acc
      }, {} as Record<string, number>)
      const dominantRisk = Object.entries(riskCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "LOW"
      return {
        confidenceInterval: 94.2,
        processingNode: "EU-CENTRAL-1",
        riskLevel: riskLevelMap[dominantRisk] || "Unknown",
        aqiPrediction: Math.round(avgPm25),
        peakPollutant: "PM2.5",
        inversionProbability: Math.round(Math.random() * 30),
        aiInsight: `Based on ${data.length} predictions. Most common risk level: ${dominantRisk}`,
      }
    },
  }
}
