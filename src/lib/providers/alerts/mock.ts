import { AlertLog } from "@/lib/types"
import { BaseProvider } from "../base"

export const mockAlerts: AlertLog[] = [
  {
    id: "8829-XJ-902",
    timestamp: "2023-10-24 14:22:01",
    nodeName: "NODE-DELTA-09",
    type: "critical",
    parameter: "PM2.5 >",
    parameterValue: "120.5",
    parameterUnit: "μg/m³",
    status: "active",
  },
  {
    id: "8830-XJ-903",
    timestamp: "2023-10-24 13:45:12",
    nodeName: "NODE-OMEGA-04",
    type: "warning",
    parameter: "Humidity >",
    parameterValue: "85",
    parameterUnit: "%",
    status: "acknowledged",
  },
  {
    id: "8831-XJ-904",
    timestamp: "2023-10-24 11:10:55",
    nodeName: "SENSOR-HUB-ALPHA",
    type: "info",
    parameter: "CO2 Recovery <",
    parameterValue: "400",
    parameterUnit: "ppm",
    status: "resolved",
  },
  {
    id: "8832-XJ-905",
    timestamp: "2023-10-24 09:30:11",
    nodeName: "STATION-GRID-7",
    type: "critical",
    parameter: "Pressure Drop",
    parameterValue: "-12",
    parameterUnit: "%",
    status: "active",
  },
]

export function createAlertsMockProvider(): BaseProvider<AlertLog> {
  return {
    type: "mock",
    async getAll() {
      return mockAlerts
    },
    async getById(id: string) {
      return mockAlerts.find((alert) => alert.id === id) || null
    },
  }
}