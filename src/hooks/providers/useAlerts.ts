'use client'

import { useState, useEffect, useMemo } from 'react'
import { createAlertsProvider } from '@/lib/providers/alerts'
import { AlertLog } from '@/lib/types'
import { getApiToken } from '@/lib/auth-token'
import { showErrorToast } from '@/lib/error-handler'

interface UseAlertsResult {
    alerts: AlertLog[]
    loading: boolean
    error: Error | null
    selectedAlert: AlertLog | null
    setSelectedAlert: (alert: AlertLog | null) => void
}

export function useAlerts(): UseAlertsResult {
    const [alerts, setAlerts] = useState<AlertLog[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)
    const [selectedAlert, setSelectedAlert] = useState<AlertLog | null>(null)
    const provider = useMemo(() => createAlertsProvider(), [])
    const token = getApiToken()

    useEffect(() => {
        let mounted = true

        async function loadAlerts() {
            setLoading(true)
            try {
                const data = await provider.getAll()
                if (mounted) {
                    setAlerts(data)
                    if (data.length > 0) {
                        setSelectedAlert(data[0])
                    }
                }
            } catch (err) {
                if (mounted) {
                    setError(
                        err instanceof Error
                            ? err
                            : new Error('Failed to load alerts')
                    )
                    showErrorToast(err, 'Failed to load alerts')
                }
            } finally {
                if (mounted) {
                    setLoading(false)
                }
            }
        }

        loadAlerts()

        return () => {
            mounted = false
        }
    }, [provider, token])

    return { alerts, loading, error, selectedAlert, setSelectedAlert }
}
