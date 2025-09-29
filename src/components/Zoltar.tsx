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
      <div className="w-[160px] md:w-[200px] mx-auto text-white">
        <AFILogo />
      </div>
      <button
        className="cursor-pointer max-w-[450px] pt-4 px-5"
        onClick={handleTransition}
      >
        <Image src="/mystic.png" width={1080} height={1920} alt="" />
      </button>
    </div>
  )
}
