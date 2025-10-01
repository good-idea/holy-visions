import React, { FC } from 'react'
import Image from 'next/image'
import { cn } from '@/utils'
import { AFILogo } from '@/svg/afiLogo'

type ZoltarProps = {
  handleTransition: () => void
}

export const Zoltar: FC<ZoltarProps> = ({ handleTransition }) => {
  return (
    <div className={cn('pt-5', 'flex flex-col items-center justify-center')}>
      <div className={cn('w-[160px] md:w-[200px] mx-auto text-white')}>
        <AFILogo />
      </div>
      <button
        className="cursor-pointer max-w-[450px] px-5 pt-4 flex justify-center"
        onClick={handleTransition}
      >
        <Image src="/mystic.png" width={1080} height={1920} alt="" />
      </button>
      <button
        className="cursor-pointer bg-purple text-white rounded-3xl px-4 text-sm"
        onClick={handleTransition}
      >
        Reveal your vision
      </button>
    </div>
  )
}
