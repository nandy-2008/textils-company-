import React from 'react';
import { Package, FileText, Menu, X } from 'lucide-react';

interface HeaderProps {
  sampleCount: number;
  onOpenSamples: () => void;
  onOpenTradeQuote: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  sampleCount,
  onOpenSamples,
  onOpenTradeQuote,
  onNavigateSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNavClick = (id: string) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBFBFA]/95 backdrop-blur-md border-b border-[#E8E4DD] transition-all">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark (Display face, no descriptors/chips) */}
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
          className="font-serif text-2xl lg:text-3xl font-semibold tracking-tight text-[#1A1816] hover:opacity-90 transition-opacity"
        >
          Vane & Weft Mill
        </a>

        {/* Zone 2: 4-6 clean text navigation links with subtle hover states */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#666059]">
          <button
            onClick={() => handleNavClick('archive')}
            className="hover:text-[#1A1816] transition-colors py-1 hover:underline underline-offset-8 decoration-1"
          >
            Swatch Archive
          </button>
          <button
            onClick={() => handleNavClick('loom-studio')}
            className="hover:text-[#1A1816] transition-colors py-1 hover:underline underline-offset-8 decoration-1"
          >
            Loom Studio
          </button>
          <button
            onClick={() => handleNavClick('calculator')}
            className="hover:text-[#1A1816] transition-colors py-1 hover:underline underline-offset-8 decoration-1"
          >
            Yardage Calculator
          </button>
          <button
            onClick={() => handleNavClick('craftsmanship')}
            className="hover:text-[#1A1816] transition-colors py-1 hover:underline underline-offset-8 decoration-1"
          >
            Mill & Ecology
          </button>
          <button
            onClick={() => handleNavClick('trade-portal')}
            className="hover:text-[#1A1816] transition-colors py-1 hover:underline underline-offset-8 decoration-1"
          >
            Trade Specifier
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Sample Box button with numeric indicator */}
          <button
            onClick={onOpenSamples}
            className="relative px-3.5 py-2 text-xs font-medium text-[#1A1816] bg-[#F3EFE7] hover:bg-[#EAE4D7] border border-[#DDD7CA] rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
            aria-label="View sample box"
          >
            <Package className="w-4 h-4 text-[#4A453E]" />
            <span className="hidden sm:inline">Sample Ring</span>
            <span className="font-mono text-xs bg-[#1A1816] text-white px-1.5 py-0.5 rounded-sm tabular-nums">
              {sampleCount}
            </span>
          </button>

          {/* Request Trade Quote CTA */}
          <button
            onClick={onOpenTradeQuote}
            className="px-4 py-2 text-xs font-medium text-white bg-[#1A1816] hover:bg-[#33302B] rounded-lg transition-colors whitespace-nowrap shadow-xs"
          >
            Request Yardage
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#4A453E] hover:text-[#1A1816]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E8E4DD] bg-[#FAF8F5] px-6 py-4 space-y-3">
          <button
            onClick={() => handleNavClick('archive')}
            className="block w-full text-left py-2 text-sm font-medium text-[#1A1816]"
          >
            Swatch Archive
          </button>
          <button
            onClick={() => handleNavClick('loom-studio')}
            className="block w-full text-left py-2 text-sm font-medium text-[#1A1816]"
          >
            Loom Studio
          </button>
          <button
            onClick={() => handleNavClick('calculator')}
            className="block w-full text-left py-2 text-sm font-medium text-[#1A1816]"
          >
            Yardage Calculator
          </button>
          <button
            onClick={() => handleNavClick('craftsmanship')}
            className="block w-full text-left py-2 text-sm font-medium text-[#1A1816]"
          >
            Mill & Ecology
          </button>
          <button
            onClick={() => handleNavClick('trade-portal')}
            className="block w-full text-left py-2 text-sm font-medium text-[#1A1816]"
          >
            Trade Specifier
          </button>
        </div>
      )}
    </header>
  );
};
