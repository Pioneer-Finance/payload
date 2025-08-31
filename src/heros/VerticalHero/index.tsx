import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { getTextColorClasses, getCaptionTextColorClasses } from '@/heros/textColorUtils'

export const VerticalHero: React.FC<Page['hero'] & { textColor?: string | null }> = ({ links, media, richText, textColor }) => {
  const textColorClass = getTextColorClasses(textColor)
  const captionTextColorClass = getCaptionTextColorClasses(textColor)

  return (
    <div className={`min-h-screen flex flex-col justify-center py-16 ${textColorClass}`}>
      <div className="container">
        <div className="max-w-2xl mx-auto space-y-12 text-center">
          <div className="space-y-8">
            {richText && (
              <RichText 
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" 
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
          </div>

          {media && typeof media === 'object' && (
            <div className="pt-12">
              <Media
                className="rounded-2xl overflow-hidden shadow-2xl mx-auto max-w-lg"
                imgClassName="w-full h-auto object-cover"
                priority
                resource={media}
              />
              {media?.caption && (
                <div className={`mt-6 text-sm ${captionTextColorClass}`}>
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
