import { useState } from 'react'
import { ImagePlus } from 'lucide-react'

/**
 * Shows `src` if it loads, otherwise a quiet placeholder — so the
 * site still looks intentional before a real photo is added, and
 * doesn't show a broken-image icon if the filename is wrong.
 */
export default function PhotoFrame({
  src,
  alt = '',
  label,
  className = '',
  aspect = 'aspect-[4/5]',
  // Faces are usually in the upper half of a photo, so default to
  // a top-weighted crop instead of dead-center. Pass e.g. "object-center"
  // or "object-[50%_20%]" per-photo if a specific one needs adjusting.
  focus = 'object-top',
}) {
  const [failed, setFailed] = useState(false)

  if (src && !failed) {
    return (
      <div className={`overflow-hidden rounded-2xl ${aspect} ${className}`}>
        <img
          src={src}
          alt={alt}
          className={`h-full w-full object-cover ${focus}`}
          loading="lazy"
          onError={() => setFailed(true)}
        />
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
