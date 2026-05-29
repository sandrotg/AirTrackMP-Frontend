import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

interface AuthUser {
  id: string
  email: string
  name: string
  role: string
  apiToken: string
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`${API_BASE}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        })

        if (!res.ok) {
            const errorText = await res.text()
            throw new Error(errorText || "Credenciales inválidas")
        }

        const data = await res.json()
        const token = data.token as string

        if (!token) return null

        const payload = JSON.parse(atob(token.split(".")[1]))
        const email = payload.sub || (credentials.email as string)
        const role = payload.role as string

        return {
          id: email,
          email,
          name: email,
          role,
          apiToken: token,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const authUser = user as AuthUser
        token.apiToken = authUser.apiToken
        token.role = authUser.role
      }
      return token
    },
    async session({ session, token }) {
      session.apiToken = token.apiToken as string
      session.user.role = token.role as string
      return session
    },
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isLoginPage = nextUrl.pathname === "/login"

      if (isLoginPage) {
        if (isLoggedIn) return Response.redirect(new URL("/dashboard", nextUrl))
        return true
      }

      if (!isLoggedIn) {
        return Response.redirect(new URL("/login", nextUrl))
      }

      return true
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
})

declare module "next-auth" {
  interface Session {
    apiToken?: string
    user: {
      role?: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}
