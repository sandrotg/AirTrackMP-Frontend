'use client'

import { useState } from 'react'
import {
    UserPlus,
    Shield,
    ArrowUp,
    Ban,
    RefreshCw,
    Globe,
    Lock,
    FileText,
    User
} from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useUsers } from '@/hooks/providers/useUsers'

export function UserManagementView() {
    const { users, auditLogs, loading } = useUsers()
    const [sessionTermination, setSessionTermination] = useState(true)
    const [enforceMFA, setEnforceMFA] = useState(true)
    const [verboseAudit, setVerboseAudit] = useState(false)

    if (loading) {
        return (
            <div className="space-y-6">
                <div>
                    <Skeleton className="h-4 w-64 mb-2" />
                    <Skeleton className="h-8 w-72 mb-2" />
                    <Skeleton className="h-4 w-96" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <Skeleton className="h-4 w-32 mb-1" />
                                <Skeleton className="h-3 w-48" />
                            </div>
                            <Skeleton className="h-10 w-36 rounded-lg" />
                        </div>
                        <Skeleton className="h-8 w-full mb-2" />
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton key={i} className="h-16 w-full mb-1" />
                        ))}
                    </div>
                    <div className="bg-card border border-border rounded-xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <Skeleton className="h-4 w-28 mb-1" />
                                <Skeleton className="h-3 w-40" />
                            </div>
                            <Skeleton className="h-8 w-8 rounded" />
                        </div>
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton key={i} className="h-16 w-full mb-2" />
                        ))}
                        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
                            <Skeleton className="h-24 rounded-lg" />
                            <Skeleton className="h-24 rounded-lg" />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-card border border-border rounded-xl p-6">
                        <Skeleton className="h-12 w-12 rounded-lg mb-4" />
                        <Skeleton className="h-6 w-48 mb-2" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                    <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 space-y-4">
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} className="h-16 w-full rounded-lg" />
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    GLOBAL DASHBOARD{' '}
                    <span className="text-primary mx-2">&gt;</span> IAM
                    MANAGEMENT
                </p>
                <h1 className="text-3xl font-bold text-foreground mt-2">
                    Identity & Access Control
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Configure system-wide user privileges and monitor credential
                    lifecycle.
                </p>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* User Directory */}
                <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                User Directory
                            </h2>
                            <p className="text-xs text-muted-foreground mt-1">
                                Active personnel within environment alpha
                            </p>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-sm hover:bg-muted transition-colors">
                            <UserPlus className="w-4 h-4" />
                            Provision User
                        </button>
                    </div>

                    {/* Table Header */}
                    <div className="grid grid-cols-4 gap-4 text-xs text-muted-foreground uppercase tracking-wider pb-3 border-b border-border">
                        <span>Identity</span>
                        <span>Assigned Role</span>
                        <span>Access Level</span>
                        <span>Control Actions</span>
                    </div>

                    {/* Table Rows */}
                    <div className="space-y-1 mt-1">
                        {users.map((user, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-4 gap-4 items-center py-4 border-b border-border/50"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                                        <User className="w-5 h-5 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground">
                                            {user.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {user.roles.map((role, roleIndex) => (
                                        <span
                                            key={roleIndex}
                                            className="text-xs px-2 py-1 bg-primary/20 text-primary rounded"
                                        >
                                            {role}
                                        </span>
                                    ))}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-1.5 bg-background rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary rounded-full"
                                                style={{
                                                    width: `${user.levelFill}%`
                                                }}
                                            />
                                        </div>
                                        <span className="text-xs text-muted-foreground">
                                            LEVEL{' '}
                                            {user.level
                                                .toString()
                                                .padStart(2, '0')}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-2 text-primary hover:bg-primary/20 rounded transition-colors">
                                        <ArrowUp className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 text-red-500 hover:bg-red-500/20 rounded transition-colors">
                                        <Ban className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Session Audit Log */}
                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                Session Audit Log
                            </h2>
                            <p className="text-xs text-muted-foreground mt-1">
                                Real-time authentication streaming
                            </p>
                        </div>
                        <button className="p-2 hover:bg-muted rounded transition-colors">
                            <RefreshCw className="w-4 h-4 text-primary" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {auditLogs.map((log, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <div
                                    className={`w-2 h-2 mt-2 rounded-full ${
                                        log.type === 'warning'
                                            ? 'bg-red-500'
                                            : 'bg-transparent'
                                    }`}
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-foreground truncate">
                                            {log.user}
                                        </p>
                                        <span className="text-xs text-muted-foreground">
                                            {log.time}
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {log.action}{' '}
                                        <span className="text-primary">
                                            {log.detail}
                                        </span>
                                    </p>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                        <Globe className="w-3 h-3" />
                                        {log.ip}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
                        <div className="bg-background rounded-lg p-4">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">
                                Active Sessions
                            </p>
                            <p className="text-3xl font-bold text-foreground mt-1">
                                42
                            </p>
                        </div>
                        <div className="bg-background rounded-lg p-4">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">
                                Auth Success
                            </p>
                            <p className="text-3xl font-bold text-foreground mt-1">
                                98.2%
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Global Access Policy */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                            <Shield className="w-6 h-6 text-primary" />
                        </div>
                    </div>
                    <h2 className="text-xl font-bold text-foreground">
                        Global Access Policy
                    </h2>
                    <p className="text-sm text-muted-foreground mt-2">
                        Enforce multi-factor authentication and IP range
                        restriction across all analyst nodes. Current level:{' '}
                        <span className="text-primary font-medium">STRICT</span>
                    </p>
                </div>

                <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 space-y-4">
                    {/* Session Termination */}
                    <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                        <div className="flex items-center gap-3">
                            <Lock className="w-5 h-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium text-foreground">
                                    Session Termination
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Automatically kill sessions after 2 hours of
                                    inactivity
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() =>
                                setSessionTermination(!sessionTermination)
                            }
                            className={`w-12 h-6 rounded-full transition-colors relative ${
                                sessionTermination ? 'bg-primary' : 'bg-muted'
                            }`}
                        >
                            <div
                                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                    sessionTermination ? 'left-7' : 'left-1'
                                }`}
                            />
                        </button>
                    </div>

                    {/* Enforce MFA */}
                    <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                        <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5 text-primary" />
                            <div>
                                <p className="text-sm font-medium text-foreground">
                                    Enforce MFA
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Mandatory Hardware Security Keys for Admin
                                    roles
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setEnforceMFA(!enforceMFA)}
                            className={`w-12 h-6 rounded-full transition-colors relative ${
                                enforceMFA ? 'bg-primary' : 'bg-muted'
                            }`}
                        >
                            <div
                                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                    enforceMFA ? 'left-7' : 'left-1'
                                }`}
                            />
                        </button>
                    </div>

                    {/* Verbose Audit Logging */}
                    <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                        <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium text-foreground">
                                    Verbose Audit Logging
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Log every read action for environmental
                                    sensor data
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setVerboseAudit(!verboseAudit)}
                            className={`w-12 h-6 rounded-full transition-colors relative ${
                                verboseAudit ? 'bg-primary' : 'bg-muted'
                            }`}
                        >
                            <div
                                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                    verboseAudit ? 'left-7' : 'left-1'
                                }`}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
