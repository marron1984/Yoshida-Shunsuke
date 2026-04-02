import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Yoshida Shunsuke OS',
  description: '対話型意思決定OS',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className="dark h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  )
}
