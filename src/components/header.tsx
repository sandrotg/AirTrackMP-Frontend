"use client"

import Link from "next/link"
import { Search, Settings, Bell, HelpCircle, LogOut } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/mode-toggle"
import { useSession, signOut } from "next-auth/react"

interface HeaderProps {
  activeView: string
}

const navTabs = [
  { id: "dashboard", label: "Monitoring" },
  { id: "analytics", label: "Analytics" },
  { id: "alerts", label: "Logs" },
  { id: "forecasting", label: "Forecasting" },
  { id: "network", label: "Network" },
]

export function Header({ activeView }: HeaderProps) {
  const { data: session } = useSession()
  const email = session?.user?.email || "ADMIN USER"
  const initials = email.slice(0, 2).toUpperCase()

  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4">
      <div className="flex items-center gap-8">
        <h1 className="text-lg font-bold tracking-wider text-foreground">OBSERVATORY</h1>
        <nav className="flex items-center gap-1">
          {navTabs.map((tab) => (
            <Link
              key={tab.id}
              href={`/${tab.id}`}
              className={`px-3 py-1.5 text-xs font-medium transition-colors rounded ${
                activeView === tab.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search data points..."
            className="w-64 bg-secondary border-border pl-9 text-xs placeholder:text-muted-foreground"
          />
        </div>
        <button className="text-muted-foreground hover:text-foreground">
          <Settings className="h-5 w-5" />
        </button>
        <button className="text-muted-foreground hover:text-foreground relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-destructive" />
        </button>
        <button className="text-muted-foreground hover:text-foreground">
          <HelpCircle className="h-5 w-5" />
        </button>
        <ModeToggle />
        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="text-xs font-medium text-foreground">{email}</p>
            <p className="text-[10px] text-muted-foreground">
              {session?.user?.role || "SYSTEM OVERSEER"}
            </p>
          </div>
          <Avatar className="h-8 w-8 border-2 border-primary">
            <AvatarImage src="/avatar.png" />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">{initials}</AvatarFallback>
          </Avatar>
          <button
            onClick={() => signOut()}
            className="text-muted-foreground hover:text-foreground ml-1"
            title="Cerrar sesión"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  )
}
