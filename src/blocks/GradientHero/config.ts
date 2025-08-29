import type { Block } from 'payload'
import { linkGroup } from '@/fields/linkGroup'

export const GradientHero: Block = {
  slug: 'gradientHero',
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
      label: 'Background Image',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'textColor',
      type: 'select',
      label: 'Text Color',
      defaultValue: 'white',
      admin: {
        description: 'Choose text color that contrasts well with your background image',
      },
      options: [
        {
          label: 'White',
          value: 'white',
        },
        {
          label: 'Black',
          value: 'black',
        },
        {
          label: 'Gray Light',
          value: 'gray-light',
        },
        {
          label: 'Gray Dark',
          value: 'gray-dark',
        },
        {
          label: 'Blue',
          value: 'blue',
        },
        {
          label: 'Red',
          value: 'red',
        },
        {
          label: 'Green',
          value: 'green',
        },
        {
          label: 'Yellow',
          value: 'yellow',
        },
        {
          label: 'Purple',
          value: 'purple',
        },
        {
          label: 'Pink',
          value: 'pink',
        },
      ],
    },
  ],
  interfaceName: 'GradientHero',
  labels: {
    singular: 'Gradient Hero',
    plural: 'Gradient Heroes',
  },
}
