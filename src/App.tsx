import { QueryProvider } from "./providers/QueryProvider"
import { Router } from "./router"
import { Toaster } from "@/components/ui/toast"

export function App() {
  return (
    <QueryProvider>
      <Router />
      <Toaster />
    </QueryProvider>
  )
}

export default App
