import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'AFI | Holy Visions',
  description: 'Your Holy Vision awaits…',
  icons: {
    icon: '/favicon.jpg',
    shortcut: '/favicon.jpg',
    apple: '/favicon.jpg',
    other: {
      rel: '/favicon.jpg',
      url: '/favicon.jpg',
    },
  },
  openGraph: {
    images: '/opengraph.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://js.sonikit.com/v1/embed.js?key=68d5ca1a9edd26453cd07cd0"
          type="module"
        />
        <link rel="stylesheet" href="https://use.typekit.net/pwk4hoh.css" />
      </head>
      <body className="bg-black overflow-hidden">{children}</body>
    </html>
  )
}
