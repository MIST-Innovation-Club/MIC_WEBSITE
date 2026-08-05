/**
 * Fixed, full-viewport network/plexus background — abstract connected nodes
 * and translucent triangles over a soft radial glow. Replaces the flat grid
 * pattern. Rendered once behind all page content.
 */
export default function NetworkBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-ink-950" aria-hidden="true">
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="bgBase" cx="70%" cy="15%" r="90%">
            <stop offset="0%" stopColor="#16224a" />
            <stop offset="45%" stopColor="#0f1730" />
            <stop offset="100%" stopColor="#05070f" />
          </radialGradient>

          <radialGradient id="glowBlue" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3B63E8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3B63E8" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="glowPurple" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#A78BFA" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C9D6FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#C9D6FF" stopOpacity="0" />
          </radialGradient>

          <filter id="softBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
          <filter id="lineBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.6" />
          </filter>
          <filter id="dotBlur" x="-50%" y="-50%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        <rect x="0" y="0" width="1600" height="900" fill="url(#bgBase)" />

        {/* Soft ambient glow blobs */}
        <ellipse cx="480" cy="560" rx="420" ry="300" fill="url(#glowBlue)" filter="url(#softBlur)" />
        <ellipse cx="1180" cy="180" rx="360" ry="260" fill="url(#glowPurple)" filter="url(#softBlur)" />
        <ellipse cx="820" cy="760" rx="300" ry="180" fill="url(#glowPurple)" filter="url(#softBlur)" />

        {/* Translucent abstract triangles */}
        <g fill="none" stroke="#7fa0e6" strokeOpacity="0.16">
          <path d="M 120 60 L 420 40 L 260 260 Z" fill="#3B63E8" fillOpacity="0.06" />
          <path d="M 1180 40 L 1420 120 L 1240 300 Z" fill="#A78BFA" fillOpacity="0.06" />
          <path d="M 980 560 L 1180 660 L 990 760 Z" fill="#3B63E8" fillOpacity="0.05" />
          <path d="M 260 820 L 460 760 L 380 940 Z" fill="#A78BFA" fillOpacity="0.05" />
        </g>

        {/* Connecting lines between nodes */}
        <g stroke="#7fa0e6" strokeOpacity="0.22" strokeWidth="1.4" filter="url(#lineBlur)" fill="none">
          <path d="M 60 40 L 640 430" />
          <path d="M 640 430 L 1240 60" />
          <path d="M 640 430 L 1460 340" />
          <path d="M 640 430 L 470 620" />
          <path d="M 470 620 L 190 760" />
          <path d="M 470 620 L 720 830" />
          <path d="M 1240 60 L 1520 210" />
          <path d="M 1520 210 L 1460 340" />
          <path d="M 190 760 L 60 900" />
        </g>

        {/* Glowing node halos */}
        <g>
          <circle cx="640" cy="430" r="26" fill="url(#nodeGlow)" filter="url(#dotBlur)" />
          <circle cx="470" cy="620" r="18" fill="url(#nodeGlow)" filter="url(#dotBlur)" />
          <circle cx="1240" cy="60" r="16" fill="url(#nodeGlow)" filter="url(#dotBlur)" />
          <circle cx="1460" cy="340" r="14" fill="url(#nodeGlow)" filter="url(#dotBlur)" />
          <circle cx="190" cy="760" r="12" fill="url(#nodeGlow)" filter="url(#dotBlur)" />
          <circle cx="720" cy="830" r="12" fill="url(#nodeGlow)" filter="url(#dotBlur)" />
          <circle cx="1520" cy="210" r="10" fill="url(#nodeGlow)" filter="url(#dotBlur)" />
          <circle cx="60" cy="40" r="10" fill="url(#nodeGlow)" filter="url(#dotBlur)" />
        </g>

        {/* Solid node points */}
        <g fill="#dbe7ff">
          <circle cx="640" cy="430" r="4.5" />
          <circle cx="470" cy="620" r="3.2" />
          <circle cx="1240" cy="60" r="3" />
          <circle cx="1460" cy="340" r="2.6" />
          <circle cx="190" cy="760" r="2.4" />
          <circle cx="720" cy="830" r="2.4" />
          <circle cx="1520" cy="210" r="2.2" />
          <circle cx="60" cy="40" r="2.2" />
        </g>
      </svg>
    </div>
  );
}
