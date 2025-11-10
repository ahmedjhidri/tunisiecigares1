# 🔐 Configuration des Secrets GitHub pour EmailJS

## Problème

Les emails ne sont pas envoyés en production (GitHub Pages) car les variables d'environnement EmailJS ne sont pas configurées dans GitHub Secrets.

## Solution : Ajouter les Secrets GitHub

### Étape 1 : Aller sur GitHub Secrets

1. Allez sur votre repository GitHub : `https://github.com/ahmedjhidri/tunisiecigares1`
2. Cliquez sur **Settings** (en haut à droite)
3. Dans le menu de gauche, cliquez sur **Secrets and variables** → **Actions**
4. Cliquez sur **New repository secret**

### Étape 2 : Ajouter les Secrets EmailJS

Ajoutez **TOUS** ces secrets un par un :

#### 1. VITE_EMAILJS_SERVICE_ID
- **Name:** `VITE_EMAILJS_SERVICE_ID`
- **Secret:** `service_726b9kt` (votre Service ID EmailJS)

#### 2. VITE_EMAILJS_TEMPLATE_ID
- **Name:** `VITE_EMAILJS_TEMPLATE_ID`
- **Secret:** `template_3zm1brw` (votre Template ID pour les clients)

#### 3. VITE_EMAILJS_PUBLIC_KEY
- **Name:** `VITE_EMAILJS_PUBLIC_KEY`
- **Secret:** `-6nZEjUa8FNVgbS3W` (votre Public Key EmailJS)

#### 4. VITE_EMAILJS_ADMIN_TEMPLATE_ID (Optionnel mais recommandé)
- **Name:** `VITE_EMAILJS_ADMIN_TEMPLATE_ID`
- **Secret:** `template_xxxxxxx` (ID du template admin - créez-en un nouveau si vous n'en avez pas)
- **Note:** Si vous n'ajoutez pas ce secret, le code utilisera le même template que le client

#### 5. VITE_ADMIN_EMAIL
- **Name:** `VITE_ADMIN_EMAIL`
- **Secret:** `tunisiecigare@gmail.com` (email où recevoir les notifications admin)

#### 6. VITE_ADMIN_PASSWORD (si vous avez un panneau admin)
- **Name:** `VITE_ADMIN_PASSWORD`
- **Secret:** `My$uperSecure123` (votre mot de passe admin)

### Étape 3 : Vérifier les Secrets Existants

Assurez-vous que ces secrets existent déjà (pour Supabase) :

- ✅ `VITE_SUPABASE_URL`
- ✅ `VITE_SUPABASE_ANON_KEY`

### Étape 4 : Redéployer

Après avoir ajouté tous les secrets :

1. **Option A : Push automatique**
   - Faites un commit et push (le workflow se déclenchera automatiquement)
   ```bash
   git add .
   git commit -m "Add EmailJS secrets to GitHub Actions"
   git push origin main
   ```

2. **Option B : Déclencher manuellement**
   - Allez sur **Actions** dans votre repository GitHub
   - Cliquez sur **Deploy tunisiecigares to GitHub Pages**
   - Cliquez sur **Run workflow** → **Run workflow**

### Étape 5 : Vérifier le Build

1. Allez sur **Actions** dans votre repository
2. Cliquez sur le dernier workflow en cours
3. Vérifiez que le build réussit
4. Attendez que le déploiement soit terminé (environ 2-3 minutes)

### Étape 6 : Tester les Emails

1. Allez sur votre site en production : `https://ahmedjhidri.github.io/tunisiecigares1/`
2. Passez une commande de test
3. Vérifiez que :
   - Le client reçoit un email de confirmation
   - L'admin reçoit une notification

## Liste Complète des Secrets Requis

| Secret Name | Description | Exemple |
|------------|-------------|---------|
| `VITE_SUPABASE_URL` | URL Supabase | `https://kbmtbewkebgphbeeeewh.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Clé anonyme Supabase | `eyJhbGci...` |
| `VITE_EMAILJS_SERVICE_ID` | Service ID EmailJS | `service_726b9kt` |
| `VITE_EMAILJS_TEMPLATE_ID` | Template ID client | `template_3zm1brw` |
| `VITE_EMAILJS_PUBLIC_KEY` | Clé publique EmailJS | `-6nZEjUa8FNVgbS3W` |
| `VITE_EMAILJS_ADMIN_TEMPLATE_ID` | Template ID admin (optionnel) | `template_xxxxxxx` |
| `VITE_ADMIN_EMAIL` | Email admin | `tunisiecigare@gmail.com` |
| `VITE_ADMIN_PASSWORD` | Mot de passe admin | `My$uperSecure123` |

## Vérification dans les Logs

Après le déploiement, ouvrez la console du navigateur (F12) et vérifiez les logs :

✅ **Si les secrets sont corrects :**
```
[Email] Module loaded - Environment variables: {
  SERVICE_ID: "service_7...",
  TEMPLATE_ID: "template_...",
  ...
}
```

❌ **Si les secrets manquent :**
```
[Email] ❌ Configuration check failed: {
  hasServiceId: false,
  hasTemplateId: false,
  ...
}
```

## Troubleshooting

### Les emails ne sont toujours pas envoyés

1. **Vérifiez que les secrets sont bien ajoutés :**
   - GitHub → Settings → Secrets and variables → Actions
   - Tous les secrets `VITE_EMAILJS_*` doivent être présents

2. **Vérifiez que le build inclut les variables :**
   - Actions → Dernier workflow → Build step
   - Les variables doivent être passées au build

3. **Vérifiez les templates EmailJS :**
   - Le template client doit utiliser `{{to_email}}`
   - Le template admin doit utiliser `{{{html_message}}}`

4. **Vérifiez les quotas EmailJS :**
   - Allez sur https://dashboard.emailjs.com
   - Vérifiez que vous avez encore des emails disponibles

### Le build échoue

- Vérifiez que tous les secrets sont correctement nommés (sensible à la casse)
- Vérifiez qu'il n'y a pas d'espaces avant/après les valeurs

## Notes Importantes

- ⚠️ Les secrets GitHub sont **sensibles à la casse** : `VITE_EMAILJS_SERVICE_ID` ≠ `vite_emailjs_service_id`
- ⚠️ Ne partagez **JAMAIS** vos secrets publiquement
- ⚠️ Les secrets sont disponibles uniquement pendant le build, pas à l'exécution
- ✅ Vite remplace les variables `VITE_*` dans le code au moment du build

