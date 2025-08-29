import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
        {
          label: 'Split Layout',
          value: 'split',
        },
        {
          label: 'Centered',
          value: 'centered',
        },
        {
          label: 'Minimal',
          value: 'minimal',
        },
        {
          label: 'Gradient Background',
          value: 'gradient',
        },
        {
          label: 'Card Style',
          value: 'card',
        },
        {
          label: 'Overlay',
          value: 'overlay',
        },
        {
          label: 'Stacked',
          value: 'stacked',
        },
        {
          label: 'Sidebar Layout',
          value: 'sidebar',
        },
        {
          label: 'Banner',
          value: 'banner',
        },
        {
          label: 'Vertical',
          value: 'vertical',
        },
        {
          label: 'Compact',
          value: 'compact',
        },
        {
          label: 'Floating Elements',
          value: 'floating',
        },
      ],
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => !['none', 'lowImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
    {
      name: 'textColor',
      type: 'select',
      label: 'Text Color',
      defaultValue: 'white',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'gradient', 'overlay'].includes(type),
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
  label: false,
}
