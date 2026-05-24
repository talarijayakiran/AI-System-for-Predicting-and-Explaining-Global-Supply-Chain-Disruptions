"use client"

import { useEffect, useState } from "react"
import api from "@/services/api"

import DashboardCard from "@/components/DashboardCard"
import RiskChart from "@/components/RiskChart"
import CopilotPanel from "@/components/CopilotPanel"
import AlertFeed from "@/components/AlertFeed"
import EventTimeline from "@/components/EventTimeline"
import HistoricalRiskChart from "@/components/HistoricalRiskChart"

type LiveMetric = {
  port: string
  risk: number
  delay_hours: number
  congestion: number
  timestamp: string
}

type HistoricalMetric = {
  port: string
  average_risk: number
}

export default function Home() {
  const [liveData, setLiveData] =
    useState<LiveMetric[]>([])

  const [historicalData, setHistoricalData] =
    useState<HistoricalMetric[]>([])

  useEffect(() => {
    let socket: WebSocket | null = null

    const connectWebSocket = () => {
      socket = new WebSocket(
        "ws://127.0.0.1:8000/ws/live"
      )

      socket.onmessage = (event) => {
        const data = JSON.parse(
          event.data
        )

        setLiveData(
          data.live_operational_data || []
        )
      }
    }

    const fetchHistoricalData =
      async () => {
        try {
          const response =
            await api.get(
              "/historical-risk"
            )

          setHistoricalData(
            response.data || []
          )
        } catch (error) {
          console.error(error)
        }
      }

    connectWebSocket()
    fetchHistoricalData()

    const interval = setInterval(
      fetchHistoricalData,
      5000
    )

    return () => {
      if (socket) socket.close()

      clearInterval(interval)
    }
  }, [])

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold mb-4">
        AI Supply Chain Operations Dashboard
      </h1>

      <p className="text-gray-400 text-lg mb-10">
        AI-powered operational intelligence
        for predicting and explaining global
        supply chain disruptions
      </p>

      <p className="text-gray-400 mb-4 uppercase tracking-widest">
        Global Port Risk Monitoring
      </p>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {liveData.map((item, index) => (
          <DashboardCard
            key={index}
            title={item.port}
            value={item.risk.toFixed(2)}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-12">
        <div className="xl:col-span-2">
          <RiskChart data={liveData} />
        </div>

        <div>
          <CopilotPanel />
        </div>
      </div>

      <div className="mt-12">
        <HistoricalRiskChart
          data={historicalData}
        />
      </div>

      <AlertFeed />

      <EventTimeline />
    </main>
  )
}