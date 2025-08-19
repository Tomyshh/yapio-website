-- Script SQL simplifié pour Supabase - Version sans RLS complexe
-- À exécuter dans l'éditeur SQL de Supabase

-- 1. Création de la table pour les soumissions de contact
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    project_type VARCHAR(100),
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Index pour les performances
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);

-- 3. Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 4. Trigger pour updated_at
DROP TRIGGER IF EXISTS update_contact_submissions_updated_at ON contact_submissions;
CREATE TRIGGER update_contact_submissions_updated_at 
    BEFORE UPDATE ON contact_submissions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 5. Configuration RLS simplifiée
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- 6. Supprimer toutes les anciennes politiques
DROP POLICY IF EXISTS "Allow public insert" ON contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated read" ON contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated update" ON contact_submissions;
DROP POLICY IF EXISTS "Enable insert for all users" ON contact_submissions;
DROP POLICY IF EXISTS "Enable read for authenticated users only" ON contact_submissions;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON contact_submissions;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON contact_submissions;

-- 7. Créer une seule politique permissive pour l'insertion publique
CREATE POLICY "public_insert_policy" ON contact_submissions
    FOR INSERT 
    TO public
    WITH CHECK (
        name IS NOT NULL 
        AND email IS NOT NULL 
        AND message IS NOT NULL
        AND length(name) > 0 
        AND length(email) > 0 
        AND length(message) > 0
    );

-- 8. Politique pour la lecture (utilisateurs authentifiés uniquement)
CREATE POLICY "authenticated_read_policy" ON contact_submissions
    FOR SELECT 
    TO authenticated 
    USING (true);

-- 9. Politique pour les mises à jour (utilisateurs authentifiés uniquement)
CREATE POLICY "authenticated_update_policy" ON contact_submissions
    FOR UPDATE 
    TO authenticated 
    USING (true)
    WITH CHECK (true);

-- 10. Test d'insertion pour vérifier que ça fonctionne
DO $$
BEGIN
    -- Tenter une insertion de test
    INSERT INTO contact_submissions (name, email, message, project_type) 
    VALUES ('Test Setup', 'setup-test@example.com', 'Message de test lors du setup', 'web');
    
    RAISE NOTICE 'Test d''insertion réussi !';
    
    -- Supprimer le test
    DELETE FROM contact_submissions WHERE email = 'setup-test@example.com';
    
    RAISE NOTICE 'Setup terminé avec succès !';
EXCEPTION 
    WHEN OTHERS THEN
        RAISE NOTICE 'Erreur lors du test: %', SQLERRM;
END $$;

-- 11. Afficher les politiques créées
SELECT 
    schemaname, 
    tablename, 
    policyname, 
    permissive,
    roles,
    cmd as command,
    CASE 
        WHEN qual IS NOT NULL THEN 'WITH CHECK: ' || qual
        ELSE 'No restrictions'
    END as policy_details
FROM pg_policies 
WHERE tablename = 'contact_submissions'
ORDER BY policyname;

-- Instructions :
-- 1. Exécutez ce script dans l'éditeur SQL de Supabase
-- 2. Vérifiez qu'il n'y a pas d'erreurs
-- 3. Le message "Setup terminé avec succès !" devrait apparaître
-- 4. Testez votre formulaire de contact
