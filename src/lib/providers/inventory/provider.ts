import { InventoryNode, CommandHistoryEntry } from "./mock"
import { BaseProvider } from "../base"
import { getProviderType } from "@/lib/config"
import { createInventoryMockProvider } from "./mock"
import { createInventoryApiProvider } from "./api"

export interface InventoryProvider extends BaseProvider<InventoryNode> {
  getNodes(): Promise<InventoryNode[]>
  getCommandHistory(): Promise<CommandHistoryEntry[]>
}

export function createInventoryProvider(): InventoryProvider {
  const providerType = getProviderType("inventory")
  switch (providerType) {
    case "mock": return createInventoryMockProvider()
    case "api": return createInventoryApiProvider()
    default: return createInventoryMockProvider()
  }
}
