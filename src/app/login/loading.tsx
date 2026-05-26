import { Skeleton } from '@/components/ui/skeleton'

export default function LoginLoading() {
    return (
        <div className="flex min-h-screen items-center justify-center overflow-hidden bg-[#030712]">
            <div
                className="w-full max-w-sm rounded-2xl border border-white/[0.08] p-8"
                style={{
                    background:
                        'linear-gradient(135deg, rgba(15,23,42,0.6) 0%, rgba(15,23,42,0.3) 100%)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)'
                }}
            >
                <div className="space-y-6 text-center">
                    <div className="flex justify-center">
                        <Skeleton className="size-14 rounded-xl bg-slate-800" />
                    </div>
                    <div className="space-y-1">
                        <Skeleton className="mx-auto h-6 w-48 bg-slate-800" />
                        <Skeleton className="mx-auto h-3 w-40 bg-slate-800" />
                    </div>
                </div>
                <div className="mt-8 space-y-5">
                    <div className="space-y-1.5">
                        <Skeleton className="h-3 w-8 bg-slate-800" />
                        <Skeleton className="h-9 w-full rounded-lg bg-slate-800" />
                    </div>
                    <div className="space-y-1.5">
                        <Skeleton className="h-3 w-16 bg-slate-800" />
                        <Skeleton className="h-9 w-full rounded-lg bg-slate-800" />
                    </div>
                    <Skeleton className="h-10 w-full rounded-lg bg-slate-800" />
                </div>
                <Skeleton className="mx-auto mt-6 h-3 w-52 bg-slate-800" />
            </div>
        </div>
    )
}
