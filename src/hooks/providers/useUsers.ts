"use client"

import { useState, useEffect, useMemo } from "react"
import { createUsersProvider, UserData, AuditLogEntry } from "@/lib/providers/users"
import { getApiToken } from "@/lib/auth-token"
import { showErrorToast } from "@/lib/error-handler"

interface UseUsersResult {
  users: UserData[]
  auditLogs: AuditLogEntry[]
  loading: boolean
  error: Error | null
}

export function useUsers(): UseUsersResult {
  const [users, setUsers] = useState<UserData[]>([])
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([])
  const token = getApiToken()
  const [loading, setLoading] = useState(!!token)
  const [error, setError] = useState<Error | null>(null)
  const provider = useMemo(() => createUsersProvider(), [])

  useEffect(() => {
    if (!token) return
    let mounted = true

    async function loadData() {
      setLoading(true)
      try {
        const [usersData, logs] = await Promise.all([
          provider.getUsers(),
          provider.getAuditLogs(),
        ])
        if (mounted) {
          setUsers(usersData)
          setAuditLogs(logs)
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error("Failed to load users"))
          showErrorToast(err, "Failed to load users")
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadData()

    return () => {
      mounted = false
    }
  }, [provider, token])

  return { users, auditLogs, loading, error }
}
