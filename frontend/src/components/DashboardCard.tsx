type Props = {
  title: string
  value: string | number
}

export default function DashboardCard({
  title,
  value
}: Props) {
  return (
    <div className="
      rounded-2xl
      bg-zinc-900
      border
      border-zinc-800
      p-6
      shadow-lg
    ">
      <p className="text-sm text-zinc-400 mb-2">
        {title}
      </p>

      <h2 className="text-3xl font-bold text-white">
        {value}
      </h2>
    </div>
  )
}