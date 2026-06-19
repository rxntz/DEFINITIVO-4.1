"use client"

import { useState } from "react"
import {
  Car,
  ArrowRight,
  Search,
  FileCheck2,
  Loader2,
  CheckCircle2,
  XCircle,
} from "lucide-react"
import type { View } from "@/lib/aduana-data"
import { documentRegistry } from "@/lib/aduana-data"
import { cn } from "@/lib/utils"

type Result =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "found"; tipo: string; titular: string; estado: string }
  | { state: "notfound" }

export function DashboardFuncionario({
  onSelect,
}: {
  onSelect: (view: View) => void
}) {
  const [query, setQuery] = useState("")
  const [result, setResult] = useState<Result>({ state: "idle" })

  function handleValidate(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    setResult({ state: "loading" })
    setTimeout(() => {
      const match = documentRegistry.find(
        (d) => d.id.toLowerCase() === query.trim().toLowerCase(),
      )
      if (match) {
        setResult({
          state: "found",
          tipo: match.tipo,
          titular: match.titular,
          estado: match.estado,
        })
      } else {
        setResult({ state: "notfound" })
      }
    }, 900)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
      <div className="mb-6">
        <p className="text-sm font-medium text-primary">Funcionario de Aduana</p>
        <h1 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Estación de control fronterizo
        </h1>
        <p className="mt-1 max-w-2xl text-pretty text-sm text-muted-foreground">
          Registra vehículos y valida la documentación de los viajeros en
          tiempo real.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Registrar vehículos */}
        <button
          onClick={() => onSelect("vehiculos")}
          className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:col-span-1"
        >
          <span className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Car className="size-6" aria-hidden="true" />
          </span>
          <h3 className="mt-4 text-base font-semibold text-foreground">
            Registrar vehículos
          </h3>
          <p className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">
            Ingresa patente y propietario para autorizar el cruce.
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
            Abrir registro
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </button>

        {/* Validar documentos */}
        <section
          aria-labelledby="validar-docs"
          className="rounded-xl border border-border bg-card p-5 shadow-sm lg:col-span-2"
        >
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-chart-4/15 text-chart-4">
              <FileCheck2 className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h2
                id="validar-docs"
                className="text-base font-semibold text-foreground"
              >
                Validar documentos
              </h2>
              <p className="text-sm text-muted-foreground">
                Verifica un documento por su N.º / ID.
              </p>
            </div>
          </div>

          <form onSubmit={handleValidate} className="mt-4 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Search className="size-4" aria-hidden="true" />
              </span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="N.º / ID de documento (ej. DOC-2041)"
                aria-label="N.º / ID de documento"
                className="h-11 w-full rounded-md border border-input bg-card pl-9 pr-3 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <button
              type="submit"
              disabled={result.state === "loading"}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-70"
            >
              {result.state === "loading" ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Validando…
                </>
              ) : (
                "Validar"
              )}
            </button>
          </form>

          {result.state === "found" && (
            <div className="mt-4 flex items-start gap-3 rounded-lg border border-success/40 bg-success/10 p-4">
              <CheckCircle2 className="size-5 shrink-0 text-success" aria-hidden="true" />
              <div className="text-sm">
                <p className="font-semibold text-foreground">
                  Documento válido · {result.estado}
                </p>
                <p className="text-muted-foreground">
                  {result.tipo} — Titular: {result.titular}. Verificado con
                  PDI / Migraciones.
                </p>
              </div>
            </div>
          )}
          {result.state === "notfound" && (
            <div className="mt-4 flex items-start gap-3 rounded-lg border border-destructive/40 bg-destructive/10 p-4">
              <XCircle className="size-5 shrink-0 text-destructive" aria-hidden="true" />
              <div className="text-sm">
                <p className="font-semibold text-foreground">
                  Documento no encontrado
                </p>
                <p className="text-muted-foreground">
                  Revisa el N.º / ID ingresado. Documentos de prueba: DOC-2041,
                  DOC-1180, DOC-9920.
                </p>
              </div>
            </div>
          )}

          <div className="mt-5">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Documentos recientes
            </p>
            <ul className="divide-y divide-border rounded-lg border border-border">
              {documentRegistry.map((doc) => (
                <li
                  key={doc.id}
                  className="flex items-center justify-between gap-3 px-3 py-2.5 text-sm"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-foreground">
                      {doc.id} · {doc.tipo}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {doc.titular}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 rounded px-2 py-0.5 text-[11px] font-semibold",
                      doc.estado === "Vigente"
                        ? "bg-success/15 text-success"
                        : doc.estado === "Pendiente"
                          ? "bg-warning/20 text-warning-foreground"
                          : "bg-destructive/15 text-destructive",
                    )}
                  >
                    {doc.estado}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
