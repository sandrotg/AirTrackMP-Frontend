import { Skeleton } from '@/components/ui/skeleton'

export default function ExplorerLoading() {
    return (
        <div className="flex-1 flex flex-col min-h-0 overflow-auto">
            <div className="p-6 border-b border-slate-700/50">
                <Skeleton className="h-3 w-48 mb-2" />
                <Skeleton className="h-8 w-64" />
            </div>
            <div className="p-6 border-b border-slate-700/50">
                <div className="flex items-center gap-4">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="flex-1 h-20 rounded-lg" />
                    ))}
                    <Skeleton className="h-20 w-36 rounded-lg" />
                </div>
            </div>
            <div className="flex-1 p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5">
                        <Skeleton className="h-5 w-64 mb-1" />
                        <Skeleton className="h-3 w-48 mb-4" />
                        <Skeleton className="h-72 w-full rounded-lg" />
                    </div>
                    <div className="bg-card border border-border rounded-xl p-5">
                        <Skeleton className="h-5 w-40 mb-1" />
                        <Skeleton className="h-3 w-48 mb-4" />
                        <Skeleton className="h-48 w-full rounded-lg" />
                        <Skeleton className="h-8 w-24 mx-auto mt-4" />
                    </div>
                </div>
                <div className="bg-card border border-border rounded-xl p-5">
                    <Skeleton className="h-5 w-48 mb-1" />
                    <Skeleton className="h-3 w-64 mb-4" />
                    <Skeleton className="h-64 w-full rounded-xl" />
                </div>
                <div className="grid grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-card border border-border rounded-xl p-5">
                            <Skeleton className="h-3 w-24 mb-2" />
                            <Skeleton className="h-8 w-32 mb-2" />
                            <Skeleton className="h-3 w-28" />
                        </div>
                    ))}
                </div>
                <div className="pt-4 border-t border-border">
                    <Skeleton className="h-3 w-64 mx-auto" />
                </div>
            </div>
        </div>
    )
}
