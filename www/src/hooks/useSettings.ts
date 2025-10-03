import { useState, useEffect } from 'react'
import { sanityClient, Settings } from '@/lib/sanity'

export function useSettings() {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    sanityClient
      .fetchSettings()
      .then(setSettings)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return { settings, loading, error }
}
