"use client"

import type { ReactNode } from "react"
import { ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react"

export function FormPage({
  title,
  subtitle,
  icon,
  onBack,
  children,
}: {
  title: string
  subtitle: string
  icon: ReactNode
  onBack: () => void
  children: ReactNode
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:py-8">
      <button
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Volver al inicio
      </button>

      <div className="mb-6 flex items-start gap-3">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </span>
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      {children}
    </div>
  )
}

export function SuccessModal({
  open,
  onClose,
  message,
}: {
  open: boolean
  onClose: () => void
  message: string
}) {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-title"
    >
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 text-center shadow-xl">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-success/15">
          <CheckCircle2 className="size-9 text-success" aria-hidden="true" />
        </div>
        <h2
          id="success-title"
          className="mt-4 text-lg font-semibold text-foreground"
        >
          Registro Exitoso
        </h2>
        <p className="mt-1.5 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
          <ShieldCheck className="size-4 text-success" aria-hidden="true" />
          {message}
        </p>
        <button
          onClick={onClose}
          className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Entendido
        </button>
      </div>
    </div>
  )
}
