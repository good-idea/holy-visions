import React, { FC } from 'react'

type ArtDecoBorderProps = React.PropsWithChildren

export const ArtDecoBorder: FC<ArtDecoBorderProps> = ({ children }) => {
  return (
    <div className="art-deco-border">
      <div className="art-deco-border__inner">{children}</div>
      <svg className="c1" viewBox="0 0 40 40">
        <use href="#corner" />
      </svg>
      <svg className="c2" viewBox="0 0 40 40">
        <use href="#corner" transform="rotate(90 20 20)" />
      </svg>
      <svg className="c3" viewBox="0 0 40 40">
        <use href="#corner" transform="rotate(270 20 20)" />
      </svg>
      <svg className="c4" viewBox="0 0 40 40">
        <use href="#corner" transform="rotate(180 20 20)" />
      </svg>
      <svg className="l1" viewBox="0 0 40 100" preserveAspectRatio="none">
        <use href="#side" />
      </svg>
      <svg className="l2" viewBox="0 0 40 80">
        <use href="#sidedecor" />
      </svg>
      <svg className="l3" viewBox="0 0 40 100" preserveAspectRatio="none">
        <use href="#side" />
      </svg>
      <svg className="r1" viewBox="0 0 40 100" preserveAspectRatio="none">
        <use href="#side" />
      </svg>
      <svg className="r2" viewBox="0 0 40 80">
        <use href="#sidedecor" transform="rotate(180 20 40)" />
      </svg>
      <svg className="r3" viewBox="0 0 40 100" preserveAspectRatio="none">
        <use href="#side" />
      </svg>
      <svg
        className="t1 span-h"
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
      >
        <use href="#topbottom" />
      </svg>
      <svg className="t2" viewBox="0 0 80 40">
        <use href="#topbottomdecor" />
      </svg>
      <svg
        className="t3 span-h"
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
      >
        <use href="#topbottom" />
      </svg>
      <svg
        className="b1 span-h"
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
      >
        <use href="#topbottom" />
      </svg>
      <svg className="b2" viewBox="0 0 80 40">
        <use href="#topbottomdecor" transform="rotate(180 40 20)" />
      </svg>
      <svg
        className="b3 span-h"
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
      >
        <use href="#topbottom" />
      </svg>
      <svg className="pieces">
        <defs>
          <path
            id="corner"
            d="M 30 40 L 30 10 L 40 10 M 20 40 L 20 20 L 40 20 M 10 40 L 10 30 L 40 30"
          />
          <g id="side">
            <path d="M 10 0 L 10 100 M 30 0 L 30 100 M 20 0 L 20 100" />
          </g>
          <g id="topbottom">
            <path d="M 0 10 L 100 10 M 0 30 L 100 30 M 0 20 L 100 20" />
          </g>
          <g id="sidedecor">
            <path
              d="M 10 0 L 20 10 L 30 0
               M 20 10 L 20 70
               M 10 80 L 20 70 L 30 80
               M 20 10 L 50 40 L 20 70
               M 20 20 L 40 40 L 20 60
               M 20 30 L 30 40 L 20 50 L 10 40 L 20 30"
            />
          </g>
          <g id="topbottomdecor">
            <path
              d="M 0 10 L 10 20 L 0 30
               M 10 20 L 70 20
               M 80 10 L 70 20 L 80 30
               M 10 20 L 40 50 L 70 20
               M 20 20 L 40 40 L 60 20
               M 30 20 L 40 30 L 50 20 L 40 10 L 30 20"
            />
          </g>
        </defs>
      </svg>
    </div>
  )
}
