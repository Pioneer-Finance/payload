# Payload CMS Blocks Implementation Guide

This guide documents how to create and integrate custom blocks in Payload CMS, specifically created for AI assistants working on similar tasks.

## Overview

Payload blocks are reusable content components that can be used in collections to build flexible page layouts. Each block consists of:
1. **Configuration** (`config.ts`) - Defines the block schema and fields
2. **Component** (`Component.tsx`) - React component that renders the block
3. **Registration** - Adding the block to collections and render systems

## Hero Block Implementation

### 1. Block Structure

```
src/blocks/Hero/
├── Component.tsx    # React component
└── config.ts       # Block configuration
```

### 2. Block Configuration (`src/blocks/Hero/config.ts`)

```typescript
import type { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description',
    },
    {
      name: 'backgroundColour',
      type: 'text',
      label: 'Background Color',
      admin: {
        description: 'Hex color code (e.g., #ffffff)',
      },
    },
    {
      name: 'backgroundImage',
      type: 'group',
      label: 'Background Image',
      fields: [
        {
          name: 'desktopSrc',
          type: 'upload',
          relationTo: 'media',
          label: 'Desktop Image',
        },
        {
          name: 'mobileSrc',
          type: 'upload',
          relationTo: 'media',
          label: 'Mobile Image',
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt Text',
        },
      ],
    },
    {
      name: 'buttonLinks',
      type: 'array',
      label: 'Button Links',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Button Text',
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          label: 'URL',
        },
        {
          name: 'variant',
          type: 'select',
          label: 'Button Style',
          defaultValue: 'default',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Outline', value: 'outline' },
            { label: 'Ghost', value: 'ghost' },
            { label: 'Link', value: 'link' },
            { label: 'Destructive', value: 'destructive' },
          ],
        },
      ],
    },
    {
      name: 'heroImage',
      type: 'group',
      label: 'Hero Image (Alternative to Animation)',
      admin: {
        description: 'If provided, this image will be shown instead of the application flow animation',
      },
      fields: [
        {
          name: 'src',
          type: 'upload',
          relationTo: 'media',
          label: 'Hero Image',
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt Text',
        },
      ],
    },
  ],
  interfaceName: 'HeroBlock',
}
```

### 3. Block Component (`src/blocks/Hero/Component.tsx`)

Key implementation details:
- Uses `"use client"` directive for client-side interactivity
- Imports generated types: `import type { HeroBlock as HeroBlockProps } from '@/payload-types'`
- Handles Media type checking for uploaded images
- Implements responsive design with Tailwind CSS
- Uses framer-motion for animations

### 4. Integration Steps

#### Step 1: Add to Collections

In `src/collections/Pages/index.ts`:

```typescript
import { Hero } from '../../blocks/Hero/config'

// Add to blocks array
blocks: [Hero, CallToAction, Content, MediaBlock, Archive, FormBlock],
```

#### Step 2: Register in RenderBlocks

In `src/blocks/RenderBlocks.tsx`:

```typescript
import { HeroBlock } from '@/blocks/Hero/Component'

const blockComponents = {
  // ... other blocks
  hero: HeroBlock,
}
```

#### Step 3: Regenerate Types

```bash
pnpm payload generate:types
```

## Common Implementation Patterns

### Media Field Handling

Payload media fields can be either string IDs or full Media objects. Always check the type:

```typescript
const imageUrl = typeof data.backgroundImage?.desktopSrc === 'object' && data.backgroundImage.desktopSrc
  ? data.backgroundImage.desktopSrc.url 
  : undefined
```

### Button Variants

Match button variants with your UI component library:

```typescript
variant={button.variant || "default"}
```

### Responsive Design

Use Tailwind's responsive prefixes:

```typescript
className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 items-center"
```

## Block Configuration Options

### Required Properties
- `slug` - Unique identifier for the block type
- `fields` - Array of field configurations
- `interfaceName` - TypeScript interface name (generates types)

