# 🧪 Test Local - Guide Rapide

## 🚀 Démarrage Rapide

### Option 1 : Script Automatique

```bash
cd /Users/jhidri/Documents/tunisiecigares1/tunisiecigares
chmod +x START_LOCAL.sh
./START_LOCAL.sh
```

### Option 2 : Commande Manuelle

```bash
cd /Users/jhidri/Documents/tunisiecigares1/tunisiecigares
npm run dev
```

## 🌐 Accéder au Site

Une fois le serveur démarré, ouvrez votre navigateur et allez à :

```
http://localhost:5173
```

## ✅ Checklist de Test

### 1. Test de la Page d'Accueil
- [ ] La page se charge correctement
- [ ] Les produits s'affichent
- [ ] Les images se chargent (lazy loading)
- [ ] Le header et le footer sont visibles
- [ ] La navigation fonctionne

### 2. Test des Produits
- [ ] Cliquer sur "Our Cigars" affiche la liste des produits
- [ ] Les cartes produits s'affichent avec images
- [ ] Le hover sur les produits fonctionne (zoom, shadow)
- [ ] Les prix s'affichent correctement
- [ ] Les badges de stock fonctionnent

### 3. Test de la Recherche
- [ ] La barre de recherche fonctionne
- [ ] L'autocomplétion apparaît
- [ ] La navigation avec les flèches fonctionne
- [ ] La sélection avec Enter fonctionne

### 4. Test des Filtres
- [ ] Les filtres s'affichent
- [ ] Sélectionner un filtre fonctionne
- [ ] Les chips de filtres apparaissent
- [ ] Retirer un filtre fonctionne
- [ ] Sur mobile, les filtres sont collapsibles

### 5. Test de la Page Produit
- [ ] Cliquer sur un produit ouvre la page détail
- [ ] Les images s'affichent
- [ ] Le zoom au survol fonctionne
- [ ] Les miniatures fonctionnent
- [ ] La description s'affiche
- [ ] Le sélecteur de quantité fonctionne
- [ ] Le bouton "Ajouter au panier" fonctionne

### 6. Test du Panier
- [ ] Ajouter un produit au panier fonctionne
- [ ] Le compteur du panier se met à jour
- [ ] Le mini-preview au survol fonctionne
- [ ] La page panier affiche les produits
- [ ] Modifier la quantité fonctionne
- [ ] Retirer un produit fonctionne
- [ ] Le total se calcule correctement

### 7. Test de la Commande
- [ ] Le formulaire de commande s'affiche
- [ ] La validation en temps réel fonctionne
- [ ] Le masque de téléphone fonctionne (+216 XX XXX XXX)
- [ ] La soumission de commande fonctionne
- [ ] Le message de succès s'affiche
- [ ] L'email est envoyé (vérifier la console)

### 8. Test des Emails
- [ ] Ouvrir la console (F12)
- [ ] Passer une commande
- [ ] Vérifier les logs :
  - `✅ Email client sent successfully`
  - `✅ Email admin sent successfully`
- [ ] Vérifier la boîte email (client et admin)

### 9. Test Mobile
- [ ] Ouvrir les DevTools (F12)
- [ ] Activer le mode mobile (📱)
- [ ] Tester la navigation
- [ ] Tester les filtres (collapsibles)
- [ ] Tester le panier
- [ ] Tester le formulaire

### 10. Test des Images
- [ ] Les images produits se chargent
- [ ] Le lazy loading fonctionne (scroll pour voir)
- [ ] Les images ont un fond transparent
- [ ] Le zoom fonctionne
- [ ] Les miniatures fonctionnent

## 🎯 Tests Spécifiques

### Test des Nouvelles Descriptions

1. **Aller sur une page produit** (ex: Cohiba Robusto)
2. **Vérifier** :
   - La description courte s'affiche
   - La description longue s'affiche avec formatage Markdown
   - Les notes de dégustation s'affichent
   - Les suggestions d'accompagnement s'affichent
   - Les tags s'affichent

### Test des Images Produits

1. **Vérifier la structure** :
   ```bash
   ls -la public/images/products/
   ```

2. **Pour ajouter des images** :
   - Créer le dossier : `mkdir -p public/images/products/cohiba-robusto`
   - Ajouter les images : `main.jpg`, `detail-1.jpg`, etc.
   - Mettre à jour `products.js` avec les chemins

3. **Tester** :
   - Les images s'affichent correctement
   - Les images sont optimisées (< 500KB)
   - Le lazy loading fonctionne

## 🐛 Dépannage

### Le serveur ne démarre pas

```bash
# Vérifier que Node.js est installé
node --version

# Vérifier que les dépendances sont installées
npm install

# Démarrer le serveur
npm run dev
```

### Les routes ne fonctionnent pas

- Les routes utilisent `#` (HashRouter) pour GitHub Pages
- Utiliser : `http://localhost:5173/#/products`
- C'est normal, pas un bug

### Les images ne se chargent pas

- Vérifier la connexion internet (images Unsplash)
- Vérifier que les chemins sont corrects
- Vérifier la console pour les erreurs 404

### Les emails ne sont pas envoyés

1. **Vérifier le fichier `.env`** :
   ```bash
   cat .env
   ```

2. **Vérifier les logs dans la console** :
   - Ouvrir F12
   - Regarder les logs `[Email]`
   - Vérifier les erreurs

3. **Vérifier la configuration EmailJS** :
   - Voir `EMAIL_TROUBLESHOOTING.md`
   - Vérifier les secrets GitHub

## 📝 Notes

- **Hot Reload** : Les changements apparaissent automatiquement
- **Console** : Toujours vérifier la console (F12) pour les erreurs
- **Cache** : Vider le cache si nécessaire (Ctrl+Shift+R)
- **Mobile** : Utiliser les DevTools pour tester mobile

## 🔗 Liens Utiles

- **Home** : `http://localhost:5173/`
- **Products** : `http://localhost:5173/#/products`
- **Product Detail** : `http://localhost:5173/#/product/cohiba-robusto`
- **Cart** : `http://localhost:5173/#/cart`
- **Admin** : `http://localhost:5173/#/admin/orders`

## ✅ Résultat Attendu

Si tout fonctionne correctement, vous devriez voir :
- ✅ Site qui se charge rapidement
- ✅ Produits qui s'affichent
- ✅ Images qui se chargent
- ✅ Recherche qui fonctionne
- ✅ Filtres qui fonctionnent
- ✅ Panier qui fonctionne
- ✅ Commandes qui fonctionnent
- ✅ Emails qui sont envoyés

**Bon test ! 🚀**

