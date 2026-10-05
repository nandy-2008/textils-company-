import React, { useState, useMemo } from 'react';
import { TextileProduct, Colorway } from '../data/textiles';
import { Search, Eye, Plus, Check, SlidersHorizontal, Sparkles } from 'lucide-react';

interface TextileCatalogProps {
  products: TextileProduct[];
  onSelectProduct: (product: TextileProduct) => void;
  onAddSwatch: (product: TextileProduct, colorway: Colorway) => void;
  onOpenInLoom: (product: TextileProduct) => void;
  addedSwatchIds: Set<string>;
}

export const TextileCatalog: React.FC<TextileCatalogProps> = ({
  products,
  onSelectProduct,
  onAddSwatch,
  onOpenInLoom,
  addedSwatchIds
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<string>('All');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('All');
  const [selectedColorways, setSelectedColorways] = useState<Record<string, string>>({});

  // Active colorway helper for each card
  const getSelectedColorway = (product: TextileProduct): Colorway => {
    const activeId = selectedColorways[product.id];
    return product.colorways.find(c => c.id === activeId) || product.colorways[0];
  };

  const handleSelectColorway = (productId: string, colorwayId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedColorways(prev => ({ ...prev, [productId]: colorwayId }));
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.composition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.weaveType.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesApp = selectedApplication === 'All' || p.application === selectedApplication;
      const matchesMat = selectedMaterial === 'All' || p.material === selectedMaterial;

      return matchesSearch && matchesApp && matchesMat;
    });
  }, [products, searchQuery, selectedApplication, selectedMaterial]);

  const applicationFilters = ['All', 'Upholstery', 'Drapery', 'Contract'];
  const materialFilters = ['All', 'Belgian Linen', 'Merino Wool', 'Structured Bouclé', 'Recycled Twill'];

  return (
    <section id="archive" className="py-16 lg:py-24 bg-[#FBFBFA]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#736B63] mb-1">
              Curated Mill Archive · Available in Full Bolts & Custom Cut Yardage
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1A1816]">
              Architectural Swatch Catalog
            </h2>
          </div>

          <p className="text-sm text-[#554F48] max-w-md">
            Order memo swatches for your client presentation board. Trade members receive five complimentary samples with next-day courier dispatch.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="mb-10 p-4 bg-white border border-[#E8E4DD] rounded-xl shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C827A]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by weave name, composition, SKU (e.g. Bouclé, Flax, VW-BOU-01)..."
                className="w-full pl-10 pr-4 py-2.5 text-xs text-[#1A1816] placeholder-[#8C827A] bg-[#FAF8F5] border border-[#E0DACE] rounded-lg focus:outline-none focus:border-[#1A1816] transition-colors"
              />
            </div>

            {/* Application Filter Tabs (Allowed interactive segmented buttons) */}
            <div className="flex items-center gap-1 p-1 bg-[#F4F1EA] rounded-lg border border-[#E4DFD5] overflow-x-auto">
              <span className="text-[11px] font-mono text-[#8C827A] px-2 uppercase">Use:</span>
              {applicationFilters.map(app => (
                <button
                  key={app}
                  onClick={() => setSelectedApplication(app)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                    selectedApplication === app
                      ? 'bg-white text-[#1A1816] shadow-xs'
                      : 'text-[#666059] hover:text-[#1A1816]'
                  }`}
                >
                  {app}
                </button>
              ))}
            </div>
          </div>

          {/* Material Sub-filter */}
          <div className="flex items-center gap-2 pt-2 border-t border-[#F2EFE9] overflow-x-auto">
            <span className="text-[11px] font-mono text-[#8C827A] whitespace-nowrap uppercase">Fiber Base:</span>
            {materialFilters.map(mat => (
              <button
                key={mat}
                onClick={() => setSelectedMaterial(mat)}
                className={`px-2.5 py-1 text-xs rounded transition-colors whitespace-nowrap ${
                  selectedMaterial === mat
                    ? 'bg-[#1A1816] text-white font-medium'
                    : 'text-[#666059] hover:bg-[#F2EFE9]'
                }`}
              >
                {mat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid: 3-column desktop */}
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center bg-white border border-[#E8E4DD] rounded-xl">
            <p className="font-serif text-lg text-[#1A1816]">No textiles matched your search query</p>
            <p className="text-xs text-[#736B63] mt-1">Try resetting the material or application filters above.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedApplication('All');
                setSelectedMaterial('All');
              }}
              className="mt-4 px-4 py-2 text-xs font-medium bg-[#1A1816] text-white rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const activeColor = getSelectedColorway(product);
              const swatchKey = `${product.id}-${activeColor.id}`;
              const isAdded = addedSwatchIds.has(swatchKey);

              return (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="group bg-white border border-[#E8E4DD] hover:border-[#C4BCB0] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
                >
                  {/* Image container (65% of card visual weight) */}
                  <div className="relative aspect-[4/3] bg-[#F3EFE7] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
                    />

                    {/* Stock & Origin subtle top badge */}
                    <div className="absolute top-3 inset-x-3 flex justify-between items-center pointer-events-none">
                      <span className="font-mono text-[11px] px-2 py-0.5 bg-black/65 text-white/90 backdrop-blur-xs rounded-xs">
                        {product.sku}
                      </span>
                      <span className="font-mono text-[11px] px-2 py-0.5 bg-white/90 text-[#1A1816] backdrop-blur-xs rounded-xs shadow-2xs">
                        {product.inStockYards} yds in stock
                      </span>
                    </div>

                    {/* Quick action overlay on hover */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct(product);
                        }}
                        className="py-2 px-3.5 bg-white text-[#1A1816] rounded-lg text-xs font-medium shadow-md hover:bg-[#F9F7F3] flex items-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Specs</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenInLoom(product);
                        }}
                        className="py-2 px-3.5 bg-[#1A1816] text-white rounded-lg text-xs font-medium shadow-md hover:bg-[#333] flex items-center gap-1.5 transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Simulate</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Content Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Quiet unboxed metadata */}
                      <div className="flex items-center gap-2 text-xs text-[#736B63] mb-1 font-mono">
                        <span>{product.application}</span>
                        <span aria-hidden="true">·</span>
                        <span>{product.material}</span>
                        <span aria-hidden="true">·</span>
                        <span>{product.weaveType}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-xl font-medium text-[#1A1816] leading-snug group-hover:text-[#4A3C31] transition-colors">
                        {product.name}
                      </h3>

                      <p className="text-xs text-[#666059] mt-1 line-clamp-2 leading-relaxed">
                        {product.subtitle}
                      </p>
                    </div>

                    {/* Colorway Swatches Selector */}
                    <div>
                      <div className="flex items-center justify-between text-[11px] mb-2">
                        <span className="text-[#736B63] font-medium">Colorway:</span>
                        <span className="text-[#1A1816] font-medium truncate max-w-[180px]">
                          {activeColor.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {product.colorways.map((c) => (
                          <button
                            key={c.id}
                            onClick={(e) => handleSelectColorway(product.id, c.id, e)}
                            title={`${c.name} (${c.yarnBlend})`}
                            className={`w-5 h-5 rounded-full border transition-all ${
                              activeColor.id === c.id
                                ? 'ring-2 ring-[#1A1816] ring-offset-2 scale-110'
                                : 'border-[#DDD8CE] hover:scale-105'
                            }`}
                            style={{ backgroundColor: c.hex }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Technical Specs hairline bar */}
                    <div className="pt-3 border-t border-[#F2EFE9] grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="font-mono text-xs font-semibold text-[#1A1816] tabular-nums">
                          {product.weightGsm}g/m²
                        </div>
                        <div className="text-[10px] text-[#8C827A] uppercase">Weight</div>
                      </div>
                      <div>
                        <div className="font-mono text-xs font-semibold text-[#1A1816] tabular-nums">
                          {product.martindaleRubs.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-[#8C827A] uppercase">Martindale</div>
                      </div>
                      <div>
                        <div className="font-mono text-xs font-semibold text-[#1A1816] tabular-nums">
                          {product.widthCm}cm
                        </div>
                        <div className="text-[10px] text-[#8C827A] uppercase">Width</div>
                      </div>
                    </div>

                    {/* Pricing & Order Swatch CTA */}
                    <div className="pt-3 border-t border-[#F2EFE9] flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs text-[#736B63]">Wholesale from</div>
                        <div className="font-serif text-lg font-semibold text-[#1A1816] tabular-nums">
                          ${product.tierPricing[2]?.price || product.pricePerYard}
                          <span className="text-xs font-normal text-[#736B63] font-sans"> / yard</span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddSwatch(product, activeColor);
                        }}
                        className={`py-2 px-3.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                          isAdded
                            ? 'bg-[#EBF3EE] text-[#2E5C46] border border-[#B6D6C3]'
                            : 'bg-[#F3EFE7] hover:bg-[#EAE4D7] text-[#1A1816] border border-[#DDD7CA]'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>In Sample Ring</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Order Memo Swatch</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
