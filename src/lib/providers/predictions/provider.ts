import { PredictionDataPoint, ProbabilityZone, InfluenceFactor, ForecastingData } from "./mock"
import { BaseProvider } from "../base"
import { getProviderType } from "@/lib/config"
import { createPredictionsMockProvider } from "./mock"
import { createPredictionsApiProvider } from "./api"

export interface PredictionsProvider extends BaseProvider<PredictionDataPoint> {
  getPredictionData(): Promise<PredictionDataPoint[]>
  getProbabilityZones(): Promise<ProbabilityZone[]>
  getInfluenceFactors(): Promise<InfluenceFactor[]>
  getForecastingData(): Promise<ForecastingData>
}

export function createPredictionsProvider(): PredictionsProvider {
  const providerType = getProviderType("predictions")

  switch (providerType) {
    case "mock":
      return createPredictionsMockProvider()
    case "api":
      return createPredictionsApiProvider()
    default:
      return createPredictionsMockProvider()
  }
}
