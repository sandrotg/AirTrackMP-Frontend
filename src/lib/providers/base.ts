import { ProviderType } from '@/lib/config'

export interface BaseProvider<T> {
    type: ProviderType
    getAll(): Promise<T[]>
    getById(id: string): Promise<T | null>
}

export interface BaseProviderWithFilter<
    T,
    Filter = unknown
> extends BaseProvider<T> {
    getFiltered(filter: Filter): Promise<T[]>
}

export interface CreateProviderResult<T> {
    provider: BaseProvider<T>
    type: ProviderType
}
