let currentToken: string | null = null

export function setApiToken(token: string | null) {
  currentToken = token
}

export function getApiToken(): string | null {
  if (currentToken) return currentToken
  if (typeof window !== "undefined") {
    return localStorage.getItem("token")
  }
  return null
}
