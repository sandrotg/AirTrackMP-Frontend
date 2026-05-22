import { MapView } from '@/components/observatory/map-view'
import { MetricCardsRow } from '@/components/observatory/metric-cards'

export default function DashboardPage() {
    return (
        <div className="space-y-4">
            {/* Metrics Row */}
            <MetricCardsRow />

            {/* Map and Alerts */}
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                    <MapView />
                </div>
                {/* <LiveAlerts /> */}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-2 gap-4">
                {/* <AirQualityChart /> */}
                {/* <CorrelationChart /> */}
            </div>

            {/* Sensor Management */}
            {/* <SensorNodeManagement /> */}

            {/* Footer Status */}
            <div className="flex items-center justify-between py-2 px-4 bg-card border border-border rounded-lg text-xs">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-success" />
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
                <div className="text-muted-foreground">
                    CITYSCALE MONITORING SYSTEM v4.0.2 //
                    SECURE_HANDSHAKE_ESTABLISHED
                </div>
            </div>
        </div>
    )
}
