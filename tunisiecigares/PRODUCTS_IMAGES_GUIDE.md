# Guide d'ajout des images de produits

## Nouveaux produits ajoutés

Les 5 nouveaux produits suivants ont été ajoutés au catalogue :

1. **Villiger Premium No 7 Sumatra** - Paquet de 5 (100 TND) et À l'unité (22 TND)
2. **Villiger Premium No 5 Sumatra** - Paquet de 5 (90 TND) et À l'unité (20 TND)
3. **Joya de Nicaragua Clasico No. 6** - 35 TND
4. **Consul Joya de Nicaragua** - 30 TND
5. **Trinidad Reyes - Boîte de 12** - 1800 TND

## Téléchargement et optimisation des images

### Étape 1 : Télécharger les images

Pour chaque produit, téléchargez une image de haute qualité (libre de droits) :

**Sources recommandées :**
- Unsplash : https://unsplash.com/s/photos/cigar
- Pexels : https://www.pexels.com/search/cigar/
- Pixabay : https://pixabay.com/images/search/cigar/

**Critères de sélection :**
- Image réaliste d'un cigare (ou paquet de cigares)
- Fond neutre (noir, marron foncé, ou transparent)
- Résolution minimale : 1200x1200 pixels
- Format : JPG ou PNG

### Étape 2 : Renommer les images

Renommez les images selon cette convention :
- `villiger-premium-no7-sumatra.webp`
- `villiger-premium-no5-sumatra.webp`
- `joya-de-nicaragua-clasico-no6.webp`
- `consul-joya-de-nicaragua.webp`
- `trinidad-reyes.webp`

### Étape 3 : Optimiser les images

**Option A : Utiliser un outil en ligne**
1. Allez sur https://squoosh.app/
2. Uploadez votre image
3. Sélectionnez le format WebP
4. Ajustez la qualité pour obtenir un fichier < 200KB
5. Téléchargez l'image optimisée

**Option B : Utiliser ImageMagick (ligne de commande)**
```bash
convert input.jpg -quality 85 -resize 1200x1200 -format webp output.webp
```

**Option C : Utiliser Sharp (Node.js)**
```javascript
const sharp = require('sharp');
await sharp('input.jpg')
  .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
  .webp({ quality: 85 })
  .toFile('output.webp');
```

### Étape 4 : Placer les images

Placez les images optimisées dans le dossier :
```
/public/images/products/
```

Structure finale :
```
/public/images/products/
  ├── villiger-premium-no7-sumatra.webp
  ├── villiger-premium-no5-sumatra.webp
  ├── joya-de-nicaragua-clasico-no6.webp
  ├── consul-joya-de-nicaragua.webp
  └── trinidad-reyes.webp
```

### Étape 5 : Mettre à jour les URLs dans products.js

Une fois les images téléchargées, mettez à jour le fichier `src/data/products.js` :

**Avant (images Unsplash temporaires) :**
```javascript
images: [
  'https://images.unsplash.com/photo-1541534401786-2077eed87a72?q=80&w=1600&auto=format&fit=crop',
],
```

**Après (images locales) :**
```javascript
images: [
  '/images/products/villiger-premium-no7-sumatra.webp',
  '/images/products/villiger-premium-no7-sumatra-detail.webp', // optionnel
],
```

## Vérification

1. **Taille des fichiers** : Vérifiez que chaque image fait moins de 200KB
2. **Format** : Tous les fichiers doivent être en WebP
3. **Affichage** : Testez l'affichage sur mobile, tablette et desktop
4. **Performance** : Vérifiez le temps de chargement de la page produits

## Notes importantes

- Les images actuelles utilisent des URLs Unsplash temporaires
- Les images doivent être optimisées pour le web (WebP, < 200KB)
- Pour les paquets, utilisez une image montrant le paquet complet
- Pour les unités, utilisez une image d'un cigare individuel
- Pour la boîte Trinidad Reyes, utilisez une image de la boîte complète

## Support

Si vous avez des questions sur l'ajout des images, consultez le fichier `PRODUCT_IMAGES_GUIDE.md` dans le dossier racine du projet.

