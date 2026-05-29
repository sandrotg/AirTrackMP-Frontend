'use client'

import { useState, useEffect, useMemo } from 'react'
import {
    createThresholdsProvider,
    NormativeOption,
    ThresholdLevel,
    NotificationChannel,
    ValidationLog
} from '@/lib/providers/thresholds'
import { getApiToken } from '@/lib/auth-token'
import { showErrorToast } from '@/lib/error-handler'

interface UseThresholdsResult {
    normativeOptions: NormativeOption[]
    thresholdLevels: ThresholdLevel[]
    notificationChannels: NotificationChannel[]
    validationLogs: ValidationLog[]
    loading: boolean
    error: Error | null
}

export function useThresholds(): UseThresholdsResult {
    const [normativeOptions, setNormativeOptions] = useState<NormativeOption[]>([])
    const [thresholdLevels, setThresholdLevels] = useState<ThresholdLevel[]>([])
    const [notificationChannels, setNotificationChannels] = useState<NotificationChannel[]>([])
    const [validationLogs, setValidationLogs] = useState<ValidationLog[]>([])
    const token = getApiToken()
    const [loading, setLoading] = useState(!!token)
    const [error, setError] = useState<Error | null>(null)
    const provider = useMemo(() => createThresholdsProvider(), [])

    useEffect(() => {
        if (!token) return
        let mounted = true

        async function loadData() {
            setLoading(true)
            try {
                const [norms, levels, channels, logs] = await Promise.all([
                    provider.getNormativeOptions(),
                    provider.getThresholdLevels(),
                    provider.getNotificationChannels(),
                    provider.getValidationLogs()
                ])
                if (mounted) {
                    setNormativeOptions(norms)
                    setThresholdLevels(levels)
                    setNotificationChannels(channels)
                    setValidationLogs(logs)
                }
            } catch (err) {
                if (mounted) {
                    setError(
                        err instanceof Error
                            ? err
                            : new Error('Failed to load thresholds')
                    )
                    showErrorToast(err, 'Failed to load thresholds')
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

    return {
        normativeOptions,
        thresholdLevels,
        notificationChannels,
        validationLogs,
        loading,
        error
    }
}
