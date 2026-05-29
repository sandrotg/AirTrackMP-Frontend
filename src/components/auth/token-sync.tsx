"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { setApiToken } from "@/lib/auth-token"

export function TokenSync() {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === "loading") return
    setApiToken(session?.apiToken ?? null)
  }, [session?.apiToken, status])

  return null
}
