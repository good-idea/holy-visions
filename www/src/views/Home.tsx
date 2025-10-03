'use client'
import { useState, useRef, use } from 'react'
import { SmokeEffect } from '@/components/SmokeEffect'
import { cn } from '@/utils'
import { useTransitionStyles } from '@/state'
import { useAudio } from '@/hooks/useAudio'
import { Zoltar } from '@/components/Zoltar'
import { Fortune } from '@/components/Fortune'
import { AudioControls } from '@/components/AudioControls'
import { STATIC_BASE_URL } from '@/config'

const AUDIO_URL = `${STATIC_BASE_URL}/holy-visions-loop.mp3`



const getRandomFortune = (max: number): number => {
  return Math.floor(Math.random() * max) + 1
}

export function Home() {
  const randomVision = useRef<number>(
    getRandomFortune(16),
  )
  const isWinningFortune = randomVision.current === 17

  const { styles, beginTransition } = useTransitionStyles({
    duration: 8000,
  })
  const { audioState, playAudio, pauseAudio } = useAudio(AUDIO_URL)
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
      style={{
        ...styles.background,
        backgroundColor: isWinningFortune
          ? 'black'
          : styles.background.backgroundColor,
      }}
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
          <Fortune
            onClickEmbedCta={showEmbed}
            randomVision={randomVision.current}
            isWinningVision={randomVision.current === 17}
          />
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

      <div className="fixed bottom-3 right-3 md:bottom-6 md:right-6 z-50">
        <AudioControls
          isPlaying={audioState.isPlaying}
          onTogglePlayPause={togglePlayPause}
        />
      </div>
    </div>
  )
}
