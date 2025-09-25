'use client'
import Image from 'next/image'

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
      <div className="mix-blend-difference z-[100] top-0 w-full flex justify-center pointer-none">
        <Image
          className="w-20 md:w-30"
          src="/afi-logo-white-600.png"
          alt="AFI Logo"
          width={600}
          height={271}
        />
      </div>

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
