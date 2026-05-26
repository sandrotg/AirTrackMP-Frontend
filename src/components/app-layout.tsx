'use client'

import { usePathname } from 'next/navigation'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'

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
