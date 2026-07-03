import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Nexa AI Systems | AI-Powered Business Solutions',
    template: '%s | Nexa AI Systems',
  },
  description: 'Transform your business with cutting-edge AI solutions. Smart inquiry management, AI chatbots, data analytics, and business automation services.',
  keywords: ['AI solutions', 'business automation', 'chatbot', 'data analytics', 'digital transformation', 'machine learning'],
  authors: [{ name: 'Nexa AI Systems' }],
  creator: 'Nexa AI Systems',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Nexa AI Systems',
    title: 'Nexa AI Systems | AI-Powered Business Solutions',
    description: 'Transform your business with cutting-edge AI solutions.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexa AI Systems | AI-Powered Business Solutions',
    description: 'Transform your business with cutting-edge AI solutions.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
