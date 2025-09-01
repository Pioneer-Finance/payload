import clsx from 'clsx'
import React from 'react'
import type { Media } from '@/payload-types'

interface LogoData {
  image?: string | number | Media | null
  alt?: string | null
  width?: number | null
  height?: number | null
  maxWidth?: string | null
}

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  logoData?: LogoData | null
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className, logoData } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  // Determine logo source - use uploaded image if available, otherwise fallback to default
  const logoSrc =
    typeof logoData?.image === 'object' && logoData.image?.url
      ? logoData.image.url
      : 'https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-logo-light.svg'

  // Use custom alt text if provided, otherwise use default
  const logoAlt = logoData?.alt || 'Payload Logo'

  // Handle custom sizing
  const customWidth = logoData?.width || '200'
  const customHeight = logoData?.height || '100%'
  const customMaxWidth = logoData?.maxWidth || '9.375rem'
  
  // Build dynamic styles for custom sizing
  const logoStyle: React.CSSProperties = {
    maxWidth: customMaxWidth,
    width: logoData?.width ? `${logoData.width}px` : '100%',
    height: logoData?.height ? `${logoData.height}px` : '34px',
  }

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt={logoAlt}
      width={customWidth}
      height={customHeight}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('w-full', className)}
      style={logoStyle}
      src={logoSrc}
    />
  )
}
