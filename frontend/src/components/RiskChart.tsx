"use client"

import {

  BarChart,

  Bar,

  XAxis,

  YAxis,

  Tooltip,

  ResponsiveContainer

} from "recharts"


type Analytics = {

  port: string

  average_risk: number

  average_delay: number

  status: string
}


type Props = {

  data: Analytics[]
}


export default function RiskChart({

  data

}: Props) {

  return (

    <div className="mt-12">

      <h2 className="text-2xl font-bold mb-4">

        Disruption Risk Analysis
    <p className="text-gray-400 mb-4">

  Live disruption probability
  across major global ports

</p>
      </h2>

      <div className="bg-black border rounded-xl p-4">

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
  dataKey="average_risk"
  fill="#facc15"
  radius={[10, 10, 0, 0]}
/>

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  )
}