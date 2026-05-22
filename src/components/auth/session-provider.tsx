"use client"

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"
import { TokenSync } from "./token-sync"

export function SessionProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthSessionProvider>
      <TokenSync />
      {children}
    </NextAuthSessionProvider>
  )
}
