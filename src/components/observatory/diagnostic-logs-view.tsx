'use client'

import { useState } from 'react'
import {
    Download,
    Radio,
    Play,
    Square,
    Cpu,
    Database,
    CheckCircle2,
    Zap,
    Filter,
    Copy,
    ChevronDown
} from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useDiagnostics } from '@/hooks/providers/useDiagnostics'

export function DiagnosticLogsView() {
    const { logEntries, hexData, loading } = useDiagnostics()
    const [selectedNode, setSelectedNode] = useState(
        'PMS5003 (Laser Dust Sensor)'
    )
    const [terminalInput, setTerminalInput] = useState('')

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <Skeleton className="h-4 w-48 mb-2" />
                        <Skeleton className="h-9 w-72" />
                    </div>
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-10 w-40 rounded-lg" />
                        <Skeleton className="h-10 w-36 rounded-lg" />
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-card border border-border rounded-xl overflow-hidden">
                        <div className="p-4 border-b border-border">
                            <div className="flex items-center gap-2">
                                <Skeleton className="w-3 h-3 rounded-full" />
                                <Skeleton className="w-3 h-3 rounded-full" />
                                <Skeleton className="h-4 w-48 ml-2" />
                            </div>
                        </div>
                        <div className="p-4 space-y-2">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                <Skeleton key={i} className="h-4 w-full" />
                            ))}
                        </div>
                        <div className="p-4 border-t border-border">
                            <Skeleton className="h-4 w-28" />
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-card border border-border rounded-xl p-6">
                            <Skeleton className="h-5 w-40 mb-6" />
                            <Skeleton className="h-10 w-full mb-4 rounded-lg" />
                            <div className="grid grid-cols-2 gap-3">
                                <Skeleton className="h-20 rounded-lg" />
                                <Skeleton className="h-20 rounded-lg" />
                            </div>
                        </div>
                        <div className="bg-card border border-border rounded-xl p-6">
                            <Skeleton className="h-5 w-36 mb-4" />
                            <Skeleton className="h-4 w-20 mb-4" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-card border border-border rounded-xl p-4">
                            <Skeleton className="h-3 w-20 mb-3" />
                            <Skeleton className="h-7 w-24" />
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-center gap-6 pt-4 border-t border-border">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-3 w-32" />
                    ))}
                </div>
            </div>
        )
    }

    const decodedJson = `{
  "frame_header": "0x424D",
  "frame_length": 28,
  "pm1_0_std": 1,
  "pm2_5_std": 1,
  "pm10_std": 1,
  "pm1_0_atm": 1,`

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        Environment: PRODUCTION-01
                    </p>
                    <h1 className="text-3xl font-bold text-foreground mt-1">
                        Diagnostic Console
                    </h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-sm text-foreground">
                            Live Uplink Active
                        </span>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-card border border-primary text-primary rounded-lg text-sm hover:bg-primary/10 transition-colors">
                        <Download className="w-4 h-4" />
                        EXPORT LOGS
                    </button>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Terminal */}
                <div className="lg:col-span-2 bg-card border border-border rounded-xl overflow-hidden">
                    {/* Terminal Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <span className="text-sm text-muted-foreground ml-2">
                                SPRING BOOT / MQTT STREAM
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">
                                128.0.0.1:1883
                            </span>
                            <button className="p-1 hover:bg-muted rounded">
                                <Filter className="w-4 h-4 text-muted-foreground" />
                            </button>
                            <button className="p-1 hover:bg-muted rounded">
                                <Copy className="w-4 h-4 text-muted-foreground" />
                            </button>
                        </div>
                    </div>

                    {/* Terminal Content */}
                    <div className="p-4 font-mono text-sm h-96 overflow-y-auto bg-[#0a0f14]">
                        {logEntries.map((entry, index) => (
                            <div
                                key={index}
                                className="flex gap-2 py-1 hover:bg-white/5"
                            >
                                <span className="text-muted-foreground whitespace-nowrap">
                                    [{entry.time}]
                                </span>
                                <span className={entry.color}>
                                    {entry.type}
                                </span>
                                {entry.tag && (
                                    <span
                                        className={
                                            entry.type === 'MQTT'
                                                ? 'text-primary'
                                                : 'text-muted-foreground'
                                        }
                                    >
                                        {entry.tag}
                                    </span>
                                )}
                                <span className={entry.color}>
                                    {entry.message}
                                </span>
                            </div>
                        ))}
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-muted-foreground">_</span>
                            <span className="w-2 h-4 bg-primary animate-pulse" />
                        </div>
                    </div>

                    {/* Terminal Input */}
                    <div className="flex items-center gap-3 px-4 py-3 border-t border-border bg-background">
                        <span className="text-primary text-sm font-medium">
                            TERMINAL INPUT
                        </span>
                        <input
                            type="text"
                            value={terminalInput}
                            onChange={(e) => setTerminalInput(e.target.value)}
                            placeholder="Execute system command (e.g. tail -f /var/logs/syslog)..."
                            className="flex-1 bg-transparent text-foreground text-sm focus:outline-none placeholder:text-muted-foreground"
                        />
                    </div>
                </div>

                {/* Sensor Test Feature */}
                <div className="space-y-6">
                    <div className="bg-card border border-border rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <Radio className="w-5 h-5 text-primary" />
                            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                Sensor Test Feature
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs text-muted-foreground uppercase tracking-wider">
                                    Active Node
                                </label>
                                <div className="relative mt-2">
                                    <select
                                        value={selectedNode}
                                        onChange={(e) =>
                                            setSelectedNode(e.target.value)
                                        }
                                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground appearance-none focus:outline-none focus:border-primary"
                                    >
                                        <option>
                                            PMS5003 (Laser Dust Sensor)
                                        </option>
                                        <option>BME280 (Temp/Humidity)</option>
                                        <option>MQ135 (Air Quality)</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <button className="flex flex-col items-center gap-2 p-4 bg-background border border-border rounded-lg hover:bg-muted transition-colors">
                                    <Play className="w-5 h-5 text-foreground" />
                                    <span className="text-xs text-muted-foreground">
                                        INIT TEST
                                    </span>
                                </button>
                                <button className="flex flex-col items-center gap-2 p-4 bg-background border border-border rounded-lg hover:bg-muted transition-colors">
                                    <Square className="w-5 h-5 text-foreground" />
                                    <span className="text-xs text-muted-foreground">
                                        STOP TEST
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Raw Data Stream */}
                    <div className="bg-card border border-border rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                Raw Data Stream
                            </h2>
                            <span className="text-xs px-2 py-1 bg-green-500/20 text-green-500 rounded">
                                LIVE_HEX
                            </span>
                        </div>

                        <div className="font-mono text-xs space-y-2 mb-4">
                            {hexData.map((row, index) => (
                                <div key={index} className="flex gap-4">
                                    <span className="text-primary">
                                        {row.offset}
                                    </span>
                                    <span className="text-muted-foreground">
                                        {row.bytes}
                                    </span>
                                    <span className="text-muted-foreground">
                                        {row.ascii}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-border pt-4">
                            <p className="text-xs text-primary mb-2">
                                {'// Decoded JSON Packet'}
                            </p>
                            <pre className="text-xs text-muted-foreground whitespace-pre-wrap">
                                {decodedJson}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Stats */}
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">
                            Heap Usage
                        </p>
                        <p className="text-2xl font-bold text-foreground mt-1">
                            412{' '}
                            <span className="text-sm font-normal text-muted-foreground">
                                MB
                            </span>
                        </p>
                    </div>
                    <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center">
                        <Cpu className="w-5 h-5 text-muted-foreground" />
                    </div>
                </div>
                <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">
                            Active MQTT Threads
                        </p>
                        <p className="text-2xl font-bold text-foreground mt-1">
                            14
                        </p>
                    </div>
                    <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center">
                        <Database className="w-5 h-5 text-muted-foreground" />
                    </div>
                </div>
                <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">
                            Packet Loss (24H)
                        </p>
                        <p className="text-2xl font-bold text-foreground mt-1">
                            0.02{' '}
                            <span className="text-sm font-normal text-muted-foreground">
                                %
                            </span>
                        </p>
                    </div>
                    <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </div>
                </div>
                <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">
                            Disk I/O Latency
                        </p>
                        <p className="text-2xl font-bold text-foreground mt-1">
                            1.2{' '}
                            <span className="text-sm font-normal text-muted-foreground">
                                ms
                            </span>
                        </p>
                    </div>
                    <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center">
                        <Zap className="w-5 h-5 text-primary" />
                    </div>
                </div>
            </div>

            {/* Footer Status */}
            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground pt-4 border-t border-border">
                <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    CLUSTER 01-A
                </span>
                <span>
                    LATENCY: <span className="text-primary">12ms</span>
                </span>
                <span>UPTIME: 224d 14h</span>
            </div>
        </div>
    )
}
