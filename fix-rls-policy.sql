-- Script pour corriger les politiques RLS de Supabase
-- À exécuter dans l'éditeur SQL de Supabase

-- 1. Supprimer les anciennes politiques s'il y en a
DROP POLICY IF EXISTS "Allow public insert" ON contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated read" ON contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated update" ON contact_submissions;

-- 2. Désactiver temporairement RLS pour tester
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;

-- 3. Réactiver RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- 4. Créer une politique d'insertion publique plus permissive
CREATE POLICY "Enable insert for all users" ON contact_submissions
    FOR INSERT 
    WITH CHECK (true);

-- 5. Politique pour permettre la lecture aux utilisateurs authentifiés seulement
CREATE POLICY "Enable read for authenticated users only" ON contact_submissions
    FOR SELECT 
    TO authenticated 
    USING (true);

-- 6. Politique pour permettre la mise à jour aux utilisateurs authentifiés seulement
CREATE POLICY "Enable update for authenticated users only" ON contact_submissions
    FOR UPDATE 
    TO authenticated 
    USING (true)
    WITH CHECK (true);

-- 7. Politique pour permettre la suppression aux utilisateurs authentifiés seulement
CREATE POLICY "Enable delete for authenticated users only" ON contact_submissions
    FOR DELETE 
    TO authenticated 
    USING (true);

-- 8. Vérifier les politiques créées
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'contact_submissions';

-- 9. Test d'insertion (optionnel - pour vérifier que ça fonctionne)
-- Décommentez les lignes suivantes pour tester :
/*
INSERT INTO contact_submissions (name, email, message, project_type) 
VALUES ('Test RLS', 'test-rls@example.com', 'Test après correction RLS', 'web');

-- Vérifier l'insertion
SELECT id, name, email, created_at FROM contact_submissions 
WHERE email = 'test-rls@example.com' 
ORDER BY created_at DESC 
LIMIT 1;
*/
