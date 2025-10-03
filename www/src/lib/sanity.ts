import { createClient } from '@sanity/client'

const baseClient = createClient({
  projectId: 'bgbuxtjs',
  apiVersion: '2025-01-01',
  useCdn: false,
  dataset: 'production',
})

export type Settings = {
  contestEnabled: boolean
}

export const sanityClient = {
  fetchSettings: () =>
    baseClient.fetch<Settings>(
      `*[_id == "settings" && _type == "settings"][0]`,
    ),
}
