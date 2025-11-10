# EmailJS Configuration Guide - Fix Client Email Not Receiving

## ⚠️ IMPORTANT: Template Configuration

Le problème le plus courant est que le template EmailJS n'est pas configuré correctement pour utiliser `{{to_email}}` comme destinataire.

### Configuration du Template EmailJS (CRITIQUE)

1. **Allez sur https://dashboard.emailjs.com**
2. **Sélectionnez votre template** (template_3zm1brw)
3. **Vérifiez le champ "To Email"** - Il DOIT utiliser `{{to_email}}`

**Configuration correcte :**
```
To Email: {{to_email}}
Subject: {{subject}}
```

**❌ Configuration incorrecte (ne fonctionnera pas) :**
```
To Email: tunisiecigare@gmail.com  ← Ne pas mettre une adresse fixe !
To Email: (vide)
```

### Variables du Template Disponibles

Votre template EmailJS DOIT utiliser ces variables :

**Pour le destinataire (OBLIGATOIRE) :**
- `{{to_email}}` - Email du client (utilisé automatiquement)

**Pour le contenu :**
- `{{subject}}` - Sujet de l'email
- `{{customer_name}}` - Nom complet du client
- `{{order_ref}}` - Référence de commande (ex: CLT-abc123)
- `{{customer_phone}}` - Téléphone du client
- `{{customer_address}}` - Adresse de livraison
- `{{order_details}}` - Détails de la commande (format texte)
- `{{total}}` - Total avec devise (ex: "120.00 TND")

### Exemple de Template EmailJS Complet

**Configuration du Template :**
```
To Email: {{to_email}}
From Name: Tunisie Cigares
Reply To: {{reply_to}}
Subject: {{subject}}
```

**Contenu du Template :**
```
Bonjour {{customer_name}},

Votre commande {{order_ref}} a été confirmée !

Détails de la commande :
{{order_details}}

Total : {{total}}

Adresse de livraison :
{{customer_address}}

Téléphone : {{customer_phone}}

Nous vous contacterons via Messenger pour confirmer les détails de livraison.

Merci pour votre commande !
Tunisie Cigares
```

## Vérification de la Configuration

### 1. Vérifier les Variables d'Environnement

Dans votre `.env` :
```env
VITE_EMAILJS_SERVICE_ID=service_726b9kt
VITE_EMAILJS_TEMPLATE_ID=template_3zm1brw
VITE_EMAILJS_PUBLIC_KEY=-6nZEjUa8FNVgbS3W
```

### 2. Tester la Configuration

Ouvrez la console du navigateur (F12) et testez :

```javascript
// Importer la fonction de test
import { testEmailConfiguration } from './lib/email';

// Tester avec votre email
testEmailConfiguration('votre-email@example.com')
  .then(result => {
    console.log('Résultat:', result);
    if (result.success) {
      console.log('✅ EmailJS fonctionne !');
    } else {
      console.error('❌ Erreur:', result.message);
      console.error('Détails:', result.details);
    }
  });
```

### 3. Vérifier les Logs dans la Console

Quand un client passe une commande, vous devriez voir dans la console :

```
[Email] 📧 Starting order email send...
[Email] ✅ Email validation passed
[Email] 📤 Sending email via EmailJS API...
[Email] 📥 EmailJS API response received: { status: 200, ... }
[Email] ✅ Order confirmation email sent successfully!
```

Si vous voyez une erreur, les logs détaillés vous diront exactement ce qui ne va pas.

## Problèmes Courants et Solutions

### Problème 1: Email envoyé mais client ne reçoit pas

**Causes possibles :**
- Le template EmailJS n'utilise pas `{{to_email}}` dans le champ "To Email"
- L'email va dans les spams
- Le service EmailJS a un problème

**Solution :**
1. Vérifiez le dashboard EmailJS → votre template → champ "To Email" doit être `{{to_email}}`
2. Demandez au client de vérifier son dossier spam
3. Vérifiez les logs dans la console pour voir si l'email est bien envoyé (status 200)

### Problème 2: Erreur 400 Bad Request

**Cause :** Variables manquantes dans le template

**Solution :** Assurez-vous que toutes les variables utilisées dans le template sont envoyées dans `template_params`

### Problème 3: Erreur 401 Unauthorized

**Cause :** Clé publique EmailJS incorrecte ou expirée

**Solution :** Vérifiez `VITE_EMAILJS_PUBLIC_KEY` dans votre `.env`

### Problème 4: Erreur 429 Too Many Requests

**Cause :** Quota EmailJS dépassé (plan gratuit = 200 emails/mois)

**Solution :** Vérifiez votre quota sur le dashboard EmailJS

## Vérification du Template EmailJS

### Étapes pour Vérifier/Corriger le Template

1. **Connectez-vous à https://dashboard.emailjs.com**
2. **Allez dans "Email Templates"**
3. **Sélectionnez votre template** (ID: template_3zm1brw)
4. **Vérifiez le champ "To Email"** - Il DOIT contenir exactement : `{{to_email}}`
5. **Vérifiez que le contenu utilise les variables** : `{{customer_name}}`, `{{order_ref}}`, etc.
6. **Sauvegardez le template**

### Template EmailJS Recommandé

**Champs du Template :**
```
To Email: {{to_email}}
From Name: Tunisie Cigares
Reply To: {{reply_to}}
Subject: {{subject}}
```

**Contenu (Message) :**
```
Bonjour {{customer_name}},

Votre commande {{order_ref}} a été confirmée avec succès !

📦 Détails de la commande :
{{order_details}}

💰 Total : {{total}}

📍 Adresse de livraison :
{{customer_address}}

📞 Téléphone : {{customer_phone}}

Nous vous contacterons prochainement via Messenger pour confirmer les détails de livraison.

Merci pour votre confiance !
Tunisie Cigares
```

## Debugging

### Activer les Logs Détaillés

Les logs sont automatiquement activés en mode développement. Ouvrez la console du navigateur (F12) et regardez les logs qui commencent par `[Email]`.

### Vérifier si l'Email est Envoyé

Dans la console, cherchez :
- `[Email] ✅ Order confirmation email sent successfully!` = Email envoyé avec succès
- `[Email] ❌ Email sending error:` = Erreur lors de l'envoi

### Vérifier la Réponse EmailJS

Les logs montrent la réponse complète d'EmailJS :
```javascript
[Email] 📥 EmailJS API response received: {
  status: 200,  // 200 = succès, autre = erreur
  statusText: "OK",
  duration: "1234ms",
  responsePreview: "..."
}
```

## Support EmailJS

Si le problème persiste :
1. Vérifiez le dashboard EmailJS pour les erreurs
2. Vérifiez votre quota d'emails
3. Contactez le support EmailJS si nécessaire

