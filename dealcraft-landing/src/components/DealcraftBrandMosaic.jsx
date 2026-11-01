import React from 'react';

// Dealcraft Brand Mosaic: Electric Cobalt (#4124fb, #3122e8) and Deep Midnight Indigo (#120e3d)
export default function DealcraftBrandMosaic() {
  const tileOpacities = [
    0.15, 0.22, 0.35, 0.50, 0.45, 0.38, 0.30, 0.42, 0.55, 0.45, 0.32, 0.18, 0.12, 0.20,
    0.20, 0.36, 0.55, 0.70, 0.65, 0.52, 0.42, 0.54, 0.72, 0.60, 0.42, 0.26, 0.18, 0.25,
    0.30, 0.50, 0.72, 0.90, 0.82, 0.68, 0.56, 0.68, 0.88, 0.75, 0.54, 0.38, 0.25, 0.32,
    0.28, 0.44, 0.62, 0.78, 0.72, 0.60, 0.48, 0.60, 0.78, 0.68, 0.48, 0.32, 0.22, 0.28,
    0.20, 0.32, 0.48, 0.60, 0.55, 0.44, 0.36, 0.48, 0.60, 0.52, 0.36, 0.25, 0.16, 0.22,
    0.14, 0.20, 0.32, 0.42, 0.38, 0.30, 0.24, 0.36, 0.44, 0.38, 0.26, 0.18, 0.12, 0.16,
  ];

  return (
    <div className="absolute inset-0 bg-[#3122e8] overflow-hidden select-none pointer-events-none">
      <div className="absolute inset-0 grid grid-cols-14 grid-rows-6">
        {tileOpacities.map((op, idx) => (
          <div
            key={idx}
            className="border border-white/[0.07]"
            style={{ backgroundColor: `rgba(255, 255, 255, ${op * 0.38})` }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#120e3d]/80 via-transparent to-[#4124fb]/30" />
      <div className="absolute -top-24 -left-24 w-[360px] h-[360px] bg-[#6366f1]/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-[360px] h-[360px] bg-[#4124fb]/45 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
