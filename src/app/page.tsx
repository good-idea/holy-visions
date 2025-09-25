'use client'
import { SmokeEffect } from '@/components/SmokeEffect'
import { cn } from '@/utils'
import { useTransitionStyles } from '@/state'
import { Zoltar } from '@/components/Zoltar'
import { Fortune } from '@/components/Fortune'

export default function Home() {
  const { styles, beginTransition } = useTransitionStyles({ duration: 8000 })

  return (
    <div
      id="background"
      style={styles.background}
      className={cn(
        'flex flex-col items-center h-[100dvh] overflow-scroll',
        'p-4 md:p-9',
      )}
    >
      <div id="zoltar" style={styles.zoltar}>
        <Zoltar handleTransition={beginTransition} />
      </div>
      <div
        id="smoke"
        style={styles.smoke}
        className="fixed top-0 w-full h-full pointer-events-none mix-blend-lighten"
      >
        <SmokeEffect />
      </div>
      <div
        id="fortune"
        className="top-0 w-full h-full pt-5"
        style={styles.fortune}
      >
        <Fortune />
      </div>
    </div>
  )
}
