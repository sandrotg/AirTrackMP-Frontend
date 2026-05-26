import { Skeleton } from '@/components/ui/skeleton'

export default function ForecastingLoading() {
    return (
        <div className="flex-1 p-6 overflow-auto">
            <div className="mb-8">
                <Skeleton className="h-8 w-64 mb-2" />
                <Skeleton className="h-4 w-96" />
            </div>
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-8 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-card rounded-lg border border-border p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <Skeleton className="h-3 w-32 mb-1" />
                                    <Skeleton className="h-6 w-48" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <Skeleton className="h-3 w-28" />
                                    <Skeleton className="h-3 w-28" />
                                </div>
                            </div>
                            <Skeleton className="h-64 w-full" />
                        </div>
                        <div className="bg-card rounded-lg border border-border p-6">
                            <Skeleton className="h-3 w-24 mb-1" />
                            <Skeleton className="h-6 w-40 mb-6" />
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="mb-5">
                                    <div className="flex items-center justify-between mb-2">
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-4 w-8" />
                                    </div>
                                    <Skeleton className="h-2 w-full rounded-full" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-card rounded-lg border border-border p-6">
                                <Skeleton className="h-3 w-28 mb-1" />
                                <Skeleton className="h-6 w-36 mb-4" />
                                <Skeleton className={`h-40 w-full ${i === 3 ? 'rounded-full' : ''}`} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-4 space-y-6">
                    <div className="bg-card rounded-lg border border-border p-6">
                        <Skeleton className="h-6 w-48 mb-4" />
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-5 w-36 mb-6" />
                        <Skeleton className="h-4 w-32 mb-3" />
                        <div className="space-y-3">
                            <Skeleton className="h-20 w-full rounded-lg" />
                            <Skeleton className="h-20 w-full rounded-lg" />
                        </div>
                        <Skeleton className="h-11 w-full mt-6 rounded-lg" />
                    </div>
                    <Skeleton className="h-80 w-full rounded-lg" />
                </div>
            </div>
        </div>
    )
}
