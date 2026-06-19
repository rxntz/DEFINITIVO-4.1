// Validación de RUT/RUN chileno con dígito verificador (módulo 11)
export function cleanRut(rut: string): string {
  return rut.replace(/[^0-9kK]/g, "").toUpperCase()
}

export function formatRut(rut: string): string {
  const clean = cleanRut(rut)
  if (clean.length < 2) return clean
  const body = clean.slice(0, -1)
  const dv = clean.slice(-1)
  const withDots = body.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  return `${withDots}-${dv}`
}

export function isValidRut(rut: string): boolean {
  const clean = cleanRut(rut)
  if (clean.length < 7 || clean.length > 9) return false
  const body = clean.slice(0, -1)
  const dv = clean.slice(-1)
  if (!/^\d+$/.test(body)) return false

  let sum = 0
  let multiplier = 2
  for (let i = body.length - 1; i >= 0; i--) {
    sum += Number.parseInt(body[i], 10) * multiplier
    multiplier = multiplier === 7 ? 2 : multiplier + 1
  }
  const remainder = 11 - (sum % 11)
  const expected = remainder === 11 ? "0" : remainder === 10 ? "K" : String(remainder)
  return dv === expected
}

// Validación de patente chilena: formato antiguo (AA1234) o nuevo (AABB12 / BBBB12)
export function formatPatente(value: string): string {
  return value
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase()
    .slice(0, 6)
}

export function isValidPatente(value: string): boolean {
  const clean = formatPatente(value)
  // Formato nuevo: 4 letras + 2 números (BBBB99)
  // Formato antiguo: 2 letras + 4 números (AA9999)
  return /^[A-Z]{4}\d{2}$/.test(clean) || /^[A-Z]{2}\d{4}$/.test(clean)
}
