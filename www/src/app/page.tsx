import { getSettingsPromise } from '@/lib/settings-promise'
import { Home } from '@/views/Home'

export default function Page() {
  const settingsPromise = getSettingsPromise()

  return <Home settingsPromise={settingsPromise} />
}
