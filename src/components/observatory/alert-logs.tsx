'use client'

import { cn } from '@/lib/utils'
import { Search, SlidersHorizontal, X, AlertTriangle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useAlerts } from '@/hooks/providers/useAlerts'

const typeConfig = {
    critical: {
        label: 'CRITICAL',
        className: 'bg-destructive text-destructive-foreground'
    },
    warning: {
        label: 'WARNING',
        className: 'bg-warning text-warning-foreground'
    },
    info: { label: 'INFO', className: 'bg-primary text-primary-foreground' }
}

const statusConfig = {
    active: { label: 'ACTI', className: 'text-destructive' },
    acknowledged: { label: 'ACKNOWLEDG', className: 'text-warning' },
    resolved: { label: 'RESOLV', className: 'text-success' }
}

export function AlertLogs() {
    const { alerts, loading, selectedAlert, setSelectedAlert } = useAlerts()

    return (
        <div className="flex gap-6 h-full">
            {/* Main Table */}
            <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-foreground">
                            Historical Alert Registry
                        </h1>
                        <p className="text-xs text-muted-foreground mt-1">
                            LIVE FEED • SESSION: UTC-08:00
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Filter nodes..."
                                className="w-48 bg-secondary border-border pl-9 text-xs"
                            />
                        </div>
                        <Button variant="outline" size="icon">
                            <SlidersHorizontal className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-xs text-muted-foreground border-b border-border bg-secondary/30">
                                <th className="p-4 font-medium">TIMESTAMP</th>
                                <th className="p-4 font-medium">NODE NAME</th>
                                <th className="p-4 font-medium">TYPE</th>
                                <th className="p-4 font-medium">PARAMETER</th>
                                <th className="p-4 font-medium">STATU</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                Array.from({ length: 6 }).map((_, i) => (
                                    <tr key={i} className="border-b border-border/50">
                                        <td className="p-4"><Skeleton className="h-4 w-24" /></td>
                                        <td className="p-4"><div className="flex items-center gap-2"><Skeleton className="size-1.5 rounded-full" /><Skeleton className="h-4 w-28" /></div></td>
                                        <td className="p-4"><Skeleton className="h-5 w-16 rounded" /></td>
                                        <td className="p-4"><Skeleton className="h-4 w-20 mb-1" /><Skeleton className="h-4 w-16" /></td>
                                        <td className="p-4"><Skeleton className="h-4 w-16" /></td>
                                    </tr>
                                ))
                            ) : (
                                alerts.map((log) => (
                                    <tr
                                        key={log.id}
                                        onClick={() => setSelectedAlert(log)}
                                        className={cn(
                                            'border-b border-border/50 cursor-pointer transition-colors',
                                            selectedAlert?.id === log.id
                                                ? 'bg-secondary/50'
                                                : 'hover:bg-secondary/30'
                                        )}
                                    >
                                        <td className="p-4 text-xs text-muted-foreground font-mono">
                                            {log.timestamp}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                {log.type === 'critical' && (
                                                    <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
                                                )}
                                                <span className="text-sm font-medium text-foreground">
                                                    {log.nodeName}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span
                                                className={cn(
                                                    'text-[10px] font-bold px-2 py-1 rounded',
                                                    typeConfig[log.type]
                                                        .className
                                                )}
                                            >
                                                {typeConfig[log.type].label}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-xs text-muted-foreground">
                                                {log.parameter}
                                            </p>
                                            <p className="text-sm font-semibold text-primary">
                                                {log.parameterValue}{' '}
                                                <span className="text-xs text-muted-foreground">
                                                    {log.parameterUnit}
                                                </span>
                                            </p>
                                        </td>
                                        <td className="p-4">
                                            <span
                                                className={cn(
                                                    'text-xs font-medium',
                                                    statusConfig[log.status]
                                                        .className
                                                )}
                                            >
                                                {statusConfig[log.status].label}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Alert Inspector Panel */}
            {selectedAlert && (
                <div className="w-80 bg-card border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-lg font-semibold text-foreground">
                                ALERT INSPECTOR
                            </h3>
                            <p className="text-xs text-muted-foreground">
                                ID: {selectedAlert.id}
                            </p>
                        </div>
                        <button
                            onClick={() => setSelectedAlert(null)}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Measured Value */}
                    <div className="bg-secondary/50 rounded-lg p-6 text-center mb-4">
                        <p className="text-xs text-muted-foreground mb-2">
                            MEASURED VALUE
                        </p>
                        <p className="text-5xl font-light text-foreground">
                            {selectedAlert.parameterValue}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            PM2.5 Concentration
                        </p>
                        {selectedAlert.type === 'critical' && (
                            <div className="flex items-center justify-center gap-2 mt-4 text-destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <span className="text-xs font-bold">
                                    241% ABOVE SAFETY THRESHOLD
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Temporal Context */}
                    <div className="bg-secondary/30 rounded-lg p-3 mb-4">
                        <p className="text-xs text-muted-foreground mb-2">
                            TEMPORAL CONTEXT
                        </p>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-foreground">
                                Duration
                            </span>
                            <span className="text-sm font-mono text-foreground">
                                00:42:15
                            </span>
                        </div>
                    </div>

                    {/* Node Location */}
                    <div className="mb-4">
                        <p className="text-xs text-muted-foreground mb-2">
                            NODE LOCATION
                        </p>
                        <div className="relative h-32 bg-gradient-to-br from-[#0a1628] to-[#0d1f3c] rounded-lg overflow-hidden">
                            <svg
                                className="w-full h-full opacity-30"
                                viewBox="0 0 200 100"
                            >
                                <path
                                    d="M 20 50 Q 50 30 100 50 T 180 50"
                                    stroke="#1e4a6f"
                                    strokeWidth="1"
                                    fill="none"
                                />
                            </svg>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div className="h-3 w-3 rounded-full bg-destructive" />
                            </div>
                            <div className="absolute bottom-2 left-2 bg-secondary/90 px-2 py-1 rounded text-[10px] text-foreground">
                                SECTOR 7G - VENTILATION SHAFT
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <Button variant="outline" className="text-xs">
                            ACKNOWLEDGE
                        </Button>
                        <Button className="text-xs bg-primary hover:bg-primary/90 text-primary-foreground">
                            DISPATCH
                        </Button>
                    </div>

                    {/* System Health Linkage */}
                    <div className="bg-secondary/30 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground mb-2">
                            SYSTEM HEALTH LINKAGE
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/20 rounded">
                                <svg
                                    className="h-4 w-4 text-primary"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path
                                        d="M3 12h4l3-9 4 18 3-9h4"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-foreground">
                                    Correlated Fluctuations
                                </p>
                                <p className="text-[10px] text-muted-foreground">
                                    3 similar events in last 24h
                                </p>
                            </div>
                            <span className="text-muted-foreground">›</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
