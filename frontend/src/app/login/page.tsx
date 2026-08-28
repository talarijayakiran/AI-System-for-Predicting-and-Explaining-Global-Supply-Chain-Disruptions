"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    if (!email.trim() || !password.trim()) {
      setError(
        "Enter your email and password to continue."
      )
      return
    }

    setError("")
    setLoading(true)

    /*
      Frontend access gate for Phase 1.

      Real authentication is intentionally NOT
      implemented yet. That belongs to a later
      production hardening phase.
    */

    setTimeout(() => {
      router.push("/dashboard")
    }, 500)
  }

  return (
    <main className="relative flex min-h-screen overflow-hidden bg-black text-white">

      {/* Background */}
      <div className="pointer-events-none absolute inset-0">

        <div
          className="
            absolute
            left-1/2
            top-[-300px]
            h-[700px]
            w-[700px]
            -translate-x-1/2
            rounded-full
            bg-cyan-500/[0.07]
            blur-[150px]
          "
        />

        <div
          className="
            absolute
            bottom-[-250px]
            left-[-200px]
            h-[500px]
            w-[500px]
            rounded-full
            bg-blue-500/[0.04]
            blur-[130px]
          "
        />

      </div>

      {/* Back */}
      <Link
        href="/"
        className="
          absolute
          left-6
          top-6
          z-20
          text-sm
          text-zinc-500
          transition
          hover:text-white
          md:left-10
          md:top-8
        "
      >
        ← Back to platform
      </Link>

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-6xl
          items-center
          justify-center
          px-6
          py-24
          md:px-10
        "
      >

        <div
          className="
            grid
            w-full
            max-w-5xl
            overflow-hidden
            rounded-3xl
            border
            border-zinc-800
            bg-zinc-950/80
            shadow-2xl
            backdrop-blur-xl
            md:grid-cols-2
          "
        >

          {/* Product side */}
          <div
            className="
              hidden
              border-r
              border-zinc-800
              bg-gradient-to-br
              from-cyan-500/[0.08]
              via-transparent
              to-transparent
              p-10
              md:flex
              md:flex-col
              md:justify-between
            "
          >

            <div>
              <div className="flex items-center gap-3">
                <span
                  className="
                    h-2.5
                    w-2.5
                    rounded-full
                    bg-cyan-400
                    shadow-[0_0_12px_rgba(34,211,238,0.8)]
                  "
                />

                <span className="text-xs uppercase tracking-[0.25em] text-cyan-400">
                  AI Operations
                </span>
              </div>

              <h1 className="mt-10 text-4xl font-semibold leading-tight">
                Supply chain intelligence,
                <br />
                grounded in evidence.
              </h1>

              <p className="mt-6 max-w-md text-sm leading-7 text-zinc-500">
                Monitor disruption risk, retrieve historical
                operational evidence, and investigate supply
                chain events through an AI-powered operations
                platform.
              </p>
            </div>

            <div className="space-y-3">

              {[
                "Live ML disruption prediction",
                "Semantic historical retrieval",
                "RAG-powered operational reasoning",
                "Real-time WebSocket monitoring",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-zinc-400"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  {item}
                </div>
              ))}

            </div>
          </div>

          {/* Login form */}
          <div className="p-8 md:p-12">

            <div className="mb-10">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-cyan-400">
                Secure Access
              </p>

              <h2 className="mt-4 text-3xl font-semibold">
                Enter the platform
              </h2>

              <p className="mt-3 text-sm leading-6 text-zinc-500">
                Access the AI Supply Chain Operations
                Dashboard.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm text-zinc-400"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="operator@company.com"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-zinc-800
                    bg-black
                    px-4
                    py-3.5
                    text-sm
                    text-white
                    outline-none
                    transition
                    placeholder:text-zinc-700
                    focus:border-cyan-500/50
                    focus:ring-1
                    focus:ring-cyan-500/20
                  "
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm text-zinc-400"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="••••••••"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-zinc-800
                    bg-black
                    px-4
                    py-3.5
                    text-sm
                    text-white
                    outline-none
                    transition
                    placeholder:text-zinc-700
                    focus:border-cyan-500/50
                    focus:ring-1
                    focus:ring-cyan-500/20
                  "
                />
              </div>

              {error && (
                <div
                  className="
                    rounded-xl
                    border
                    border-red-500/20
                    bg-red-500/5
                    px-4
                    py-3
                    text-sm
                    text-red-300
                  "
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  rounded-xl
                  bg-cyan-400
                  px-5
                  py-3.5
                  text-sm
                  font-semibold
                  text-black
                  transition
                  hover:bg-cyan-300
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {loading
                  ? "Opening platform..."
                  : "Continue to Dashboard →"}
              </button>

            </form>

            <div
              className="
                mt-8
                border-t
                border-zinc-900
                pt-6
                text-xs
                leading-6
                text-zinc-600
              "
            >
              Phase 1 access gate. Production authentication,
              authorization, sessions, and identity management
              will be implemented during the security-hardening
              phase.
            </div>

          </div>

        </div>

      </div>
    </main>
  )
}