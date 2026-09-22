import { useMemo } from 'react'
import { Heart } from 'lucide-react'

/**
 * A handful of very faint hearts drifting slowly. Meant to be felt,
 * not noticed — keep count low and opacity soft.
 */
export default function FloatingHearts({ count = 6, className = '' }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: 8 + Math.random() * 84,
        top: 10 + Math.random() * 80,
        size: 12 + Math.random() * 14,
        delay: Math.random() * 4,
        duration: 6 + Math.random() * 4,
      })),
    [count],
  )

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {hearts.map((h) => (
        <Heart
          key={h.id}
          className="absolute text-rose-400/20 animate-drift"
          style={{
            left: `${h.left}%`,
            top: `${h.top}%`,
            width: h.size,
            height: h.size,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
          }}
          fill="currentColor"
          strokeWidth={0}
        />
      ))}
    </div>
  )
}
