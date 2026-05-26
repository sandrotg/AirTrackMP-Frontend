import { ThresholdsProvider } from "./provider"
import { NormativeOption, ThresholdLevel, NotificationChannel, ValidationLog } from "./mock"
import { getApiToken } from "@/lib/auth-token"
import { Bell, Mail, Webhook, CheckCircle, RefreshCw, Settings2 } from "lucide-react"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  CheckCircle,
  RefreshCw,
  Settings2,
}

const defaultThresholdLevels: ThresholdLevel[] = [
  { classification: "Good", lowerBound: "0.00", upperBound: "12.00", color: "bg-status-good" },
  { classification: "Moderate", lowerBound: "12.10", upperBound: "35.40", color: "bg-status-moderate" },
  { classification: "Unhealthy for Sensitive", lowerBound: "35.50", upperBound: "55.40", color: "bg-status-sensitive" },
  { classification: "Very Unhealthy", lowerBound: "55.50", upperBound: "150.40", color: "bg-status-unhealthy" },
  { classification: "Hazardous", lowerBound: "150.50", upperBound: "500.00", color: "bg-status-hazardous" },
]

const defaultNotificationChannels: NotificationChannel[] = [
  { name: "Push alerts", description: "Real-time mobile delivery", enabled: true, icon: Bell },
  { name: "Email Reports", description: "Scheduled log summaries", enabled: false, icon: Mail },
  { name: "External Hooks", description: "JSON Webhook execution", enabled: true, icon: Webhook },
]

export function createThresholdsApiProvider(): ThresholdsProvider {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

  return {
    type: "api",
    async getAll() {
      const token = getApiToken()
      if (!token) return defaultThresholdLevels
      try {
        const res = await fetch(`${API_BASE}/api/alert`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) return defaultThresholdLevels
        const alerts = await res.json()
        if (!alerts || alerts.length === 0) return defaultThresholdLevels

        const pm25Values = alerts.map((a: { measurement?: { pm25: number } }) => a.measurement?.pm25 || 0).filter(Boolean)
        if (pm25Values.length === 0) return defaultThresholdLevels

        const min = Math.min(...pm25Values)
        const max = Math.max(...pm25Values)

        return defaultThresholdLevels.map(t => ({
          ...t,
          upperBound: t.classification === "Good" ? min.toFixed(2) : t.upperBound,
          lowerBound: t.classification === "Hazardous" ? max.toFixed(2) : t.lowerBound,
        }))
      } catch {
        return defaultThresholdLevels
      }
    },
    async getById(id: string) {
      const levels = await this.getAll()
      return levels.find(t => t.classification === id) || null
    },
    async getNormativeOptions() {
      return [
        { id: "who", name: "WHO Standards", description: "Global health guidelines for long-term exposure safety.", active: true },
        { id: "local", name: "Local Regulation (Resolution 2254)", description: "Specific compliance metrics for territorial jurisdiction.", active: false },
        { id: "custom", name: "Custom Configuration", description: "User-defined limits for specialized industrial monitoring.", active: false },
      ]
    },
    async getThresholdLevels() {
      return this.getAll()
    },
    async getNotificationChannels() {
      return defaultNotificationChannels
    },
    async getValidationLogs() {
      const token = getApiToken()
      if (!token) return []
      const res = await fetch(`${API_BASE}/api/alert`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) return []
      const alerts = await res.json()
      const now = new Date()
      return alerts.slice(0, 3).map((a: { id: number; type: string; createdAt: string }, i: number) => ({
        icon: iconMap[i === 0 ? "CheckCircle" : i === 1 ? "RefreshCw" : "Settings2"],
        iconColor: i === 0 ? "text-status-good" : i === 1 ? "text-status-moderate" : "text-muted-foreground",
        iconBg: i === 0 ? "bg-status-good/20" : i === 1 ? "bg-status-moderate/20" : "bg-muted",
        title: `Alert ${a.type}`,
        description: `Generated from API at ${new Date(a.createdAt).toLocaleTimeString()}`,
        time: new Date(now.getTime() - i * 3600000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      }))
    },
  }
}
