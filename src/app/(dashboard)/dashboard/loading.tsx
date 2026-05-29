import { Skeleton } from '@/components/ui/skeleton'

export default function DashboardLoading() {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 gap-y-4 flex flex-col">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-card border border-border rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <Skeleton className="h-3 w-24" />
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <Skeleton className="h-9 w-16" />
                                    <Skeleton className="h-4 w-8" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="relative bg-card border border-border rounded-lg overflow-hidden h-[250px] md:h-[380px]">
                        <Skeleton className="h-full w-full rounded-none" />
                    </div>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                        <Skeleton className="h-5 w-28" />
                        <Skeleton className="size-2.5 rounded-full" />
                    </div>
                    <div className="space-y-3">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="bg-secondary/50 border-l-2 border-l-muted rounded-r p-3">
                                <div className="flex items-center justify-between mb-1">
                                    <Skeleton className="h-3 w-20" />
                                    <Skeleton className="h-3 w-10" />
                                </div>
                                <Skeleton className="h-3 w-full" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                    <div key={i} className="bg-card border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                            <Skeleton className="h-4 w-48" />
                            <Skeleton className="h-3 w-16" />
                        </div>
                        <Skeleton className="h-48 w-full" />
                    </div>
                ))}
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 rounded" />
                        <Skeleton className="h-4 w-48" />
                    </div>
                    <Skeleton className="h-4 w-28" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-secondary/50 rounded-lg p-3 flex items-center gap-3">
                            <Skeleton className="size-10 rounded-full" />
                            <div className="flex-1 space-y-1.5">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                            <div className="text-right space-y-1.5">
                                <Skeleton className="h-3 w-14" />
                                <Skeleton className="h-3 w-10" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between py-2 px-4 bg-card border border-border rounded-lg">
                <div className="flex items-center gap-6">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-28" />
                </div>
                <Skeleton className="h-4 w-56" />
            </div>
        </div>
    )
}
