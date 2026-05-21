import { BaseProvider } from '../base'
import { MetricData } from '@/lib/types'

export interface MetricsData extends MetricData {
    icon?: React.ReactNode
}

export const mockMetricsData: MetricsData[] = [
    {
        label: 'PM 2.5',
        value: 65,
        unit: 'μg/m³',
        status: 'critical',
        change: '↑ 12% FROM PREV HOUR',
        changeType: 'up'
    },
    {
        label: 'PM 10',
        value: 45,
        unit: 'μg/m³',
        status: 'moderate',
        change: '↓ 4% FROM PREV HOUR',
        changeType: 'down'
    },
    {
        label: 'Temperature',
        value: 28,
        unit: '°C',
        status: 'normal'
    },
    {
        label: 'Humidity',
        value: 72,
        unit: '%',
        status: 'normal'
    }
]

export interface MetricsMockProvider extends BaseProvider<MetricsData> {
    getMetrics(): Promise<MetricsData[]>
}

export function createMetricsMockProvider(): MetricsMockProvider {
    return {
        type: 'mock',
        async getAll() {
            return mockMetricsData
        },
        async getById(id: string) {
            return mockMetricsData.find((m) => m.label === id) || null
        },
        async getMetrics() {
            return mockMetricsData
        }
    }
}
