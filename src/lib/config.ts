export type ProviderType = 'mock' | 'api'

export interface ProviderConfig {
    alerts: ProviderType
    nodes: ProviderType
    measurements: ProviderType
    predictions: ProviderType
    users: ProviderType
    metrics: ProviderType
    thresholds: ProviderType
    emergency: ProviderType
    system: ProviderType
    diagnostics: ProviderType
    inventory: ProviderType
    dataExplorer: ProviderType
}

export const providerConfig: ProviderConfig = {
    alerts: 'api',
    nodes: 'mock',
    measurements: 'mock',
    predictions: 'mock',
    users: 'mock',
    metrics: 'api',
    thresholds: 'mock',
    emergency: 'mock',
    system: 'mock',
    diagnostics: 'mock',
    inventory: 'mock',
    dataExplorer: 'mock'
}

export type ProviderName = keyof ProviderConfig

export function getProviderType(name: ProviderName): ProviderType {
    return providerConfig[name]
}
