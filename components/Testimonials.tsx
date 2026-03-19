'use client';

import React from 'react';
import { Users, Calendar, ThumbsUp, ShieldCheck, Clock, Share, Rocket, Zap, Gem, Star } from 'lucide-react';
import { TestimonialStack, Testimonial } from '@/components/ui/glass-testimonial-swiper';
import { useLanguage } from '@/contexts/LanguageContext';

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    initials: 'DC',
    name: 'David Cohen',
    role: 'CTO chez TechStart Tel Aviv',
    quote: {
      he: "יאפיו שינה את הדרך שבה אנחנו עובדים. הגישה המתודית שלהם והמומחיות הטכנית אפשרו לנו לספק את האפליקציה הניידת שלנו לפני הזמן. הצוות מגיב ותמיד קשוב לצרכים שלנו.",
      en: "Yapio transformed how we work. Their methodical approach and technical expertise allowed us to deliver our mobile app ahead of schedule. The team is responsive and always attentive to our needs.",
      fr: "Yapio a transformé notre façon de travailler. Leur approche méthodique et leur expertise technique nous ont permis de livrer notre application mobile en avance sur les délais. L'équipe est réactive et toujours à l'écoute de nos besoins.",
    },
    originalLanguage: 'he',
    tags: [{ text: 'À LA UNE', type: 'featured' }, { text: 'Entreprise', type: 'default' }],
    stats: [{ icon: Users, text: 'Équipe de 50+' }, { icon: Calendar, text: 'Client depuis 2 ans' }],
    avatarGradient: 'linear-gradient(135deg, #5e6ad2, #8b5cf6)',
  },
  {
    id: 2,
    initials: 'SL',
    name: 'Sarah Levi',
    role: 'Fondatrice de DataFlow Israel',
    quote: {
      he: "אינטגרציה של AI בפלטפורמה שלנו הייתה שינוי משחק אמיתי. יאפיו הצליחו להבין את האתגרים העסקיים שלנו ולהציע פתרונות חדשניים שעולים על הציפיות שלנו. המומחיות שלהם בלמידת מכונה מרשימה.",
      en: "The AI integration in our platform was a real game-changer. Yapio understood our business challenges and proposed innovative solutions that exceeded our expectations. Their machine learning expertise is remarkable.",
      fr: "L'intégration de l'IA dans notre plateforme a été un véritable game-changer. Yapio a su comprendre nos enjeux métier et proposer des solutions innovantes qui dépassent nos attentes. Leur expertise en machine learning est remarquable.",
    },
    originalLanguage: 'he',
    tags: [{ text: 'Startup', type: 'default' }, { text: 'IA', type: 'default' }],
    stats: [{ icon: ThumbsUp, text: 'Excellent' }, { icon: ShieldCheck, text: 'Vérifié' }],
    avatarGradient: 'linear-gradient(135deg, #10b981, #059669)',
  },
  {
    id: 3,
    initials: 'RM',
    name: 'Ronen Mizrahi',
    role: 'CTO chez CloudSync Israel',
    quote: {
      he: "ביצועים יוצאי דופן וקוד באיכות ללא דופי. האפליקציה שפותחה על ידי יאפיו מטפלת באלפי משתמשים בו-זמנית ללא שום בעיה. הארכיטקטורה הסקלבילית שלהם מרשימה.",
      en: "Exceptional performance and flawless code quality. The application developed by Yapio handles thousands of simultaneous users without any problem. Their scalable architecture is impressive.",
      fr: "Performance exceptionnelle et code de qualité irréprochable. L'application développée par Yapio gère des milliers d'utilisateurs simultanés sans aucun problème. Leur architecture scalable est impressionnante.",
    },
    originalLanguage: 'he',
    tags: [{ text: 'Entreprise', type: 'default' }, { text: 'API', type: 'default' }],
    stats: [{ icon: Clock, text: 'Il y a 6 mois' }, { icon: Share, text: 'Partagé 12 fois' }],
    avatarGradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
  },
  {
    id: 4,
    initials: 'TB',
    name: 'Tomer Ben-David',
    role: 'CEO de GrowthLab Tel Aviv',
    quote: {
      he: "כסטארט-אפ, היינו צריכים מהירות ויעילות. יאפיו אפשרו לנו להשיק את ה-MVP שלנו בזמן שיא תוך שמירה על איכות מקצועית. הליווי שלהם מעבר לציפיות שלנו.",
      en: "As a startup, we needed speed and efficiency. Yapio allowed us to launch our MVP in record time while maintaining professional quality. Their support exceeded our expectations.",
      fr: "En tant que startup, nous avions besoin de rapidité et d'efficacité. Yapio nous a permis de lancer notre MVP en un temps record tout en maintenant une qualité professionnelle. Leur accompagnement est au-delà de nos attentes.",
    },
    originalLanguage: 'he',
    tags: [{ text: 'Nouveau', type: 'default' }, { text: 'Croissance', type: 'featured' }],
    stats: [{ icon: Rocket, text: 'Scalé 3x' }, { icon: Zap, text: 'Déploiement rapide' }],
    avatarGradient: 'linear-gradient(135deg, #ec4899, #d946ef)',
  },
  {
    id: 5,
    initials: 'NS',
    name: 'Noa Shalom',
    role: 'Chef de Projet Digital chez DesignCo Tel Aviv',
    quote: {
      he: "ממשק המשתמש שנוצר על ידי יאפיו הוא אלגנטי ואינטואיטיבי כאחד. צוות העיצוב שלנו התרשם מהקשב שלהם לפרטים וההבנה שלהם של אתגרי UX. תענוג אמיתי לעבוד איתם.",
      en: "The user interface created by Yapio is both elegant and intuitive. Our design team was impressed by their attention to detail and understanding of UX challenges. A real pleasure to collaborate with them.",
      fr: "L'interface utilisateur créée par Yapio est à la fois élégante et intuitive. Notre équipe design a été impressionnée par leur sens du détail et leur compréhension des enjeux UX. Un vrai plaisir de collaborer avec eux.",
    },
    originalLanguage: 'he',
    tags: [{ text: 'Design', type: 'default' }, { text: 'UX/UI', type: 'default' }],
    stats: [{ icon: Gem, text: 'Top UX/UI' }, { icon: Star, text: '5 étoiles' }],
    avatarGradient: 'linear-gradient(135deg, #3b82f6, #6366f1)',
  },
  {
    id: 6,
    initials: 'YG',
    name: 'Yaron Goldstein',
    role: 'Directeur Innovation chez TechCorp Israel',
    quote: {
      he: "יאפיו הצליחו להפוך את החזון שלנו למציאות דיגיטלית. המומחיות הטכנית שלהם בשילוב עם הגישה העסקית שלהם אפשרו לנו לייעל את התהליכים הפנימיים שלנו. שותף אמין לפרויקטים האסטרטגיים שלנו.",
      en: "Yapio managed to turn our vision into digital reality. Their technical expertise combined with their business approach allowed us to optimize our internal processes. A trusted partner for our strategic projects.",
      fr: "Yapio a su transformer notre vision en réalité digitale. Leur expertise technique combinée à leur approche business nous a permis d'optimiser nos processus internes. Un partenaire de confiance pour nos projets stratégiques.",
    },
    originalLanguage: 'he',
    tags: [{ text: 'Enterprise', type: 'default' }, { text: 'Innovation', type: 'featured' }],
    stats: [{ icon: Users, text: '500+ utilisateurs' }, { icon: Calendar, text: 'Client depuis 3 ans' }],
    avatarGradient: 'linear-gradient(135deg, #8b5cf6, #a855f7)',
  },
  {
    id: 7,
    initials: 'MA',
    name: 'Maya Avraham',
    role: 'VP Engineering chez InnovTech Israel',
    quote: {
      en: "Working with Yapio has been an exceptional experience. Their team's deep understanding of both Israeli and international markets helped us create a product that resonates globally. The quality of their work is outstanding.",
      fr: "Travailler avec Yapio a été une expérience exceptionnelle. La compréhension approfondie de leur équipe des marchés israéliens et internationaux nous a aidés à créer un produit qui résonne mondialement. La qualité de leur travail est remarquable.",
      he: "עבודה עם יאפיו הייתה חוויה יוצאת דופן. ההבנה העמוקה של הצוות שלהם של השווקים הישראליים והבינלאומיים עזרה לנו ליצור מוצר שמהדהד בעולם. איכות העבודה שלהם יוצאת דופן.",
    },
    originalLanguage: 'en',
    tags: [{ text: 'International', type: 'featured' }, { text: 'Enterprise', type: 'default' }],
    stats: [{ icon: Users, text: '200+ utilisateurs' }, { icon: Calendar, text: 'Client depuis 1 an' }],
    avatarGradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
  },
  {
    id: 8,
    initials: 'ED',
    name: 'Eyal Dahan',
    role: 'Fondateur de SecureFlow',
    quote: {
      fr: "Yapio a développé une solution de sécurité robuste pour notre plateforme. Leur expertise en cybersécurité et leur approche méthodique nous ont permis de renforcer considérablement notre infrastructure. Un partenaire de confiance.",
      en: "Yapio developed a robust security solution for our platform. Their cybersecurity expertise and methodical approach allowed us to significantly strengthen our infrastructure. A trusted partner.",
      he: "יאפיו פיתחו פתרון אבטחה חזק לפלטפורמה שלנו. המומחיות שלהם באבטחת סייבר והגישה המתודית שלהם אפשרו לנו לחזק משמעותית את התשתית שלנו. שותף אמין.",
    },
    originalLanguage: 'fr',
    tags: [{ text: 'Sécurité', type: 'featured' }, { text: 'Cybersécurité', type: 'default' }],
    stats: [{ icon: ShieldCheck, text: 'Sécurisé' }, { icon: ThumbsUp, text: 'Recommandé' }],
    avatarGradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
  },
];

