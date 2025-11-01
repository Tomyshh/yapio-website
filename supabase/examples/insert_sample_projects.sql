-- Exemple d'insertion de projets avec leurs images
-- ⚠️ REMPLACEZ LES URLs PAR VOS VRAIES URLs SUPABASE STORAGE

-- 1. Insérer le projet Aerilux
INSERT INTO projects (name, description, logo_url, color, bg_color, border_color, display_order, is_active)
VALUES (
  'Aerilux',
  'Solutions d''eloignement de pigeons',
  '/logo/aerilux_logo.png', -- Remplacer par l'URL Supabase Storage si nécessaire
  'from-white to-gray-200',
  'bg-white/10',
  'border-white/20',
  0,
  true
) RETURNING id;

-- Notez l'ID retourné et utilisez-le pour les images ci-dessous
-- Exemple: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'

-- 2. Insérer les images desktop pour Aerilux
-- REMPLACEZ 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' par l'ID réel retourné ci-dessus
/*
INSERT INTO project_images (project_id, image_url, image_type, display_order, alt_text)
VALUES 
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'https://votre-projet.supabase.co/storage/v1/object/public/project-images/desktop/aerilux-desktop-1.png', 'desktop', 0, 'Interface desktop Aerilux - Page principale'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'https://votre-projet.supabase.co/storage/v1/object/public/project-images/desktop/aerilux-desktop-2.png', 'desktop', 1, 'Interface desktop Aerilux - Dashboard');
*/

-- 3. Insérer les images mobile pour Aerilux
/*
INSERT INTO project_images (project_id, image_url, image_type, display_order, alt_text)
VALUES 
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'https://votre-projet.supabase.co/storage/v1/object/public/project-images/mobile/aerilux-mobile-1.png', 'mobile', 0, 'Interface mobile Aerilux - Page principale'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'https://votre-projet.supabase.co/storage/v1/object/public/project-images/mobile/aerilux-mobile-2.png', 'mobile', 1, 'Interface mobile Aerilux - Menu');
*/

-- 4. Insérer le projet DTAI
INSERT INTO projects (name, description, logo_url, color, bg_color, border_color, display_order, is_active)
VALUES (
  'DTAI',
  'Expertise en intelligence artificielle dans la transcription et traduction',
  '/logo/dtai_logo.png',
  'from-red-400 to-pink-400',
  'bg-red-500/10',
  'border-red-400/20',
  1,
  true
) RETURNING id;

-- 5. Insérer le projet Havrouta
INSERT INTO projects (name, description, logo_url, color, bg_color, border_color, display_order, is_active)
VALUES (
  'Havrouta',
  'Plateforme éducative moderne et interactive',
  '/logo/havrouta_logo.png',
  'from-[#C2A765] to-[#D4B876]',
  'bg-[#C2A765]/10',
  'border-[#C2A765]/20',
  2,
  true
) RETURNING id;

-- 6. Insérer le projet Olim
INSERT INTO projects (name, description, logo_url, color, bg_color, border_color, display_order, is_active)
VALUES (
  'Olim',
  'Services d''accompagnement et conciergerie administrative',
  '/logo/olim_logo.png',
  'from-[#0E78FE] to-[#3B8FFF]',
  'bg-[#0E78FE]/10',
  'border-[#0E78FE]/20',
  3,
  true
) RETURNING id;

-- 7. Insérer le projet Taim
INSERT INTO projects (name, description, logo_url, color, bg_color, border_color, display_order, is_active)
VALUES (
  'Taim',
  'Applications web et mobile pour un restaurant en ligne',
  '/logo/taim_logo.png',
  'from-green-400 to-teal-400',
  'bg-green-500/10',
  'border-green-400/20',
  4,
  true
) RETURNING id;

-- 8. Insérer le projet SecurityBear
INSERT INTO projects (name, description, logo_url, color, bg_color, border_color, display_order, is_active)
VALUES (
  'SecurityBear',
  'Solutions de surveillance et caméras de sécurité',
  '/logo/securitybear_logo.png',
  'from-orange-400 to-red-500',
  'bg-orange-500/10',
  'border-orange-400/20',
  5,
  true
) RETURNING id;

-- Pour ajouter des images, utilisez cette structure en remplaçant:
-- 1. L'ID du projet (obtenu avec RETURNING id ci-dessus)
-- 2. Les URLs des images (depuis Supabase Storage ou votre CDN)

/*
Exemple complet pour un projet avec ses images:

-- Étape 1: Créer le projet et obtenir son ID
INSERT INTO projects (name, description, logo_url, color, bg_color, border_color, display_order)
VALUES (
  'Mon Projet',
  'Description',
  'https://.../logo.png',
  'from-blue-500 to-purple-500',
  'bg-blue-500/10',
  'border-blue-400/20',
  0
) RETURNING id;

-- Étape 2: Utiliser l'ID retourné pour les images
-- Supposons que l'ID soit: 123e4567-e89b-12d3-a456-426614174000

INSERT INTO project_images (project_id, image_url, image_type, display_order, alt_text)
VALUES 
  ('123e4567-e89b-12d3-a456-426614174000', 'https://.../desktop-1.png', 'desktop', 0, 'Description image desktop 1'),
  ('123e4567-e89b-12d3-a456-426614174000', 'https://.../desktop-2.png', 'desktop', 1, 'Description image desktop 2'),
  ('123e4567-e89b-12d3-a456-426614174000', 'https://.../mobile-1.png', 'mobile', 0, 'Description image mobile 1'),
  ('123e4567-e89b-12d3-a456-426614174000', 'https://.../mobile-2.png', 'mobile', 1, 'Description image mobile 2');
*/

