"use client"

import { useState } from "react"
import {
  Bell,
  TriangleAlert,
  Info,
  CheckCircle2,
  FileText,
  FileSpreadsheet,
  Loader2,
  Download,
  type LucideIcon,
} from "lucide-react"
import { recentAlerts } from "@/lib/aduana-data"
import type { Alert } from "@/lib/aduana-data"
import { cn } from "@/lib/utils"

const levelStyles: Record<
  Alert["level"],
  { icon: LucideIcon; wrap: string; iconColor: string }
> = {
  warning: {
    icon: TriangleAlert,
    wrap: "border-warning/40 bg-warning/10",
    iconColor: "text-warning-foreground",
  },
  info: {
    icon: Info,
    wrap: "border-primary/30 bg-primary/5",
    iconColor: "text-primary",
  },
  success: {
    icon: CheckCircle2,
    wrap: "border-success/40 bg-success/10",
    iconColor: "text-success",
  },
}

function ExportButton({
  label,
  sublabel,
  icon: Icon,
  format,
}: {
  label: string
  sublabel: string
  icon: LucideIcon
  format: string
}) {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle")

  function handleClick() {
    if (state === "loading") return
    setState("loading")
    setTimeout(() => {
      setState("done")
      setTimeout(() => setState("idle"), 1800)
    }, 1000)
  }

  return (
    <button
      onClick={handleClick}
      disabled={state === "loading"}
      aria-label={`Descargar ${format}`}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5 text-left transition-colors hover:bg-secondary disabled:opacity-80",
      )}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-secondary text-foreground">
        {state === "loading" ? (
          <Loader2 className="size-5 animate-spin" aria-hidden="true" />
        ) : state === "done" ? (
          <CheckCircle2 className="size-5 text-success" aria-hidden="true" />
        ) : (
          <Icon className="size-5" aria-hidden="true" />
        )}
      </span>
      <span className="min-w-0 flex-1 leading-tight">
        <span className="block text-sm font-medium text-foreground">
          {state === "loading"
            ? "Generando…"
            : state === "done"
              ? "Descarga lista"
              : label}
        </span>
        <span className="block text-xs text-muted-foreground">{sublabel}</span>
      </span>
      <Download className="size-4 text-muted-foreground" aria-hidden="true" />
    </button>
  )
}

export function SidebarPanel() {
  return (
    <aside className="flex flex-col gap-5">
      {/* Alertas */}
      <section
        aria-labelledby="alertas-recientes"
        className="rounded-xl border border-border bg-card p-5 shadow-sm"
      >
        <div className="mb-4 flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Bell className="size-4.5" aria-hidden="true" />
          </span>
          <h2
            id="alertas-recientes"
            className="text-base font-semibold text-foreground"
          >
            Alertas recientes
          </h2>
        </div>
        <ul className="flex flex-col gap-3">
          {recentAlerts.map((alert) => {
            const style = levelStyles[alert.level]
            const Icon = style.icon
            return (
              <li
                key={alert.id}
                className={cn("rounded-lg border p-3", style.wrap)}
              >
                <div className="flex gap-2.5">
                  <Icon
                    className={cn("mt-0.5 size-4.5 shrink-0", style.iconColor)}
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">
                      {alert.title}
                    </p>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {alert.description}
                    </p>
                    <p className="mt-1 text-[11px] font-medium text-muted-foreground/80">
                      {alert.date}
                    </p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </section>

      {/* Exportar datos */}
      <section
        aria-labelledby="exportar-datos"
        className="rounded-xl border border-border bg-card p-5 shadow-sm"
      >
        <h2
          id="exportar-datos"
          className="mb-1 text-base font-semibold text-foreground"
        >
          Exportar datos
        </h2>
        <p className="mb-4 text-xs text-muted-foreground">
          Descarga el comprobante de tus trámites registrados.
        </p>
        <div className="flex flex-col gap-2.5">
          <ExportButton
            label="Descargar PDF"
            sublabel="Comprobante oficial"
            icon={FileText}
            format="PDF"
          />
          <ExportButton
            label="Descargar Excel"
            sublabel="Detalle de registros"
            icon={FileSpreadsheet}
            format="Excel"
          />
        </div>
      </section>
    </aside>
  )
}
