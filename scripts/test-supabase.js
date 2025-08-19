// Script de test pour vérifier la connexion Supabase
// Usage: node scripts/test-supabase.js

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function testSupabaseConnection() {
  console.log('🧪 Test de connexion Supabase...\n');

  // Vérifier les variables d'environnement
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Variables d\'environnement manquantes:');
    console.error('- NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅' : '❌');
    console.error('- NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅' : '❌');
    process.exit(1);
  }

  console.log('✅ Variables d\'environnement OK');

  // Créer le client Supabase
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  try {
    // Test 1: Vérifier la connexion
    console.log('🔍 Test de connexion à la base de données...');
    const { data, error } = await supabase.from('contact_submissions').select('count');
    
    if (error) {
      console.error('❌ Erreur de connexion:', error.message);
      return;
    }

    console.log('✅ Connexion à la base de données OK');

    // Test 2: Insérer une donnée de test
    console.log('📝 Test d\'insertion...');
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'Message de test depuis le script',
      project_type: 'web',
      phone: '+33123456789',
      company: 'Test Company',
      status: 'new'
    };

    const { data: insertData, error: insertError } = await supabase
      .from('contact_submissions')
      .insert([testData])
      .select()
      .single();

    if (insertError) {
      console.error('❌ Erreur d\'insertion:', insertError.message);
      return;
    }

    console.log('✅ Insertion réussie, ID:', insertData.id);

    // Test 3: Lire les données
    console.log('📖 Test de lecture...');
    const { data: readData, error: readError } = await supabase
      .from('contact_submissions')
      .select('*')
      .eq('id', insertData.id)
      .single();

    if (readError) {
      console.error('❌ Erreur de lecture:', readError.message);
      return;
    }

    console.log('✅ Lecture réussie:', {
      id: readData.id,
      name: readData.name,
      email: readData.email,
      created_at: readData.created_at
    });

    // Test 4: Nettoyer (supprimer la donnée de test)
    console.log('🧹 Nettoyage...');
    const { error: deleteError } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', insertData.id);

    if (deleteError) {
      console.error('⚠️  Avertissement - Impossible de supprimer la donnée de test:', deleteError.message);
      console.log('Vous pouvez la supprimer manuellement avec l\'ID:', insertData.id);
    } else {
      console.log('✅ Nettoyage terminé');
    }

    console.log('\n🎉 Tous les tests sont passés ! Supabase est correctement configuré.');

  } catch (error) {
    console.error('❌ Erreur inattendue:', error.message);
  }
}

// Exécuter les tests
testSupabaseConnection().catch(console.error);
