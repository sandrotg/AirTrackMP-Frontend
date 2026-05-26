import { Skeleton } from '@/components/ui/skeleton'

export default function AlertsLoading() {
    return (
        <div className="flex gap-6 h-full">
            <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <Skeleton className="h-8 w-56 mb-1" />
                        <Skeleton className="h-3 w-48" />
                    </div>
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-9 w-48 rounded-md" />
                        <Skeleton className="size-9 rounded-md" />
                    </div>
                </div>
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border bg-secondary/30">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <th key={i} className="p-4">
                                        <Skeleton className="h-3 w-20" />
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: 8 }).map((_, i) => (
                                <tr key={i} className="border-b border-border/50">
                                    <td className="p-4"><Skeleton className="h-4 w-28" /></td>
                                    <td className="p-4"><div className="flex items-center gap-2"><Skeleton className="size-1.5 rounded-full" /><Skeleton className="h-4 w-28" /></div></td>
                                    <td className="p-4"><Skeleton className="h-5 w-16 rounded" /></td>
                                    <td className="p-4"><Skeleton className="h-4 w-20 mb-1" /><Skeleton className="h-4 w-16" /></td>
                                    <td className="p-4"><Skeleton className="h-4 w-16" /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
