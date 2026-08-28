import Link from "next/link"

const capabilities = [
  {
    number: "01",
    title: "Predict",
    description:
      "ML and deep learning models estimate disruption probability from operational signals such as congestion, delays, and weather conditions.",
  },
  {
    number: "02",
    title: "Retrieve",
    description:
      "A retrieval pipeline searches historical supply-chain incidents using semantic embeddings to find relevant operational evidence.",
  },
  {
    number: "03",
    title: "Explain",
    description:
      "The system combines current risk signals with historical evidence to produce grounded operational intelligence.",
  },
  {
    number: "04",
    title: "Monitor",
    description:
      "Real-time WebSocket events continuously expose changing operational risk across major global ports.",
  },
]

const technologies = [
  "Python",
  "FastAPI",
  "TensorFlow",
  "LSTM",
  "RAG",
  "Embeddings",
  "Gemini",
  "PostgreSQL",
  "React",
  "Next.js",
  "WebSocket",
  "Docker",
  "AWS",
]

function SupplyChainVisual() {
  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        overflow-hidden
      "
      aria-hidden="true"
    >
      {/* Deep ocean atmosphere */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(ellipse_at_65%_45%,rgba(0,180,255,0.13),transparent_42%),radial-gradient(ellipse_at_82%_78%,rgba(0,110,255,0.10),transparent_38%),linear-gradient(180deg,#020506_0%,#010508_52%,#02070b_100%)]
        "
      />

      {/* Ocean horizon */}
      <div
        className="
          absolute
          left-[35%]
          right-0
          top-[42%]
          h-px
          bg-cyan-400/10
        "
      />

      {/* Subtle ocean grid */}
      <div
        className="
          absolute
          bottom-0
          left-[32%]
          right-0
          top-[42%]
          opacity-30
          [background-image:linear-gradient(rgba(34,211,238,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.06)_1px,transparent_1px)]
          [background-size:55px_55px]
          [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]
        "
      />

      {/* Global network */}
      <svg
        className="
          absolute
          right-[-5%]
          top-[3%]
          h-[76%]
          w-[72%]
          opacity-80
        "
        viewBox="0 0 1000 650"
        fill="none"
      >
        {/* Continental silhouettes */}
        <path
          d="M105 150
             C145 115 210 95 275 115
             L315 150
             L295 185
             L255 188
             L230 225
             L190 215
             L165 245
             L125 215
             L105 180 Z"
          fill="rgba(10,65,90,0.34)"
          stroke="rgba(34,211,238,0.10)"
        />

        <path
          d="M350 175
             L405 140
             L470 150
             L505 190
             L485 225
             L450 240
             L430 285
             L385 270
             L360 235
             L330 220 Z"
          fill="rgba(10,65,90,0.28)"
          stroke="rgba(34,211,238,0.10)"
        />

        <path
          d="M555 125
             L620 105
             L685 125
             L735 155
             L785 145
             L830 180
             L805 215
             L750 220
             L720 250
             L665 230
             L630 245
             L590 215
             L555 180 Z"
          fill="rgba(10,65,90,0.32)"
          stroke="rgba(34,211,238,0.10)"
        />

        <path
          d="M615 300
             L660 285
             L705 310
             L735 350
             L720 405
             L685 435
             L660 480
             L625 450
             L615 400
             L580 365
             L590 325 Z"
          fill="rgba(10,65,90,0.28)"
          stroke="rgba(34,211,238,0.10)"
        />

        {/* Shipping routes */}
        <path
          d="M160 190 C300 120 420 175 585 185 S780 180 850 250"
          stroke="#22d3ee"
          strokeWidth="2"
          strokeDasharray="7 9"
          opacity="0.7"
        />

        <path
          d="M180 205 C310 270 420 275 580 220 S750 160 825 145"
          stroke="#0ea5e9"
          strokeWidth="1.5"
          strokeDasharray="5 10"
          opacity="0.6"
        />

        <path
          d="M385 220 C470 290 560 350 670 355 S810 315 900 280"
          stroke="#22d3ee"
          strokeWidth="1.5"
          strokeDasharray="8 10"
          opacity="0.55"
        />

        <path
          d="M460 155 C510 215 540 300 610 375"
          stroke="#facc15"
          strokeWidth="1.5"
          strokeDasharray="6 9"
          opacity="0.45"
        />

        {/* Route nodes */}
        <g>
          <circle cx="160" cy="190" r="5" fill="#22d3ee" />
          <circle cx="160" cy="190" r="13" stroke="#22d3ee" opacity="0.25" />

          <circle cx="385" cy="220" r="5" fill="#22d3ee" />
          <circle cx="385" cy="220" r="13" stroke="#22d3ee" opacity="0.25" />

          <circle cx="585" cy="185" r="6" fill="#facc15" />
          <circle cx="585" cy="185" r="16" stroke="#facc15" opacity="0.25" />

          <circle cx="670" cy="355" r="5" fill="#22d3ee" />
          <circle cx="670" cy="355" r="14" stroke="#22d3ee" opacity="0.25" />

          <circle cx="850" cy="250" r="5" fill="#22d3ee" />
          <circle cx="850" cy="250" r="14" stroke="#22d3ee" opacity="0.25" />
        </g>

        {/* Port lights */}
        <g fill="#67e8f9">
          <circle cx="385" cy="220" r="2" />
          <circle cx="585" cy="185" r="2" />
          <circle cx="670" cy="355" r="2" />
          <circle cx="850" cy="250" r="2" />
        </g>
      </svg>

      {/* Main port */}
      <div
        className="
          absolute
          bottom-[7%]
          left-[37%]
          h-[245px]
          w-[390px]
          sm:left-[42%]
          lg:left-[47%]
          xl:left-[51%]
        "
      >
        {/* Port glow */}
        <div
          className="
            absolute
            bottom-0
            left-1/2
            h-40
            w-72
            -translate-x-1/2
            rounded-full
            bg-cyan-500/10
            blur-[70px]
          "
        />

        {/* Dock */}
        <div
          className="
            absolute
            bottom-0
            left-[5%]
            h-10
            w-[90%]
            -skew-x-12
            border-t
            border-cyan-300/30
            bg-gradient-to-r
            from-zinc-900
            via-zinc-800
            to-zinc-950
          "
        />

        {/* Container stacks */}
        <div className="absolute bottom-10 left-[17%] flex items-end gap-1">
          <div className="h-8 w-10 rounded-sm border border-cyan-400/20 bg-cyan-900/40" />
          <div className="h-11 w-10 rounded-sm border border-blue-400/20 bg-blue-900/40" />
          <div className="h-7 w-10 rounded-sm border border-cyan-400/20 bg-cyan-900/40" />
          <div className="h-12 w-10 rounded-sm border border-blue-400/20 bg-blue-900/40" />
          <div className="h-9 w-10 rounded-sm border border-cyan-400/20 bg-cyan-900/40" />
        </div>

        {/* Crane 1 */}
        <div className="absolute bottom-10 left-[2%] h-44 w-1 bg-cyan-300/40">
          <div className="absolute left-0 top-0 h-px w-36 bg-cyan-300/40" />
          <div className="absolute left-8 top-0 h-36 w-px origin-top rotate-[28deg] bg-cyan-300/25" />
          <div className="absolute left-[8.8rem] top-0 h-20 w-px bg-cyan-300/25" />
          <div className="absolute left-[8.8rem] top-[5rem] h-20 w-px border-l border-dashed border-cyan-300/30" />
        </div>

        {/* Crane 2 */}
        <div className="absolute bottom-10 left-[31%] h-36 w-1 bg-cyan-300/30">
          <div className="absolute left-0 top-0 h-px w-28 bg-cyan-300/30" />
          <div className="absolute left-6 top-0 h-28 w-px origin-top rotate-[26deg] bg-cyan-300/20" />
          <div className="absolute left-[7rem] top-0 h-16 w-px bg-cyan-300/20" />
        </div>

        {/* Port lights */}
        <div className="absolute bottom-12 left-[45%] h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.9)]" />
        <div className="absolute bottom-8 left-[64%] h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
        <div className="absolute bottom-14 left-[77%] h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.9)]" />
      </div>

      {/* Main container ship */}
      <div
        className="
          absolute
          bottom-[12%]
          left-[55%]
          h-[95px]
          w-[270px]
          lg:left-[58%]
          xl:left-[60%]
        "
      >
        {/* Ship hull */}
        <div
          className="
            absolute
            bottom-0
            left-0
            h-7
            w-full
            rounded-b-[45%]
            border-b
            border-cyan-300/30
            bg-gradient-to-r
            from-zinc-800
            via-zinc-700
            to-zinc-900
            [clip-path:polygon(0_0,100%_0,87%_100%,12%_100%)]
          "
        />

        {/* Containers */}
        <div className="absolute bottom-7 left-12 flex gap-1">
          <div className="h-9 w-10 rounded-sm border border-cyan-300/20 bg-cyan-900/50" />
          <div className="h-11 w-10 rounded-sm border border-blue-300/20 bg-blue-900/50" />
          <div className="h-8 w-10 rounded-sm border border-cyan-300/20 bg-cyan-900/50" />
          <div className="h-10 w-10 rounded-sm border border-blue-300/20 bg-blue-900/50" />
          <div className="h-7 w-10 rounded-sm border border-cyan-300/20 bg-cyan-900/50" />
        </div>

        {/* Bridge */}
        <div className="absolute bottom-7 right-7 h-9 w-9 rounded-sm border border-cyan-300/25 bg-zinc-700/60">
          <div className="absolute left-1/2 top-[-18px] h-[18px] w-px bg-cyan-300/30" />
        </div>

        {/* Water reflection */}
        <div className="absolute -bottom-4 left-5 h-px w-[90%] bg-cyan-400/20 blur-sm" />
      </div>

      {/* Secondary ship */}
      <div
        className="
          absolute
          bottom-[26%]
          left-[72%]
          hidden
          h-12
          w-32
          opacity-60
          lg:block
        "
      >
        <div className="absolute bottom-0 h-4 w-full rounded-b-full bg-zinc-700/60" />
        <div className="absolute bottom-4 left-7 h-6 w-12 border border-cyan-400/20 bg-cyan-900/40" />
        <div className="absolute bottom-4 left-20 h-5 w-7 border border-cyan-400/20 bg-cyan-900/40" />
      </div>

      {/* Live operational signal */}
      <div
        className="
          absolute
          right-[8%]
          top-[22%]
          hidden
          rounded-xl
          border
          border-cyan-400/20
          bg-black/70
          px-4
          py-3
          backdrop-blur-md
          lg:block
        "
      >
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">
            Live Network
          </span>
        </div>

        <p className="mt-2 text-xs text-zinc-300">
          Global operational signals
        </p>

        <div className="mt-2 h-1 w-28 overflow-hidden rounded-full bg-zinc-800">
          <div className="h-full w-[78%] rounded-full bg-cyan-400" />
        </div>
      </div>

      {/* Port risk node */}
      <div
        className="
          absolute
          right-[11%]
          top-[49%]
          hidden
          rounded-xl
          border
          border-yellow-400/20
          bg-black/70
          px-4
          py-3
          backdrop-blur-md
          lg:block
        "
      >
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
          <span className="text-xs font-medium text-white">
            Port Risk
          </span>
        </div>

        <div className="mt-2 flex items-end gap-2">
          <span className="text-xl font-semibold text-yellow-300">
            0.81
          </span>
          <span className="pb-1 text-[10px] uppercase tracking-wider text-zinc-500">
            Elevated
          </span>
        </div>
      </div>

      {/* Bottom fade into page */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-40
          bg-gradient-to-t
          from-black
          via-black/70
          to-transparent
        "
      />

      {/* Left fade protects hero text */}
      <div
        className="
          absolute
          inset-y-0
          left-0
          w-[65%]
          bg-gradient-to-r
          from-black
          via-black/90
          to-transparent
        "
      />
    </div>
  )
}

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">

      {/* Hero */}
      <section
        className="
          relative
          min-h-[780px]
          border-b
          border-zinc-900
        "
      >
        <SupplyChainVisual />

        {/* Navigation */}
        <nav
          className="
            relative
            z-20
            mx-auto
            flex
            max-w-7xl
            items-center
            justify-between
            px-6
            py-7
            md:px-10
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                border
                border-cyan-400/30
                bg-cyan-400/10
              "
            >
              <span
                className="
                  h-2.5
                  w-2.5
                  rounded-full
                  bg-cyan-400
                  shadow-[0_0_14px_rgba(34,211,238,0.9)]
                "
              />
            </div>

            <div>
              <span className="block text-sm font-semibold tracking-wide">
                Supply Chain AI
              </span>

              <span className="hidden text-[10px] uppercase tracking-[0.18em] text-cyan-400/70 sm:block">
                Operations Intelligence
              </span>
            </div>
          </div>

          <Link
            href="/login"
            className="
              rounded-xl
              border
              border-zinc-700
              bg-black/60
              px-4
              py-2
              text-sm
              text-zinc-300
              backdrop-blur-md
              transition
              hover:border-cyan-500/40
              hover:text-white
            "
          >
            Platform Access
          </Link>
        </nav>

        {/* Hero content */}
        <div
          className="
            relative
            z-10
            mx-auto
            max-w-7xl
            px-6
            pb-28
            pt-24
            md:px-10
            md:pt-28
          "
        >
          <div className="max-w-3xl">

            <div
              className="
                mb-7
                flex
                items-center
                gap-3
                text-xs
                font-medium
                uppercase
                tracking-[0.28em]
                text-cyan-400
              "
            >
              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-cyan-400
                  shadow-[0_0_12px_rgba(34,211,238,0.9)]
                "
              />

              AI Operations Intelligence Platform
            </div>

            <h1
              className="
                text-5xl
                font-semibold
                leading-[1.02]
                tracking-[-0.04em]
                sm:text-6xl
                md:text-7xl
                lg:text-8xl
              "
            >
              Predict.
              <br />

              <span className="text-zinc-500">
                Retrieve.
              </span>{" "}

              <span className="text-cyan-400">
                Explain.
              </span>
            </h1>

            <p
              className="
                mt-8
                max-w-3xl
                text-lg
                leading-8
                text-zinc-400
                md:text-xl
              "
            >
              An AI-powered supply chain operations platform
              that combines ML and deep learning predictions,
              real-time monitoring, and retrieval-augmented
              intelligence to explain disruption risk.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/login"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-xl
                  bg-cyan-400
                  px-6
                  py-3.5
                  text-sm
                  font-semibold
                  text-black
                  shadow-[0_0_30px_rgba(34,211,238,0.15)]
                  transition
                  hover:bg-cyan-300
                "
              >
                Enter Operations Platform

                <span className="ml-2">
                  →
                </span>
              </Link>

              <a
                href="#architecture"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-zinc-800
                  bg-black/60
                  px-6
                  py-3.5
                  text-sm
                  font-medium
                  text-zinc-300
                  backdrop-blur-md
                  transition
                  hover:border-zinc-700
                  hover:text-white
                "
              >
                Explore the System
              </a>
            </div>
          </div>

          {/* System status */}
          <div
            className="
              mt-20
              grid
              max-w-4xl
              grid-cols-2
              overflow-hidden
              rounded-2xl
              border
              border-zinc-800
              bg-black/70
              backdrop-blur-xl
              md:grid-cols-4
            "
          >
            {[
              ["ML-DL", "Risk Prediction"],
              ["RAG", "Historical Evidence"],
              ["WS", "Live Monitoring"],
              ["AI", "Operational Reasoning"],
            ].map(([value, label]) => (
              <div
                key={value}
                className="
                  border-b
                  border-zinc-800
                  p-5
                  last:border-b-0
                  md:border-b-0
                  md:border-r
                  md:last:border-r-0
                "
              >
                <p className="text-lg font-semibold text-cyan-400">
                  {value}
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem */}
      <section
        className="
          relative
          z-10
          border-b
          border-zinc-900
          bg-zinc-950/40
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-7xl
            gap-12
            px-6
            py-24
            md:grid-cols-2
            md:px-10
            md:py-28
          "
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-cyan-400">
              The Problem
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-5xl">
              Supply chain disruption is not a single-number problem.
            </h2>
          </div>

          <div className="text-base leading-8 text-zinc-400">
            <p>
              A risk score tells an operations team that
              something may go wrong. It does not explain
              why the risk is increasing or what historical
              events provide evidence for that conclusion.
            </p>

            <p className="mt-6">
              This platform connects predictive ML and deep
              learning with historical operational evidence,
              allowing users to move from{" "}
              <span className="text-white">
                prediction
              </span>{" "}
              to{" "}
              <span className="text-white">
                evidence
              </span>{" "}
              to{" "}
              <span className="text-cyan-400">
                operational insight
              </span>.
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-6
          py-24
          md:px-10
          md:py-32
        "
      >
        <div className="mb-14">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-cyan-400">
            Intelligence Pipeline
          </p>

          <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-5xl">
            From operational signals to decisions.
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-800 md:grid-cols-2">
          {capabilities.map((item) => (
            <div
              key={item.number}
              className="
                bg-black
                p-8
                transition
                hover:bg-zinc-950
                md:p-10
              "
            >
              <div className="flex items-start justify-between">
                <span className="text-xs tracking-widest text-zinc-600">
                  {item.number}
                </span>

                <span className="text-cyan-400">
                  ↗
                </span>
              </div>

              <h3 className="mt-12 text-2xl font-semibold">
                {item.title}
              </h3>

              <p className="mt-4 max-w-md text-sm leading-7 text-zinc-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture */}
      <section
        id="architecture"
        className="
          relative
          z-10
          border-y
          border-zinc-900
          bg-zinc-950/40
        "
      >
        <div
          className="
            mx-auto
            max-w-7xl
            px-6
            py-24
            md:px-10
            md:py-32
          "
        >
          <div className="mb-14">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-cyan-400">
              System Architecture
            </p>

            <h2 className="mt-5 text-3xl font-semibold md:text-5xl">
              Multiple AI layers.
              <br />
              One operational system.
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-black">
            {[
              {
                layer: "01",
                title: "Operational Data",
                text: "Port congestion, shipment delays, weather signals, historical incidents, and operational events.",
              },
              {
                layer: "02",
                title: "ML-DL Prediction",
                text: "Machine learning and deep learning models, including LSTM-based forecasting, transform operational signals into disruption-risk predictions.",
              },
              {
                layer: "03",
                title: "RAG Retrieval",
                text: "Historical incidents are embedded and retrieved using semantic similarity to provide relevant evidence.",
              },
              {
                layer: "04",
                title: "Generative AI",
                text: "Retrieved evidence and current operational context are combined to generate grounded explanations.",
              },
              {
                layer: "05",
                title: "Decision Interface",
                text: "A real-time web application exposes predictions, evidence, alerts, timelines, and operational intelligence.",
              },
            ].map((item) => (
              <div
                key={item.layer}
                className="
                  grid
                  gap-4
                  border-b
                  border-zinc-900
                  p-7
                  last:border-b-0
                  md:grid-cols-[100px_240px_1fr]
                  md:items-center
                  md:p-8
                "
              >
                <span className="text-xs tracking-widest text-cyan-400">
                  LAYER {item.layer}
                </span>

                <h3 className="font-semibold text-white">
                  {item.title}
                </h3>

                <p className="text-sm leading-7 text-zinc-500">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology */}
      <section
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-6
          py-24
          md:px-10
          md:py-32
        "
      >
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-cyan-400">
              Technology
            </p>

            <h2 className="mt-5 text-3xl font-semibold md:text-5xl">
              Built across the full AI engineering stack.
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-zinc-500">
              The platform is engineered across data,
              machine learning, deep learning, retrieval,
              backend services, real-time communication,
              frontend systems, and cloud infrastructure.
            </p>
          </div>

          <div className="flex flex-wrap content-start gap-3">
            {technologies.map((technology) => (
              <span
                key={technology}
                className="
                  rounded-xl
                  border
                  border-zinc-800
                  bg-zinc-950
                  px-4
                  py-2.5
                  text-sm
                  text-zinc-400
                  transition
                  hover:border-cyan-500/30
                  hover:text-cyan-300
                "
              >
                {technology}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="
          relative
          z-10
          border-t
          border-zinc-900
        "
      >
        <div
          className="
            mx-auto
            max-w-7xl
            px-6
            py-24
            text-center
            md:px-10
            md:py-32
          "
        >
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-cyan-400">
            Operational Intelligence
          </p>

          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
            See the system in operation.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-500">
            Explore live disruption prediction,
            historical retrieval, RAG-powered reasoning,
            alerts, and real-time operational events.
          </p>

          <Link
            href="/login"
            className="
              mt-9
              inline-flex
              items-center
              rounded-xl
              bg-cyan-400
              px-7
              py-3.5
              text-sm
              font-semibold
              text-black
              transition
              hover:bg-cyan-300
            "
          >
            Enter Platform

            <span className="ml-2">
              →
            </span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="
          relative
          z-10
          border-t
          border-zinc-900
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            gap-3
            px-6
            py-8
            text-xs
            text-zinc-600
            md:flex-row
            md:items-center
            md:justify-between
            md:px-10
          "
        >
          <span>
            AI Supply Chain Operations Platform
          </span>

          <span>
            Predict · Retrieve · Explain · Monitor
          </span>
        </div>
      </footer>
    </main>
  )
}