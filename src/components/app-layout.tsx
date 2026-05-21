'use client'

import { usePathname } from 'next/navigation'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'

const navItems = [
    { id: 'dashboard', label: 'DASHBOARD' },
    { id: 'map', label: 'MAP VIEW' },
    { id: 'network', label: 'SENSOR NETWORK' },
    { id: 'analytics', label: 'ANALYTICS' },
    { id: 'forecasting', label: 'IA FORECASTING' },
    { id: 'alerts', label: 'ALERT LOGS' },
    { id: 'threshold', label: 'THRESHOLD CONFIG' },
    { id: 'emergency', label: 'EMERGENCY CONTROL' },
    { id: 'inventory', label: 'INVENTORY' },
    { id: 'users', label: 'USER MANAGEMENT' },
    { id: 'system', label: 'SYSTEM CONFIG' },
    { id: 'diagnostics', label: 'DIAGNOSTIC LOGS' },
    { id: 'historical', label: 'HISTORICAL ANALYSIS' },
    { id: 'explorer', label: 'DATA EXPLORER' }
]

export function AppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const activeView = pathname.split('/')[1] || 'dashboard'

    return (
        <div className="flex h-screen bg-background">
            <Sidebar activeView={activeView} />
            <div className="flex flex-1 flex-col overflow-hidden">
                <Header activeView={activeView} />
                <main className="flex-1 overflow-auto p-6">{children}</main>
            </div>
        </div>
    )
}
