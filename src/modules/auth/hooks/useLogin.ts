import { useMutation } from "@tanstack/react-query"
import { AuthService } from "../services/auth.service"
import type { LoginInput } from "../schemas/auth.schemas"

export function useLogin() {
  const authService = new AuthService()
  return useMutation({
    mutationFn: (data: LoginInput) =>
      authService.login(data.email, data.password),
  })
}
