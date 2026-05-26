import { BaseProvider } from "../base"

export interface LogEntry {
  time: string
  type: string
  tag: string
  message: string
  color: string
}

export interface HexDataRow {
  offset: string
  bytes: string
  ascii: string
}

export const mockLogEntries: LogEntry[] = [
  { time: "2023-11-24 14:02:11.452", type: "INFO", tag: "[main]", message: "o.s.b.w.embedded.tomcat.TomcatWebServer : Tomcat initialized with port(s): 8080 (http)", color: "text-blue-400" },
  { time: "2023-11-24 14:02:12.109", type: "INFO", tag: "[main]", message: "o.s.b.w.embedded.tomcat.TomcatWebServer : Tomcat started on port(s): 8080 (http) with context path ''", color: "text-blue-400" },
  { time: "2023-11-24 14:03:01.001", type: "MQTT", tag: "CONNECTING...", message: "host: iot-broker.internal", color: "text-primary" },
  { time: "2023-11-24 14:03:01.245", type: "MQTT", tag: "SUCCESS:", message: "Client [Observer_Node_Alpha] connected to topic [/sensors/raw]", color: "text-green-400" },
  { time: "2023-11-24 14:03:02.110", type: "RECV", tag: "topic: /sensors/raw", message: 'message: {"node_id": "PMS5003", "pm25": 14.2, "status": "OK"}', color: "text-muted-foreground" },
  { time: "2023-11-24 14:03:03.552", type: "RECV", tag: "topic: /sensors/raw", message: 'message: {"node_id": "BME280", "temp": 22.4, "hum": 45.1}', color: "text-muted-foreground" },
  { time: "2023-11-24 14:03:05.120", type: "WARN", tag: "Node PMS5003", message: "reporting transient CRC check failure. Retrying...", color: "text-yellow-400" },
  { time: "2023-11-24 14:03:05.981", type: "ERROR", tag: "Critical:", message: "Heartbeat lost for edge-gateway-04. Initiating failover protocol.", color: "text-red-400" },
  { time: "2023-11-24 14:03:06.112", type: "INFO", tag: "", message: "Switching to backup listener: mqtt-secondary-cluster", color: "text-blue-400" },
  { time: "2023-11-24 14:03:10.450", type: "RECV", tag: "topic: /sensors/raw", message: 'message: {"node_id": "BME280", "temp": 22.3, "hum": 44.9}', color: "text-muted-foreground" },
]

export const mockHexData: HexDataRow[] = [
  { offset: "0000", bytes: "42 4D 00 1C 00 01 00 01 00 0", ascii: "1 00 01 00 01 00 01" },
  { offset: "0010", bytes: "03 1C 00 00 00 00 00 00 97 0", ascii: "0 03 01 55 AA" },
]

export interface DiagnosticsMockProvider extends BaseProvider<LogEntry> {
  getLogEntries(): Promise<LogEntry[]>
  getHexData(): Promise<HexDataRow[]>
}

export function createDiagnosticsMockProvider(): DiagnosticsMockProvider {
  return {
    type: "mock",
    async getAll() { return mockLogEntries },
    async getById(id: string) { return mockLogEntries.find(l => l.time === id) || null },
    async getLogEntries() { return mockLogEntries },
    async getHexData() { return mockHexData },
  }
}