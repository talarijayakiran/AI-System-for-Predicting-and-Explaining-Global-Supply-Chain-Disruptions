import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title:
    "AI Supply Chain Operations Platform",
  description:
    "AI-powered supply chain disruption prediction, retrieval, and operational intelligence.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  )
}