"use client"

import { useState, useEffect, useMemo } from "react"
import { createDiagnosticsProvider, LogEntry, HexDataRow } from "@/lib/providers/diagnostics"
import { getApiToken } from "@/lib/auth-token"
import { showErrorToast } from "@/lib/error-handler"

interface UseDiagnosticsResult {
  logEntries: LogEntry[]
  hexData: HexDataRow[]
  loading: boolean
  error: Error | null
}

export function useDiagnostics(): UseDiagnosticsResult {
  const [logEntries, setLogEntries] = useState<LogEntry[]>([])
  const [hexData, setHexData] = useState<HexDataRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const provider = useMemo(() => createDiagnosticsProvider(), [])
  const token = getApiToken()

  useEffect(() => {
    let mounted = true

    async function loadData() {
      setLoading(true)
      try {
        const [logs, hex] = await Promise.all([
          provider.getLogEntries(),
          provider.getHexData(),
        ])
        if (mounted) {
          setLogEntries(logs)
          setHexData(hex)
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error("Failed to load diagnostics"))
          showErrorToast(err, "Failed to load diagnostics")
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

  return { logEntries, hexData, loading, error }
}