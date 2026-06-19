"use client"

import { Clock, ShieldCheck, TrendingUp } from "lucide-react"
import type { View } from "@/lib/aduana-data"
import { QuickActions } from "./quick-actions"
import { TramiteTimeline } from "./tramite-timeline"
import { SidebarPanel } from "./sidebar-panel"

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode
  value: string
  label: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
      <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </span>
      <div className="leading-tight">
        <p className="text-xl font-semibold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  )
}

export function Dashboard({ onSelect }: { onSelect: (view: View) => void }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
      {/* Bienvenida */}
      <div className="mb-6">
        <p className="text-sm font-medium text-primary">Portal Ciudadano</p>
        <h1 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Hola, Camila. Bienvenida a Aduana 4.0
        </h1>
        <p className="mt-1 max-w-2xl text-pretty text-sm text-muted-foreground">
          Gestiona tus trámites del paso fronterizo Chile–Argentina de forma
          rápida y segura. Tiempo promedio de respuesta del sistema: menos de 2
          segundos.
        </p>
      </div>

      {/* Estadísticas rápidas */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          icon={<Clock className="size-5" aria-hidden="true" />}
          value="1.4 s"
          label="Tiempo medio de validación"
        />
        <StatCard
          icon={<ShieldCheck className="size-5" aria-hidden="true" />}
          value="100%"
          label="Sistemas operativos"
        />
        <StatCard
          icon={<TrendingUp className="size-5" aria-hidden="true" />}
          value="3"
          label="Trámites activos"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-8 lg:col-span-2">
          <QuickActions onSelect={onSelect} />
          <TramiteTimeline />
        </div>
        <div className="lg:col-span-1">
          <SidebarPanel />
        </div>
      </div>
    </div>
  )
}
