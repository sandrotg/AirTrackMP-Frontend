'use client'
import { cn } from '@/lib/utils'
import {
    Thermometer,
    Droplets,
    TrendingUp,
    TrendingDown
} from 'lucide-react'
import { useMetrics } from '@/hooks/providers/useMetrics'
import { Skeleton } from '@/components/ui/skeleton'

interface MetricCardProps {
    label: string
    value: string | number
    unit: string
    status?: 'critical' | 'warning' | 'moderate' | 'normal'
    change?: string
    changeType?: 'up' | 'down' | 'stable'
    icon?: React.ReactNode
}

const statusColors = {
    critical: 'bg-destructive text-destructive-foreground',
    warning: 'bg-warning text-warning-foreground',
    moderate: 'bg-warning text-warning-foreground',
    normal: 'bg-success text-success-foreground'
}

const statusLabels = {
    critical: 'CRITICAL',
    warning: 'WARNING',
    moderate: 'MODERATE',
    normal: 'NORMAL'
}

export function MetricCard({
    label,
    value,
    unit,
    status,
    change,
    changeType,
    icon
}: MetricCardProps) {
    return (
        <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground tracking-wide">
                    {label}
                </span>
                {status && (
                    <span
                        className={cn(
                            'text-[10px] font-bold px-2 py-0.5 rounded',
                            statusColors[status]
                        )}
                    >
                        {statusLabels[status]}
                    </span>
                )}
                {icon && <span className="text-muted-foreground">{icon}</span>}
            </div>
            <div className="flex items-baseline gap-1">
                <span className="text-4xl font-light text-foreground">
                    {value}
                </span>
                <span className="text-sm text-muted-foreground">{unit}</span>
            </div>
            {change && (
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    {changeType === 'up' && (
                        <TrendingUp className="h-3 w-3 text-destructive" />
                    )}
                    {changeType === 'down' && (
                        <TrendingDown className="h-3 w-3 text-success" />
                    )}
                    <span>{change}</span>
                </div>
            )}
        </div>
    )
}

export function MetricCardsRow() {
    const { metrics, loading } = useMetrics()

    if (loading) {
        return (
            <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="bg-card border border-border rounded-lg p-4"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <Skeleton className="h-3 w-24" />
                            {i % 2 === 0 && <Skeleton className="h-4 w-14 rounded" />}
                        </div>
                        <div className="flex items-baseline gap-1">
                            <Skeleton className="h-9 w-16" />
                            <Skeleton className="h-4 w-8" />
                        </div>
                        <div className="flex items-center gap-1 mt-2">
                            <Skeleton className="h-3 w-3" />
                            <Skeleton className="h-3 w-20" />
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    if (metrics.length === 0) {
        return (
            <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="bg-card border border-border rounded-lg p-4"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <Skeleton className="h-3 w-24" />
                        </div>
                        <div className="flex items-baseline gap-1">
                            <Skeleton className="h-9 w-16" />
                            <Skeleton className="h-4 w-8" />
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
                <MetricCard
                    key={index}
                    label={metric.label}
                    value={metric.value}
                    unit={metric.unit}
                    status={metric.status}
                    change={metric.change}
                    changeType={metric.changeType}
                    icon={
                        index === 2 ? (
                            <Thermometer className="h-4 w-4" />
                        ) : index === 3 ? (
                            <Droplets className="h-4 w-4" />
                        ) : undefined
                    }
                />
            ))}
        </div>
    )
}

export function StatsCardsRow() {
    return (
        <div className="grid grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">
                    TOTAL ACTIVE NODES
                </p>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-semibold text-foreground">
                        1,248
                    </span>
                    <span className="text-xs text-success">+12%</span>
                </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">
                    OPERATIONAL HEALTH
                </p>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-semibold text-foreground">
                        99.4%
                    </span>
                    <span className="text-xs text-primary">●</span>
                </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 border-l-2 border-l-warning">
                <p className="text-xs text-warning mb-1">
                    LOW BATTERY WARNINGS
                </p>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-semibold text-foreground">
                        14
                    </span>
                    <span className="text-xs text-muted-foreground">
                        Nodes Affected
                    </span>
                </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 border-l-2 border-l-destructive">
                <p className="text-xs text-destructive mb-1">CRITICAL ERRORS</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-semibold text-foreground">
                        03
                    </span>
                    <span className="text-xs text-muted-foreground">
                        Require Action
                    </span>
                </div>
            </div>
        </div>
    )
}
