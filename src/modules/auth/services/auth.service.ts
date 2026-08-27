import api from "@/config/api"
import { isAxiosError } from "axios"

export class AuthService {
  async login(email: string, password: string) {
    try {
      const response = await api.post("/auth/login", { email, password })
      return { token: response.data.token as string }
    } catch (error) {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message
        throw new Error(message ?? "Error al iniciar sesión", { cause: error })
      }
      throw error
    }
  }
}