### Optional Properties
- `labels` - Custom labels for the admin UI
- `imageURL` - Thumbnail image for block selection
- `imageAltText` - Alt text for thumbnail
- `admin.description` - Help text for content editors

### Field Types
- `text` - Single line text input
- `textarea` - Multi-line text input
- `select` - Dropdown selection
- `upload` - File/image upload (relationTo: 'media')
- `group` - Nested field grouping
- `array` - Repeatable field groups

## Working with Payload Globals

Payload globals are site-wide settings like headers, footers, and site configuration. Unlike blocks, globals are single instances that can be referenced throughout the application.

### Global Configuration Example (Header/Footer with Logo Upload)

```typescript
import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
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
            description: 'Upload a custom logo image. If not provided, the default logo will be used.',
          },
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt Text',
          defaultValue: 'Logo',
        },
      ],
    },
    // Other fields...
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
```

### Using Global Data in Components

```typescript
// Access global data
const header: Header = await getCachedGlobal('header', 1)()

// Pass to components
<Logo logoData={header.logo} />
```

### Component with Upload Field Handling

```typescript
interface LogoData {
  image?: string | number | Media | null
  alt?: string | null
}

const Logo = ({ logoData }: { logoData?: LogoData }) => {
  // Handle different media field states
  const logoSrc = 
    typeof logoData?.image === 'object' && logoData.image?.url
      ? logoData.image.url
      : 'fallback-url.svg'
  
  const logoAlt = logoData?.alt || 'Default Alt Text'
  
  return <img src={logoSrc} alt={logoAlt} />
}
```

## Development Workflow

### For Blocks:
1. **Create block structure**: `src/blocks/[BlockName]/`
2. **Define configuration**: Create `config.ts` with field schema
3. **Build component**: Create `Component.tsx` with React implementation
4. **Add to collection**: Import and add to blocks array in collection config
5. **Register renderer**: Add to `RenderBlocks.tsx` component mapping
6. **Generate types**: Run `pnpm payload generate:types`
7. **Create and run migration**: Run `pnpm payload migrate:create [block-name]` then `pnpm payload migrate`
8. **Test**: Verify in Payload admin and frontend
7. **Install**: Run pnpm install to make sure lockfile is updated if any new packages were added

### For Globals:
1. **Define configuration**: Create `config.ts` in appropriate folder (e.g., `src/Header/`)
2. **Add to payload config**: Import and add to globals array
3. **Create component**: Build component that uses global data
4. **Generate types**: Run `pnpm payload generate:types`
5. **Create/run migration**: `pnpm payload migrate:create [name]` then `pnpm payload migrate`
6. **Test**: Verify in Payload admin and global usage
7. **Install**: Run pnpm install to make sure lockfile is updated if any new packages were added

## Dependencies

Ensure these packages are installed:
- `framer-motion` - For animations (if used)
- UI component libraries (Button, etc.)
- Payload CMS packages

## Best Practices

1. **Type Safety**: Always use generated Payload types
2. **Responsive Design**: Test on multiple screen sizes
3. **Accessibility**: Include proper alt texts and semantic HTML
4. **Performance**: Lazy load heavy components when possible
5. **Error Handling**: Check for null/undefined values
6. **Documentation**: Comment complex logic and configurations
7. **No Custom types or any types** : Do not add any custom types or any types. Always use generated payload types

## Troubleshooting

### Common TypeScript Errors
- **Media type errors**: Check if field is string or Media object
- **Null reference errors**: Add proper null checking
- **Missing types**: Regenerate types after config changes

### Block Not Appearing
- Check import statements in collections and RenderBlocks
- Verify block slug matches component mapping key
- Ensure types are regenerated

### Styling Issues
- Check Tailwind CSS classes are properly applied
- Verify responsive breakpoints
- Test dark/light mode compatibility

## Example Usage

After implementation, content editors can:
1. Add Hero block to any page layout
2. Configure title, description, background
3. Add multiple button links with different styles
4. Upload hero image or use animated application flow
5. Preview changes with live preview

The Hero block provides a flexible, animated banner component perfect for landing pages and marketing content.
