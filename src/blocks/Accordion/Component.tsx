'use client'

import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import RichText from '@/components/RichText'

interface AccordionItemType {
  title: string
  content: Record<string, any>
}

interface AccordionBlockProps {
  title?: string
  accordionItems?: AccordionItemType[]
  accordionType?: 'single' | 'multiple'
  collapsible?: boolean
  defaultOpen?: number
  blockName?: string
  blockType: 'accordion'
}

export const AccordionBlock: React.FC<AccordionBlockProps> = ({
  title,
  accordionItems,
  accordionType = 'single',
  collapsible = true,
  defaultOpen,
}) => {
  // Generate default value for single accordion
  const getDefaultValue = () => {
    if (accordionType === 'single' && defaultOpen && defaultOpen > 0 && accordionItems) {
      const index = defaultOpen - 1 // Convert from 1-based to 0-based index
      if (index < accordionItems.length) {
        return `item-${index}`
      }
    }
    return undefined
  }

  const getDefaultValues = () => {
    if (accordionType === 'multiple' && defaultOpen && defaultOpen > 0 && accordionItems) {
      const index = defaultOpen - 1 // Convert from 1-based to 0-based index
      if (index < accordionItems.length) {
        return [`item-${index}`]
      }
    }
    return []
  }

  if (!accordionItems || accordionItems.length === 0) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {title && (
        <h2 className="mb-6 text-2xl font-bold text-foreground">
          {title}
        </h2>
      )}
      
      {accordionType === 'single' ? (
        <Accordion
          type="single"
          collapsible={collapsible}
          defaultValue={getDefaultValue()}
          className="w-full"
        >
          {accordionItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {item.title}
              </AccordionTrigger>
              <AccordionContent>
                <RichText
                  content={item.content}
                  enableGutter={false}
                  enableProse={true}
                  className="text-muted-foreground"
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <Accordion
          type="multiple"
          defaultValue={getDefaultValues()}
          className="w-full"
        >
          {accordionItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {item.title}
              </AccordionTrigger>
              <AccordionContent>
                <RichText
                  content={item.content}
                  enableGutter={false}
                  enableProse={true}
                  className="text-muted-foreground"
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  )
}
