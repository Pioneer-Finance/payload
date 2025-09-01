import React from 'react'
import RichText from '@/components/RichText'

import type { RichTextBlock as RichTextBlockProps } from '@/payload-types'

export const RichTextBlock: React.FC<RichTextBlockProps> = (props) => {
  const { content } = props

  return (
    <div className="container my-16">
      <div className="max-w-4xl mx-auto">
        {content && <RichText content={content} enableGutter={false} />}
      </div>
    </div>
  )
}
