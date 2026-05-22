'use client'

import { useState, useEffect, useMemo } from 'react'
import { createMapProvider, MapNode } from '@/lib/providers/map'

interface UseMapNodesResult {
    nodes: MapNode[]
    loading: boolean
    error: Error | null
}

export function useMapNodes(): UseMapNodesResult {
    const [nodes, setNodes] = useState<MapNode[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)
    const provider = useMemo(() => createMapProvider(), [])

    useEffect(() => {
        const mounted = true

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
                }
            } finally {
                if (mounted) {
                    setLoading(false)
                }
            }
        }

        loadData()
    }, [provider])

    return { nodes, loading, error }
}
