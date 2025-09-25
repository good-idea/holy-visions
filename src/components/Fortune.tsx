import React, { FC } from 'react'
import Image from 'next/image'

const getRandomFortune = (min: number, max: number): string => {
  const num = Math.floor(Math.random() * max) + min
  return `/fortunes/${num.toString().padStart(2, '0')}.jpg`
}

export const Fortune: FC = () => {
  const randomFortune = React.useRef<string>(getRandomFortune(1, 1))
  return (
    <div className="px-2 w-full flex flex-col items-center">
      <Image
        className="max-h-[75dvh] object-contain"
        src={randomFortune.current}
        width={1080}
        height={1920}
        alt=""
      />
      <a
        className="bg-black text-white rounded-3xl my-2.5 px-3 text-sm"
        download
        href={randomFortune.current}
      >
        Download Your Fortune
      </a>
    </div>
  )
}
