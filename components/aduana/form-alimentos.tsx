"use client"

import { useState } from "react"
import { Leaf, Loader2, ShieldCheck, IdCard } from "lucide-react"
import { TextField, SelectField } from "./form-fields"
import { FormPage, SuccessModal } from "./form-page"
import { formatRut, isValidRut } from "@/lib/validators"
import { cn } from "@/lib/utils"

export function FormAlimentos({ onBack }: { onBack: () => void }) {
  const [rut, setRut] = useState("")
  const [categoria, setCategoria] = useState("")
  const [detalle, setDetalle] = useState("")
  const [mascota, setMascota] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const rutValid = isValidRut(rut)

  const errors = {
    rut: submitted && !rutValid ? "Ingresa un RUT válido." : undefined,
    categoria: submitted && !categoria ? "Selecciona una categoría." : undefined,
    detalle: submitted && !detalle.trim() ? "Describe lo que transportas." : undefined,
  }

  const isValid = rutValid && categoria && detalle.trim()

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
      title="Declarar Alimentos y Mascotas"
      subtitle="Control fitosanitario y zoosanitario SAG."
      icon={<Leaf className="size-6" aria-hidden="true" />}
      onBack={onBack}
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            id="rut-declarante"
            label="RUT del declarante"
            value={rut}
            onChange={(v) => setRut(formatRut(v))}
            placeholder="12.345.678-9"
            icon={<IdCard className="size-4" aria-hidden="true" />}
            required
            error={errors.rut}
            valid={submitted && rutValid}
          />
          <SelectField
            id="categoria"
            label="Categoría a declarar"
            value={categoria}
            onChange={setCategoria}
            required
            error={errors.categoria}
            valid={submitted && Boolean(categoria)}
            options={[
              { value: "frutas", label: "Frutas y verduras" },
              { value: "carnes", label: "Carnes y lácteos" },
              { value: "semillas", label: "Semillas y vegetales" },
              { value: "mascota", label: "Mascota / Animal" },
              { value: "otros", label: "Otros productos" },
            ]}
          />
          <div className="sm:col-span-2">
            <TextField
              id="detalle"
              label="Detalle del producto o mascota"
              value={detalle}
              onChange={setDetalle}
              placeholder="Ej. 2 kg de manzanas / Perro raza labrador con carnet de vacunas"
              required
              error={errors.detalle}
              valid={submitted && Boolean(detalle.trim())}
            />
          </div>
          <div className="sm:col-span-2">
            <SelectField
              id="mascota"
              label="¿Viajas con mascota? (opcional)"
              value={mascota}
              onChange={setMascota}
              options={[
                { value: "no", label: "No" },
                { value: "si-vacunas", label: "Sí, con certificado de vacunas" },
                { value: "si-sin", label: "Sí, sin certificado" },
              ]}
              hint="El SAG puede solicitar el certificado zoosanitario."
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="size-4 text-success" aria-hidden="true" />
            Declaración revisada por inspección SAG.
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
        message="Declaración registrada y enviada al control SAG."
      />
    </FormPage>
  )
}
