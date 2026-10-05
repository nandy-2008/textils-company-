import React, { useState } from 'react';
import { Download, ShieldCheck, MapPin, Building, Sparkles, Check, FileCheck } from 'lucide-react';

interface TradePortalProps {
  onRequestQuote: () => void;
}

export const TradePortal: React.FC<TradePortalProps> = ({ onRequestQuote }) => {
  const [downloadedPbr, setDownloadedPbr] = useState(false);

  const handleDownloadPbr = () => {
    // Generate sample CAD/BIM specification package
    const specContent = `VANE & WEFT MILL · BIM & 3D MATERIAL SPECIFICATION PACKAGE
============================================================
Seamless 4K PBR Textile Maps for ArchViz & Interior Renderers
------------------------------------------------------------
Included Materials:
1. Monolith Bouclé (Albedo, Normal, Roughness, Height 4K)
2. Flanders Raw Flax Linen (Albedo, Normal, Transmission, Alpha 4K)
3. Nordic Chevron Worsted Wool (Albedo, Normal, Roughness 4K)
4. Atrium Gossamer Sheer (Albedo, Opacity, Roughness 4K)
5. Solano Micro-Twill (Albedo, Normal, Metallic-Roughness 4K)

Compatible Engines:
- Autodesk 3ds Max + Corona / V-Ray
- Revit & BIM Object Library
- Trimble SketchUp + Enscape
- Blender Cycles / LuxCore
- Unreal Engine 5.4 Nanite / Subsurface Scattering Profile

Download Key: VW-ARCHVIZ-PBR-4K-2026
Generated for Registered Trade Specifier.`;

    const blob = new Blob([specContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Vane_Weft_BIM_PBR_Specification.txt`;
    link.click();
    URL.revokeObjectURL(url);

    setDownloadedPbr(true);
    setTimeout(() => setDownloadedPbr(false), 3000);
  };

  const showrooms = [
    {
      city: 'Ghent, Belgium',
      name: 'The Historical Weaving Works',
      address: 'Nieuwevaart 182, 9000 Gent',
      hours: 'Mon - Fri, 08:30 - 18:00 CET',
      focus: 'Loom Archives, Flax Spinning, Custom Strike-Off Lab'
    },
    {
      city: 'Biella, Italy',
      name: 'Biella Worsted & Woolen Studio',
      address: 'Via Fratelli Piacenza 14, 13900 Biella',
      hours: 'Mon - Fri, 09:00 - 17:30 CET',
      focus: 'High-Martindale Woolens & Architectural Bouclés'
    },
    {
      city: 'New York, USA',
      name: 'Tribeca Architectural Gallery',
      address: '74 Franklin Street, New York, NY 10013',
      hours: 'By appointment for AIA / ASID Members',
      focus: 'Full Bolt Hangings, 3-Meter Drapery Drops'
    },
    {
      city: 'London, UK',
      name: 'Clerkenwell Design Atrium',
      address: '22 St John\'s Square, London EC1M 4DF',
      hours: 'Mon - Fri, 09:30 - 18:30 GMT',
      focus: 'Commercial Hospitality & Marine Contract Specs'
    }
  ];

  return (
    <section id="trade-portal" className="py-16 lg:py-24 bg-[#FBFBFA] border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#736B63] mb-1">
              Design Professionals & Architectural Partners
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1A1816]">
              Trade Services & Global Showrooms
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadPbr}
              className="py-2.5 px-4 rounded-lg border border-[#D5D0C6] text-xs font-medium text-[#1A1816] hover:bg-[#F2EFEA] transition-colors flex items-center gap-2"
            >
              {downloadedPbr ? (
                <>
                  <Check className="w-4 h-4 text-[#2E5C46]" />
                  <span>3D BIM Pack Downloaded</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download 4K ArchViz & BIM Pack</span>
                </>
              )}
            </button>
            <button
              onClick={onRequestQuote}
              className="py-2.5 px-4 rounded-lg bg-[#1A1816] text-white text-xs font-medium hover:bg-[#333] transition-colors"
            >
              Open Trade Account
            </button>
          </div>
        </div>

        {/* 3 Key Trade Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 bg-[#FAF8F5] border border-[#E8E4DD] rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-white border border-[#E0DACE] flex items-center justify-center mb-4">
              <Building className="w-5 h-5 text-[#1A1816]" />
            </div>
            <h3 className="font-serif text-xl font-medium text-[#1A1816] mb-2">
              14-Day Bolt Reservation
            </h3>
            <p className="text-xs text-[#666059] leading-relaxed">
              We reserve dye-lot matching bolts for 14 calendar days with zero cancellation penalties while your client reviews final finishes and construction approvals.
            </p>
          </div>

          <div className="p-6 bg-[#FAF8F5] border border-[#E8E4DD] rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-white border border-[#E0DACE] flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5 text-[#1A1816]" />
            </div>
            <h3 className="font-serif text-xl font-medium text-[#1A1816] mb-2">
              Bespoke Dye Strike-Offs
            </h3>
            <p className="text-xs text-[#666059] leading-relaxed">
              Our color chemists match your physical paint chip, wood sample, or Pantone TCX code, weaving hand-loom strike-off cuttings within 7 business days.
            </p>
          </div>

          <div className="p-6 bg-[#FAF8F5] border border-[#E8E4DD] rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-white border border-[#E0DACE] flex items-center justify-center mb-4">
              <FileCheck className="w-5 h-5 text-[#1A1816]" />
            </div>
            <h3 className="font-serif text-xl font-medium text-[#1A1816] mb-2">
              Full Fire & Acoustic Testing
            </h3>
            <p className="text-xs text-[#666059] leading-relaxed">
              Complete certificates for BS 5852 Crib 5, EN 1021, IMO FTP Code, and ISO 354 sound absorption coefficient test reports ready for building inspectors.
            </p>
          </div>
        </div>

        {/* Global Showrooms Grid */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1A1816] mb-6">
            Mill Facilities & Dedicated Client Galleries
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {showrooms.map((room, idx) => (
              <div key={idx} className="p-5 bg-white border border-[#E8E4DD] rounded-xl">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1A1816] mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#736B63]" />
                  <span>{room.city}</span>
                </div>
                <div className="font-serif text-base font-medium text-[#1A1816] mb-2">
                  {room.name}
                </div>
                <div className="text-xs text-[#666059] space-y-1">
                  <div>{room.address}</div>
                  <div className="text-[11px] text-[#8C827A]">{room.hours}</div>
                  <div className="text-[11px] text-[#2E5C46] pt-2 border-t border-[#F2EFE9] font-medium">
                    {room.focus}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
