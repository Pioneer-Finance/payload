import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const CardHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div className="container py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {media && typeof media === 'object' && (
              <div className="relative h-64 lg:h-full min-h-[400px]">
                <Media
                  fill
                  imgClassName="object-cover"
                  priority
                  resource={media}
                />
              </div>
            )}
            
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center space-y-8">
              {richText && (
                <RichText 
                  className="text-lg md:text-xl leading-relaxed" 
                  content={richText} 
                  enableGutter={false} 
                />
              )}
              
              {Array.isArray(links) && links.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {links.map(({ link }, i) => {
                    return (
                      <CMSLink key={i} {...link} />
                    )
                  })}
                </div>
              )}
              
              {media && typeof media === 'object' && media?.caption && (
                <div className="text-sm text-gray-600 border-t pt-6">
                  <RichText content={media.caption} enableGutter={false} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
