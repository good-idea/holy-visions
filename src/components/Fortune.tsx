import React, { FC, useState, useEffect } from 'react'
import Image from 'next/image'

const FORTUNE_MIN = 1
const FORTUNE_MAX = 19

const getRandomFortune = (): string => {
  const num = Math.floor(Math.random() * FORTUNE_MAX) + FORTUNE_MIN
  return `/fortunes/AFIVisionCards_Final_${num.toString().padStart(2, '0')}.jpg`
}

type FortuneProps = {
  onClickEmbedCta: () => void
}

export const Fortune: FC<FortuneProps> = (props) => {
  const randomFortune = React.useRef<string>(getRandomFortune())
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => setIsMounted(true), [])
  if (!isMounted) return null
  return (
    <div className="px-2 w-full flex flex-col items-center">
      <Image
        className="max-h-[75dvh] object-contain"
        src={randomFortune.current}
        width={1080}
        height={1920}
        alt="Your fortune"
      />
      <div className="flex flex-col mt-2 gap-3 my-2.5">
        <a
          className="uppercase bg-black text-white rounded-3xl px-4 text-sm"
          download
          href={randomFortune.current}
        >
          Download Your Vision
        </a>
        <button
          className="uppercase cursor-pointer bg-black text-white rounded-3xl px-4 text-sm"
          onClick={props.onClickEmbedCta}
        >
          Pre-save the Album
        </button>
      </div>
    </div>
  )
}
