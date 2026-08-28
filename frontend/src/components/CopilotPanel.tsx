"use client"

import { useState } from "react"
import api from "@/services/api"

type RagResponse = {
  query: string
  rag_explanation: string
}

const suggestedQueries = [
  "What historical incidents are associated with port congestion?",
  "What caused previous shipment delays?",
  "Which operational factors contributed to disruption risk?",
  "How did weather disruptions affect previous supply chain operations?",
]

export default function CopilotPanel() {
  const [question, setQuestion] = useState("")
  const [response, setResponse] =
    useState<RagResponse | null>(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const askRag = async () => {
    const query = question.trim()

    if (!query || loading) {
      return
    }

    try {
      setLoading(true)
      setError("")
      setResponse(null)

      const res = await api.post<RagResponse>(
        "/rag-query",
        {
          query,
          prediction_risk: 0.81,
        }
      )

      setResponse(res.data)
    } catch (err) {
      console.error("RAG Query Error:", err)

      setError(
        "Unable to retrieve operational intelligence. Please verify that the backend is running."
      )
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault()
      askRag()
    }
  }

  const useSuggestedQuery = (
    query: string
  ) => {
    setQuestion(query)
    setError("")
  }

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-2xl
        border
        border-cyan-500/20
        bg-gradient-to-br
        from-zinc-950
        via-zinc-900
        to-zinc-950
        p-6
        shadow-2xl
      "
    >
      {/* Background glow */}
      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-48
          w-48
          rounded-full
          bg-cyan-500/10
          blur-3xl
        "
      />

      {/* Header */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-cyan-400
                  shadow-[0_0_10px_rgba(34,211,238,0.8)]
                "
              />

              <span
                className="
                  text-xs
                  font-medium
                  uppercase
                  tracking-[0.2em]
                  text-cyan-400
                "
              >
                Retrieval Intelligence
              </span>
            </div>

            <h2 className="text-2xl font-semibold text-white">
              RAG Query
            </h2>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Ask questions about historical supply
              chain incidents and operational risk.
            </p>
          </div>

          <div
            className="
              hidden
              rounded-xl
              border
              border-zinc-800
              bg-zinc-900/80
              px-3
              py-2
              text-xs
              text-zinc-400
              sm:block
            "
          >
            RAG
          </div>
        </div>
      </div>

      {/* Query input */}
      <div className="relative z-10">
        <label
          htmlFor="rag-query"
          className="
            mb-2
            block
            text-sm
            font-medium
            text-zinc-300
          "
        >
          Operational Query
        </label>

        <textarea
          id="rag-query"
          value={question}
          onChange={(event) =>
            setQuestion(event.target.value)
          }
          onKeyDown={handleKeyDown}
          disabled={loading}
          placeholder="Ask about historical incidents, delays, congestion, weather, or disruption risk..."
          className="
            min-h-[130px]
            w-full
            resize-none
            rounded-xl
            border
            border-zinc-800
            bg-black/50
            p-4
            text-sm
            leading-6
            text-white
            outline-none
            transition
            placeholder:text-zinc-600
            focus:border-cyan-500/50
            focus:ring-1
            focus:ring-cyan-500/30
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        />

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-zinc-600">
            Press Enter to query · Shift + Enter for newline
          </span>

          <button
            type="button"
            onClick={askRag}
            disabled={
              loading ||
              !question.trim()
            }
            className="
              rounded-xl
              border
              border-cyan-500/30
              bg-cyan-500/10
              px-5
              py-2.5
              text-sm
              font-medium
              text-cyan-300
              transition
              hover:border-cyan-400/50
              hover:bg-cyan-500/20
              hover:text-cyan-200
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            {loading
              ? "Retrieving..."
              : "Run RAG Query"}
          </button>
        </div>
      </div>

      {/* Suggested queries */}
      {!response && !loading && (
        <div className="relative z-10 mt-6">
          <p
            className="
              mb-3
              text-xs
              font-medium
              uppercase
              tracking-widest
              text-zinc-500
            "
          >
            Suggested Queries
          </p>

          <div className="space-y-2">
            {suggestedQueries.map(
              (query) => (
                <button
                  key={query}
                  type="button"
                  onClick={() =>
                    useSuggestedQuery(query)
                  }
                  className="
                    block
                    w-full
                    rounded-lg
                    border
                    border-zinc-800
                    bg-zinc-900/50
                    px-3
                    py-2.5
                    text-left
                    text-xs
                    leading-5
                    text-zinc-400
                    transition
                    hover:border-cyan-500/30
                    hover:bg-cyan-500/5
                    hover:text-zinc-200
                  "
                >
                  {query}
                </button>
              )
            )}
          </div>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div
          className="
            relative
            z-10
            mt-6
            rounded-xl
            border
            border-cyan-500/20
            bg-cyan-500/5
            p-5
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                h-5
                w-5
                animate-spin
                rounded-full
                border-2
                border-zinc-700
                border-t-cyan-400
              "
            />

            <div>
              <p className="text-sm font-medium text-white">
                Retrieving historical evidence
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                Searching operational incident context...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div
          className="
            relative
            z-10
            mt-6
            rounded-xl
            border
            border-red-500/20
            bg-red-500/5
            p-4
            text-sm
            leading-6
            text-red-300
          "
        >
          {error}
        </div>
      )}

      {/* RAG response */}
      {response && !loading && (
        <div
          className="
            relative
            z-10
            mt-6
            overflow-hidden
            rounded-xl
            border
            border-zinc-800
            bg-black/40
          "
        >
          {/* Response header */}
          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-zinc-800
              px-4
              py-3
            "
          >
            <div className="flex items-center gap-2">
              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-emerald-400
                  shadow-[0_0_8px_rgba(52,211,153,0.7)]
                "
              />

              <span
                className="
                  text-xs
                  font-medium
                  uppercase
                  tracking-widest
                  text-emerald-400
                "
              >
                Retrieved Context
              </span>
            </div>

            <span className="text-xs text-zinc-600">
              Grounded response
            </span>
          </div>

          {/* Query */}
          <div className="border-b border-zinc-800/70 px-4 py-4">
            <p className="mb-1 text-[11px] uppercase tracking-widest text-zinc-600">
              Query
            </p>

            <p className="text-sm leading-6 text-zinc-300">
              {response.query}
            </p>
          </div>

          {/* Explanation */}
          <div className="px-4 py-5">
            <p className="mb-3 text-[11px] uppercase tracking-widest text-zinc-600">
              Operational Intelligence
            </p>

            <div
              className="
                whitespace-pre-line
                text-sm
                leading-7
                text-zinc-200
              "
            >
              {response.rag_explanation}
            </div>
          </div>

          {/* Ask another */}
          <div className="border-t border-zinc-800/70 p-4">
            <button
              type="button"
              onClick={() => {
                setResponse(null)
                setQuestion("")
                setError("")
              }}
              className="
                text-xs
                font-medium
                text-cyan-400
                transition
                hover:text-cyan-300
              "
            >
              ← Ask another query
            </button>
          </div>
        </div>
      )}
    </section>
  )
}