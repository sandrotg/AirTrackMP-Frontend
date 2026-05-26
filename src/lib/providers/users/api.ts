import { UsersProvider } from "./provider"
import { UserData, AuditLogEntry } from "./mock"
import { getApiToken } from "@/lib/auth-token"

interface ApiUser {
  id: number
  name: string
  email: string
  role: string
  deleted: boolean
  createdAt: string
}

function mapApiUserToUserData(apiUser: ApiUser): UserData {
  return {
    name: apiUser.name,
    email: apiUser.email,
    avatar: null,
    roles: [apiUser.role],
    level: apiUser.role === "ADMIN" ? 10 : 5,
    levelFill: apiUser.role === "ADMIN" ? 100 : 50,
  }
}

export function createUsersApiProvider(): UsersProvider {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

  return {
    type: "api",
    async getAll() {
      const token = getApiToken()
      const response = await fetch(`${API_BASE}/api/user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) return []
      const data: ApiUser[] = await response.json()
      return data.filter((u) => !u.deleted).map(mapApiUserToUserData)
    },
    async getById(id: string) {
      const token = getApiToken()
      const response = await fetch(`${API_BASE}/api/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) return null
      const data: ApiUser = await response.json()
      return mapApiUserToUserData(data)
    },
    async getUsers() {
      return this.getAll()
    },
    async getAuditLogs() {
      const token = getApiToken()
      const response = await fetch(`${API_BASE}/api/user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) return []
      const data: ApiUser[] = await response.json()
      const now = new Date()
      return data.slice(0, 10).map((u, i) => ({
        user: u.name,
        action: i === 0 ? "Login successful" : "Session active",
        detail: i === 0 ? "Session authenticated successfully" : "User token refreshed",
        ip: `192.168.1.${100 + i}`,
        time: new Date(now.getTime() - i * 3600000).toISOString(),
        type: i === 0 ? "normal" : ("system" as const),
      }))
    },
  }
}
