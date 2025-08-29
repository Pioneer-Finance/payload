'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const GradientHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div className="relative min-h-[75vh] flex items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 z-10" />
      
      {media && typeof media === 'object' && (
        <Media
          fill
          imgClassName="object-cover opacity-30"
          priority
          resource={media}
        />
      )}
      
      <div className="container relative z-20 text-center max-w-4xl space-y-8">
        {richText && (
          <RichText 
            className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight" 
            content={richText} 
            enableGutter={false} 
          />
        )}
        
        {Array.isArray(links) && links.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            {links.map(({ link }, i) => {
              return (
                <CMSLink key={i} {...link} />
              )
            })}
          </div>
        )}
      </div>
      
      {media && typeof media === 'object' && media?.caption && (
        <div className="absolute bottom-4 left-4 right-4 z-20 text-center">
          <div className="text-sm text-white/80">
            <RichText content={media.caption} enableGutter={false} />
          </div>
        </div>
      )}
    </div>
  )
}
