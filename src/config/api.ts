import axios, { AxiosError } from "axios"

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
      localStorage.removeItem("token")
    }

    return Promise.reject(error)
  }
)

export default api
