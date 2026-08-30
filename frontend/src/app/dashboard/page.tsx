"use client"

import { useEffect, useState } from "react"
import api from "@/services/api"

import DashboardCard from "@/components/DashboardCard"
import RiskChart from "@/components/RiskChart"
import CopilotPanel from "@/components/CopilotPanel"
import AlertFeed from "@/components/AlertFeed"
import EventTimeline from "@/components/EventTimeline"
import HistoricalRiskChart from "@/components/HistoricalRiskChart"


/*
 * ============================================================
 * TYPES
 * ============================================================
 */

type LiveMetric = {
  port: string
  risk: number
  delay_hours: number
  congestion: number
  timestamp: string
}


type HistoricalMetric = {
  timestamp: string
  risk: number
}


/*
 * Backend historical response:
 *
 * {
 *   data: [...],
 *   total_observations: 30068
 * }
 */

type HistoricalApiResponse = {
  data: HistoricalMetric[]
  total_observations?: number
}


/*
 * Historical analysis is not real-time.
 *
 * WebSocket handles live operational data.
 * Historical REST data refreshes every 15 seconds.
 */

const HISTORICAL_REFRESH_INTERVAL = 15000


/*
 * ============================================================
 * HISTORICAL DATA NORMALIZATION
 * ============================================================
 *
 * Supports both:
 *
 * 1. New backend response:
 *
 * {
 *   data: [...]
 * }
 *
 * 2. Old backend response:
 *
 * [...]
 *
 * This makes the frontend resilient during the transition.
 */

function normalizeHistoricalData(
  payload: unknown
): HistoricalMetric[] {

  /*
   * ----------------------------------------------------------
   * Extract the actual array.
   * ----------------------------------------------------------
   */

  let data: unknown[] = []


  /*
   * New API contract:
   *
   * {
   *   data: [...]
   * }
   */

  if (
    typeof payload === "object" &&
    payload !== null &&
    "data" in payload
  ) {

    const response =
      payload as HistoricalApiResponse

    if (
      Array.isArray(response.data)
    ) {

      data = response.data

    }

  }

  /*
   * Backward compatibility:
   *
   * [...]
   */

  else if (
    Array.isArray(payload)
  ) {

    data = payload

  }


  /*
   * ----------------------------------------------------------
   * Validate and normalize records.
   * ----------------------------------------------------------
   */

  const normalized =
    data
      .map((item) => {

        if (
          typeof item !== "object" ||
          item === null
        ) {

          return null

        }


        const record =
          item as Record<string, unknown>


        const timestamp =
          record.timestamp


        const risk =
          record.risk


        /*
         * Invalid record.
         */

        if (
          typeof timestamp !== "string" ||
          typeof risk !== "number" ||
          !Number.isFinite(risk)
        ) {

          return null

        }


        /*
         * Protect chart from invalid
         * probability ranges.
         */

        return {
          timestamp,
          risk: Math.max(
            0,
            Math.min(
              1,
              risk
            )
          ),
        }

      })
      .filter(
        (
          item
        ): item is HistoricalMetric =>
          item !== null
      )


  /*
   * ----------------------------------------------------------
   * Chronological ordering
   * ----------------------------------------------------------
   *
   * Oldest → newest
   */

  normalized.sort(
    (a, b) =>
      new Date(
        a.timestamp
      ).getTime() -
      new Date(
        b.timestamp
      ).getTime()
  )


  return normalized
}


/*
 * ============================================================
 * DASHBOARD
 * ============================================================
 */

