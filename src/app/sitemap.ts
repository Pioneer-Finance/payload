import type { MetadataRoute } from 'next'
import { BasePayload, getPayload, PaginatedDocs } from 'payload'
import config from '@payload-config'
import { getServerSideURL } from '@/utilities/getURL'
import { Page, Post } from '@/payload-types'

import type { Where } from 'payload'



export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload: BasePayload = await getPayload({ config })

  const query: Where = {
  status: {
    equals: 'published',
  },
}

  // Fetch all posts
  const posts: PaginatedDocs<Post> = await payload.find({
    collection: 'posts',
    limit: 0,
    where: query
  })

  // Define the base URL dynamically
  const url: string = getServerSideURL()

  const pages: PaginatedDocs<Page> = await payload.find({
    collection: 'pages',
    limit: 0,
    where: {},
  })

  return [
    ...posts.docs.map(({ slug, updatedAt }) => ({
      url: `${url}/${slug}`,
      lastModified: new Date(updatedAt),
    })),
    ...pages.docs.map(({ slug, updatedAt }) => ({
      url: `${url}/${slug}`,
      lastModified: new Date(updatedAt),
    })),
  ]
}
