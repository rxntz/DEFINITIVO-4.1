"use client"

import { Check, Loader2, FileText, Fingerprint, Leaf, BadgeCheck, type LucideIcon } from "lucide-react"
import { tramiteSteps, currentStepIndex } from "@/lib/aduana-data"
import { cn } from "@/lib/utils"

const stepIcons: LucideIcon[] = [FileText, Fingerprint, Leaf, BadgeCheck]

export function TramiteTimeline() {
  const progress =
    (currentStepIndex / (tramiteSteps.length - 1)) * 100

  return (
    <section
      aria-labelledby="estado-tramite"
      className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6"
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2
            id="estado-tramite"
            className="text-lg font-semibold tracking-tight text-foreground"
          >
            Estado de mi Trámite
          </h2>
          <p className="text-sm text-muted-foreground">
            Folio N° 2026-CL-AR-004821 · Autorización de Menor
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-warning/20 px-3 py-1 text-xs font-semibold text-warning-foreground">
          <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
          En proceso
        </span>
      </div>

      {/* Desktop timeline (horizontal) */}
      <ol className="hidden md:block">
        <div className="relative">
          <div className="absolute left-0 right-0 top-5 h-1 rounded-full bg-border" />
          <div
            className="absolute left-0 top-5 h-1 rounded-full bg-success transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
          <div className="relative grid grid-cols-4 gap-2">
            {tramiteSteps.map((step, index) => {
              const Icon = stepIcons[index]
              const status =
                index < currentStepIndex
                  ? "completado"
                  : index === currentStepIndex
                    ? "actual"
                    : "pendiente"
              return (
                <li key={step.id} className="flex flex-col items-center text-center">
                  <span
                    className={cn(
                      "relative z-10 flex size-11 items-center justify-center rounded-full border-2 bg-card transition-colors",
                      status === "completado" &&
                        "border-success bg-success text-success-foreground",
                      status === "actual" &&
                        "border-warning bg-warning/15 text-warning-foreground",
                      status === "pendiente" &&
                        "border-border text-muted-foreground",
                    )}
                  >
                    {status === "completado" ? (
                      <Check className="size-5" aria-hidden="true" />
                    ) : status === "actual" ? (
                      <Loader2 className="size-5 animate-spin" aria-hidden="true" />
                    ) : (
                      <Icon className="size-5" aria-hidden="true" />
                    )}
                  </span>
                  <p className="mt-3 text-sm font-semibold text-foreground">
                    {step.title}
                  </p>
                  <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
                    {step.description}
                  </p>
                  {step.timestamp && (
                    <p
                      className={cn(
                        "mt-1 text-[11px] font-medium",
                        status === "actual"
                          ? "text-warning-foreground"
                          : "text-muted-foreground/80",
                      )}
                    >
                      {step.timestamp}
                    </p>
                  )}
                </li>
              )
            })}
          </div>
        </div>
      </ol>

      {/* Mobile timeline (vertical) */}
      <ol className="space-y-0 md:hidden">
        {tramiteSteps.map((step, index) => {
          const Icon = stepIcons[index]
          const status =
            index < currentStepIndex
              ? "completado"
              : index === currentStepIndex
                ? "actual"
                : "pendiente"
          const isLast = index === tramiteSteps.length - 1
          return (
            <li key={step.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    "flex size-10 items-center justify-center rounded-full border-2 bg-card",
                    status === "completado" &&
                      "border-success bg-success text-success-foreground",
                    status === "actual" &&
                      "border-warning bg-warning/15 text-warning-foreground",
                    status === "pendiente" && "border-border text-muted-foreground",
                  )}
                >
                  {status === "completado" ? (
                    <Check className="size-5" aria-hidden="true" />
                  ) : status === "actual" ? (
                    <Loader2 className="size-5 animate-spin" aria-hidden="true" />
                  ) : (
                    <Icon className="size-5" aria-hidden="true" />
                  )}
                </span>
                {!isLast && (
                  <span
                    className={cn(
                      "my-1 w-0.5 flex-1",
                      index < currentStepIndex ? "bg-success" : "bg-border",
                    )}
                  />
                )}
              </div>
              <div className={cn("pb-6", isLast && "pb-0")}>
                <p className="text-sm font-semibold text-foreground">
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
                {step.timestamp && (
                  <p className="mt-0.5 text-[11px] font-medium text-muted-foreground/80">
                    {step.timestamp}
                  </p>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
