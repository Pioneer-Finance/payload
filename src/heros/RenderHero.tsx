import React from 'react'

import type { Page } from '@/payload-types'

import { HighImpactHero } from '@/heros/HighImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { SplitHero } from '@/heros/SplitHero'
import { CenteredHero } from '@/heros/CenteredHero'
import { MinimalHero } from '@/heros/MinimalHero'
import { GradientHero } from '@/heros/GradientHero'
import { CardHero } from '@/heros/CardHero'
import { OverlayHero } from '@/heros/OverlayHero'
import { StackedHero } from '@/heros/StackedHero'
import { SidebarHero } from '@/heros/SidebarHero'
import { BannerHero } from '@/heros/BannerHero'
import { VerticalHero } from '@/heros/VerticalHero'
import { CompactHero } from '@/heros/CompactHero'
import { FloatingHero } from '@/heros/FloatingHero'

const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
  split: SplitHero,
  centered: CenteredHero,
  minimal: MinimalHero,
  gradient: GradientHero,
  card: CardHero,
  overlay: OverlayHero,
  stacked: StackedHero,
  sidebar: SidebarHero,
  banner: BannerHero,
  vertical: VerticalHero,
  compact: CompactHero,
  floating: FloatingHero,
}

export const RenderHero: React.FC<Page['hero'] & { textColor?: string }> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
