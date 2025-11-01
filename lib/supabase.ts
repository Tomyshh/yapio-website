import { createClient } from '@supabase/supabase-js';

// Configuration Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Client Supabase (création paresseuse et optionnelle)
let cachedClient: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  if (cachedClient) return cachedClient;
  if (!supabaseUrl || !supabaseAnonKey) return null;
  cachedClient = createClient(supabaseUrl, supabaseAnonKey);
  return cachedClient;
}

// Fonction helper pour vérifier si Supabase est configuré
export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey);
};

// Types pour les données du formulaire de contact
export interface ContactFormData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  project_type: string;
  message: string;
  created_at?: string;
  status?: 'new' | 'read' | 'replied' | 'archived';
  ip_address?: string;
  user_agent?: string;
}

// Interface pour la réponse de l'API
export interface ContactSubmissionResponse {
  success: boolean;
  message: string;
  data?: ContactFormData;
  error?: string;
}

// Fonction pour soumettre le formulaire de contact
export async function submitContactForm(formData: Omit<ContactFormData, 'id' | 'created_at' | 'status'>): Promise<ContactSubmissionResponse> {
  try {
    // Vérifier si Supabase est configuré
    const supabase = getSupabaseClient();
    if (!supabase) {
      return {
        success: false,
        message: 'Le service de contact n\'est pas configuré. Veuillez contacter l\'administrateur.',
        error: 'Supabase not configured',
      };
    }

    // Validation des données obligatoires
    if (!formData.name || !formData.email || !formData.message) {
      return {
        success: false,
        message: 'Les champs nom, email et message sont obligatoires.',
      };
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return {
        success: false,
        message: 'Veuillez saisir une adresse email valide.',
      };
    }

    // Préparer les données pour l'insertion
    const insertData = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone?.trim() || '',
      company: formData.company?.trim() || '',
      project_type: formData.project_type || '',
      message: formData.message.trim(),
      status: 'new',
      ip_address: formData.ip_address || null,
      user_agent: formData.user_agent || null,
    };

    console.log('📊 Données à insérer:', {
      name: insertData.name,
      email: insertData.email,
      project_type: insertData.project_type,
      hasMessage: !!insertData.message,
    });

    // Insertion des données dans Supabase
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([insertData])
      .select()
      .single();

    if (error) {
      console.error('❌ Erreur Supabase détaillée:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      
      // Messages d'erreur plus spécifiques
      if (error.code === '42501') {
        return {
          success: false,
          message: 'Problème de permissions dans la base de données. Contactez l\'administrateur.',
          error: `RLS Error: ${error.message}`,
        };
      }
      
      return {
        success: false,
        message: 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.',
        error: error.message,
      };
    }

    console.log('✅ Insertion réussie:', data?.id);

    return {
      success: true,
      message: 'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.',
      data: data as unknown as ContactFormData,
    };
  } catch (error) {
    console.error('Erreur lors de la soumission du formulaire:', error);
    return {
      success: false,
      message: 'Une erreur inattendue est survenue. Veuillez réessayer.',
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    };
  }
}

// Fonction pour récupérer les soumissions (pour l'administration)
export async function getContactSubmissions(
  limit: number = 50,
  offset: number = 0,
  status?: 'new' | 'read' | 'replied' | 'archived'
) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return {
        success: false,
        error: 'Supabase not configured',
      };
    }

    let query = supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des soumissions:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    };
  }
}

// Fonction pour marquer une soumission comme lue
export async function markSubmissionAsRead(id: string) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return {
        success: false,
        error: 'Supabase not configured',
      };
    }

    const { data, error } = await supabase
      .from('contact_submissions')
      .update({ status: 'read' })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    };
  }
}

// ==================== TYPES ET FONCTIONS POUR LES PROJETS ====================

// Types pour les images de projet
export interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  image_type: 'desktop' | 'mobile';
  display_order: number;
  alt_text?: string;
  created_at: string;
}

// Type pour un projet avec ses images
export interface Project {
  id: string;
  name: string;
  description: string;
  logo_url: string;
  color?: string;
  bg_color?: string;
  border_color?: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  images?: ProjectImage[];
  desktop_images?: ProjectImage[];
  mobile_images?: ProjectImage[];
}

// Fonction pour récupérer tous les projets actifs avec leurs images
export async function getProjects(): Promise<{ success: boolean; data?: Project[]; error?: string }> {
  try {
    // Si Supabase n'est pas configuré, retourner un tableau vide
    const supabase = getSupabaseClient();
    if (!supabase) {
      return {
        success: true,
        data: [],
      };
    }

    // Récupérer les projets actifs triés par display_order
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (projectsError) {
      throw projectsError;
    }

    if (!projects || projects.length === 0) {
      return {
        success: true,
        data: [],
      };
    }

    // Récupérer toutes les images pour ces projets
    const projectIds = projects.map((p) => p.id);
    const { data: images, error: imagesError } = await supabase
      .from('project_images')
      .select('*')
      .in('project_id', projectIds)
      .order('display_order', { ascending: true });

    if (imagesError) {
      throw imagesError;
    }

    // Combiner les projets avec leurs images
    const projectsWithImages = projects.map((project) => {
      const projectImages = images?.filter((img) => img.project_id === project.id) || [];
      const desktopImages = projectImages.filter((img) => img.image_type === 'desktop');
      const mobileImages = projectImages.filter((img) => img.image_type === 'mobile');

      return {
        ...project,
        images: projectImages,
        desktop_images: desktopImages,
        mobile_images: mobileImages,
      };
    });

    return {
      success: true,
      data: projectsWithImages as unknown as Project[],
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    };
  }
}

// Fonction pour récupérer un projet spécifique par son ID
export async function getProjectById(id: string): Promise<{ success: boolean; data?: Project; error?: string }> {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return {
        success: false,
        error: 'Supabase not configured',
      };
    }

    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (projectError) {
      throw projectError;
    }

    // Récupérer les images du projet
    const { data: images, error: imagesError } = await supabase
      .from('project_images')
      .select('*')
      .eq('project_id', id)
      .order('display_order', { ascending: true });

    if (imagesError) {
      throw imagesError;
    }

    const desktopImages = images?.filter((img) => img.image_type === 'desktop') || [];
    const mobileImages = images?.filter((img) => img.image_type === 'mobile') || [];

    const projectWithImages = {
      ...project,
      images: (images || []) as unknown as ProjectImage[],
      desktop_images: desktopImages as unknown as ProjectImage[],
      mobile_images: mobileImages as unknown as ProjectImage[],
    } as Project;

    return {
      success: true,
      data: projectWithImages,
    };
  } catch (error) {
    console.error('Erreur lors de la récupération du projet:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    };
  }
}
