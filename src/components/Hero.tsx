import React from 'react';
import { ArrowRight, Compass, ShieldCheck, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreArchive: () => void;
  onOpenLoomStudio: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreArchive, onOpenLoomStudio }) => {
  return (
    <section className="relative overflow-hidden bg-[#FBFBFA] border-b border-[#E8E4DD] pt-8 pb-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Clean unboxed metadata kicker */}
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#736B63]">
              <span>Heritage Weaving Mill</span>
              <span aria-hidden="true">·</span>
              <span>Ghent & Biella Facilities</span>
              <span aria-hidden="true">·</span>
              <span>Est. 1894</span>
            </div>

            {/* Headline with text-wrap: balance */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#1A1816] leading-[1.08] [text-wrap:balance]">
              Master Weavers of Architectural & Contract Textiles
            </h1>

            {/* Body lead */}
            <p className="text-base sm:text-lg text-[#554F48] leading-relaxed max-w-2xl font-light">
              We engineer tactile flax drapery, heavy bouclé upholstery, and resilient worsted wools for interior designers, architects, and luxury fashion houses. Each bolt is spun from certified European fibers and woven on specialized rapier and shuttle looms.
            </p>

            {/* Primary Action Buttons (single-line controls, zero pill shapes) */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreArchive}
                className="py-3 px-6 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#1A1816] text-white hover:bg-[#33302B] transition-colors flex items-center gap-2 shadow-xs whitespace-nowrap"
              >
                <span>Explore Swatch Archive</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenLoomStudio}
                className="py-3 px-6 rounded-lg text-xs font-semibold uppercase tracking-wider bg-white text-[#1A1816] border border-[#D5D0C6] hover:bg-[#F5F2EA] transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <Compass className="w-4 h-4 text-[#736B63]" />
                <span>Launch Interactive Loom</span>
              </button>
            </div>

            {/* Adjacent Proof & Certification Metrics (Claim-to-proof adjacency) */}
            <div className="pt-8 border-t border-[#E8E4DD] grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div>
                <div className="font-serif text-2xl lg:text-3xl font-medium text-[#1A1816] tabular-nums">
                  125,000
                </div>
                <div className="text-xs text-[#736B63] mt-0.5">
                  Martindale Rub Rating
                </div>
              </div>
              <div>
                <div className="font-serif text-2xl lg:text-3xl font-medium text-[#1A1816] tabular-nums">
                  100%
                </div>
                <div className="text-xs text-[#736B63] mt-0.5">
                  Normandy & Biella Traceable
                </div>
              </div>
              <div>
                <div className="font-serif text-2xl lg:text-3xl font-medium text-[#1A1816] tabular-nums">
                  320<span className="text-base">cm</span>
                </div>
                <div className="text-xs text-[#736B63] mt-0.5">
                  Seamless Architectural Width
                </div>
              </div>
              <div>
                <div className="font-serif text-2xl lg:text-3xl font-medium text-[#1A1816] tabular-nums">
                  Class 1
                </div>
                <div className="text-xs text-[#736B63] mt-0.5">
                  OEKO-TEX & GOTS Certified
                </div>
              </div>
            </div>

          </div>

          {/* Right Visual Column (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#DCD6CA] shadow-md bg-[#EDE8DF] aspect-[4/3] lg:aspect-[5/4] group">
              {/* Generated Hero Loom Image with fallback */}
              <img
                src="/src/assets/images/hero_textile_loom_1791181378720.jpg"
                alt="Traditional wooden shuttle loom weaving raw textured oatmeal linen and warm wool textile fabric in natural light"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                onError={(e) => {
                  // Fallback container in case of any loading hitch
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.parentElement?.querySelector('.image-fallback');
                  if (fallback) fallback.classList.remove('hidden');
                }}
              />

              {/* Styled Fallback Container */}
              <div className="image-fallback hidden absolute inset-0 bg-[#EAE5DC] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[#DDD7CB] flex items-center justify-center mb-3">
                  <Sparkles className="w-6 h-6 text-[#736B63]" />
                </div>
                <h4 className="font-serif text-lg font-medium text-[#1A1816]">Ghent Rapier Loom Archive</h4>
                <p className="text-xs text-[#736B63] mt-1">Master warp & weft production since 1894</p>
              </div>

              {/* Quiet Architectural Scrim & Label */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-5 text-white">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <p className="font-serif text-sm tracking-wide">Loom No. 04 · Shuttle Dressing</p>
                    <p className="text-[11px] text-white/70">Warping high-twist Belgian linen bast fiber</p>
                  </div>
                  <span className="font-mono text-[11px] px-2 py-0.5 bg-white/20 backdrop-blur-xs rounded border border-white/20">
                    Live Weave
                  </span>
                </div>
              </div>
            </div>

            {/* Tactile swatch preview pill attachment preview */}
            <div className="absolute -bottom-4 -left-4 hidden sm:flex items-center gap-3 bg-white p-3 rounded-xl border border-[#D5D0C6] shadow-lg">
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#E0DACE]">
                <img
                  src="/src/assets/images/fabric_boucle_texture_1791181394405.jpg"
                  alt="Bouclé detail"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left pr-2">
                <p className="text-xs font-semibold text-[#1A1816]">Complimentary Trade Swatches</p>
                <p className="text-[11px] text-[#736B63]">Free 10x10cm memo ring for designers</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
