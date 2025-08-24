// app/layout.tsx
import './globals.css'

export const metadata = {
  title: 'thebiolink.lol',
  description: 'Your digital identity, simplified.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div id="__next">{children}</div>
      </body>
    </html>
  )
}
