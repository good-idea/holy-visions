import { useState, useCallback, useRef, useEffect } from 'react'

// Default options
const DEFAULT_OPTIONS: Required<UseAnimationTimelineOptions> = {
  duration: 4500,
}

// Animation transition timing constants (as percentage of total duration)
const TRANSITION_TIMES = {
  background: { start: 0, end: 1 },
  zoltar: { start: 0.2, end: 0.5 },
  smoke: { start: 0, middle: 0.5, end: 1 },
  fortune: { start: 0.5, end: 1 },
} as const

export interface AnimationState {
  background: 'black' | 'pink'
  zoltar: 'visible' | 'hidden'
  smoke: 'hidden' | 'visible'
  fortune: 'hidden' | 'visible'
}

export interface AnimationStyles {
  background: React.CSSProperties
  zoltar: React.CSSProperties
  smoke: React.CSSProperties
  fortune: React.CSSProperties
}

export interface UseAnimationTimelineReturn {
  /** Current animation state */
  state: AnimationState
  /** CSS styles for each element */
  styles: AnimationStyles
  /** Click handler to trigger the animation sequence */
  handleClick: () => void
}

export interface UseAnimationTimelineOptions {
  /** Overall duration of the animation in milliseconds (default: 4500ms) */
  duration?: number
}

export const useAnimationTimeline = (
  options: UseAnimationTimelineOptions = {},
): UseAnimationTimelineReturn => {
  const { duration } = { ...DEFAULT_OPTIONS, ...options }
  const [state, setState] = useState<AnimationState>({
    background: 'black',
    zoltar: 'visible',
    smoke: 'hidden',
    fortune: 'hidden',
  })

  const timeoutRefs = useRef<NodeJS.Timeout[]>([])

  // Clear all timeouts when component unmounts or animation resets
  const clearTimeouts = useCallback(() => {
    timeoutRefs.current.forEach((timeout) => clearTimeout(timeout))
    timeoutRefs.current = []
  }, [])

  useEffect(() => {
    return clearTimeouts // Cleanup on unmount
  }, [clearTimeouts])

  const handleClick = useCallback(() => {
    clearTimeouts()

    // Reset to initial state first
    setState({
      background: 'black',
      zoltar: 'visible',
      smoke: 'hidden',
      fortune: 'hidden',
    })

    // Calculate timing based on transition constants
    const backgroundStartTime = Math.round(
      duration * TRANSITION_TIMES.background.start,
    )
    const zoltarHideTime = Math.round(duration * TRANSITION_TIMES.zoltar.start)
    const smokeShowTime = Math.round(duration * TRANSITION_TIMES.smoke.start)
    const smokeHideTime = Math.round(duration * TRANSITION_TIMES.smoke.middle)
    const fortuneShowTime = Math.round(
      duration * TRANSITION_TIMES.fortune.start,
    )

    const timeouts: NodeJS.Timeout[] = []

    // Background transition (black->pink)
    timeouts.push(
      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          background: 'pink',
        }))
      }, backgroundStartTime),
    )

    // Zoltar transition (visible->hidden)
    timeouts.push(
      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          zoltar: 'hidden',
        }))
      }, zoltarHideTime),
    )

    // Smoke show transition (hidden->visible)
    timeouts.push(
      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          smoke: 'visible',
        }))
      }, smokeShowTime),
    )

    // Smoke hide transition (visible->hidden)
    timeouts.push(
      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          smoke: 'hidden',
        }))
      }, smokeHideTime),
    )

    // Fortune show transition (hidden->visible)
    timeouts.push(
      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          fortune: 'visible',
        }))
      }, fortuneShowTime),
    )

    timeoutRefs.current = timeouts
  }, [clearTimeouts, duration])

  // Generate CSS styles based on current state and duration
  const styles: AnimationStyles = {
    background: {
      backgroundColor: state.background === 'black' ? '#000000' : '#e68699',
      transition: `background-color ${Math.round(duration * (TRANSITION_TIMES.background.end - TRANSITION_TIMES.background.start))}ms ease-in-out`,
    },
    zoltar: {
      opacity: state.zoltar === 'visible' ? 1 : 0,
      pointerEvents: state.zoltar === 'visible' ? 'auto' : 'none',
      transform: state.zoltar === 'visible' ? 'scale(1)' : 'scale(0.9)',
      transition: `all ${Math.round(duration * (TRANSITION_TIMES.zoltar.end - TRANSITION_TIMES.zoltar.start))}ms ease-in-out`,
    },
    smoke: {
      opacity: state.smoke === 'visible' ? 1 : 0,
      pointerEvents: state.smoke === 'visible' ? 'auto' : 'none',
      transition: `all ${Math.round(duration * (TRANSITION_TIMES.smoke.middle - TRANSITION_TIMES.smoke.start))}ms ease-in-out`,
    },
    fortune: {
      opacity: state.fortune === 'visible' ? 1 : 0,
      transform:
        state.fortune === 'visible' ? 'translateY(0)' : 'translateY(16px)',
      pointerEvents: state.fortune === 'visible' ? 'auto' : 'none',
      transition: `all ${Math.round(duration * (TRANSITION_TIMES.fortune.end - TRANSITION_TIMES.fortune.start))}ms ease-in-out`,
    },
  }

  return {
    state,
    styles,
    handleClick,
  }
}
