"use client"

import { useState, useEffect, useMemo } from "react"
import { createInventoryProvider, InventoryNode, CommandHistoryEntry } from "@/lib/providers/inventory"
import { getApiToken } from "@/lib/auth-token"
import { showErrorToast } from "@/lib/error-handler"

interface UseInventoryResult {
  nodes: InventoryNode[]
  commandHistory: CommandHistoryEntry[]
  loading: boolean
  error: Error | null
}

export function useInventory(): UseInventoryResult {
  const [nodes, setNodes] = useState<InventoryNode[]>([])
  const [commandHistory, setCommandHistory] = useState<CommandHistoryEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const provider = useMemo(() => createInventoryProvider(), [])
  const token = getApiToken()

  useEffect(() => {
    let mounted = true

    async function loadData() {
      setLoading(true)
      try {
        const [nodesData, history] = await Promise.all([
          provider.getNodes(),
          provider.getCommandHistory(),
        ])
        if (mounted) {
          setNodes(nodesData)
          setCommandHistory(history)
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error("Failed to load inventory"))
          showErrorToast(err, "Failed to load inventory")
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

  return { nodes, commandHistory, loading, error }
}
