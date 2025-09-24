'use client'
import Image from 'next/image'

import { ArtDecoBorder } from '@/components/ArtDecoBorder'
import { SmokeEffect } from '@/components/SmokeEffect'
import { cn } from '@/utils'
import { useAnimationTimeline } from '@/state'
import { Zoltar } from '@/components/Zoltar'
import { Fortune } from '@/components/Fortune'

// start
//
// bg         black->pink                     +--------------------------------------------+
// zoltar     visible->hidden                 +----------------+
// smoke      hidden->visible->hidden         +----------------------+---------------------+
// fortune    hidden->visible                                             +----------------+

export default function Home() {
  const { styles, handleClick } = useAnimationTimeline({
    duration: 8000, // 6 second animation
  })

  return (
    <div
      style={styles.background}
      className={cn('h-full flex flex-col items-center', 'p-4 md:p-9')}
    >
      <div className="fixed mix-blend-difference z-[100] pt:4 md:pt-9 top-0 w-full flex justify-center pointer-none">
        <Image
          className="w-15 md:w-20"
          src="/afi-logo-white-600.png"
          alt="AFI Logo"
          width={600}
          height={271}
        />
      </div>

      <div className="fixed top-0 w-full h-full pt-20" style={styles.zoltar}>
        <Zoltar handleTransition={handleClick} />
      </div>
      <div
        className="fixed top-0 w-full h-full pointer-none"
        style={styles.smoke}
      >
        <SmokeEffect />
      </div>
      <div className="fixed top-0 w-full h-full pt-20" style={styles.fortune}>
        <Fortune />
      </div>
    </div>
  )
}
