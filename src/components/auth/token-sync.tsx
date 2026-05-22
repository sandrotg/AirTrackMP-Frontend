"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { setApiToken } from "@/lib/auth-token"

export function TokenSync() {
  const { data: session } = useSession()

  useEffect(() => {
    setApiToken(session?.apiToken ?? null)
  }, [session?.apiToken])

  return null
}
