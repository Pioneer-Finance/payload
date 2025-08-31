import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'
import { getTextColorClasses } from '@/heros/textColorUtils'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
      textColor?: string | null
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
      textColor?: string | null
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText, textColor }) => {
  const textColorClass = getTextColorClasses(textColor)

  return (
    <div className={`container mt-16 ${textColorClass}`}>
      <div className="max-w-[48rem]">
        {children || (richText && <RichText content={richText} enableGutter={false} />)}
      </div>
    </div>
  )
}
