-- Script SQL pour configurer Supabase pour le site YAPIO
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

-- 2. Création d'un index sur l'email pour les recherches rapides
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);

-- 3. Création d'un index sur le statut pour les filtres
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);

-- 4. Création d'un index sur la date de création pour le tri
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);

-- 5. Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 6. Trigger pour mettre à jour updated_at automatiquement
CREATE TRIGGER update_contact_submissions_updated_at 
    BEFORE UPDATE ON contact_submissions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 7. Création de la politique RLS (Row Level Security) pour permettre l'insertion publique
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- 8. Politique pour permettre l'insertion de nouveaux contacts (accès public)
CREATE POLICY "Allow public insert" ON contact_submissions
    FOR INSERT 
    TO public 
    WITH CHECK (true);

-- 9. Politique pour permettre la lecture aux utilisateurs authentifiés seulement
-- (pour l'administration future)
CREATE POLICY "Allow authenticated read" ON contact_submissions
    FOR SELECT 
    TO authenticated 
    USING (true);

-- 10. Politique pour permettre la mise à jour aux utilisateurs authentifiés seulement
CREATE POLICY "Allow authenticated update" ON contact_submissions
    FOR UPDATE 
    TO authenticated 
    USING (true);

-- 11. Création d'une vue pour les statistiques (optionnel)
CREATE OR REPLACE VIEW contact_stats AS
SELECT 
    COUNT(*) as total_submissions,
    COUNT(CASE WHEN status = 'new' THEN 1 END) as new_submissions,
    COUNT(CASE WHEN status = 'read' THEN 1 END) as read_submissions,
    COUNT(CASE WHEN status = 'replied' THEN 1 END) as replied_submissions,
    COUNT(CASE WHEN status = 'archived' THEN 1 END) as archived_submissions,
    COUNT(CASE WHEN created_at >= CURRENT_DATE THEN 1 END) as today_submissions,
    COUNT(CASE WHEN created_at >= CURRENT_DATE - INTERVAL '7 days' THEN 1 END) as week_submissions,
    COUNT(CASE WHEN created_at >= CURRENT_DATE - INTERVAL '30 days' THEN 1 END) as month_submissions
FROM contact_submissions;

-- 12. Table pour les types de projets (optionnel, pour normalisation future)
CREATE TABLE IF NOT EXISTS project_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 13. Insertion des types de projets par défaut
INSERT INTO project_types (name, description) VALUES
    ('Application Mobile', 'Développement d''applications mobiles iOS et Android'),
    ('Application Desktop', 'Développement d''applications desktop multiplateformes'),
    ('Application Web', 'Développement d''applications web et sites internet'),
    ('Consulting', 'Services de conseil et expertise technique'),
    ('Autre', 'Autres types de projets ou demandes spécifiques')
ON CONFLICT (name) DO NOTHING;

-- 14. Fonction pour nettoyer les anciennes soumissions (optionnel)
CREATE OR REPLACE FUNCTION cleanup_old_submissions()
RETURNS void AS $$
BEGIN
    -- Archiver les soumissions de plus de 6 mois qui sont déjà traitées
    UPDATE contact_submissions 
    SET status = 'archived' 
    WHERE created_at < NOW() - INTERVAL '6 months' 
    AND status IN ('replied');
    
    -- Optionnel: Supprimer les soumissions archivées de plus d'un an
    -- DELETE FROM contact_submissions 
    -- WHERE status = 'archived' 
    -- AND created_at < NOW() - INTERVAL '1 year';
END;
$$ language 'plpgsql';

-- 15. Commentaires sur les tables pour la documentation
COMMENT ON TABLE contact_submissions IS 'Table pour stocker les soumissions du formulaire de contact du site YAPIO';
COMMENT ON COLUMN contact_submissions.id IS 'Identifiant unique de la soumission';
COMMENT ON COLUMN contact_submissions.name IS 'Nom complet du contact';
COMMENT ON COLUMN contact_submissions.email IS 'Adresse email du contact';
COMMENT ON COLUMN contact_submissions.phone IS 'Numéro de téléphone (optionnel)';
COMMENT ON COLUMN contact_submissions.company IS 'Nom de l''entreprise (optionnel)';
COMMENT ON COLUMN contact_submissions.project_type IS 'Type de projet demandé';
COMMENT ON COLUMN contact_submissions.message IS 'Message du contact';
COMMENT ON COLUMN contact_submissions.status IS 'Statut de traitement de la demande';
COMMENT ON COLUMN contact_submissions.ip_address IS 'Adresse IP du visiteur (pour la sécurité)';
COMMENT ON COLUMN contact_submissions.user_agent IS 'User agent du navigateur';

-- 16. Création d'une fonction pour obtenir les statistiques
CREATE OR REPLACE FUNCTION get_contact_statistics(
    start_date DATE DEFAULT CURRENT_DATE - INTERVAL '30 days',
    end_date DATE DEFAULT CURRENT_DATE
)
RETURNS TABLE (
    total_count BIGINT,
    new_count BIGINT,
    read_count BIGINT,
    replied_count BIGINT,
    archived_count BIGINT,
    daily_average NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*) as total_count,
        COUNT(CASE WHEN status = 'new' THEN 1 END) as new_count,
        COUNT(CASE WHEN status = 'read' THEN 1 END) as read_count,
        COUNT(CASE WHEN status = 'replied' THEN 1 END) as replied_count,
        COUNT(CASE WHEN status = 'archived' THEN 1 END) as archived_count,
        ROUND(COUNT(*)::NUMERIC / GREATEST(1, end_date - start_date), 2) as daily_average
    FROM contact_submissions
    WHERE created_at::DATE BETWEEN start_date AND end_date;
END;
$$ language 'plpgsql';

-- Instructions d'utilisation :
-- 1. Copiez et collez ce script dans l'éditeur SQL de Supabase
-- 2. Exécutez le script pour créer toutes les tables et fonctions
-- 3. Vérifiez que la table 'contact_submissions' est bien créée
-- 4. Les politiques RLS permettent l'insertion publique mais la lecture nécessite une authentification
-- 5. Pour tester, vous pouvez insérer une ligne de test :
/*
INSERT INTO contact_submissions (name, email, message, project_type) 
VALUES ('Test User', 'test@example.com', 'Message de test', 'Application Web');
*/
