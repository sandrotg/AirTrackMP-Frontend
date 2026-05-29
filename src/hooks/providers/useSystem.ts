"use client"

import { useState, useEffect, useMemo } from "react"
import { createSystemProvider, ResourceDataPoint, ContainerHealth, DiagnosticLogEntry } from "@/lib/providers/system"
import { getApiToken } from "@/lib/auth-token"
import { showErrorToast } from "@/lib/error-handler"

interface UseSystemResult {
  resourceData: ResourceDataPoint[]
  containers: ContainerHealth[]
  diagnosticLogs: DiagnosticLogEntry[]
  loading: boolean
  error: Error | null
}

export function useSystem(): UseSystemResult {
  const [resourceData, setResourceData] = useState<ResourceDataPoint[]>([])
  const [containers, setContainers] = useState<ContainerHealth[]>([])
  const [diagnosticLogs, setDiagnosticLogs] = useState<DiagnosticLogEntry[]>([])
  const token = getApiToken()
  const [loading, setLoading] = useState(!!token)
  const [error, setError] = useState<Error | null>(null)
  const provider = useMemo(() => createSystemProvider(), [])

  useEffect(() => {
    if (!token) return
    let mounted = true

    async function loadData() {
      setLoading(true)
      try {
        const [resources, conts, logs] = await Promise.all([
          provider.getResourceData(),
          provider.getContainers(),
          provider.getDiagnosticLogs(),
        ])
        if (mounted) {
          setResourceData(resources)
          setContainers(conts)
          setDiagnosticLogs(logs)
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error("Failed to load system data"))
          showErrorToast(err, "Failed to load system data")
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

  return { resourceData, containers, diagnosticLogs, loading, error }
}
