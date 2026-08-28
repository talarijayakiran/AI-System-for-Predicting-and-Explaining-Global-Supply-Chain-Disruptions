"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

type LiveMetric = {
  port: string
  risk: number
}

interface Props {
  data: LiveMetric[]
}

export default function RiskChart({ data }: Props) {
  return (
    <div className="w-full rounded-3xl border border-gray-800 bg-black p-8">
      <h2 className="mb-2 text-3xl font-bold">
        Disruption Risk Analysis
      </h2>

      <p className="mb-8 text-gray-400">
        Live disruption probability across major global ports
      </p>

      <div className="h-[420px] w-full min-w-0">
        <ResponsiveContainer
          width="100%"
          height="100%"
          minWidth={0}
          minHeight={0}
        >
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 10,
            }}
          >
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

            <Bar
              dataKey="risk"
              fill="#facc15"
              radius={[12, 12, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}