import React from 'react';
import { Droplet, Sun, Wind, ShieldCheck, Factory, Award } from 'lucide-react';

export const MillCraftsmanship: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Botanical Fiber Curation',
      subtitle: 'Certified Normandy Flax & Biella Merino',
      description: 'We harvest dew-retted European flax from coastal Normandy and superfine merino from ethical non-mulesed family stations in the Biella foothills. Natural fibers breathe, regulate humidity, and age with grace.',
      metric: '100% Traceable to origin farms'
    },
    {
      number: '02',
      title: 'Warp Beam Sizing & Dressing',
      subtitle: 'Zero-Effluent Organic Starch Sizing',
      description: 'Thousands of individual warp ends are dressed onto the beam under laser tension control. We use natural potato starch sizing that washes out completely with rainwater, leaving zero synthetic coating on the yarn.',
      metric: '0.00% synthetic chemical sizing'
    },
    {
      number: '03',
      title: 'Precision Rapier & Shuttle Looms',
      subtitle: 'Slow Weaving for Tactile Stability',
      description: 'Operating at deliberate, measured cadences rather than mass-market speeds. Our Swiss Sulzer rapier looms weave double-width drapery up to 320cm, while restored shuttle looms preserve authentic soft selvedges.',
      metric: '320cm seamless architectural width'
    },
    {
      number: '04',
      title: 'Rainwater Closed-Loop Finishing',
      subtitle: 'Fulling with Pure Mountain Rainwater',
      description: 'Our proprietary finishing mill captures 94% of rooftop precipitation, filtering it naturally for gentle fabric fulling and scouring. Waste steam preheats upcoming wash cycles, reducing thermal demand by 62%.',
      metric: '94% closed-loop rainwater recycling'
    }
  ];

  return (
    <section id="craftsmanship" className="py-16 lg:py-24 bg-[#FAF8F5] border-b border-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono uppercase tracking-wider text-[#736B63] mb-1">
            Mill Heritage & Closed-Loop Ecology · Est. 1894
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1A1816]">
            The Architecture of Slow Weaving
          </h2>
          <p className="text-sm sm:text-base text-[#554F48] mt-2 font-light">
            Textiles inhabit our most intimate spaces. Our Ghent and Biella mills unify 130 years of generational weaving wisdom with rigorous circular manufacturing protocols.
          </p>
        </div>

        {/* 4 Process Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white border border-[#E8E4DD] rounded-xl p-6 flex flex-col justify-between shadow-xs hover:border-[#C8BFB2] transition-colors"
            >
              <div>
                <div className="font-mono text-xs font-semibold text-[#8C827A] mb-3">
                  {step.number} / PROCESS
                </div>
                <h3 className="font-serif text-xl font-medium text-[#1A1816] mb-1">
                  {step.title}
                </h3>
                <div className="text-xs text-[#736B63] font-medium mb-3">
                  {step.subtitle}
                </div>
                <p className="text-xs text-[#666059] leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-[#F2EFE9]">
                <div className="text-[11px] font-mono font-medium text-[#2E5C46]">
                  {step.metric}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sustainability Certifications Bar */}
        <div className="bg-[#1A1816] text-[#FBFBFA] rounded-2xl p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-4">
              <span className="text-xs font-mono uppercase text-[#A89E92] tracking-wider block mb-1">
                Ecological Mandate
              </span>
              <h3 className="font-serif text-2xl lg:text-3xl font-medium text-white">
                Zero Fluorochemicals. 100% Circularity.
              </h3>
              <p className="text-xs text-[#C5BDB3] mt-2 leading-relaxed">
                All Vane & Weft fabrics comply with the highest international environmental protocols. We have completely eliminated PFAS 'forever chemicals' from our performance lines.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div className="border-l border-white/15 pl-4">
                <div className="font-serif text-xl text-white font-medium">OEKO-TEX®</div>
                <div className="text-xs text-[#C5BDB3] mt-1">Standard 100 Class 1 (Safe for Infancy)</div>
              </div>
              <div className="border-l border-white/15 pl-4">
                <div className="font-serif text-xl text-white font-medium">GOTS v6.0</div>
                <div className="text-xs text-[#C5BDB3] mt-1">Global Organic Textile Certified</div>
              </div>
              <div className="border-l border-white/15 pl-4">
                <div className="font-serif text-xl text-white font-medium">SEAQUAL®</div>
                <div className="text-xs text-[#C5BDB3] mt-1">Certified Ocean Plastic Diverter</div>
              </div>
              <div className="border-l border-white/15 pl-4">
                <div className="font-serif text-xl text-white font-medium">ISO 14001</div>
                <div className="text-xs text-[#C5BDB3] mt-1">Closed-Loop Water Management</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
