import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'EASYCARD TO CONTINUE',
  images: [
    {
      url: `${getServerSideURL()}/website-template-OG.png`,
    },
  ],
  siteName: 'Easycard',
  title: 'Easycard',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
