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

// Helper to get correct image path based on environment
const getImagePath = (path) => {
  // If it's a full URL (http/https), return as is
  if (path.startsWith('http')) return path;
  
  // Get the base URL from Vite environment
  // Default to '/' for all environments (Vercel, local dev, etc.)
  const baseUrl = import.meta.env.BASE_URL || '/';
  
  // Ensure path doesn't start with slash to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Combine base URL and path
  return `${baseUrl}${cleanPath}`;
};

// Get image with variety
const getCigarImg = (index) => cigarImages[index % cigarImages.length];

export const products = [
  {
    id: 'villiger-premium-no5-sumatra-paquet',
    name: 'Villiger Premium No 5 Sumatra - Paquet de 5',
    name_fr: 'Cigares Villiger Premium No 5 Sumatra - Paquet de 5',
    brand: 'Villiger',
    price_TND: 90,
    price_EUR: 27,
    stock: 5,
    in_stock: true,
    stock_quantity: 5,
    box_size: 'Paquet de 5',
    unit_info: 'Paquet de 5 pièces',
    origin: 'Sumatra',
    format: 'Classique',
    length: '110mm',
    ring_gauge: '42',
    strength: 'Mild to Medium',
    smoking_time: '30-40 minutes',
    short_desc: 'Cigare facile à fumer au tabac Sumatra, format classique apprécié pour son équilibre et sa régularité.',
    long_desc: `Le Villiger Premium No 5 Sumatra incarne la tradition et l'excellence de la marque suisse Villiger. Ce cigare classique, facile à fumer, est fabriqué avec des feuilles de tabac premium de Sumatra, offrant une expérience de dégustation équilibrée et régulière.

**Caractéristiques principales :**
- Format : Classique (110mm x 42)
- Temps de fumage : 30 à 40 minutes
- Force : Doux à Moyen
- Provenance : Sumatra (Indonésie)
- Conditionnement : Paquet de 5 pièces

**Profil de saveurs :**
Ce cigare dévoile un profil harmonieux et équilibré. Les premières bouffées révèlent des notes de cèdre frais et de noisette toastée, suivies d'une progression vers des saveurs crémeuses et vanillées. La finale apporte une touche subtile de miel et d'amande, créant une expérience douce et agréable, parfaite pour tous les moments de la journée.

**Conseils de dégustation :**
- Format classique, facile à fumer et apprécié pour sa régularité
- Idéal pour les amateurs débutants comme pour les connaisseurs
- Accompagnez d'un café, d'un whisky léger ou d'un porto rubis
- Conservation recommandée dans un humidor à 65-70% d'humidité

**Prix :**
- Paquet de 5 pièces : 90 TND
- Prix unitaire : 20 TND`,
    tasting_notes: ['Cèdre', 'Noisette toastée', 'Crème', 'Vanille', 'Miel'],
    pairing_suggestions: ['Café', 'Whisky léger', 'Porto rubis'],
    tags: ['Classique', 'Équilibré', 'Sumatra', 'Facile à fumer'],
    images: [
      getImagePath('/images/products/villiger-premium-no5-sumatra-paquet.webp'),
    ],
    premium: false,
    featured: false,
    new_arrival: true,
    rating: 4.5,
    reviews_count: 15,
  },
  {
    id: 'villiger-premium-no5-sumatra-unite',
    name: 'Villiger Premium No 5 Sumatra - À l\'unité',
    name_fr: 'Cigare Villiger Premium No 5 Sumatra - À l\'unité',
    brand: 'Villiger',
    price_TND: 20,
    price_EUR: 6,
    stock: 25,
    in_stock: true,
    stock_quantity: 25,
    box_size: 'Unité',
    unit_info: 'À l\'unité',
    origin: 'Sumatra',
    format: 'Classique',
    length: '110mm',
    ring_gauge: '42',
    strength: 'Mild to Medium',
    smoking_time: '30-40 minutes',
    short_desc: 'Cigare facile à fumer au tabac Sumatra, format classique apprécié pour son équilibre et sa régularité.',
    long_desc: `Le Villiger Premium No 5 Sumatra incarne la tradition et l'excellence de la marque suisse Villiger. Ce cigare classique, facile à fumer, est fabriqué avec des feuilles de tabac premium de Sumatra, offrant une expérience de dégustation équilibrée et régulière.

**Caractéristiques principales :**
- Format : Classique (110mm x 42)
- Temps de fumage : 30 à 40 minutes
- Force : Doux à Moyen
- Provenance : Sumatra (Indonésie)

**Profil de saveurs :**
Ce cigare dévoile un profil harmonieux et équilibré. Les premières bouffées révèlent des notes de cèdre frais et de noisette toastée, suivies d'une progression vers des saveurs crémeuses et vanillées. La finale apporte une touche subtile de miel et d'amande, créant une expérience douce et agréable, parfaite pour tous les moments de la journée.

**Conseils de dégustation :**
- Format classique, facile à fumer et apprécié pour sa régularité
- Idéal pour les amateurs débutants comme pour les connaisseurs
- Accompagnez d'un café, d'un whisky léger ou d'un porto rubis
- Conservation recommandée dans un humidor à 65-70% d'humidité

**Prix :**
- Prix unitaire : 20 TND
- Paquet de 5 pièces : 90 TND (économie de 10 TND)`,
    tasting_notes: ['Cèdre', 'Noisette toastée', 'Crème', 'Vanille', 'Miel'],
    pairing_suggestions: ['Café', 'Whisky léger', 'Porto rubis'],
    tags: ['Classique', 'Équilibré', 'Sumatra', 'Facile à fumer'],
    images: [
      getImagePath('/images/products/villiger-premium-no5-sumatra-unite.webp'),
    ],
    premium: false,
    featured: false,
    new_arrival: true,
    rating: 4.5,
    reviews_count: 15,
  },
  {
    id: 'consul-joya-de-nicaragua',
    name: 'Consul Joya de Nicaragua',
    name_fr: 'Cigare Consul Joya de Nicaragua',
    brand: 'Joya de Nicaragua',
    price_TND: 35,
    price_EUR: 10.5,
    stock: 25,
    in_stock: true,
    stock_quantity: 25,
    box_size: 'Unité',
    unit_info: 'À l\'unité',
    origin: 'Nicaragua',
    format: 'Robusto',
    length: '127mm',
    ring_gauge: '50',
    strength: 'Medium',
    smoking_time: '45-60 minutes',
    short_desc: 'Cigare robuste du Nicaragua à l\'intensité moyenne, alliant puissance et finesse dans un format équilibré.',
    long_desc: `Le Consul Joya de Nicaragua est un cigare robuste qui allie avec maestria puissance et finesse. Fabriqué dans les prestigieuses manufactures d'Estelí au Nicaragua, ce cigare offre une intensité moyenne parfaitement équilibrée, créant une expérience de dégustation mémorable.

**Caractéristiques principales :**
- Format : Robusto (127mm x 50)
- Temps de fumage : 45 à 60 minutes
- Force : Moyenne
- Provenance : Nicaragua (Estelí)

**Profil de saveurs :**
Ce cigare dévoile un profil riche et complexe. Les premières bouffées révèlent des notes de cèdre et de noisette toastée, qui évoluent progressivement vers des saveurs plus intenses de cacao, de cuir et d'épices. La finale apporte une touche de terre et de poivre noir, créant une expérience équilibrée entre puissance et finesse, caractéristique de l'excellence nicaraguayenne.

**Conseils de dégustation :**
- Format robuste, parfait pour une dégustation équilibrée
- Accompagnez d'un café corsé, d'un rhum ou d'un whisky single malt
- Idéal pour les amateurs de cigares à l'intensité moyenne
- Conservation recommandée dans un humidor à 65-70% d'humidité

**Qualité :**
Le Consul représente l'excellence de Joya de Nicaragua, avec une construction impeccable et des feuilles de tabac sélectionnées, garantissant une tirade parfaite et une combustion uniforme.`,
    tasting_notes: ['Cèdre', 'Noisette toastée', 'Cacao', 'Cuir', 'Épices', 'Poivre'],
    pairing_suggestions: ['Café corsé', 'Rhum', 'Whisky single malt'],
    tags: ['Robuste', 'Moyen', 'Équilibré', 'Nicaragua'],
    images: [
       getImagePath('/images/products/ConsulJoyadeNicaaragua1.webp'),
       getImagePath('/images/products/joyadenicaraguaconsul2.jpg'),
    ],
    premium: true,
    featured: true,
    new_arrival: false,
    rating: 4.6,
    reviews_count: 22,
  },
  {
    id: 'trinidad-reyes-boite-12',
    name: 'Trinidad Reyes - Boîte de 12',
    name_fr: 'Cigares Trinidad Reyes - Boîte de 12',
    brand: 'Trinidad',
    price_TND: 1800,
    price_EUR: 540,
    stock: 1,
    in_stock: true,
    stock_quantity: 1,
    box_size: 'Boîte de 12',
    unit_info: 'Boîte de 12 cigares',
    origin: 'Cuba',
    format: 'Petit Panetela',
    length: '110mm',
    ring_gauge: '40',
    strength: 'Medium to Full',
    smoking_time: '30-40 minutes',
    short_desc: 'Marque premium cubaine légendaire en format petit panetela, offrant une expérience sensorielle exceptionnelle dans un format compact.',
    long_desc: `Le Trinidad Reyes est une référence absolue parmi les cigares cubains premium. Cette marque légendaire, créée exclusivement pour Fidel Castro et les dignitaires cubains, est aujourd'hui l'une des plus prestigieuses et recherchées au monde. Le format Reyes, petit panetela élégant, incarne l'excellence de l'artisanat cubain dans un format compact et raffiné.

**Caractéristiques principales :**
- Format : Petit Panetela (110mm x 40)
- Temps de fumage : 30 à 40 minutes
- Force : Moyenne à Pleine
- Provenance : Cuba (Habanos S.A.)
- Conditionnement : Boîte de 12 cigares

**Profil de saveurs :**
Ce cigare offre une expérience sensorielle exceptionnelle. Les premières bouffées révèlent des notes complexes de cèdre, de noisette et de miel, qui évoluent progressivement vers des saveurs plus riches de cacao, de cuir et d'épices douces. La finale apporte des touches de terre, de café et une pointe de poivre, créant une expérience équilibrée et raffinée, caractéristique de l'excellence cubaine.

**Histoire et prestige :**
Trinidad est née en 1969 comme marque exclusive pour les dignitaires cubains. Ce n'est qu'en 1998 que cette marque légendaire a été rendue disponible au grand public, devenant instantanément l'une des références les plus prestigieuses. Le Reyes, avec son format compact et élégant, est parfait pour les connaisseurs recherchant l'excellence dans un format pratique.

**Conseils de dégustation :**
- Format compact, idéal pour une dégustation raffinée
- Accompagnez d'un espresso, d'un rhum cubain vieilli ou d'un cognac premium
- Parfait pour les occasions spéciales et les collectionneurs
- Conservation recommandée dans un humidor à 65-70% d'humidité

**Prix :**
- Boîte de 12 cigares : 1800 TND (150 TND par cigare)`,
    tasting_notes: ['Cèdre', 'Noisette', 'Miel', 'Cacao', 'Cuir', 'Épices', 'Café', 'Poivre'],
    pairing_suggestions: ['Espresso', 'Rhum cubain vieilli', 'Cognac premium'],
    tags: ['Premium', 'Cubain', 'Légendaire', 'Collection'],
    images: [
      getImagePath('/images/products/TrinidadReyes1.jpeg'),
    ],
    premium: true,
    featured: true,
    new_arrival: false,
    rating: 4.9,
    reviews_count: 45,
  },
  {
    id: 'joya-de-nicaragua-clasico-senoritas',
    name: 'Joya de Nicaragua Clasico Señoritas',
    name_fr: 'Cigare Joya de Nicaragua Clasico Señoritas',
    brand: 'Joya de Nicaragua',
    price_TND: 25,
    price_EUR: 7.5,
    stock: 30,
    in_stock: true,
    stock_quantity: 30,
    box_size: 'Unité',
    unit_info: 'À l\'unité',
    origin: 'Nicaragua',
    format: 'Petit Corona',
    length: '110mm',
    ring_gauge: '42',
    strength: 'Medium',
    smoking_time: '35-45 minutes',
    short_desc: 'Cigare élégant du Nicaragua au format petit corona, offrant une expérience équilibrée et raffinée.',
    long_desc: `Le Joya de Nicaragua Clasico Señoritas est un cigare élégant qui incarne la finesse de l'artisanat nicaraguayen. Ce format petit corona offre une expérience de dégustation équilibrée et raffinée, parfaite pour les moments de détente.

**Caractéristiques principales :**
- Format : Petit Corona (110mm x 42)
- Temps de fumage : 35 à 45 minutes
- Force : Moyenne
- Provenance : Nicaragua (Estelí)

**Profil de saveurs :**
Ce cigare révèle un profil harmonieux et raffiné. Les premières bouffées offrent des notes douces de cèdre et de noisette, qui évoluent progressivement vers des saveurs plus complexes de cacao, de cuir et d'épices douces. La finale apporte une touche subtile de terre et de café torréfié, créant une expérience équilibrée et satisfaisante.

**Conseils de dégustation :**
- Format compact, idéal pour une pause dégustation
- Accompagnez d'un café, d'un thé ou d'un rhum léger
- Parfait pour les amateurs recherchant un format pratique sans compromis sur la qualité
- Conservation recommandée dans un humidor à 65-70% d'humidité

**Prix :**
- Prix unitaire : 25 TND`,
    tasting_notes: ['Cèdre', 'Noisette', 'Cacao', 'Cuir', 'Épices douces', 'Café torréfié'],
    pairing_suggestions: ['Café', 'Thé', 'Rhum léger'],
    tags: ['Élégant', 'Moyen', 'Équilibré', 'Nicaragua', 'Petit Corona'],
    images: [
      getImagePath('/images/products/seniorita1.webp'),
      getImagePath('/images/products/seniorita2.webp'),
    ],
    premium: true,
    featured: true,
    new_arrival: true,
    rating: 4.6,
    reviews_count: 18,
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
