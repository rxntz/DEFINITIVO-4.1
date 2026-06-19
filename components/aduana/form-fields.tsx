"use client"

import type { ReactNode } from "react"
import { AlertCircle, Check, Upload } from "lucide-react"
import { cn } from "@/lib/utils"

interface FieldShellProps {
  id: string
  label: string
  hint?: string
  error?: string
  valid?: boolean
  required?: boolean
  icon?: ReactNode
  children: ReactNode
}

export function FieldShell({
  id,
  label,
  hint,
  error,
  valid,
  required,
  children,
}: FieldShellProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="flex items-center gap-1 text-sm font-medium text-foreground"
      >
        {label}
        {required && <span className="text-destructive">*</span>}
      </label>
      {children}
      {error ? (
        <p className="flex items-center gap-1 text-xs font-medium text-destructive">
          <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : valid ? (
        <p className="flex items-center gap-1 text-xs font-medium text-success">
          <Check className="size-3.5 shrink-0" aria-hidden="true" />
          Dato válido
        </p>
      ) : hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  )
}

interface TextFieldProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  hint?: string
  error?: string
  valid?: boolean
  required?: boolean
  icon?: ReactNode
  inputMode?: "text" | "numeric"
}

export function TextField({
  id,
  label,
  value,
  onChange,
  placeholder,
  hint,
  error,
  valid,
  required,
  icon,
  inputMode = "text",
}: TextFieldProps) {
  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      valid={valid}
      required={required}
    >
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </span>
        )}
        <input
          id={id}
          name={id}
          value={value}
          inputMode={inputMode}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          className={cn(
            "h-11 w-full rounded-md border bg-card px-3 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground/70",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring",
            icon && "pl-9",
            error
              ? "border-destructive focus-visible:ring-destructive/40"
              : valid
                ? "border-success/60"
                : "border-input",
          )}
        />
      </div>
    </FieldShell>
  )
}

interface SelectFieldProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  hint?: string
  error?: string
  valid?: boolean
  required?: boolean
}

export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  hint,
  error,
  valid,
  required,
}: SelectFieldProps) {
  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      valid={valid}
      required={required}
    >
      <select
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        className={cn(
          "h-11 w-full rounded-md border bg-card px-3 text-sm text-foreground shadow-sm outline-none transition-colors",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring",
          error ? "border-destructive" : valid ? "border-success/60" : "border-input",
        )}
      >
        <option value="" disabled>
          Selecciona una opción
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FieldShell>
  )
}

interface FileFieldProps {
  id: string
  label: string
  fileName: string | null
  onSelect: (fileName: string | null) => void
  hint?: string
  error?: string
  required?: boolean
}

export function FileField({
  id,
  label,
  fileName,
  onSelect,
  hint,
  error,
  required,
}: FileFieldProps) {
  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      valid={Boolean(fileName)}
      required={required}
    >
      <label
        htmlFor={id}
        className={cn(
          "flex cursor-pointer items-center gap-3 rounded-md border border-dashed bg-secondary/40 px-3 py-3 text-sm transition-colors hover:bg-secondary",
          error ? "border-destructive" : fileName ? "border-success/60" : "border-input",
        )}
      >
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-md",
            fileName ? "bg-success/15 text-success" : "bg-primary/10 text-primary",
          )}
        >
          {fileName ? (
            <Check className="size-5" aria-hidden="true" />
          ) : (
            <Upload className="size-5" aria-hidden="true" />
          )}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-medium text-foreground">
            {fileName ?? "Adjuntar documento PDF"}
          </span>
          <span className="block text-xs text-muted-foreground">
            {fileName ? "Archivo cargado correctamente" : "Formato PDF · máx. 10 MB"}
          </span>
        </span>
        <input
          id={id}
          name={id}
          type="file"
          accept="application/pdf"
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0]
            onSelect(file ? file.name : null)
          }}
        />
      </label>
    </FieldShell>
  )
}
