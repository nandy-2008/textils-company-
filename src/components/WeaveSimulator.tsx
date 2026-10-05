import React, { useState, useRef, useEffect } from 'react';
import { Sliders, RefreshCw, Eye, Sparkles, Check, Download, Layers, ShieldCheck } from 'lucide-react';

export type WeavePatternType = 'plain' | 'twill' | 'herringbone' | 'satin' | 'basket' | 'waffle';

interface WeaveSimulatorProps {
  initialWeave?: WeavePatternType;
  initialWarpColor?: string;
  initialWeftColor?: string;
  onOrderCustomStrikeoff?: (spec: {
    name: string;
    weave: string;
    warpColor: string;
    weftColor: string;
    threadCount: number;
  }) => void;
}

const PRESET_PALETTES = [
  { name: 'Raw Ecru & Indigo', warp: '#DFD8C9', weft: '#26374A' },
  { name: 'Chalk Bouclé & Silt', warp: '#EDE8DF', weft: '#9E5B47' },
  { name: 'Basalt & Natural Wool', warp: '#2F3032', weft: '#D2C7B8' },
  { name: 'Forest Lichen & Oatmeal', warp: '#4B5542', weft: '#EDE6D8' },
  { name: 'Warm Terracotta & Sand', warp: '#9E5B47', weft: '#DDD3C4' },
  { name: 'Alabaster & Bleached Flax', warp: '#F5F3EF', weft: '#ECE7DC' },
];

