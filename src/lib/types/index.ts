export type AlertType = "critical" | "warning" | "info"
export type AlertStatus = "active" | "acknowledged" | "resolved"

export interface AlertLog {
  id: string
  timestamp: string
  nodeName: string
  type: AlertType
  parameter: string
  parameterValue: string
  parameterUnit: string
  status: AlertStatus
}

export type NodeStatus = "online" | "offline" | "error" | "active" | "inactive" | "maintenance" | "calibration"

export interface SensorNode {
  id: string
  name: string
  model: string
  status: NodeStatus
  battery: number
  rssi?: string
  firmware?: string
}

export interface FleetNode {
  id: string
  mac: string
  status: NodeStatus
  battery: number
  batteryReplace?: string
  rssi?: string
  firmware?: string
  location?: string
  lastSeen?: string
}

export interface Node {
  id: number
  name: string
  location: string
  latitude: number
  longitude: number
  status: NodeStatus
  deleted: boolean
  createdAt: string
}

export interface Measurement {
  id: number
  pm25: number
  pm10: number
  temperature: number
  humidity: number
  recordedAt: string
  node: Node
}

export interface MeasurementInput {
  nodeId: number
  pm25: number
  pm10: number
  temperature: number
  humidity: number
  recordedAt?: string
}

export interface MeasurementAverage {
  period: string
  avgPm25: number
  avgPm10: number
  avgTemperature: number
  avgHumidity: number
}

export type PredictionRiskLevel = "low" | "moderate" | "high" | "critical"

export interface Prediction {
  id: number
  predictedPm25: number
  predictedPm10: number
  riskLevel: PredictionRiskLevel
  predictionTime: string
  createdAt: string
  node: Node
}

export interface PredictionInput {
  nodeId: number
  predictedPm25: number
  predictedPm10: number
  riskLevel: PredictionRiskLevel
  predictionTime: string
}

export type UserRole = "USER" | "ADMIN"

export interface User {
  id: number
  name: string
  email: string
  role: UserRole
  deleted: boolean
  createdAt: string
}

export interface UserInput {
  name: string
  email: string
  password: string
  role: UserRole
}

export interface AuthResponse {
  token: string
}

export interface MetricData {
  label: string
  value: number | string
  unit: string
  status?: "critical" | "warning" | "moderate" | "normal"
  change?: string
  changeType?: "up" | "down" | "stable"
}

export interface ThresholdConfig {
  id: string
  classification: string
  lowerBound: number
  upperBound: number
  color: string
}

export interface ThresholdNormative {
  id: string
  name: string
  description: string
  isSelected: boolean
}

export interface EmergencyAlert {
  id: string
  nodeId: string
  location: string
  value: string
  unit: string
  duration: string
  status: "active" | "resolved"
}

export interface GovernmentAuthority {
  id: string
  name: string
  status: "pending" | "sent" | "delivered" | "read"
}

export interface SystemContainer {
  id: string
  name: string
  status: "healthy" | "congested" | "stable" | "error"
  details?: string
}

export interface SystemResource {
  timestamp: string
  cpu: number
  ram: number
}

export interface DiagnosticLog {
  id: string
  timestamp: string
  type: "INFO" | "WARN" | "ERROR" | "MQTT" | "RECV"
  tag: string
  message: string
}

export interface InventoryNode {
  id: string
  health: number
  uptime: string
  firmware: string
  status: NodeStatus
}

export interface CommandHistory {
  id: string
  command: string
  target: string
  status: "success" | "failure"
  timestamp: string
}

export interface HourlyData {
  hour: number
  value: number
}

export interface CriticalExceedance {
  date: string
  value: number
  limit: number
}

export interface ZoneData {
  id: string
  name: string
  pollution: number
}