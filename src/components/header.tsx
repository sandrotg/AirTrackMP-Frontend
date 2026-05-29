"use client"

import Link from "next/link"
import { Menu, Search, Settings, Bell, HelpCircle, LogOut } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/mode-toggle"
import { useSession, signOut } from "next-auth/react"
import { useState } from "react"

interface HeaderProps {
  activeView: string
  onMenuClick: () => void
}

const navTabs = [
  { id: "dashboard", label: "Monitoring" },
  { id: "analytics", label: "Analytics" },
  { id: "alerts", label: "Logs" },
  { id: "forecasting", label: "Forecasting" },
  { id: "network", label: "Network" },
]

export function Header({ activeView, onMenuClick }: HeaderProps) {
  const { data: session } = useSession()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const email = session?.user?.email || "ADMIN USER"
  const initials = email.slice(0, 2).toUpperCase()

  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-card px-3 md:px-4">
      <div className="flex items-center gap-2 md:gap-8">
        <button
          onClick={onMenuClick}
          className="text-muted-foreground hover:text-foreground lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-base md:text-lg font-bold tracking-wider text-foreground whitespace-nowrap">OBSERVATORY</h1>

        {/* Mobile nav dropdown */}
        <div className="md:hidden relative">
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="px-2 py-1 text-xs font-medium text-primary rounded bg-secondary/50"
          >
            {navTabs.find((t) => t.id === activeView)?.label || "Menu"}
          </button>
          {mobileNavOpen && (
            <div className="absolute top-full left-0 mt-1 w-40 bg-card border border-border rounded-lg shadow-lg z-50 py-1">
              {navTabs.map((tab) => (
                <Link
                  key={tab.id}
                  href={`/${tab.id}`}
                  onClick={() => setMobileNavOpen(false)}
                  className={`block px-3 py-2 text-xs font-medium transition-colors ${
                    activeView === tab.id
                      ? "text-primary bg-sidebar-accent"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
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

      <div className="flex items-center gap-2 md:gap-4">
        <div className="hidden md:block relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search data points..."
            className="w-48 xl:w-64 bg-secondary border-border pl-9 text-xs placeholder:text-muted-foreground"
          />
        </div>
        <button className="hidden sm:block text-muted-foreground hover:text-foreground">
          <Settings className="h-5 w-5" />
        </button>
        <button className="text-muted-foreground hover:text-foreground relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-destructive" />
        </button>
        <button className="hidden md:block text-muted-foreground hover:text-foreground">
          <HelpCircle className="h-5 w-5" />
        </button>
        <ModeToggle />
        <div className="hidden sm:flex items-center gap-2">
          <div className="hidden xl:block text-right">
            <p className="text-xs font-medium text-foreground">{email}</p>
            <p className="text-[10px] text-muted-foreground">
              {session?.user?.role || "SYSTEM OVERSEER"}
            </p>
          </div>
          <Avatar className="h-7 w-7 md:h-8 md:w-8 border-2 border-primary shrink-0">
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
