"use client"

import { useState } from "react"

import api from "@/services/api"


export default function CopilotPanel() {

  const [response, setResponse] =

    useState("")

  const [loading, setLoading] =

    useState(false)


  const askCopilot = async () => {

    try {

      setLoading(true)

      const result = await api.post(
        "/copilot"
      )

      setResponse(

        result.data.copilot_response
      )

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)
    }
  }


  return (

    <div className="h-full border border-gray-800 bg-[#0a0a0a] rounded-2xl p-6 shadow-lg">

      <h2 className="text-2xl font-bold mb-4">

        AI Operations Copilot

      </h2>

<div className="flex items-center gap-2 mb-6">

  <div className="w-3 h-3 rounded-full bg-green-500" />

  <p className="text-sm text-gray-400">

    AI Copilot Online

  </p>

</div>

      <button

        onClick={askCopilot}

        className="bg-white text-black px-5 py-3 rounded-xl font-semibold hover:opacity-80 transition-all"
      >

        Ask AI Copilot

      </button>

      {loading && (

        <p className="mt-4">

          Thinking...
        </p>
      )}

      {response && (

        <div className="mt-6 border border-gray-700 bg-black rounded-xl p-5">

          <p className="whitespace-pre-line">

            {response}

          </p>

        </div>
      )}

    </div>
  )
}