export default function Testimonials() {
  const { t } = useLanguage();
  
  return (
    <section id="testimonials" className="relative min-h-[800px] py-20 md:py-28 overflow-hidden flex items-center">
      {/* Background violet du même style que le hero */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Base gradient identique au hero */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-[#050510] to-[#050508]" />
        
        {/* Orbes de lumière violet (même style que le hero) */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute left-1/2 top-1/4 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#7737E9]/[0.08] blur-[140px]" />
          <div className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-[#7737E9]/[0.06] blur-[120px]" />
          <div className="absolute top-1/2 left-1/4 h-[400px] w-[400px] rounded-full bg-[#7737E9]/[0.07] blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-[#5E1FD4]/[0.05] blur-[100px]" />
          <div className="absolute top-1/3 right-1/3 h-[450px] w-[450px] rounded-full bg-[#8b5cf6]/[0.06] blur-[130px]" />
        </div>

        {/* Gradient de transition en bas */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050508] to-transparent" />
      </div>

      {/* Contenu */}
      <div className="max-w-7xl mx-auto section-padding relative z-10 w-full">
        <div className="text-center mb-12 md:mb-16">
          {t.testimonials?.badge && (
            <p className="text-sm font-medium text-primary mb-6">{t.testimonials.badge}</p>
          )}
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">
            {t.testimonials?.title || 'Ce que disent nos clients'}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t.testimonials?.subtitle || 'Découvrez les expériences de nos partenaires qui nous font confiance pour leurs projets digitaux'}
          </p>
        </div>

        <div className="relative w-full max-w-4xl mx-auto min-h-[500px] flex items-center justify-center">
          <TestimonialStack testimonials={testimonialsData} visibleBehind={2} />
        </div>
      </div>
    </section>
  );
}
