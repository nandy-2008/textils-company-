import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TextileCatalog } from './components/TextileCatalog';
import { WeaveSimulator, WeavePatternType } from './components/WeaveSimulator';
import { YardageCalculator } from './components/YardageCalculator';
import { MillCraftsmanship } from './components/MillCraftsmanship';
import { TradePortal } from './components/TradePortal';
import { Footer } from './components/Footer';
import { FabricModal } from './components/FabricModal';
import { SampleCartDrawer } from './components/SampleCartDrawer';
import { TradeQuoteModal } from './components/TradeQuoteModal';
import { TEXTILE_CATALOG, TextileProduct, Colorway, SwatchItem } from './data/textiles';
import { Check, Sparkles } from 'lucide-react';

export default function App() {
  // Swatches Cart State with localStorage persistence
  const [swatches, setSwatches] = useState<SwatchItem[]>(() => {
    try {
      const saved = localStorage.getItem('vane_weft_swatches');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Drawers
  const [selectedProductForModal, setSelectedProductForModal] = useState<TextileProduct | null>(null);
  const [isSampleDrawerOpen, setIsSampleDrawerOpen] = useState(false);
  const [isTradeQuoteOpen, setIsTradeQuoteOpen] = useState(false);
  const [quoteDetails, setQuoteDetails] = useState<{
    projectType: string;
    textileName: string;
    quantityYards: number;
    estimatedCost: number;
  } | null>(null);

  // Active Loom Simulator preset state
  const [loomPreset, setLoomPreset] = useState<{
    weave: WeavePatternType;
    warpColor: string;
    weftColor: string;
  }>({
    weave: 'twill',
    warpColor: '#2F3032',
    weftColor: '#D2C7B8'
  });

  // Subtle floating toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('vane_weft_swatches', JSON.stringify(swatches));
    } catch {
      // storage unavailable
    }
  }, [swatches]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Add swatch memo to Sample Ring
  const handleAddSwatch = (product: TextileProduct, colorway: Colorway) => {
    const swatchKey = `${product.id}-${colorway.id}`;
    const exists = swatches.some(s => `${s.textileId}-${s.colorwayId}` === swatchKey);

    if (exists) {
      showToast(`${product.name} (${colorway.name}) already in your sample ring.`);
      return;
    }

    const newSwatch: SwatchItem = {
      textileId: product.id,
      colorwayId: colorway.id,
      name: product.name,
      colorName: colorway.name,
      colorHex: colorway.hex,
      material: product.material,
      sku: product.sku,
      image: product.image,
      addedAt: Date.now()
    };

    setSwatches(prev => [...prev, newSwatch]);
    showToast(`Added ${colorway.name} memo swatch to your Sample Ring.`);
  };

  const handleRemoveSwatch = (key: string) => {
    setSwatches(prev => prev.filter(s => `${s.textileId}-${s.colorwayId}` !== key));
  };

  const handleClearSwatches = () => {
    setSwatches([]);
  };

  // Launch product in Loom simulator
  const handleOpenInLoom = (product: TextileProduct) => {
    let weavePattern: WeavePatternType = 'twill';
    if (product.weaveType === 'Plain Weave') weavePattern = 'plain';
    else if (product.weaveType === 'Herringbone') weavePattern = 'herringbone';
    else if (product.weaveType === 'Bouclé') weavePattern = 'waffle';
    else if (product.weaveType === 'Satin') weavePattern = 'satin';

    setLoomPreset({
      weave: weavePattern,
      warpColor: product.colorways[0]?.hex || '#2F3032',
      weftColor: product.colorways[1]?.hex || '#D2C7B8'
    });

    const loomElem = document.getElementById('loom-studio');
    if (loomElem) {
      loomElem.scrollIntoView({ behavior: 'smooth' });
    }
    showToast(`Loaded ${product.name} structure into Weave Studio.`);
  };

  // Scroll to section helper
  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Yardage calculator to quote
  const handleSendToQuote = (details: {
    projectType: string;
    textileName: string;
    quantityYards: number;
    estimatedCost: number;
  }) => {
    setQuoteDetails(details);
    setIsTradeQuoteOpen(true);
  };

  // Swatch added keys set
  const addedSwatchKeys = new Set(
    swatches.map(s => `${s.textileId}-${s.colorwayId}`)
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA] selection:bg-[#E2DDD5] selection:text-[#1A1816]">
      {/* 3-Zone Top Navigation Bar */}
      <Header
        sampleCount={swatches.length}
        onOpenSamples={() => setIsSampleDrawerOpen(true)}
        onOpenTradeQuote={() => {
          setQuoteDetails(null);
          setIsTradeQuoteOpen(true);
        }}
        onNavigateSection={handleNavigateSection}
      />

      <main className="flex-1">
        {/* Hero Showcase with Loom Photography & Mill Heritage */}
        <Hero
          onExploreArchive={() => handleNavigateSection('archive')}
          onOpenLoomStudio={() => handleNavigateSection('loom-studio')}
        />

        {/* Textile Swatch Catalog with Filtering & Colorway Selection */}
        <TextileCatalog
          products={TEXTILE_CATALOG}
          onSelectProduct={(product) => setSelectedProductForModal(product)}
          onAddSwatch={handleAddSwatch}
          onOpenInLoom={handleOpenInLoom}
          addedSwatchIds={addedSwatchKeys}
        />

        {/* Interactive Weave Studio & Loom Simulator */}
        <section id="loom-studio" className="py-16 lg:py-24 bg-[#FAF8F5] border-b border-[#E8E4DD]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <WeaveSimulator
              initialWeave={loomPreset.weave}
              initialWarpColor={loomPreset.warpColor}
              initialWeftColor={loomPreset.weftColor}
              onOrderCustomStrikeoff={(spec) => {
                showToast(`Strike-off queued: ${spec.weave.toUpperCase()} (${spec.warpColor}/${spec.weftColor}).`);
              }}
            />
          </div>
        </section>

        {/* Trade Yardage & Architectural Drapery Calculator */}
        <YardageCalculator onSendToQuote={handleSendToQuote} />

        {/* Mill Craftsmanship & Closed-Loop Ecology */}
        <MillCraftsmanship />

        {/* Trade Portal, ArchViz BIM Pack & Showroom Locations */}
        <TradePortal
          onRequestQuote={() => {
            setQuoteDetails(null);
            setIsTradeQuoteOpen(true);
          }}
        />
      </main>

      {/* Editorial Footer */}
      <Footer
        onNavigateSection={handleNavigateSection}
        onOpenTradeQuote={() => {
          setQuoteDetails(null);
          setIsTradeQuoteOpen(true);
        }}
        onOpenSamples={() => setIsSampleDrawerOpen(true)}
      />

      {/* Fabric Technical Data Sheet Inspector Modal */}
      {selectedProductForModal && (
        <FabricModal
          product={selectedProductForModal}
          isOpen={true}
          onClose={() => setSelectedProductForModal(null)}
          onAddSwatch={handleAddSwatch}
          isSwatchAdded={addedSwatchKeys.has(
            `${selectedProductForModal.id}-${selectedProductForModal.colorways[0].id}`
          )}
          onOpenInLoom={handleOpenInLoom}
          onOpenCalculator={() => handleNavigateSection('calculator')}
        />
      )}

      {/* Sample Swatch Ordering Drawer */}
      <SampleCartDrawer
        isOpen={isSampleDrawerOpen}
        onClose={() => setIsSampleDrawerOpen(false)}
        swatches={swatches}
        onRemoveSwatch={handleRemoveSwatch}
        onClearSwatches={handleClearSwatches}
      />

      {/* Trade Quotation & Custom Dye Match Modal */}
      <TradeQuoteModal
        isOpen={isTradeQuoteOpen}
        onClose={() => setIsTradeQuoteOpen(false)}
        initialDetails={quoteDetails}
      />

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A1816] text-white text-xs px-4 py-3 rounded-lg shadow-xl border border-white/10 flex items-center gap-2.5 animate-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-[#3A9D6A]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
