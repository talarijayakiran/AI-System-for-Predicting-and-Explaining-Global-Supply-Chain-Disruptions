"use client"

import { useEffect, useState } from "react"

import api from "@/services/api"


type Event = {

  timestamp: string

  port: string

  severity: string

  risk: number

  message: string
}


export default function EventTimeline() {

  const [events, setEvents] =

    useState<Event[]>([])


  const fetchTimeline = async () => {

    try {

      const response = await api.get(

        "/event-timeline"
      )

      setEvents(response.data.timeline)

    } catch (error) {

      console.error(error)
    }
  }


  useEffect(() => {

    fetchTimeline()

    const interval = setInterval(() => {

      fetchTimeline()

    }, 5000)

    return () => clearInterval(interval)

  }, [])


  return (

    <div className="mt-12">

      <h2 className="text-2xl font-bold mb-6">

        Live Operational Event Timeline

      </h2>

      <div className="space-y-4 max-h-[500px] overflow-y-auto">

        {events.map((event, index) => (

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

                {event.port}

              </h3>

              <span className="text-sm text-gray-500">

                {event.timestamp}

              </span>

            </div>

            <p className="text-gray-300">

              {event.message}

            </p>

            <div className="mt-2 flex gap-4">

              <span className="text-yellow-400">

                Severity: {event.severity}

              </span>

              <span className="text-red-400">

                Risk: {event.risk}

              </span>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}