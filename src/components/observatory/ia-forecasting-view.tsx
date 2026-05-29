'use client'

import {
    AlertTriangle,
    FileText,
    Activity,
    Globe
} from 'lucide-react'
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { Skeleton } from '@/components/ui/skeleton'
import { usePredictions } from '@/hooks/providers/usePredictions'

export function IAForecastingView() {
    const { predictionData, probabilityZones, influenceFactors, loading } =
        usePredictions()

    if (loading) {
        return (
            <div className="flex-1 p-6 overflow-auto">
                <div className="mb-8">
                    <Skeleton className="h-8 w-64 mb-2" />
                    <Skeleton className="h-4 w-96" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="col-span-12 lg:col-span-8 space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-card rounded-lg border border-border p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <Skeleton className="h-3 w-32 mb-1" />
                                        <Skeleton className="h-6 w-48" />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Skeleton className="h-3 w-28" />
                                        <Skeleton className="h-3 w-28" />
                                    </div>
                                </div>
                                <Skeleton className="h-64 w-full" />
                            </div>
                            <div className="bg-card rounded-lg border border-border p-6">
                                <Skeleton className="h-3 w-24 mb-1" />
                                <Skeleton className="h-6 w-40 mb-6" />
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="mb-5">
                                        <div className="flex items-center justify-between mb-2">
                                            <Skeleton className="h-4 w-24" />
                                            <Skeleton className="h-4 w-8" />
                                        </div>
                                        <Skeleton className="h-2 w-full rounded-full" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-card rounded-lg border border-border p-6">
                                    <Skeleton className="h-3 w-28 mb-1" />
                                    <Skeleton className="h-6 w-36 mb-4" />
                                    <Skeleton className={`h-40 w-full ${i === 3 ? 'rounded-full' : ''}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-4 space-y-6">
                        <div className="bg-card rounded-lg border border-border p-6">
                            <Skeleton className="h-6 w-48 mb-4" />
                            <Skeleton className="h-4 w-24 mb-2" />
                            <Skeleton className="h-5 w-36 mb-6" />
                            <Skeleton className="h-4 w-32 mb-3" />
                            <div className="space-y-3">
                                <Skeleton className="h-20 w-full rounded-lg" />
                                <Skeleton className="h-20 w-full rounded-lg" />
                            </div>
                            <Skeleton className="h-11 w-full mt-6 rounded-lg" />
                        </div>
                        <Skeleton className="h-80 w-full rounded-lg" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex-1 p-6 overflow-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-light text-foreground mb-2">
                    IA Forecasting Engine
                </h1>
                <p className="text-muted-foreground">
                    High-Precision Atmospheric Projection & Predictive Analytics
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Main Content - Left Side */}
                <div className="col-span-12 lg:col-span-8 space-y-6">
                    {/* Temporal Prediction Chart & Probability Matrix */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Temporal Prediction Chart */}
                        <div className="bg-card rounded-lg border border-border p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                        PROJECTION MODULE
                                    </p>
                                    <h3 className="text-xl font-semibold text-foreground">
                                        Temporal Prediction Chart
                                    </h3>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                                        Historical PM2.5
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-primary/50"></span>
                                        6h/12h/24h Projections
                                    </div>
                                </div>
                            </div>

                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={predictionData}>
                                        <defs>
                                            <linearGradient
                                                id="historicalGradient"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="5%"
                                                    stopColor="#06b6d4"
                                                    stopOpacity={0.3}
                                                />
                                                <stop
                                                    offset="95%"
                                                    stopColor="#06b6d4"
                                                    stopOpacity={0}
                                                />
                                            </linearGradient>
                                            <linearGradient
                                                id="projectionGradient"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="5%"
                                                    stopColor="#06b6d4"
                                                    stopOpacity={0.15}
                                                />
                                                <stop
                                                    offset="95%"
                                                    stopColor="#06b6d4"
                                                    stopOpacity={0}
                                                />
                                            </linearGradient>
                                        </defs>
                                        <XAxis
                                            dataKey="time"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{
                                                fill: 'var(--muted-foreground)',
                                                fontSize: 10
                                            }}
                                        />
                                        <YAxis hide />
                                        <Area
                                            type="monotone"
                                            dataKey="historical"
                                            stroke="var(--primary)"
                                            strokeWidth={2}
                                            fill="url(#historicalGradient)"
                                            connectNulls={false}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="projection"
                                            stroke="var(--primary)"
                                            strokeWidth={2}
                                            strokeDasharray="5 5"
                                            fill="url(#projectionGradient)"
                                            connectNulls
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Probability Matrix */}
                        <div className="bg-card rounded-lg border border-border p-6">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                INCIDENT RISK
                            </p>
                            <h3 className="text-xl font-semibold text-foreground mb-6">
                                Probability Matrix
                            </h3>

                            <div className="space-y-5">
                                {probabilityZones.map((zone) => (
                                    <div key={zone.name}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-foreground">
                                                {zone.name}
                                            </span>
                                            <span
                                                className={`text-sm font-semibold ${zone.probability > 80 ? 'text-status-unhealthy' : 'text-primary'}`}
                                            >
                                                {zone.probability}%
                                            </span>
                                        </div>
                                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${zone.color} rounded-full transition-all duration-500`}
                                                style={{
                                                    width: `${zone.probability}%`
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Influence Factors */}
                        <div className="bg-card rounded-lg border border-border p-6">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                LOGIC BREAKDOWN
                            </p>
                            <h3 className="text-xl font-semibold text-foreground mb-4">
                                Influence Factors
                            </h3>

                          <div className="space-y-4">
                                  {influenceFactors.map((factor) => {
                                      const Icon = factor.icon || Activity;
                                      return (
                                          <div
                                              key={factor.title}
                                              className="flex gap-3"
                                          >
                                              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                                                  <Icon className="w-4 h-4 text-primary" />
                                              </div>
                                              <div>
                                                  <h4 className="text-sm font-medium text-foreground mb-1">
                                                      {factor.title}
                                                  </h4>
                                                  <p className="text-xs text-muted-foreground leading-relaxed">
                                                      {factor.description}
                                                  </p>
                                              </div>
                                          </div>
                                      );
                                  })}
                              </div>
                        </div>

                        {/* Future Dispersion Map */}
                        <div className="bg-card rounded-lg border border-border p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                        GEOSPATIAL PROJECTION
                                    </p>
                                    <h3 className="text-xl font-semibold text-foreground">
                                        Future Dispersion Map
                                    </h3>
                                </div>
                                <span className="px-2 py-1 bg-status-good/20 text-status-good text-xs rounded border border-status-good/30">
                                    LIVE SIMULATION
                                </span>
                            </div>

                            <div className="h-40 bg-muted/30 rounded-lg flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 opacity-30">
                                    <svg
                                        viewBox="0 0 200 100"
                                        className="w-full h-full"
                                    >
                                        <path
                                            d="M20,50 Q50,30 80,50 T140,50 T200,50"
                                            stroke="var(--primary)"
                                            strokeWidth="0.5"
                                            fill="none"
                                            opacity="0.5"
                                        />
                                        <path
                                            d="M20,60 Q60,40 100,60 T160,60 T200,60"
                                            stroke="var(--primary)"
                                            strokeWidth="0.5"
                                            fill="none"
                                            opacity="0.3"
                                        />
                                        <circle
                                            cx="100"
                                            cy="50"
                                            r="15"
                                            fill="var(--primary)"
                                            opacity="0.2"
                                        />
                                        <circle
                                            cx="140"
                                            cy="45"
                                            r="10"
                                            fill="var(--status-sensitive)"
                                            opacity="0.3"
                                        />
                                    </svg>
                                </div>
                                <Globe className="w-12 h-12 text-muted-foreground/30" />
                            </div>
                        </div>

                        {/* Model Confidence */}
                        <div className="bg-card rounded-lg border border-border p-6 flex flex-col items-center justify-center">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">
                                MODEL CONFIDENCE
                            </p>

                            <div className="relative w-32 h-32">
                                <svg
                                    className="w-full h-full -rotate-90"
                                    viewBox="0 0 100 100"
                                >
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        fill="none"
                                        stroke="var(--border)"
                                        strokeWidth="8"
                                    />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        fill="none"
                                        stroke="var(--primary)"
                                        strokeWidth="8"
                                        strokeDasharray={`${94.2 * 2.51} ${100 * 2.51}`}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-2xl font-bold text-primary">
                                        94.2%
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        ACCURACY
                                    </span>
                                </div>
                            </div>

                            <p className="text-sm text-foreground mt-4">
                                Real vs. Predicted
                            </p>
                            <p className="text-xs text-muted-foreground text-center mt-1">
                                Validation based on last 72h historical
                                deviation.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - Early Warning System */}
                <div className="col-span-12 lg:col-span-4 space-y-6">
                    {/* Early Warning Panel */}
                    <div className="bg-card rounded-lg border border-border p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle className="w-5 h-5 text-status-sensitive" />
                            <h3 className="text-lg font-semibold text-foreground uppercase tracking-wider">
                                Early Warning (EWS)
                            </h3>
                        </div>

                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                            RISK STATUS
                        </p>
                        <p className="text-status-sensitive font-semibold mb-6">
                            Level 2: Elevated Precaution
                        </p>

                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                            ACTIVE THRESHOLDS
                        </p>
                        <div className="space-y-3">
                            <div className="bg-muted/50 rounded-lg p-4 border-l-2 border-status-sensitive">
                                <p className="text-sm font-medium text-foreground">
                                    PM10 Spike Detected
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    North-West Industrial Hub
                                </p>
                            </div>
                            <div className="bg-muted/50 rounded-lg p-4 border-l-2 border-primary">
                                <p className="text-sm font-medium text-foreground">
                                    Inversion Probability
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Expected at 04:00 AM
                                </p>
                            </div>
                        </div>

                        <button className="mt-6 w-full flex items-center justify-center gap-2 bg-primary/20 hover:bg-primary/30 text-primary px-4 py-3 rounded-lg border border-primary/30 transition-colors">
                            <FileText className="w-4 h-4" />
                            Export Crisis Report (PDF)
                        </button>
                    </div>

                    {/* Node Analytics */}
                    <div className="bg-card rounded-lg border border-border overflow-hidden">
                        <div className="h-48 bg-linear-to-br from-primary/20 to-background relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-32 h-32 rounded-full border border-primary/30 flex items-center justify-center">
                                    <div className="w-24 h-24 rounded-full border border-primary/20 flex items-center justify-center">
                                        <Globe className="w-12 h-12 text-primary/50" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                NODE ANALYTICS
                            </p>
                            <h3 className="text-lg font-semibold text-foreground">
                                System Resilience: Optimal
                            </h3>
                            <div className="flex items-center gap-2 mt-2">
                                <Activity className="w-4 h-4 text-primary" />
                                <span className="text-sm text-muted-foreground">
                                    Cluster Safe work
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
