'use client'

import { useRouter } from 'next/navigation'
import { Radio, Map, BrainCircuit, Wifi, Server, Database, Cpu, BarChart3, Bell, Users, ArrowRight, ChevronDown, Thermometer, Droplets, AlertTriangle, Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'

const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${(i * 17 + 11) % 100}%`,
    top: `${(i * 31 + 7) % 100}%`,
    size: `${(((i * 13 + 5) % 25) + 5) / 10}px`,
    duration: `${(((i * 19 + 3) % 18) + 12)}s`,
    delay: `${(((i * 7 + 11) % 10))}s`,
    driftX: `${((((i * 23 + 17) % 40) - 20))}px`,
    driftY: `${((((i * 29 + 13) % 40) - 20))}px`,
}))

const TEAM = [
    { name: 'Sandro D. Torres Gutiérrez', initials: 'ST', email: 'tsandro@uninorte.edu.co' },
    { name: 'Keiver D. Miranda Lemus', initials: 'KM', email: 'mkeiver@uninorte.edu.co' },
    { name: 'Luis E. Llerena Trujillo', initials: 'LL', email: 'lellerena@uninorte.edu.co' },
]

const TECH_STACK = [
    { icon: Radio, label: 'IoT / ESP32', desc: 'Nodos sensores distribuidos' },
    { icon: Cpu, label: 'React + Next.js', desc: 'Frontend interactivo' },
    { icon: Server, label: 'Java / Spring', desc: 'Backend API' },
    { icon: BrainCircuit, label: 'Python / IA', desc: 'Modelos predictivos' },
    { icon: Database, label: 'AWS', desc: 'Almacenamiento cloud' },
    { icon: Activity, label: 'PostgreSQL', desc: 'Base de datos relacional' },
]

const FEATURES = [
    {
        icon: Radio,
        title: 'Red IoT Distribuida',
        desc: 'Nodos con sensores de PM2.5, PM10, temperatura y humedad desplegados en puntos estratégicos de la ciudad.',
        gradient: 'from-cyan-500/20 to-cyan-500/5',
        border: 'rgba(6,182,212,0.15)',
        glow: 'rgba(6,182,212,0.08)',
    },
    {
        icon: Map,
        title: 'Monitoreo en Tiempo Real',
        desc: 'Dashboard interactivo con mapa dinámico, gráficos y métricas actualizadas para visualización inmediata de la calidad del aire.',
        gradient: 'from-purple-500/20 to-purple-500/5',
        border: 'rgba(168,85,247,0.15)',
        glow: 'rgba(168,85,247,0.08)',
    },
    {
        icon: BrainCircuit,
        title: 'IA Predictiva + Alertas',
        desc: 'Modelos de inteligencia artificial que estiman niveles futuros de contaminación y generan alertas tempranas ante valores peligrosos.',
        gradient: 'from-emerald-500/20 to-emerald-500/5',
        border: 'rgba(16,185,129,0.15)',
        glow: 'rgba(16,185,129,0.08)',
    },
]

const STATS = [
    { value: '400K', label: 'MUERTES PREMATURAS/AÑO EN EUROPA POR CONTAMINACIÓN', icon: AlertTriangle, color: 'text-destructive' },
    { value: '50%+', label: 'EMISIONES NO-EXHAUSTIVAS SUPERAN A LAS DE ESCAPE EN MUCHOS PAÍSES', icon: BarChart3, color: 'text-warning' },
    { value: '3', label: 'NODOS IoT DESPLEGADOS EN ENTORNO URBANO REAL', icon: Radio, color: 'text-primary' },
    { value: '99.4%', label: 'PRECISIÓN DEL MODELO PREDICTIVO', icon: BrainCircuit, color: 'text-success' },
]

const ARCH_STEPS = [
    { icon: Radio, label: 'Nodos IoT', desc: 'Sensores ambientales ESP32 miden PM2.5, PM10, temperatura y humedad' },
    { icon: Wifi, label: 'Gateway', desc: 'Traduce y transmite datos mediante protocolos de red' },
    { icon: Server, label: 'API', desc: 'Valida, procesa y crea eventos para su distribución' },
    { icon: Database, label: 'Event Broker', desc: 'Gestiona eventos asíncronos hacia storage y modelo IA' },
    { icon: BrainCircuit, label: 'Modelo IA', desc: 'Predice niveles futuros de contaminación y genera alertas' },
    { icon: Map, label: 'Dashboard', desc: 'Visualización en tiempo real con mapas, gráficos y métricas' },
]

function SectionHeading({ label, title, subtitle }: { label: string, title: string, subtitle?: string }) {
    return (
        <div className="text-center mb-16">
            <span className="inline-block text-[10px] tracking-[0.25em] text-primary font-semibold mb-3 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5">
                {label}
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-foreground mt-3 tracking-tight">
                {title}
            </h2>
            {subtitle && (
                <p className="text-sm text-muted-foreground mt-3 max-w-2xl mx-auto leading-relaxed">
                    {subtitle}
                </p>
            )}
        </div>
    )
}

function GlassCard({ children, className = '', style }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) {
    return (
        <div
            className={`relative rounded-2xl border p-6 ${className}`}
            style={{
                background: 'linear-gradient(135deg, rgba(15,23,42,0.5) 0%, rgba(15,23,42,0.2) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderColor: 'rgba(255,255,255,0.06)',
                boxShadow: '0 0 40px rgba(6,182,212,0.03), inset 0 1px 0 rgba(255,255,255,0.04)',
                ...style,
            }}
        >
            <div className="absolute top-0 left-6 right-6 h-px"
                style={{
                    background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.3), transparent)'
                }}
            />
            {children}
        </div>
    )
}

function StatCard({ value, label, icon: Icon, color }: { value: string, label: string, icon: React.ElementType, color: string }) {
    return (
        <GlassCard className="text-center p-8">
            <Icon className={`h-6 w-6 mx-auto mb-4 ${color}`} />
            <p className={`text-4xl md:text-5xl font-bold tracking-tight ${color} mb-3`}>{value}</p>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto">{label}</p>
        </GlassCard>
    )
}

export default function LandingPage() {
    const router = useRouter()

    function scrollTo(id: string) {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <>
            <style>{`
                @keyframes float-particle {
                    0%, 100% { transform: translate(0, 0); opacity: 0; }
                    20% { opacity: 0.6; }
                    50% { transform: translate(var(--dx), var(--dy)); opacity: 0.8; }
                    80% { opacity: 0.3; }
                }
                @keyframes gradient-pulse {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.05); }
                }
                @keyframes fade-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slide-in {
                    from { opacity: 0; transform: translateX(-20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes pulse-glow {
                    0%, 100% { box-shadow: 0 0 20px rgba(6,182,212,0.1); }
                    50% { box-shadow: 0 0 50px rgba(6,182,212,0.3); }
                }
                @keyframes border-dance {
                    0%, 100% { border-color: rgba(6,182,212,0.1); }
                    50% { border-color: rgba(6,182,212,0.3); }
                }
                .animate-fade-up {
                    animation: fade-up 0.8s ease-out forwards;
                }
                .animate-slide-in {
                    animation: slide-in 0.6s ease-out forwards;
                }
                .delay-100 { animation-delay: 100ms; }
                .delay-200 { animation-delay: 200ms; }
                .delay-300 { animation-delay: 300ms; }
                .delay-400 { animation-delay: 400ms; }
                .delay-500 { animation-delay: 500ms; }
                .delay-600 { animation-delay: 600ms; }
            `}</style>

            <div className="relative min-h-screen bg-[#030712] overflow-hidden">

                {/* === GLOBAL EFFECTS === */}
                <div className="pointer-events-none fixed inset-0 z-0"
                    style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px)'
                    }}
                />
                <div className="pointer-events-none fixed inset-0 z-0"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
                        backgroundSize: '80px 80px'
                    }}
                />

                {/* Particles */}
                <div className="pointer-events-none fixed inset-0 z-0">
                    {PARTICLES.map((p) => (
                        <div
                            key={p.id}
                            className="absolute rounded-full bg-cyan-400/40"
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
                </div>

                {/* === NAVBAR === */}
                <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5"
                    style={{
                        background: 'linear-gradient(180deg, rgba(3,7,18,0.9) 0%, rgba(3,7,18,0.5) 100%)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                    }}
                >
                    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center size-9 rounded-lg bg-primary/10 border border-primary/20">
                                <Radio className="size-4 text-primary" />
                            </div>
                            <span className="text-sm font-bold tracking-[0.15em] text-foreground">AirTrackMP</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <button onClick={() => scrollTo('problem')} className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wide">El Problema</button>
                            <button onClick={() => scrollTo('solution')} className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wide">Solución</button>
                            <button onClick={() => scrollTo('architecture')} className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wide">Arquitectura</button>
                            <button onClick={() => scrollTo('team')} className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wide">Equipo</button>
                            <Button onClick={() => router.push('/login')} size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold px-4">
                                Ir al Dashboard
                            </Button>
                        </div>
                    </div>
                </nav>

                {/* === HERO === */}
                <section className="relative z-10 min-h-screen flex items-center justify-center pt-16">
                    {/* Gradient Orbs */}
                    <div className="pointer-events-none absolute -top-48 -right-48 size-[600px] rounded-full opacity-30 blur-[150px]"
                        style={{
                            background: 'radial-gradient(circle, rgba(6,182,212,0.3) 0%, rgba(99,102,241,0.1) 50%, transparent 70%)',
                            animation: 'gradient-pulse 6s ease-in-out infinite'
                        }}
                    />
                    <div className="pointer-events-none absolute -bottom-48 -left-48 size-[600px] rounded-full opacity-30 blur-[150px]"
                        style={{
                            background: 'radial-gradient(circle, rgba(168,85,247,0.25) 0%, rgba(6,182,212,0.1) 50%, transparent 70%)',
                            animation: 'gradient-pulse 8s ease-in-out infinite reverse'
                        }}
                    />
                    <div className="pointer-events-none absolute left-1/2 top-1/2 size-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px]"
                        style={{
                            background: 'radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 60%)',
                            animation: 'gradient-pulse 10s ease-in-out infinite'
                        }}
                    />

                    <div className="text-center px-6 max-w-4xl mx-auto">
                        <div className="animate-fade-up">
                            <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] text-primary font-semibold mb-6 px-4 py-2 rounded-full border border-primary/20 bg-primary/5">
                                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                                SISTEMA DE MONITOREO ACTIVO
                            </span>
                        </div>

                        <h1 className="animate-fade-up delay-100 text-5xl md:text-7xl font-light text-foreground tracking-tight leading-tight">
                            AirTrackMP
                        </h1>
                        <p className="animate-fade-up delay-200 text-lg md:text-xl text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">
                            Diseño e implementación de una plataforma IoT para la medición, análisis y predicción de material particulado asociado a emisiones no-exhaustivas en ciudades inteligentes
                        </p>

                        <div className="animate-fade-up delay-300 flex items-center justify-center gap-4 mt-10">
                            <Button onClick={() => router.push('/login')} size="lg"
                                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 h-11 text-sm"
                                style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}
                            >
                                Ir al Dashboard
                                <ArrowRight className="ml-2 size-4" />
                            </Button>
                            <Button onClick={() => scrollTo('problem')} variant="outline" size="lg"
                                className="border-border/60 text-muted-foreground hover:text-foreground px-8 h-11 text-sm"
                            >
                                Conocer más
                            </Button>
                        </div>

                        <div className="animate-fade-up delay-400 mt-20">
                            <button onClick={() => scrollTo('problem')} className="text-muted-foreground hover:text-foreground transition-colors">
                                <ChevronDown className="size-6 mx-auto animate-bounce" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* === PROBLEM / STATS === */}
                <section id="problem" className="relative z-10 py-24 px-6">
                    <div className="max-w-7xl mx-auto">
                        <SectionHeading
                            label="EL PROBLEMA"
                            title="La contaminación invisible de las ciudades"
                            subtitle="Las emisiones no-exhaustivas del transporte —generadas por el desgaste de frenos, neumáticos y la resuspensión de partículas— representan una fracción significativa del material particulado urbano, incluso superando a las emisiones del tubo de escape en muchos países."
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
                            {STATS.map((stat, i) => (
                                <div key={i} className={`animate-fade-up delay-${(i + 1) * 100}`}>
                                    <StatCard {...stat} />
                                </div>
                            ))}
                        </div>

                        <div className="animate-fade-up delay-500 mt-12 max-w-3xl mx-auto">
                            <GlassCard className="p-8 text-center">
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Estudios de <strong className="text-foreground">Amato et al. (2014)</strong> señalan que <strong className="text-primary">~400,000 muertes prematuras</strong> en adultos se presentan cada año en Europa debido a la contaminación del aire. <strong className="text-foreground">Harrison et al. (2021)</strong> destacan que las emisiones no-exhaustivas se han convertido en una proporción creciente y en muchos países ya superan a las emisiones de escape.
                                </p>
                            </GlassCard>
                        </div>
                    </div>
                </section>

                {/* === SOLUTION / FEATURES === */}
                <section id="solution" className="relative z-10 py-24 px-6">
                    <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] rounded-full opacity-10 blur-[150px]"
                        style={{
                            background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 60%)'
                        }}
                    />
                    <div className="max-w-7xl mx-auto relative">
                        <SectionHeading
                            label="LA SOLUCIÓN"
                            title="Tecnología IoT + Inteligencia Artificial"
                            subtitle="Integramos sensores ambientales, una plataforma de procesamiento de datos e inteligencia artificial para estimar niveles futuros de contaminación y generar alertas tempranas."
                        />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                            {FEATURES.map((f, i) => (
                                <div key={i} className={`animate-fade-up delay-${(i + 1) * 100}`}>
                                    <GlassCard className="p-8 h-full"
                                        style={{
                                            borderColor: f.border,
                                            boxShadow: `0 0 40px ${f.glow}, inset 0 1px 0 rgba(255,255,255,0.04)`,
                                        }}
                                    >
                                        <div className={`size-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-5 border`}
                                            style={{ borderColor: f.border }}
                                        >
                                            <f.icon className="size-5 text-primary" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-foreground mb-3">{f.title}</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                                    </GlassCard>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* === ARCHITECTURE === */}
                <section id="architecture" className="relative z-10 py-24 px-6">
                    <div className="max-w-7xl mx-auto">
                        <SectionHeading
                            label="ARQUITECTURA"
                            title="Flujo del sistema"
                            subtitle="Desde la red de nodos IoT hasta la visualización en dashboard, pasando por procesamiento asíncrono y modelos de IA."
                        />

                        <div className="relative mt-12">
                            {/* Connection line (desktop) */}
                            <div className="hidden lg:block absolute top-1/2 left-[8%] right-[8%] h-px"
                                style={{
                                    background: 'linear-gradient(90deg, rgba(6,182,212,0.1), rgba(6,182,212,0.4), rgba(6,182,212,0.1))'
                                }}
                            />

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                {ARCH_STEPS.map((step, i) => (
                                    <div key={i} className={`animate-fade-up delay-${(i + 1) * 100}`}>
                                        <GlassCard className="text-center p-6 h-full">
                                            <div className="size-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                                                <step.icon className="size-4 text-primary" />
                                            </div>
                                            <p className="text-xs font-semibold text-foreground tracking-wide mb-1">{step.label}</p>
                                            <p className="text-[10px] text-muted-foreground leading-relaxed">{step.desc}</p>
                                            {i < ARCH_STEPS.length - 1 && (
                                                <div className="hidden md:block text-muted-foreground mt-3">
                                                    <ArrowRight className="size-3 mx-auto opacity-40" />
                                                </div>
                                            )}
                                        </GlassCard>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* === TECH STACK === */}
                <section id="techstack" className="relative z-10 py-24 px-6">
                    <div className="max-w-7xl mx-auto">
                        <SectionHeading
                            label="STACK TECNOLÓGICO"
                            title="Tecnologías utilizadas"
                            subtitle="Seleccionadas para escalabilidad, rendimiento y facilidad de despliegue en entornos cloud."
                        />

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">
                            {TECH_STACK.map((tech, i) => (
                                <div key={i} className={`animate-fade-up delay-${(i + 1) * 100}`}>
                                    <GlassCard className="text-center p-6 h-full">
                                        <div className="size-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3">
                                            <tech.icon className="size-4 text-primary" />
                                        </div>
                                        <p className="text-xs font-semibold text-foreground mb-1">{tech.label}</p>
                                        <p className="text-[10px] text-muted-foreground">{tech.desc}</p>
                                    </GlassCard>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* === TEAM === */}
                <section id="team" className="relative z-10 py-24 px-6">
                    <div className="max-w-4xl mx-auto">
                        <SectionHeading
                            label="EQUIPO"
                            title="Ingeniería de Sistemas — Universidad del Norte"
                            subtitle="Proyecto de grado desarrollado por estudiantes de Ingeniería de Sistemas de la Universidad del Norte, Barranquilla."
                        />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                            {TEAM.map((member, i) => (
                                <div key={i} className={`animate-fade-up delay-${(i + 1) * 100}`}>
                                    <GlassCard className="text-center p-8 h-full">
                                        <div className="size-14 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                                            <span className="text-sm font-bold text-primary">{member.initials}</span>
                                        </div>
                                        <p className="text-sm font-semibold text-foreground mb-1">{member.name}</p>
                                        <p className="text-xs text-muted-foreground mb-3">Ingeniería de Sistemas</p>
                                        <a href={`mailto:${member.email}`} className="text-[10px] text-primary/70 hover:text-primary transition-colors tracking-wide">
                                            {member.email}
                                        </a>
                                    </GlassCard>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* === FINAL CTA === */}
                <section className="relative z-10 py-24 px-6 border-t border-white/5">
                    <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[400px] rounded-full opacity-20 blur-[120px]"
                        style={{
                            background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 60%)'
                        }}
                    />
                    <div className="max-w-3xl mx-auto text-center relative">
                        <h2 className="text-3xl md:text-4xl font-light text-foreground tracking-tight mb-6">
                            ¿Listo para monitorear la calidad del aire?
                        </h2>
                        <p className="text-sm text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
                            Accede al dashboard completo con mapas en tiempo real, gráficos analíticos, alertas inteligentes y predicciones basadas en IA.
                        </p>
                        <Button onClick={() => router.push('/login')} size="lg"
                            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-10 h-12 text-sm"
                            style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}
                        >
                            Ir al Dashboard
                            <ArrowRight className="ml-2 size-4" />
                        </Button>
                    </div>
                </section>

                {/* === FOOTER === */}
                <footer className="relative z-10 border-t border-white/5 py-8 px-6">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center size-7 rounded bg-primary/10">
                                <Radio className="size-3 text-primary" />
                            </div>
                            <span className="text-xs font-semibold tracking-[0.1em] text-foreground">AirTrackMP</span>
                        </div>
                        <p className="text-[10px] tracking-[0.15em] text-muted-foreground">
                            CITYSCALE MONITORING SYSTEM v4.0.2 // SECURE HANDSHAKE
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                            © 2026 Universidad del Norte. Todos los derechos reservados.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    )
}
