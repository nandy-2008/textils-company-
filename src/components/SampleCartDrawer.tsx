import React, { useState } from 'react';
import { SwatchItem } from '../data/textiles';
import { X, Trash2, CheckCircle2, Package, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

interface SampleCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  swatches: SwatchItem[];
  onRemoveSwatch: (key: string) => void;
  onClearSwatches: () => void;
}

export const SampleCartDrawer: React.FC<SampleCartDrawerProps> = ({
  isOpen,
  onClose,
  swatches,
  onRemoveSwatch,
  onClearSwatches
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'form' | 'success'>('cart');
  const [designerName, setDesignerName] = useState('');
  const [firmName, setFirmName] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryCity, setDeliveryCity] = useState('');
  const [orderReference, setOrderReference] = useState('');

  if (!isOpen) return null;

  const handleProceedToForm = () => {
    setCheckoutStep('form');
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const refId = `VW-SMP-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderReference(refId);
    setCheckoutStep('success');
  };

  const handleReset = () => {
    onClearSwatches();
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#DDD7CA]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#E8E4DD] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-[#1A1816]" />
            <h3 className="font-serif text-xl font-medium text-[#1A1816]">
              Architectural Sample Ring
            </h3>
            <span className="font-mono text-xs bg-[#1A1816] text-white px-2 py-0.5 rounded-sm">
              {swatches.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#736B63] hover:text-[#1A1816] rounded-md transition-colors"
            aria-label="Close sample cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {checkoutStep === 'cart' && (
            <>
              {swatches.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-14 h-14 rounded-full bg-[#F4F1EA] flex items-center justify-center mb-4 text-[#8C827A]">
                    <Package className="w-7 h-7" />
                  </div>
                  <h4 className="font-serif text-lg font-medium text-[#1A1816]">Your Sample Ring is Empty</h4>
                  <p className="text-xs text-[#736B63] mt-1.5 max-w-xs leading-relaxed">
                    Explore our curated catalog to select 10x10cm memo swatches for mood boards and tactile client presentations.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Complimentary banner */}
                  <div className="p-3.5 bg-[#F2F6F3] border border-[#CDE0D4] rounded-lg text-xs text-[#2E5C46] flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold">Trade Sample Privilege:</span> Complimentary standard overnight dispatch for up to 5 memo swatches per project.
                    </div>
                  </div>

                  {/* List of Swatches */}
                  <div className="divide-y divide-[#F2EFE9] border border-[#E8E4DD] rounded-xl overflow-hidden bg-white">
                    {swatches.map((item) => {
                      const swatchKey = `${item.textileId}-${item.colorwayId}`;
                      return (
                        <div key={swatchKey} className="p-4 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#E0DACE] shrink-0 relative bg-[#F7F5EE]">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                              <div
                                className="absolute bottom-1 right-1 w-3 h-3 rounded-full border border-white shadow-2xs"
                                style={{ backgroundColor: item.colorHex }}
                              />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-[#1A1816] leading-tight">
                                {item.name}
                              </div>
                              <div className="text-[11px] text-[#736B63] flex items-center gap-1.5 mt-0.5">
                                <span>{item.colorName}</span>
                                <span>·</span>
                                <span className="font-mono">{item.sku}</span>
                              </div>
                              <div className="text-[10px] text-[#8C827A] mt-0.5">
                                10 × 10 cm Memo Cutting
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => onRemoveSwatch(swatchKey)}
                            className="p-2 text-[#8C827A] hover:text-[#C53030] transition-colors"
                            title="Remove swatch"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <button
                      onClick={onClearSwatches}
                      className="text-xs text-[#8C827A] hover:text-[#C53030] transition-colors"
                    >
                      Clear Sample Ring
                    </button>
                    <span className="text-xs font-mono text-[#736B63]">
                      Standard Sample Box · 0.00 USD
                    </span>
                  </div>
                </div>
              )}
            </>
          )}

          {checkoutStep === 'form' && (
            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div className="pb-3 border-b border-[#E8E4DD]">
                <h4 className="font-serif text-lg font-medium text-[#1A1816]">Dispatch Details</h4>
                <p className="text-xs text-[#736B63] mt-0.5">
                  Shipment prepared in custom linen folio with technical cards.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1A1816] mb-1">
                  Specifier / Architect Name *
                </label>
                <input
                  type="text"
                  required
                  value={designerName}
                  onChange={(e) => setDesignerName(e.target.value)}
                  placeholder="e.g. Elena Rostova"
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD7CA] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1A1816] mb-1">
                  Design Studio / Architectural Firm *
                </label>
                <input
                  type="text"
                  required
                  value={firmName}
                  onChange={(e) => setFirmName(e.target.value)}
                  placeholder="e.g. Atelier Rostova Studio"
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD7CA] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1A1816] mb-1">
                  Project Title / Client Reference
                </label>
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="e.g. Lake Geneva Private Residence"
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD7CA] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1A1816] mb-1">
                  Delivery Address & Suite *
                </label>
                <input
                  type="text"
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="e.g. 450 West 24th Street, Studio 6B"
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD7CA] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1A1816] mb-1">
                  City, Postal Code & Country *
                </label>
                <input
                  type="text"
                  required
                  value={deliveryCity}
                  onChange={(e) => setDeliveryCity(e.target.value)}
                  placeholder="e.g. New York, NY 10011, USA"
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD7CA] rounded-lg text-xs"
                />
              </div>

              <div className="p-3 bg-[#FAF8F5] border border-[#E8E4DD] rounded-lg flex items-center gap-2 text-xs text-[#554F48]">
                <Truck className="w-4 h-4 text-[#2E5C46] shrink-0" />
                <span>Overnight Trade Courier: <strong>Free of Charge</strong></span>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="py-2.5 px-4 rounded-lg border border-[#D5D0C6] text-xs font-medium text-[#1A1816]"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-lg bg-[#1A1816] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#333] transition-colors"
                >
                  Confirm Dispatch Order
                </button>
              </div>
            </form>
          )}

          {checkoutStep === 'success' && (
            <div className="h-full flex flex-col items-center justify-center text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#EBF3EE] text-[#2E5C46] flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="font-mono text-xs text-[#736B63] uppercase">Order Confirmed</span>
              <h4 className="font-serif text-2xl font-medium text-[#1A1816] mt-1">
                Dispatching Memo Folio
              </h4>
              <p className="font-mono text-sm text-[#1A1816] font-semibold mt-2 bg-[#FAF8F5] px-3 py-1 rounded border border-[#E8E4DD]">
                Ref: {orderReference}
              </p>
              <p className="text-xs text-[#666059] mt-3 max-w-xs leading-relaxed">
                Your selected swatches have been forwarded to our Ghent sample logistics room. You will receive a tracking link via email once hand-packed into our sustainable cotton envelopes.
              </p>
              <button
                onClick={handleReset}
                className="mt-6 px-6 py-2.5 bg-[#1A1816] text-white text-xs font-medium rounded-lg"
              >
                Close & Return to Mill
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        {checkoutStep === 'cart' && swatches.length > 0 && (
          <div className="p-6 border-t border-[#E8E4DD] bg-[#FAF8F5] space-y-3">
            <div className="flex justify-between text-xs">
              <span className="text-[#666059]">Selected Swatches:</span>
              <span className="font-semibold text-[#1A1816]">{swatches.length} Memos</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#666059]">Trade Sample Fee:</span>
              <span className="font-medium text-[#2E5C46]">Complimentary ($0.00)</span>
            </div>
            <button
              onClick={handleProceedToForm}
              className="w-full py-3 px-4 rounded-lg bg-[#1A1816] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#333] transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Dispatch Sample Box</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
