import { Skeleton } from '@/components/ui/skeleton'

export default function DiagnosticsLoading() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <Skeleton className="h-4 w-48 mb-2" />
                    <Skeleton className="h-9 w-72" />
                </div>
                <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-40 rounded-lg" />
                    <Skeleton className="h-10 w-36 rounded-lg" />
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-card border border-border rounded-xl overflow-hidden">
                    <div className="p-4 border-b border-border">
                        <div className="flex items-center gap-2">
                            <Skeleton className="w-3 h-3 rounded-full" />
                            <Skeleton className="w-3 h-3 rounded-full" />
                            <Skeleton className="h-4 w-48 ml-2" />
                        </div>
                    </div>
                    <div className="p-4 space-y-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <Skeleton key={i} className="h-4 w-full" />
                        ))}
                    </div>
                    <div className="p-4 border-t border-border">
                        <Skeleton className="h-4 w-28" />
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="bg-card border border-border rounded-xl p-6">
                        <Skeleton className="h-5 w-40 mb-6" />
                        <Skeleton className="h-10 w-full mb-4 rounded-lg" />
                        <div className="grid grid-cols-2 gap-3">
                            <Skeleton className="h-20 rounded-lg" />
                            <Skeleton className="h-20 rounded-lg" />
                        </div>
                    </div>
                    <div className="bg-card border border-border rounded-xl p-6">
                        <Skeleton className="h-5 w-36 mb-4" />
                        <Skeleton className="h-4 w-20 mb-4" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-card border border-border rounded-xl p-4">
                        <Skeleton className="h-3 w-20 mb-3" />
                        <Skeleton className="h-7 w-24" />
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-center gap-6 pt-4 border-t border-border">
                {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-3 w-32" />
                ))}
            </div>
        </div>
    )
}
