'use client'

import { useState } from 'react'
import {
    Download,
    Plus,
    Code2,
    Cpu,
    RefreshCw,
    Power,
    CheckCircle2,
    AlertCircle,
    ChevronLeft,
    ChevronRight,
    MessageSquare
} from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useInventory } from '@/hooks/providers/useInventory'

export function InventoryView() {
    const { nodes, commandHistory, loading } = useInventory()
    const [macAddress, setMacAddress] = useState('00:1A:2B:3C:4D:5E')
    const [latitude, setLatitude] = useState('40.7128')
    const [longitude, setLongitude] = useState('74.0060')
    const [locationId, setLocationId] = useState('Server Room B-12')

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <Skeleton className="h-8 w-64 mb-2" />
                        <Skeleton className="h-4 w-72" />
                    </div>
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-10 w-36 rounded-lg" />
                        <Skeleton className="h-10 w-36 rounded-lg" />
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-card border border-border rounded-xl p-6">
                        <Skeleton className="h-5 w-40 mb-6" />
                        <div className="space-y-4">
                            <Skeleton className="h-12 w-full rounded-lg" />
                            <div className="grid grid-cols-2 gap-4">
                                <Skeleton className="h-12 w-full rounded-lg" />
                                <Skeleton className="h-12 w-full rounded-lg" />
                            </div>
                            <Skeleton className="h-12 w-full rounded-lg" />
                            <Skeleton className="h-11 w-full rounded-lg" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
                            <Skeleton className="h-24 rounded-lg" />
                            <Skeleton className="h-24 rounded-lg" />
                        </div>
                    </div>
                    <div className="bg-card border border-border rounded-xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <Skeleton className="h-5 w-48" />
                            <Skeleton className="h-6 w-40 rounded-full" />
                        </div>
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton key={i} className="h-14 w-full mb-2" />
                        ))}
                        <Skeleton className="h-10 w-full mt-4" />
                    </div>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                    {[1, 2].map((i) => (
                        <Skeleton key={i} className="h-20 w-full mb-2 rounded-lg" />
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
                        Inventory & Node Control
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        <span className="text-primary">● 34 ACTIVE NODES</span>
                        <span className="mx-2">|</span>
                        Precision Environment Management v4.2.0
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-sm hover:bg-muted transition-colors">
                        <Download className="w-4 h-4" />
                        Export Config
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors">
                        <Plus className="w-4 h-4" />
                        Add New Node
                    </button>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Node Provisioning */}
                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <Code2 className="w-5 h-5 text-primary" />
                        <h2 className="text-lg font-semibold text-foreground">
                            Node Provisioning
                        </h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-xs text-muted-foreground uppercase tracking-wider">
                                Hardware MAC Address
                            </label>
                            <input
                                type="text"
                                value={macAddress}
                                onChange={(e) => setMacAddress(e.target.value)}
                                className="w-full mt-2 px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-muted-foreground uppercase tracking-wider">
                                    Latitude
                                </label>
                                <input
                                    type="text"
                                    value={latitude}
                                    onChange={(e) =>
                                        setLatitude(e.target.value)
                                    }
                                    className="w-full mt-2 px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                                    placeholder="N"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-muted-foreground uppercase tracking-wider">
                                    Longitude
                                </label>
                                <input
                                    type="text"
                                    value={longitude}
                                    onChange={(e) =>
                                        setLongitude(e.target.value)
                                    }
                                    className="w-full mt-2 px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                                    placeholder="W"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs text-muted-foreground uppercase tracking-wider">
                                Location ID / Room
                            </label>
                            <input
                                type="text"
                                value={locationId}
                                onChange={(e) => setLocationId(e.target.value)}
                                className="w-full mt-2 px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                            />
                        </div>

                        <button className="w-full py-3 bg-primary/20 text-primary border border-primary/30 rounded-lg font-medium hover:bg-primary/30 transition-colors mt-4">
                            INITIALIZE NODE SEQUENCE
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
                        <div className="bg-background rounded-lg p-4">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">
                                Total Bandwidth
                            </p>
                            <p className="text-3xl font-bold text-foreground mt-1">
                                4.2
                                <span className="text-lg font-normal text-muted-foreground">
                                    {' '}
                                    GB/s
                                </span>
                            </p>
                        </div>
                        <div className="bg-background rounded-lg p-4">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">
                                System Uptime
                            </p>
                            <p className="text-3xl font-bold text-foreground mt-1">
                                99.9
                                <span className="text-lg font-normal text-muted-foreground">
                                    %
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Hardware Health Matrix */}
                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <Cpu className="w-5 h-5 text-primary" />
                            <h2 className="text-lg font-semibold text-foreground">
                                Hardware Health Matrix
                            </h2>
                        </div>
                        <span className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full border border-primary/30">
                            MQTT BROKER: CONNECTED
                        </span>
                    </div>

                    {/* Table Header */}
                    <div className="grid grid-cols-5 gap-4 text-xs text-muted-foreground uppercase tracking-wider pb-3 border-b border-border">
                        <span>Node ID</span>
                        <span>Health</span>
                        <span>Uptime</span>
                        <span>FW Version</span>
                        <span>Actions</span>
                    </div>

                    {/* Table Rows */}
                    <div className="space-y-3 mt-3">
                        {nodes.map((node) => (
                            <div
                                key={node.id}
                                className="grid grid-cols-5 gap-4 items-center py-3 border-b border-border/50"
                            >
                                <div>
                                    <p className="text-sm font-medium text-foreground">
                                        {node.id}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {node.mac}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${
                                                node.health > 80
                                                    ? 'bg-green-500'
                                                    : node.health > 40
                                                      ? 'bg-yellow-500'
                                                      : 'bg-red-500'
                                            }`}
                                            style={{ width: `${node.health}%` }}
                                        />
                                    </div>
                                    <span
                                        className={`text-xs ${
                                            node.health > 80
                                                ? 'text-green-500'
                                                : node.health > 40
                                                  ? 'text-yellow-500'
                                                  : 'text-red-500'
                                        }`}
                                    >
                                        {node.status === 'offline'
                                            ? 'CRIT'
                                            : `${node.health}%`}
                                    </span>
                                </div>
                                <span
                                    className={`text-sm ${node.status === 'offline' ? 'text-red-500' : 'text-foreground'}`}
                                >
                                    {node.uptime}
                                </span>
                                <span className="text-xs px-2 py-1 bg-background rounded text-muted-foreground">
                                    {node.firmware}
                                </span>
                                <div className="flex items-center gap-2">
                                    {node.status === 'offline' ? (
                                        <button className="p-1.5 text-yellow-500 hover:bg-yellow-500/20 rounded transition-colors">
                                            <Power className="w-4 h-4" />
                                        </button>
                                    ) : (
                                        <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors">
                                            <RefreshCw className="w-4 h-4" />
                                        </button>
                                    )}
                                    <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors">
                                        <RefreshCw className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                        <p className="text-xs text-muted-foreground">
                            SHOWING 4 OF 34 OPERATIONAL NODES
                        </p>
                        <div className="flex items-center gap-2">
                            <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                                <ChevronLeft className="w-4 h-4" /> Previous
                            </button>
                            <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                                Next <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Remote Command History */}
            <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        Remote Command History
                    </h2>
                    <span className="text-xs text-muted-foreground">
                        Auto-refreshing in 5s...
                    </span>
                </div>

                <div className="space-y-3">
                    {commandHistory.map((cmd, index) => (
                        <div
                            key={index}
                            className={`flex items-start gap-3 p-4 rounded-lg border-l-2 ${
                                cmd.type === 'success'
                                    ? 'bg-green-500/5 border-green-500'
                                    : 'bg-red-500/5 border-red-500'
                            }`}
                        >
                            {cmd.type === 'success' ? (
                                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                            ) : (
                                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                            )}
                            <div className="flex-1">
                                <p
                                    className={`font-medium ${cmd.type === 'success' ? 'text-green-500' : 'text-red-500'}`}
                                >
                                    {cmd.command}
                                </p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {cmd.message}
                                </p>
                            </div>
                            <span className="text-xs text-muted-foreground">
                                {cmd.time}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating Chat Button */}
            <button className="fixed bottom-6 right-6 w-14 h-14 bg-card border border-border rounded-full flex items-center justify-center shadow-lg hover:bg-muted transition-colors">
                <MessageSquare className="w-6 h-6 text-foreground" />
            </button>
        </div>
    )
}
