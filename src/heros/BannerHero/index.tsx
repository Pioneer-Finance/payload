import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { getTextColorClasses, getCaptionTextColorClasses } from '@/heros/textColorUtils'

export const BannerHero: React.FC<Page['hero'] & { textColor?: string | null }> = ({ links, media, richText, textColor }) => {
  const textColorClass = getTextColorClasses(textColor)
  const captionTextColorClass = getCaptionTextColorClasses(textColor)

  return (
    <div className="relative w-full">
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        <div className={`container py-12 md:py-16 ${textColorClass}`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
            <div className="md:col-span-3 space-y-6">
              {richText && (
                <RichText 
                  className="text-xl md:text-2xl font-semibold leading-tight" 
                  content={richText} 
                  enableGutter={false} 
                />
              )}
              
              {Array.isArray(links) && links.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {links.map(({ link }, i) => {
                    return (
                      <CMSLink key={i} {...link} />
                    )
                  })}
                </div>
              )}
            </div>
            
            {media && typeof media === 'object' && (
              <div className="md:col-span-1 flex justify-center">
                <div className="w-full max-w-xs">
                  <Media
                    className="rounded-lg overflow-hidden shadow-md"
                    imgClassName="w-full h-auto object-cover"
                    priority
                    resource={media}
                  />
                  {media?.caption && (
                    <div className={`mt-3 text-sm text-center ${captionTextColorClass}`}>
                      <RichText content={media.caption} enableGutter={false} />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
