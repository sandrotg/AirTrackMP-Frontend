import { BaseProvider } from '../base'

export interface UserData {
    name: string
    email: string
    avatar: null
    roles: string[]
    level: number
    levelFill: number
}

export interface AuditLogEntry {
    user: string
    action: string
    detail: string
    ip: string
    time: string
    type: 'normal' | 'system' | 'warning'
}

export const mockUsers: UserData[] = [
    {
        name: 'Julian Draxler',
        email: 'julian.d@tech-obs.io',
        avatar: null,
        roles: ['SYSTEM', 'ADMIN'],
        level: 10,
        levelFill: 100
    },
    {
        name: 'Elena Markov',
        email: 'e.markov@tech-obs.io',
        avatar: null,
        roles: ['DATA ANALYST'],
        level: 3,
        levelFill: 30
    },
    {
        name: 'Tariq Kazi',
        email: 't.kazi@tech-obs.io',
        avatar: null,
        roles: ['DATA ANALYST'],
        level: 5,
        levelFill: 50
    },

    {
        name: 'Sofia Chen',
        email: 's.chen@tech-obs.io',
        avatar: null,
        roles: ['DATA ANALYST'],
        level: 4,
        levelFill: 40
    },
    {
        name: 'Luis Llerena',
        email: 'lellerena@uninorte.edu.co',
        avatar: null,
        roles: ['DATA ANALYST', 'ADMIN'],
        level: 10,
        levelFill: 100
    }
]

export const mockAuditLogs: AuditLogEntry[] = [
    {
        user: 'Julian Draxler',
        action: 'Config Change:',
        detail: 'NODE_01_REDUNDANCY',
        ip: '192.168.1.184',
        time: '14:22:01',
        type: 'normal'
    },
    {
        user: 'System Internal',
        action: 'Session Expired:',
        detail: 'EM_MARK_AUTH',
        ip: 'INTERNAL_SVC',
        time: '14:18:55',
        type: 'system'
    },
    {
        user: 'Anonymous Host',
        action: 'Invalid Login Attempt:',
        detail: 'REPEATED_FAILURE',
        ip: '84.12.193.11',
        time: '14:15:38',
        type: 'warning'
    },
    {
        user: 'Tariq Kazi',
        action: 'Exported Report:',
        detail: 'ENV_HEALTH_MARCH',
        ip: '192.168.1.112',
        time: '14:02:11',
        type: 'normal'
    }
]

export interface UsersMockProvider extends BaseProvider<UserData> {
    getUsers(): Promise<UserData[]>
    getAuditLogs(): Promise<AuditLogEntry[]>
}

export function createUsersMockProvider(): UsersMockProvider {
    return {
        type: 'mock',
        async getAll() {
            return mockUsers
        },
        async getById(id: string) {
            return mockUsers.find((u) => u.email === id) || null
        },
        async getUsers() {
            return mockUsers
        },
        async getAuditLogs() {
            return mockAuditLogs
        }
    }
}
