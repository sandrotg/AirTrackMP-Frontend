'use client'

import { useState } from 'react'
import {
    Webhook,
    Save,
    Pencil,
    CheckCircle,
    Settings2,
    History
} from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useThresholds } from '@/hooks/providers/useThresholds'

export function ThresholdConfigView() {
    const {
        normativeOptions,
        thresholdLevels,
        notificationChannels,
        validationLogs,
        loading
    } = useThresholds()
    const [selectedNormative, setSelectedNormative] = useState('who')
    const [channelStates, setChannelStates] = useState<Record<string, boolean>>(
        {
            'Push alerts': true,
            'Email Reports': false,
            'External Hooks': true
        }
    )

    const toggleChannel = (name: string) => {
        setChannelStates((prev) => ({
            ...prev,
            [name]: !prev[name]
        }))
    }

    if (loading) {
        return (
            <div className="flex-1 p-6 overflow-auto">
                <div className="mb-8">
                    <Skeleton className="h-4 w-48 mb-2" />
                    <Skeleton className="h-8 w-72" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div className="bg-card rounded-lg border border-border p-6">
                        <Skeleton className="h-5 w-48 mb-6" />
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <Skeleton key={i} className="h-20 w-full rounded-lg" />
                            ))}
                        </div>
                    </div>
                    <div className="bg-card rounded-lg border border-border p-6">
                        <div className="flex items-center justify-between mb-6">
                            <Skeleton className="h-5 w-56" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Skeleton key={i} className="h-10 w-full mb-2" />
                        ))}
                    </div>
                    <div className="bg-card rounded-lg border border-border p-6">
                        <Skeleton className="h-5 w-48 mb-6" />
                        <div className="grid grid-cols-3 gap-4">
                            {[1, 2, 3].map((i) => (
                                <Skeleton key={i} className="h-32 rounded-lg" />
                            ))}
                        </div>
                    </div>
                    <div className="bg-card rounded-lg border border-border p-6">
                        <Skeleton className="h-5 w-48 mb-6" />
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <Skeleton className="size-8 rounded-lg shrink-0" />
                                    <div className="flex-1">
                                        <Skeleton className="h-4 w-48 mb-1" />
                                        <Skeleton className="h-3 w-64" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex-1 p-6 overflow-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        ENGINEERING CONSOLE
                    </p>
                    <h1 className="text-3xl font-light text-foreground">
                        Alert Threshold Management
                    </h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-status-good"></span>
                        <span className="text-sm text-foreground">
                            Current Rules: Active
                        </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                        LAST SYNCED: 14:02:11
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                {/* Normative Selector */}
                <div className="bg-card rounded-lg border border-border p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-foreground uppercase tracking-wider">
                            Normative Selector
                        </h3>
                        <Settings2 className="w-5 h-5 text-muted-foreground" />
                    </div>

                    <div className="space-y-3">
                        {normativeOptions.map((option) => (
                            <div
                                key={option.id}
                                onClick={() => setSelectedNormative(option.id)}
                                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                                        selectedNormative === option.id
                                            ? 'bg-primary/20 border border-primary/30'
                                            : 'bg-muted/50 border border-transparent hover:border-border'
                                }`}
                            >
                                <p
                                    className={`text-sm font-medium mb-1 ${
                                        selectedNormative === option.id
                                            ? 'text-foreground'
                                            : 'text-foreground'
                                    }`}
                                >
                                    {option.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {option.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Custom Threshold Grid */}
                <div className="bg-card rounded-lg border border-border p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-foreground uppercase tracking-wider">
                            Custom Threshold Grid (mg/m³)
                        </h3>
                        <button className="flex items-center gap-2 text-primary text-sm hover:text-primary/80 transition-colors">
                            <Save className="w-4 h-4" />
                            COMMIT CHANGES
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left py-3 px-2 text-xs text-muted-foreground uppercase tracking-wider font-medium">
                                        Classification
                                    </th>
                                    <th className="text-center py-3 px-2 text-xs text-muted-foreground uppercase tracking-wider font-medium">
                                        Lower Bound
                                    </th>
                                    <th className="text-center py-3 px-2 text-xs text-muted-foreground uppercase tracking-wider font-medium">
                                        Upper Bound
                                    </th>
                                    <th className="text-center py-3 px-2 text-xs text-muted-foreground uppercase tracking-wider font-medium">
                                        Status Color
                                    </th>
                                    <th className="text-center py-3 px-2 text-xs text-muted-foreground uppercase tracking-wider font-medium">
                                        Edit
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {thresholdLevels.map((level, index) => (
                                    <tr
                                        key={level.classification}
                                        className="border-b border-border/50"
                                    >
                                        <td className="py-4 px-2 text-sm text-foreground">
                                            {level.classification}
                                        </td>
                                        <td className="py-4 px-2 text-center">
                                            <span
                                                className={`font-mono text-sm ${index === 0 ? 'text-status-good' : 'text-muted-foreground'}`}
                                            >
                                                {level.lowerBound}
                                            </span>
                                        </td>
                                        <td className="py-4 px-2 text-center">
                                            <input
                                                type="text"
                                                defaultValue={level.upperBound}
                                                className="w-20 bg-muted/50 border border-border rounded px-2 py-1 text-sm text-foreground text-center font-mono focus:outline-none focus:border-primary"
                                            />
                                        </td>
                                        <td className="py-4 px-2 text-center">
                                            <div className="flex justify-center">
                                                <span
                                                    className={`w-4 h-4 rounded-full ${level.color}`}
                                                ></span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-2 text-center">
                                            <button className="text-muted-foreground hover:text-foreground transition-colors">
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Notification Channels */}
                <div className="bg-card rounded-lg border border-border p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-foreground uppercase tracking-wider">
                            Notification Channels
                        </h3>
                        <Webhook className="w-5 h-5 text-muted-foreground" />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        {notificationChannels.map((channel) => (
                            <div
                                key={channel.name}
                                className="flex flex-col items-center text-center p-4 bg-muted/30 rounded-lg"
                            >
                                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-3">
                                    <channel.icon className="w-6 h-6 text-primary" />
                                </div>
                                <p className="text-sm font-medium text-foreground mb-1">
                                    {channel.name}
                                </p>
                                <p className="text-xs text-muted-foreground mb-4">
                                    {channel.description}
                                </p>
                                <button
                                    onClick={() => toggleChannel(channel.name)}
                                    className={`w-12 h-6 rounded-full transition-colors relative ${
                                        channelStates[channel.name]
                                            ? 'bg-primary'
                                            : 'bg-muted'
                                    }`}
                                >
                                    <span
                                        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                                            channelStates[channel.name]
                                                ? 'translate-x-7'
                                                : 'translate-x-1'
                                        }`}
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Engine Validation Logs */}
                <div className="bg-card rounded-lg border border-border p-6 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-foreground uppercase tracking-wider">
                            Engine Validation Logs
                        </h3>
                        <History className="w-5 h-5 text-muted-foreground" />
                    </div>

                    {/* Decorative checkmark */}
                    <div className="absolute top-6 right-6 opacity-10">
                        <CheckCircle className="w-32 h-32 text-primary" />
                    </div>

                    <div className="space-y-4 relative">
                        {validationLogs.map((log, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <div
                                    className={`w-8 h-8 rounded-lg ${log.iconBg} flex items-center justify-center shrink-0`}
                                >
                                    <log.icon
                                        className={`w-4 h-4 ${log.iconColor}`}
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-foreground">
                                            {log.title}
                                        </p>
                                        <span className="text-xs text-muted-foreground font-mono">
                                            {log.time}
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        {log.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
