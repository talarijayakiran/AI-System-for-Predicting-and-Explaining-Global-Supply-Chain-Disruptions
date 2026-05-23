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

  delay_hours: number

  congestion: number
}


type Props = {

  data: LiveMetric[]
}


export default function RiskChart({

  data

}: Props) {

  return (

    <div>

      <h2 className="text-2xl font-bold mb-2">

        Disruption Risk Analysis

      </h2>

      <p className="text-gray-400 mb-4">

        Live disruption probability
        across major global ports

      </p>

      <div className="border border-gray-800 bg-[#0a0a0a] rounded-2xl p-4">

        <ResponsiveContainer
          width="100%"
          height={250}
        >

          <BarChart data={data}>

            <XAxis dataKey="port" />

            <YAxis />

            <Tooltip

              contentStyle={{

                backgroundColor: "#111",

                border: "1px solid #333",

                borderRadius: "10px"

              }}
            />

            <Bar

              dataKey="risk"

              fill="#facc15"

              radius={[10, 10, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  )
}