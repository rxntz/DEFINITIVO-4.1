"use client"

import { useState } from "react"
import { Car, Loader2, ShieldCheck, IdCard, Hash } from "lucide-react"
import { TextField, SelectField, FileField } from "./form-fields"
import { FormPage, SuccessModal } from "./form-page"
import { formatRut, isValidRut, formatPatente, isValidPatente } from "@/lib/validators"
import { cn } from "@/lib/utils"

export function FormVehiculos({ onBack }: { onBack: () => void }) {
  const [patente, setPatente] = useState("")
  const [rutPropietario, setRutPropietario] = useState("")
  const [tipo, setTipo] = useState("")
  const [fileName, setFileName] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const patenteValid = isValidPatente(patente)
  const rutValid = isValidRut(rutPropietario)

  const errors = {
    patente: submitted && !patenteValid ? "Patente inválida (ej. KLXR42 o AB1234)." : undefined,
    rut: submitted && !rutValid ? "Ingresa un RUT válido." : undefined,
    tipo: submitted && !tipo ? "Selecciona el tipo de vehículo." : undefined,
    file: submitted && !fileName ? "Adjunta el padrón / permiso de circulación." : undefined,
  }

  const isValid = patenteValid && rutValid && tipo && fileName

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    if (!isValid) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
    }, 1000)
  }

  return (
    <FormPage
      title="Registro de Vehículos"
      subtitle="Declara tu vehículo para el cruce fronterizo."
      icon={<Car className="size-6" aria-hidden="true" />}
      onBack={onBack}
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            id="patente"
            label="Patente del vehículo"
            value={patente}
            onChange={(v) => setPatente(formatPatente(v))}
            placeholder="KLXR42"
            icon={<Hash className="size-4" aria-hidden="true" />}
            required
            error={errors.patente}
            valid={submitted && patenteValid}
            hint="Formato chileno, sin guiones ni espacios."
          />
          <TextField
            id="rut-propietario"
            label="RUT del propietario"
            value={rutPropietario}
            onChange={(v) => setRutPropietario(formatRut(v))}
            placeholder="12.345.678-9"
            icon={<IdCard className="size-4" aria-hidden="true" />}
            required
            error={errors.rut}
            valid={submitted && rutValid}
          />
          <SelectField
            id="tipo-vehiculo"
            label="Tipo de vehículo"
            value={tipo}
            onChange={setTipo}
            required
            error={errors.tipo}
            valid={submitted && Boolean(tipo)}
            options={[
              { value: "auto", label: "Automóvil" },
              { value: "suv", label: "SUV / Camioneta" },
              { value: "moto", label: "Motocicleta" },
              { value: "bus", label: "Bus / Transporte" },
              { value: "carga", label: "Vehículo de carga" },
            ]}
          />
          <div className="sm:col-span-2">
            <FileField
              id="padron"
              label="Padrón / Permiso de circulación"
              fileName={fileName}
              onSelect={setFileName}
              required
              error={errors.file}
              hint="Documento que acredita la propiedad del vehículo."
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="size-4 text-success" aria-hidden="true" />
            Verificación con Registro Civil e Identificación.
          </p>
          <button
            type="submit"
            disabled={loading}
            className={cn(
              "inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-80",
            )}
          >
            {loading && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
            {loading ? "Validando…" : "Validar y Registrar"}
          </button>
        </div>
      </form>

      <SuccessModal
        open={success}
        onClose={() => {
          setSuccess(false)
          onBack()
        }}
        message="Validado correctamente con PDI/Migraciones."
      />
    </FormPage>
  )
}
