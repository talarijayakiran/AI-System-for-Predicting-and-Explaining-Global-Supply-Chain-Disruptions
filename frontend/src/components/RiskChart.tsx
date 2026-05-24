"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"

type LiveMetric = {
  port: string
  risk: number
}

interface Props {
  data: LiveMetric[]
}

export default function RiskChart({
  data
}: Props) {
  return (
    <div className="bg-black border border-gray-800 rounded-3xl p-8 h-[500px]">
      <h2 className="text-3xl font-bold mb-2">
        Disruption Risk Analysis
      </h2>

      <p className="text-gray-400 mb-8">
        Live disruption probability across major global ports
      </p>

      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <BarChart data={data}>
          <XAxis dataKey="port" />
          <YAxis domain={[0, 1]} />
          <Tooltip />

          <Bar
            dataKey="risk"
            fill="#facc15"
            radius={[12, 12, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}