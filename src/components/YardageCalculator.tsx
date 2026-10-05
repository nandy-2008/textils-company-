import React, { useState } from 'react';
import { Calculator, ArrowRight, Check, Info, FileSpreadsheet } from 'lucide-react';
import { TEXTILE_CATALOG, TextileProduct } from '../data/textiles';

interface YardageCalculatorProps {
  onSendToQuote: (quoteDetails: {
    projectType: string;
    textileName: string;
    quantityYards: number;
    estimatedCost: number;
  }) => void;
}

export const YardageCalculator: React.FC<YardageCalculatorProps> = ({ onSendToQuote }) => {
  const [calculationMode, setCalculationMode] = useState<'upholstery' | 'drapery'>('upholstery');
  
  // Upholstery states
  const [furnitureType, setFurnitureType] = useState<string>('sofa-3');
  const [furnitureCount, setFurnitureCount] = useState<number>(1);
  const [selectedTextileId, setSelectedTextileId] = useState<string>(TEXTILE_CATALOG[0].id);
  const [includeWasteMargin, setIncludeWasteMargin] = useState<boolean>(true);

  // Drapery states
  const [trackWidthInches, setTrackWidthInches] = useState<number>(140);
  const [curtainDropInches, setCurtainDropInches] = useState<number>(108);
  const [fullnessMultiplier, setFullnessMultiplier] = useState<number>(2.0); // 1.8x, 2.0x, 2.2x, 2.5x
  const [puddleInches, setPuddleInches] = useState<number>(2);

  const selectedTextile = TEXTILE_CATALOG.find(t => t.id === selectedTextileId) || TEXTILE_CATALOG[0];

  // Base yardage benchmarks for standard furniture items (54" / 140cm width fabric)
  const UPHOLSTERY_BENCHMARKS: Record<string, { label: string; basePerUnit: number; desc: string }> = {
    'sofa-3': { label: 'Standard 3-Seater Sofa (84"-90")', basePerUnit: 16, desc: 'Tight back with 3 loose seat cushions' },
    'sofa-sectional': { label: 'L-Shape 5-Seater Sectional', basePerUnit: 28, desc: 'Includes corner unit and chaise return' },
    'armchair-club': { label: 'Lounge Armchair / Club Chair', basePerUnit: 7.5, desc: 'Standard barrel or high-back armchair' },
    'dining-chairs-6': { label: 'Set of 6 Dining Chairs', basePerUnit: 9, desc: 'Upholstered seat pad and front back' },
    'king-headboard': { label: 'King Size Fluted Headboard', basePerUnit: 6, desc: 'Floor-standing architectural headboard' },
    'ottoman-bench': { label: 'Large Upholstered Cocktail Bench', basePerUnit: 4.5, desc: 'Deep tufted or smooth waterfall wrap' }
  };

  // Calculate Upholstery total
  const selectedFurniture = UPHOLSTERY_BENCHMARKS[furnitureType];
  const rawUpholsteryYards = selectedFurniture.basePerUnit * furnitureCount;
  const wasteMultiplier = includeWasteMargin ? 1.15 : 1.0; // 15% matching & welt cord allowance
  const finalUpholsteryYards = Math.ceil(rawUpholsteryYards * wasteMultiplier);

  // Calculate Drapery total
  // If fabric width is 300cm+ (118"+), it can be run railroaded/seamless without vertical joins!
  const isDoubleWidth = selectedTextile.widthCm >= 280;
  let finalDraperyYards = 0;

  if (isDoubleWidth) {
    // Seamless continuous yardage across track width
    const totalGatheredWidthInches = trackWidthInches * fullnessMultiplier;
    // Add side hems (8 inches)
    finalDraperyYards = Math.ceil((totalGatheredWidthInches + 8) / 36);
  } else {
    // 54" width requires joining widths
    const effectiveWidthInches = 50; // 54" minus 4" side seam allowances
    const totalFabricWidthNeeded = trackWidthInches * fullnessMultiplier;
    const numberOfWidths = Math.ceil(totalFabricWidthNeeded / effectiveWidthInches);
    const cutLengthInches = curtainDropInches + puddleInches + 16; // 8" top header + 8" double bottom hem
    const totalInches = numberOfWidths * cutLengthInches;
    finalDraperyYards = Math.ceil((totalInches / 36) * (includeWasteMargin ? 1.1 : 1.0));
  }

  const activeTotalYards = calculationMode === 'upholstery' ? finalUpholsteryYards : finalDraperyYards;

  // Determine applicable pricing tier
  const getApplicablePrice = (yards: number, textile: TextileProduct): number => {
    if (yards >= 100) return textile.tierPricing[2]?.price || textile.pricePerYard;
    if (yards >= 25) return textile.tierPricing[1]?.price || textile.pricePerYard;
    return textile.pricePerYard;
  };

  const unitPrice = getApplicablePrice(activeTotalYards, selectedTextile);
  const totalCost = activeTotalYards * unitPrice;

  return (
    <section id="calculator" className="py-16 lg:py-24 bg-[#F5F2EB] border-b border-[#E4DFD5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono uppercase tracking-wider text-[#736B63] mb-1">
            B2B Specification Suite · Trade & Architectural Estimator
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1A1816]">
            Precision Yardage & Roll Calculator
          </h2>
          <p className="text-sm sm:text-base text-[#554F48] mt-2">
            Calculate accurate linear yardage, waste allowances, roll count breakdowns, and tiered wholesale pricing for custom interiors.
          </p>
        </div>

        {/* Main Box */}
        <div className="bg-white border border-[#DDD8CE] rounded-2xl shadow-sm overflow-hidden">
          
          {/* Mode Switcher Tabs */}
          <div className="flex border-b border-[#E8E4DD] bg-[#FAF8F5]">
            <button
              onClick={() => setCalculationMode('upholstery')}
              className={`flex-1 py-4 px-6 text-sm font-medium transition-colors border-b-2 text-center ${
                calculationMode === 'upholstery'
                  ? 'border-[#1A1816] text-[#1A1816] bg-white'
                  : 'border-transparent text-[#736B63] hover:text-[#1A1816]'
              }`}
            >
              Upholstery & Seating
            </button>
            <button
              onClick={() => setCalculationMode('drapery')}
              className={`flex-1 py-4 px-6 text-sm font-medium transition-colors border-b-2 text-center ${
                calculationMode === 'drapery'
                  ? 'border-[#1A1816] text-[#1A1816] bg-white'
                  : 'border-transparent text-[#736B63] hover:text-[#1A1816]'
              }`}
            >
              Architectural Drapery & Sheers
            </button>
          </div>

          <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Input Controls (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Textile Choice Dropdown */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1816] mb-2">
                  Select Specification Textile
                </label>
                <select
                  value={selectedTextileId}
                  onChange={(e) => setSelectedTextileId(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DDD7CA] rounded-lg text-sm text-[#1A1816] focus:outline-none focus:border-[#1A1816]"
                >
                  {TEXTILE_CATALOG.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.material}, {t.widthCm}cm width, ${t.pricePerYard}/yd)
                    </option>
                  ))}
                </select>
                <div className="mt-1.5 flex items-center gap-2 text-xs text-[#736B63]">
                  <span>Roll Width: {selectedTextile.widthCm}cm ({Math.round(selectedTextile.widthCm / 2.54)}")</span>
                  <span>·</span>
                  <span>Weight: {selectedTextile.weightGsm}g/m²</span>
                  {selectedTextile.widthCm >= 280 && (
                    <span className="text-[#2E5C46] font-medium">· Double-width seamless</span>
                  )}
                </div>
              </div>

              {calculationMode === 'upholstery' ? (
                /* Upholstery Inputs */
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1816] mb-2">
                      Furniture Silhouette
                    </label>
                    <div className="space-y-2">
                      {Object.entries(UPHOLSTERY_BENCHMARKS).map(([key, data]) => (
                        <label
                          key={key}
                          onClick={() => setFurnitureType(key)}
                          className={`flex items-start justify-between p-3.5 border rounded-lg cursor-pointer transition-all ${
                            furnitureType === key
                              ? 'border-[#1A1816] bg-[#FAF8F4] ring-1 ring-[#1A1816]'
                              : 'border-[#E4DFD5] hover:border-[#8C827A] bg-white'
                          }`}
                        >
                          <div>
                            <div className="text-xs font-medium text-[#1A1816]">{data.label}</div>
                            <div className="text-[11px] text-[#736B63]">{data.desc}</div>
                          </div>
                          <span className="font-mono text-xs font-semibold text-[#1A1816] tabular-nums">
                            ~{data.basePerUnit} yds / unit
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#1A1816]">
                      Quantity of Units
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setFurnitureCount(Math.max(1, furnitureCount - 1))}
                        className="w-8 h-8 rounded border border-[#DDD8CE] flex items-center justify-center text-sm font-semibold hover:bg-[#F2EFEA]"
                      >
                        -
                      </button>
                      <span className="font-mono font-semibold text-sm tabular-nums w-8 text-center">
                        {furnitureCount}
                      </span>
                      <button
                        onClick={() => setFurnitureCount(furnitureCount + 1)}
                        className="w-8 h-8 rounded border border-[#DDD8CE] flex items-center justify-center text-sm font-semibold hover:bg-[#F2EFEA]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Drapery Inputs */
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#1A1816] mb-1">
                        Track / Window Width (Inches)
                      </label>
                      <input
                        type="number"
                        value={trackWidthInches}
                        onChange={(e) => setTrackWidthInches(Math.max(20, Number(e.target.value)))}
                        className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD7CA] rounded-lg text-sm font-mono"
                      />
                      <span className="text-[11px] text-[#736B63]">Approx {Math.round(trackWidthInches * 2.54)} cm</span>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#1A1816] mb-1">
                        Finished Ceiling/Drop Height (Inches)
                      </label>
                      <input
                        type="number"
                        value={curtainDropInches}
                        onChange={(e) => setCurtainDropInches(Math.max(30, Number(e.target.value)))}
                        className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD7CA] rounded-lg text-sm font-mono"
                      />
                      <span className="text-[11px] text-[#736B63]">Approx {Math.round(curtainDropInches * 2.54)} cm</span>
                    </div>
                  </div>

                  {/* Fullness multiplier */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1816] mb-2">
                      Fullness Drape Ratio
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { ratio: 1.8, label: '1.8x', desc: 'Minimal Wave' },
                        { ratio: 2.0, label: '2.0x', desc: 'Standard Ripple' },
                        { ratio: 2.2, label: '2.2x', desc: 'Architectural' },
                        { ratio: 2.5, label: '2.5x', desc: 'Heavy Pinch Pleat' }
                      ].map((f) => (
                        <button
                          key={f.ratio}
                          onClick={() => setFullnessMultiplier(f.ratio)}
                          className={`p-2.5 text-center border rounded-lg transition-all ${
                            fullnessMultiplier === f.ratio
                              ? 'border-[#1A1816] bg-[#FAF8F4] ring-1 ring-[#1A1816]'
                              : 'border-[#E4DFD5] bg-white hover:border-[#8C827A]'
                          }`}
                        >
                          <div className="font-mono text-xs font-semibold text-[#1A1816]">{f.label}</div>
                          <div className="text-[10px] text-[#736B63]">{f.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Puddle length */}
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <div className="text-xs font-medium text-[#1A1816]">Floor Puddle Margin</div>
                      <div className="text-[11px] text-[#736B63]">Allowance touching or pooling on floor</div>
                    </div>
                    <select
                      value={puddleInches}
                      onChange={(e) => setPuddleInches(Number(e.target.value))}
                      className="px-3 py-1.5 bg-[#FAF8F5] border border-[#DDD7CA] rounded text-xs font-mono"
                    >
                      <option value={0}>0" (Hover 0.5" above floor)</option>
                      <option value={1}>1" (Soft touch kiss)</option>
                      <option value={2}>2" (Architectural break)</option>
                      <option value={4}>4" (Opulent puddle pool)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Waste Margin Checkbox */}
              <label className="flex items-center gap-3 p-3 bg-[#FAF8F5] rounded-lg border border-[#E8E4DD] cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeWasteMargin}
                  onChange={(e) => setIncludeWasteMargin(e.target.checked)}
                  className="rounded border-[#CCC] text-[#1A1816] focus:ring-0 w-4 h-4 cursor-pointer"
                />
                <div className="text-xs text-[#554F48]">
                  <span className="font-medium text-[#1A1816]">Include 15% pattern match & tailor waste allowance</span>
                  <p className="text-[11px] text-[#736B63]">Recommended by Association of Master Upholsterers.</p>
                </div>
              </label>

            </div>

            {/* Output Summary Card (5 cols) */}
            <div className="lg:col-span-5 bg-[#FAF8F5] border border-[#E2DDD5] rounded-xl p-6 md:p-8 flex flex-col justify-between">
              
              <div>
                <div className="flex items-center justify-between text-xs font-mono uppercase text-[#736B63] pb-3 border-b border-[#E8E4DD]">
                  <span>Specification Bill</span>
                  <span>ESTIMATE</span>
                </div>

                {/* Big Yardage Number */}
                <div className="py-6 text-center">
                  <div className="font-serif text-5xl lg:text-6xl font-medium text-[#1A1816] tabular-nums">
                    {activeTotalYards}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-[#736B63] mt-1 font-medium">
                    Total Linear Yards Required
                  </div>
                  <div className="text-xs text-[#8C827A] mt-0.5">
                    ({Math.round(activeTotalYards * 0.9144)} linear meters)
                  </div>
                </div>

                {/* Calculation Breakdown Lines */}
                <div className="space-y-3 py-4 border-t border-b border-[#E8E4DD] text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#666059]">Fabric Selection</span>
                    <span className="font-medium text-[#1A1816] text-right truncate max-w-[160px]">{selectedTextile.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666059]">Applied Tier Pricing</span>
                    <span className="font-mono font-medium text-[#1A1816]">${unitPrice}.00 / yd</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666059]">Recommended Packaging</span>
                    <span className="text-[#1A1816]">
                      {Math.ceil(activeTotalYards / 40)} bolt{Math.ceil(activeTotalYards / 40) > 1 ? 's' : ''} (40 yds/roll)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666059]">Estimated Roll Weight</span>
                    <span className="font-mono text-[#1A1816]">
                      ~{Math.round((activeTotalYards * 0.9144 * (selectedTextile.widthCm / 100) * selectedTextile.weightGsm) / 1000)} kg
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666059]">Mill Lead Time</span>
                    <span className="text-[#1A1816]">{selectedTextile.leadTimeWeeks} weeks dispatch</span>
                  </div>
                </div>

                {/* Total Cost Calculation */}
                <div className="pt-4 flex items-baseline justify-between">
                  <span className="text-sm font-medium text-[#1A1816]">Estimated Subtotal</span>
                  <div className="text-right">
                    <span className="font-serif text-2xl font-semibold text-[#1A1816] tabular-nums">
                      ${totalCost.toLocaleString()}
                    </span>
                    <span className="text-[11px] block text-[#736B63]">Excl. freight & duty</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6">
                <button
                  onClick={() => onSendToQuote({
                    projectType: calculationMode === 'upholstery' ? selectedFurniture.label : `Drapery (${fullnessMultiplier}x Fullness)`,
                    textileName: selectedTextile.name,
                    quantityYards: activeTotalYards,
                    estimatedCost: totalCost
                  })}
                  className="w-full py-3 px-4 rounded-lg bg-[#1A1816] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#333] transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Request Formal Trade Pro-Forma Quote</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
