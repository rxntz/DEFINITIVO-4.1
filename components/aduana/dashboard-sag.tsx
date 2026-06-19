"use client"

import { useState } from "react"
import { Leaf, PawPrint, ShieldCheck, Check, X, Clock } from "lucide-react"
import { declarations, type Declaration } from "@/lib/aduana-data"
import { cn } from "@/lib/utils"

type Decision = "pendiente" | "aprobado" | "rechazado"

export function DashboardSag() {
  const [decisions, setDecisions] = useState<Record<string, Decision>>(() =>
    Object.fromEntries(declarations.map((d) => [d.id, "pendiente"])),
  )

  const pending = Object.values(decisions).filter((d) => d === "pendiente").length

  function decide(id: string, decision: Decision) {
    setDecisions((prev) => ({ ...prev, [id]: decision }))
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:py-8">
      <div className="mb-6">
        <p className="text-sm font-medium text-success">Control SAG / PDI</p>
        <h1 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Control de alimentos y mascotas
        </h1>
        <p className="mt-1 max-w-2xl text-pretty text-sm text-muted-foreground">
          Revisa y resuelve las declaraciones fitosanitarias y zoosanitarias del
          paso fronterizo.
        </p>
      </div>

      <div className="mb-6 flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
        <span className="flex size-10 items-center justify-center rounded-lg bg-warning/20 text-warning-foreground">
          <Clock className="size-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-lg font-semibold text-foreground">{pending}</p>
          <p className="text-xs text-muted-foreground">
            Declaraciones pendientes de inspección
          </p>
        </div>
      </div>

      <section
        aria-labelledby="control-sag"
        className="rounded-xl border border-border bg-card shadow-sm"
      >
        <div className="flex items-center gap-3 border-b border-border p-5">
          <span className="flex size-10 items-center justify-center rounded-lg bg-success/15 text-success">
            <ShieldCheck className="size-5" aria-hidden="true" />
          </span>
          <h2 id="control-sag" className="text-base font-semibold text-foreground">
            Bandeja de inspección
          </h2>
        </div>

        <ul className="divide-y divide-border">
          {declarations.map((item) => (
            <DeclarationRow
              key={item.id}
              item={item}
              decision={decisions[item.id]}
              onDecide={decide}
            />
          ))}
        </ul>
      </section>
    </div>
  )
}

function DeclarationRow({
  item,
  decision,
  onDecide,
}: {
  item: Declaration
  decision: Decision
  onDecide: (id: string, decision: Decision) => void
}) {
  const Icon = item.tipo === "Mascota" ? PawPrint : Leaf
  return (
    <li className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-lg",
            item.tipo === "Mascota"
              ? "bg-chart-4/15 text-chart-4"
              : "bg-success/15 text-success",
          )}
        >
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">
            {item.id} · {item.ciudadano}
          </p>
          <p className="text-sm text-muted-foreground">{item.detalle}</p>
          <span
            className={cn(
              "mt-1 inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] font-semibold",
              item.riesgo === "Alto"
                ? "bg-destructive/15 text-destructive"
                : item.riesgo === "Medio"
                  ? "bg-warning/20 text-warning-foreground"
                  : "bg-success/15 text-success",
            )}
          >
            Riesgo {item.riesgo}
          </span>
        </div>
      </div>

      {decision === "pendiente" ? (
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => onDecide(item.id, "aprobado")}
            className="inline-flex h-9 items-center gap-1.5 rounded-md bg-success px-3 text-xs font-semibold text-success-foreground transition-colors hover:bg-success/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Check className="size-4" aria-hidden="true" />
            Aprobar
          </button>
          <button
            onClick={() => onDecide(item.id, "rechazado")}
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-destructive/40 bg-destructive/10 px-3 text-xs font-semibold text-destructive transition-colors hover:bg-destructive/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="size-4" aria-hidden="true" />
            Rechazar
          </button>
        </div>
      ) : (
        <span
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold",
            decision === "aprobado"
              ? "bg-success/15 text-success"
              : "bg-destructive/15 text-destructive",
          )}
        >
          {decision === "aprobado" ? (
            <Check className="size-4" aria-hidden="true" />
          ) : (
            <X className="size-4" aria-hidden="true" />
          )}
          {decision === "aprobado" ? "Aprobado" : "Rechazado"}
        </span>
      )}
    </li>
  )
}
