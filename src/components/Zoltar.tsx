import React, { FC } from 'react'
import Image from 'next/image'

import { cn } from '@/utils'
import { AFILogo } from '@/svg/afiLogo'

type ZoltarProps = {
  handleTransition: () => void
}

export const Zoltar: FC<ZoltarProps> = ({ handleTransition }) => {
  return (
    <div className="pt-5">
      <div className="w-[160px] md:w-[200px] mx-auto">
        <AFILogo />
      </div>

      <div className="mt-[-5%] mb-[-10%]">
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
      <div className={cn('pb-4 px-3 flex flex-col items-center')}>
        <Image
          className="w-[400px] md:w-[600px]"
          src="/zoltar.png"
          alt="Zoltar"
          width={220}
          height={178}
        />
        <div className="text-xl md:text-2xl">5¢</div>
        <div className="pt-6 md:pt-10 flex flex-col items-center">
          <div className="text-md md:text-xl pb-2 md:pb-3">Insert Coin</div>
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
