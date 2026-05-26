import { NormativeOption, ThresholdLevel, NotificationChannel, ValidationLog } from "./mock"
import { BaseProvider } from "../base"
import { getProviderType } from "@/lib/config"
import { createThresholdsMockProvider } from "./mock"
import { createThresholdsApiProvider } from "./api"

export interface ThresholdsProvider extends BaseProvider<ThresholdLevel> {
  getNormativeOptions(): Promise<NormativeOption[]>
  getThresholdLevels(): Promise<ThresholdLevel[]>
  getNotificationChannels(): Promise<NotificationChannel[]>
  getValidationLogs(): Promise<ValidationLog[]>
}

export function createThresholdsProvider(): ThresholdsProvider {
  const providerType = getProviderType("thresholds")
  switch (providerType) {
    case "mock": return createThresholdsMockProvider()
    case "api": return createThresholdsApiProvider()
    default: return createThresholdsMockProvider()
  }
}
