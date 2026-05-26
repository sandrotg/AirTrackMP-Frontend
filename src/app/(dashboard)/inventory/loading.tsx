import { Skeleton } from '@/components/ui/skeleton'

export default function InventoryLoading() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <Skeleton className="h-8 w-64 mb-2" />
                    <Skeleton className="h-4 w-72" />
                </div>
                <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-36 rounded-lg" />
                    <Skeleton className="h-10 w-36 rounded-lg" />
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-xl p-6">
                    <Skeleton className="h-5 w-40 mb-6" />
                    <div className="space-y-4">
                        <Skeleton className="h-12 w-full rounded-lg" />
                        <div className="grid grid-cols-2 gap-4">
                            <Skeleton className="h-12 w-full rounded-lg" />
                            <Skeleton className="h-12 w-full rounded-lg" />
                        </div>
                        <Skeleton className="h-12 w-full rounded-lg" />
                        <Skeleton className="h-11 w-full rounded-lg" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
                        <Skeleton className="h-24 rounded-lg" />
                        <Skeleton className="h-24 rounded-lg" />
                    </div>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <Skeleton className="h-5 w-48" />
                        <Skeleton className="h-6 w-40 rounded-full" />
                    </div>
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="h-14 w-full mb-2" />
                    ))}
                    <Skeleton className="h-10 w-full mt-4" />
                </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-32" />
                </div>
                {[1, 2].map((i) => (
                    <Skeleton key={i} className="h-20 w-full mb-2 rounded-lg" />
                ))}
            </div>
        </div>
    )
}
