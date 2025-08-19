-- Script pour réactiver RLS avec des politiques très simples
-- À exécuter SEULEMENT après avoir testé sans RLS

-- 1. Réactiver RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- 2. Politique ultra-simple pour l'insertion publique
CREATE POLICY "allow_all_inserts" ON contact_submissions
    FOR INSERT 
    WITH CHECK (true);

-- 3. Politique pour la lecture (authentifiés seulement)
CREATE POLICY "allow_authenticated_select" ON contact_submissions
    FOR SELECT 
    TO authenticated 
    USING (true);

-- 4. Test final
INSERT INTO contact_submissions (name, email, message) 
VALUES ('Test RLS Simple', 'test-simple@example.com', 'Test avec RLS simple');

SELECT 'RLS réactivé avec succès' as status;

-- Nettoyer le test
DELETE FROM contact_submissions WHERE email = 'test-simple@example.com';
