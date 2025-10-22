
import type { Metadata } from 'next'
import './globals.css'
import { NavBar } from '../components/NavBar'
import { Footer } from '../components/Footer'

export const metadata: Metadata = {
  title: 'Zach Baskin',
  description: 'Projects, resume, and film reviews.',
  openGraph: {
    title: 'Zach Baskin — Portfolio',
    description: 'Projects, resume, and film reviews.',
    images: ['/og.jpg']
  },
  icons: {
    icon: [
      { url: '/z.png' },
    ],
  },
  metadataBase: new URL('https://zachbaskin.com')
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b">
          <div className="container-shell">
            <NavBar />
          </div>
        </header>
        <main className="container-shell py-10">
          {children}
        </main>
        <footer className="mt-16 border-t">
          <div className="container-shell py-8">
            <Footer />
          </div>
        </footer>
      </body>
    </html>
  )
}
