import { EmergencyAlert, CorrelationDataPoint, Protocol, Authority } from "./mock"
import { BaseProvider } from "../base"
import { getProviderType } from "@/lib/config"
import { createEmergencyMockProvider } from "./mock"
import { createEmergencyApiProvider } from "./api"

export interface EmergencyProvider extends BaseProvider<EmergencyAlert> {
  getActiveAlerts(): Promise<EmergencyAlert[]>
  getCorrelationData(): Promise<CorrelationDataPoint[]>
  getProtocols(): Promise<Protocol[]>
  getAuthorities(): Promise<Authority[]>
}

export function createEmergencyProvider(): EmergencyProvider {
  const providerType = getProviderType("emergency")
  switch (providerType) {
    case "mock": return createEmergencyMockProvider()
    case "api": return createEmergencyApiProvider()
    default: return createEmergencyMockProvider()
  }
}
