# 📁 Dossier des Images Produits

Ce dossier contient les images des produits cigares.

## Structure

```
products/
  [product-id]/
    main.jpg          (Image principale)
    detail-1.jpg      (Détail 1)
    detail-2.jpg      (Détail 2)
    box.jpg           (Image de la boîte, optionnel)
```

## Exemple

```
products/
  cohiba-robusto/
    main.jpg
    detail-1.jpg
    detail-2.jpg
  montecristo-no-2/
    main.jpg
    detail-1.jpg
```

## Utilisation dans products.js

```javascript
images: [
  '/images/products/cohiba-robusto/main.jpg',
  '/images/products/cohiba-robusto/detail-1.jpg',
]
```

## Spécifications

- **Format** : JPG ou WebP
- **Taille** : 1200x1200px (recommandé)
- **Poids** : < 500KB (idéalement 200-300KB)
- **Qualité** : 80-90%

Voir `PRODUCT_IMAGES_GUIDE.md` pour plus de détails.

