"use client"

import { Car, Leaf, Users, ArrowRight, type LucideIcon } from "lucide-react"
import type { View } from "@/lib/aduana-data"
import { cn } from "@/lib/utils"

interface ActionItem {
  view: View
  title: string
  description: string
  icon: LucideIcon
  accent: string
}

const actions: ActionItem[] = [
  {
    view: "vehiculos",
    title: "Registrar Vehículo",
    description: "Declara patente y propietario para el cruce fronterizo.",
    icon: Car,
    accent: "bg-primary/10 text-primary",
  },
  {
    view: "alimentos",
    title: "Declarar Alimentos y Mascotas",
    description: "Control fitosanitario y zoosanitario SAG.",
    icon: Leaf,
    accent: "bg-success/15 text-success",
  },
  {
    view: "menores",
    title: "Autorización de Menores",
    description: "Adjunta la autorización notarial y valida con PDI.",
    icon: Users,
    accent: "bg-warning/20 text-warning-foreground",
  },
]

export function QuickActions({ onSelect }: { onSelect: (view: View) => void }) {
  return (
    <section aria-labelledby="acciones-rapidas">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2
            id="acciones-rapidas"
            className="text-lg font-semibold tracking-tight text-foreground"
          >
            Trámites disponibles
          </h2>
          <p className="text-sm text-muted-foreground">
            Inicia un nuevo trámite en pocos pasos.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <button
              key={action.view}
              onClick={() => onSelect(action.view)}
              className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span
                className={cn(
                  "flex size-12 items-center justify-center rounded-lg",
                  action.accent,
                )}
              >
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-foreground">
                {action.title}
              </h3>
              <p className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">
                {action.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Iniciar trámite
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
