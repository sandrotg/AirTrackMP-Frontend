'use client'

import { useState, useEffect, useMemo } from 'react'
import { createMapProvider, MapNode } from '@/lib/providers/map'
import { getApiToken } from '@/lib/auth-token'
import { showErrorToast } from '@/lib/error-handler'

interface UseMapNodesResult {
    nodes: MapNode[]
    loading: boolean
    error: Error | null
}

export function useMapNodes(): UseMapNodesResult {
    const [nodes, setNodes] = useState<MapNode[]>([])
    const token = getApiToken()
    const [loading, setLoading] = useState(!!token)
    const [error, setError] = useState<Error | null>(null)
    const provider = useMemo(() => createMapProvider(token), [token])

    useEffect(() => {
        if (!token) return
        let mounted = true

        async function loadData() {
            setLoading(true)
            try {
                const data = await provider.getAll()
                if (mounted) {
                    setNodes(data)
                }
            } catch (err) {
                if (mounted) {
                    setError(
                        err instanceof Error
                            ? err
                            : new Error('Failed to load map nodes')
                    )
                    showErrorToast(err, 'Failed to load map nodes')
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

    return { nodes, loading, error }
}
