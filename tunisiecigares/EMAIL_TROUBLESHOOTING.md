# 🔍 Diagnostic des Emails - Guide de Dépannage

## Problème : Le client ne reçoit pas d'email

### Étape 1 : Vérifier les Logs de la Console

Ouvrez la console du navigateur (F12) et cherchez ces logs lors d'une commande :

#### ✅ Logs Attendus (Si tout fonctionne) :
```
[Email] 📤 Sending email via EmailJS API...
[Email] 📥 EmailJS API response received: { status: 200, ... }
[Email] ✅ EmailJS confirmed email sent
[Email] ✅ Order confirmation email sent successfully!
```

#### ❌ Si vous voyez une erreur :
- **Status 400** : Template EmailJS mal configuré
- **Status 401** : Clé publique EmailJS invalide
- **Status 404** : Service ID ou Template ID incorrect
- **Status 429** : Quota EmailJS dépassé

### Étape 2 : Vérifier la Configuration EmailJS

#### A. Vérifier le Template EmailJS

1. Allez sur https://dashboard.emailjs.com
2. Ouvrez votre template `template_3zm1brw`
3. **Vérifiez ces champs :**

**Champ "To Email" :**
```
{{to_email}}
```
⚠️ **CRITIQUE** : Doit être exactement `{{to_email}}` (pas `to_email`, pas `{{to}}`, pas autre chose)

**Champ "Message" :**
```
{{{html_message}}}
```
⚠️ **IMPORTANT** : Utilisez **triple braces** `{{{html_message}}}` pour rendre le HTML

**Champs optionnels :**
- From Name: `Tunisie Cigares`
- Reply To: `{{reply_to}}`
- Subject: `{{subject}}`

#### B. Vérifier les Secrets GitHub

1. GitHub → Settings → Secrets and variables → Actions
2. Vérifiez que ces secrets existent :
   - ✅ `VITE_EMAILJS_SERVICE_ID` = `service_726b9kt`
   - ✅ `VITE_EMAILJS_TEMPLATE_ID` = `template_3zm1brw`
   - ✅ `VITE_EMAILJS_PUBLIC_KEY` = `-6nZEjUa8FNVgbS3W`
   - ✅ `VITE_ADMIN_EMAIL` = `tunisiecigare@gmail.com`

### Étape 3 : Tester le Template EmailJS

#### Option A : Test depuis le Dashboard EmailJS

1. Allez sur https://dashboard.emailjs.com
2. Ouvrez votre template
3. Cliquez sur "Test" ou "Send Test Email"
4. Remplissez les variables :
   - `to_email`: Votre email de test
   - `html_message`: `<h1>Test</h1><p>Ceci est un test</p>`
   - `subject`: Test Email
5. Envoyez et vérifiez si vous recevez l'email

#### Option B : Test depuis la Console du Navigateur

Ouvrez la console sur votre site en production et exécutez :

```javascript
// Test de la configuration EmailJS
const testEmail = async () => {
  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: 'service_726b9kt',
      template_id: 'template_3zm1brw',
      user_id: '-6nZEjUa8FNVgbS3W',
      template_params: {
        to_email: 'VOTRE_EMAIL@example.com', // ← Remplacez par votre email
        html_message: '<h1>Test</h1><p>Ceci est un test depuis la console</p>',
        subject: 'Test Email'
      }
    })
  });
  
  const result = await response.text();
  console.log('Status:', response.status);
  console.log('Response:', result);
};

testEmail();
```

### Étape 4 : Vérifier le Quota EmailJS

1. Allez sur https://dashboard.emailjs.com
2. Vérifiez votre quota d'emails
3. Si le quota est dépassé, vous verrez une erreur 429

### Étape 5 : Vérifier les Spams

- Vérifiez le dossier **Spam/Indésirables** de votre boîte email
- Vérifiez que l'email de l'expéditeur n'est pas bloqué
- Attendez quelques minutes (les emails peuvent prendre du temps)

## Problèmes Courants et Solutions

### ❌ Problème 1 : "Template Error (400)"

**Cause :** Le template EmailJS n'utilise pas `{{to_email}}` dans le champ "To Email"

**Solution :**
1. Ouvrez votre template sur EmailJS
2. Dans le champ "To Email", mettez exactement : `{{to_email}}`
3. Sauvegardez

### ❌ Problème 2 : "Authentication Error (401)"

**Cause :** La clé publique EmailJS est incorrecte

**Solution :**
1. Vérifiez `VITE_EMAILJS_PUBLIC_KEY` dans GitHub Secrets
2. Vérifiez que c'est bien la clé publique (commence par `-` ou `user_`)

### ❌ Problème 3 : "Not Found (404)"

**Cause :** Service ID ou Template ID incorrect

**Solution :**
1. Vérifiez `VITE_EMAILJS_SERVICE_ID` et `VITE_EMAILJS_TEMPLATE_ID` dans GitHub Secrets
2. Vérifiez que les IDs correspondent à ceux de votre dashboard EmailJS

### ❌ Problème 4 : "Quota Exceeded (429)"

**Cause :** Vous avez atteint votre limite d'emails gratuits

**Solution :**
1. Attendez le renouvellement mensuel
2. Ou passez à un plan payant EmailJS

### ❌ Problème 5 : Aucun log d'erreur, mais pas d'email

**Cause possible :** Le template n'utilise pas `{{{html_message}}}`

**Solution :**
1. Ouvrez votre template EmailJS
2. Dans le champ "Message", mettez : `{{{html_message}}}`
3. Sauvegardez

## Vérification Finale

Après avoir corrigé le template, testez à nouveau :

1. Passez une commande de test
2. Ouvrez la console (F12)
3. Cherchez ces logs :
   ```
   [Email] 📥 EmailJS API response received: { status: 200 }
   [Email] ✅ EmailJS confirmed email sent
   [Email] ✅ Order confirmation email sent successfully!
   ```
4. Vérifiez votre boîte email (et le dossier spam)

## Support

Si le problème persiste :
1. Partagez les logs complets de la console
2. Vérifiez que tous les secrets GitHub sont correctement configurés
3. Vérifiez que le template EmailJS utilise bien `{{to_email}}` et `{{{html_message}}}`

