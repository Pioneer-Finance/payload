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
  ],
  label: false,
}
