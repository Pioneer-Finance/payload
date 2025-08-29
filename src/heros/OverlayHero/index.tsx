'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { getTextColorClasses, getCaptionTextColorClasses } from '@/heros/textColorUtils'

export const OverlayHero: React.FC<Page['hero'] & { textColor?: string }> = ({ links, media, richText, textColor }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const textColorClass = getTextColorClasses(textColor)
  const captionColorClass = getCaptionTextColorClasses(textColor)

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div className={`relative min-h-[70vh] flex items-center justify-center ${textColorClass}`}>
      <div className="absolute inset-0 bg-black/40 z-10" />
      
      {media && typeof media === 'object' && (
        <Media
          fill
          imgClassName="object-cover"
          priority
          resource={media}
        />
      )}
      
      <div className="container relative z-20">
        <div className="max-w-3xl space-y-6">
          {richText && (
            <RichText 
              className="text-xl md:text-2xl lg:text-3xl font-semibold leading-tight" 
              content={richText} 
              enableGutter={false} 
            />
          )}
          
          {Array.isArray(links) && links.length > 0 && (
            <div className="flex flex-wrap gap-4 pt-2">
              {links.map(({ link }, i) => {
                return (
                  <CMSLink key={i} {...link} />
                )
              })}
            </div>
          )}
        </div>
      </div>
      
      {media && typeof media === 'object' && media?.caption && (
        <div className="absolute bottom-6 left-6 z-20">
          <div className={`text-sm ${captionColorClass} bg-black/30 px-3 py-2 rounded-lg backdrop-blur-sm`}>
            <RichText content={media.caption} enableGutter={false} />
          </div>
        </div>
      )}
    </div>
  )
}
