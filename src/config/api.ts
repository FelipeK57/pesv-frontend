import axios, { AxiosError } from "axios"
import { useAuthStore } from "@/modules/auth/store/auth.store"

const baseURL = import.meta.env.VITE_API_URL

if (!baseURL) {
  throw new Error("VITE_API_URL no está definida en el archivo .env")
}

export const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token rechazado por el backend: limpiamos también el store para que
      // ProtectedLayout redirija al login en la siguiente navegación.
      useAuthStore.getState().logout()
    }

    return Promise.reject(error)
  }
)

export default api
