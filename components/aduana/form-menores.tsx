"use client"

import { useState } from "react"
import { Users, Loader2, ShieldCheck, IdCard } from "lucide-react"
import { TextField, SelectField, FileField } from "./form-fields"
import { FormPage, SuccessModal } from "./form-page"
import { formatRut, isValidRut } from "@/lib/validators"
import { cn } from "@/lib/utils"

export function FormMenores({ onBack }: { onBack: () => void }) {
  const [rutMenor, setRutMenor] = useState("")
  const [rutTutor, setRutTutor] = useState("")
  const [parentesco, setParentesco] = useState("")
  const [fileName, setFileName] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const rutMenorValid = isValidRut(rutMenor)
  const rutTutorValid = isValidRut(rutTutor)

  const errors = {
    rutMenor: submitted && !rutMenorValid ? "Ingresa un RUT/RUN válido." : undefined,
    rutTutor: submitted && !rutTutorValid ? "Ingresa un RUT válido." : undefined,
    parentesco: submitted && !parentesco ? "Selecciona el parentesco." : undefined,
    file: submitted && !fileName ? "Adjunta la autorización notarial en PDF." : undefined,
  }

  const isValid = rutMenorValid && rutTutorValid && parentesco && fileName

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
      title="Autorización de Menores"
      subtitle="Registro de salida del país de menores de edad."
      icon={<Users className="size-6" aria-hidden="true" />}
      onBack={onBack}
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            id="rut-menor"
            label="RUT/RUN del menor"
            value={rutMenor}
            onChange={(v) => setRutMenor(formatRut(v))}
            placeholder="12.345.678-9"
            icon={<IdCard className="size-4" aria-hidden="true" />}
            required
            error={errors.rutMenor}
            valid={submitted && rutMenorValid}
            hint="Documento de identidad del menor."
          />
          <TextField
            id="rut-tutor"
            label="RUT del tutor responsable"
            value={rutTutor}
            onChange={(v) => setRutTutor(formatRut(v))}
            placeholder="9.876.543-2"
            icon={<IdCard className="size-4" aria-hidden="true" />}
            required
            error={errors.rutTutor}
            valid={submitted && rutTutorValid}
          />
          <SelectField
            id="parentesco"
            label="Parentesco / Relación"
            value={parentesco}
            onChange={setParentesco}
            required
            error={errors.parentesco}
            valid={submitted && Boolean(parentesco)}
            options={[
              { value: "madre", label: "Madre" },
              { value: "padre", label: "Padre" },
              { value: "tutor", label: "Tutor legal" },
              { value: "abuelo", label: "Abuelo/a" },
              { value: "otro", label: "Otro autorizado" },
            ]}
          />
          <div className="sm:col-span-2">
            <FileField
              id="autorizacion-notarial"
              label="Autorización notarial"
              fileName={fileName}
              onSelect={setFileName}
              required
              error={errors.file}
              hint="Documento firmado ante notario que autoriza la salida."
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="size-4 text-success" aria-hidden="true" />
            Validación cruzada con PDI y Registro Civil.
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
