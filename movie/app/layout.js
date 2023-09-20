import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DB Moive',
  description: 'A webstie helps you find movies.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel='icon' href='/pig.svg' sizes='any'/>
      </head>
      <body className={`${inter.className}`}>
        <div className=' bg-slate-100 py-5  md: px-3'>
          <Header />
        </div>
        {children}
      </body>
    </html>
  )
}
