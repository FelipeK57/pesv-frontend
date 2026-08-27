import { create } from "zustand"
import { jwtDecode } from "jwt-decode"
import type { AuthUser, JwtPayload } from "../types/auth.types"

const TOKEN_KEY = "token"

interface AuthState {
  token: string | null
  user: AuthUser | null
  isAuthenticated: boolean
  setToken: (token: string) => void
  checkSession: () => boolean
  logout: () => void
}

function decodeToken(token: string | null): AuthUser | null {
  if (!token) return null

  try {
    const payload = jwtDecode<JwtPayload>(token)

    // Token expirado: no lo consideramos válido
    if (payload.exp * 1000 <= Date.now()) {
      localStorage.removeItem(TOKEN_KEY)
      return null
    }

    return {
      id: payload.id,
      name: payload.name,
      lastName: payload.lastName,
      email: payload.email,
      role: payload.role,
    }
  } catch {
    localStorage.removeItem(TOKEN_KEY)
    return null
  }
}

function readStoredToken() {
  const token = localStorage.getItem(TOKEN_KEY)
  const user = decodeToken(token)
  return { token: user ? token : null, user }
}

const initial = readStoredToken()

export const useAuthStore = create<AuthState>((set) => ({
  token: initial.token,
  user: initial.user,
  isAuthenticated: Boolean(initial.user),
  setToken: (token) => {
    const user = decodeToken(token)
    if (!user) {
      set({ token: null, user: null, isAuthenticated: false })
      return
    }
    localStorage.setItem(TOKEN_KEY, token)
    set({ token, user, isAuthenticated: true })
  },
  checkSession: () => {
    const { token, user } = readStoredToken()

    set((state) =>
      state.token === token && state.user?.id === user?.id
        ? state
        : { token, user, isAuthenticated: Boolean(user) }
    )

    return Boolean(user)
  },
  logout: () => {
    localStorage.removeItem(TOKEN_KEY)
    set({ token: null, user: null, isAuthenticated: false })
  },
}))

export const useAuthUser = () => useAuthStore((state) => state.user)

/** Lectura pura: ¿hay un token en localStorage y sigue vigente? */
export function hasValidSession() {
  return Boolean(readStoredToken().user)
}
