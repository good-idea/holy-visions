'use client'
import { useState } from 'react'
import { SmokeEffect } from '@/components/SmokeEffect'
import { cn } from '@/utils'
import { useTransitionStyles } from '@/state'
import { useAudio } from '@/hooks/useAudio'
import { Zoltar } from '@/components/Zoltar'
import { Fortune } from '@/components/Fortune'
import { AudioControls } from '@/components/AudioControls'

export default function Home() {
  const { styles, beginTransition } = useTransitionStyles({ duration: 8000 })
  const { audioState, playAudio, pauseAudio } = useAudio(
    '/holy-visions-loop.mp3',
  )
  const [embedIsVisible, setEmbedIsVisible] = useState(false)

  const showEmbed = () => setEmbedIsVisible(true)

  const beginTransitionAndPlayAudio = () => {
    beginTransition()
    playAudio()
  }

  const togglePlayPause = () => {
    if (audioState.isPlaying) {
      pauseAudio()
    } else {
      playAudio()
    }
  }

  return (
    <div
      id="background"
      style={styles.background}
      className={cn(
        'flex flex-col items-center h-[100dvh] overflow-scroll',
        'p-4 md:p-9',
      )}
    >
      <div className={cn(embedIsVisible ? 'hidden' : 'block')}>
        <div id="zoltar" style={styles.zoltar}>
          <Zoltar handleTransition={beginTransitionAndPlayAudio} />
        </div>
        <div
          id="smoke"
          style={styles.smoke}
          className="fixed top-0 left-0 w-full h-full pointer-events-none mix-blend-lighten"
        >
          <SmokeEffect />
        </div>
        <div
          id="fortune"
          className="top-0 left-0 w-full h-full pt-5"
          style={styles.fortune}
        >
          <Fortune onClickEmbedCta={showEmbed} />
        </div>
      </div>
      <div
        id="embed"
        className={cn(
          'w-full h-full pt-5 flex justify-center items-center',
          embedIsVisible ? 'block' : 'hidden',
        )}
      >
        <div className="sonikit-patch" data-id="68d5d2d99edd26453cd09250" />
      </div>

      <AudioControls
        isPlaying={audioState.isPlaying}
        onTogglePlayPause={togglePlayPause}
      />
    </div>
  )
}
