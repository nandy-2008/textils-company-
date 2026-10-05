import React from 'react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenTradeQuote: () => void;
  onOpenSamples: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateSection,
  onOpenTradeQuote,
  onOpenSamples
}) => {
  return (
    <footer className="bg-[#141311] text-[#E8E4DD] border-t border-[#2A2724] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#2A2724]">
          
          {/* Brand & Purpose (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-serif text-2xl lg:text-3xl font-medium tracking-tight text-white block">
              Vane & Weft Mill
            </span>
            <p className="text-xs text-[#A8A196] leading-relaxed max-w-sm">
              Master weavers of architectural flax drapery, heavy bouclé upholstery, and resilient worsted wools for interior designers, architects, and luxury fashion ateliers.
            </p>
            <div className="pt-2 text-xs text-[#736B63] space-y-1">
              <div>Ghent Weaving Works · Nieuwevaart 182, 9000 Gent, Belgium</div>
              <div>Biella Woolen Mill · Via Fratelli Piacenza 14, 13900 Biella, Italy</div>
            </div>
          </div>

          {/* Navigation Links (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Archive & Studio
            </div>
            <ul className="text-xs text-[#A8A196] space-y-2">
              <li>
                <button
                  onClick={() => onNavigateSection('archive')}
                  className="hover:text-white transition-colors"
                >
                  Swatch Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('loom-studio')}
                  className="hover:text-white transition-colors"
                >
                  Interactive Loom
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('calculator')}
                  className="hover:text-white transition-colors"
                >
                  Yardage Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSamples}
                  className="hover:text-white transition-colors"
                >
                  Sample Memo Ring
                </button>
              </li>
            </ul>
          </div>

          {/* Trade & Certification (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Trade & Technical
            </div>
            <ul className="text-xs text-[#A8A196] space-y-2">
              <li>
                <button
                  onClick={() => onNavigateSection('trade-portal')}
                  className="hover:text-white transition-colors"
                >
                  Commercial Trade Accounts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('craftsmanship')}
                  className="hover:text-white transition-colors"
                >
                  Zero PFAS Environmental Mandate
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTradeQuote}
                  className="hover:text-white transition-colors"
                >
                  Request Pro-Forma Invoice
                </button>
              </li>
              <li>
                <span className="text-[#736B63]">BS 5852 Crib 5 & CAL 117 Testing</span>
              </li>
            </ul>
          </div>

          {/* Direct Mill Contact (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Inquiries & Sample Desk
            </div>
            <p className="text-xs text-[#A8A196] leading-relaxed">
              For project specification consultations, custom yarn spinning, or yardage holds:
            </p>
            <div className="text-xs font-mono text-[#D5D0C6] space-y-1">
              <div>orders@vaneweftmill.com</div>
              <div>+32 (9) 234-8920 (Ghent Desk)</div>
              <div>+1 (212) 555-0144 (New York Desk)</div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Quiet Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#736B63] gap-4">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Vane & Weft Mill NV.</span>
            <span>·</span>
            <span>All rights reserved.</span>
            <span>·</span>
            <span>Ghent & Biella Facilities.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>OEKO-TEX Standard 100 Class 1</span>
            <span>·</span>
            <span>GOTS v6.0 Certified Organic</span>
            <span>·</span>
            <span>SEAQUAL® Partner</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
