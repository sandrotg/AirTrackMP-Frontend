"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Map, MapControls, MapMarker, MarkerContent, MarkerTooltip } from "@/components/ui/map"

interface SensorNode {
  id: string
  name: string
  location: string
  longitude: number
  latitude: number
  status: "critical" | "warning" | "normal"
  pm25: number
  pm10: number
}

const sensorNodes: SensorNode[] = [
  {
    id: "sensor-1",
    name: "IND-001",
    location: "Zona Industrial",
    longitude: -99.0832,
    latitude: 19.4226,
    status: "critical",
    pm25: 68,
    pm10: 120,
  },
  {
    id: "sensor-2",
    name: "CTR-002",
    location: "Zona Centro",
    longitude: -99.1332,
    latitude: 19.4426,
    status: "normal",
    pm25: 18,
    pm10: 35,
  },
  {
    id: "sensor-3",
    name: "NRT-003",
    location: "Zona Norte",
    longitude: -99.1432,
    latitude: 19.4826,
    status: "normal",
    pm25: 22,
    pm10: 40,
  },
  {
    id: "sensor-4",
    name: "SUR-004",
    location: "Zona Sur",
    longitude: -99.1232,
    latitude: 19.3826,
    status: "warning",
    pm25: 38,
    pm10: 65,
  },
  {
    id: "sensor-5",
    name: "ORT-005",
    location: "Zona Oriente",
    longitude: -99.0732,
    latitude: 19.4326,
    status: "normal",
    pm25: 15,
    pm10: 28,
  },
]

const statusDotColors = {
  critical: "bg-destructive",
  warning: "bg-warning",
  normal: "bg-success",
}

const statusGlowColors = {
  critical: "shadow-destructive/50",
  warning: "shadow-warning/50",
  normal: "shadow-success/50",
}

export function MapView() {
  const [viewMode, setViewMode] = useState<"2d" | "3d">("3d")
  const [opacity, setOpacity] = useState(85)

  return (
    <div className="relative bg-card border border-border rounded-lg overflow-hidden h-[380px]">
      {/* Hotspot badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-secondary/90 backdrop-blur px-3 py-2 rounded-md">
        <span className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
        <span className="text-xs font-medium text-foreground">ACTIVE EMISSION HOTSPOT: ZONA INDUSTRIAL</span>
      </div>

      {/* Control buttons */}
      <div className="absolute top-14 left-4 z-10 flex gap-2">
        <button className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1.5 rounded">
          HEATMAP ON
        </button>
        <button className="bg-secondary text-secondary-foreground text-xs font-medium px-3 py-1.5 rounded hover:bg-secondary/80">
          SENSORS
        </button>
      </div>

      {/* Map */}
      <Map
        className="h-full w-full"
        center={[-99.1082, 19.4326]}
        zoom={12}
        projection={viewMode === "3d" ? { type: "globe" } : undefined}
      >
        <MapControls showCompass showZoom />

        {sensorNodes.map((node) => (
          <MapMarker key={node.id} longitude={node.longitude} latitude={node.latitude}>
            <MarkerContent>
              <div
                className={cn(
                  "h-3 w-3 rounded-full animate-pulse shadow-lg",
                  statusDotColors[node.status],
                  statusGlowColors[node.status],
                )}
              />
            </MarkerContent>
            <MarkerTooltip>
              <div className="text-xs space-y-1">
                <p className="font-bold">{node.name}</p>
                <p className="text-muted-foreground">{node.location}</p>
                <p>PM2.5: <span className="font-medium">{node.pm25}</span> μg/m³</p>
                <p>PM10: <span className="font-medium">{node.pm10}</span> μg/m³</p>
              </div>
            </MarkerTooltip>
          </MapMarker>
        ))}
      </Map>

      {/* Bottom controls */}
      <div className="absolute bottom-4 right-4 z-10 flex items-center gap-4 bg-secondary/90 backdrop-blur px-4 py-2 rounded-md">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">OPACITY</span>
          <input
            type="range"
            min="0"
            max="100"
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            className="w-20 h-1 bg-border rounded-full appearance-none cursor-pointer"
          />
          <span className="text-xs text-foreground w-8">{opacity}%</span>
        </div>
        <div className="flex rounded overflow-hidden">
          <button
            onClick={() => setViewMode("2d")}
            className={cn(
              "px-3 py-1 text-xs font-medium transition-colors",
              viewMode === "2d"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80",
            )}
          >
            2D VIEW
          </button>
          <button
            onClick={() => setViewMode("3d")}
            className={cn(
              "px-3 py-1 text-xs font-medium transition-colors",
              viewMode === "3d"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80",
            )}
          >
            3D TERRAIN
          </button>
        </div>
      </div>
    </div>
  )
}
