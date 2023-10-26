import { SessionProvider } from 'next-auth/react'
import '@/styles/globals.css'
import { IBM_Plex_Sans_Thai } from 'next/font/google'
const IBM = IBM_Plex_Sans_Thai({ 
  subsets: ['thai'],
  weight: ['100','200','300','400','500','600','700'],
  variable: '--font-ibm'
 })
import Navbar from '@/components/navigation'
import Footer from '@/components/footer'
import Head from 'next/head'

export default function App({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>ระบบจองห้องประชุม</title>
      </Head>
      <main className={IBM.variable}>
        <Navbar/>
        <Component {...pageProps} />
        <Footer/>
      </main>

    </SessionProvider>
  )
}
