import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'group',
      label: 'Logo',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo Image',
          admin: {
            description: 'Upload a custom logo image. If not provided, the default Payload logo will be used.',
          },
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt Text',
          defaultValue: 'Logo',
        },
        {
          name: 'width',
          type: 'number',
          label: 'Logo Width (px)',
          admin: {
            description: 'Custom width for the logo in pixels. Leave empty for default size.',
          },
        },
        {
          name: 'height',
          type: 'number',
          label: 'Logo Height (px)',
          admin: {
            description: 'Custom height for the logo in pixels. Leave empty for default size.',
          },
        },
        {
          name: 'maxWidth',
          type: 'text',
          label: 'Max Width (CSS)',
          defaultValue: '9.375rem',
          admin: {
            description: 'Maximum width using CSS units (e.g., 10rem, 150px, 100%). Responsive breakpoint.',
          },
        },
      ],
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
