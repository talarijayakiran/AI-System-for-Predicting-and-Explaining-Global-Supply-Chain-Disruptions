type Props = {

  title: string

  value: string
}

export default function DashboardCard({

  title,

  value

}: Props) {

  const riskColor =

    value === "HIGH"

      ? "text-red-500"

      : value === "MODERATE"

      ? "text-yellow-400"

      : "text-green-400"


  return (

    <div className="border border-gray-800 bg-[#0a0a0a] rounded-2xl p-6 shadow-lg hover:border-gray-600 transition-all">

      <h2 className="text-xl font-semibold text-gray-300">

        {title}

      </h2>

      <p className={`text-4xl mt-6 font-bold ${riskColor}`}>

        {value}

      </p>

    </div>
  )
}