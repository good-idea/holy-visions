import { sanityClient } from './sanity'

export function getSettingsPromise() {
  return sanityClient.fetchSettings()
}
