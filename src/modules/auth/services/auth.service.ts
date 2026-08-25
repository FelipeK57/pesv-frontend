import api from "@/config/api"

export class AuthService {
  async login(email: string, password: string): Promise<string> {
    try {
      const response = await api.post("/auth/login", { email, password })
      const token = response.data.token
      localStorage.setItem("token", token)
      return token
    } catch (error) {
      throw new Error("Error al iniciar sesión")
    }
  }
}
