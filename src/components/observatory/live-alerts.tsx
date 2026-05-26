"use client"

import { cn } from "@/lib/utils"
import { useAlerts } from "@/hooks/providers/useAlerts"
import { Skeleton } from "@/components/ui/skeleton"

const alertStyles = {
  critical: "border-l-destructive",
  warning: "border-l-warning",
  info: "border-l-muted-foreground",
}

const titleStyles = {
  critical: "text-destructive",
  warning: "text-warning",
  info: "text-muted-foreground",
}

export function LiveAlerts() {
  const { alerts, loading } = useAlerts()

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-4 h-full">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="size-2.5 rounded-full" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-secondary/50 border-l-2 border-l-muted rounded-r p-3">
              <div className="flex items-center justify-between mb-1">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-10" />
              </div>
              <Skeleton className="h-3 w-full" />
            </div>
          ))}
        </div>
        <Skeleton className="h-4 w-32 mx-auto mt-4" />
      </div>
    )
  }

  const mapped = alerts.slice(0, 5).map((a) => {
    const label =
      a.type === "critical"
        ? "ALERT"
        : a.type === "warning"
          ? "WARNING"
          : "INFO"
    return {
      id: a.id,
      type: a.type,
      title: `${a.parameter.toUpperCase()} ${label}`,
      time: a.timestamp.split(" ")[1]?.slice(0, 5) || a.timestamp,
      description: `${a.nodeName} — ${a.parameterValue} ${a.parameterUnit}`,
    }
  })

  return (
    <div className="bg-card border border-border rounded-lg p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground tracking-wide">
          LIVE ALERTS
        </h3>
        <span className="h-2.5 w-2.5 rounded-full bg-destructive animate-pulse" />
      </div>

      <div className="space-y-3">
        {mapped.map((alert) => (
          <div
            key={alert.id}
            className={cn(
              "bg-secondary/50 border-l-2 rounded-r p-3",
              alertStyles[alert.type]
            )}
          >
            <div className="flex items-center justify-between mb-1">
              <span
                className={cn("text-xs font-bold", titleStyles[alert.type])}
              >
                {alert.title}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {alert.time}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{alert.description}</p>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 text-xs font-semibold text-primary hover:text-primary/80 transition-colors tracking-wide">
        VIEW ALL HISTORY
      </button>
    </div>
  )
}
