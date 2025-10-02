import { STATIC_BASE_URL } from '@/config'

interface ImageLoaderProps {
  src: string
  width: number
  quality?: number
}

export default function imageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  // Check if it's a fortune card image
  if (src.startsWith('/fortunes/')) {
    // Use CloudFront URL for fortune cards
    const cloudFrontUrl = STATIC_BASE_URL
    // Remove leading slash from src since CloudFront URL will have the full path
    const imagePath = src.substring(1) // removes the leading '/'
    return `${cloudFrontUrl}/${imagePath}?w=${width}&q=${quality || 75}`
  }

  // Use local URLs for other images (default Next.js behavior)
  return `${src}?w=${width}&q=${quality || 75}`
}
