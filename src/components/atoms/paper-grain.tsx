export function PaperGrain() {
  return (
    <svg
      aria-hidden="true"
      className="opacity-(--grain-opacity) pointer-events-none fixed inset-0 z-50 size-full [mix-blend-mode:var(--grain-blend)]"
    >
      <filter id="paper-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.85"
          numOctaves={3}
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#paper-grain)" />
    </svg>
  );
}
