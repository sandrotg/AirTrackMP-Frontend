'use client'

import { AnalyticsChart, ScatterPlotChart } from './charts'
import { BrainCircuit, Layers } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { usePredictions } from '@/hooks/providers/usePredictions'

export function ForecastingView() {
    const { forecastingData, loading } = usePredictions()

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs text-muted-foreground tracking-wider">
                        FORECASTING ENGINE // ALPHA-9
                    </p>
                    <h1 className="text-3xl font-semibold text-foreground mt-1">
                        Deep Analytics & Trends
                    </h1>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <p className="text-xs text-muted-foreground">
                            CONFIDENCE INTERVAL
                        </p>
                        {loading ? (
                            <Skeleton className="h-8 w-20 mt-1 ml-auto" />
                        ) : (
                            <p className="text-2xl font-semibold text-foreground">
                                {forecastingData?.confidenceInterval}%
                            </p>
                        )}
                    </div>
                    <div className="bg-primary/20 rounded-lg px-4 py-2 text-right">
                        <p className="text-[10px] text-muted-foreground">
                            PROCESSING NODE
                        </p>
                        {loading ? (
                            <Skeleton className="h-5 w-28 mt-1 ml-auto" />
                        ) : (
                            <p className="text-sm font-bold text-primary">
                                {forecastingData?.processingNode}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart */}
                <div className="col-span-2">
                    <AnalyticsChart />
                </div>

                {/* 48h Forecasting Panel */}
                <div className="bg-card border border-border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-4">
                        <BrainCircuit className="h-5 w-5 text-primary" />
                        <h3 className="text-sm font-semibold text-foreground">
                            48h Forecasting
                        </h3>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-xs text-muted-foreground">
                                NEXT 12 HOURS
                            </p>
                            <p className="text-xl font-semibold text-foreground">
                                Low Risk
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-light text-foreground">
                                22
                            </p>
                            <p className="text-xs text-muted-foreground">
                                AQI PRED.
                            </p>
                        </div>
                    </div>

                    <div className="w-full h-1 bg-secondary rounded-full mb-4">
                        <div
                            className="h-full bg-success rounded-full"
                            style={{ width: '22%' }}
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
                        <div className="bg-secondary/50 rounded-lg p-3">
                            <p className="text-[10px] text-muted-foreground mb-1">
                                PEAK POLLUTANT
                            </p>
                            <p className="text-sm font-semibold text-primary">
                                NO2 @ 16:00
                            </p>
                        </div>
                        <div className="bg-secondary/50 rounded-lg p-3">
                            <p className="text-[10px] text-muted-foreground mb-1">
                                INVERSION PROB.
                            </p>
                            <p className="text-sm font-semibold text-foreground">
                                12%
                            </p>
                        </div>
                    </div>

                    <div className="bg-primary/10 border border-primary/30 rounded-lg p-3">
                        <p className="text-xs text-primary italic">
                            &quot;Thermal inversion patterns suggests a 40%
                            increase in localized PM10 concentration between
                            02:00 and 05:00 tomorrow.&quot;
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* Scatter Plot */}
                <ScatterPlotChart />

                {/* Metric Cards */}
                <div className="bg-card border border-border rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-2">
                        CO2 CONTENT
                    </p>
                    <p className="text-4xl font-light text-foreground">
                        418 <span className="text-sm">ppm</span>
                    </p>
                    <div className="w-full h-1 bg-secondary rounded-full mt-3">
                        <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: '42%' }}
                        />
                    </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-2">
                        OZONE LEVEL
                    </p>
                    <p className="text-4xl font-light text-foreground">
                        0.04 <span className="text-sm">ppb</span>
                    </p>
                    <div className="w-full h-1 bg-secondary rounded-full mt-3">
                        <div
                            className="h-full bg-success rounded-full"
                            style={{ width: '15%' }}
                        />
                    </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-2">
                        SO2 INTENSITY
                    </p>
                    <p className="text-4xl font-light text-foreground">
                        12.5 <span className="text-sm">μg/m³</span>
                    </p>
                    <div className="w-full h-1 bg-secondary rounded-full mt-3">
                        <div
                            className="h-full bg-warning rounded-full"
                            style={{ width: '35%' }}
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-card border border-border rounded-lg p-4 flex items-center gap-4">
                    <div className="p-3 bg-secondary rounded-lg">
                        <Layers className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-foreground">
                            System-wide Stability
                        </h4>
                        <p className="text-xs text-muted-foreground">
                            REAL-TIME EQUILIBRIUM MEASUREMENT ACROSS 124 SENSOR
                            NODES
                        </p>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-xs font-medium text-primary">
                            LIVE STREAM ACTIVE
                        </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Forecasting models are currently processing 1.2M data
                        points/sec using the{' '}
                        <span className="text-primary underline cursor-pointer">
                            Obsidian Metric v4
                        </span>{' '}
                        neural architecture.
                    </p>
                    <div className="flex justify-end mt-2">
                        <span className="text-xs text-muted-foreground">
                            DELTA &lt; 0.02%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
