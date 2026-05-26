import { toast } from "sonner"

export type ErrorSeverity = "error" | "warning" | "info"

export class AppError extends Error {
  severity: ErrorSeverity
  context?: string

  constructor(message: string, severity: ErrorSeverity = "error", context?: string) {
    super(message)
    this.severity = severity
    this.context = context
  }
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof AppError) return error.message
  if (error instanceof Error) return error.message
  if (typeof error === "string") return error
  return "An unexpected error occurred"
}

export function showErrorToast(error: unknown, fallback?: string) {
  const message = getErrorMessage(error) || fallback || "An unexpected error occurred"
  toast.error(message)
}

export function showNetworkError(message?: string) {
  toast.error(message || "Network connection failed. Check your internet connection and try again.")
}

export function showAuthError(message?: string) {
  toast.error(message || "Authentication failed. Please log in again.")
}

export function showApiError(message?: string) {
  toast.warning(message || "The server returned an unexpected response. Please try again later.")
}

export function showSuccess(message: string) {
  toast.success(message)
}

export function showInfo(message: string) {
  toast.info(message)
}
