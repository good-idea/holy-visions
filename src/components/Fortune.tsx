import React, { FC } from 'react'
import { ArtDecoBorder } from './ArtDecoBorder'

type FortuneProps = {
  /* */
}

export const Fortune: FC<FortuneProps> = (props) => {
  return (
    <div className="text-black">
      <ArtDecoBorder>
        <div className="text-center text-3xl">
          The devil‘s got work for idle hands. Drop everything!
        </div>
      </ArtDecoBorder>
    </div>
  )
}
