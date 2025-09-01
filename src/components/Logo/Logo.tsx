import clsx from 'clsx'
import React from 'react'
import type { Media } from '@/payload-types'

interface LogoData {
  image?: string | number | Media | null
  alt?: string | null
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

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt={logoAlt}
      width={193}
      height={34}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[9.375rem] w-full h-[34px]', className)}
      src={logoSrc}
    />
  )
}
