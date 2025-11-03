// Placeholder images from Unsplash — replace with real product images.
const img = (q) => `https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop`; // generic fallback
const cigarImg = (n = 1) => `https://images.unsplash.com/photo-1541534401786-2077eed87a72?q=80&w=1600&auto=format&fit=crop`;

export const products = [
  {
    id: 'cohiba-robusto',
    name: 'Cohiba Robusto',
    price_TND: 45,
    origin: 'Cuba',
    format: 'Robusto',
    short_desc: 'Iconic Cohiba with rich, creamy smoke and impeccable construction.',
    long_desc:
      'The Cohiba Robusto is a benchmark of Cuban craftsmanship, offering a balanced profile of cedar, cocoa, and subtle spice. Perfect draw and consistent burn make it a true classic for aficionados.',
    tags: ['Premium', 'Balanced', 'Cuban'],
    images: [cigarImg(1), cigarImg(2), cigarImg(3)],
    premium: true,
  },
  {
    id: 'romeo-y-julieta-short-churchill',
    name: 'Romeo y Julieta Short Churchill',
    price_TND: 40,
    origin: 'Cuba',
    format: 'Robusto',
    short_desc: 'Elegant and smooth with notes of cedar and toasted nuts.',
    long_desc:
      'A refined expression from Romeo y Julieta featuring medium body and approachable character. Delivers classic Cuban flavors with a modern, compact format for any occasion.',
    tags: ['Elegant', 'Medium'],
    images: [cigarImg(4), cigarImg(5)],
    premium: false,
  },
  {
    id: 'montecristo-no-2',
    name: 'Montecristo No. 2',
    price_TND: 55,
    origin: 'Cuba',
    format: 'Piramide',
    short_desc: 'Legendary torpedo with bold cocoa, leather, and spice.',
    long_desc:
      'Montecristo No. 2 stands among the most revered cigars. Expect a dynamic evolution from creamy cedar to robust spice, all within a beautifully tapered torpedo format.',
    tags: ['Iconic', 'Torpedo', 'Robust'],
    images: [cigarImg(6), cigarImg(7)],
    premium: true,
  },
  {
    id: 'partagas-serie-d-no-4',
    name: 'Partagas Serie D No. 4',
    price_TND: 50,
    origin: 'Cuba',
    format: 'Robusto',
    short_desc: 'Full-bodied classic with earthy depth and peppery finish.',
    long_desc:
      'A powerhouse robusto from Partagas, the Serie D No. 4 delivers earthy richness, espresso, and black pepper with unmistakable Cuban intensity and impeccable balance.',
    tags: ['Full-bodied', 'Classic'],
    images: [cigarImg(8), cigarImg(9)],
    premium: true,
  },
  {
    id: 'hoyo-de-monterrey-epicure-no-2',
    name: 'Hoyo de Monterrey Epicure No.2',
    price_TND: 48,
    origin: 'Cuba',
    format: 'Robusto',
    short_desc: 'Silky and aromatic with cream, honey, and florals.',
    long_desc:
      'Epicure No. 2 charms with a gentle, aromatic profile – hints of cream, honey sweetness, and floral undertones – backed by superb construction and an elegant burn.',
    tags: ['Aromatic', 'Silky'],
    images: [cigarImg(10)],
    premium: false,
  },
  {
    id: 'punch-rothschild',
    name: 'Punch Rothschild',
    price_TND: 35,
    origin: 'Honduras',
    format: 'Rothschild',
    short_desc: 'Approachable yet flavorful with wood, cocoa, and gentle spice.',
    long_desc:
      'An excellent value selection delivering classic notes of wood, cocoa powder, and a touch of baking spice. Ideal for daily enjoyment without compromise.',
    tags: ['Value', 'Approachable'],
    images: [cigarImg(11)],
    premium: false,
  },
  {
    id: 'h-upmann-no-2',
    name: 'H. Upmann No. 2',
    price_TND: 52,
    origin: 'Cuba',
    format: 'Piramide',
    short_desc: 'Refined torpedo with cedar, almond, and subtle cream.',
    long_desc:
      'A refined expression from H. Upmann showcasing balance and finesse. Expect cedarwood, toasted almond, and a creamy finish that lingers gracefully.',
    tags: ['Refined', 'Balanced'],
    images: [cigarImg(12)],
    premium: true,
  },
  {
    id: 'bolivar-belicosos-finos',
    name: 'Bolivar Belicosos Finos',
    price_TND: 60,
    origin: 'Cuba',
    format: 'Belicoso',
    short_desc: 'Intense, earthy profile with cocoa and dried fruit.',
    long_desc:
      'A bold, complex Cuban with deep earth, cocoa, and touches of dried fruit. The belicoso shape concentrates aroma and flavor for a memorable experience.',
    tags: ['Intense', 'Complex'],
    images: [cigarImg(13), cigarImg(14)],
    premium: true,
  },
];

export default products;


