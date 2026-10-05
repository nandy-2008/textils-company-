export interface Colorway {
  id: string;
  name: string;
  hex: string;
  yarnBlend: string;
}

export interface TextileProduct {
  id: string;
  sku: string;
  name: string;
  subtitle: string;
  application: 'Upholstery' | 'Drapery' | 'Contract' | 'Apparel';
  material: 'Belgian Linen' | 'Merino Wool' | 'Structured Bouclé' | 'Mulberry Silk' | 'Recycled Twill';
  weaveType: 'Herringbone' | 'Plain Weave' | 'Bouclé' | 'Twill' | 'Satin' | 'Waffle';
  composition: string;
  weightGsm: number;
  widthCm: number;
  martindaleRubs: number;
  lightfastness: string;
  flameRating: string;
  acousticRating?: string;
  pricePerYard: number;
  tierPricing: {
    minYards: number;
    price: number;
  }[];
  leadTimeWeeks: number;
  inStockYards: number;
  image: string;
  colorways: Colorway[];
  description: string;
  suitableFor: string[];
  careInstructions: string;
  millOrigin: string;
}

export const TEXTILE_CATALOG: TextileProduct[] = [
  {
    id: 'boucle-monolith',
    sku: 'VW-BOU-01',
    name: 'Monolith Architectural Bouclé',
    subtitle: 'Heavy tactile wool-blend bouclé with sculptural looped pile',
    application: 'Upholstery',
    material: 'Structured Bouclé',
    weaveType: 'Bouclé',
    composition: '68% Pure New Wool, 22% Cotton, 10% Linen',
    weightGsm: 780,
    widthCm: 140,
    martindaleRubs: 85000,
    lightfastness: 'Scale 6 (ISO 105-B02)',
    flameRating: 'CAL 117-2013 / BS 5852 Crib 5',
    acousticRating: 'αw 0.75 (Class C)',
    pricePerYard: 118,
    tierPricing: [
      { minYards: 1, price: 118 },
      { minYards: 25, price: 98 },
      { minYards: 100, price: 82 }
    ],
    leadTimeWeeks: 2,
    inStockYards: 840,
    image: '/src/assets/images/fabric_boucle_texture_1791181394405.jpg',
    colorways: [
      { id: 'c1', name: 'Raw Chalk', hex: '#EDE8DF', yarnBlend: 'Unbleached Carded Wool' },
      { id: 'c2', name: 'Oatmeal Taupe', hex: '#D2C7B8', yarnBlend: 'Flecked Heather Weft' },
      { id: 'c3', name: 'Charcoal Basalt', hex: '#343330', yarnBlend: 'Dyed Merino Slate' },
      { id: 'c4', name: 'Terracotta Silt', hex: '#9E5B47', yarnBlend: 'Mineral Washed Wool' },
      { id: 'c5', name: 'Forest Lichen', hex: '#4B5542', yarnBlend: 'Botanical Earth Weft' }
    ],
    description: 'Developed in collaboration with leading furniture ateliers, Monolith is a sculptural, three-dimensional bouclé woven on specialized rapier looms in Biella. The heavy textured loops provide comforting warmth and tactile richness, certified for rigorous commercial hospitality and residential seating.',
    suitableFor: ['Curved Sofas', 'Lounge Armchairs', 'Acoustic Wall Panels', 'Custom Ottomans'],
    careInstructions: 'Professional dry clean only with pure solvent. Vacuum gently with upholstery attachment. Spot clean with damp lint-free cloth.',
    millOrigin: 'Biella Woolen Mill, Piedmont, Italy'
  },
  {
    id: 'flanders-raw-linen',
    sku: 'VW-LIN-04',
    name: 'Flanders Raw Slub Linen',
    subtitle: 'Washed architectural drapery woven from double-twist Normandy flax',
    application: 'Drapery',
    material: 'Belgian Linen',
    weaveType: 'Plain Weave',
    composition: '100% Normandy Certified Flax',
    weightGsm: 340,
    widthCm: 300,
    martindaleRubs: 30000,
    lightfastness: 'Scale 5-6 (ISO 105-B02)',
    flameRating: 'NFPA 701 (Inherent Flax / Treated option)',
    pricePerYard: 84,
    tierPricing: [
      { minYards: 1, price: 84 },
      { minYards: 25, price: 68 },
      { minYards: 100, price: 54 }
    ],
    leadTimeWeeks: 1,
    inStockYards: 1250,
    image: '/src/assets/images/fabric_indigo_linen_1791181408586.jpg',
    colorways: [
      { id: 'c1', name: 'Deep Indigo Slub', hex: '#26374A', yarnBlend: 'Vat-Dyed Normandy Flax' },
      { id: 'c2', name: 'Bleached Salt', hex: '#F5F3EF', yarnBlend: 'Sun-Bleached Long Flax' },
      { id: 'c3', name: 'Natural Ecru', hex: '#DFD8C9', yarnBlend: 'Unretted Bast Fiber' },
      { id: 'c4', name: 'Muted Celadon', hex: '#879486', yarnBlend: 'Low-Impact Pigment Dye' },
      { id: 'c5', name: 'Smoked Amber', hex: '#84694E', yarnBlend: 'Organic Earth Bark' }
    ],
    description: 'Extra-wide 300cm seamless drapery woven exclusively from wet-spun long-staple European flax. The authentic irregular slub yarn diffuses natural daylight into a warm, gentle ambient glow without pooling or static build-up. Enzyme washed for an effortless, architectural drape.',
    suitableFor: ['Floor-to-Ceiling Drapery', 'Ripplefold Curtain Tracks', 'Room Dividers', 'Soft Roman Blinds'],
    careInstructions: 'Dry clean recommended. May be hand-washed at 30°C delicate cycle; line dry in shade and iron damp with high steam.',
    millOrigin: 'Ghent Weaving Works, Flanders, Belgium'
  },
  {
    id: 'nordic-herringbone-wool',
    sku: 'VW-WOL-09',
    name: 'Nordic Chevron Suiting & Upholstery',
    subtitle: 'Dense worsted chevron weave with high Martindale abrasion resistance',
    application: 'Contract',
    material: 'Merino Wool',
    weaveType: 'Herringbone',
    composition: '82% Tasmanian Merino Wool, 18% Polyamide Reinforcement',
    weightGsm: 520,
    widthCm: 142,
    martindaleRubs: 110000,
    lightfastness: 'Scale 7 (ISO 105-B02)',
    flameRating: 'EN 1021 Part 1 & 2 / IMO FTP Code 2010',
    acousticRating: 'αw 0.80 (Class B)',
    pricePerYard: 126,
    tierPricing: [
      { minYards: 1, price: 126 },
      { minYards: 25, price: 104 },
      { minYards: 100, price: 88 }
    ],
    leadTimeWeeks: 2,
    inStockYards: 620,
    image: '/src/assets/images/fabric_herringbone_wool_1791181420006.jpg',
    colorways: [
      { id: 'c1', name: 'Basalt & Ecru', hex: '#3B3C3E', yarnBlend: 'Worsted Two-Ply Chevron' },
      { id: 'c2', name: 'Camel & Biscuit', hex: '#B29777', yarnBlend: 'Non-Mulesed Raw Wool' },
      { id: 'c3', name: 'Navy & Ink', hex: '#1C2837', yarnBlend: 'High-Twist Navy Weft' },
      { id: 'c4', name: 'Moss & Olive', hex: '#4A533E', yarnBlend: 'Botanical Lichen Yarn' }
    ],
    description: 'An iconic 2-ply worsted chevron weave crafted for high-traffic executive suites, civic buildings, and fine upholstery. Tested to 110,000 Martindale rubs, it resists pilling and friction while retaining the supple warmth and moisture-regulating characteristics of natural wool.',
    suitableFor: ['Executive Seating', 'Auditorium Chairs', 'Bench Seating', 'Tailored Tailoring'],
    careInstructions: 'Professional dry cleaning only. Brushed with natural bristle brush to maintain pile alignment.',
    millOrigin: 'West Riding Woolen Weavers, Yorkshire & Biella'
  },
  {
    id: 'atrium-sheer-linen',
    sku: 'VW-LIN-02',
    name: 'Atrium Gossamer Sheer',
    subtitle: 'Airy open-sett architectural linen sheer with natural light transmittance',
    application: 'Drapery',
    material: 'Belgian Linen',
    weaveType: 'Plain Weave',
    composition: '100% Pure Certified European Linen',
    weightGsm: 180,
    widthCm: 320,
    martindaleRubs: 15000,
    lightfastness: 'Scale 6 (ISO 105-B02)',
    flameRating: 'Inherently Low Flammability / NFPA 701 Pass',
    pricePerYard: 92,
    tierPricing: [
      { minYards: 1, price: 92 },
      { minYards: 25, price: 74 },
      { minYards: 100, price: 60 }
    ],
    leadTimeWeeks: 1,
    inStockYards: 980,
    image: '/src/assets/images/interior_textile_drapery_1791181430429.jpg',
    colorways: [
      { id: 'c1', name: 'Warm Alabaster', hex: '#F7F5EE', yarnBlend: 'Micro-Fine Belgian Flax' },
      { id: 'c2', name: 'Mist Greige', hex: '#DBD6CC', yarnBlend: 'Natural Grey Bast' },
      { id: 'c3', name: 'Pale Mineral', hex: '#CCD3CE', yarnBlend: 'River Washed Flax' },
      { id: 'c4', name: 'Sunken Dune', hex: '#C3B59F', yarnBlend: 'Unprocessed Raw Linen' }
    ],
    description: 'Woven with extra fine Nm 36/1 wet-spun yarn at an airy open sett. Atrium balances privacy and views, transforming hard sunlight into soft, dappled daylight without obscuring exterior architectural landscapes. Seamless 3.2-meter drop prevents unsightly horizontal seams.',
    suitableFor: ['Double-Height Atriums', 'Minimalist Penthouses', 'Hotel Guestrooms', 'Frameless Glass Glazing'],
    careInstructions: 'Delicate cold machine wash in mesh bag. Hang damp to self-align gravity drape.',
    millOrigin: 'Ghent Weaving Works, Flanders, Belgium'
  },
  {
    id: 'solano-jacquard-recycled',
    sku: 'VW-REC-07',
    name: 'Solano Micro-Twill Contract Weave',
    subtitle: 'High-performance stain-repellent weave utilizing post-consumer maritime fibers',
    application: 'Contract',
    material: 'Recycled Twill',
    weaveType: 'Twill',
    composition: '65% SEAQUAL® Marine Polymer, 35% Recycled Cotton',
    weightGsm: 440,
    widthCm: 140,
    martindaleRubs: 125000,
    lightfastness: 'Scale 8 (Maximum)',
    flameRating: 'CAL 117 / EN 1021 / IMO Res A.652',
    pricePerYard: 72,
    tierPricing: [
      { minYards: 1, price: 72 },
      { minYards: 25, price: 58 },
      { minYards: 100, price: 46 }
    ],
    leadTimeWeeks: 1,
    inStockYards: 1650,
    image: '/src/assets/images/hero_textile_loom_1791181378720.jpg',
    colorways: [
      { id: 'c1', name: 'Raw Flint', hex: '#636569', yarnBlend: 'Marine Upcycled Fiber' },
      { id: 'c2', name: 'Deep Cobalt', hex: '#1C325B', yarnBlend: 'Dope-Dyed Filament' },
      { id: 'c3', name: 'Silt Sand', hex: '#BBB09D', yarnBlend: 'Recycled Organic Cotton Weft' },
      { id: 'c4', name: 'Cedar Ochre', hex: '#8C673B', yarnBlend: 'Heavy Twill Blend' }
    ],
    description: 'Engineered specifically for heavy contract use in healthcare, luxury transportation, and high-footfall restaurants. Certified zero PFAS fluorochemical finish provides natural liquid repellency while feeling soft to the hand, diverting 1.8kg of ocean plastic per linear meter.',
    suitableFor: ['Restaurant Banquettes', 'Airport Lounges', 'Hospitality Headboards', 'Workspace Booths'],
    careInstructions: 'Water-based foam cleaner or dilute 1:10 bleach solution safe. Bleach cleanable without color degradation.',
    millOrigin: 'Vane Technical Lab, Mulhouse, France'
  }
];

export interface SwatchItem {
  textileId: string;
  colorwayId: string;
  name: string;
  colorName: string;
  colorHex: string;
  material: string;
  sku: string;
  image: string;
  addedAt: number;
}
