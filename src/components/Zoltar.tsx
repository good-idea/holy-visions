import React, { FC } from 'react'
import Image from 'next/image'

import { cn } from '@/utils'

type ZoltarProps = {
  handleTransition: () => void
}

export const Zoltar: FC<ZoltarProps> = ({ handleTransition }) => {
  return (
    <div className="pt-8 md:pt-12">
      <div className="mt-[-5rem] mb-[-5rem]">
        <svg viewBox="0 0 400 150">
          <path
            id="arcPath"
            d="M 50,120
             A 150,50 0 0,1 350,120"
            fill="none"
            stroke="none"
          />

          <text fontSize="40" stroke="none" fill="currentColor">
            <textPath href="#arcPath" startOffset="50%" textAnchor="middle">
              Holy Visions
            </textPath>
          </text>
        </svg>
      </div>
      <h1 className="hidden text-3xl md:text-3xl arced-text text-center">
        {'Holy Visions'.split('').map((char, index) => (
          <span key={index}>{char}</span>
        ))}
      </h1>
      <div className={cn('py-4 px-3 flex flex-col items-center')}>
        <Image
          className="w-[400px] md:w-[600px]"
          src="/zoltar.png"
          alt="Zoltar"
          width={220}
          height={178}
        />
        <div className="text-2xl md:text-3xl">5¢</div>
        <div className="pt-6 md:pt-10 flex flex-col items-center">
          <div className="md:text-xl pb-2 md:pb-3">Insert Coin</div>
          <button
            onClick={handleTransition}
            className={cn(
              'w-[80px] h-[80px] bg-pink border-1 px-6 py-3',
              'cursor-pointer flex justify-center',
            )}
          >
            <div className="w-[12px] h-full bg-background" />
          </button>
        </div>
      </div>
    </div>
  )
}
