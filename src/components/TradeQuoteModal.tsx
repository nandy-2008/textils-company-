import React, { useState } from 'react';
import { X, CheckCircle2, Send, FileText, Building2 } from 'lucide-react';
import { TEXTILE_CATALOG } from '../data/textiles';

interface TradeQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDetails?: {
    projectType: string;
    textileName: string;
    quantityYards: number;
    estimatedCost: number;
  } | null;
}

export const TradeQuoteModal: React.FC<TradeQuoteModalProps> = ({
  isOpen,
  onClose,
  initialDetails
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    firm: '',
    email: '',
    phone: '',
    textile: initialDetails?.textileName || TEXTILE_CATALOG[0].name,
    projectType: initialDetails?.projectType || 'Residential Upholstery',
    yards: initialDetails?.quantityYards || 35,
    customDyeMatch: false,
    pantoneCode: '',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-[#DDD7CA] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white hover:bg-[#F2EFEA] text-[#1A1816] flex items-center justify-center border border-[#E0DACE] transition-colors"
          aria-label="Close quote modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 sm:p-8">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <span className="text-xs font-mono uppercase text-[#736B63] tracking-wider block mb-1">
                  Mill Direct · Trade & Architectural Sales
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1816]">
                  Request Formal Pro-Forma Quote
                </h3>
                <p className="text-xs text-[#666059] mt-1.5">
                  Receive firm yardage pricing, roll allocations, certificate packages, and logistics timelines within 24 business hours.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-medium text-[#1A1816] mb-1">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Marcus Lindqvist"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD7CA] rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1A1816] mb-1">
                    Design Firm / Practice *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firm}
                    onChange={(e) => setFormData({ ...formData, firm: e.target.value })}
                    placeholder="Lindqvist Architecture Studio"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD7CA] rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#1A1816] mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="marcus@lindqvist.design"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD7CA] rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1A1816] mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (212) 555-0198"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD7CA] rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#1A1816] mb-1">
                    Specified Textile
                  </label>
                  <select
                    value={formData.textile}
                    onChange={(e) => setFormData({ ...formData, textile: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD7CA] rounded-lg text-xs"
                  >
                    {TEXTILE_CATALOG.map((t) => (
                      <option key={t.id} value={t.name}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1A1816] mb-1">
                    Estimated Linear Yardage
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.yards}
                    onChange={(e) => setFormData({ ...formData, yards: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD7CA] rounded-lg text-xs font-mono"
                  />
                </div>
              </div>

              {/* Custom Pantone match option */}
              <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E8E4DD] space-y-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={formData.customDyeMatch}
                    onChange={(e) => setFormData({ ...formData, customDyeMatch: e.target.checked })}
                    className="rounded border-[#CCC] text-[#1A1816] focus:ring-0"
                  />
                  <span className="font-medium text-[#1A1816]">Request Bespoke Dye Strike-Off (Pantone / TCX Matching)</span>
                </label>
                {formData.customDyeMatch && (
                  <input
                    type="text"
                    placeholder="Enter Pantone TCX / RAL reference code (e.g. 19-4052 TCX Classic Blue)"
                    value={formData.pantoneCode}
                    onChange={(e) => setFormData({ ...formData, pantoneCode: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-[#DDD7CA] rounded text-xs"
                  />
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1A1816] mb-1">
                  Project Notes & Delivery Specifications
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Include any acoustic testing, flame retardancy certifications (BS 5852 Crib 5), or site delivery constraints..."
                  className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#DDD7CA] rounded-lg text-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-lg bg-[#1A1816] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#333] transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Pro-Forma Quote Request</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#EBF3EE] text-[#2E5C46] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="font-mono text-xs uppercase text-[#736B63]">Quote Ref: VW-QUO-{Math.floor(10000 + Math.random() * 90000)}</span>
              <h4 className="font-serif text-2xl font-medium text-[#1A1816] mt-1">
                Pro-Forma Inquiry Received
              </h4>
              <p className="text-xs text-[#554F48] mt-2 max-w-sm mx-auto leading-relaxed">
                Thank you, {formData.name}. Our commercial trade team at the Ghent mill is reviewing the bolt allocation for <strong>{formData.yards} yards</strong> of <strong>{formData.textile}</strong>. A formal PDF pro-forma invoice will arrive at <strong>{formData.email}</strong>.
              </p>
              <button
                onClick={handleReset}
                className="mt-6 px-6 py-2.5 bg-[#1A1816] text-white text-xs font-medium rounded-lg"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
