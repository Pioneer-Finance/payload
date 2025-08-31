import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { getTextColorClasses, getCaptionTextColorClasses } from '@/heros/textColorUtils'

export const CenteredHero: React.FC<Page['hero'] & { textColor?: string | null }> = ({ links, media, richText, textColor }) => {
  const textColorClass = getTextColorClasses(textColor)
  const captionTextColorClass = getCaptionTextColorClasses(textColor)

  return (
    <div className={`container py-20 md:py-32 ${textColorClass}`}>
      <div className="text-center max-w-4xl mx-auto space-y-8">
        {richText && (
          <RichText 
            className="text-xl md:text-2xl leading-relaxed" 
            content={richText} 
            enableGutter={false} 
          />
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

        {media && typeof media === 'object' && (
          <div className="mt-12">
            <Media
              className="rounded-3xl overflow-hidden shadow-xl max-w-3xl mx-auto"
              imgClassName="w-full h-auto object-cover"
              priority
              resource={media}
            />
            {media?.caption && (
              <div className={`mt-6 text-center ${captionTextColorClass}`}>
                <RichText content={media.caption} enableGutter={false} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
