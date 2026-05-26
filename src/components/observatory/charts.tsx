'use client'

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    BarChart,
    Bar,
    Tooltip,
    AreaChart,
    Area,
    ScatterChart,
    Scatter,
    ZAxis
} from 'recharts'
import { useAnalytics } from '@/hooks/providers/useAnalytics'

export function AirQualityChart() {
    const { chartData, loading } = useAnalytics()

    if (loading || chartData.length === 0) {
        return (
            <div className="bg-card border border-border rounded-lg p-4 h-56 flex items-center justify-center">
                <span className="text-muted-foreground">Loading...</span>
            </div>
        )
    }

    // Convert chartData to the format expected by the chart
    const formattedData = chartData.map(point => ({
      time: point.time,
      pm25: point.value, // Using the value as PM2.5 for simplicity
      pm10: point.value * 0.8 // Approximate PM10 as 80% of PM2.5
    }));

    return (
        <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-foreground tracking-wide">
                    AIR QUALITY INDEX TRENDS (24H)
                </h3>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        <span className="text-[10px] text-muted-foreground">
                            PM2.5
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-muted-foreground" />
                        <span className="text-[10px] text-muted-foreground">
                            PM10
                        </span>
                    </div>
                </div>
            </div>

            <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={formattedData}>
                        <defs>
                            <linearGradient
                                id="pm25Gradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#22d3ee"
                                    stopOpacity={0.3}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#22d3ee"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#1e3a5f"
                            vertical={false}
                        />
                        <XAxis
                            dataKey="time"
                            tick={{ fill: '#64748b', fontSize: 10 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis hide />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#0f172a',
                                border: '1px solid #1e3a5f',
                                borderRadius: '4px',
                                fontSize: '11px'
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="pm25"
                            stroke="#22d3ee"
                            strokeWidth={2}
                            fill="url(#pm25Gradient)"
                        />
                        <Line
                            type="monotone"
                            dataKey="pm10"
                            stroke="#64748b"
                            strokeWidth={1.5}
                            dot={false}
                            strokeDasharray="4 4"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export function CorrelationChart() {
    const { correlationData, loading } = useAnalytics()

    if (loading || correlationData.length === 0) {
        return (
            <div className="bg-card border border-border rounded-lg p-4 h-48 flex items-center justify-center">
                <span className="text-muted-foreground">Loading...</span>
            </div>
        )
    }

    // Calculate correlation factor for display
    const calculateCorrelation = (data: {x: number, y: number}[]) => {
      if (data.length < 2) return 0;
      
      const n = data.length;
      const sumX = data.reduce((sum, point) => sum + point.x, 0);
      const sumY = data.reduce((sum, point) => sum + point.y, 0);
      const sumXY = data.reduce((sum, point) => sum + (point.x * point.y), 0);
      const sumX2 = data.reduce((sum, point) => sum + (point.x * point.x), 0);
      const sumY2 = data.reduce((sum, point) => sum + (point.y * point.y), 0);
      
      const numerator = n * sumXY - sumX * sumY;
      const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
      
      return denominator === 0 ? 0 : numerator / denominator;
    };

    const correlationFactor = calculateCorrelation(correlationData);
    const correlationPercentage = Math.abs(Math.round(correlationFactor * 100));

    return (
        <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-foreground tracking-wide">
                    POLLUTANT VS HUMIDITY CORRELATION
                </h3>
                <a href="#" className="text-[10px] text-primary underline">
                    ANALYTICS ENGINE V2.4
                </a>
            </div>

            <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={correlationData}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#1e3a5f"
                            vertical={false}
                        />
                        <XAxis hide />
                        <YAxis hide />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#0f172a',
                                border: '1px solid #1e3a5f',
                                borderRadius: '4px',
                                fontSize: '11px'
                            }}
                        />
                        <Bar
                            dataKey="y" // Using y (pollutant) as the bar value
                            fill="#1e4a6f"
                            radius={[2, 2, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
                <span>CORRELATION FACTOR: {correlationPercentage}% ({correlationPercentage >= 70 ? 'HIGH' : correlationPercentage >= 40 ? 'MEDIUM' : 'LOW'})</span>
                <span>SAMPLE: {correlationData.length} DATA POINTS</span>
            </div>
        </div>
    )
}

const pm25HumidityData = [
    { time: '00:00', pm25: 80, humidity: 45 },
    { time: '03:00', pm25: 90, humidity: 50 },
    { time: '06:00', pm25: 120, humidity: 55 },
    { time: '09:00', pm25: 150, humidity: 60 },
    { time: '12:00', pm25: 180, humidity: 70 },
    { time: '15:00', pm25: 160, humidity: 75 },
    { time: '18:00', pm25: 140, humidity: 80 },
    { time: '21:00', pm25: 100, humidity: 70 },
    { time: '23:59', pm25: 90, humidity: 60 }
]

export function AnalyticsChart() {
    const { correlationData, loading } = useAnalytics()

    if (loading || correlationData.length === 0) {
        return (
            <div className="bg-card border border-border rounded-lg p-6 flex items-center justify-center">
                <span className="text-muted-foreground">Loading...</span>
            </div>
        )
    }

    // Convert correlation data to the format expected by the chart
    const formattedData = correlationData.map(point => ({
      time: `${Math.floor(point.x / 10)}:00`, // Generate time labels based on humidity values
      pm25: point.y,
      humidity: point.x
    }));

    return (
        <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">
                        PM2.5 vs. Humidity Correlation
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                        MULTI-AXIS TEMPORAL DISTRIBUTION (LAST 24H)
                    </p>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <span className="h-0.5 w-6 bg-primary" />
                        <span className="text-[10px] text-muted-foreground">
                            PM 2.5 (MG/M³)
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="h-0.5 w-6 bg-muted-foreground border-dashed border-t" />
                        <span className="text-[10px] text-muted-foreground">
                            HUMIDITY (%)
                        </span>
                    </div>
                </div>
            </div>

            <div className="h-72 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={formattedData}>
                        <defs>
                            <linearGradient
                                id="pm25AreaGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#22d3ee"
                                    stopOpacity={0.2}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#22d3ee"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
                        <XAxis
                            dataKey="time"
                            tick={{ fill: '#64748b', fontSize: 10 }}
                            axisLine={{ stroke: '#1e3a5f' }}
                            tickLine={false}
                        />
                        <YAxis
                            yAxisId="left"
                            tick={{ fill: '#64748b', fontSize: 10 }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(value) => `${value} μg/m³`}
                        />
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            tick={{ fill: '#64748b', fontSize: 10 }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(value) => `${value}% RH`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#0f172a',
                                border: '1px solid #1e3a5f',
                                borderRadius: '4px',
                                fontSize: '11px'
                            }}
                        />
                        <Area
                            yAxisId="left"
                            type="monotone"
                            dataKey="pm25"
                            stroke="#22d3ee"
                            strokeWidth={2}
                            fill="url(#pm25AreaGradient)"
                        />
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="humidity"
                            stroke="#64748b"
                            strokeWidth={1.5}
                            strokeDasharray="4 4"
                            dot={false}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

const scatterData = [
    { x: 20, y: 30, z: 100 },
    { x: 35, y: 45, z: 150 },
    { x: 50, y: 60, z: 200 },
    { x: 65, y: 40, z: 120 },
    { x: 80, y: 70, z: 180 },
    { x: 45, y: 80, z: 250 }
]

export function ScatterPlotChart() {
    const { correlationData, loading } = useAnalytics()

    if (loading || correlationData.length === 0) {
        return (
            <div className="bg-card border border-border rounded-lg p-4 flex items-center justify-center">
                <span className="text-muted-foreground">Loading...</span>
            </div>
        )
    }

    // Convert correlation data to scatter plot format (x: humidity, y: pollutant, z: size based on pollutant value)
    const scatterData = correlationData.map(point => ({
      x: point.x, // humidity
      y: point.y, // pollutant
      z: 50 + (point.y / 100) * 150 // size based on pollutant value (50-200 range)
    }));

    return (
        <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h3 className="text-sm font-semibold text-foreground">
                        Pollutant Distribution
                    </h3>
                    <p className="text-[10px] text-muted-foreground">
                        SPATIAL DENSITY ANALYSIS
                    </p>
                </div>
            </div>

            <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
                        <XAxis
                            type="number"
                            dataKey="x"
                            tick={{ fill: '#64748b', fontSize: 10 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            type="number"
                            dataKey="y"
                            tick={{ fill: '#64748b', fontSize: 10 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <ZAxis type="number" dataKey="z" range={[50, 200]} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#0f172a',
                                border: '1px solid #1e3a5f',
                                borderRadius: '4px',
                                fontSize: '11px'
                            }}
                        />
                        <Scatter
                            data={scatterData}
                            fill="#22d3ee"
                            fillOpacity={0.6}
                        />
                    </ScatterChart>
                </ResponsiveContainer>
            </div>

            <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
                <span>← MASS DENSITY →</span>
                <span>↑ PARTICLE SIZE</span>
            </div>
        </div>
    )
}
