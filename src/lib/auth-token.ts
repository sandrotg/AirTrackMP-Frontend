let currentToken: string | null = null

export function setApiToken(token: string | null) {
  currentToken = token
  if (typeof window !== "undefined") {
    if (token) localStorage.setItem("token", token)
    else localStorage.removeItem("token")
  }
}

export function getApiToken(): string | null {
  if (currentToken) return currentToken
  if (typeof window !== "undefined") {
    return localStorage.getItem("token")
  }
  return null
}
