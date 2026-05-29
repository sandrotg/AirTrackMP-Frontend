'use client'

import { useState, useEffect, useMemo } from 'react'
import { 
    createMetricsProvider, 
    MetricsData,
    ChartDataPoint,
    CorrelationDataPoint,
    HourlyDataPoint
} from '@/lib/providers/metrics'
import { getApiToken } from '@/lib/auth-token'
import { showErrorToast } from '@/lib/error-handler'

interface UseMetricsResult {
    metrics: MetricsData[]
    aqiData: ChartDataPoint[]
    correlationData: CorrelationDataPoint[]
    hourlyData: HourlyDataPoint[]
    loading: boolean
    error: Error | null
}

export function useMetrics(): UseMetricsResult {
    const [metrics, setMetrics] = useState<MetricsData[]>([])
    const [aqiData, setAqiData] = useState<ChartDataPoint[]>([])
    const [correlationData, setCorrelationData] = useState<CorrelationDataPoint[]>([])
    const [hourlyData, setHourlyData] = useState<HourlyDataPoint[]>([])
    const token = getApiToken()
    const [loading, setLoading] = useState(!!token)
    const [error, setError] = useState<Error | null>(null)
    const provider = useMemo(() => createMetricsProvider(token), [token])

    useEffect(() => {
        if (!token) return
        let mounted = true

        async function loadData() {
            setLoading(true)
            try {
                // Load all data in parallel
                const [
                    metricsData,
                    aqi,
                    correlation,
                    hourly
                ] = await Promise.all([
                    provider.getMetrics(),
                    provider.getAqiData(),
                    provider.getCorrelationData(),
                    provider.getHourlyData()
                ])
                
                if (mounted) {
                    setMetrics(metricsData)
                    setAqiData(aqi)
                    setCorrelationData(correlation)
                    setHourlyData(hourly)
                }
            } catch (err) {
                if (mounted) {
                    setError(
                        err instanceof Error
                            ? err
                            : new Error('Failed to load metrics data')
                    )
                    showErrorToast(err, 'Failed to load metrics data')
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

    return { metrics, aqiData, correlationData, hourlyData, loading, error }
}
