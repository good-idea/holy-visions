import React, { FC, useState, useEffect, use } from 'react'
import { STATIC_BASE_URL } from '@/config'
import Image from 'next/image'
import { cn } from '@/utils'

const getFortuneUrl = (num: number): string => {
  return `/fortunes/AFIVisionCards_Final_${num.toString().padStart(2, '0')}.jpg`
}

const getCloudFrontUrl = (localPath: string): string => {
  if (localPath.startsWith('/fortunes/')) {
    const cloudFrontUrl = STATIC_BASE_URL
    const imagePath = localPath.substring(1) // removes the leading '/'
    return `${cloudFrontUrl}/${imagePath}`
  }
  return localPath
}

type FortuneProps = {
  onClickEmbedCta: () => void
  randomVision: number
  isWinningVision: boolean
}

export const Fortune: FC<FortuneProps> = ({
  onClickEmbedCta,
  randomVision,
  isWinningVision,
}) => {
  const randomFortuneSrc = getFortuneUrl(randomVision)
  const downloadUrl = React.useRef<string>(getCloudFrontUrl(randomFortuneSrc))

  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => setIsMounted(true), [])
  if (!isMounted) return null

  const buttonStyles = cn(
    'uppercase cursor-pointer rounded-3xl px-4 text-center text-sm',
    isWinningVision ? 'bg-pink text-black' : 'bg-black text-white',
  )

  return (
    <div className="px-2 w-full flex flex-col items-center">
      <Image
        className="max-h-[75dvh] object-contain"
        src={randomFortuneSrc}
        width={1080}
        height={1920}
        alt="Your fortune"
      />
      <div className="flex flex-col mt-2 gap-3 my-2.5">
        {isWinningVision ? (
          <p className="text-sm text-center max-w-[390px]">
            Download your vision and email{' '}
            <a href="mailto:info@velvethammer.net">info@velvethammer.net</a> to
            claim your prize
          </p>
        ) : null}
        <a className={buttonStyles} download href={downloadUrl.current}>
          Download Your Vision
        </a>
        <button className={buttonStyles} onClick={onClickEmbedCta}>
          Pre-save the Album
        </button>
      </div>
    </div>
  )
}
