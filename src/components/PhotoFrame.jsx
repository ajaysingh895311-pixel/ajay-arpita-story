import { ImagePlus } from 'lucide-react'

/**
 * Shows `src` if provided, otherwise a quiet placeholder so the site
 * still looks intentional before real photos are added.
 */
export default function PhotoFrame({ src, alt = '', label, className = '', aspect = 'aspect-[4/5]' }) {
  if (src) {
    return (
      <div className={`overflow-hidden rounded-2xl ${aspect} ${className}`}>
        <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      </div>
    )
  }

  return (
    <div
      className={`flex ${aspect} flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gold-300/25 bg-ink-800/60 text-center ${className}`}
    >
      <ImagePlus className="text-gold-300/40" size={26} strokeWidth={1.4} />
      <p className="px-6 font-body text-xs tracking-wide text-mist/40">{label || '[Add photo]'}</p>
    </div>
  )
}
