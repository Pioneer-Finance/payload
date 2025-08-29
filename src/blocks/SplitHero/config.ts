import type { Block } from 'payload'
import { linkGroup } from '@/fields/linkGroup'

export const SplitHero: Block = {
  slug: 'splitHero',
  fields: [
    {
      name: 'richText',
      type: 'richText',
      label: 'Content',
      required: true,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      label: 'Image',
      relationTo: 'media',
      required: true,
    },
  ],
  interfaceName: 'SplitHeroBlock',
  labels: {
    singular: 'Split Hero',
    plural: 'Split Heroes',
  },
}
