import { sanityClient } from '@/lib/sanity'
import { Fortune } from './Fortune'

type FortuneWrapperProps = {
  onClickEmbedCta: () => void
}

export async function FortuneWrapper({ onClickEmbedCta }: FortuneWrapperProps) {
  const settings = await sanityClient.fetchSettings()

  return <Fortune onClickEmbedCta={onClickEmbedCta} settings={settings} />
}
