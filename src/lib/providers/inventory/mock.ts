import { BaseProvider } from "../base"

export interface InventoryNode {
  id: string
  mac: string
  health: number
  uptime: string
  firmware: string
  status: "online" | "offline"
}

export interface CommandHistoryEntry {
  type: "success" | "error"
  command: string
  message: string
  time: string
}

export const mockInventoryNodes: InventoryNode[] = [
  { id: "OBS-N01-NY", mac: "00:1A:4B:92:C1:FD", health: 94, uptime: "14d 06h 22m", firmware: "v2.1.4-LTS", status: "online" },
  { id: "OBS-N02-SF", mac: "00:1A:4B:88:A3:4E", health: 62, uptime: "02d 11h 04m", firmware: "v2.1.2-STB", status: "online" },
  { id: "OBS-N03-TK", mac: "00:1A:4B:FF:21:00", health: 15, uptime: "OFFLINE", firmware: "v2.1.4-LTS", status: "offline" },
  { id: "OBS-N04-LN", mac: "00:1A:4B:CA:99:11", health: 100, uptime: "45d 19h 41m", firmware: "v2.2.0-BTA", status: "online" },
]

export const mockCommandHistory: CommandHistoryEntry[] = [
  { type: "success", command: "REBOOT_SUCCESS", message: "Node OBS-N01-NY acknowledged reboot command and is re-associating with MQTT broker.", time: "12:04:15 UTC" },
  { type: "error", command: "CONNECTION_TIMEOUT", message: "Node OBS-N03-TK failed to respond to 'Force Read' within 5000ms. Packet loss suspected.", time: "11:58:33 UTC" },
]

export interface InventoryMockProvider extends BaseProvider<InventoryNode> {
  getNodes(): Promise<InventoryNode[]>
  getCommandHistory(): Promise<CommandHistoryEntry[]>
}

export function createInventoryMockProvider(): InventoryMockProvider {
  return {
    type: "mock",
    async getAll() { return mockInventoryNodes },
    async getById(id: string) { return mockInventoryNodes.find(n => n.id === id) || null },
    async getNodes() { return mockInventoryNodes },
    async getCommandHistory() { return mockCommandHistory },
  }
}