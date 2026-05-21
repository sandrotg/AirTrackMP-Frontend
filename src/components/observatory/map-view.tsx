"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

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

      {/* Map background - stylized grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] to-[#0d1f3c]">
        <svg className="w-full h-full opacity-30" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e3a5f" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Stylized roads/paths */}
          <path d="M 100 200 Q 200 180 300 200 T 500 180 T 700 200" stroke="#2a4a6f" strokeWidth="2" fill="none" />
          <path d="M 150 100 Q 250 150 350 120 T 550 150 T 750 100" stroke="#2a4a6f" strokeWidth="1.5" fill="none" />
          <path d="M 50 300 Q 200 280 400 300 T 700 280" stroke="#2a4a6f" strokeWidth="1.5" fill="none" />
          <path d="M 200 50 L 200 350" stroke="#2a4a6f" strokeWidth="1" fill="none" />
          <path d="M 400 50 L 400 350" stroke="#2a4a6f" strokeWidth="1" fill="none" />
          <path d="M 600 50 L 600 350" stroke="#2a4a6f" strokeWidth="1" fill="none" />
          
          {/* Blocks/Areas */}
          <rect x="220" y="120" width="80" height="50" fill="#1a3550" rx="2" />
          <rect x="420" y="200" width="100" height="70" fill="#1a3550" rx="2" />
          <rect x="550" y="100" width="60" height="80" fill="#1a3550" rx="2" />
          <rect x="100" y="250" width="90" height="60" fill="#1a3550" rx="2" />
          
          {/* Heatmap overlay */}
          <ellipse cx="400" cy="200" rx="120" ry="80" fill="url(#heatGradient)" opacity="0.4" />
          <ellipse cx="250" cy="280" rx="60" ry="40" fill="url(#heatGradient2)" opacity="0.3" />
          
          <defs>
            <radialGradient id="heatGradient">
              <stop offset="0%" stopColor="#ff4444" />
              <stop offset="50%" stopColor="#ff8800" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="heatGradient2">
              <stop offset="0%" stopColor="#ffaa00" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
        </svg>
        
        {/* Sensor points */}
        <div className="absolute top-[45%] left-[52%] h-3 w-3 rounded-full bg-destructive animate-pulse shadow-lg shadow-destructive/50" />
        <div className="absolute top-[30%] left-[30%] h-2 w-2 rounded-full bg-success" />
        <div className="absolute top-[60%] left-[70%] h-2 w-2 rounded-full bg-success" />
        <div className="absolute top-[70%] left-[25%] h-2 w-2 rounded-full bg-warning" />
        <div className="absolute top-[25%] left-[65%] h-2 w-2 rounded-full bg-success" />
      </div>

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
                : "bg-muted text-muted-foreground hover:bg-muted/80"
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
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            3D TERRAIN
          </button>
        </div>
      </div>
    </div>
  )
}
