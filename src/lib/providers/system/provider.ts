import { ResourceDataPoint, ContainerHealth, DiagnosticLogEntry } from "./mock"
import { BaseProvider } from "../base"
import { getProviderType } from "@/lib/config"
import { createSystemMockProvider } from "./mock"
import { createSystemApiProvider } from "./api"

export interface SystemProvider extends BaseProvider<ResourceDataPoint> {
  getResourceData(): Promise<ResourceDataPoint[]>
  getContainers(): Promise<ContainerHealth[]>
  getDiagnosticLogs(): Promise<DiagnosticLogEntry[]>
}

export function createSystemProvider(): SystemProvider {
  const providerType = getProviderType("system")
  switch (providerType) {
    case "mock": return createSystemMockProvider()
    case "api": return createSystemApiProvider()
    default: return createSystemMockProvider()
  }
}
