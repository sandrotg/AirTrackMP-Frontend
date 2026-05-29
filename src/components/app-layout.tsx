'use client'

import { useState, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'

export function AppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const activeView = pathname.split('/')[1] || 'dashboard'
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const toggleSidebar = useCallback(() => setSidebarOpen((v) => !v), [])
    const closeSidebar = useCallback(() => setSidebarOpen(false), [])

    return (
        <div className="flex h-screen bg-background">
            <Sidebar activeView={activeView} open={sidebarOpen} onClose={closeSidebar} />
            <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                <Header activeView={activeView} onMenuClick={toggleSidebar} />
                <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
            </div>
        </div>
    )
}
