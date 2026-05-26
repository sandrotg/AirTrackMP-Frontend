'use client'

import { useState } from 'react'
import {
    Calendar,
    MapPin,
    ArrowLeftRight,
    Play,
    TrendingDown,
    TrendingUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
    Legend,
    ScatterChart,
    Scatter,
    ZAxis
} from 'recharts'
import { Skeleton } from '@/components/ui/skeleton'
import { useDataExplorer } from '@/hooks/providers/useDataExplorer'

export function DataExplorerView() {
    const { weeklyData, scatterData, loading } = useDataExplorer()
    const [viewMode, setViewMode] = useState<'raw' | 'hourly' | 'daily'>('raw')
    const [sliderValue, setSliderValue] = useState(50)

    if (loading) {
        return (
            <div className="flex-1 flex flex-col min-h-0 overflow-auto">
                <div className="p-6 border-b border-slate-700/50">
                    <Skeleton className="h-3 w-48 mb-2" />
                    <Skeleton className="h-8 w-64" />
                </div>
                <div className="p-6 border-b border-slate-700/50">
                    <div className="flex items-center gap-4">
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} className="flex-1 h-20 rounded-lg" />
                        ))}
                        <Skeleton className="h-20 w-36 rounded-lg" />
                    </div>
                </div>
                <div className="flex-1 p-6 space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-slate-800/40 rounded-xl border border-slate-700/50 p-5">
                            <Skeleton className="h-5 w-64 mb-1" />
                            <Skeleton className="h-3 w-48 mb-4" />
                            <Skeleton className="h-72 w-full rounded-lg" />
                        </div>
                        <div className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-5">
                            <Skeleton className="h-5 w-40 mb-1" />
                            <Skeleton className="h-3 w-48 mb-4" />
                            <Skeleton className="h-48 w-full rounded-lg" />
                            <Skeleton className="h-8 w-24 mx-auto mt-4" />
                        </div>
                    </div>
                    <div className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-5">
                        <Skeleton className="h-5 w-48 mb-1" />
                        <Skeleton className="h-3 w-64 mb-4" />
                        <Skeleton className="h-64 w-full rounded-xl" />
                    </div>
                    <div className="grid grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-5">
                                <Skeleton className="h-3 w-24 mb-2" />
                                <Skeleton className="h-8 w-32 mb-2" />
                                <Skeleton className="h-3 w-28" />
                            </div>
                        ))}
                    </div>
                    <div className="pt-4 border-t border-slate-700/50">
                        <Skeleton className="h-3 w-64 mx-auto" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex-1 flex flex-col min-h-0 overflow-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
                <div>
                    <p className="text-xs text-cyan-400 uppercase tracking-wider mb-1">
                        ANALYTICAL PROTOCOL V4.2
                    </p>
                    <h1 className="text-2xl font-semibold text-foreground">
                        Data Explorer
                    </h1>
                </div>
                <div className="flex items-center gap-2">
                    {(['raw', 'hourly', 'daily'] as const).map((mode) => (
                        <button
                            key={mode}
                            onClick={() => setViewMode(mode)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                                viewMode === mode
                                    ? 'bg-slate-700 text-foreground'
                                    : 'text-slate-400 hover:text-foreground hover:bg-slate-800'
                            }`}
                        >
                            {mode.charAt(0).toUpperCase() + mode.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Filter Bar */}
            <div className="p-6 border-b border-slate-700/50">
                <div className="flex items-center gap-4">
                    <div className="flex-1 bg-slate-800/50 rounded-lg p-4 flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-cyan-400" />
                        <div>
                            <p className="text-xs text-slate-500 uppercase">
                                TEMPORAL RANGE
                            </p>
                            <p className="text-sm text-foreground">
                                Oct 14, 2023 - Oct 21, 2023
                            </p>
                        </div>
                    </div>
                    <div className="flex-1 bg-slate-800/50 rounded-lg p-4 flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-cyan-400" />
                        <div>
                            <p className="text-xs text-slate-500 uppercase">
                                BASELINE ZONE
                            </p>
                            <p className="text-sm text-foreground">
                                Via 40 - Industrial District
                            </p>
                        </div>
                    </div>
                    <div className="flex-1 bg-slate-800/50 rounded-lg p-4 flex items-center gap-3">
                        <ArrowLeftRight className="w-5 h-5 text-cyan-400" />
                        <div>
                            <p className="text-xs text-slate-500 uppercase">
                                COMPARISON ZONE
                            </p>
                            <p className="text-sm text-foreground">
                                Residencial - El Golf
                            </p>
                        </div>
                    </div>
                    <Button className="bg-cyan-600 hover:bg-cyan-700 text-white h-full px-6">
                        SYNCHRONIZE DATA
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 space-y-6">
                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Pollutant Contribution Matrix */}
                    <div className="lg:col-span-2 bg-slate-800/40 rounded-xl border border-slate-700/50 p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-lg font-semibold text-foreground">
                                    Pollutant Contribution Matrix
                                </h2>
                                <p className="text-sm text-slate-400 uppercase">
                                    PM2.5 VS PM10 CONCENTRATION (MG/M³)
                                </p>
                            </div>
                            <div className="flex items-center gap-4 text-xs">
                                <span className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-cyan-500" />
                                    PM 2.5
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-cyan-700" />
                                    PM 10
                                </span>
                            </div>
                        </div>

                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={weeklyData}
                                    barCategoryGap="15%"
                                >
                                    <XAxis
                                        dataKey="day"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748b', fontSize: 11 }}
                                    />
                                    <YAxis hide />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1e293b',
                                            border: '1px solid #334155',
                                            borderRadius: '8px'
                                        }}
                                        labelStyle={{ color: '#94a3b8' }}
                                    />
                                    <Bar
                                        dataKey="pm25"
                                        fill="#06b6d4"
                                        radius={[4, 4, 0, 0]}
                                        name="PM2.5"
                                    />
                                    <Bar
                                        dataKey="pm10"
                                        fill="#0e7490"
                                        radius={[4, 4, 0, 0]}
                                        name="PM10"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Environmental Correlation */}
                    <div className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-5">
                        <h2 className="text-lg font-semibold text-foreground mb-1">
                            Environmental Correlation
                        </h2>
                        <p className="text-sm text-cyan-400 uppercase mb-4">
                            HUMIDITY (%) VS PM10 PATTERNS
                        </p>

                        <div className="h-48 flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <ScatterChart
                                    margin={{
                                        top: 20,
                                        right: 20,
                                        bottom: 10,
                                        left: 10
                                    }}
                                >
                                    <XAxis
                                        type="number"
                                        dataKey="humidity"
                                        name="Humidity"
                                        tick={{ fill: '#64748b', fontSize: 10 }}
                                        axisLine={false}
                                        tickLine={false}
                                        domain={[0, 100]}
                                    />
                                    <YAxis
                                        type="number"
                                        dataKey="pm10"
                                        name="PM10"
                                        hide
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1e293b',
                                            border: '1px solid #334155',
                                            borderRadius: '8px'
                                        }}
                                    />
                                    <Scatter
                                        data={scatterData}
                                        fill="#06b6d4"
                                    />
                                </ScatterChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="text-center mt-4">
                            <p className="text-3xl font-bold text-cyan-400">
                                R²: 0.84
                            </p>
                            <p className="text-xs text-slate-400 uppercase mt-1">
                                HIGH SENSITIVITY DETECTED
                            </p>
                        </div>

                        <div className="flex justify-between text-xs text-slate-500 mt-4">
                            <span>L-HUMIDITY</span>
                            <span>H-HUMIDITY</span>
                        </div>
                    </div>
                </div>

                {/* Spatio-Temporal Heatmap */}
                <div className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-5">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-lg font-semibold text-foreground">
                                Spatio-Temporal Heatmap
                            </h2>
                            <p className="text-sm text-slate-400 uppercase">
                                ATMOSPHERIC DISPERSION ANALYSIS (BARRANQUILLA,
                                COLOMBIA)
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="p-2 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
                                <Play className="w-4 h-4 text-slate-400" />
                            </button>
                            <div className="w-64 flex items-center gap-3">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={sliderValue}
                                    onChange={(e) =>
                                        setSliderValue(Number(e.target.value))
                                    }
                                    className="flex-1 h-1 bg-slate-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400"
                                />
                            </div>
                            <span className="text-sm text-cyan-400 font-medium">
                                WED 14:00
                            </span>
                        </div>
                    </div>

                    {/* Map Placeholder */}
                    <div className="relative h-64 bg-slate-900/50 rounded-xl overflow-hidden">
                        {/* Simulated map background */}
                        <div className="absolute inset-0 opacity-40">
                            <svg
                                viewBox="0 0 800 300"
                                className="w-full h-full"
                            >
                                <defs>
                                    <linearGradient
                                        id="mapGrad"
                                        x1="0%"
                                        y1="0%"
                                        x2="100%"
                                        y2="100%"
                                    >
                                        <stop offset="0%" stopColor="#0f172a" />
                                        <stop
                                            offset="50%"
                                            stopColor="#1e293b"
                                        />
                                        <stop
                                            offset="100%"
                                            stopColor="#0f172a"
                                        />
                                    </linearGradient>
                                </defs>
                                <rect
                                    fill="url(#mapGrad)"
                                    width="800"
                                    height="300"
                                />
                                {/* Coastline simulation */}
                                <path
                                    d="M0,150 Q100,140 200,160 T400,155 T600,145 T800,160"
                                    fill="none"
                                    stroke="#334155"
                                    strokeWidth="2"
                                />
                                {/* Grid lines */}
                                {[...Array(8)].map((_, i) => (
                                    <line
                                        key={`v${i}`}
                                        x1={i * 100}
                                        y1="0"
                                        x2={i * 100}
                                        y2="300"
                                        stroke="#1e293b"
                                        strokeWidth="1"
                                    />
                                ))}
                                {[...Array(6)].map((_, i) => (
                                    <line
                                        key={`h${i}`}
                                        x1="0"
                                        y1={i * 50}
                                        x2="800"
                                        y2={i * 50}
                                        stroke="#1e293b"
                                        strokeWidth="1"
                                    />
                                ))}
                            </svg>
                        </div>

                        {/* Critical marker */}
                        <div className="absolute top-1/3 left-1/3 flex flex-col items-center">
                            <span className="px-2 py-0.5 bg-slate-800 text-xs font-medium text-foreground rounded mb-1">
                                CRITICAL
                            </span>
                            <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                        </div>

                        {/* Stable marker */}
                        <div className="absolute top-1/2 right-1/3 flex flex-col items-center">
                            <span className="px-2 py-0.5 bg-slate-800 text-xs font-medium text-foreground rounded mb-1">
                                STABLE
                            </span>
                            <span className="w-3 h-3 bg-emerald-500 rounded-full" />
                        </div>

                        {/* AQI Scale */}
                        <div className="absolute bottom-4 right-4 bg-slate-800/90 rounded-lg p-3">
                            <p className="text-xs text-slate-400 uppercase mb-2">
                                AQI INTENSITY SCALE
                            </p>
                            <div className="flex gap-0.5">
                                <div className="w-6 h-3 bg-emerald-500 rounded-l" />
                                <div className="w-6 h-3 bg-emerald-400" />
                                <div className="w-6 h-3 bg-yellow-400" />
                                <div className="w-6 h-3 bg-orange-400" />
                                <div className="w-6 h-3 bg-red-500" />
                                <div className="w-6 h-3 bg-purple-500 rounded-r" />
                            </div>
                            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                                <span>GOOD</span>
                                <span>HAZARDOUS</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Stats */}
                <div className="grid grid-cols-4 gap-6">
                    <div className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-5">
                        <p className="text-xs text-slate-500 uppercase mb-2">
                            AVG. PM2.5
                        </p>
                        <p className="text-3xl font-bold text-foreground">
                            12.4{' '}
                            <span className="text-sm font-normal text-slate-400">
                                µg/m³
                            </span>
                        </p>
                        <div className="flex items-center gap-1 mt-2 text-xs text-cyan-400">
                            <TrendingDown className="w-3 h-3" />
                            <span>-8% vs last week</span>
                        </div>
                    </div>
                    <div className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-5">
                        <p className="text-xs text-slate-500 uppercase mb-2">
                            PEAK PM10
                        </p>
                        <p className="text-3xl font-bold text-foreground">
                            45.8{' '}
                            <span className="text-sm font-normal text-slate-400">
                                µg/m³
                            </span>
                        </p>
                        <div className="flex items-center gap-1 mt-2 text-xs text-orange-400">
                            <TrendingUp className="w-3 h-3" />
                            <span>+12% at industrial peak</span>
                        </div>
                    </div>
                    <div className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-5">
                        <p className="text-xs text-slate-500 uppercase mb-2">
                            PERSISTENCE RATING
                        </p>
                        <p className="text-3xl font-bold text-foreground">
                            High{' '}
                            <span className="text-sm font-normal text-slate-400">
                                Score
                            </span>
                        </p>
                        <p className="text-xs text-slate-400 mt-2">
                            Wind Stagnation Alert
                        </p>
                    </div>
                    <div className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-5">
                        <p className="text-xs text-slate-500 uppercase mb-2">
                            SENSOR RELIABILITY
                        </p>
                        <p className="text-3xl font-bold text-foreground">
                            99.8{' '}
                            <span className="text-sm font-normal text-slate-400">
                                %
                            </span>
                        </p>
                        <p className="text-xs text-cyan-400 mt-2">
                            All 14 Nodes Operational
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center text-xs text-slate-500 pt-4 border-t border-slate-700/50">
                    TECHNICAL OBSERVER ANALYSIS SUITE © 2024
                </div>
            </div>
        </div>
    )
}
