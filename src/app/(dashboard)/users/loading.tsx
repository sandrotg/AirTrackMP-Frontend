import { Skeleton } from '@/components/ui/skeleton'

export default function UsersLoading() {
    return (
        <div className="space-y-6">
            <div>
                <Skeleton className="h-4 w-64 mb-2" />
                <Skeleton className="h-8 w-72 mb-2" />
                <Skeleton className="h-4 w-96" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <Skeleton className="h-4 w-32 mb-1" />
                            <Skeleton className="h-3 w-48" />
                        </div>
                        <Skeleton className="h-10 w-36 rounded-lg" />
                    </div>
                    <Skeleton className="h-8 w-full mb-2" />
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="h-16 w-full mb-1" />
                    ))}
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <Skeleton className="h-4 w-28 mb-1" />
                            <Skeleton className="h-3 w-40" />
                        </div>
                        <Skeleton className="h-8 w-8 rounded" />
                    </div>
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="h-16 w-full mb-2" />
                    ))}
                    <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
                        <Skeleton className="h-24 rounded-lg" />
                        <Skeleton className="h-24 rounded-lg" />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-card border border-border rounded-xl p-6">
                    <Skeleton className="h-12 w-12 rounded-lg mb-4" />
                    <Skeleton className="h-6 w-48 mb-2" />
                    <Skeleton className="h-4 w-full" />
                </div>
                <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 space-y-4">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-16 w-full rounded-lg" />
                    ))}
                </div>
            </div>
        </div>
    )
}
