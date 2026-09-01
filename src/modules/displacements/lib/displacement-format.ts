/** El backend devuelve `LocalTime` como "HH:mm" o "HH:mm:ss": mostramos "HH:mm". */
export function formatTime(value?: string | null) {
  if (!value) return "—"
  return value.slice(0, 5)
}

/** Valor para un `<input type="time">`, que solo acepta "HH:mm". */
export function toTimeInput(value?: string | null) {
  return value ? value.slice(0, 5) : ""
}
