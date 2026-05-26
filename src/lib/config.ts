export type ProviderType = 'api' | 'mock'

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
    nodes: 'api',
    measurements: 'api',
    predictions: 'api',
    users: 'api',
    metrics: 'api',
    map: 'api',
    thresholds: 'api',
    emergency: 'api',
    system: 'api',
    diagnostics: 'mock',
    inventory: 'api',
    dataExplorer: 'api',
    analytics: 'api'
}

export type ProviderName = keyof ProviderConfig

export function getProviderType(name: ProviderName): ProviderType {
    return providerConfig[name]
}
