# Configuration Supabase pour YAPIO

Ce guide explique comment configurer Supabase pour gérer les soumissions du formulaire de contact.

## 📋 Prérequis

1. **Compte Supabase** : Créez un compte sur [supabase.com](https://supabase.com)
2. **Variables d'environnement** : Vous devez avoir ajouté dans `.env.local` :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🚀 Installation et Configuration

### 1. Création de la base de données

1. Connectez-vous à votre projet Supabase
2. Allez dans l'onglet **SQL Editor**
3. Copiez et exécutez le contenu du fichier `supabase-setup.sql`
4. Vérifiez que la table `contact_submissions` a été créée

### 2. Structure de la table

La table `contact_submissions` contient les champs suivants :

```sql
- id (UUID, primary key)
- name (VARCHAR, obligatoire)
- email (VARCHAR, obligatoire)
- phone (VARCHAR, optionnel)
- company (VARCHAR, optionnel)
- project_type (VARCHAR, optionnel)
- message (TEXT, obligatoire)
- status (VARCHAR, défaut: 'new')
- ip_address (INET, pour tracking)
- user_agent (TEXT, pour tracking)
- created_at (TIMESTAMP, auto)
- updated_at (TIMESTAMP, auto)
```

### 3. Sécurité (RLS - Row Level Security)

Les politiques de sécurité sont configurées pour :
- ✅ **Insertion publique** : Tout le monde peut soumettre le formulaire
- ❌ **Lecture restreinte** : Seuls les utilisateurs authentifiés peuvent lire
- ❌ **Modification restreinte** : Seuls les utilisateurs authentifiés peuvent modifier

## 📊 Fonctionnalités

### Soumission de formulaire
- Validation côté client et serveur
- Sauvegarde automatique dans Supabase
- Messages d'erreur personnalisés
- Tracking IP et User-Agent pour la sécurité

### API Route sécurisée
- Endpoint : `POST /api/contact`
- Validation des données
- Gestion des erreurs
- Récupération automatique de l'IP côté serveur

### Statuts des soumissions
- `new` : Nouvelle soumission non lue
- `read` : Soumission lue
- `replied` : Réponse envoyée
- `archived` : Archivée

## 🔧 Utilisation

### Consulter les soumissions

```sql
-- Voir toutes les nouvelles soumissions
SELECT * FROM contact_submissions 
WHERE status = 'new' 
ORDER BY created_at DESC;

-- Statistiques rapides
SELECT * FROM contact_stats;
```

### Marquer comme lu

```sql
UPDATE contact_submissions 
SET status = 'read' 
WHERE id = 'votre-uuid-ici';
```

### Fonctions utiles

```sql
-- Obtenir les statistiques des 30 derniers jours
SELECT * FROM get_contact_statistics();

-- Nettoyer les anciennes soumissions (optionnel)
SELECT cleanup_old_submissions();
```

## 🛠️ Administration

### Dashboard Supabase
1. Allez dans **Table Editor**
2. Sélectionnez `contact_submissions`
3. Consultez et gérez les soumissions

### Notifications par email
Le système envoie également un email de notification via `mailto:` en backup.

## 🔍 Monitoring

### Vérifier les erreurs
Consultez les logs dans :
- Console du navigateur (côté client)
- Logs Vercel/Next.js (côté serveur)
- Logs Supabase (côté base de données)

### Métriques importantes
- Nombre de soumissions par jour
- Taux d'erreur
- Types de projets les plus demandés

## 🚨 Dépannage

### Erreur "Variables d'environnement manquantes"
Vérifiez que `.env.local` contient :
```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-cle-anonyme
```

### Erreur "Permission denied"
Vérifiez les politiques RLS dans Supabase :
```sql
-- Vérifier les politiques
SELECT * FROM pg_policies WHERE tablename = 'contact_submissions';
```

### Formulaire ne fonctionne pas
1. Ouvrez les outils de développement
2. Vérifiez l'onglet Network pour les erreurs API
3. Consultez la console pour les erreurs JavaScript

## 📈 Améliorations futures

- Dashboard d'administration personnalisé
- Notifications email automatiques via Supabase Edge Functions
- Intégration avec des outils CRM
- Analytics avancés des soumissions

## 🔐 Sécurité

- Les données sensibles ne sont jamais exposées côté client
- L'IP est collectée côté serveur uniquement
- Validation stricte des données d'entrée
- Protection contre le spam (peut être étendue)

---

**Note** : Ce système est prêt pour la production et peut gérer un volume important de soumissions.
