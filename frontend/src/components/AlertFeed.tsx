"use client"

import { useEffect, useState } from "react"
import api from "@/services/api"
import {
  AlertTriangle,
  Siren,
  ShieldAlert
} from "lucide-react"

type Alert = {
  severity: string
  message: string
}

export default function AlertFeed() {
  const [alerts, setAlerts] = useState<Alert[]>([])

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await api.get(
          "/live-alerts"
        )

        setAlerts(response.data || [])
      } catch (error) {
        console.error(error)
      }
    }

    fetchAlerts()

    const interval = setInterval(
      fetchAlerts,
      5000
    )

    return () =>
      clearInterval(interval)
  }, [])

  const getSeverityStyle = (
    severity: string
  ) => {
    if (
      severity.toLowerCase() === "critical"
    ) {
      return {
        icon: (
          <Siren className="w-6 h-6 text-red-500" />
        ),
        border:
          "border-red-500/40",
        glow:
          "shadow-[0_0_25px_rgba(239,68,68,0.18)]",
        badge:
          "bg-red-500/20 text-red-400",
      }
    }

    if (
      severity.toLowerCase() === "high"
    ) {
      return {
        icon: (
          <AlertTriangle className="w-6 h-6 text-orange-400" />
        ),
        border:
          "border-orange-400/30",
        glow:
          "shadow-[0_0_20px_rgba(251,146,60,0.15)]",
        badge:
          "bg-orange-500/20 text-orange-300",
      }
    }

    return {
      icon: (
        <ShieldAlert className="w-6 h-6 text-yellow-400" />
      ),
      border:
        "border-yellow-400/30",
      glow:
        "shadow-[0_0_18px_rgba(250,204,21,0.12)]",
      badge:
        "bg-yellow-500/20 text-yellow-300",
    }
  }

  return (
    <section className="mt-14">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold">
            Live AI Alert Escalation Feed
          </h2>

          <p className="text-gray-400 mt-2">
            AI-generated disruption alerts across global operations
          </p>
        </div>

        <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse shadow-[0_0_12px_rgba(74,222,128,0.8)]" />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {alerts.map((alert, index) => {
          const style =
            getSeverityStyle(
              alert.severity
            )

          return (
            <div
              key={index}
              className={`
                rounded-3xl
                bg-gradient-to-br
                from-[#0f0f0f]
                to-[#151515]
                border
                p-6
                transition-all
                duration-300
                hover:scale-[1.02]
                ${style.border}
                ${style.glow}
              `}
            >
              <div className="flex justify-between items-start mb-5">
                {style.icon}

                <span
                  className={`
                    px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider
                    ${style.badge}
                  `}
                >
                  {alert.severity}
                </span>
              </div>

              <p className="text-white text-lg leading-relaxed font-medium">
                {alert.message}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}