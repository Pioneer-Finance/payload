import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { getTextColorClasses, getCaptionTextColorClasses } from '@/heros/textColorUtils'

export const StackedHero: React.FC<Page['hero'] & { textColor?: string | null }> = ({ links, media, richText, textColor }) => {
  const textColorClass = getTextColorClasses(textColor)
  const captionTextColorClass = getCaptionTextColorClasses(textColor)

  return (
    <div className={`container py-16 md:py-24 ${textColorClass}`}>
      <div className="max-w-4xl mx-auto text-center space-y-16">
        {richText && (
          <div className="space-y-6">
            <RichText 
              className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight" 
              content={richText} 
              enableGutter={false} 
            />
          </div>
        )}
        
        {media && typeof media === 'object' && (
          <div className="space-y-6">
            <Media
              className="rounded-2xl overflow-hidden shadow-lg mx-auto max-w-2xl"
              imgClassName="w-full h-auto object-cover"
              priority
              resource={media}
            />
            {media?.caption && (
              <div className={`text-center text-sm ${captionTextColorClass}`}>
                <RichText content={media.caption} enableGutter={false} />
              </div>
            )}
          </div>
        )}
        
        {Array.isArray(links) && links.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4">
            {links.map(({ link }, i) => {
              return (
                <CMSLink key={i} {...link} />
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
