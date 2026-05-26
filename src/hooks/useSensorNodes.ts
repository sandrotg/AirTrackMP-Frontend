'use client'

import { useState, useEffect, useMemo } from 'react'
import { createMapProvider, SensorNodeData } from '@/lib/providers/map'
import { getApiToken } from '@/lib/auth-token'

interface UseSensorNodesResult {
  sensorNodes: SensorNodeData[]
  loading: boolean
  error: Error | null
}

export function useSensorNodes(): UseSensorNodesResult {
  const [sensorNodes, setSensorNodes] = useState<SensorNodeData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const token = getApiToken()
  const provider = useMemo(() => createMapProvider(token), [])

  useEffect(() => {
    let mounted = true

    async function loadData() {
      setLoading(true)
      try {
        const data = await provider.getSensorNodes()
        if (mounted) {
          setSensorNodes(data)
        }
      } catch (err) {
        if (mounted) {
          setError(
            err instanceof Error
              ? err
              : new Error('Failed to load sensor nodes')
          )
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

  return { sensorNodes, loading, error }
}