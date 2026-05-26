export type ProviderType = 'mock' | 'api'

export interface ProviderConfig {
    alerts: ProviderType
    nodes: ProviderType
    measurements: ProviderType
    predictions: ProviderType
    users: ProviderType
    metrics: ProviderType
    map: ProviderType
    thresholds: ProviderType
    emergency: ProviderType
    system: ProviderType
    diagnostics: ProviderType
    inventory: ProviderType
    dataExplorer: ProviderType
    analytics: ProviderType
}

export const providerConfig: ProviderConfig = {
    alerts: 'api',
    nodes: 'mock',
    measurements: 'api',
    predictions: 'api',
    users: 'mock',
    metrics: 'api',
    map: 'api',
    thresholds: 'mock',
    emergency: 'mock',
    system: 'mock',
    diagnostics: 'mock',
    inventory: 'mock',
    dataExplorer: 'mock',
    analytics: 'mock'
}

export type ProviderName = keyof ProviderConfig

export function getProviderType(name: ProviderName): ProviderType {
    return providerConfig[name]
}
