"use client"

import { useState } from "react"
import {
  Users,
  BarChart3,
  Loader2,
  FileDown,
  CheckCircle2,
  UserCog,
} from "lucide-react"
import { managedUsers } from "@/lib/aduana-data"
import { cn } from "@/lib/utils"

export function DashboardAdmin() {
  const [reportType, setReportType] = useState("cruces")
  const [generating, setGenerating] = useState(false)
  const [ready, setReady] = useState(false)

  function generateReport() {
    setReady(false)
    setGenerating(true)
    setTimeout(() => {
      setGenerating(false)
      setReady(true)
    }, 1200)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
      <div className="mb-6">
        <p className="text-sm font-medium text-warning-foreground">
          Administrador del sistema
        </p>
        <h1 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Panel de administración
        </h1>
        <p className="mt-1 max-w-2xl text-pretty text-sm text-muted-foreground">
          Gestiona los usuarios del sistema y genera reportes operativos del
          paso fronterizo.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Gestión de usuarios */}
        <section
          aria-labelledby="gestion-usuarios"
          className="rounded-xl border border-border bg-card shadow-sm lg:col-span-2"
        >
          <div className="flex items-center justify-between gap-3 border-b border-border p-5">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Users className="size-5" aria-hidden="true" />
              </span>
              <h2
                id="gestion-usuarios"
                className="text-base font-semibold text-foreground"
              >
                Gestión de usuarios
              </h2>
            </div>
            <button className="inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <UserCog className="size-4" aria-hidden="true" />
              Nuevo usuario
            </button>
          </div>

          <ul className="divide-y divide-border">
            {managedUsers.map((user) => (
              <li
                key={user.id}
                className="flex items-center justify-between gap-3 px-5 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">
                    {user.nombre}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {user.id} · {user.rol}
                  </p>
                </div>
                <span
                  className={cn(
                    "shrink-0 rounded px-2 py-0.5 text-[11px] font-semibold",
                    user.estado === "Activo"
                      ? "bg-success/15 text-success"
                      : "bg-destructive/15 text-destructive",
                  )}
                >
                  {user.estado}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Reportes */}
        <section
          aria-labelledby="reportes"
          className="flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm lg:col-span-1"
        >
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-warning/20 text-warning-foreground">
              <BarChart3 className="size-5" aria-hidden="true" />
            </span>
            <h2 id="reportes" className="text-base font-semibold text-foreground">
              Reportes
            </h2>
          </div>

          <p className="mt-3 text-sm text-muted-foreground">
            Genera un informe consolidado de la operación fronteriza.
          </p>

          <label
            htmlFor="report-type"
            className="mt-4 mb-1.5 text-sm font-medium text-foreground"
          >
            Tipo de reporte
          </label>
          <select
            id="report-type"
            value={reportType}
            onChange={(e) => {
              setReportType(e.target.value)
              setReady(false)
            }}
            className="h-11 w-full rounded-md border border-input bg-card px-3 text-sm text-foreground shadow-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="cruces">Cruces fronterizos del día</option>
            <option value="sag">Inspecciones SAG / PDI</option>
            <option value="usuarios">Actividad de usuarios</option>
          </select>

          <button
            onClick={generateReport}
            disabled={generating}
            className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-70"
          >
            {generating ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Generando reporte…
              </>
            ) : (
              <>
                <BarChart3 className="size-4" aria-hidden="true" />
                Generar Reporte
              </>
            )}
          </button>

          {ready && (
            <div className="mt-4 flex items-center gap-3 rounded-lg border border-success/40 bg-success/10 p-3">
              <CheckCircle2 className="size-5 shrink-0 text-success" aria-hidden="true" />
              <div className="min-w-0 flex-1 text-sm">
                <p className="font-semibold text-foreground">Reporte listo</p>
                <p className="truncate text-xs text-muted-foreground">
                  reporte-{reportType}-2026.pdf
                </p>
              </div>
              <button className="inline-flex size-9 shrink-0 items-center justify-center rounded-md bg-card text-primary transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <FileDown className="size-5" aria-hidden="true" />
                <span className="sr-only">Descargar reporte</span>
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
