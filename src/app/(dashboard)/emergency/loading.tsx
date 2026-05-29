import { Skeleton } from '@/components/ui/skeleton'

export default function EmergencyLoading() {
    return (
        <div className="flex-1 p-6 overflow-auto">
            <Skeleton className="h-16 w-full rounded-lg mb-6" />
            <div className="mb-8">
                <Skeleton className="h-8 w-72 mb-2" />
                <Skeleton className="h-4 w-96" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-8 space-y-6">
                    <div className="bg-card rounded-lg border border-border p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <Skeleton className="h-4 w-24 mb-1" />
                                <Skeleton className="h-6 w-48" />
                            </div>
                            <div className="flex gap-2">
                                <Skeleton className="h-9 w-24 rounded-lg" />
                                <Skeleton className="h-9 w-28 rounded-lg" />
                            </div>
                        </div>
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} className="h-12 w-full mb-2" />
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-card rounded-lg border border-border p-6">
                            <Skeleton className="h-4 w-36 mb-1" />
                            <Skeleton className="h-5 w-48 mb-4" />
                            <Skeleton className="h-40 w-full" />
                        </div>
                        <div className="bg-card rounded-lg border border-border p-6">
                            <Skeleton className="h-4 w-36 mb-1" />
                            <Skeleton className="h-5 w-48 mb-4" />
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <Skeleton key={i} className="h-8 w-full" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-4 space-y-6">
                    <div className="bg-card rounded-lg border border-border p-6">
                        <Skeleton className="h-5 w-40 mb-6" />
                        <Skeleton className="h-16 w-full rounded-lg mb-6" />
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <Skeleton key={i} className="h-20 w-full rounded-lg" />
                            ))}
                        </div>
                        <Skeleton className="h-11 w-full mt-6 rounded-lg" />
                    </div>
                    <div className="bg-card rounded-lg border border-border overflow-hidden">
                        <Skeleton className="h-48 w-full" />
                        <div className="p-4">
                            <Skeleton className="h-4 w-24 mb-1" />
                            <Skeleton className="h-6 w-48" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
