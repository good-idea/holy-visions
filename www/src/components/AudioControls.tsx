import React, { FC } from 'react'
import { cn } from '@/utils'

type AudioControlsProps = {
  isPlaying: boolean
  onTogglePlayPause: () => void
}

const PlayIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="6 3 20 12 6 21 6 3" />
  </svg>
)

const PauseIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
)

export const AudioControls: FC<AudioControlsProps> = ({
  isPlaying,
  onTogglePlayPause,
}) => {
  return (
    <button
      onClick={onTogglePlayPause}
      className={cn(
        'w-9 h-9 md:w-12 md:h-12 rounded-full',
        'bg-black/70 hover:bg-black/90',
        'text-white',
        'flex items-center justify-center',
        'transition-all duration-200',
        'hover:scale-110',
        'backdrop-blur-sm',
        'border border-white/20',
      )}
      aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
    >
      {isPlaying ? (
        <PauseIcon className="w-5 h-5" />
      ) : (
        <PlayIcon className="w-5 h-5" />
      )}
    </button>
  )
}
