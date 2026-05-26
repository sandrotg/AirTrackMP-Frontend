import { Skeleton } from '@/components/ui/skeleton'

export default function SystemLoading() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <Skeleton className="h-8 w-64 mb-2" />
                    <Skeleton className="h-4 w-72" />
                </div>
                <div className="flex items-center gap-6">
                    <Skeleton className="h-12 w-24" />
                    <Skeleton className="h-12 w-24" />
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-card border border-border rounded-xl p-6">
                    <Skeleton className="h-5 w-40 mb-6" />
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-16 w-full mb-2 rounded-lg" />
                    ))}
                </div>
                <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
                    <Skeleton className="h-5 w-48 mb-4" />
                    <Skeleton className="h-48 w-full" />
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-xl p-6">
                    <Skeleton className="h-5 w-36 mb-6" />
                    <Skeleton className="h-20 w-full mb-4" />
                    <div className="grid grid-cols-2 gap-4">
                        <Skeleton className="h-16 rounded-lg" />
                        <Skeleton className="h-16 rounded-lg" />
                    </div>
                    <Skeleton className="h-11 w-full mt-4 rounded-lg" />
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                    <Skeleton className="h-5 w-36 mb-6" />
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <Skeleton className="h-32 rounded-lg" />
                        <Skeleton className="h-32 rounded-lg" />
                    </div>
                    <Skeleton className="h-16 w-full rounded-lg" />
                </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
                <Skeleton className="h-5 w-48 mb-4" />
                {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-6 w-full mb-1" />
                ))}
            </div>
        </div>
    )
}
