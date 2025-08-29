import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const CenteredHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div className="container py-20 md:py-32">
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
              <div className="mt-6 text-center">
                <RichText content={media.caption} enableGutter={false} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