export default function DashboardPage() {

  /*
   * ----------------------------------------------------------
   * Live operational state
   * ----------------------------------------------------------
   */

  const [liveData, setLiveData] =
    useState<LiveMetric[]>([])


  /*
   * ----------------------------------------------------------
   * Historical analytical state
   * ----------------------------------------------------------
   */

  const [historicalData, setHistoricalData] =
    useState<HistoricalMetric[]>([])


  /*
   * ----------------------------------------------------------
   * Historical total
   *
   * Useful if the chart wants to display:
   *
   * "30,068 historical observations"
   *
   * The chart itself should only render the
   * visualization dataset.
   * ----------------------------------------------------------
   */

  const [
    historicalTotal,
    setHistoricalTotal
  ] = useState(0)


  /*
   * ==========================================================
   * EFFECT
   * ==========================================================
   */

  useEffect(() => {

    let socket: WebSocket | null = null

    let reconnectTimer:
      ReturnType<typeof setTimeout> | null =
      null

    let historicalRequestInFlight = false

    let isUnmounted = false


    /*
     * ========================================================
     * WEBSOCKET
     * ========================================================
     */

    const connectWebSocket = () => {

      if (
        isUnmounted
      ) {

        return

      }


      /*
       * Derive WebSocket URL:
       * - In production (remote domain / EC2 IP), converts HTTP/HTTPS to WS/WSS
       * - In local development, dynamically matches current browser host (localhost / 127.0.0.1)
       */

      let websocketUrl = ""
      const apiUrl = process.env.NEXT_PUBLIC_API_URL

      if (apiUrl && !apiUrl.includes("localhost") && !apiUrl.includes("127.0.0.1")) {
        const wsBase = apiUrl.replace(/^http:/i, "ws:").replace(/^https:/i, "wss:")
        websocketUrl = `${wsBase.replace(/\/+$/, "")}/ws/live`
      } else {
        const protocol =
          window.location.protocol === "https:"
            ? "wss:"
            : "ws:"

        const host =
          window.location.hostname || "localhost"

        websocketUrl =
          `${protocol}//${host}:8000/ws/live`
      }

      console.log(
        "[Dashboard] Connecting WebSocket:",
        websocketUrl
      )


      socket =
        new WebSocket(
          websocketUrl
        )


      /*
       * --------------------------------------------------------
       * CONNECTED
       * --------------------------------------------------------
       */

      socket.onopen = () => {

        console.log(
          "[Dashboard] WebSocket connected"
        )

      }


      /*
       * --------------------------------------------------------
       * MESSAGE
       * --------------------------------------------------------
       */

      socket.onmessage = (
        event
      ) => {

        try {

          const data =
            JSON.parse(
              event.data
            )


          /*
           * Expected live backend payload:
           *
           * {
           *   live_operational_data: [...]
           * }
           */

          if (
            Array.isArray(
              data.live_operational_data
            )
          ) {

            setLiveData(
              data.live_operational_data
            )

          }

        } catch (error) {

          console.error(
            "[Dashboard] WebSocket message parsing error:",
            error
          )

        }

      }


      /*
       * --------------------------------------------------------
       * ERROR
       * --------------------------------------------------------
       */

      socket.onerror = () => {

        /*
         * The close event handles
         * reconnection.
         */

        console.warn(
          "[Dashboard] WebSocket connection problem"
        )

      }


      /*
       * --------------------------------------------------------
       * CLOSED
       * --------------------------------------------------------
       */

      socket.onclose = (
        event
      ) => {

        console.warn(
          "[Dashboard] WebSocket closed:",
          event.code,
          event.reason ||
            "No reason provided"
        )


        socket = null


        /*
         * Reconnect only if the component
         * is still mounted.
         */

        if (
          !isUnmounted
        ) {

          reconnectTimer =
            setTimeout(
              () => {

                connectWebSocket()

              },
              3000
            )

        }

      }

    }


    /*
     * ========================================================
     * HISTORICAL DATA
     * ========================================================
     */

    const fetchHistoricalData =
      async () => {

        /*
         * Prevent overlapping requests.
         *
         * If one historical request is still
         * running, don't start another one.
         */

        if (
          historicalRequestInFlight
        ) {

          console.log(
            "[Dashboard] Historical request already in progress."
          )

          return

        }


        historicalRequestInFlight = true


        try {

          console.log(
            "[Dashboard] Fetching historical risk data..."
          )


          const response =
            await api.get(
              "/historical-risk"
            )


          /*
           * Component may have been unmounted
           * while request was running.
           */

          if (
            isUnmounted
          ) {

            return

          }


          /*
           * ----------------------------------------------------
           * IMPORTANT FIX
           * ----------------------------------------------------
           *
           * The backend now returns:
           *
           * {
           *   data: [...],
           *   total_observations: 30068
           * }
           *
           * Therefore we pass response.data into
           * normalizeHistoricalData(), which knows how
           * to extract the nested `data` array.
           */

          const payload =
            response.data


          const processedData =
            normalizeHistoricalData(
              payload
            )


          /*
           * Extract total database observations.
           */

          let total =
            0


          if (
            typeof payload === "object" &&
            payload !== null &&
            "total_observations" in payload
          ) {

            const responsePayload =
              payload as HistoricalApiResponse


            if (
              typeof responsePayload.total_observations ===
              "number" &&
              Number.isFinite(
                responsePayload.total_observations
              )
            ) {

              total =
                responsePayload.total_observations

            }

          }


          /*
           * If backend doesn't provide total,
           * use rendered observations as fallback.
           */

          if (
            total === 0 &&
            processedData.length > 0
          ) {

            total =
              processedData.length

          }


          console.log(
            "[Dashboard] Historical chart points:",
            processedData.length
          )


          console.log(
            "[Dashboard] Total historical observations:",
            total
          )


          /*
           * Update state.
           */

          setHistoricalData(
            processedData
          )


          setHistoricalTotal(
            total
          )

        } catch (error) {

          if (
            !isUnmounted
          ) {

            console.error(
              "[Dashboard] Historical data error:",
              error
            )

          }

        } finally {

          historicalRequestInFlight =
            false

        }

      }


    /*
     * ========================================================
     * INITIAL LOAD
     * ========================================================
     */

    connectWebSocket()

    fetchHistoricalData()


    /*
     * ========================================================
     * HISTORICAL REFRESH
     * ========================================================
     *
     * 15 seconds.
     *
     * The live WebSocket handles real-time
     * operational changes.
     */

    const interval =
      setInterval(
        fetchHistoricalData,
        HISTORICAL_REFRESH_INTERVAL
      )


    /*
     * ========================================================
     * CLEANUP
     * ========================================================
     */

    return () => {

      isUnmounted = true


      /*
       * Cancel reconnect timer.
       */

      if (
        reconnectTimer
      ) {

        clearTimeout(
          reconnectTimer
        )

        reconnectTimer = null

      }


      /*
       * Close WebSocket.
       */

      if (
        socket
      ) {

        socket.close()

        socket = null

      }


      /*
       * Stop historical polling.
       */

      clearInterval(
        interval
      )

    }

  }, [])


  /*
   * ==========================================================
   * UI
   * ==========================================================
   */

  return (

    <main
      className="
        min-h-screen
        bg-black
        p-6
        text-white
        md:p-10
      "
    >

      {/* ================================================== */}
      {/* HEADER */}
      {/* ================================================== */}

      <header
        className="
          mb-10
        "
      >

        <div
          className="
            mb-3
            flex
            items-center
            gap-3
          "
        >

          <span
            className="
              h-2.5
              w-2.5
              rounded-full
              bg-cyan-400
              shadow-[0_0_12px_rgba(34,211,238,0.8)]
            "
          />

          <span
            className="
              text-xs
              font-medium
              uppercase
              tracking-[0.25em]
              text-cyan-400
            "
          >
            AI Operations Intelligence
          </span>

        </div>


        <h1
          className="
            text-4xl
            font-bold
            tracking-tight
            md:text-5xl
          "
        >
          AI Supply Chain Operations Dashboard
        </h1>


        <p
          className="
            mt-4
            max-w-3xl
            text-base
            leading-7
            text-gray-400
            md:text-lg
          "
        >
          AI-powered operational intelligence
          for predicting, monitoring, and
          explaining global supply chain
          disruptions.
        </p>

      </header>


      {/* ================================================== */}
      {/* GLOBAL PORT RISK */}
      {/* ================================================== */}

      <section>

        <div
          className="
            mb-4
          "
        >

          <p
            className="
              text-xs
              font-medium
              uppercase
              tracking-[0.2em]
              text-gray-500
            "
          >
            Global Port Risk Monitoring
          </p>


          <p
            className="
              mt-1
              text-sm
              text-gray-600
            "
          >
            Live disruption probability across
            major global ports
          </p>

        </div>


        <div
          className="
            grid
            gap-6
            md:grid-cols-2
            xl:grid-cols-4
          "
        >

          {liveData.map(
            (item, index) => (

              <DashboardCard
                key={`${item.port}-${index}`}
                title={item.port}
                value={item.risk.toFixed(2)}
              />

            )
          )}

        </div>

      </section>


      {/* ================================================== */}
      {/* RISK ANALYSIS + COPILOT */}
      {/* ================================================== */}

      <section
        className="
          mt-12
        "
      >

        <div
          className="
            mb-6
          "
        >

          <p
            className="
              text-xs
              font-medium
              uppercase
              tracking-[0.2em]
              text-gray-500
            "
          >
            Decision Intelligence
          </p>


          <p
            className="
              mt-1
              text-sm
              text-gray-600
            "
          >
            Combine live prediction signals
            with historical operational evidence.
          </p>

        </div>


        <div
          className="
            grid
            grid-cols-1
            gap-8
            xl:grid-cols-3
          "
        >

          <div
            className="
              min-w-0
              xl:col-span-2
            "
          >

            <RiskChart
              data={liveData}
            />

          </div>


          <div
            className="
              min-w-0
            "
          >

            <CopilotPanel />

          </div>

        </div>

      </section>


      {/* ================================================== */}
      {/* HISTORICAL RISK */}
      {/* ================================================== */}

      <section
        className="
          mt-12
        "
      >

        <HistoricalRiskChart
          data={historicalData}
          totalObservations={historicalTotal}
        />

      </section>


      {/* ================================================== */}
      {/* ALERTS */}
      {/* ================================================== */}

      <section
        className="
          mt-12
        "
      >

        <AlertFeed />

      </section>


      {/* ================================================== */}
      {/* EVENT TIMELINE */}
      {/* ================================================== */}

      <section
        className="
          mt-12
        "
      >

        <EventTimeline />

      </section>

    </main>

  )

}