"use client"

import { useState, useEffect, useMemo } from "react"
import { createEmergencyProvider, EmergencyAlert, CorrelationDataPoint, Protocol, Authority } from "@/lib/providers/emergency"
import { getApiToken } from "@/lib/auth-token"
import { showErrorToast } from "@/lib/error-handler"

interface UseEmergencyResult {
  activeAlerts: EmergencyAlert[]
  correlationData: CorrelationDataPoint[]
  protocols: Protocol[]
  authorities: Authority[]
  loading: boolean
  error: Error | null
}

export function useEmergency(): UseEmergencyResult {
  const [activeAlerts, setActiveAlerts] = useState<EmergencyAlert[]>([])
  const [correlationData, setCorrelationData] = useState<CorrelationDataPoint[]>([])
  const [protocols, setProtocols] = useState<Protocol[]>([])
  const [authorities, setAuthorities] = useState<Authority[]>([])
  const token = getApiToken()
  const [loading, setLoading] = useState(!!token)
  const [error, setError] = useState<Error | null>(null)
  const provider = useMemo(() => createEmergencyProvider(), [])

  useEffect(() => {
    if (!token) return
    let mounted = true

    async function loadData() {
      setLoading(true)
      try {
        const [alerts, corr, prot, auth] = await Promise.all([
          provider.getActiveAlerts(),
          provider.getCorrelationData(),
          provider.getProtocols(),
          provider.getAuthorities(),
        ])
        if (mounted) {
          setActiveAlerts(alerts)
          setCorrelationData(corr)
          setProtocols(prot)
          setAuthorities(auth)
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error("Failed to load emergency data"))
          showErrorToast(err, "Failed to load emergency data")
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

  return { activeAlerts, correlationData, protocols, authorities, loading, error }
}
