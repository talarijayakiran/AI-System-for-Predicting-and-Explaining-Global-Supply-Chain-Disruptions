"use client"

import { useEffect, useState } from "react"

import api from "@/services/api"


type Alert = {

  port: string

  risk: number

  severity: string

  message: string
}


export default function AlertFeed() {

  const [alerts, setAlerts] =

    useState<Alert[]>([])


  const fetchAlerts = async () => {

    try {

      const response = await api.get(

        "/live-alerts"
      )

      setAlerts(response.data.alerts)

    } catch (error) {

      console.error(error)
    }
  }


  useEffect(() => {

    fetchAlerts()

    const interval = setInterval(() => {

      fetchAlerts()

    }, 5000)

    return () => clearInterval(interval)

  }, [])


  return (

    <div className="mt-12">

      <h2 className="text-2xl font-bold mb-6">

        Live AI Alert Escalation Feed

      </h2>

      <div className="space-y-4">

        {alerts.map((alert, index) => (

          <div

            key={index}

            className="border border-gray-800
            bg-[#0a0a0a]
            rounded-2xl
            p-5"
          >

            <div className="flex
            justify-between
            items-center mb-2">

              <h3 className="font-bold text-lg">

                {alert.port}

              </h3>

              <span className={`

                px-3 py-1 rounded-full text-sm font-bold

                ${alert.severity === "CRITICAL"

                  ? "bg-red-600"

                  : alert.severity === "HIGH"

                  ? "bg-orange-500"

                  : alert.severity === "MODERATE"

                  ? "bg-yellow-500 text-black"

                  : "bg-green-600"}

              `}>

                {alert.severity}

              </span>

            </div>

            <p className="text-gray-300">

              {alert.message}

            </p>

            <p className="text-sm text-gray-500 mt-2">

              Risk Score: {alert.risk}

            </p>

          </div>
        ))}

      </div>

    </div>
  )
}