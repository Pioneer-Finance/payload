import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { getTextColorClasses, getCaptionTextColorClasses } from '@/heros/textColorUtils'

export const FloatingHero: React.FC<Page['hero'] & { textColor?: string | null }> = ({ links, media, richText, textColor }) => {
  const textColorClass = getTextColorClasses(textColor)
  const captionTextColorClass = getCaptionTextColorClasses(textColor)

  return (
    <div className="relative min-h-[80vh] bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-100 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 transform hover:scale-105 transition-transform duration-300">
            <div className={`bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 ${textColorClass}`}>
              {richText && (
                <RichText 
                  className="text-xl md:text-2xl lg:text-3xl font-semibold leading-tight" 
                  content={richText} 
                  enableGutter={false} 
                />
              )}
              
              {Array.isArray(links) && links.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-8">
                  {links.map(({ link }, i) => {
                    return (
                      <CMSLink key={i} {...link} />
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {media && typeof media === 'object' && (
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50">
                <Media
                  className="rounded-2xl overflow-hidden shadow-lg"
                  imgClassName="w-full h-auto object-cover"
                  priority
                  resource={media}
                />
                {media?.caption && (
                  <div className={`mt-4 text-center text-sm ${captionTextColorClass}`}>
                    <RichText content={media.caption} enableGutter={false} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
