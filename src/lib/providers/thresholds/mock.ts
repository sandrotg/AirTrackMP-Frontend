import { BaseProvider } from "../base"
import { Bell, Mail, Webhook, CheckCircle, RefreshCw, Settings2 } from "lucide-react"

export interface NormativeOption {
  id: string
  name: string
  description: string
  active: boolean
}

export interface ThresholdLevel {
  classification: string
  lowerBound: string
  upperBound: string
  color: string
}

export interface NotificationChannel {
  name: string
  description: string
  enabled: boolean
  icon: React.ComponentType<{ className?: string }>
}

export interface ValidationLog {
  icon: React.ComponentType<{ className?: string }>
  iconColor: string
  iconBg: string
  title: string
  description: string
  time: string
}

export const mockNormativeOptions: NormativeOption[] = [
  { id: "who", name: "WHO Standards", description: "Global health guidelines for long-term exposure safety.", active: true },
  { id: "local", name: "Local Regulation (Resolution 2254)", description: "Specific compliance metrics for territorial jurisdiction.", active: false },
  { id: "custom", name: "Custom Configuration", description: "User-defined limits for specialized industrial monitoring.", active: false },
]

export const mockThresholdLevels: ThresholdLevel[] = [
  { classification: "Good", lowerBound: "0.00", upperBound: "12.00", color: "bg-status-good" },
  { classification: "Moderate", lowerBound: "12.10", upperBound: "35.40", color: "bg-status-moderate" },
  { classification: "Unhealthy for Sensitive", lowerBound: "35.50", upperBound: "55.40", color: "bg-status-sensitive" },
  { classification: "Very Unhealthy", lowerBound: "55.50", upperBound: "150.40", color: "bg-status-unhealthy" },
  { classification: "Hazardous", lowerBound: "150.50", upperBound: "500.00", color: "bg-status-hazardous" },
]

export const mockNotificationChannels: NotificationChannel[] = [
  { name: "Push alerts", description: "Real-time mobile delivery", enabled: true, icon: Bell },
  { name: "Email Reports", description: "Scheduled log summaries", enabled: false, icon: Mail },
  { name: "External Hooks", description: "JSON Webhook execution", enabled: true, icon: Webhook },
]

export const mockValidationLogs: ValidationLog[] = [
  { icon: CheckCircle, iconColor: "text-status-good", iconBg: "bg-status-good/20", title: "Configuration Integrity Passed", description: "System checksum matched last administrative override.", time: "14:02:11" },
  { icon: RefreshCw, iconColor: "text-status-moderate", iconBg: "bg-status-moderate/20", title: "Webhook Sync [ID: 290]", description: "Post-transactional sync successful with node-external-01.", time: "13:45:08" },
  { icon: Settings2, iconColor: "text-muted-foreground", iconBg: "bg-muted", title: "Manual Override Log", description: "Engineer admin_j.doe modified hazardous upper limit.", time: "09:12:44" },
]

export interface ThresholdsMockProvider extends BaseProvider<ThresholdLevel> {
  getNormativeOptions(): Promise<NormativeOption[]>
  getThresholdLevels(): Promise<ThresholdLevel[]>
  getNotificationChannels(): Promise<NotificationChannel[]>
  getValidationLogs(): Promise<ValidationLog[]>
}

export function createThresholdsMockProvider(): ThresholdsMockProvider {
  return {
    type: "mock",
    async getAll() { return mockThresholdLevels },
    async getById(id: string) { return mockThresholdLevels.find(t => t.classification === id) || null },
    async getNormativeOptions() { return mockNormativeOptions },
    async getThresholdLevels() { return mockThresholdLevels },
    async getNotificationChannels() { return mockNotificationChannels },
    async getValidationLogs() { return mockValidationLogs },
  }
}