import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Supply Chain Operations Dashboard",
  description:
    "AI-powered operational intelligence dashboard",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}