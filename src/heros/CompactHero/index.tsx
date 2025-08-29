import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const CompactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <div className="container py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-1 space-y-4">
            {richText && (
              <RichText 
                className="text-lg md:text-xl font-medium leading-snug" 
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
            <div className="flex-shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40">
                <Media
                  className="rounded-xl overflow-hidden shadow-sm w-full h-full"
                  imgClassName="w-full h-full object-cover"
                  priority
                  resource={media}
                />
              </div>
              {media?.caption && (
                <div className="mt-2 text-xs text-gray-500 text-center">
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
