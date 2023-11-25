import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'

import styles from "./Layout.module.css";
import NavBar from '@/components/Navigation/NavBar';
const inter = Inter({ subsets: ['latin'] })

// TODO: Figure out SEOs and stuff
// See https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export const metadata = {
  title: 'tglanz',
  description: 'Personal site',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${styles.body}`}>
        <header className={styles.header}>
          <NavBar />
        </header>
        <main className={styles.main}>
          {children}
        </main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  )
}
