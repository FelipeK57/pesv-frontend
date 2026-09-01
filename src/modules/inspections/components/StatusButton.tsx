import { cn } from "@/lib/utils"

interface StatusButtonProps {
  label: string
  active: boolean
  tone: "pass" | "fail"
  onClick: () => void
}

export function StatusButton({
  label,
  active,
  tone,
  onClick,
}: StatusButtonProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={cn(
        "h-8 rounded-lg border px-3 text-sm font-medium transition-colors outline-none",
        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
        !active && "border-input text-muted-foreground hover:bg-muted/50",
        active &&
          tone === "pass" &&
          "border-emerald-600 bg-emerald-600/10 text-emerald-700 dark:text-emerald-400",
        active &&
          tone === "fail" &&
          "border-destructive bg-destructive/10 text-destructive"
      )}
    >
      {label}
    </button>
  )
}
