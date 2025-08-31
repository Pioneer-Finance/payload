import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { getTextColorClasses, getCaptionTextColorClasses } from '@/heros/textColorUtils'

export const SidebarHero: React.FC<Page['hero'] & { textColor?: string | null }> = ({ links, media, richText, textColor }) => {
  const textColorClass = getTextColorClasses(textColor)
  const captionTextColorClass = getCaptionTextColorClasses(textColor)

  return (
    <div className={`container py-16 md:py-24 ${textColorClass}`}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {media && typeof media === 'object' && (
            <div>
              <Media
                className="rounded-xl overflow-hidden shadow-lg w-full"
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
        
        <div className="lg:col-span-1 space-y-8 lg:pl-8">
          {richText && (
            <div className="sticky top-8">
              <RichText 
                className="text-lg md:text-xl leading-relaxed" 
                content={richText} 
                enableGutter={false} 
              />
              
              {Array.isArray(links) && links.length > 0 && (
                <div className="flex flex-col gap-4 mt-8">
                  {links.map(({ link }, i) => {
                    return (
                      <CMSLink key={i} {...link} />
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
