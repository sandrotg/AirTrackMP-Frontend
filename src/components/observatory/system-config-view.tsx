'use client'

import { useState } from 'react'
import {
    Cloud,
    Database,
    Settings2,
    Trash2,
    HardDrive,
    Sparkles,
    ChevronRight
} from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useSystem } from '@/hooks/providers/useSystem'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip
} from 'recharts'

export function SystemConfigView() {
    const { resourceData, containers, diagnosticLogs, loading } = useSystem()
    const [retries, setRetries] = useState(3)
    const [bufferLimit, setBufferLimit] = useState(1024)
    const [sliderValue, setSliderValue] = useState(45)

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <Skeleton className="h-8 w-64 mb-2" />
                        <Skeleton className="h-4 w-72" />
                    </div>
                    <div className="flex items-center gap-6">
                        <Skeleton className="h-12 w-24" />
                        <Skeleton className="h-12 w-24" />
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-card border border-border rounded-xl p-6">
                        <Skeleton className="h-5 w-40 mb-6" />
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} className="h-16 w-full mb-2 rounded-lg" />
                        ))}
                    </div>
                    <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
                        <Skeleton className="h-5 w-48 mb-4" />
                        <Skeleton className="h-48 w-full" />
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-card border border-border rounded-xl p-6">
                        <Skeleton className="h-5 w-36 mb-6" />
                        <Skeleton className="h-20 w-full mb-4" />
                        <div className="grid grid-cols-2 gap-4">
                            <Skeleton className="h-16 rounded-lg" />
                            <Skeleton className="h-16 rounded-lg" />
                        </div>
                        <Skeleton className="h-11 w-full mt-4 rounded-lg" />
                    </div>
                    <div className="bg-card border border-border rounded-xl p-6">
                        <Skeleton className="h-5 w-36 mb-6" />
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <Skeleton className="h-32 rounded-lg" />
                            <Skeleton className="h-32 rounded-lg" />
                        </div>
                        <Skeleton className="h-16 w-full rounded-lg" />
                    </div>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                    <Skeleton className="h-5 w-48 mb-4" />
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Skeleton key={i} className="h-6 w-full mb-1" />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">
                        Infrastructure Health
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full" />
                        Precision monitoring active. All services operational.
                    </p>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <p className="text-xs text-muted-foreground uppercase">
                            Uptime
                        </p>
                        <p className="text-2xl font-bold text-primary">
                            99.998%
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-muted-foreground uppercase">
                            Latency
                        </p>
                        <p className="text-2xl font-bold text-primary">14ms</p>
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Container Health */}
                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <Cloud className="w-5 h-5 text-primary" />
                            <h2 className="text-base font-semibold text-foreground">
                                Container Health
                            </h2>
                        </div>
                        <span className="text-xs text-muted-foreground">
                            REAL-TIME
                        </span>
                    </div>

                    <div className="space-y-3">
                        {containers.map((container, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 p-3 bg-background rounded-lg"
                            >
                                <div
                                    className={`w-1 h-10 ${container.color} rounded-full`}
                                />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-foreground">
                                        {container.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        ID: {container.id}
                                    </p>
                                </div>
                                <span
                                    className={`text-xs px-2 py-1 rounded ${
                                        container.status === 'HEALTHY'
                                            ? 'bg-green-500/20 text-green-500'
                                            : container.status === 'CONGESTED'
                                              ? 'bg-yellow-500/20 text-yellow-500'
                                              : 'bg-green-500/20 text-green-500'
                                    }`}
                                >
                                    {container.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AWS Resource Allocation */}
                <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-base font-semibold text-foreground">
                                AWS Resource Allocation
                            </h2>
                            <p className="text-xs text-muted-foreground">
                                us-east-1 Cluster Performance
                            </p>
                        </div>
                        <div className="flex items-center gap-4 text-xs">
                            <span className="flex items-center gap-1">
                                <span className="w-2 h-2 bg-primary rounded-full" />
                                CPU LOAD
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                                RAM USAGE
                            </span>
                        </div>
                    </div>

                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={resourceData}>
                                <XAxis
                                    dataKey="time"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6b7280', fontSize: 10 }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6b7280', fontSize: 10 }}
                                    domain={[0, 100]}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1f2937',
                                        border: '1px solid #374151',
                                        borderRadius: '8px'
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="cpu"
                                    stroke="#22d3ee"
                                    strokeWidth={2}
                                    dot={false}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="ram"
                                    stroke="#fbbf24"
                                    strokeWidth={2}
                                    strokeDasharray="5 5"
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Event Processor */}
                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <Settings2 className="w-5 h-5 text-primary" />
                            <h2 className="text-base font-semibold text-foreground">
                                Event Processor
                            </h2>
                        </div>
                        <span className="text-xs px-3 py-1 bg-primary/20 text-primary rounded-full border border-primary/30">
                            ACTIVE ENGINE
                        </span>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                                    Processing Frequency
                                </span>
                                <span className="text-xl font-bold text-primary">
                                    450ms
                                </span>
                            </div>
                            <div className="relative">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={sliderValue}
                                    onChange={(e) =>
                                        setSliderValue(Number(e.target.value))
                                    }
                                    className="w-full h-1 bg-background rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                                    <span>HIGH-SPEED</span>
                                    <span>BATCH EFFICIENCY</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-background rounded-lg p-4">
                                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                                    Retries
                                </p>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        value={retries}
                                        onChange={(e) =>
                                            setRetries(Number(e.target.value))
                                        }
                                        className="w-16 px-3 py-2 bg-card border border-border rounded-lg text-foreground text-center focus:outline-none focus:border-primary"
                                    />
                                    <span className="text-sm text-muted-foreground">
                                        Attempts
                                    </span>
                                </div>
                            </div>
                            <div className="bg-background rounded-lg p-4">
                                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                                    Buffer Limit
                                </p>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        value={bufferLimit}
                                        onChange={(e) =>
                                            setBufferLimit(
                                                Number(e.target.value)
                                            )
                                        }
                                        className="w-20 px-3 py-2 bg-card border border-border rounded-lg text-foreground text-center focus:outline-none focus:border-primary"
                                    />
                                    <span className="text-sm text-muted-foreground">
                                        MB
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                            UPDATE CONFIGURATION
                        </button>
                    </div>
                </div>

                {/* Database Utility */}
                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <Database className="w-5 h-5 text-primary" />
                        <h2 className="text-base font-semibold text-foreground">
                            Database Utility
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-background rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <Trash2 className="w-5 h-5 text-muted-foreground" />
                                <h3 className="font-medium text-foreground">
                                    Cleanup Purge
                                </h3>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">
                                Erase redundant audit logs older than 90 days to
                                optimize storage shards.
                            </p>
                            <button className="text-sm text-primary hover:underline flex items-center gap-1">
                                INITIALIZE PURGE{' '}
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="bg-background rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <HardDrive className="w-5 h-5 text-yellow-500" />
                                <h3 className="font-medium text-foreground">
                                    Redundant Backup
                                </h3>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">
                                Force an immediate full system state snapshot to
                                S3-Glacier storage.
                            </p>
                            <button className="text-sm text-yellow-500 hover:underline flex items-center gap-1">
                                BACKUP NOW <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                        <span className="text-xs text-muted-foreground">
                            LAST MAINTENANCE: 2024-10-15
                        </span>
                        <div className="flex items-center gap-3 px-4 py-2 bg-background rounded-lg">
                            <Sparkles className="w-5 h-5 text-primary" />
                            <div>
                                <p className="text-sm font-medium text-foreground">
                                    Optimization Ready
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    New cloud config profile detected.
                                </p>
                            </div>
                            <button className="px-3 py-1 bg-card border border-border rounded text-xs hover:bg-muted transition-colors">
                                APPLY
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Active Diagnostic Stream */}
            <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        Active Diagnostic Stream
                    </h2>
                    <div className="flex items-center gap-4 text-xs">
                        <span className="text-blue-400">INFO: 242</span>
                        <span className="text-yellow-400">WARN: 12</span>
                        <span className="text-red-400">ERR: 0</span>
                    </div>
                </div>

                <div className="bg-background rounded-lg p-4 font-mono text-sm space-y-2">
                    {diagnosticLogs.map((log, index) => (
                        <div key={index} className="flex gap-2">
                            <span className="text-muted-foreground">
                                [{log.time}]
                            </span>
                            <span className={log.color}>{log.type}:</span>
                            <span className="text-muted-foreground">
                                {log.message}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
