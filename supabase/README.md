# Configuration Supabase pour les Projets

Ce guide explique comment configurer Supabase pour gérer les projets et leurs images.

## 📋 Étapes de Configuration

### 1. Créer les Tables dans Supabase

1. Connectez-vous à votre dashboard Supabase
2. Allez dans **SQL Editor**
3. Copiez et exécutez le contenu du fichier `supabase/migrations/001_create_projects_tables.sql`

Cette migration va créer :
- **Table `projects`** : Stocke les informations des projets/clients
- **Table `project_images`** : Stocke les images desktop et mobile des projets
- **Politiques RLS** : Permet la lecture publique des projets actifs

### 2. Configurer le Storage Supabase

Pour stocker les images, vous devez créer un bucket dans Supabase Storage :

1. Allez dans **Storage** dans votre dashboard Supabase
2. Cliquez sur **New bucket**
3. Nommez-le `project-images` (ou un autre nom de votre choix)
4. Configurez les permissions :
   - **Public bucket** : Activé (pour que les images soient accessibles publiquement)
   - **File size limit** : Selon vos besoins (ex: 5MB par fichier)

### 3. Uploader les Images

Vous pouvez uploader les images de deux façons :

#### Option A : Via le Dashboard Supabase
1. Allez dans **Storage** > votre bucket
2. Créez des dossiers pour organiser :
   - `logos/` - pour les logos des clients
   - `desktop/` - pour les images desktop
   - `mobile/` - pour les images mobile
3. Uploadez vos fichiers
4. Copiez l'URL publique de chaque fichier

#### Option B : Via l'API Supabase
Utilisez le client Supabase pour uploader programmatiquement :

```typescript
import { supabase } from '@/lib/supabase';

const uploadImage = async (file: File, path: string) => {
  const { data, error } = await supabase.storage
    .from('project-images')
    .upload(path, file);
  
  if (error) throw error;
  
  // Récupérer l'URL publique
  const { data: { publicUrl } } = supabase.storage
    .from('project-images')
    .getPublicUrl(path);
  
  return publicUrl;
};
```

### 4. Insérer les Données

#### Insérer un Projet

```sql
INSERT INTO projects (name, description, logo_url, color, bg_color, border_color, display_order, is_active)
VALUES (
  'Aerilux',
  'Solutions d''eloignement de pigeons',
  'https://votre-projet.supabase.co/storage/v1/object/public/project-images/logos/aerilux_logo.png',
  'from-white to-gray-200',
  'bg-white/10',
  'border-white/20',
  0,
  true
);
```

#### Insérer des Images

```sql
-- Image desktop
INSERT INTO project_images (project_id, image_url, image_type, display_order, alt_text)
VALUES (
  'uuid-du-projet',
  'https://votre-projet.supabase.co/storage/v1/object/public/project-images/desktop/aerilux-desktop-1.png',
  'desktop',
  0,
  'Interface desktop Aerilux - Page d''accueil'
);

-- Image mobile
INSERT INTO project_images (project_id, image_url, image_type, display_order, alt_text)
VALUES (
  'uuid-du-projet',
  'https://votre-projet.supabase.co/storage/v1/object/public/project-images/mobile/aerilux-mobile-1.png',
  'mobile',
  0,
  'Interface mobile Aerilux - Page d''accueil'
);
```

### 5. Gérer l'Ordre d'Affichage

Les projets sont affichés selon le champ `display_order` (ordre croissant) :

```sql
-- Mettre Aerilux en premier
UPDATE projects SET display_order = 0 WHERE name = 'Aerilux';

-- Mettre DTAI en deuxième
UPDATE projects SET display_order = 1 WHERE name = 'DTAI';
```

## 📊 Structure des Données

### Table `projects`

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Identifiant unique |
| `name` | TEXT | Nom du projet/client |
| `description` | TEXT | Description du projet |
| `logo_url` | TEXT | URL du logo |
| `color` | TEXT | Couleur du gradient (ex: 'from-white to-gray-200') |
| `bg_color` | TEXT | Couleur de fond (ex: 'bg-white/10') |
| `border_color` | TEXT | Couleur de bordure (ex: 'border-white/20') |
| `display_order` | INTEGER | Ordre d'affichage (0 = premier) |
| `is_active` | BOOLEAN | Actif/inactif |
| `created_at` | TIMESTAMP | Date de création |
| `updated_at` | TIMESTAMP | Date de mise à jour |

### Table `project_images`

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Identifiant unique |
| `project_id` | UUID | Référence au projet |
| `image_url` | TEXT | URL de l'image |
| `image_type` | TEXT | 'desktop' ou 'mobile' |
| `display_order` | INTEGER | Ordre d'affichage |
| `alt_text` | TEXT | Texte alternatif pour l'accessibilité |
| `created_at` | TIMESTAMP | Date de création |

## 🔒 Sécurité (RLS)

Les politiques RLS sont configurées pour :
- ✅ Permettre la lecture publique des projets actifs
- ✅ Permettre la lecture publique de toutes les images
- 🔒 L'écriture nécessite une authentification (à configurer selon vos besoins)

## 🎨 Exemple Complet

Voici un exemple complet pour créer un projet avec ses images :

```sql
-- 1. Créer le projet
INSERT INTO projects (name, description, logo_url, color, bg_color, border_color, display_order)
VALUES (
  'Mon Nouveau Projet',
  'Description de mon projet',
  'https://votre-projet.supabase.co/storage/v1/object/public/project-images/logos/mon-projet.png',
  'from-blue-500 to-purple-500',
  'bg-blue-500/10',
  'border-blue-400/20',
  0
) RETURNING id;

-- 2. Notez l'ID retourné et utilisez-le pour les images
-- Par exemple, si l'ID est: a1b2c3d4-e5f6-7890-abcd-ef1234567890

-- 3. Ajouter les images desktop
INSERT INTO project_images (project_id, image_url, image_type, display_order, alt_text)
VALUES 
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'https://.../desktop-1.png', 'desktop', 0, 'Page d''accueil'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'https://.../desktop-2.png', 'desktop', 1, 'Page produits');

-- 4. Ajouter les images mobile
INSERT INTO project_images (project_id, image_url, image_type, display_order, alt_text)
VALUES 
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'https://.../mobile-1.png', 'mobile', 0, 'Page d''accueil mobile'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'https://.../mobile-2.png', 'mobile', 1, 'Page produits mobile');
```

## 🐛 Dépannage

### Les projets ne s'affichent pas
- Vérifiez que `is_active = true` dans la table `projects`
- Vérifiez que les URLs des images sont accessibles publiquement
- Vérifiez les erreurs dans la console du navigateur

### Les images ne s'affichent pas
- Vérifiez que le bucket est public
- Vérifiez que les URLs sont correctes
- Vérifiez les permissions RLS sur la table `project_images`

### Erreur CORS
- Configurez les règles CORS dans Supabase Storage si nécessaire

## 📝 Notes

- Les images sont optimisées automatiquement par Next.js Image
- Le composant Portfolio utilise un fallback si Supabase n'est pas configuré
- Les projets sont triés automatiquement par `display_order`

