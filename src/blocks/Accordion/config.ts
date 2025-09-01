import type { Block } from 'payload'

export const Accordion: Block = {
  slug: 'accordion',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      admin: {
        description: 'Optional title for the accordion section',
      },
    },
    {
      name: 'accordionItems',
      type: 'array',
      label: 'Accordion Items',
      minRows: 1,
      
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Item Title',
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
          label: 'Item Content',
        },
      ],
    },
    {
      name: 'accordionType',
      type: 'select',
      label: 'Accordion Type',
      defaultValue: 'single',
      options: [
        { label: 'Single (Only one item open at a time)', value: 'single' },
        { label: 'Multiple (Multiple items can be open)', value: 'multiple' },
      ],
    },
    {
      name: 'collapsible',
      type: 'checkbox',
      label: 'Collapsible',
      defaultValue: true,
      admin: {
        description: 'Allow all items to be closed at the same time',
      },
    },
    {
      name: 'defaultOpen',
      type: 'number',
      label: 'Default Open Item',
      admin: {
        description: 'Which item should be open by default (1-based index, leave empty for none)',
        condition: (data) => data.accordionType === 'single',
      },
    },
  ],
  interfaceName: 'AccordionBlock',
}
