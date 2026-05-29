import { Skeleton } from '@/components/ui/skeleton'

export default function ThresholdLoading() {
    return (
        <div className="flex-1 p-6 overflow-auto">
            <div className="mb-8">
                <Skeleton className="h-4 w-48 mb-2" />
                <Skeleton className="h-8 w-72" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card rounded-lg border border-border p-6">
                    <Skeleton className="h-5 w-48 mb-6" />
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} className="h-20 w-full rounded-lg" />
                        ))}
                    </div>
                </div>
                <div className="bg-card rounded-lg border border-border p-6">
                    <div className="flex items-center justify-between mb-6">
                        <Skeleton className="h-5 w-56" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Skeleton key={i} className="h-10 w-full mb-2" />
                    ))}
                </div>
                <div className="bg-card rounded-lg border border-border p-6">
                    <Skeleton className="h-5 w-48 mb-6" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} className="h-32 rounded-lg" />
                        ))}
                    </div>
                </div>
                <div className="bg-card rounded-lg border border-border p-6">
                    <Skeleton className="h-5 w-48 mb-6" />
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-start gap-3">
                                <Skeleton className="size-8 rounded-lg shrink-0" />
                                <div className="flex-1">
                                    <Skeleton className="h-4 w-48 mb-1" />
                                    <Skeleton className="h-3 w-64" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
