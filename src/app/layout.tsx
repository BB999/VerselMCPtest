import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vercel MCP Server',
  description: 'A simple MCP server that says hello to Vercel',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}