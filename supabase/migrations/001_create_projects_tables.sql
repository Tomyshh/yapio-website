-- Migration pour créer les tables de projets et d'images
-- À exécuter dans Supabase SQL Editor

-- Table principale des projets/clients
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  color TEXT, -- Gradient color (ex: 'from-white to-gray-200')
  bg_color TEXT, -- Background color (ex: 'bg-white/10')
  border_color TEXT, -- Border color (ex: 'border-white/20')
  display_order INTEGER DEFAULT 0, -- Pour ordonner les projets
  is_active BOOLEAN DEFAULT true, -- Pour activer/désactiver un projet
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table pour stocker les images des projets (desktop et mobile)
CREATE TABLE IF NOT EXISTS project_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  image_type TEXT NOT NULL CHECK (image_type IN ('desktop', 'mobile')),
  display_order INTEGER DEFAULT 0, -- Pour ordonner les images
  alt_text TEXT, -- Texte alternatif pour l'accessibilité
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_projects_display_order ON projects(display_order);
CREATE INDEX IF NOT EXISTS idx_projects_is_active ON projects(is_active);
CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON project_images(project_id);
CREATE INDEX IF NOT EXISTS idx_project_images_type ON project_images(image_type);

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour mettre à jour updated_at automatiquement
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) - Permettre la lecture publique
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre la lecture publique des projets actifs
CREATE POLICY "Allow public read access to active projects"
  ON projects FOR SELECT
  USING (is_active = true);

-- Politique pour permettre la lecture publique des images
CREATE POLICY "Allow public read access to project images"
  ON project_images FOR SELECT
  USING (true);

-- Commentaires pour la documentation
COMMENT ON TABLE projects IS 'Table principale pour stocker les informations des projets/clients';
COMMENT ON TABLE project_images IS 'Table pour stocker les images desktop et mobile des projets';
COMMENT ON COLUMN projects.display_order IS 'Ordre d\'affichage des projets (plus petit = affiché en premier)';
COMMENT ON COLUMN project_images.image_type IS 'Type d\'image: desktop ou mobile';

