import { UserData, AuditLogEntry } from "./mock"
import { BaseProvider } from "../base"
import { getProviderType } from "@/lib/config"
import { createUsersMockProvider } from "./mock"
import { createUsersApiProvider } from "./api"

export interface UsersProvider extends BaseProvider<UserData> {
  getUsers(): Promise<UserData[]>
  getAuditLogs(): Promise<AuditLogEntry[]>
}

export function createUsersProvider(): UsersProvider {
  const providerType = getProviderType("users")

  switch (providerType) {
    case "mock":
      return createUsersMockProvider()
    case "api":
      return createUsersApiProvider()
    default:
      return createUsersMockProvider()
  }
}
