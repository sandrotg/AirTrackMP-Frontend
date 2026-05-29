'use client'

import { useState, useRef } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2, AlertTriangle, Radio } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${(i * 17 + 11) % 100}%`,
    top: `${(i * 31 + 7) % 100}%`,
    size: `${(((i * 13 + 5) % 25) + 5) / 10}px`,
    duration: `${(((i * 19 + 3) % 18) + 12)}s`,
    delay: `${(((i * 7 + 11) % 10))}s`,
    driftX: `${((((i * 23 + 17) % 40) - 20))}px`,
    driftY: `${((((i * 29 + 13) % 40) - 20))}px`,
}))

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [shaking, setShaking] = useState(false)
    const cardRef = useRef<HTMLDivElement>(null)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError('')

        const result = await signIn('credentials', {
            email,
            password,
            redirect: false
        })

        if (result?.error) {
            const errorMap: Record<string, string> = {
                'User not found': 'Usuario no encontrado',
                'Invalid password': 'Contraseña incorrecta',
            }
            setError(errorMap[result.error] || 'Credenciales inválidas')
            setLoading(false)
            setShaking(true)
            setTimeout(() => setShaking(false), 400)
            return
        }

        router.push('/dashboard')
    }

    return (
        <>
            <style>{`
                @keyframes float-particle {
                    0%, 100% { transform: translate(0, 0); opacity: 0; }
                    20% { opacity: 0.6; }
                    50% { transform: translate(var(--dx), var(--dy)); opacity: 1; }
                    80% { opacity: 0.4; }
                }
                @keyframes gradient-orbit {
                    0% { transform: rotate(0deg) translateX(30px) rotate(0deg); }
                    100% { transform: rotate(360deg) translateX(30px) rotate(-360deg); }
                }
                @keyframes gradient-pulse {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.6; transform: scale(1.05); }
                }
                @keyframes card-glow {
                    0%, 100% { border-color: rgba(255,255,255,0.08); box-shadow: 0 0 30px rgba(6,182,212,0.05); }
                    50% { border-color: rgba(6,182,212,0.25); box-shadow: 0 0 60px rgba(6,182,212,0.12); }
                }
                @keyframes icon-glow {
                    0%, 100% { box-shadow: 0 0 15px rgba(6,182,212,0.15); }
                    50% { box-shadow: 0 0 35px rgba(6,182,212,0.4); }
                }
                @keyframes shake {
                    0%, 100% { translate: 0; }
                    10%, 50%, 90% { translate: -5px; }
                    30%, 70% { translate: 5px; }
                }
            `}</style>

            <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030712]">
                {/* Animated gradient orbs */}
                <div
                    className="pointer-events-none absolute -top-48 -right-48 size-[500px] rounded-full opacity-30 blur-[120px]"
                    style={{
                        background:
                            'radial-gradient(circle, rgba(6,182,212,0.3) 0%, rgba(99,102,241,0.1) 50%, transparent 70%)',
                        animation: 'gradient-pulse 6s ease-in-out infinite'
                    }}
                />
                <div
                    className="pointer-events-none absolute -bottom-48 -left-48 size-[500px] rounded-full opacity-30 blur-[120px]"
                    style={{
                        background:
                            'radial-gradient(circle, rgba(168,85,247,0.25) 0%, rgba(6,182,212,0.1) 50%, transparent 70%)',
                        animation: 'gradient-pulse 8s ease-in-out infinite reverse'
                    }}
                />
                <div
                    className="pointer-events-none absolute left-1/2 top-1/2 size-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[100px]"
                    style={{
                        background:
                            'radial-gradient(circle, rgba(34,211,238,0.2) 0%, transparent 60%)',
                        animation: 'gradient-orbit 20s linear infinite'
                    }}
                />

                {/* Floating particles */}
                {PARTICLES.map((p) => (
                    <div
                        key={p.id}
                        className="pointer-events-none absolute rounded-full bg-cyan-400"
                        style={{
                            left: p.left,
                            top: p.top,
                            width: p.size,
                            height: p.size,
                            '--dx': p.driftX,
                            '--dy': p.driftY,
                            animation: `float-particle ${p.duration} ease-in-out ${p.delay} infinite`
                        } as React.CSSProperties}
                    />
                ))}

                {/* Scanline overlay */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.015]"
                    style={{
                        backgroundImage:
                            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
                    }}
                />

                {/* Login Card */}
                <div
                    ref={cardRef}
                    className={`relative w-full max-w-sm rounded-2xl border p-8 ${
                        shaking ? 'animate-[shake_0.4s_ease-in-out]' : ''
                    }`}
                    style={{
                        background:
                            'linear-gradient(135deg, rgba(15,23,42,0.6) 0%, rgba(15,23,42,0.3) 100%)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        animation: 'card-glow 4s ease-in-out infinite',
                        boxShadow:
                            '0 0 40px rgba(6,182,212,0.05), inset 0 1px 0 rgba(255,255,255,0.05)'
                    }}
                >
                    {/* Decorative top accent line */}
                    <div
                        className="absolute left-8 right-8 top-0 h-px"
                        style={{
                            background:
                                'linear-gradient(90deg, transparent, rgba(6,182,212,0.4), transparent)'
                        }}
                    />

                    <div className="space-y-6 text-center">
                        <div className="flex justify-center">
                            <div
                                className="flex size-14 items-center justify-center rounded-xl bg-cyan-500/10"
                                style={{
                                    animation: 'icon-glow 3s ease-in-out infinite',
                                    border: '1px solid rgba(6,182,212,0.15)'
                                }}
                            >
                                <Radio className="size-6 text-cyan-400" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-2xl font-bold tracking-[0.2em] text-white">
                                OBSERVATORY
                            </h1>
                            <p className="text-xs text-slate-400">
                                AirTrackMP — IoT Network Monitoring
                            </p>
                        </div>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 space-y-5"
                    >
                        <div className="space-y-1.5">
                            <label
                                className="text-xs font-medium text-slate-300"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@example.com"
                                autoComplete="email"
                                required
                                className="border-slate-700/60 bg-slate-800/40 text-white placeholder:text-slate-500 focus-visible:border-cyan-500/60 focus-visible:ring-4 focus-visible:ring-cyan-500/15"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label
                                className="text-xs font-medium text-slate-300"
                                htmlFor="password"
                            >
                                Contraseña
                            </label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    required
                                    className="border-slate-700/60 bg-slate-800/40 pr-9 text-white placeholder:text-slate-500 focus-visible:border-cyan-500/60 focus-visible:ring-4 focus-visible:ring-cyan-500/15"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                                    tabIndex={-1}
                                >
                                    {showPassword ? (
                                        <EyeOff className="size-4" />
                                    ) : (
                                        <Eye className="size-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div
                                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs"
                                style={{
                                    background:
                                        'rgba(239,68,68,0.08)',
                                    border: '1px solid rgba(239,68,68,0.2)'
                                }}
                            >
                                <AlertTriangle className="size-3.5 shrink-0 text-red-400" />
                                <span className="text-red-300">{error}</span>
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="relative w-full overflow-hidden border-0 bg-cyan-500 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] disabled:opacity-50"
                        >
                            {loading && (
                                <Loader2 className="mr-2 size-4 animate-spin" />
                            )}
                            {loading ? 'Ingresando...' : 'Ingresar'}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-[10px] tracking-[0.1em] text-slate-600">
                            CITYSCALE MONITORING SYSTEM v4.0.2 // SECURE
                            HANDSHAKE
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
