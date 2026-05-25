import { BaseProvider } from "../base"
import { Cloud, Car } from "lucide-react"

export interface PredictionDataPoint {
  time: string
  historical: number | null
  projection: number | null
}

export interface ProbabilityZone {
  name: string
  probability: number
  color: string
}

export interface InfluenceFactor {
  title: string
  description: string
  icon?: React.ComponentType<{ className?: string }>
}

export interface ForecastingData {
  confidenceInterval: number
  processingNode: string
  riskLevel: string
  aqiPrediction: number
  peakPollutant: string
  inversionProbability: number
  aiInsight: string
}

export const mockPredictionData: PredictionDataPoint[] = [
  { time: "T-12H", historical: 45, projection: null },
  { time: "T-6H", historical: 52, projection: null },
  { time: "CURRENT", historical: 65, projection: 65 },
  { time: "T+6H", historical: null, projection: 58 },
  { time: "T+12H", historical: null, projection: 48 },
  { time: "T+24H", historical: null, projection: 42 },
]

export const mockProbabilityZones: ProbabilityZone[] = [
  { name: "North Zone Alert", probability: 85, color: "bg-cyan-400" },
  { name: "Industrial Corridor", probability: 42, color: "bg-cyan-600" },
  { name: "Metro Residential", probability: 91, color: "bg-red-500" },
]

export const mockInfluenceFactors: InfluenceFactor[] = [
  {
    title: "Atmospheric Saturation",
    description: "High humidity levels (+78%) trapping micro-particulates in the lower troposphere.",
    icon: Cloud,
  },
  {
    title: "Traffic Flow Patterns",
    description: "Congestion peaks correlating with PM2.5 spikes in urban corridors.",
    icon: Car,
  },
]

export const mockForecastingData: ForecastingData = {
  confidenceInterval: 98.4,
  processingNode: "EU-CENTRAL-1",
  riskLevel: "Low Risk",
  aqiPrediction: 22,
  peakPollutant: "NO2 @ 16:00",
  inversionProbability: 12,
  aiInsight: "Thermal inversion patterns suggests a 40% increase in localized PM10 concentration between 02:00 and 05:00 tomorrow.",
}

export interface PredictionsMockProvider extends BaseProvider<PredictionDataPoint> {
  getPredictionData(): Promise<PredictionDataPoint[]>
  getProbabilityZones(): Promise<ProbabilityZone[]>
  getInfluenceFactors(): Promise<InfluenceFactor[]>
  getForecastingData(): Promise<ForecastingData>
}

export function createPredictionsMockProvider(): PredictionsMockProvider {
  return {
    type: "mock",
    async getAll() {
      return mockPredictionData
    },
    async getById(id: string) {
      return mockPredictionData.find((d) => d.time === id) || null
    },
    async getPredictionData() {
      return mockPredictionData
    },
    async getProbabilityZones() {
      return mockProbabilityZones
    },
    async getInfluenceFactors() {
      return mockInfluenceFactors
    },
    async getForecastingData() {
      return mockForecastingData
    },
  }
}