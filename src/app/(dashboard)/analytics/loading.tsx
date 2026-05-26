import { Skeleton } from '@/components/ui/skeleton'

export default function AnalyticsLoading() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <Skeleton className="h-4 w-48 mb-2" />
                    <Skeleton className="h-8 w-64" />
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <Skeleton className="h-3 w-28 mb-1" />
                        <Skeleton className="h-8 w-16 ml-auto" />
                    </div>
                    <Skeleton className="h-14 w-36 rounded-lg" />
                </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                    <div className="bg-card border border-border rounded-lg p-6">
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <Skeleton className="h-5 w-56 mb-1" />
                                <Skeleton className="h-3 w-64" />
                            </div>
                            <div className="flex items-center gap-6">
                                <Skeleton className="h-3 w-24" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                        </div>
                        <Skeleton className="h-72 w-full mt-4" />
                    </div>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                    <Skeleton className="h-5 w-32 mb-4" />
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-6 w-20 mb-1" />
                    <Skeleton className="h-8 w-16 mb-4" />
                    <Skeleton className="h-1 w-full rounded-full mb-4" />
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <Skeleton className="h-16 rounded-lg" />
                        <Skeleton className="h-16 rounded-lg" />
                    </div>
                    <Skeleton className="h-20 w-full rounded-lg" />
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-card border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <Skeleton className="h-4 w-36 mb-1" />
                                <Skeleton className="h-3 w-32" />
                            </div>
                        </div>
                        <Skeleton className="h-48 w-full" />
                        <div className="flex justify-between mt-2">
                            <Skeleton className="h-3 w-28" />
                            <Skeleton className="h-3 w-24" />
                        </div>
                    </div>
                ))}
                <div className="bg-card border border-border rounded-lg p-4">
                    <Skeleton className="h-3 w-24 mb-2" />
                    <Skeleton className="h-9 w-24 mb-1" />
                    <Skeleton className="h-3 w-16 mb-3" />
                    <Skeleton className="h-1 w-full rounded-full" />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                    <div key={i} className="bg-card border border-border rounded-lg p-4 flex items-center gap-4">
                        <Skeleton className="size-12 rounded-lg shrink-0" />
                        <div className="flex-1">
                            <Skeleton className="h-5 w-48 mb-1" />
                            <Skeleton className="h-3 w-full" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
