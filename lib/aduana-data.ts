export type View = "dashboard" | "menores" | "vehiculos" | "alimentos"

export type Role = "usuario" | "funcionario" | "sag" | "admin"

export interface RoleInfo {
  id: Role
  label: string
  shortLabel: string
  description: string
  /** Tailwind classes for the icon chip background/text */
  accent: string
  /** Demo credential shown as placeholder */
  demoUser: string
}

export const roles: RoleInfo[] = [
  {
    id: "usuario",
    label: "Usuario General",
    shortLabel: "Ciudadano",
    description: "Registra cruces y consulta el estado de tus trámites.",
    accent: "bg-primary/10 text-primary",
    demoUser: "12.345.678-9",
  },
  {
    id: "funcionario",
    label: "Funcionario de Aduana",
    shortLabel: "Aduana",
    description: "Registra vehículos y valida documentación en frontera.",
    accent: "bg-chart-4/15 text-chart-4",
    demoUser: "FUNC-2041",
  },
  {
    id: "sag",
    label: "SAG / PDI",
    shortLabel: "SAG / PDI",
    description: "Control fitosanitario, zoosanitario y migratorio.",
    accent: "bg-success/15 text-success",
    demoUser: "SAG-0875",
  },
  {
    id: "admin",
    label: "Administrador",
    shortLabel: "Administrador",
    description: "Gestión de usuarios y generación de reportes.",
    accent: "bg-warning/20 text-warning-foreground",
    demoUser: "ADMIN-001",
  },
]

export function getRole(id: Role): RoleInfo {
  return roles.find((r) => r.id === id) ?? roles[0]
}

// ---- Datos de demostración para paneles internos ----

export interface DocumentRecord {
  id: string
  tipo: string
  titular: string
  estado: "Vigente" | "Pendiente" | "Rechazado"
}

export const documentRegistry: DocumentRecord[] = [
  { id: "DOC-2041", tipo: "Autorización de menor", titular: "Benjamín Soto", estado: "Vigente" },
  { id: "DOC-1180", tipo: "Registro de vehículo", titular: "Camila Rojas", estado: "Vigente" },
  { id: "DOC-9920", tipo: "Declaración SAG", titular: "Marta Fuentes", estado: "Pendiente" },
]

export interface Declaration {
  id: string
  ciudadano: string
  tipo: "Alimentos" | "Mascota"
  detalle: string
  riesgo: "Bajo" | "Medio" | "Alto"
}

export const declarations: Declaration[] = [
  { id: "SAG-501", ciudadano: "Camila Rojas", tipo: "Alimentos", detalle: "Frutas y lácteos sellados", riesgo: "Medio" },
  { id: "SAG-502", ciudadano: "Diego Pérez", tipo: "Mascota", detalle: "Canino con carnet sanitario", riesgo: "Bajo" },
  { id: "SAG-503", ciudadano: "Lucía Vera", tipo: "Alimentos", detalle: "Carne sin refrigerar", riesgo: "Alto" },
  { id: "SAG-504", ciudadano: "Marta Fuentes", tipo: "Mascota", detalle: "Felino sin vacuna antirrábica", riesgo: "Alto" },
]

export interface ManagedUser {
  id: string
  nombre: string
  rol: string
  estado: "Activo" | "Suspendido"
}

export const managedUsers: ManagedUser[] = [
  { id: "U-001", nombre: "Camila Rojas", rol: "Usuario General", estado: "Activo" },
  { id: "U-014", nombre: "Pedro Navia", rol: "Funcionario de Aduana", estado: "Activo" },
  { id: "U-027", nombre: "Inés Cárcamo", rol: "SAG / PDI", estado: "Activo" },
  { id: "U-033", nombre: "Raúl Méndez", rol: "Funcionario de Aduana", estado: "Suspendido" },
]

export type TramiteStepStatus = "completado" | "actual" | "pendiente"

export interface TramiteStep {
  id: string
  title: string
  description: string
  timestamp?: string
}

export interface SystemStatus {
  id: string
  label: string
  online: boolean
  detail: string
}

export interface Alert {
  id: string
  level: "warning" | "info" | "success"
  title: string
  description: string
  date: string
}

export const systemStatuses: SystemStatus[] = [
  {
    id: "frontera",
    label: "Conexión Chile–Argentina",
    online: true,
    detail: "Paso Los Libertadores",
  },
  {
    id: "sag-pdi",
    label: "Control SAG / PDI",
    online: true,
    detail: "Validación en línea",
  },
  {
    id: "migraciones",
    label: "Migraciones",
    online: true,
    detail: "Registro Civil e Identificación",
  },
]

export const tramiteSteps: TramiteStep[] = [
  {
    id: "formulario",
    title: "Formulario Enviado",
    description: "Declaración recibida en la plataforma",
    timestamp: "Hoy · 09:42",
  },
  {
    id: "pdi",
    title: "Validación PDI",
    description: "Verificación de identidad y migraciones",
    timestamp: "Hoy · 09:43",
  },
  {
    id: "sag",
    title: "Inspección SAG",
    description: "Revisión fitosanitaria y zoosanitaria",
    timestamp: "En proceso",
  },
  {
    id: "aprobado",
    title: "Aprobado",
    description: "Autorización de cruce emitida",
  },
]

// Índice del paso actualmente en curso (0-based)
export const currentStepIndex = 2

export const recentAlerts: Alert[] = [
  {
    id: "a1",
    level: "warning",
    title: "Permiso próximo a vencer",
    description: "Tu autorización de menor vence en 5 días.",
    date: "18 jun 2026",
  },
  {
    id: "a2",
    level: "info",
    title: "Inspección SAG pendiente",
    description: "Presenta tus alimentos declarados en ventanilla 3.",
    date: "18 jun 2026",
  },
  {
    id: "a3",
    level: "success",
    title: "Vehículo validado",
    description: "Patente KLXR-42 verificada con Registro Civil.",
    date: "17 jun 2026",
  },
]
