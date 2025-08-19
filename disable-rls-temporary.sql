-- Script pour désactiver temporairement RLS et diagnostiquer le problème
-- À exécuter dans l'éditeur SQL de Supabase

-- 1. Vérifier l'état actuel des politiques
SELECT 
    schemaname, 
    tablename, 
    policyname, 
    permissive,
    roles,
    cmd as command
FROM pg_policies 
WHERE tablename = 'contact_submissions';

-- 2. Vérifier si RLS est activé
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'contact_submissions';

-- 3. DÉSACTIVER COMPLÈTEMENT RLS (temporaire pour tester)
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;

-- 4. Supprimer TOUTES les politiques existantes
DROP POLICY IF EXISTS "Allow public insert" ON contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated read" ON contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated update" ON contact_submissions;
DROP POLICY IF EXISTS "Enable insert for all users" ON contact_submissions;
DROP POLICY IF EXISTS "Enable read for authenticated users only" ON contact_submissions;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON contact_submissions;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON contact_submissions;
DROP POLICY IF EXISTS "public_insert_policy" ON contact_submissions;
DROP POLICY IF EXISTS "authenticated_read_policy" ON contact_submissions;
DROP POLICY IF EXISTS "authenticated_update_policy" ON contact_submissions;

-- 5. Test d'insertion direct (devrait fonctionner maintenant)
INSERT INTO contact_submissions (name, email, message, project_type, phone, company) 
VALUES (
    'Test Sans RLS', 
    'test-no-rls@example.com', 
    'Test après désactivation RLS', 
    'web',
    '+33123456789',
    'Test Company'
);

-- 6. Vérifier que l'insertion a fonctionné
SELECT id, name, email, created_at 
FROM contact_submissions 
WHERE email = 'test-no-rls@example.com' 
ORDER BY created_at DESC 
LIMIT 1;

-- 7. Nettoyer le test
DELETE FROM contact_submissions WHERE email = 'test-no-rls@example.com';

-- 8. Message de confirmation
SELECT 'RLS désactivé temporairement. Testez votre formulaire maintenant.' as status;
