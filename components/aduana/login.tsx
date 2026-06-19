"use client"

import { useState } from "react"
import {
  ShieldCheck,
  Globe2,
  UserRound,
  Building2,
  Leaf,
  Settings2,
  Lock,
  Loader2,
  LogIn,
  type LucideIcon,
} from "lucide-react"
import { roles, type Role, getRole } from "@/lib/aduana-data"
import { cn } from "@/lib/utils"

const roleIcons: Record<Role, LucideIcon> = {
  usuario: UserRound,
  funcionario: Building2,
  sag: Leaf,
  admin: Settings2,
}

export function Login({ onLogin }: { onLogin: (role: Role) => void }) {
  const [selected, setSelected] = useState<Role>("usuario")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const current = getRole(selected)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    // Simula autenticación (< 2 s)
    setTimeout(() => {
      setLoading(false)
      onLogin(selected)
    }, 900)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Franja institucional superior */}
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3 sm:px-6">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary-foreground/15">
            <ShieldCheck className="size-5" aria-hidden="true" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-tight">Aduana 4.0</p>
            <p className="flex items-center gap-1 text-[11px] text-primary-foreground/80">
              <Globe2 className="size-3" aria-hidden="true" />
              Paso Fronterizo Chile–Argentina
            </p>
          </div>
        </div>
      </div>

      <main className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <h1 className="text-balance text-2xl font-semibold tracking-tight text-foreground">
              Acceso al portal
            </h1>
            <p className="mt-1 text-pretty text-sm text-muted-foreground">
              Selecciona tu perfil de ingreso e identifícate para continuar.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6"
          >
            {/* Selector de perfil */}
            <fieldset className="mb-5">
              <legend className="mb-2 text-sm font-medium text-foreground">
                Perfil de ingreso
              </legend>
              <div className="grid grid-cols-2 gap-2.5">
                {roles.map((role) => {
                  const Icon = roleIcons[role.id]
                  const active = selected === role.id
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelected(role.id)}
                      aria-pressed={active}
                      className={cn(
                        "flex flex-col items-start gap-2 rounded-xl border p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        active
                          ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                          : "border-border bg-card hover:border-primary/40 hover:bg-secondary/40",
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-9 items-center justify-center rounded-lg",
                          role.accent,
                        )}
                      >
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="text-sm font-semibold leading-tight text-foreground">
                        {role.label}
                      </span>
                    </button>
                  )
                })}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {current.description}
              </p>
            </fieldset>

            {/* Credenciales */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="login-user"
                  className="text-sm font-medium text-foreground"
                >
                  Usuario / RUT
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <UserRound className="size-4" aria-hidden="true" />
                  </span>
                  <input
                    id="login-user"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={current.demoUser}
                    autoComplete="username"
                    className="h-11 w-full rounded-md border border-input bg-card pl-9 pr-3 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="login-pass"
                  className="text-sm font-medium text-foreground"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Lock className="size-4" aria-hidden="true" />
                  </span>
                  <input
                    id="login-pass"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="h-11 w-full rounded-md border border-input bg-card pl-9 pr-3 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Verificando identidad…
                </>
              ) : (
                <>
                  <LogIn className="size-4" aria-hidden="true" />
                  Ingresar como {current.shortLabel}
                </>
              )}
            </button>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Prototipo de demostración · No se requieren credenciales reales.
            </p>
          </form>
        </div>
      </main>

      <footer className="border-t border-border py-5">
        <p className="px-4 text-center text-xs text-muted-foreground">
          Aduana 4.0 · Gobierno de Chile — República Argentina
        </p>
      </footer>
    </div>
  )
}
