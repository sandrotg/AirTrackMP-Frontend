import { AlertLog } from "@/lib/types"
import { BaseProvider } from "../base"
import { getProviderType } from "@/lib/config"
import { createAlertsMockProvider } from "./mock"
import { createAlertsApiProvider } from "./api"

export type AlertsProvider = BaseProvider<AlertLog>

export function createAlertsProvider(): AlertsProvider {
  const providerType = getProviderType("alerts")

  switch (providerType) {
    case "mock":
      return createAlertsMockProvider()
    case "api":
      return createAlertsApiProvider()
    default:
      return createAlertsMockProvider()
  }
}
