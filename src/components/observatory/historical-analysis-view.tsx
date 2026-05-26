'use client'

import { useState } from 'react'
import {
    Calendar,
    RefreshCw,
    FileText,
    Table,
    Copy,
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
    Tooltip
} from 'recharts'
import { useMeasurements } from '@/hooks/providers/useMeasurements'

// Generate calendar data for pollution intensity
const generateCalendarData = () => {
    const data: number[][] = []
    for (let row = 0; row < 3; row++) {
        const rowData: number[] = []
        for (let col = 0; col < 52; col++) {
            rowData.push(Math.floor(Math.random() * 5))
        }
        data.push(rowData)
    }
    return data
}

const calendarData = generateCalendarData()

export function HistoricalAnalysisView() {
    const { hourlyData } = useMeasurements()
    const [timeRange] = useState('Last 12 Months')

    const criticalExceedances = [
        {
            type: 'PM2.5 Level Critical',
            date: 'Nov 14, 2023 • 08:42 AM',
            value: '52.1',
            unit: 'µg/m³'
        },
        {
            type: 'SO2 Threshold Spike',
            date: 'Oct 29, 2023 • 04:15 PM',
            value: '24.8',
            unit: 'ppb'
        },
        {
            type: 'NO2 Maintenance Limit',
            date: 'Sep 12, 2023 • 11:20 AM',
            value: '48.2',
            unit: 'ppb'
        },
        {
            type: 'PM2.5 Level Critical',
            date: 'Aug 05, 2023 • 07:10 AM',
            value: '61.0',
            unit: 'µg/m³'
        }
    ]

    return (
        <div className="flex-1 flex flex-col min-h-0 overflow-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
                <div>
                    <p className="text-xs text-cyan-400 uppercase tracking-wider mb-1">
                        DATA OBSERVATORY
                    </p>
                    <h1 className="text-2xl font-semibold text-foreground">
                        Historical Analysis & Pattern Logic
                    </h1>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        className="bg-slate-800/50 border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                        <Calendar className="w-4 h-4 mr-2" />
                        {timeRange}
                    </Button>
                    <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh Data
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 space-y-6">
                {/* Top Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Executive Summary Generator */}
                    <div className="lg:col-span-2 bg-slate-800/40 rounded-xl border border-slate-700/50 p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-lg font-semibold text-foreground">
                                    Executive Summary Generator
                                </h2>
                                <p className="text-sm text-slate-400">
                                    Automated technical compliance documentation
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
                                    <FileText className="w-4 h-4 text-slate-400" />
                                </button>
                                <button className="p-2 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
                                    <Table className="w-4 h-4 text-slate-400" />
                                </button>
                                <button className="p-2 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
                                    <Copy className="w-4 h-4 text-slate-400" />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-8 text-xs text-slate-400 mb-4">
                            <span>
                                REPORT REF:{' '}
                                <span className="text-slate-300">
                                    OBS-2023-HIST
                                </span>
                            </span>
                            <span>
                                CYCLE:{' '}
                                <span className="text-slate-300">
                                    2023 FULL ANALYSIS
                                </span>
                            </span>
                        </div>

                        <p className="text-sm text-slate-300 mb-6">
                            Analysis confirms{' '}
                            <span className="text-emerald-400">92.4%</span>{' '}
                            operational stability. Annual PM2.5 mean recorded at{' '}
                            <span className="text-cyan-400">18.4 µg/m³</span>,
                            maintaining a{' '}
                            <span className="text-cyan-400">-4.2%</span>{' '}
                            variance against prior cycle.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="bg-slate-900/50 rounded-lg p-4">
                                <p className="text-xs text-slate-500 uppercase mb-1">
                                    MAX VALUE
                                </p>
                                <p className="text-2xl font-bold text-foreground">
                                    42.8{' '}
                                    <span className="text-sm font-normal text-slate-400">
                                        µg/m³
                                    </span>
                                </p>
                            </div>
                            <div className="bg-slate-900/50 rounded-lg p-4">
                                <p className="text-xs text-slate-500 uppercase mb-1">
                                    MIN VALUE
                                </p>
                                <p className="text-2xl font-bold text-cyan-400">
                                    4.2{' '}
                                    <span className="text-sm font-normal text-slate-400">
                                        µg/m³
                                    </span>
                                </p>
                            </div>
                            <div className="bg-slate-900/50 rounded-lg p-4">
                                <p className="text-xs text-slate-500 uppercase mb-1">
                                    ALERT COUNT
                                </p>
                                <p className="text-2xl font-bold text-orange-400">
                                    14{' '}
                                    <span className="text-sm font-normal text-slate-400">
                                        Criticals
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Regulatory Comparison */}
                        <div className="bg-slate-900/50 rounded-lg p-4">
                            <p className="text-xs text-slate-500 uppercase mb-3">
                                REGULATORY COMPARISON (COLOMBIA RES. 2254)
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full"
                                        style={{ width: '78%' }}
                                    />
                                </div>
                                <span className="text-sm text-cyan-400 font-medium">
                                    78% vs Legal Limit
                                </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-3">
                                Weighted average remains within Resolution 2254
                                safety margins for 312 days.
                            </p>
                        </div>
                    </div>

                    {/* Compliance Status */}
                    <div className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-5">
                        <h2 className="text-lg font-semibold text-foreground mb-1">
                            Compliance Status
                        </h2>
                        <p className="text-sm text-slate-400 mb-4">
                            Real-time mapping against Colombian standards
                        </p>

                        {/* Annual Target */}
                        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-3 py-1.5 inline-block mb-3">
                            <span className="text-xs text-emerald-400 font-medium">
                                ANNUAL TARGET
                            </span>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden mr-4">
                                <div
                                    className="h-full bg-emerald-500 rounded-full"
                                    style={{ width: '88.5%' }}
                                />
                            </div>
                            <span className="text-sm text-emerald-400 font-medium">
                                88.5%
                            </span>
                        </div>

                        {/* Critical Exceedances */}
                        <h3 className="text-xs text-slate-500 uppercase mt-6 mb-3">
                            CRITICAL EXCEEDANCES
                        </h3>
                        <div className="space-y-3">
                            {criticalExceedances.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-slate-900/50 rounded-lg p-3 flex items-center justify-between"
                                >
                                    <div>
                                        <p className="text-sm font-medium text-foreground">
                                            {item.type}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            {item.date}
                                        </p>
                                    </div>
                                    <span className="text-sm font-medium text-orange-400">
                                        {item.value} {item.unit}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Pollution Intensity Calendar */}
                <div className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-5">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-lg font-semibold text-foreground">
                                Pollution Intensity Calendar
                            </h2>
                            <p className="text-sm text-slate-400">
                                Mapping PM2.5 levels across the standard fiscal
                                cycle
                            </p>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-400">
                            <span>Low Intensity</span>
                            <div className="flex gap-1">
                                {[0, 1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="w-3 h-3 rounded-sm"
                                        style={{
                                            backgroundColor: `rgba(6, 182, 212, ${0.2 + i * 0.2})`
                                        }}
                                    />
                                ))}
                            </div>
                            <span>High Spike</span>
                        </div>
                    </div>

                    {/* Calendar Grid */}
                    <div className="space-y-1">
                        {['Mon', 'Wed', 'Fri'].map((day, rowIndex) => (
                            <div key={day} className="flex items-center gap-2">
                                <span className="text-xs text-slate-500 w-8">
                                    {day}
                                </span>
                                <div className="flex gap-1 flex-wrap">
                                    {calendarData[rowIndex].map(
                                        (value, colIndex) => (
                                            <div
                                                key={colIndex}
                                                className="w-3 h-3 rounded-sm"
                                                style={{
                                                    backgroundColor: `rgba(6, 182, 212, ${0.15 + value * 0.2})`
                                                }}
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quarterly Labels */}
                    <div className="flex items-center gap-6 mt-4 text-xs text-slate-500">
                        <span>
                            <span className="text-slate-300">Q1:</span> Normal
                            Operations
                        </span>
                        <span>
                            <span className="text-slate-300">Q2:</span>{' '}
                            Maintenance Peak
                        </span>
                        <span>
                            <span className="text-slate-300">Q3:</span> Seasonal
                            Atmospheric Stagnation
                        </span>
                        <span>
                            <span className="text-slate-300">Q4:</span> Holiday
                            Load Baseline
                        </span>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Hourly Trend Profile */}
                    <div className="lg:col-span-2 bg-slate-800/40 rounded-xl border border-slate-700/50 p-5">
                        <h2 className="text-lg font-semibold text-foreground mb-1">
                            Hourly Trend Profile
                        </h2>
                        <p className="text-sm text-slate-400 mb-4">
                            Aggregated peak analysis across 24-hour cycle
                        </p>

                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={hourlyData}
                                    barCategoryGap="20%"
                                >
                                    <XAxis
                                        dataKey="hour"
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
                                        itemStyle={{ color: '#06b6d4' }}
                                    />
                                    <Bar
                                        dataKey="value"
                                        fill="#06b6d4"
                                        radius={[4, 4, 0, 0]}
                                        fillOpacity={0.8}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Node Connectivity Historical */}
                    <div className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-5">
                        <h2 className="text-lg font-semibold text-cyan-400 mb-4">
                            Node Connectivity Historical
                        </h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-400">
                                    Uptime Efficiency
                                </span>
                                <span className="text-sm font-medium text-emerald-400">
                                    99.98%
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-400">
                                    Latency Avg
                                </span>
                                <span className="text-sm font-medium text-foreground">
                                    14ms
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-400">
                                    Data Integrity
                                </span>
                                <span className="text-sm font-medium text-foreground">
                                    100% Verified
                                </span>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            className="w-full mt-6 bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700"
                        >
                            VIEW CALIBRATION LOGS
                        </Button>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-700/50">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                        <span>SYSTEM STATUS: NOMINAL</span>
                        <span className="ml-4">
                            Last DB Synchronization: 2m 14s ago
                        </span>
                    </div>
                    <span>HISTORICAL OBSERVER MODULE V2.4.0-STABLE</span>
                </div>
            </div>
        </div>
    )
}