export const WeaveSimulator: React.FC<WeaveSimulatorProps> = ({
  initialWeave = 'twill',
  initialWarpColor = '#2F3032',
  initialWeftColor = '#D2C7B8',
  onOrderCustomStrikeoff
}) => {
  const [weavePattern, setWeavePattern] = useState<WeavePatternType>(initialWeave);
  const [warpColor, setWarpColor] = useState<string>(initialWarpColor);
  const [weftColor, setWeftColor] = useState<string>(initialWeftColor);
  const [threadDensity, setThreadDensity] = useState<number>(24); // Grid size (threads per inch approximation)
  const [yarnSlub, setYarnSlub] = useState<number>(35); // % slub irregularity
  const [activePreviewMode, setActivePreviewMode] = useState<'weave' | 'chair' | 'curtain'>('weave');
  const [copiedSpec, setCopiedSpec] = useState(false);
  const [strikeoffSent, setStrikeoffSent] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Deterministic pseudo-random slub variation
  const getSlubOffset = (idx: number, multiplier: number) => {
    const pseudo = Math.sin(idx * 7919) * 10000;
    return (pseudo - Math.floor(pseudo) - 0.5) * multiplier;
  };

  // Check if warp is over weft at coordinate (x, y) based on weave structure
  const isWarpOver = (x: number, y: number, pattern: WeavePatternType): boolean => {
    switch (pattern) {
      case 'plain':
        // 1:1 plain weave
        return (x + y) % 2 === 0;
      case 'twill':
        // 2:2 twill: 2 over, 2 under, stepped by 1 each row
        return (x - y + 1000) % 4 < 2;
      case 'herringbone': {
        // Pointed / chevron twill that mirrors every 8 ends
        const repeatWidth = 16;
        const col = x % repeatWidth;
        const normalizedCol = col < 8 ? col : 15 - col;
        return (normalizedCol - y + 1000) % 4 < 2;
      }
      case 'satin': {
        // 5-end satin weave (4 over, 1 under with step of 2 or 3)
        const step = 2;
        const satinY = (x * step) % 5;
        return (y % 5) !== satinY;
      }
      case 'basket': {
        // 2:2 basketweave
        const blockX = Math.floor(x / 2);
        const blockY = Math.floor(y / 2);
        return (blockX + blockY) % 2 === 0;
      }
      case 'waffle': {
        // 3D waffle weave cell (4x4 repeat)
        const wx = x % 4;
        const wy = y % 4;
        if ((wx === 0 && wy === 0) || (wx === 3 && wy === 3)) return true;
        if (wx === 1 && wy === 1) return false;
        return (wx + wy) % 2 === 0;
      }
      default:
        return (x + y) % 2 === 0;
    }
  };

  // Helper to adjust hex color luminosity for 3D thread shading
  const adjustColor = (hex: string, percent: number): string => {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, Math.max(0, (num >> 16) + amt));
    const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amt));
    const B = Math.min(255, Math.max(0, (num & 0x0000ff) + amt));
    return `rgb(${R}, ${G}, ${B})`;
  };

  // Draw the woven structure onto canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Background base
    ctx.fillStyle = '#141414';
    ctx.fillRect(0, 0, width, height);

    const cols = threadDensity;
    const rows = threadDensity;
    const cellW = width / cols;
    const cellH = height / rows;

    // Render each intersection with 3D thread profile
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const warpOver = isWarpOver(c, r, weavePattern);
        const x = c * cellW;
        const y = r * cellH;

        // Slub irregularity variation
        const slubFactor = (yarnSlub / 100) * 0.25;
        const warpVariation = getSlubOffset(c, slubFactor);
        const weftVariation = getSlubOffset(r, slubFactor);

        if (warpOver) {
          // Underneath: draw weft segment under
          const weftBase = adjustColor(weftColor, weftVariation * 20 - 15);
          ctx.fillStyle = weftBase;
          ctx.fillRect(x, y, cellW, cellH);

          // Cast shadow under warp
          ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
          ctx.fillRect(x, y, cellW * 0.15, cellH);
          ctx.fillRect(x + cellW * 0.85, y, cellW * 0.15, cellH);

          // Warp thread on top (vertical cylinder)
          const grad = ctx.createLinearGradient(x, y, x + cellW, y);
          grad.addColorStop(0, adjustColor(warpColor, -25 + warpVariation * 20));
          grad.addColorStop(0.25, adjustColor(warpColor, 5 + warpVariation * 20));
          grad.addColorStop(0.5, adjustColor(warpColor, 25 + warpVariation * 20)); // highlight ridge
          grad.addColorStop(0.85, adjustColor(warpColor, -10 + warpVariation * 20));
          grad.addColorStop(1, adjustColor(warpColor, -30 + warpVariation * 20));

          ctx.fillStyle = grad;
          // Thread crown curvature
          ctx.beginPath();
          ctx.roundRect(x + 0.5, y, cellW - 1, cellH, [2, 2, 2, 2]);
          ctx.fill();

          // Subtle yarn fiber striations
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(x + cellW * 0.5, y);
          ctx.lineTo(x + cellW * 0.5, y + cellH);
          ctx.stroke();

        } else {
          // Warp thread underneath
          const warpBase = adjustColor(warpColor, warpVariation * 20 - 15);
          ctx.fillStyle = warpBase;
          ctx.fillRect(x, y, cellW, cellH);

          // Cast shadow under weft
          ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
          ctx.fillRect(x, y, cellW, cellH * 0.15);
          ctx.fillRect(x, y + cellH * 0.85, cellW, cellH * 0.15);

          // Weft thread on top (horizontal cylinder)
          const grad = ctx.createLinearGradient(x, y, x, y + cellH);
          grad.addColorStop(0, adjustColor(weftColor, -25 + weftVariation * 20));
          grad.addColorStop(0.25, adjustColor(weftColor, 5 + weftVariation * 20));
          grad.addColorStop(0.5, adjustColor(weftColor, 25 + weftVariation * 20)); // highlight ridge
          grad.addColorStop(0.85, adjustColor(weftColor, -10 + weftVariation * 20));
          grad.addColorStop(1, adjustColor(weftColor, -30 + weftVariation * 20));

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.roundRect(x, y + 0.5, cellW, cellH - 1, [2, 2, 2, 2]);
          ctx.fill();

          // Horizontal fiber striation
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(x, y + cellH * 0.5);
          ctx.lineTo(x + cellW, y + cellH * 0.5);
          ctx.stroke();
        }
      }
    }
  }, [weavePattern, warpColor, weftColor, threadDensity, yarnSlub]);

  const handleCopySpec = () => {
    const spec = `VANE & WEFT CUSTOM WEAVE SPECIFICATION
---------------------------------------------
Weave Structure: ${weavePattern.toUpperCase()}
Warp Yarn: ${warpColor} (Density: ${threadDensity * 2} Ends/Inch)
Weft Yarn: ${weftColor} (Density: ${threadDensity * 2} Picks/Inch)
Yarn Character: Slub Factor ${yarnSlub}% Bast Twist
Fabric Hand: Structural Architectural Drape
Ref ID: VW-CUSTOM-${Date.now().toString(36).toUpperCase()}
Mill: Biella Rapier & Shuttle Facilities`;

    navigator.clipboard.writeText(spec);
    setCopiedSpec(true);
    setTimeout(() => setCopiedSpec(false), 2400);
  };

  const handleRequestStrikeoff = () => {
    setStrikeoffSent(true);
    if (onOrderCustomStrikeoff) {
      onOrderCustomStrikeoff({
        name: `Custom ${weavePattern.toUpperCase()} Strike-off`,
        weave: weavePattern,
        warpColor,
        weftColor,
        threadCount: threadDensity * 2
      });
    }
    setTimeout(() => setStrikeoffSent(false), 4000);
  };

  return (
    <div className="bg-white border border-[#E8E4DD] rounded-xl shadow-xs overflow-hidden">
      {/* Header bar */}
      <div className="p-6 md:p-8 border-b border-[#E8E4DD] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#8C827A] mb-1">
            <span>Mill Studio Simulator</span>
            <span>·</span>
            <span>Digital Weaving Harness</span>
            <span>·</span>
            <span className="text-[#3A7B5E] font-medium">Live Interlace</span>
          </div>
          <h3 className="font-serif text-2xl md:text-3xl font-medium text-[#1A1816]">
            Architectural Weave Studio
          </h3>
          <p className="text-sm text-[#666059] mt-1 max-w-xl">
            Simulate custom warp and weft intersections in real time. Formulate bespoke yarn color harmonies and examine structural weave bindings prior to loom setup.
          </p>
        </div>

        {/* View mode switcher */}
        <div className="flex items-center bg-[#F4F1EA] p-1 rounded-lg border border-[#E4DFD5] self-start md:self-auto">
          <button
            onClick={() => setActivePreviewMode('weave')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activePreviewMode === 'weave'
                ? 'bg-white text-[#1A1816] shadow-xs'
                : 'text-[#666059] hover:text-[#1A1816]'
            }`}
          >
            Thread Microscope
          </button>
          <button
            onClick={() => setActivePreviewMode('curtain')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activePreviewMode === 'curtain'
                ? 'bg-white text-[#1A1816] shadow-xs'
                : 'text-[#666059] hover:text-[#1A1816]'
            }`}
          >
            Ripplefold Curtain
          </button>
          <button
            onClick={() => setActivePreviewMode('chair')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activePreviewMode === 'chair'
                ? 'bg-white text-[#1A1816] shadow-xs'
                : 'text-[#666059] hover:text-[#1A1816]'
            }`}
          >
            Armchair Drape
          </button>
        </div>
      </div>

      {/* Main Studio Body: Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Interactive Canvas / Visualizer (7 cols) */}
        <div className="lg:col-span-7 p-6 md:p-8 bg-[#FBFBFA] border-b lg:border-b-0 lg:border-r border-[#E8E4DD] flex flex-col items-center justify-center">
          <div className="relative w-full aspect-square max-w-[500px] rounded-lg overflow-hidden border border-[#DDD8CE] shadow-sm bg-[#1A1816]">
            {activePreviewMode === 'weave' && (
              <>
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover block"
                />
                {/* Microscope Scale Badge */}
                <div className="absolute bottom-3 left-3 bg-[#1C1A17]/85 text-white/90 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] font-mono border border-white/10">
                  <span>Zoom 25x</span>
                  <span className="mx-1.5 text-white/40">·</span>
                  <span>{threadDensity * 2} E/I</span>
                  <span className="mx-1.5 text-white/40">·</span>
                  <span className="capitalize">{weavePattern}</span>
                </div>
              </>
            )}

            {activePreviewMode === 'curtain' && (
              <div className="relative w-full h-full bg-[#18181B] flex items-center justify-center overflow-hidden">
                {/* Architectural Ripplefold Drapery simulation */}
                <div className="absolute inset-0 opacity-40">
                  <canvas
                    ref={canvasRef}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Drapery Folds Gradient Mask */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `
                      linear-gradient(90deg, 
                        rgba(0,0,0,0.85) 0%, 
                        rgba(255,255,255,0.15) 15%, 
                        rgba(0,0,0,0.7) 30%, 
                        rgba(255,255,255,0.2) 45%, 
                        rgba(0,0,0,0.8) 60%, 
                        rgba(255,255,255,0.15) 75%, 
                        rgba(0,0,0,0.85) 90%, 
                        rgba(255,255,255,0.1) 100%),
                      linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 15%, rgba(0,0,0,0.6) 100%)
                    `,
                    mixBlendMode: 'multiply'
                  }}
                />
                {/* Architectural curtain header rod */}
                <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-[#111] to-[#2B2B2B] border-b border-black" />
                <div className="absolute top-4 inset-x-4 flex justify-between">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="w-1.5 h-3 bg-[#444] rounded-xs shadow-xs" />
                  ))}
                </div>

                <div className="absolute bottom-4 left-4 bg-black/75 text-white/90 backdrop-blur-xs px-3 py-1.5 rounded text-xs">
                  <p className="font-serif italic text-sm">Architectural Ripplefold Spec</p>
                  <p className="text-[11px] text-white/60">Calculated with 2.1x fullness fullness drape</p>
                </div>
              </div>
            )}

            {activePreviewMode === 'chair' && (
              <div className="relative w-full h-full bg-[#EAE7E1] flex items-center justify-center p-8 overflow-hidden">
                {/* 3D Modern Curved Armchair Mockup with Live Fabric Fill */}
                <div className="relative w-64 h-64 flex flex-col items-center justify-center">
                  {/* Chair Backrest */}
                  <div 
                    className="relative w-56 h-36 rounded-t-3xl overflow-hidden shadow-lg border border-black/10"
                    style={{ backgroundColor: warpColor }}
                  >
                    <div className="absolute inset-0 opacity-80 mix-blend-overlay">
                      <canvas
                        ref={canvasRef}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Shadow & Contour Lighting */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/20" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/25" />
                  </div>

                  {/* Seat Cushion */}
                  <div 
                    className="relative w-60 h-20 -mt-2 rounded-2xl overflow-hidden shadow-xl border border-black/15 z-10"
                    style={{ backgroundColor: weftColor }}
                  >
                    <div className="absolute inset-0 opacity-80 mix-blend-overlay">
                      <canvas
                        ref={canvasRef}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/50" />
                  </div>

                  {/* Minimalist Brushed Steel Legs */}
                  <div className="w-52 flex justify-between px-6 -mt-1 z-0">
                    <div className="w-2.5 h-16 bg-gradient-to-r from-[#222] via-[#555] to-[#111] transform -rotate-6 origin-top" />
                    <div className="w-2.5 h-16 bg-gradient-to-r from-[#222] via-[#555] to-[#111] transform rotate-6 origin-top" />
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 bg-white/90 text-[#1A1816] backdrop-blur-xs px-3 py-1.5 rounded text-xs border border-[#DDD8CE]">
                  <p className="font-serif font-medium">Curved Lounge Armchair</p>
                  <p className="text-[11px] text-[#666059]">High-rub Martindale upholstery test</p>
                </div>
              </div>
            )}
          </div>

          {/* Quick preset color harmony bar */}
          <div className="w-full max-w-[500px] mt-4 flex items-center justify-between gap-2 overflow-x-auto py-1">
            <span className="text-[11px] uppercase tracking-wider text-[#8C827A] whitespace-nowrap">Mill Harmonies:</span>
            <div className="flex items-center gap-1.5">
              {PRESET_PALETTES.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setWarpColor(preset.warp);
                    setWeftColor(preset.weft);
                  }}
                  title={preset.name}
                  className="flex items-center gap-0.5 p-1 rounded-sm border border-[#DDD8CE] hover:border-[#8C827A] transition-all bg-white"
                >
                  <div className="w-3.5 h-3.5 rounded-xs" style={{ backgroundColor: preset.warp }} />
                  <div className="w-3.5 h-3.5 rounded-xs" style={{ backgroundColor: preset.weft }} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Controls Panel (5 cols) */}
        <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between space-y-6">
          {/* Controls Form */}
          <div className="space-y-6">
            {/* 1. Weave Structure Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1816] mb-2">
                1. Structural Weave Pattern
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { id: 'plain', label: 'Plain 1:1', desc: 'Flax / Canvas' },
                    { id: 'twill', label: 'Twill 2:2', desc: 'Dense Diagonal' },
                    { id: 'herringbone', label: 'Chevron', desc: 'Fine Worsted' },
                    { id: 'satin', label: 'Satin 4:1', desc: 'Lustrous Silk' },
                    { id: 'basket', label: 'Basketweave', desc: 'Architectural' },
                    { id: 'waffle', label: 'Waffle Cell', desc: '3D Texture' },
                  ] as const
                ).map((pat) => (
                  <button
                    key={pat.id}
                    onClick={() => setWeavePattern(pat.id)}
                    className={`p-2.5 text-left border rounded-lg transition-all ${
                      weavePattern === pat.id
                        ? 'border-[#1A1816] bg-[#F7F5EE] shadow-xs'
                        : 'border-[#E4DFD5] hover:border-[#8C827A] bg-white'
                    }`}
                  >
                    <div className="text-xs font-medium text-[#1A1816] leading-none mb-1">
                      {pat.label}
                    </div>
                    <div className="text-[11px] text-[#8C827A] leading-tight">
                      {pat.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Warp & Weft Yarn Colors */}
            <div className="space-y-3 pt-2 border-t border-[#EFECE6]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#1A1816]">
                  2. Yarn Dye Formulation
                </label>
                <button
                  onClick={() => {
                    const temp = warpColor;
                    setWarpColor(weftColor);
                    setWeftColor(temp);
                  }}
                  className="flex items-center gap-1 text-[11px] text-[#8C827A] hover:text-[#1A1816] transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Invert Warp/Weft</span>
                </button>
              </div>

              {/* Warp Color Control */}
              <div className="flex items-center justify-between p-3 border border-[#E4DFD5] rounded-lg bg-[#FAF8F5]">
                <div>
                  <div className="text-xs font-medium text-[#1A1816]">Warp Ends (Vertical)</div>
                  <div className="text-[11px] text-[#8C827A] font-mono">{warpColor.toUpperCase()}</div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={warpColor}
                    onChange={(e) => setWarpColor(e.target.value)}
                    className="w-8 h-8 rounded border border-[#CCC] cursor-pointer bg-transparent"
                  />
                </div>
              </div>

              {/* Weft Color Control */}
              <div className="flex items-center justify-between p-3 border border-[#E4DFD5] rounded-lg bg-[#FAF8F5]">
                <div>
                  <div className="text-xs font-medium text-[#1A1816]">Weft Picks (Horizontal)</div>
                  <div className="text-[11px] text-[#8C827A] font-mono">{weftColor.toUpperCase()}</div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={weftColor}
                    onChange={(e) => setWeftColor(e.target.value)}
                    className="w-8 h-8 rounded border border-[#CCC] cursor-pointer bg-transparent"
                  />
                </div>
              </div>
            </div>

            {/* 3. Thread Density & Slub Sliders */}
            <div className="space-y-3 pt-2 border-t border-[#EFECE6]">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium text-[#1A1816]">Thread Sett / Density</span>
                  <span className="font-mono text-[#8C827A]">{threadDensity * 2} Threads / Inch</span>
                </div>
                <input
                  type="range"
                  min="16"
                  max="36"
                  step="2"
                  value={threadDensity}
                  onChange={(e) => setThreadDensity(Number(e.target.value))}
                  className="w-full accent-[#1A1816] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium text-[#1A1816]">Natural Bast Slub & Yarn Grain</span>
                  <span className="font-mono text-[#8C827A]">{yarnSlub}% Raw Slub</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="70"
                  value={yarnSlub}
                  onChange={(e) => setYarnSlub(Number(e.target.value))}
                  className="w-full accent-[#1A1816] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-[#E8E4DD] space-y-2">
            <button
              onClick={handleRequestStrikeoff}
              disabled={strikeoffSent}
              className={`w-full py-3 px-4 rounded-lg font-medium text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 ${
                strikeoffSent
                  ? 'bg-[#2E5C46] text-white'
                  : 'bg-[#1A1816] text-white hover:bg-[#2F2C28]'
              }`}
            >
              {strikeoffSent ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Strike-Off Requested · Production Queue</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Order Custom Strike-Off Swatch</span>
                </>
              )}
            </button>

            <button
              onClick={handleCopySpec}
              className="w-full py-2.5 px-4 rounded-lg border border-[#D5D0C6] text-xs font-medium text-[#3A352F] hover:bg-[#F7F5EE] transition-colors flex items-center justify-center gap-2"
            >
              {copiedSpec ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#2E5C46]" />
                  <span>Specification Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Mill Weave Specification (.TXT)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
