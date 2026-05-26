'use client'

import { useState } from 'react'
import {
    CheckCircle,
    Send
} from 'lucide-react'
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { Skeleton } from '@/components/ui/skeleton'
import { useEmergency } from '@/hooks/providers/useEmergency'

export function EmergencyControlView() {
    const { activeAlerts, correlationData, protocols, authorities, loading } =
        useEmergency()
    const [selectedProtocol, setSelectedProtocol] = useState('beta')
    const [alertFilter, setAlertFilter] = useState<'all' | 'critical'>('all')

    if (loading) {
        return (
            <div className="flex-1 p-6 overflow-auto">
                <Skeleton className="h-16 w-full rounded-lg mb-6" />
                <div className="mb-8">
                    <Skeleton className="h-8 w-72 mb-2" />
                    <Skeleton className="h-4 w-96" />
                </div>
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-8 space-y-6">
                        <div className="bg-card rounded-lg border border-border p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <Skeleton className="h-4 w-24 mb-1" />
                                    <Skeleton className="h-6 w-48" />
                                </div>
                                <div className="flex gap-2">
                                    <Skeleton className="h-9 w-24 rounded-lg" />
                                    <Skeleton className="h-9 w-28 rounded-lg" />
                                </div>
                            </div>
                            {[1, 2, 3].map((i) => (
                                <Skeleton key={i} className="h-12 w-full mb-2" />
                            ))}
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-card rounded-lg border border-border p-6">
                                <Skeleton className="h-4 w-36 mb-1" />
                                <Skeleton className="h-5 w-48 mb-4" />
                                <Skeleton className="h-40 w-full" />
                            </div>
                            <div className="bg-card rounded-lg border border-border p-6">
                                <Skeleton className="h-4 w-36 mb-1" />
                                <Skeleton className="h-5 w-48 mb-4" />
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <Skeleton key={i} className="h-8 w-full" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 space-y-6">
                        <div className="bg-card rounded-lg border border-border p-6">
                            <Skeleton className="h-5 w-40 mb-6" />
                            <Skeleton className="h-16 w-full rounded-lg mb-6" />
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <Skeleton key={i} className="h-20 w-full rounded-lg" />
                                ))}
                            </div>
                            <Skeleton className="h-11 w-full mt-6 rounded-lg" />
                        </div>
                        <div className="bg-card rounded-lg border border-border overflow-hidden">
                            <Skeleton className="h-48 w-full" />
                            <div className="p-4">
                                <Skeleton className="h-4 w-24 mb-1" />
                                <Skeleton className="h-6 w-48" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex-1 p-6 overflow-auto">
            {/* Early Warning Banner */}
            <div className="bg-card rounded-lg border border-border p-4 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-status-sensitive animate-pulse" />
                    <div>
                        <h2 className="text-status-sensitive font-semibold">
                            Early Warning Active
                        </h2>
                        <p className="text-sm text-status-sensitive/70">
                            SYSTEM MONITORING ELEVATED THREAT LEVEL IN SECTOR
                            7-G
                        </p>
                    </div>
                </div>
                <button className="bg-status-sensitive/20 hover:bg-status-sensitive/30 text-status-sensitive px-4 py-2 rounded-lg border border-status-sensitive/30 transition-colors font-medium">
                    BROADCAST UPDATE
                </button>
            </div>

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-light text-foreground mb-2">
                    Emergency Command & Control
                </h1>
                <p className="text-muted-foreground">
                    Operational interface for synchronized response protocols.
                </p>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Main Content - Left Side */}
                <div className="col-span-8 space-y-6">
                    {/* Active Alerts Log */}
                    <div className="bg-card rounded-lg border border-border p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                    LIVE FEED
                                </p>
                                <h3 className="text-xl font-semibold text-foreground">
                                    Active Alerts Log
                                </h3>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setAlertFilter('all')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        alertFilter === 'all'
                                            ? 'bg-muted text-foreground'
                                            : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                >
                                    ALL NODES
                                </button>
                                <button
                                    onClick={() => setAlertFilter('critical')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        alertFilter === 'critical'
                                            ? 'bg-primary/20 text-primary border border-primary/30'
                                            : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                >
                                    CRITICAL ONLY
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="text-left py-3 px-4 text-xs text-muted-foreground uppercase tracking-wider font-medium">
                                            Node ID
                                        </th>
                                        <th className="text-left py-3 px-4 text-xs text-muted-foreground uppercase tracking-wider font-medium">
                                            Location
                                        </th>
                                        <th className="text-left py-3 px-4 text-xs text-muted-foreground uppercase tracking-wider font-medium">
                                            Value (mg/m³)
                                        </th>
                                        <th className="text-left py-3 px-4 text-xs text-muted-foreground uppercase tracking-wider font-medium">
                                            Duration
                                        </th>
                                        <th className="text-left py-3 px-4 text-xs text-muted-foreground uppercase tracking-wider font-medium">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {activeAlerts
                                        .filter(
                                            (alert) =>
                                                alertFilter === 'all' ||
                                                alert.status === 'CRITICAL'
                                        )
                                        .map((alert) => (
                                            <tr
                                                key={alert.nodeId}
                                                className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                                            >
                                                <td className="py-4 px-4">
                                                    <span className="text-primary font-mono text-sm">
                                                        {alert.nodeId}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4 text-sm text-foreground">
                                                    {alert.location}
                                                </td>
                                                <td className="py-4 px-4">
                                                    <span
                                                        className={`font-mono text-sm ${alert.status === 'CRITICAL' ? 'text-status-unhealthy' : 'text-status-moderate'}`}
                                                    >
                                                        {alert.value}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4 text-sm text-muted-foreground font-mono">
                                                    {alert.duration}
                                                </td>
                                                <td className="py-4 px-4">
                                                    <span
                                                        className={`px-2 py-1 rounded text-xs font-semibold ${
                                                            alert.status ===
                                                            'CRITICAL'
                                                                ? 'bg-status-unhealthy/20 text-status-unhealthy'
                                                                : 'bg-status-moderate/20 text-status-moderate'
                                                        }`}
                                                    >
                                                        {alert.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="grid grid-cols-2 gap-6">
                        {/* PM Spikes vs Env Conditions */}
                        <div className="bg-card rounded-lg border border-border p-6">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                REAL-TIME CORRELATION
                            </p>
                            <h3 className="text-lg font-semibold text-foreground mb-4">
                                PM Spikes vs Env Conditions
                            </h3>

                            <div className="h-40">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={correlationData}>
                                        <XAxis dataKey="time" hide />
                                        <YAxis hide />
                                        <Line
                                            type="monotone"
                                            dataKey="pm25"
                                            stroke="var(--primary)"
                                            strokeWidth={2}
                                            dot={false}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="temp"
                                            stroke="var(--status-moderate)"
                                            strokeWidth={2}
                                            strokeDasharray="5 5"
                                            dot={false}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="flex items-center justify-center gap-6 mt-4">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                                    PM2.5
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <span className="w-2 h-2 rounded-full bg-status-moderate"></span>
                                    TEMP
                                </div>
                            </div>
                        </div>

                        {/* Government Authority Relay */}
                        <div className="bg-card rounded-lg border border-border p-6">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                NOTIFICATION STATUS
                            </p>
                            <h3 className="text-lg font-semibold text-foreground mb-4">
                                Government Authority Relay
                            </h3>

                            <div className="space-y-4">
                                {authorities.map((authority) => (
                                    <div
                                        key={authority.name}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                                                <authority.icon className="w-4 h-4 text-muted-foreground" />
                                            </div>
                                            <span className="text-sm text-foreground">
                                                {authority.name}
                                            </span>
                                        </div>
                                        <div
                                            className={`flex items-center gap-2 text-xs ${authority.statusColor}`}
                                        >
                                            {authority.status === 'READ' && (
                                                <CheckCircle className="w-3 h-3" />
                                            )}
                                            {authority.status ===
                                                'DELIVERED' && (
                                                <CheckCircle className="w-3 h-3" />
                                            )}
                                            {authority.status === 'SENT' && (
                                                <Send className="w-3 h-3" />
                                            )}
                                            {authority.status}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - Response Protocol */}
                <div className="col-span-4 space-y-6">
                    <div className="bg-card rounded-lg border border-border p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-foreground uppercase tracking-wider">
                                Response Protocol
                            </h3>
                            <span className="px-3 py-1 bg-primary/20 text-primary text-xs rounded border border-primary/30 font-medium">
                                AUTO-PILOT
                            </span>
                        </div>

                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                            SELECTED THREAT
                        </p>
                        <div className="bg-primary/20 rounded-lg p-4 mb-6 border border-primary/30">
                            <p className="text-sm text-primary font-medium">
                                PM2.5 Spike: Harbor District
                            </p>
                        </div>

                        <div className="space-y-4">
                            {protocols.map((protocol) => (
                                <div
                                    key={protocol.id}
                                    onClick={() =>
                                        setSelectedProtocol(protocol.id)
                                    }
                                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                                        selectedProtocol === protocol.id
                                            ? 'bg-muted border border-primary/30'
                                            : 'bg-muted/50 border border-transparent hover:border-border'
                                    }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div
                                            className={`w-4 h-4 rounded-full border-2 mt-0.5 flex items-center justify-center ${
                                                selectedProtocol === protocol.id
                                                    ? 'border-primary'
                                                    : 'border-muted-foreground'
                                            }`}
                                        >
                                            {selectedProtocol ===
                                                protocol.id && (
                                                <div className="w-2 h-2 rounded-full bg-primary" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-foreground mb-1">
                                                {protocol.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground leading-relaxed">
                                                {protocol.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="mt-6 w-full bg-primary hover:bg-primary/80 text-primary-foreground font-semibold px-4 py-3 rounded-lg transition-colors">
                            EXECUTE SELECTED ACTIONS
                        </button>
                    </div>

                    {/* Node Location Map */}
                    <div className="bg-card rounded-lg border border-border overflow-hidden">
                        <div className="h-48 bg-linear-to-br from-status-sensitive/20 to-background relative">
                            <div className="absolute inset-0 opacity-30">
                                <svg
                                    viewBox="0 0 200 100"
                                    className="w-full h-full"
                                >
                                    <circle
                                        cx="160"
                                        cy="20"
                                        r="8"
                                        fill="#94a3b8"
                                        opacity="0.3"
                                    />
                                    <path
                                        d="M0,80 Q50,60 100,70 T200,60"
                                        stroke="#475569"
                                        strokeWidth="0.5"
                                        fill="none"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="p-4">
                            <p className="text-xs text-primary uppercase tracking-wider mb-1">
                                NODE LOCATION
                            </p>
                            <h3 className="text-lg font-semibold text-foreground">
                                Sector 7-G North Quay
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
