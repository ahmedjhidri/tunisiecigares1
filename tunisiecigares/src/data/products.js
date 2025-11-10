// tunisiecigares/src/data/products.js
// Different cigar images from Unsplash
const cigarImages = [
  'https://images.unsplash.com/photo-1541534401786-2077eed87a72?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1606663889134-b1dedb5ed8b7?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1556388685-d5c4c0f29f07?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600788907416-456578634209?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1516570161787-2fd917215a3d?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1600&auto=format&fit=crop',
];

// Get image with variety
const getCigarImg = (index) => cigarImages[index % cigarImages.length];

export const products = [
  {
    id: 'cohiba-robusto',
    name: 'Cohiba Robusto',
    name_fr: 'Cigare Cohiba Robusto',
    brand: 'Cohiba',
    price_TND: 45,
    price_EUR: 14,
    stock: 5,
    in_stock: true,
    stock_quantity: 5,
    box_size: 'Boîte de 10',
    unit_info: 'À l\'unité',
    origin: 'Cuba',
    format: 'Robusto',
    length: '124mm',
    ring_gauge: '50',
    strength: 'Medium to Full',
    smoking_time: '45-60 minutes',
    short_desc: 'Le Cohiba Robusto est l\'un des cigares cubains les plus emblématiques, reconnu pour sa qualité exceptionnelle et son profil de saveurs complexe.',
    long_desc: `Le Cohiba Robusto incarne l'excellence de l'artisanat cubain. Fabriqué à la main dans les plus prestigieuses manufactures de La Havane, ce cigare offre une expérience sensorielle incomparable.

**Caractéristiques principales :**
- Format : Robusto (124mm x 50)
- Temps de fumage : 45 à 60 minutes
- Force : Moyenne à Pleine
- Provenance : Cuba (Habanos S.A.)

**Profil de saveurs :**
Le Cohiba Robusto révèle une progression complexe de saveurs. Les premières bouffées offrent des notes de cèdre et de noisette, qui évoluent progressivement vers des saveurs plus riches de cacao, de cuir et d'épices douces. La finale apporte des touches de terre et de poivre noir, créant une expérience équilibrée et raffinée.

**Conseils de dégustation :**
- Coupez le cigare avec soin pour préserver la capa
- Allumez-le uniformément pour assurer une combustion régulière
- Prenez votre temps pour apprécier chaque bouffée
- Accompagnez d'un espresso, d'un rhum vieilli ou d'un cognac

**Conservation :**
Conservez ce cigare dans un humidor à 65-70% d'humidité et à une température de 18-20°C pour préserver ses qualités optimales.`,
    tasting_notes: ['Cèdre', 'Cacao', 'Cuir', 'Poivre', 'Terre', 'Noisette'],
    pairing_suggestions: ['Espresso', 'Rhum vieilli', 'Cognac'],
    tags: ['Premium', 'Équilibré', 'Cubain', 'Icônique'],
    // Pour utiliser de vraies images, remplacez par :
    // images: ['/images/products/cohiba-robusto/main.jpg', '/images/products/cohiba-robusto/detail-1.jpg', '/images/products/cohiba-robusto/detail-2.jpg'],
    images: [getCigarImg(0), getCigarImg(1), getCigarImg(2)],
    premium: true,
    featured: true,
    new_arrival: false,
    rating: 4.8,
    reviews_count: 24,
  },
  {
    id: 'romeo-y-julieta-short-churchill',
    name: 'Romeo y Julieta Short Churchill',
    name_fr: 'Cigare Romeo y Julieta Short Churchill',
    brand: 'Romeo y Julieta',
    price_TND: 40,
    price_EUR: 12,
    stock: 0,
    in_stock: false,
    stock_quantity: 0,
    box_size: 'Boîte de 10',
    unit_info: 'À l\'unité',
    origin: 'Cuba',
    format: 'Robusto',
    length: '110mm',
    ring_gauge: '50',
    strength: 'Medium',
    smoking_time: '40-50 minutes',
    short_desc: 'Expression élégante et raffinée de Romeo y Julieta, alliant la tradition cubaine à un format moderne et compact.',
    long_desc: `Le Romeo y Julieta Short Churchill est une création raffinée qui capture l'essence de la marque légendaire dans un format compact et moderne. Ce cigare allie élégance et accessibilité, parfait pour les occasions quotidiennes comme pour les moments spéciaux.

**Caractéristiques principales :**
- Format : Robusto (110mm x 50)
- Temps de fumage : 40 à 50 minutes
- Force : Moyenne
- Provenance : Cuba (Habanos S.A.)

**Profil de saveurs :**
Ce cigare dévoile un profil délicat et harmonieux. Les premières bouffées révèlent des notes de cèdre frais et de noisette toastée, suivies d'une progression vers des saveurs crémeuses et vanillées. La finale apporte une touche subtile de miel et d'amande, créant une expérience douce et agréable.

**Conseils de dégustation :**
- Format compact, idéal pour une pause déjeuner ou un après-midi
- Coupe nette recommandée pour une tirade optimale
- Accompagnez d'un café ou d'un whisky léger
- Parfait pour les amateurs débutants comme pour les connaisseurs

**Accompagnements recommandés :**
- Café ou espresso
- Whisky Highland ou Lowland
- Porto rubis
- Vin rouge léger

**Conservation :**
Conservez dans un humidor à 65-70% d'humidité relative à une température de 18-20°C.`,
    tasting_notes: ['Cèdre', 'Noisette toastée', 'Crème', 'Vanille', 'Miel'],
    pairing_suggestions: ['Café', 'Whisky', 'Porto'],
    tags: ['Élégant', 'Moyen', 'Accessible', 'Cubain'],
    // Pour utiliser de vraies images, remplacez par :
    // images: ['/images/products/romeo-y-julieta-short-churchill/main.jpg', '/images/products/romeo-y-julieta-short-churchill/detail-1.jpg'],
    images: [getCigarImg(3), getCigarImg(4)],
    premium: false,
    featured: false,
    new_arrival: false,
    rating: 4.5,
    reviews_count: 18,
  },
  {
    id: 'montecristo-no-2',
    name: 'Montecristo No. 2',
    name_fr: 'Cigare Montecristo No. 2',
    brand: 'Montecristo',
    price_TND: 55,
    price_EUR: 17,
    stock: 8,
    in_stock: true,
    stock_quantity: 8,
    box_size: 'Unité',
    unit_info: 'À l\'unité',
    origin: 'Cuba',
    format: 'Piramide',
    length: '156mm',
    ring_gauge: '52',
    strength: 'Full',
    smoking_time: '60-75 minutes',
    short_desc: 'Légendaire torpedo cubain reconnu dans le monde entier pour son profil de saveurs complexe et sa construction impeccable.',
    long_desc: `Le Montecristo No. 2 est une légende parmi les cigares cubains. Cette forme torpedo élégante est reconnue dans le monde entier pour son profil de saveurs complexe et sa construction impeccable.

**Caractéristiques :**
- Format : Torpedo (156mm x 52)
- Temps de fumage : 60 à 75 minutes
- Force : Pleine
- Origine : Cuba (Habanos S.A.)

**Expérience de dégustation :**
Le Montecristo No. 2 offre un voyage sensoriel exceptionnel. Les premières bouffées révèlent des notes de cèdre crémeux et de noisette, qui évoluent progressivement vers des saveurs plus intenses de cacao noir, de cuir et d'épices. Le tiers final apporte une complexité remarquable avec des notes de terre, de café torréfié et une pointe de poivre noir, créant une finale longue et persistante.

**Construction :**
Chaque cigare est roulé à la main par des maîtres torcedores cubains, garantissant une tirade parfaite et une combustion uniforme. La cape, fabriquée à partir des meilleures feuilles de tabac cubain, assure une expérience visuelle et gustative exceptionnelle.

**Accompagnements recommandés :**
- Espresso ou café corsé
- Rhum cubain vieilli (Havana Club, Santiago de Cuba)
- Cognac ou Armagnac
- Porto vintage
- Whisky single malt (Highland ou Speyside)

**Conservation :**
Pour préserver toutes les qualités de ce cigare exceptionnel, conservez-le dans un humidor à 65-70% d'humidité relative et à une température constante de 18-20°C. Laissez-le reposer au moins 2-3 semaines après réception pour une expérience optimale.`,
    tasting_notes: ['Cèdre', 'Cacao noir', 'Cuir', 'Épices', 'Café torréfié', 'Poivre'],
    pairing_suggestions: ['Espresso', 'Rhum cubain vieilli', 'Cognac', 'Porto vintage'],
    tags: ['Légendaire', 'Pleine', 'Complexe', 'Icônique'],
    // Pour utiliser de vraies images, remplacez par :
    // images: ['/images/products/montecristo-no-2/main.jpg', '/images/products/montecristo-no-2/detail-1.jpg', '/images/products/montecristo-no-2/detail-2.jpg'],
    images: [getCigarImg(5), getCigarImg(6), getCigarImg(7)],
    premium: true,
    featured: true,
    new_arrival: false,
    rating: 4.9,
    reviews_count: 42,
  },
  {
    id: 'partagas-serie-d-no-4',
    name: 'Partagas Serie D No. 4',
    name_fr: 'Cigare Partagas Serie D No. 4',
    brand: 'Partagas',
    price_TND: 50,
    price_EUR: 15,
    stock: 2,
    in_stock: true,
    stock_quantity: 2,
    box_size: 'Unité',
    unit_info: 'À l\'unité',
    origin: 'Cuba',
    format: 'Robusto',
    length: '124mm',
    ring_gauge: '50',
    strength: 'Full',
    smoking_time: '45-60 minutes',
    short_desc: 'Full-bodied classic with earthy depth and peppery finish.',
    long_desc:
      'A powerhouse robusto from Partagas, the Serie D No. 4 delivers earthy richness, espresso, and black pepper with unmistakable Cuban intensity and impeccable balance.',
    tasting_notes: ['Earth', 'Espresso', 'Black Pepper', 'Cocoa', 'Leather'],
    pairing_suggestions: ['Espresso', 'Bourbon', 'Red Wine'],
    tags: ['Full-bodied', 'Classic'],
    images: [getCigarImg(7), getCigarImg(0)],
    premium: true,
    featured: true,
    new_arrival: false,
    rating: 4.7,
    reviews_count: 31,
  },
  {
    id: 'hoyo-de-monterrey-epicure-no-2',
    name: 'Hoyo de Monterrey Epicure No.2',
    name_fr: 'Cigare Hoyo de Monterrey Epicure No.2',
    brand: 'Hoyo de Monterrey',
    price_TND: 48,
    price_EUR: 15,
    stock: 10,
    in_stock: true,
    stock_quantity: 10,
    box_size: 'Unité',
    unit_info: 'À l\'unité',
    origin: 'Cuba',
    format: 'Robusto',
    length: '124mm',
    ring_gauge: '50',
    strength: 'Medium',
    smoking_time: '45-60 minutes',
    short_desc: 'Silky and aromatic with cream, honey, and florals.',
    long_desc:
      'Epicure No. 2 charms with a gentle, aromatic profile – hints of cream, honey sweetness, and floral undertones – backed by superb construction and an elegant burn.',
    tasting_notes: ['Cream', 'Honey', 'Floral', 'Cedar', 'Nuts'],
    pairing_suggestions: ['Champagne', 'White Wine', 'Light Tea'],
    tags: ['Aromatic', 'Silky'],
    images: [getCigarImg(1)],
    premium: false,
    featured: false,
    new_arrival: false,
    rating: 4.6,
    reviews_count: 19,
  },
  {
    id: 'punch-rothschild',
    name: 'Punch Rothschild',
    name_fr: 'Cigare Punch Rothschild',
    brand: 'Punch',
    price_TND: 35,
    price_EUR: 11,
    stock: 0,
    in_stock: false,
    stock_quantity: 0,
    box_size: 'Unité',
    unit_info: 'À l\'unité',
    origin: 'Honduras',
    format: 'Rothschild',
    length: '120mm',
    ring_gauge: '50',
    strength: 'Medium',
    smoking_time: '40-50 minutes',
    short_desc: 'Approachable yet flavorful with wood, cocoa, and gentle spice.',
    long_desc:
      'An excellent value selection delivering classic notes of wood, cocoa powder, and a touch of baking spice. Ideal for daily enjoyment without compromise.',
    tasting_notes: ['Wood', 'Cocoa', 'Baking Spice', 'Leather'],
    pairing_suggestions: ['Beer', 'Coffee', 'Whiskey'],
    tags: ['Value', 'Approachable'],
    images: [getCigarImg(2)],
    premium: false,
    featured: false,
    new_arrival: false,
    rating: 4.3,
    reviews_count: 12,
  },
  {
    id: 'h-upmann-no-2',
    name: 'H. Upmann No. 2',
    name_fr: 'Cigare H. Upmann No. 2',
    brand: 'H. Upmann',
    price_TND: 52,
    price_EUR: 16,
    stock: 3,
    in_stock: true,
    stock_quantity: 3,
    box_size: 'Unité',
    unit_info: 'À l\'unité',
    origin: 'Cuba',
    format: 'Piramide',
    length: '156mm',
    ring_gauge: '52',
    strength: 'Medium to Full',
    smoking_time: '60-75 minutes',
    short_desc: 'Refined torpedo with cedar, almond, and subtle cream.',
    long_desc:
      'A refined expression from H. Upmann showcasing balance and finesse. Expect cedarwood, toasted almond, and a creamy finish that lingers gracefully.',
    tasting_notes: ['Cedar', 'Almond', 'Cream', 'Vanilla', 'Honey'],
    pairing_suggestions: ['Cognac', 'Port', 'Coffee'],
    tags: ['Refined', 'Balanced'],
    images: [getCigarImg(3)],
    premium: true,
    featured: false,
    new_arrival: false,
    rating: 4.7,
    reviews_count: 28,
  },
  {
    id: 'bolivar-belicosos-finos',
    name: 'Bolivar Belicosos Finos',
    name_fr: 'Cigare Bolivar Belicosos Finos',
    brand: 'Bolivar',
    price_TND: 60,
    price_EUR: 18,
    stock: 6,
    in_stock: true,
    stock_quantity: 6,
    box_size: 'Unité',
    unit_info: 'À l\'unité',
    origin: 'Cuba',
    format: 'Belicoso',
    length: '140mm',
    ring_gauge: '52',
    strength: 'Full',
    smoking_time: '55-70 minutes',
    short_desc: 'Intense, earthy profile with cocoa and dried fruit.',
    long_desc:
      'A bold, complex Cuban with deep earth, cocoa, and touches of dried fruit. The belicoso shape concentrates aroma and flavor for a memorable experience.',
    tasting_notes: ['Earth', 'Cocoa', 'Dried Fruit', 'Spice', 'Leather'],
    pairing_suggestions: ['Single Malt Whiskey', 'Dark Rum', 'Espresso'],
    tags: ['Intense', 'Complex'],
    images: [getCigarImg(4), getCigarImg(5)],
    premium: true,
    featured: true,
    new_arrival: false,
    rating: 4.8,
    reviews_count: 35,
  },
];

// Product categories
export const categories = [
  { id: 'cuban', name: 'Cuban Cigars', icon: '🇨🇺' },
  { id: 'nicaraguan', name: 'Nicaraguan', icon: '🇳🇮' },
  { id: 'dominican', name: 'Dominican', icon: '🇩🇴' },
  { id: 'premium', name: 'Premium Selection', icon: '⭐' },
  { id: 'bundles', name: 'Gift Bundles', icon: '🎁' },
];

// Filter options
export const strengthLevels = ['Mild', 'Medium', 'Medium to Full', 'Full'];

export const priceRanges = [
  { label: 'Under 30 TND', min: 0, max: 30 },
  { label: '30-50 TND', min: 30, max: 50 },
  { label: '50-70 TND', min: 50, max: 70 },
  { label: 'Over 70 TND', min: 70, max: 999 },
];

export default products;
