'use client'

import { useState, useEffect, useMemo } from 'react'
import { 
    createAnalyticsProvider, 
    AnalyticsData,
    ChartDataPoint,
    CorrelationDataPoint
} from '@/lib/providers/analytics'
import { getApiToken } from '@/lib/auth-token'

interface UseAnalyticsResult {
    analyticsData: AnalyticsData[]
    chartData: ChartDataPoint[]
    correlationData: CorrelationDataPoint[]
    summary: Record<string, number>
    loading: boolean
    error: Error | null
}

export function useAnalytics(): UseAnalyticsResult {
    const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([])
    const [chartData, setChartData] = useState<ChartDataPoint[]>([])
    const [correlationData, setCorrelationData] = useState<CorrelationDataPoint[]>([])
    const [summary, setSummary] = useState<Record<string, number>>({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)
    const token = getApiToken()
    const provider = useMemo(() => createAnalyticsProvider(), [])

    useEffect(() => {
        let mounted = true

        async function loadData() {
            setLoading(true)
            try {
                // Load all data in parallel
                const [
                    data,
                    chart,
                    correlation,
                    summ
                ] = await Promise.all([
                    provider.getAnalytics(),
                    provider.getChartData(),
                    provider.getCorrelationData(),
                    provider.getSummary()
                ])
                
                if (mounted) {
                    setAnalyticsData(data)
                    setChartData(chart)
                    setCorrelationData(correlation)
                    setSummary(summ)
                }
            } catch (err) {
                if (mounted) {
                    setError(
                        err instanceof Error
                            ? err
                            : new Error('Failed to load analytics data')
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

    return { analyticsData, chartData, correlationData, summary, loading, error }
}