import { NextRequest, NextResponse } from 'next/server';
import { submitContactForm, type ContactFormData } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    // Obtenir l'adresse IP du client
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
    
    // Obtenir le user agent
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    // Parser les données du formulaire
    const formData = await request.json();
    
    console.log('📝 Données reçues:', {
      name: formData.name,
      email: formData.email,
      hasMessage: !!formData.message,
      projectType: formData.projectType,
      ip: ip,
    });
    
    // Validation de base côté serveur
    if (!formData.name || !formData.email || !formData.message) {
      console.log('❌ Validation échouée - champs manquants');
      return NextResponse.json(
        { 
          success: false, 
          message: 'Les champs nom, email et message sont obligatoires.' 
        },
        { status: 400 }
      );
    }

    // Préparer les données pour Supabase avec IP et user agent
    const submissionData: Omit<ContactFormData, 'id' | 'created_at' | 'status'> = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone?.trim() || '',
      company: formData.company?.trim() || '',
      project_type: formData.projectType || '',
      message: formData.message.trim(),
      ip_address: ip,
      user_agent: userAgent,
    };

    console.log('🚀 Tentative d\'insertion dans Supabase...');
    
    // Soumettre via Supabase
    const response = await submitContactForm(submissionData);

    if (response.success) {
      return NextResponse.json(response, { status: 200 });
    } else {
      return NextResponse.json(response, { status: 500 });
    }
  } catch (error) {
    console.error('Erreur API contact:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Une erreur serveur est survenue.' 
      },
      { status: 500 }
    );
  }
}

// Méthode OPTIONS pour CORS
export async function OPTIONS() {
  return new NextResponse(null, { 
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
