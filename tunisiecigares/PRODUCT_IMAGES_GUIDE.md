# 📸 Guide d'Ajout d'Images et Descriptions pour les Produits

## Structure des Dossiers

Créez cette structure dans le dossier `public/` :

```
public/
  images/
    products/
      cohiba-robusto/
        main.jpg          (Image principale - 1200x1200px recommandé)
        detail-1.jpg      (Détail du produit)
        detail-2.jpg      (Détail du produit)
        box.jpg           (Image de la boîte, optionnel)
      romeo-y-julieta-short-churchill/
        main.jpg
        detail-1.jpg
      montecristo-no-2/
        main.jpg
        detail-1.jpg
        detail-2.jpg
      ...
```

## Spécifications des Images

### Tailles Recommandées
- **Image principale** : 1200x1200px (carré, pour un rendu optimal)
- **Images de détail** : 1200x1200px ou 1600x1200px (format paysage)
- **Format** : JPG ou WebP (WebP recommandé pour un meilleur poids)
- **Qualité** : 80-90% (bon équilibre qualité/poids)
- **Poids max** : 500KB par image (idéalement 200-300KB)

### Optimisation des Images

1. **Utilisez des outils d'optimisation** :
   - [TinyPNG](https://tinypng.com/) - Compression sans perte de qualité
   - [Squoosh](https://squoosh.app/) - Compression avancée
   - [ImageOptim](https://imageoptim.com/) - Pour Mac

2. **Convertir en WebP** :
   ```bash
   # Avec ImageMagick
   convert image.jpg -quality 85 image.webp
   
   # Ou utilisez un outil en ligne comme Squoosh
   ```

3. **Renommez les images** :
   - Utilisez des noms descriptifs : `cohiba-robusto-main.jpg`
   - Pas d'espaces, utilisez des tirets : `-`
   - Tout en minuscules

## Mise à Jour du Fichier products.js

### Structure d'Image Recommandée

```javascript
images: [
  '/images/products/cohiba-robusto/main.jpg',
  '/images/products/cohiba-robusto/detail-1.jpg',
  '/images/products/cohiba-robusto/detail-2.jpg',
]
```

### Exemple de Produit Complet

```javascript
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
  
  // Descriptions améliorées
  short_desc: 'Le Cohiba Robusto est l\'un des cigares cubains les plus emblématiques, reconnu pour sa qualité exceptionnelle et son profil de saveurs complexe.',
  
  long_desc: `Le Cohiba Robusto incarne l'excellence de l'artisanat cubain. Fabriqué à la main dans les plus prestigieuses manufactures de La Havane, ce cigare offre une expérience sensorielle incomparable.

**Caractéristiques principales :**
- Format Robusto classique (124mm x 50)
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
  pairing_suggestions: ['Espresso', 'Rhum vieilli', 'Cognac', 'Porto'],
  tags: ['Premium', 'Équilibré', 'Cubain', 'Icônique'],
  
  // Images (chemins relatifs depuis public/)
  images: [
    '/images/products/cohiba-robusto/main.jpg',
    '/images/products/cohiba-robusto/detail-1.jpg',
    '/images/products/cohiba-robusto/detail-2.jpg',
  ],
  
  premium: true,
  featured: true,
  new_arrival: false,
  rating: 4.8,
  reviews_count: 24,
}
```

## Guide pour les Descriptions

### Structure d'une Bonne Description

1. **Introduction** (2-3 phrases)
   - Présentation du produit
   - Pourquoi il est spécial
   - Origine et réputation

2. **Caractéristiques techniques** (liste à puces)
   - Format, dimensions
   - Temps de fumage
   - Force
   - Provenance

3. **Profil de saveurs** (paragraphe détaillé)
   - Notes de dégustation
   - Progression des saveurs
   - Expérience globale

4. **Conseils pratiques** (section)
   - Coupe et allumage
   - Accompagnements
   - Conservation

5. **Informations supplémentaires**
   - Certification
   - Fabrication
   - Disponibilité

### Exemple de Description Améliorée

```javascript
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
```

## Checklist pour Ajouter un Nouveau Produit

- [ ] Créer le dossier pour les images : `public/images/products/[product-id]/`
- [ ] Ajouter les images (main.jpg, detail-1.jpg, etc.)
- [ ] Optimiser les images (compression, format WebP si possible)
- [ ] Mettre à jour `products.js` avec les chemins d'images
- [ ] Rédiger une description courte (`short_desc`)
- [ ] Rédiger une description longue (`long_desc`) avec formatage Markdown
- [ ] Ajouter les notes de dégustation (`tasting_notes`)
- [ ] Ajouter les suggestions d'accompagnement (`pairing_suggestions`)
- [ ] Vérifier que tous les champs sont remplis
- [ ] Tester l'affichage sur le site

## Conseils pour les Photos

### Types d'Images à Photographier

1. **Image principale** :
   - Produit sur fond neutre (blanc, noir, ou texture élégante)
   - Éclairage uniforme
   - Mise au point sur le produit
   - Montrer le cigare dans son intégralité

2. **Images de détail** :
   - Détail de la cape (texture, veines)
   - Détail du bouchon (coupe)
   - Vue de profil
   - Marque ou bande du produit

3. **Image de contexte** (optionnel) :
   - Produit dans un environnement (humidors, accessoires)
   - Style de vie (dégustation)
   - Boîte ou packaging

### Conseils de Photographie

- **Éclairage** : Lumière naturelle ou studio, éviter les ombres dures
- **Fond** : Neutre et épuré, ne pas distraire du produit
- **Composition** : Règle des tiers, centrage pour les produits
- **Profondeur de champ** : Mise au point nette sur le produit
- **Couleurs** : Respecter les couleurs réelles du produit

## Outils Recommandés

### Photographie
- **Caméra** : Smartphone moderne (iPhone, Samsung) ou appareil photo
- **Éclairage** : Lumière naturelle ou kit d'éclairage LED
- **Fond** : Papier photo ou tissu neutre

### Édition
- **Gratuit** : GIMP, Canva, Photopea
- **Payant** : Adobe Photoshop, Lightroom
- **En ligne** : Canva, Remove.bg (pour fond transparent)

### Optimisation
- **Compression** : TinyPNG, Squoosh, ImageOptim
- **Conversion** : Squoosh (vers WebP)
- **Redimensionnement** : ImageResizer, Bulk Resize Photos

## Exemple de Workflow Complet

1. **Photographier le produit** → `cohiba-robusto-raw-1.jpg`
2. **Éditer l'image** (recadrage, luminosité, contraste) → `cohiba-robusto-edited-1.jpg`
3. **Optimiser l'image** (compression) → `cohiba-robusto-main.jpg`
4. **Renommer et placer** → `public/images/products/cohiba-robusto/main.jpg`
5. **Mettre à jour products.js** avec le chemin : `'/images/products/cohiba-robusto/main.jpg'`
6. **Tester sur le site** et vérifier l'affichage

## Support

Si vous avez des questions ou besoin d'aide :
1. Vérifiez que les chemins d'images sont corrects (commencent par `/images/`)
2. Vérifiez que les images sont dans le dossier `public/images/products/`
3. Vérifiez que les images sont accessibles (pas d'erreur 404 dans la console)
4. Vérifiez que les images sont optimisées (poids raisonnable)

## Notes Importantes

- ⚠️ Les chemins d'images doivent commencer par `/images/` (pas `./images/` ou `images/`)
- ⚠️ Les images dans `public/` sont servies directement, pas besoin d'import
- ⚠️ Utilisez des noms de fichiers en minuscules avec des tirets
- ⚠️ Optimisez toujours les images pour le web (poids < 500KB)
- ✅ Testez toujours les images sur le site après les avoir ajoutées

