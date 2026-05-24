"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"

interface HistoricalMetric {
  port: string
  average_risk: number
}

interface Props {
  data: HistoricalMetric[]
}

export default function HistoricalRiskChart({
  data,
}: Props) {
  return (
    <div className="mt-12 rounded-3xl border border-gray-800 bg-gradient-to-br from-[#050505] to-[#0d1117] p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white">
          Historical Risk Trends
        </h2>

        <p className="text-gray-400 mt-2 text-lg">
          Long-term disruption trend analysis across global ports
        </p>
      </div>

      <div className="h-[420px] w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id="riskGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#00ff99"
                  stopOpacity={0.45}
                />
                <stop
                  offset="95%"
                  stopColor="#00ff99"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#1f2937"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="port"
              stroke="#9ca3af"
            />

            <YAxis
              domain={[0, 1]}
              stroke="#9ca3af"
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#111827",
                border: "1px solid #1f2937",
                borderRadius: "14px",
                color: "#fff",
              }}
            />

            <Area
              type="monotone"
              dataKey="average_risk"
              stroke="#00ff99"
              strokeWidth={4}
              fill="url(#riskGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}