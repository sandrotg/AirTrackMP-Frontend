import { LogEntry, HexDataRow } from "./mock"
import { BaseProvider } from "../base"
import { getProviderType } from "@/lib/config"
import { createDiagnosticsMockProvider } from "./mock"
import { createDiagnosticsApiProvider } from "./api"

export interface DiagnosticsProvider extends BaseProvider<LogEntry> {
  getLogEntries(): Promise<LogEntry[]>
  getHexData(): Promise<HexDataRow[]>
}

export function createDiagnosticsProvider(): DiagnosticsProvider {
  const providerType = getProviderType("diagnostics")
  switch (providerType) {
    case "mock": return createDiagnosticsMockProvider()
    case "api": return createDiagnosticsApiProvider()
    default: return createDiagnosticsMockProvider()
  }
}
