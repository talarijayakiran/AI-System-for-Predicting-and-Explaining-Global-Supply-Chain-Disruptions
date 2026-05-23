const alerts = [

  {

    severity: "HIGH",

    message:
      "Rotterdam congestion spike detected"

  },

  {

    severity: "MEDIUM",

    message:
      "Shanghai shipment delays increasing"

  },

  {

    severity: "HIGH",

    message:
      "Los Angeles weather instability rising"

  },

  {

    severity: "LOW",

    message:
      "Singapore operations stabilizing"

  }

]


export default function AlertFeed() {

  return (

    <div className="mt-12">

      <h2 className="text-2xl font-bold mb-4">

        Live Operational Alerts

      </h2>

      <div className="border border-gray-800 bg-[#0a0a0a] rounded-2xl p-4 space-y-4">

        {alerts.map((alert, index) => {

          const severityColor =

            alert.severity === "HIGH"

              ? "text-red-500"

              : alert.severity === "MEDIUM"

              ? "text-yellow-400"

              : "text-green-400"


          return (

            <div

              key={index}

              className="border border-gray-800 rounded-xl p-4 flex justify-between items-center hover:border-gray-600 transition-all"
            >

              <div>

                <p className={`font-bold ${severityColor}`}>

                  {alert.severity}

                </p>

                <p className="text-gray-300 mt-1">

                  {alert.message}

                </p>

              </div>

              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />

            </div>
          )
        })}

      </div>

    </div>
  )
}