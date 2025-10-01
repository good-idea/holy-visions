import { useState, useCallback, useRef, useEffect } from 'react'

export type AnimationStyles = {
  background: React.CSSProperties
  zoltar: React.CSSProperties
  smoke: React.CSSProperties
  fortune: React.CSSProperties
  [key: string]: React.CSSProperties
}

type StyleTransition = { time: number; style: React.CSSProperties }

type ElementConfig = {
  duration: number
  styleTransitions: StyleTransition[]
  transitionProperties: string
  initialStyles?: React.CSSProperties
}

const CONFIG: Record<string, ElementConfig> = {
  background: {
    duration: 1,
    transitionProperties: 'background-color',
    styleTransitions: [{ time: 0, style: { backgroundColor: '#e68699' } }],
  },
  zoltar: {
    duration: 0.5,
    transitionProperties: 'opacity, transform',
    styleTransitions: [
      {
        time: 0,
        style: { opacity: 0, transform: 'scale(0.925)', pointerEvents: 'none' },
      },
      { time: 0.5, style: { opacity: 0, display: 'none' } },
    ],
  },
  smoke: {
    duration: 0.5,
    transitionProperties: 'opacity',
    initialStyles: { opacity: 0.5 },
    styleTransitions: [{ time: 0.5, style: { opacity: 0 } }],
  },
  fortune: {
    duration: 0.4,
    transitionProperties: 'opacity, transform',
    initialStyles: {
      opacity: 0,
      display: 'none',
      transform: 'translateY(1.5rem)',
    },
    styleTransitions: [
      { time: 0.5, style: { display: 'block' } },
      {
        time: 0.6,
        style: {
          display: 'block',
          transform: 'translateY(0)',
          opacity: 1,
        },
      },
    ],
  },
} as const

type UseTransitionStylesOptions = {
  duration: number
}

const getInitialStyle = (
  duration: number,
  element: keyof typeof CONFIG,
): React.CSSProperties => {
  const elementConfig = CONFIG[element]
  const initialStyles = elementConfig.initialStyles || {}
  return {
    transitionProperty: elementConfig.transitionProperties,
    transitionDuration: `${Math.round(duration * elementConfig.duration)}ms`,
    transitionTimingFunction: 'ease-in-out',
    // transition: `${elementConfig.transitionProperties} ${Math.round(duration * elementConfig.duration)}ms`,
    ...initialStyles,
  }
}

const getInitialStyles = (duration: number): AnimationStyles => {
  return {
    background: getInitialStyle(duration, 'background'),
    zoltar: getInitialStyle(duration, 'zoltar'),
    smoke: getInitialStyle(duration, 'smoke'),
    fortune: getInitialStyle(duration, 'fortune'),
  }
}
type TransitionConfig = {
  startTime: number
  key: string
  newStyles: React.CSSProperties
}

const getAllTransitions = (duration: number): TransitionConfig[] => {
  return Object.entries(CONFIG).reduce<TransitionConfig[]>(
    (prev, [key, value]) => {
      const stylesForElement: TransitionConfig[] = value.styleTransitions.map(
        (styleTransition) => {
          return {
            key,
            startTime: styleTransition.time * duration,
            newStyles: styleTransition.style,
          }
        },
      )
      return [...prev, ...stylesForElement]
    },
    [],
  )
}

export const useTransitionStyles = ({
  duration,
}: UseTransitionStylesOptions) => {
  const [styles, setStyles] = useState<AnimationStyles>(
    getInitialStyles(duration),
  )

  const timeoutRefs = useRef<NodeJS.Timeout[]>([])

  // Clear all timeouts when component unmounts or animation resets
  const clearTimeouts = useCallback(() => {
    timeoutRefs.current.forEach((timeout) => clearTimeout(timeout))
    timeoutRefs.current = []
  }, [])

  useEffect(() => {
    return clearTimeouts // Cleanup on unmount
  }, [clearTimeouts])

  const beginTransition = () => {
    clearTimeouts()

    const transitions = getAllTransitions(duration)

    transitions.forEach((transition) => {
      const timeout = setTimeout(() => {
        setStyles((prevStyles) => {
          return {
            ...prevStyles,
            [transition.key]: {
              ...prevStyles[transition.key],
              ...transition.newStyles,
            },
          }
        })
      }, transition.startTime)
      timeoutRefs.current.push(timeout)
    })
  }

  return { styles, beginTransition }
}
