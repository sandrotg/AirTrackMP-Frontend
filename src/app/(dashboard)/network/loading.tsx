import { Skeleton } from '@/components/ui/skeleton'

export default function NetworkLoading() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-4 w-96" />
                </div>
                <div className="flex gap-3">
                    <Skeleton className="h-9 w-32 rounded-md" />
                    <Skeleton className="h-9 w-36 rounded-md" />
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-card border border-border rounded-lg p-4">
                        <Skeleton className="h-4 w-28 mb-2" />
                        <div className="flex items-baseline gap-2">
                            <Skeleton className="h-8 w-12" />
                            <Skeleton className="h-3 w-10" />
                        </div>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="bg-card border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Skeleton className="size-10 rounded" />
                                <div>
                                    <Skeleton className="h-5 w-48 mb-1" />
                                    <Skeleton className="h-3 w-32" />
                                </div>
                            </div>
                            <div className="text-right">
                                <Skeleton className="h-4 w-16 mb-1" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-card border border-border rounded-lg p-4">
                                <Skeleton className="h-3 w-24 mb-2" />
                                <Skeleton className="h-6 w-20 mb-1" />
                                <Skeleton className="h-3 w-28" />
                            </div>
                        ))}
                    </div>
                    <div className="bg-card border border-border rounded-lg p-4">
                        <Skeleton className="h-4 w-20 mb-2" />
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-5 w-14 rounded" />
                        </div>
                    </div>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                    <Skeleton className="h-5 w-32 mb-3" />
                    <Skeleton className="h-64 w-full rounded-lg mb-3" />
                    <Skeleton className="h-16 w-full rounded" />
                </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                    <Skeleton className="h-5 w-40" />
                    <div className="flex gap-2">
                        <Skeleton className="h-7 w-10 rounded" />
                        <Skeleton className="h-7 w-20 rounded" />
                    </div>
                </div>
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-border">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <th key={i} className="pb-3">
                                    <Skeleton className="h-3 w-16" />
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {[1, 2, 3, 4, 5].map((row) => (
                            <tr key={row} className="border-b border-border/50">
                                {[1, 2, 3, 4, 5, 6].map((col) => (
                                    <td key={col} className="py-4">
                                        <Skeleton className="h-4 w-20" />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
