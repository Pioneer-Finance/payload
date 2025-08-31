import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { getTextColorClasses, getCaptionTextColorClasses } from '@/heros/textColorUtils'

export const SplitHero: React.FC<Page['hero'] & { textColor?: string | null }> = ({ links, media, richText, textColor }) => {
  const textColorClass = getTextColorClasses(textColor)
  const captionTextColorClass = getCaptionTextColorClasses(textColor)

  return (
    <div className={`container py-16 md:py-24 ${textColorClass}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[60vh]">
        <div className="order-2 lg:order-1 space-y-6">
          {richText && <RichText className="text-lg" content={richText} enableGutter={false} />}
          
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex flex-wrap gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
        
        <div className="order-1 lg:order-2">
          {media && typeof media === 'object' && (
            <div className="relative">
              <Media
                className="rounded-2xl overflow-hidden shadow-2xl"
                imgClassName="w-full h-auto object-cover"
                priority
                resource={media}
              />
              {media?.caption && (
                <div className={`mt-4 ${captionTextColorClass}`}>
                  <RichText content={media.caption} enableGutter={false} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
