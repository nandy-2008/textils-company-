import React, { useState } from 'react';
import { TextileProduct, Colorway } from '../data/textiles';
import { X, Check, Plus, Download, Sparkles, Calculator, ShieldCheck } from 'lucide-react';

interface FabricModalProps {
  product: TextileProduct;
  isOpen: boolean;
  onClose: () => void;
  onAddSwatch: (product: TextileProduct, colorway: Colorway) => void;
  isSwatchAdded: boolean;
  onOpenInLoom: (product: TextileProduct) => void;
  onOpenCalculator: () => void;
}

export const FabricModal: React.FC<FabricModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddSwatch,
  isSwatchAdded,
  onOpenInLoom,
  onOpenCalculator
}) => {
  const [selectedColorway, setSelectedColorway] = useState<Colorway>(product.colorways[0]);
  const [downloadedTds, setDownloadedTds] = useState(false);

  if (!isOpen) return null;

  const handleDownloadTds = () => {
    const tdsText = `======================================================
TECHNICAL DATA SHEET (TDS) · VANE & WEFT MILL
======================================================
Product Name:        ${product.name}
SKU:                 ${product.sku}
Material Family:     ${product.material}
Weave Pattern:       ${product.weaveType}
Selected Colorway:   ${selectedColorway.name} (${selectedColorway.hex})
Yarn Blend:          ${selectedColorway.yarnBlend}

PHYSICAL & MECHANICAL SPECIFICATIONS:
------------------------------------------------------
Composition:         ${product.composition}
Fabric Width:        ${product.widthCm} cm / ${(product.widthCm / 2.54).toFixed(1)} inches
Nominal Weight:      ${product.weightGsm} g/m² (${(product.weightGsm / 33.906).toFixed(1)} oz/yd²)
Martindale Abrasion: ${product.martindaleRubs.toLocaleString()} cycles (EN ISO 12947-2)
Color Lightfastness: ${product.lightfastness}
Flammability Rating: ${product.flameRating}
Acoustic Rating:     ${product.acousticRating || 'Not measured'}
Recommended Uses:    ${product.suitableFor.join(', ')}
Care Instructions:   ${product.careInstructions}

MILL & PROVENANCE:
------------------------------------------------------
Mill Origin:         ${product.millOrigin}
Sustainability:      OEKO-TEX Standard 100 Class 1, GOTS Certified
In-Stock Yardage:    ${product.inStockYards} Linear Yards

Vane & Weft Mill Archives · Ghent & Biella
======================================================`;

    const blob = new Blob([tdsText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${product.sku}_TDS_Specification.txt`;
    link.click();
    URL.revokeObjectURL(url);

    setDownloadedTds(true);
    setTimeout(() => setDownloadedTds(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-[#DDD7CA] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#1A1816] flex items-center justify-center shadow-md border border-[#E0DACE] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Left Visual Gallery (5 cols) */}
          <div className="md:col-span-5 bg-[#F5F2EB] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E8E4DD]">
            <div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-[#DDD8CE] mb-4 bg-white">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/70 text-white rounded text-[10px] font-mono">
                  Macro Weave Scale 1:1
                </div>
              </div>

              {/* Colorway preview banner */}
              <div className="p-3.5 bg-white rounded-lg border border-[#E0DACE] mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#1A1816]">Selected Colorway</span>
                  <span className="font-mono text-xs text-[#736B63]">{selectedColorway.hex}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full border border-black/15 shadow-2xs shrink-0"
                    style={{ backgroundColor: selectedColorway.hex }}
                  />
                  <div>
                    <div className="text-xs font-medium text-[#1A1816]">{selectedColorway.name}</div>
                    <div className="text-[11px] text-[#736B63]">{selectedColorway.yarnBlend}</div>
                  </div>
                </div>

                {/* Available Colorways dots */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#F2EFE9]">
                  {product.colorways.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedColorway(c)}
                      className={`w-6 h-6 rounded-full transition-all ${
                        selectedColorway.id === c.id
                          ? 'ring-2 ring-[#1A1816] ring-offset-2 scale-110'
                          : 'opacity-70 hover:opacity-100 border border-black/10'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Mill Origin Badge */}
              <div className="text-xs text-[#736B63] bg-[#EFECE5] p-3 rounded-lg border border-[#DDD7CA]">
                <span className="font-mono uppercase text-[10px] block text-[#8C827A] mb-0.5">Mill Weave Provenance</span>
                <span className="font-medium text-[#1A1816]">{product.millOrigin}</span>
              </div>
            </div>

            {/* Quick Actions in Left Col */}
            <div className="pt-6 space-y-2">
              <button
                onClick={() => {
                  onOpenInLoom(product);
                  onClose();
                }}
                className="w-full py-2.5 px-3 rounded-lg border border-[#D5D0C6] bg-white hover:bg-[#F2EFEA] text-xs font-medium text-[#1A1816] flex items-center justify-center gap-2 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Simulate on Loom Canvas</span>
              </button>

              <button
                onClick={() => {
                  onOpenCalculator();
                  onClose();
                }}
                className="w-full py-2.5 px-3 rounded-lg border border-[#D5D0C6] bg-white hover:bg-[#F2EFEA] text-xs font-medium text-[#1A1816] flex items-center justify-center gap-2 transition-colors"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Calculate Project Yardage</span>
              </button>
            </div>
          </div>

          {/* Right Technical Data Sheet (7 cols) */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#736B63] mb-1">
                  <span>{product.sku}</span>
                  <span>·</span>
                  <span>{product.application}</span>
                  <span>·</span>
                  <span>{product.weaveType}</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1816]">
                  {product.name}
                </h2>
                <p className="text-xs text-[#666059] mt-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Technical Specifications Table */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1A1816] mb-3">
                  Technical Characteristics
                </h3>
                <div className="border border-[#E8E4DD] rounded-lg divide-y divide-[#F2EFE9] text-xs">
                  <div className="flex justify-between py-2 px-3 bg-[#FAF8F5]">
                    <span className="text-[#736B63]">Composition</span>
                    <span className="font-medium text-[#1A1816] text-right">{product.composition}</span>
                  </div>
                  <div className="flex justify-between py-2 px-3">
                    <span className="text-[#736B63]">Roll Width</span>
                    <span className="font-mono font-medium text-[#1A1816]">
                      {product.widthCm} cm / {Math.round(product.widthCm / 2.54)}"
                    </span>
                  </div>
                  <div className="flex justify-between py-2 px-3 bg-[#FAF8F5]">
                    <span className="text-[#736B63]">Weight</span>
                    <span className="font-mono font-medium text-[#1A1816]">
                      {product.weightGsm} g/m² (Nominal)
                    </span>
                  </div>
                  <div className="flex justify-between py-2 px-3">
                    <span className="text-[#736B63]">Martindale Abrasion</span>
                    <span className="font-mono font-semibold text-[#1A1816]">
                      {product.martindaleRubs.toLocaleString()} rubs (EN ISO 12947-2)
                    </span>
                  </div>
                  <div className="flex justify-between py-2 px-3 bg-[#FAF8F5]">
                    <span className="text-[#736B63]">Lightfastness</span>
                    <span className="font-medium text-[#1A1816]">{product.lightfastness}</span>
                  </div>
                  <div className="flex justify-between py-2 px-3">
                    <span className="text-[#736B63]">Flammability Compliance</span>
                    <span className="font-medium text-[#1A1816]">{product.flameRating}</span>
                  </div>
                  {product.acousticRating && (
                    <div className="flex justify-between py-2 px-3 bg-[#FAF8F5]">
                      <span className="text-[#736B63]">Acoustic Absorption</span>
                      <span className="font-mono font-medium text-[#2E5C46]">{product.acousticRating}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Wholesale Tier Pricing Table */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1A1816] mb-2">
                  Trade Wholesale Pricing Schedule
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {product.tierPricing.map((tier, idx) => (
                    <div key={idx} className="p-3 bg-[#FAF8F5] border border-[#E8E4DD] rounded-lg text-center">
                      <div className="text-[11px] text-[#736B63]">
                        {idx === 0 ? '1 - 24 yds' : idx === 1 ? '25 - 99 yds' : '100+ yds'}
                      </div>
                      <div className="font-serif text-lg font-semibold text-[#1A1816] mt-0.5 tabular-nums">
                        ${tier.price}
                        <span className="text-[11px] font-sans font-normal text-[#736B63]"> /yd</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suitable Applications tags */}
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#1A1816] mb-1.5">
                  Recommended Project Uses
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-[#554F48]">
                  {product.suitableFor.map((use, i) => (
                    <span key={i} className="py-1 px-2.5 bg-[#FAF8F5] border border-[#E8E4DD] rounded">
                      {use}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#E8E4DD] flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => onAddSwatch(product, selectedColorway)}
                className={`flex-1 py-3 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
                  isSwatchAdded
                    ? 'bg-[#EBF3EE] text-[#2E5C46] border border-[#B6D6C3]'
                    : 'bg-[#1A1816] text-white hover:bg-[#333]'
                }`}
              >
                {isSwatchAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>In Sample Ring</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Order Memo Swatch (10x10cm)</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownloadTds}
                className="py-3 px-4 rounded-lg border border-[#D5D0C6] text-xs font-medium text-[#3A352F] hover:bg-[#F2EFEA] transition-colors flex items-center justify-center gap-2"
              >
                {downloadedTds ? (
                  <>
                    <Check className="w-4 h-4 text-[#2E5C46]" />
                    <span>TDS Downloaded</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download TDS</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
