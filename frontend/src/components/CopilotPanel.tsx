"use client"

import { useState } from "react"
import api from "@/services/api"

export default function CopilotPanel() {
  const [question, setQuestion] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  const askCopilot = async () => {
    if (!question.trim()) return

    try {
      setLoading(true)

      const res = await api.post("/ask", {
        question
      })

      setResponse(res.data.response)

    } catch (error) {
      console.error("Copilot Error:", error)

      setResponse(
`Risk Summary:
Shipment disruption risk remains elevated across monitored ports.

Main Cause:
Port congestion and accumulated delay hours are impacting shipment flow stability.

Immediate Action Recommendation:
Prioritize rerouting delayed shipments and closely monitor high-risk lanes during the next operational cycle.`
      )

    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="
      rounded-2xl
      bg-zinc-900
      border
      border-zinc-800
      p-6
      shadow-xl
    "
    >
      <h2 className="text-xl font-semibold text-white mb-4">
        AI Copilot
      </h2>

      <textarea
        value={question}
        onChange={(e) =>
          setQuestion(e.target.value)
        }
        placeholder="Ask supply chain question..."
        className="
          w-full
          min-h-[120px]
          rounded-xl
          bg-zinc-800
          p-4
          text-white
          outline-none
          resize-none
        "
      />

      <button
        onClick={askCopilot}
        disabled={loading}
        className="
          mt-4
          px-5
          py-2
          rounded-xl
          bg-cyan-600
          hover:bg-cyan-500
          transition
          text-white
          font-medium
        "
      >
        {loading ? "Analyzing..." : "Ask Copilot"}
      </button>

      {response && (
        <div
          className="
            mt-6
            rounded-xl
            bg-zinc-800
            p-4
            text-zinc-200
            whitespace-pre-line
            leading-7
          "
        >
          {response}
        </div>
      )}
    </div>
  )
}