"use client"

import { useEffect, useState } from "react"

import api from "@/services/api"
import EventTimeline from "@/components/EventTimeline"
import AlertFeed from "@/components/AlertFeed"
import DashboardCard from "@/components/DashboardCard"
import RiskChart from "@/components/RiskChart"
import CopilotPanel from "@/components/CopilotPanel"


type LiveMetric = {

  port: string

  risk: number

  delay_hours: number

  congestion: number
}


export default function Home() {

  const [liveData, setLiveData] =

    useState<LiveMetric[]>([])


  const fetchLiveMetrics = async () => {

    try {

      const response = await api.get(

        "/live-metrics"
      )

      setLiveData(

        response.data.live_operational_data
      )

    } catch (error) {

      console.error(error)
    }
  }


  useEffect(() => {

    fetchLiveMetrics()

    const interval = setInterval(() => {

      fetchLiveMetrics()

    }, 5000)

    return () => clearInterval(interval)

  }, [])


  return (

    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold tracking-tight mb-4">

        AI Supply Chain Operations Dashboard

      </h1>

      <p className="text-gray-400 text-lg mb-10">

        AI-powered operational intelligence
        for predicting and explaining
        global supply chain disruptions

      </p>

      <p className="text-gray-400 mb-4 uppercase tracking-widest">

        Global Port Risk Monitoring

      </p>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        {liveData.map((item, index) => (

          <DashboardCard

            key={index}

            title={item.port}

            value={`${item.risk}`}
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

      <AlertFeed />
      <EventTimeline />
    </main>
  )
}