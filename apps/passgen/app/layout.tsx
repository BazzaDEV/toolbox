import type { Metadata } from 'next'
import './globals.css'
import '@repo/ui/globals.css'
import { berkeleyMono } from '@/lib/fonts'
import { Toaster } from '@repo/ui/sonner'

export const metadata: Metadata = {
  title: `Password Generator | Bazza's Toolbox`,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${berkeleyMono.variable} font-mono antialiased h-screen w-screen bg-neutral-50/75`}
      >
        <div className='sm:p-12 p-4 mx-auto max-w-screen-sm'>{children}</div>
        <Toaster
          richColors
          className='font-mono'
        />
      </body>
    </html>
  )
}
