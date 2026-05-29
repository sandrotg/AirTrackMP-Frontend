import { LiveAlerts } from '@/components/observatory/live-alerts'
import { MapView } from '@/components/observatory/map-view'
import { MetricCardsRow } from '@/components/observatory/metric-cards'
import {
    AirQualityChart,
    CorrelationChart
} from '@/components/observatory/charts'
import { SensorNodeManagement } from '@/components/observatory/sensor-nodes'

export default function DashboardPage() {
    return (
        <div className="space-y-4">
            {/* Map and Alerts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 gap-y-4 flex flex-col">
                    {/* Metrics Row */}
                    <MetricCardsRow />
                    <MapView />
                </div>
                <LiveAlerts />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <AirQualityChart />
                <CorrelationChart />
            </div>

            {/* Sensor Management */}
            <SensorNodeManagement />

            {/* Footer Status */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 py-2 px-4 bg-card border border-border rounded-lg text-xs">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-success shrink-0" />
                        <span className="text-muted-foreground">
                            SYSTEM ENGINE: OPTIMAL
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">
                            DB SYNC: 1.2S AGO
                        </span>
                    </div>
                </div>
                <div className="text-muted-foreground text-[10px] sm:text-xs">
                    CITYSCALE MONITORING SYSTEM v4.0.2 //
                    SECURE_HANDSHAKE_ESTABLISHED
                </div>
            </div>
        </div>
    )
}
