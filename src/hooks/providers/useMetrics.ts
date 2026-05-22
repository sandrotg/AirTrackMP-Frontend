'use client'

import { useState, useEffect, useMemo } from 'react'
import { createMetricsProvider, MetricsData } from '@/lib/providers/metrics'

interface UseMetricsResult {
    metrics: MetricsData[]
    loading: boolean
    error: Error | null
}

export function useMetrics(): UseMetricsResult {
    const [metrics, setMetrics] = useState<MetricsData[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)
    const provider = useMemo(() => createMetricsProvider(), [])

    useEffect(() => {
        const mounted = true

        async function loadData() {
            setLoading(true)
            try {
                const data = await provider.getMetrics()
                if (mounted) {
                    setMetrics(data)
                }
            } catch (err) {
                if (mounted) {
                    setError(
                        err instanceof Error
                            ? err
                            : new Error('Failed to load metrics')
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

    return { metrics, loading, error }
}
