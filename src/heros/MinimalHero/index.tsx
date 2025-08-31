import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { getTextColorClasses, getCaptionTextColorClasses } from '@/heros/textColorUtils'

export const MinimalHero: React.FC<Page['hero'] & { textColor?: string | null }> = ({ links, media, richText, textColor }) => {
  const textColorClass = getTextColorClasses(textColor)
  const captionTextColorClass = getCaptionTextColorClasses(textColor)

  return (
    <div className={`container py-24 md:py-40 ${textColorClass}`}>
      <div className="max-w-2xl space-y-12">
        {richText && (
          <RichText 
            className="text-lg md:text-xl font-light leading-relaxed" 
            content={richText} 
            enableGutter={false} 
          />
        )}
        
        {Array.isArray(links) && links.length > 0 && (
          <div className="flex flex-wrap gap-6">
            {links.map(({ link }, i) => {
              return (
                <CMSLink key={i} {...link} />
              )
            })}
          </div>
        )}

        {media && typeof media === 'object' && (
          <div className="mt-16">
            <Media
              className="rounded-lg overflow-hidden"
              imgClassName="w-full h-auto object-cover"
              priority
              resource={media}
            />
            {media?.caption && (
              <div className={`mt-4 text-sm ${captionTextColorClass}`}>
                <RichText content={media.caption} enableGutter={false} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
