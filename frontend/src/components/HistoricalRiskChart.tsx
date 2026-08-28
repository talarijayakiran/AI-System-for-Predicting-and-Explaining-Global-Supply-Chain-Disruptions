"use client"

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"

type HistoricalMetric = {
  timestamp: string
  risk: number
}

type HistoricalRiskChartProps = {
  data: HistoricalMetric[]
  totalObservations?: number
}

export default function HistoricalRiskChart({
  data,
  totalObservations = 0,
}: HistoricalRiskChartProps) {

  /*
   * ------------------------------------------------------------
   * Defensive normalization
   * ------------------------------------------------------------
   */

  const chartData = data
    .filter(
      (item) =>
        item &&
        typeof item.timestamp === "string" &&
        Number.isFinite(
          Number(item.risk)
        )
    )
    .map((item) => ({
      timestamp: item.timestamp,
      risk: Math.max(
        0,
        Math.min(
          1,
          Number(item.risk)
        )
      ),
    }))
    .sort(
      (a, b) =>
        new Date(a.timestamp).getTime() -
        new Date(b.timestamp).getTime()
    )

  /*
   * ------------------------------------------------------------
   * Time formatter
   * ------------------------------------------------------------
   */

  const formatTime = (
    timestamp: string
  ) => {

    const date = new Date(timestamp)

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return ""
    }

    return date.toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    )
  }

  /*
   * ------------------------------------------------------------
   * Risk formatter
   * ------------------------------------------------------------
   */

  const formatRisk = (
    value: number
  ) => {
    return `${Math.round(value * 100)}%`
  }

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-cyan-400/20
        bg-zinc-950
        p-6
        shadow-[0_0_60px_rgba(0,0,0,0.35)]
        md:p-7
      "
    >

      {/* Ambient glow */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-48
          w-[500px]
          -translate-x-1/2
          rounded-full
          bg-cyan-500/[0.035]
          blur-3xl
        "
      />

      {/* Header */}

      <div
        className="
          relative
          z-10
        "
      >

        <div
          className="
            text-[11px]
            font-medium
            uppercase
            tracking-[0.28em]
            text-cyan-400
          "
        >
          Historical Intelligence
        </div>

        <h2
          className="
            mt-3
            text-2xl
            font-semibold
            tracking-tight
            text-white
            md:text-3xl
          "
        >
          Historical Risk Trends
        </h2>

        <p
          className="
            mt-2
            text-sm
            text-slate-400
            md:text-base
          "
        >
          Disruption risk evolution across historical
          operational observations
        </p>

      </div>

      {/* Chart */}

      <div
        className="
          relative
          z-10
          mt-8
          h-[380px]
          w-full
        "
      >

        {chartData.length < 2 ? (

          <div
            className="
              flex
              h-full
              items-center
              justify-center
            "
          >

            <div className="text-center">

              <div
                className="
                  mx-auto
                  mb-3
                  h-2
                  w-2
                  rounded-full
                  bg-cyan-400
                  shadow-[0_0_12px_rgba(34,211,238,0.8)]
                "
              />

              <p
                className="
                  text-sm
                  text-zinc-400
                "
              >
                Waiting for historical observations
              </p>

            </div>

          </div>

        ) : (

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <AreaChart
              data={chartData}
              margin={{
                top: 20,
                right: 15,
                left: 5,
                bottom: 5,
              }}
            >

              <defs>

                <linearGradient
                  id="historicalRiskArea"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="0%"
                    stopColor="#06b6d4"
                    stopOpacity={0.55}
                  />

                  <stop
                    offset="45%"
                    stopColor="#06b6d4"
                    stopOpacity={0.22}
                  />

                  <stop
                    offset="100%"
                    stopColor="#06b6d4"
                    stopOpacity={0}
                  />

                </linearGradient>

              </defs>

              <CartesianGrid
                vertical={false}
                stroke="#172033"
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="timestamp"
                tickFormatter={formatTime}
                tick={{
                  fill: "#64748b",
                  fontSize: 12,
                }}
                axisLine={{
                  stroke: "#334155",
                }}
                tickLine={false}
                minTickGap={45}
              />

              <YAxis
                domain={[
                  0,
                  1,
                ]}
                ticks={[
                  0,
                  0.25,
                  0.5,
                  0.75,
                  1,
                ]}
                tickFormatter={formatRisk}
                tick={{
                  fill: "#64748b",
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
                width={48}
              />

              <Tooltip
                cursor={{
                  stroke: "#06b6d4",
                  strokeOpacity: 0.25,
                }}
                contentStyle={{
                  backgroundColor: "#09090b",
                  border:
                    "1px solid rgba(34,211,238,0.25)",
                  borderRadius: "12px",
                  color: "#ffffff",
                  boxShadow:
                    "0 12px 40px rgba(0,0,0,0.5)",
                }}
                labelStyle={{
                  color: "#94a3b8",
                  marginBottom: "4px",
                }}
                formatter={(value) => [
                  formatRisk(
                    Number(value)
                  ),
                  "Risk",
                ]}
                labelFormatter={(label) =>
                  formatTime(
                    String(label)
                  )
                }
              />

              <Area
                type="monotone"
                dataKey="risk"
                stroke="#06b6d4"
                strokeWidth={3}
                fill="url(#historicalRiskArea)"
                fillOpacity={1}
                connectNulls
                dot={false}
                activeDot={{
                  r: 5,
                  strokeWidth: 2,
                  fill: "#06b6d4",
                  stroke: "#020617",
                }}
                isAnimationActive={false}
              />

            </AreaChart>

          </ResponsiveContainer>

        )}

      </div>

      {/* Footer */}

      <div
        className="
          relative
          z-10
          mt-5
          flex
          flex-col
          gap-2
          border-t
          border-zinc-900
          pt-4
          text-xs
          text-zinc-600
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >

        <span>
          {totalObservations > 0
            ? `${totalObservations.toLocaleString()} historical observations`
            : `${chartData.length} chart observations`}
        </span>

        <span>
          Visualization: {chartData.length} points
        </span>

        <span>
          Risk scale: 0 → 1
        </span>

      </div>

    </section>
  )
}