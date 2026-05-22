import { AlertLog, AlertType } from '@/lib/types'
import { AlertsProvider } from './provider'
import { getApiToken } from '@/lib/auth-token'

interface ApiAlert {
    id: number
    type: string
    message: string
    deleted: boolean
    createdAt: string
    node: {
        id: number
        name: string
        location: string
        latitude: number
        longitude: number
        status: string
        deleted: boolean
        createdAt: string
    }
}

function mapApiAlertToAlertLog(apiAlert: ApiAlert): AlertLog {
    const typeMap: Record<string, string> = {
        PM25_HIGH: 'warning',
        PM25_CRITICAL: 'critical',
        PM10_HIGH: 'warning',
        PM10_CRITICAL: 'critical',
        TEMPERATURE_HIGH: 'warning',
        HUMIDITY_HIGH: 'warning'
    }

    const paramMatch = apiAlert.type.match(
        /(PM25|PM10|TEMPERATURE|HUMIDITY)_(HIGH|CRITICAL)/
    )
    const parameter = paramMatch
        ? paramMatch[1]
              .replace('TEMPERATURE', 'Temperature')
              .replace('HUMIDITY', 'Humidity')
              .replace('PM', 'PM ')
        : apiAlert.type
    const parameterValue = apiAlert.message.match(/\d+\.?\d*/)?.[0] || '0'

    return {
        id: `ALERT-${apiAlert.id}`,
        timestamp: apiAlert.createdAt.replace('T', ' '),
        nodeName: apiAlert.node?.name || 'Unknown',
        type: (typeMap[apiAlert.type] || 'info') as AlertType,
        parameter: parameter,
        parameterValue: parameterValue,
        parameterUnit: apiAlert.type.includes('PM') ? 'μg/m³' : '%',
        status: apiAlert.deleted ? 'resolved' : 'active'
    }
}

export function createAlertsApiProvider(): AlertsProvider {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

    return {
        type: 'api',
        async getAll() {
            const token = getApiToken()
            if (!token) return []
            const response = await fetch(`${API_BASE}/api/alert`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            if (!response.ok) return []
            const data: ApiAlert[] = await response.json()
            return data.filter((a) => !a.deleted).map(mapApiAlertToAlertLog)
        },
        async getById(id: string) {
            const alertId = id.replace('ALERT-', '')
            const token = getApiToken()
            if (!token) return null
            const response = await fetch(`${API_BASE}/api/alert/${alertId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            if (!response.ok) return null
            const data: ApiAlert = await response.json()
            return mapApiAlertToAlertLog(data)
        }
    }
}
