import { Skeleton } from '@/components/ui/skeleton'

export default function LoginLoading() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="w-full max-w-sm space-y-6 rounded-lg border border-border bg-card p-8 shadow-sm">
                <div className="space-y-2 text-center">
                    <Skeleton className="h-7 w-40 mx-auto" />
                    <Skeleton className="h-4 w-44 mx-auto" />
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-10" />
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>
            </div>
        </div>
    )
}
