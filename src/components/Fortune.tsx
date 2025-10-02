import React, { FC, useState, useEffect } from 'react'
import Image from 'next/image'

const FORTUNE_MIN = 1
const FORTUNE_MAX = 16

const getRandomFortune = (): string => {
  const num = Math.floor(Math.random() * FORTUNE_MAX) + FORTUNE_MIN
  return getFortuneUrl(num)
}

const getFortuneUrl = (num: number): string => {
  return `/fortunes/AFIVisionCards_Final_${num.toString().padStart(2, '0')}.jpg?v=2`
}

const getCloudFrontUrl = (localPath: string): string => {
  if (localPath.startsWith('/fortunes/')) {
    const cloudFrontUrl =
      process.env.NEXT_PUBLIC_CLOUDFRONT_URL ||
      'https://your-distribution-id.cloudfront.net'
    const imagePath = localPath.substring(1) // removes the leading '/'
    return `${cloudFrontUrl}/${imagePath}`
  }
  return localPath
}

type FortuneProps = {
  onClickEmbedCta: () => void
}

// Generate all fortune card paths
const allFortunes = Array.from({ length: FORTUNE_MAX }, (_, i) =>
  getFortuneUrl(i + 1),
)

export const Fortune: FC<FortuneProps> = (props) => {
  const randomFortune = React.useRef<string>(getRandomFortune())
  const downloadUrl = React.useRef<string>(
    getCloudFrontUrl(randomFortune.current),
  )
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
          href={downloadUrl.current}
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
// <div className="mt-8 w-full px-4">
//   <h3 className="text-white text-center mb-4">All Vision Cards</h3>
//   <div className="flex flex-row flex-wrap gap-1">
//     {allFortunes.map((fortune, index) => (
//       <div key={index} className="relative">
//         <Image
//           className="w-12 h-auto object-contain"
//           src={fortune}
//           width={272}
//           height={480}
//           alt={`Vision card ${index + 1}`}
//         />
//         <div className="text-black">{index + 1}</div>
//       </div>
//     ))}
//   </div>
// </div>
