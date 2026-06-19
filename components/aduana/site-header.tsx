"use client"

import { ShieldCheck, Globe2, UserRound, RefreshCw } from "lucide-react"
import { systemStatuses, getRole } from "@/lib/aduana-data"
import type { View, Role } from "@/lib/aduana-data"
import { cn } from "@/lib/utils"

function StatusIndicator({
  label,
  detail,
  online,
}: {
  label: string
  detail: string
  online: boolean
}) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-primary-foreground/15 bg-primary-foreground/5 px-3 py-1.5">
      <span className="relative flex size-2.5 shrink-0" aria-hidden="true">
        <span
          className={cn(
            "absolute inline-flex size-full animate-ping rounded-full opacity-60",
            online ? "bg-success" : "bg-destructive",
          )}
        />
        <span
          className={cn(
            "relative inline-flex size-2.5 rounded-full",
            online ? "bg-success" : "bg-destructive",
          )}
        />
      </span>
      <div className="leading-tight">
        <p className="text-xs font-medium text-primary-foreground">{label}</p>
        <p className="text-[11px] text-primary-foreground/70">{detail}</p>
      </div>
      <span
        className={cn(
          "ml-1 rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wide",
          online
            ? "bg-success/20 text-success"
            : "bg-destructive/20 text-destructive",
        )}
      >
        {online ? "ONLINE" : "OFFLINE"}
      </span>
    </div>
  )
}

export function SiteHeader({
  role,
  onHome,
  onLogout,
}: {
  role: Role
  onHome: () => void
  onLogout: () => void
}) {
  const info = getRole(role)

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={onHome}
            className="flex items-center gap-3 rounded-md text-left outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/60"
          >
            <span className="flex size-10 items-center justify-center rounded-lg bg-primary-foreground/15">
              <ShieldCheck className="size-6" aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className="block text-base font-semibold tracking-tight">
                Aduana 4.0
              </span>
              <span className="flex items-center gap-1 text-xs text-primary-foreground/80">
                <Globe2 className="size-3.5" aria-hidden="true" />
                Paso Fronterizo Chile–Argentina
              </span>
            </span>
          </button>

          <button
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary-foreground/15 px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-primary-foreground/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/60 lg:hidden"
          >
            <RefreshCw className="size-3.5" aria-hidden="true" />
            Cambiar de cuenta
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {systemStatuses.map((status) => (
            <StatusIndicator
              key={status.id}
              label={status.label}
              detail={status.detail}
              online={status.online}
            />
          ))}

          <div className="ml-1 flex items-center gap-2 rounded-full bg-primary-foreground/10 py-1 pl-1 pr-3">
            <span className="flex size-7 items-center justify-center rounded-full bg-primary-foreground/20">
              <UserRound className="size-4" aria-hidden="true" />
            </span>
            <div className="leading-tight">
              <p className="text-xs font-medium">{info.label}</p>
              <p className="text-[10px] text-primary-foreground/70">
                Sesión activa
              </p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="hidden items-center gap-1.5 rounded-md bg-primary-foreground/15 px-3 py-2 text-xs font-semibold transition-colors hover:bg-primary-foreground/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/60 lg:inline-flex"
          >
            <RefreshCw className="size-3.5" aria-hidden="true" />
            Cambiar de cuenta
          </button>
        </div>
      </div>
    </header>
  )
}

// Re-export type for convenience
export type { View }
