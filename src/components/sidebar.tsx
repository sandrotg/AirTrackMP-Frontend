"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import {
  LayoutDashboard,
  Globe,
  Radio,
  BarChart3,
  BrainCircuit,
  Bell,
  SlidersHorizontal,
  AlertTriangle,
  FileText,
  HelpCircle,
  Download,
  Server,
  Users,
  Settings,
  Cloud,
  Terminal,
  History,
  Database,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  activeView: string
}

const navItems = [
  { id: "dashboard", label: "DASHBOARD", icon: LayoutDashboard },
  { id: "map", label: "MAP VIEW", icon: Globe },
  { id: "network", label: "SENSOR NETWORK", icon: Radio },
  { id: "analytics", label: "ANALYTICS", icon: BarChart3 },
  { id: "forecasting", label: "IA FORECASTING", icon: BrainCircuit },
  { id: "alerts", label: "ALERT LOGS", icon: Bell },
  { id: "threshold", label: "THRESHOLD CONFIG", icon: SlidersHorizontal },
  { id: "emergency", label: "EMERGENCY CONTROL", icon: AlertTriangle },
  { id: "inventory", label: "INVENTORY", icon: Server },
  { id: "users", label: "USER MANAGEMENT", icon: Users },
  { id: "system", label: "SYSTEM CONFIG", icon: Settings },
  { id: "diagnostics", label: "DIAGNOSTIC LOGS", icon: Terminal },
  { id: "historical", label: "HISTORICAL ANALYSIS", icon: History },
  { id: "explorer", label: "DATA EXPLORER", icon: Database },
]

const bottomItems = [
  { id: "docs", label: "Documentation", icon: FileText },
  { id: "support", label: "Support", icon: HelpCircle },
]

export function Sidebar({ activeView }: SidebarProps) {
  return (
    <div className="flex h-full w-56 flex-col bg-sidebar border-r border-sidebar-border">
      <div className="p-4 border-b border-sidebar-border">
        <h1 className="text-primary text-sm font-bold tracking-wide">GLOBAL NETWORK</h1>
        <p className="text-muted-foreground text-xs">PRECISION MONITORING</p>
      </div>

      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={`/${item.id}`}
            className={cn(
              "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-xs font-medium transition-colors",
              activeView === item.id
                ? "bg-sidebar-accent text-primary border-l-2 border-primary"
                : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-3">
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold">
          <Download className="mr-2 h-4 w-4" />
          EXPORT DATA
        </Button>
      </div>

      <div className="p-2 border-t border-sidebar-border space-y-1">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-xs text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  )
}
