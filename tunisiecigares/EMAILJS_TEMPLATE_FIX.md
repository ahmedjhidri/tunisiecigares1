# ✅ EmailJS Template Configuration

## Configuration Actuelle

- ✅ **Client et Admin reçoivent le MÊME email HTML formaté**
- ✅ **Les deux utilisent `{{{html_message}}}` dans le template**

## Configuration du Template EmailJS

**IMPORTANT :** Les deux emails (client et admin) utilisent maintenant le **MÊME format HTML**. Vous pouvez utiliser le même template pour les deux, ou créer un template séparé pour l'admin.

### Option 1 : Deux Templates Séparés (RECOMMANDÉ)

1. **Créer un template pour le CLIENT** (template_3zm1brw - celui que vous avez déjà)
2. **Créer un NOUVEAU template pour l'ADMIN**

#### Configuration Template (template_3zm1brw)

**Champs du Template :**
```
To Email: {{to_email}}  ← CRITIQUE : Doit être {{to_email}}
From Name: Tunisie Cigares
Reply To: {{reply_to}}
Subject: {{subject}}
```

**Contenu (Message) - HTML :**
```
{{{html_message}}}
```

**⚠️ IMPORTANT :**
- Utiliser `{{{html_message}}}` (triple braces) pour rendre le HTML
- Le HTML est généré automatiquement par le code
- Le même template peut être utilisé pour le client ET l'admin

#### Option : Template ADMIN Séparé (optionnel)

Si vous voulez un template différent pour l'admin :

1. **Allez sur https://dashboard.emailjs.com**
2. **Créez un nouveau template** (ou utilisez un template existant)
3. **Notez le Template ID** (ex: `template_xxxxxxx`)
4. **Ajoutez `VITE_EMAILJS_ADMIN_TEMPLATE_ID` dans votre `.env`**

**Champs du Template :**
```
To Email: {{to_email}}  ← Sera remplacé par l'email admin
From Name: Tunisie Cigares
Reply To: {{reply_to}}
Subject: {{subject}}
```

**Contenu (Message) - HTML :**
```
{{{html_message}}}
```

**⚠️ IMPORTANT :**
- Utiliser `{{{html_message}}}` (triple braces) pour rendre le HTML
- Le HTML est généré automatiquement par le code
- **Note :** Si vous n'ajoutez pas `VITE_EMAILJS_ADMIN_TEMPLATE_ID`, le même template sera utilisé pour les deux

### Option 2 : Utiliser le Même Template (si vous ne pouvez pas créer deux templates)

Si vous devez utiliser le même template pour les deux, configurez-le ainsi :

**Champs du Template :**
```
To Email: {{to_email}}
Subject: {{subject}}
```

**Contenu (Message) :**
```
{{#if html_message}}
{{{html_message}}}
{{else}}
Bonjour {{customer_name}},

Votre commande {{order_ref}} a été confirmée !

Détails : {{order_details}}
Total : {{total}}

Adresse : {{customer_address}}
Téléphone : {{customer_phone}}

Merci !
{{/if}}
```

**Note :** Cette approche nécessite que votre template EmailJS supporte les conditions (Handlebars).

## Configuration dans .env

Après avoir créé le template admin, ajoutez dans votre `.env` :

```env
VITE_EMAILJS_SERVICE_ID=service_726b9kt
VITE_EMAILJS_TEMPLATE_ID=template_3zm1brw  # Template CLIENT
VITE_EMAILJS_ADMIN_TEMPLATE_ID=template_xxxxxxx  # Template ADMIN (nouveau)
VITE_EMAILJS_PUBLIC_KEY=-6nZEjUa8FNVgbS3W
VITE_ADMIN_EMAIL=tunisiecigare@gmail.com
```

## Vérification

1. **Vérifiez le template CLIENT** :
   - "To Email" = `{{to_email}}`
   - Contenu utilise les variables texte (pas html_message)

2. **Vérifiez le template ADMIN** :
   - "To Email" = `{{to_email}}` (sera remplacé par admin email)
   - Contenu = `{{{html_message}}}`

3. **Testez** :
   - Passez une commande de test
   - Vérifiez que le client reçoit un email avec le contenu
   - Vérifiez que l'admin reçoit un email HTML formaté

## Résumé des Variables

### Template CLIENT (sendOrderEmail)
- `{{to_email}}` - Email du client
- `{{customer_name}}` - Nom du client
- `{{order_ref}}` - Référence commande
- `{{customer_phone}}` - Téléphone
- `{{customer_address}}` - Adresse
- `{{order_details}}` - Détails (texte)
- `{{total}}` - Total
- `{{subject}}` - Sujet

### Template ADMIN (sendAdminNotification)
- `{{to_email}}` - Email admin (tunisiecigare@gmail.com)
- `{{{html_message}}}` - Contenu HTML complet
- `{{subject}}` - Sujet
- Variables texte optionnelles (customer_name, order_ref, etc.)

