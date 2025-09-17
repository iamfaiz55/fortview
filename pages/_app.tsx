import type { AppProps } from 'next/app'
import '../app/globals.css'
import { PerformanceMonitor } from '@/components/PerformanceMonitor'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <PerformanceMonitor />
      <Component {...pageProps} />
    </>
  )
}
