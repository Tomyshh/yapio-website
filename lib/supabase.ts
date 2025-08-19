import { createClient } from '@supabase/supabase-js';

// Configuration Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Les variables d\'environnement Supabase sont manquantes');
}

// Client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
      data,
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
