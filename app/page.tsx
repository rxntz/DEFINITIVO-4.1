"use client"

import { useState } from "react"
import type { View, Role } from "@/lib/aduana-data"
import { Login } from "@/components/aduana/login"
import { SiteHeader } from "@/components/aduana/site-header"
import { Dashboard } from "@/components/aduana/dashboard"
import { DashboardFuncionario } from "@/components/aduana/dashboard-funcionario"
import { DashboardSag } from "@/components/aduana/dashboard-sag"
import { DashboardAdmin } from "@/components/aduana/dashboard-admin"
import { FormMenores } from "@/components/aduana/form-menores"
import { FormVehiculos } from "@/components/aduana/form-vehiculos"
import { FormAlimentos } from "@/components/aduana/form-alimentos"

export default function Page() {
  const [role, setRole] = useState<Role | null>(null)
  const [view, setView] = useState<View>("dashboard")

  const goHome = () => setView("dashboard")

  function handleLogin(nextRole: Role) {
    setRole(nextRole)
    setView("dashboard")
  }

  function handleLogout() {
    setRole(null)
    setView("dashboard")
  }

  // Sin sesión → pantalla de login
  if (!role) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader role={role} onHome={goHome} onLogout={handleLogout} />
      <main>
        {/* Formularios compartidos */}
        {view === "menores" && <FormMenores onBack={goHome} />}
        {view === "vehiculos" && <FormVehiculos onBack={goHome} />}
        {view === "alimentos" && <FormAlimentos onBack={goHome} />}

        {/* Dashboards por actor */}
        {view === "dashboard" && role === "usuario" && (
          <Dashboard onSelect={setView} />
        )}
        {view === "dashboard" && role === "funcionario" && (
          <DashboardFuncionario onSelect={setView} />
        )}
        {view === "dashboard" && role === "sag" && <DashboardSag />}
        {view === "dashboard" && role === "admin" && <DashboardAdmin />}
      </main>
      <footer className="border-t border-border py-6">
        <div className="mx-auto max-w-7xl px-4 text-center text-xs text-muted-foreground sm:px-6">
          Aduana 4.0 · Prototipo funcional · Gobierno de Chile — República
          Argentina · Tiempos de respuesta simulados &lt; 2 s
        </div>
      </footer>
    </div>
  )
}
