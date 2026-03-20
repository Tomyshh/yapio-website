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
    role: {
      fr: 'CTO chez TechStart Tel Aviv',
      en: 'CTO at TechStart Tel Aviv',
      he: 'סמנכ"ל טכנולוגיה ב-TechStart תל אביב',
    },
    quote: {
      he: "יאפיו שינה את הדרך שבה אנחנו עובדים. הגישה המתודית שלהם והמומחיות הטכנית אפשרו לנו לספק את האפליקציה הניידת שלנו לפני הזמן. הצוות מגיב ותמיד קשוב לצרכים שלנו.",
      en: "Yapio transformed how we work. Their methodical approach and technical expertise allowed us to deliver our mobile app ahead of schedule. The team is responsive and always attentive to our needs.",
      fr: "Yapio a transformé notre façon de travailler. Leur approche méthodique et leur expertise technique nous ont permis de livrer notre application mobile en avance sur les délais. L'équipe est réactive et toujours à l'écoute de nos besoins.",
    },
    originalLanguage: 'he',
    tags: [
      { text: { fr: 'À la une', en: 'Featured', he: 'בכותרות' }, type: 'featured' },
      { text: { fr: 'Entreprise', en: 'Enterprise', he: 'ארגון' }, type: 'default' },
    ],
    stats: [
      { icon: Users, text: { fr: 'Équipe 50+', en: 'Team of 50+', he: 'צוות של 50+' } },
      { icon: Calendar, text: { fr: 'Client depuis 2 ans', en: 'Client for 2 years', he: 'לקוח כבר שנתיים' } },
    ],
    avatarGradient: 'linear-gradient(135deg, #5e6ad2, #8b5cf6)',
  },
  {
    id: 2,
    initials: 'SL',
    name: 'Sarah Levi',
    role: {
      fr: 'Fondatrice de DataFlow Israel',
      en: 'Founder of DataFlow Israel',
      he: 'מייסדת DataFlow ישראל',
    },
    quote: {
      he: "אינטגרציה של AI בפלטפורמה שלנו הייתה שינוי משחק אמיתי. יאפיו הצליחו להבין את האתגרים העסקיים שלנו ולהציע פתרונות חדשניים שעולים על הציפיות שלנו. המומחיות שלהם בלמידת מכונה מרשימה.",
      en: "The AI integration in our platform was a real game-changer. Yapio understood our business challenges and proposed innovative solutions that exceeded our expectations. Their machine learning expertise is remarkable.",
      fr: "L'intégration de l'IA dans notre plateforme a été un véritable game-changer. Yapio a su comprendre nos enjeux métier et proposer des solutions innovantes qui dépassent nos attentes. Leur expertise en machine learning est remarquable.",
    },
    originalLanguage: 'he',
    tags: [
      { text: { fr: 'Startup', en: 'Startup', he: 'סטארטאפ' }, type: 'default' },
      { text: { fr: 'IA', en: 'AI', he: 'בינה מלאכותית' }, type: 'default' },
    ],
    stats: [
      { icon: ThumbsUp, text: { fr: 'Excellent', en: 'Excellent', he: 'מצוין' } },
      { icon: ShieldCheck, text: { fr: 'Vérifié', en: 'Verified', he: 'מאומת' } },
    ],
    avatarGradient: 'linear-gradient(135deg, #10b981, #059669)',
  },
  {
    id: 3,
    initials: 'RM',
    name: 'Ronen Mizrahi',
    role: {
      fr: 'CTO chez CloudSync Israel',
      en: 'CTO at CloudSync Israel',
      he: 'סמנכ"ל טכנולוגיה ב-CloudSync ישראל',
    },
    quote: {
      he: "ביצועים יוצאי דופן וקוד באיכות ללא דופי. האפליקציה שפותחה על ידי יאפיו מטפלת באלפי משתמשים בו-זמנית ללא שום בעיה. הארכיטקטורה הסקלבילית שלהם מרשימה.",
      en: "Exceptional performance and flawless code quality. The application developed by Yapio handles thousands of simultaneous users without any problem. Their scalable architecture is impressive.",
      fr: "Performance exceptionnelle et code de qualité irréprochable. L'application développée par Yapio gère des milliers d'utilisateurs simultanés sans aucun problème. Leur architecture scalable est impressionnante.",
    },
    originalLanguage: 'he',
    tags: [
      { text: { fr: 'Entreprise', en: 'Enterprise', he: 'ארגון' }, type: 'default' },
      { text: { fr: 'API', en: 'API', he: 'API' }, type: 'default' },
    ],
    stats: [
      { icon: Clock, text: { fr: 'Il y a 6 mois', en: '6 months ago', he: 'לפני 6 חודשים' } },
      { icon: Share, text: { fr: 'Partagé 12 fois', en: 'Shared 12 times', he: 'שותף 12 פעמים' } },
    ],
    avatarGradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
  },
  {
    id: 4,
    initials: 'TB',
    name: 'Tomer Ben-David',
    role: {
      fr: 'CEO de GrowthLab Tel Aviv',
      en: 'CEO of GrowthLab Tel Aviv',
      he: 'מנכ"ל GrowthLab תל אביב',
    },
    quote: {
      he: "כסטארט-אפ, היינו צריכים מהירות ויעילות. יאפיו אפשרו לנו להשיק את ה-MVP שלנו בזמן שיא תוך שמירה על איכות מקצועית. הליווי שלהם מעבר לציפיות שלנו.",
      en: "As a startup, we needed speed and efficiency. Yapio allowed us to launch our MVP in record time while maintaining professional quality. Their support exceeded our expectations.",
      fr: "En tant que startup, nous avions besoin de rapidité et d'efficacité. Yapio nous a permis de lancer notre MVP en un temps record tout en maintenant une qualité professionnelle. Leur accompagnement est au-delà de nos attentes.",
    },
    originalLanguage: 'he',
    tags: [
      { text: { fr: 'Nouveau', en: 'New', he: 'חדש' }, type: 'default' },
      { text: { fr: 'Croissance', en: 'Growth', he: 'צמיחה' }, type: 'featured' },
    ],
    stats: [
      { icon: Rocket, text: { fr: 'Scalé 3x', en: 'Scaled 3x', he: 'הוגדל פי 3' } },
      { icon: Zap, text: { fr: 'Déploiement rapide', en: 'Fast rollout', he: 'פריסה מהירה' } },
    ],
    avatarGradient: 'linear-gradient(135deg, #ec4899, #d946ef)',
  },
  {
    id: 5,
    initials: 'NS',
    name: 'Noa Shalom',
    role: {
      fr: 'Chef de projet digital chez DesignCo Tel Aviv',
      en: 'Digital project lead at DesignCo Tel Aviv',
      he: 'מובילת פרויקטים דיגיטליים ב-DesignCo תל אביב',
    },
    quote: {
      he: "ממשק המשתמש שנוצר על ידי יאפיו הוא אלגנטי ואינטואיטיבי כאחד. צוות העיצוב שלנו התרשם מהקשב שלהם לפרטים וההבנה שלהם של אתגרי UX. תענוג אמיתי לעבוד איתם.",
      en: "The user interface created by Yapio is both elegant and intuitive. Our design team was impressed by their attention to detail and understanding of UX challenges. A real pleasure to collaborate with them.",
      fr: "L'interface utilisateur créée par Yapio est à la fois élégante et intuitive. Notre équipe design a été impressionnée par leur sens du détail et leur compréhension des enjeux UX. Un vrai plaisir de collaborer avec eux.",
    },
    originalLanguage: 'he',
    tags: [
      { text: { fr: 'Design', en: 'Design', he: 'עיצוב' }, type: 'default' },
      { text: { fr: 'UX/UI', en: 'UX/UI', he: 'UX/UI' }, type: 'default' },
    ],
    stats: [
      { icon: Gem, text: { fr: 'Top UX/UI', en: 'Top UX/UI', he: 'מוביל ב-UX/UI' } },
      { icon: Star, text: { fr: '5 étoiles', en: '5 stars', he: '5 כוכבים' } },
    ],
    avatarGradient: 'linear-gradient(135deg, #3b82f6, #6366f1)',
  },
  {
    id: 6,
    initials: 'YG',
    name: 'Yaron Goldstein',
    role: {
      fr: 'Directeur innovation chez TechCorp Israel',
      en: 'Director of Innovation at TechCorp Israel',
      he: 'מנהל חדשנות ב-TechCorp ישראל',
    },
    quote: {
      he: "יאפיו הצליחו להפוך את החזון שלנו למציאות דיגיטלית. המומחיות הטכנית שלהם בשילוב עם הגישה העסקית שלהם אפשרו לנו לייעל את התהליכים הפנימיים שלנו. שותף אמין לפרויקטים האסטרטגיים שלנו.",
      en: "Yapio managed to turn our vision into digital reality. Their technical expertise combined with their business approach allowed us to optimize our internal processes. A trusted partner for our strategic projects.",
      fr: "Yapio a su transformer notre vision en réalité digitale. Leur expertise technique combinée à leur approche business nous a permis d'optimiser nos processus internes. Un partenaire de confiance pour nos projets stratégiques.",
    },
    originalLanguage: 'he',
    tags: [
      { text: { fr: 'Grands comptes', en: 'Enterprise', he: 'ארגונים' }, type: 'default' },
      { text: { fr: 'Innovation', en: 'Innovation', he: 'חדשנות' }, type: 'featured' },
    ],
    stats: [
      { icon: Users, text: { fr: '500+ utilisateurs', en: '500+ users', he: 'מעל 500 משתמשים' } },
      { icon: Calendar, text: { fr: 'Client depuis 3 ans', en: 'Client for 3 years', he: 'לקוח כבר 3 שנים' } },
    ],
    avatarGradient: 'linear-gradient(135deg, #8b5cf6, #a855f7)',
  },
  {
    id: 7,
    initials: 'MA',
    name: 'Maya Avraham',
    role: {
      fr: 'VP Engineering chez InnovTech Israel',
      en: 'VP of Engineering at InnovTech Israel',
      he: 'סמנכ"לית הנדסה ב-InnovTech ישראל',
    },
    quote: {
      en: "Working with Yapio has been an exceptional experience. Their team's deep understanding of both Israeli and international markets helped us create a product that resonates globally. The quality of their work is outstanding.",
      fr: "Travailler avec Yapio a été une expérience exceptionnelle. La compréhension approfondie de leur équipe des marchés israéliens et internationaux nous a aidés à créer un produit qui résonne mondialement. La qualité de leur travail est remarquable.",
      he: "עבודה עם יאפיו הייתה חוויה יוצאת דופן. ההבנה העמוקה של הצוות שלהם של השווקים הישראליים והבינלאומיים עזרה לנו ליצור מוצר שמהדהד בעולם. איכות העבודה שלהם יוצאת דופן.",
    },
    originalLanguage: 'en',
    tags: [
      { text: { fr: 'International', en: 'International', he: 'בינלאומי' }, type: 'featured' },
      { text: { fr: 'Grands comptes', en: 'Enterprise', he: 'ארגונים' }, type: 'default' },
    ],
    stats: [
      { icon: Users, text: { fr: '200+ utilisateurs', en: '200+ users', he: 'מעל 200 משתמשים' } },
      { icon: Calendar, text: { fr: 'Client depuis 1 an', en: 'Client for 1 year', he: 'לקוח שנה' } },
    ],
    avatarGradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
  },
  {
    id: 8,
    initials: 'ED',
    name: 'Eyal Dahan',
    role: {
      fr: 'Fondateur de SecureFlow',
      en: 'Founder of SecureFlow',
      he: 'מייסד SecureFlow',
    },
    quote: {
      fr: "Yapio a développé une solution de sécurité robuste pour notre plateforme. Leur expertise en cybersécurité et leur approche méthodique nous ont permis de renforcer considérablement notre infrastructure. Un partenaire de confiance.",
      en: "Yapio developed a robust security solution for our platform. Their cybersecurity expertise and methodical approach allowed us to significantly strengthen our infrastructure. A trusted partner.",
      he: "יאפיו פיתחו פתרון אבטחה חזק לפלטפורמה שלנו. המומחיות שלהם באבטחת סייבר והגישה המתודית שלהם אפשרו לנו לחזק משמעותית את התשתית שלנו. שותף אמין.",
    },
    originalLanguage: 'fr',
    tags: [
      { text: { fr: 'Sécurité', en: 'Security', he: 'אבטחה' }, type: 'featured' },
      { text: { fr: 'Cybersécurité', en: 'Cybersecurity', he: 'סייבר' }, type: 'default' },
    ],
    stats: [
      { icon: ShieldCheck, text: { fr: 'Sécurisé', en: 'Secure', he: 'מאובטח' } },
      { icon: ThumbsUp, text: { fr: 'Recommandé', en: 'Recommended', he: 'מומלץ' } },
    ],
    avatarGradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
  },
];

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section id="testimonials" className="relative min-h-[800px] py-20 md:py-28 overflow-hidden flex items-center">
      <div className="max-w-7xl mx-auto section-padding relative z-10 w-full">
        <div className="text-center mb-12 md:mb-16">
          {t.testimonials.badge && (
            <p className="text-sm font-medium text-primary mb-6">{t.testimonials.badge}</p>
          )}
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">
            {t.testimonials.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t.testimonials.subtitle}
          </p>
        </div>

        <div className="relative w-full max-w-4xl mx-auto min-h-[500px] flex items-center justify-center">
          <TestimonialStack testimonials={testimonialsData} visibleBehind={2} />
        </div>
      </div>
    </section>
  );
}
