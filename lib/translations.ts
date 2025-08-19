export type Language = 'fr' | 'en' | 'he';

export const translations = {
  fr: {
    nav: {
      home: 'Accueil',
      services: 'Services',
      portfolio: 'Clients',
      about: 'À propos',
      contact: 'Contact',
      getQuote: 'Demander un devis',
    },
    hero: {
      title: 'Développement d\'Applications',
      subtitle: 'Mobile, Desktop & Web',
      description: 'Nous créons des applications innovantes et performantes pour faire grandir votre entreprise dans le monde numérique.',
      cta: 'Démarrer votre projet',
      learnMore: 'En savoir plus',
    },
    services: {
      title: 'Nos Services',
      subtitle: 'Des solutions complètes pour tous vos besoins numériques',
      mobile: {
        title: 'Applications Mobiles',
        description: 'Applications natives et cross-platform pour iOS et Android avec les dernières technologies.',
      },
      desktop: {
        title: 'Applications Desktop',
        description: 'Logiciels performants pour Windows, macOS et Linux adaptés à vos besoins métier.',
      },
      web: {
        title: 'Applications Web',
        description: 'Sites web et applications web modernes, responsives et optimisés pour le SEO.',
      },
      consulting: {
        title: 'Consulting',
        description: 'Conseils d\'experts pour optimiser votre stratégie digitale et vos processus.',
      },
    },
    features: {
      title: 'Pourquoi nous choisir ?',
      quality: {
        title: 'Qualité Premium',
        description: 'Code propre, maintenable et conforme aux meilleures pratiques de l\'industrie.',
      },
      speed: {
        title: 'Livraison Rapide',
        description: 'Méthodologie agile pour des livraisons rapides et régulières.',
      },
      support: {
        title: 'Support 24/7',
        description: 'Assistance continue pour garantir le bon fonctionnement de vos applications.',
      },
      innovation: {
        title: 'Innovation',
        description: 'Technologies de pointe pour des solutions modernes et évolutives.',
      },
    },
    clients: {
      title: 'Nos Clients',
      subtitle: 'Ils nous font confiance pour leurs projets digitaux',
      trustSection: {
        title: 'Une expertise reconnue',
        description: 'Depuis notre création, nous avons eu le privilège d\'accompagner des entreprises de différents secteurs dans leur transformation digitale. Chaque projet est unique et nous nous adaptons aux besoins spécifiques de nos clients pour livrer des solutions sur mesure qui dépassent leurs attentes.',
        stats: {
          clients: 'Clients satisfaits',
          projects: 'Projets réalisés',
          satisfaction: 'Satisfaction client',
        },
      },
    },
    contact: {
      title: 'Contactez-nous',
      subtitle: 'Discutons de votre projet',
      form: {
        name: 'Nom complet',
        email: 'Email',
        phone: 'Téléphone',
        company: 'Entreprise',
        projectType: 'Type de projet',
        message: 'Message',
        send: 'Envoyer',
        sending: 'Envoi en cours...',
        success: 'Message envoyé avec succès !',
        error: 'Erreur lors de l\'envoi. Veuillez réessayer.',
      },
      projectTypes: {
        mobile: 'Application Mobile',
        desktop: 'Application Desktop',
        web: 'Application Web',
        consulting: 'Consulting',
        other: 'Autre',
      },
    },
    about: {
      title: 'À propos de YAPIO',
      subtitle: 'Votre partenaire technologique de confiance',
      story: {
        title: 'Notre Histoire',
        content: 'YAPIO a été fondée avec la vision de démocratiser l\'accès aux technologies de pointe pour les entreprises de toutes tailles. Depuis nos débuts, nous nous sommes spécialisés dans le développement d\'applications innovantes qui transforment les idées en solutions digitales concrètes.',
      },
      mission: {
        title: 'Notre Mission',
        content: 'Nous accompagnons nos clients dans leur transformation digitale en créant des applications mobiles, desktop et web sur mesure. Notre objectif est de fournir des solutions technologiques qui stimulent la croissance et l\'efficacité de votre entreprise.',
      },
      values: {
        title: 'Nos Valeurs',
        innovation: {
          title: 'Innovation',
          description: 'Nous restons à la pointe des dernières technologies pour offrir des solutions modernes et évolutives.',
        },
        quality: {
          title: 'Qualité',
          description: 'Chaque ligne de code est écrite avec soin, suivant les meilleures pratiques de l\'industrie.',
        },
        collaboration: {
          title: 'Collaboration',
          description: 'Nous travaillons en étroite collaboration avec nos clients pour comprendre leurs besoins spécifiques.',
        },
        reliability: {
          title: 'Fiabilité',
          description: 'Nous nous engageons à livrer des projets dans les délais convenus avec un support continu.',
        },
      },
      team: {
        title: 'Notre Équipe',
        description: 'Une équipe passionnée de développeurs, designers et consultants techniques dédiés à votre succès.',
      },
    },
    privacyPolicy: {
      title: 'Politique de Confidentialité',
      lastUpdated: 'Dernière mise à jour',
      sections: {
        introduction: {
          title: 'Introduction',
          content: 'Chez YAPIO, nous nous engageons à protéger votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations personnelles.',
        },
        dataCollection: {
          title: 'Collecte des Données',
          content: 'Nous collectons les informations que vous nous fournissez directement, telles que votre nom, adresse e-mail, numéro de téléphone et détails de votre entreprise lorsque vous nous contactez ou demandez un devis.',
          types: {
            title: 'Types de données collectées :',
            items: [
              'Informations de contact (nom, e-mail, téléphone)',
              'Informations sur l\'entreprise',
              'Détails du projet et besoins spécifiques',
              'Données de navigation sur notre site web',
            ],
          },
        },
        dataUsage: {
          title: 'Utilisation des Données',
          content: 'Nous utilisons vos informations pour :',
          items: [
            'Répondre à vos demandes de renseignements',
            'Fournir nos services de développement',
            'Améliorer notre site web et nos services',
            'Vous tenir informé de nos nouveaux services (avec votre consentement)',
          ],
        },
        dataProtection: {
          title: 'Protection des Données',
          content: 'Nous mettons en place des mesures de sécurité appropriées pour protéger vos informations personnelles contre l\'accès non autorisé, la modification, la divulgation ou la destruction.',
        },
        dataSharing: {
          title: 'Partage des Données',
          content: 'Nous ne vendons, n\'échangeons ni ne louons vos informations personnelles à des tiers. Nous pouvons partager vos informations uniquement dans les cas suivants :',
          items: [
            'Avec votre consentement explicite',
            'Pour se conformer à une obligation légale',
            'Pour protéger nos droits et notre sécurité',
          ],
        },
        cookies: {
          title: 'Cookies',
          content: 'Notre site web utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela pourrait affecter certaines fonctionnalités du site.',
        },
        rights: {
          title: 'Vos Droits',
          content: 'Vous avez le droit de :',
          items: [
            'Accéder à vos données personnelles',
            'Corriger ou mettre à jour vos informations',
            'Demander la suppression de vos données',
            'Vous opposer au traitement de vos données',
            'Demander la portabilité de vos données',
          ],
        },
        contact: {
          title: 'Contact',
          content: 'Pour toute question concernant cette politique de confidentialité, veuillez nous contacter à l\'adresse e-mail fournie sur notre page de contact.',
        },
      },
    },
    termsOfService: {
      title: 'Conditions d\'Utilisation',
      lastUpdated: 'Dernière mise à jour',
      sections: {
        acceptance: {
          title: 'Acceptation des Conditions',
          content: 'En accédant et en utilisant le site web de YAPIO, vous acceptez d\'être lié par ces conditions d\'utilisation. Si vous n\'acceptez pas ces conditions, veuillez ne pas utiliser notre site.',
        },
        services: {
          title: 'Description des Services',
          content: 'YAPIO fournit des services de développement d\'applications mobiles, desktop et web, ainsi que des services de consulting technique. Nos services sont décrits en détail sur notre site web.',
        },
        intellectualProperty: {
          title: 'Propriété Intellectuelle',
          content: 'Tout le contenu de ce site web, y compris les textes, images, logos et code source, est la propriété de YAPIO et est protégé par les lois sur la propriété intellectuelle.',
          items: [
            'Vous ne pouvez pas reproduire, distribuer ou modifier notre contenu sans autorisation écrite',
            'Les marques de commerce mentionnées appartiennent à leurs propriétaires respectifs',
            'Le code source développé pour vos projets vous appartient selon les termes de nos contrats',
          ],
        },
        userResponsibilities: {
          title: 'Responsabilités de l\'Utilisateur',
          content: 'En utilisant notre site, vous vous engagez à :',
          items: [
            'Fournir des informations exactes et à jour',
            'Ne pas utiliser le site à des fins illégales ou non autorisées',
            'Respecter les droits de propriété intellectuelle',
            'Ne pas tenter de compromettre la sécurité du site',
          ],
        },
        projectTerms: {
          title: 'Conditions de Projet',
          content: 'Pour les projets de développement :',
          items: [
            'Les conditions spécifiques sont définies dans des contrats séparés',
            'Les délais sont estimatifs et peuvent varier selon la complexité',
            'Les modifications de portée peuvent affecter les délais et coûts',
            'Le support et la maintenance sont définis contractuellement',
          ],
        },
        liability: {
          title: 'Limitation de Responsabilité',
          content: 'YAPIO ne peut être tenu responsable des dommages indirects, consécutifs ou accessoires résultant de l\'utilisation de nos services ou de notre site web, dans les limites autorisées par la loi.',
        },
        privacy: {
          title: 'Confidentialité',
          content: 'L\'utilisation de vos informations personnelles est régie par notre Politique de Confidentialité, qui fait partie intégrante de ces conditions.',
        },
        modifications: {
          title: 'Modifications',
          content: 'Nous nous réservons le droit de modifier ces conditions d\'utilisation à tout moment. Les modifications seront publiées sur cette page avec la date de mise à jour.',
        },
        termination: {
          title: 'Résiliation',
          content: 'Nous pouvons suspendre ou résilier votre accès à notre site en cas de violation de ces conditions d\'utilisation.',
        },
        governing: {
          title: 'Droit Applicable',
          content: 'Ces conditions sont régies par les lois en vigueur et tout litige sera soumis aux tribunaux compétents de notre juridiction.',
        },
        contact: {
          title: 'Contact',
          content: 'Pour toute question concernant ces conditions d\'utilisation, veuillez nous contacter via notre page de contact.',
        },
      },
    },
    footer: {
      rights: 'Tous droits réservés',
      privacy: 'Politique de confidentialité',
      terms: 'Conditions d\'utilisation',
    },
  },
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      portfolio: 'Clients',
      about: 'About',
      contact: 'Contact',
      getQuote: 'Get a Quote',
    },
    hero: {
      title: 'Application Development',
      subtitle: 'Mobile, Desktop & Web',
      description: 'We create innovative and high-performance applications to grow your business in the digital world.',
      cta: 'Start Your Project',
      learnMore: 'Learn More',
    },
    services: {
      title: 'Our Services',
      subtitle: 'Complete solutions for all your digital needs',
      mobile: {
        title: 'Mobile Applications',
        description: 'Native and cross-platform applications for iOS and Android with the latest technologies.',
      },
      desktop: {
        title: 'Desktop Applications',
        description: 'High-performance software for Windows, macOS and Linux tailored to your business needs.',
      },
      web: {
        title: 'Web Applications',
        description: 'Modern, responsive and SEO-optimized websites and web applications.',
      },
      consulting: {
        title: 'Consulting',
        description: 'Expert advice to optimize your digital strategy and processes.',
      },
    },
    features: {
      title: 'Why Choose Us?',
      quality: {
        title: 'Premium Quality',
        description: 'Clean, maintainable code that follows industry best practices.',
      },
      speed: {
        title: 'Fast Delivery',
        description: 'Agile methodology for fast and regular deliveries.',
      },
      support: {
        title: '24/7 Support',
        description: 'Continuous assistance to ensure the smooth operation of your applications.',
      },
      innovation: {
        title: 'Innovation',
        description: 'Cutting-edge technologies for modern and scalable solutions.',
      },
    },
    clients: {
      title: 'Our Clients',
      subtitle: 'They trust us for their digital projects',
      trustSection: {
        title: 'Recognized expertise',
        description: 'Since our inception, we have had the privilege of supporting companies from different sectors in their digital transformation. Each project is unique and we adapt to the specific needs of our clients to deliver tailor-made solutions that exceed their expectations.',
        stats: {
          clients: 'Satisfied clients',
          projects: 'Completed projects',
          satisfaction: 'Client satisfaction',
        },
      },
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Let\'s discuss your project',
      form: {
        name: 'Full Name',
        email: 'Email',
        phone: 'Phone',
        company: 'Company',
        projectType: 'Project Type',
        message: 'Message',
        send: 'Send',
        sending: 'Sending...',
        success: 'Message sent successfully!',
        error: 'Error sending message. Please try again.',
      },
      projectTypes: {
        mobile: 'Mobile Application',
        desktop: 'Desktop Application',
        web: 'Web Application',
        consulting: 'Consulting',
        other: 'Other',
      },
    },
    about: {
      title: 'About YAPIO',
      subtitle: 'Your trusted technology partner',
      story: {
        title: 'Our Story',
        content: 'YAPIO was founded with the vision of democratizing access to cutting-edge technologies for businesses of all sizes. Since our beginnings, we have specialized in developing innovative applications that transform ideas into concrete digital solutions.',
      },
      mission: {
        title: 'Our Mission',
        content: 'We support our clients in their digital transformation by creating custom mobile, desktop and web applications. Our goal is to provide technological solutions that drive the growth and efficiency of your business.',
      },
      values: {
        title: 'Our Values',
        innovation: {
          title: 'Innovation',
          description: 'We stay at the forefront of the latest technologies to offer modern and scalable solutions.',
        },
        quality: {
          title: 'Quality',
          description: 'Every line of code is written with care, following industry best practices.',
        },
        collaboration: {
          title: 'Collaboration',
          description: 'We work closely with our clients to understand their specific needs.',
        },
        reliability: {
          title: 'Reliability',
          description: 'We are committed to delivering projects on agreed deadlines with continuous support.',
        },
      },
      team: {
        title: 'Our Team',
        description: 'A passionate team of developers, designers and technical consultants dedicated to your success.',
      },
    },
    privacyPolicy: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated',
      sections: {
        introduction: {
          title: 'Introduction',
          content: 'At YAPIO, we are committed to protecting your privacy. This privacy policy explains how we collect, use and protect your personal information.',
        },
        dataCollection: {
          title: 'Data Collection',
          content: 'We collect information that you provide to us directly, such as your name, email address, phone number and company details when you contact us or request a quote.',
          types: {
            title: 'Types of data collected:',
            items: [
              'Contact information (name, email, phone)',
              'Company information',
              'Project details and specific needs',
              'Website browsing data',
            ],
          },
        },
        dataUsage: {
          title: 'Data Usage',
          content: 'We use your information to:',
          items: [
            'Respond to your inquiries',
            'Provide our development services',
            'Improve our website and services',
            'Keep you informed about our new services (with your consent)',
          ],
        },
        dataProtection: {
          title: 'Data Protection',
          content: 'We implement appropriate security measures to protect your personal information against unauthorized access, modification, disclosure or destruction.',
        },
        dataSharing: {
          title: 'Data Sharing',
          content: 'We do not sell, trade or rent your personal information to third parties. We may share your information only in the following cases:',
          items: [
            'With your explicit consent',
            'To comply with a legal obligation',
            'To protect our rights and security',
          ],
        },
        cookies: {
          title: 'Cookies',
          content: 'Our website uses cookies to improve your browsing experience. You can configure your browser to refuse cookies, but this may affect some website features.',
        },
        rights: {
          title: 'Your Rights',
          content: 'You have the right to:',
          items: [
            'Access your personal data',
            'Correct or update your information',
            'Request deletion of your data',
            'Object to the processing of your data',
            'Request portability of your data',
          ],
        },
        contact: {
          title: 'Contact',
          content: 'For any questions regarding this privacy policy, please contact us at the email address provided on our contact page.',
        },
      },
    },
    termsOfService: {
      title: 'Terms of Service',
      lastUpdated: 'Last updated',
      sections: {
        acceptance: {
          title: 'Acceptance of Terms',
          content: 'By accessing and using the YAPIO website, you agree to be bound by these terms of service. If you do not accept these terms, please do not use our site.',
        },
        services: {
          title: 'Service Description',
          content: 'YAPIO provides mobile, desktop and web application development services, as well as technical consulting services. Our services are described in detail on our website.',
        },
        intellectualProperty: {
          title: 'Intellectual Property',
          content: 'All content on this website, including text, images, logos and source code, is the property of YAPIO and is protected by intellectual property laws.',
          items: [
            'You may not reproduce, distribute or modify our content without written permission',
            'Mentioned trademarks belong to their respective owners',
            'Source code developed for your projects belongs to you according to the terms of our contracts',
          ],
        },
        userResponsibilities: {
          title: 'User Responsibilities',
          content: 'By using our site, you agree to:',
          items: [
            'Provide accurate and up-to-date information',
            'Not use the site for illegal or unauthorized purposes',
            'Respect intellectual property rights',
            'Not attempt to compromise site security',
          ],
        },
        projectTerms: {
          title: 'Project Terms',
          content: 'For development projects:',
          items: [
            'Specific conditions are defined in separate contracts',
            'Deadlines are estimates and may vary depending on complexity',
            'Scope changes may affect deadlines and costs',
            'Support and maintenance are defined contractually',
          ],
        },
        liability: {
          title: 'Limitation of Liability',
          content: 'YAPIO cannot be held responsible for indirect, consequential or incidental damages resulting from the use of our services or our website, within the limits permitted by law.',
        },
        privacy: {
          title: 'Privacy',
          content: 'The use of your personal information is governed by our Privacy Policy, which is an integral part of these terms.',
        },
        modifications: {
          title: 'Modifications',
          content: 'We reserve the right to modify these terms of service at any time. Changes will be posted on this page with the update date.',
        },
        termination: {
          title: 'Termination',
          content: 'We may suspend or terminate your access to our site in case of violation of these terms of service.',
        },
        governing: {
          title: 'Governing Law',
          content: 'These terms are governed by applicable laws and any dispute will be subject to the competent courts of our jurisdiction.',
        },
        contact: {
          title: 'Contact',
          content: 'For any questions regarding these terms of service, please contact us via our contact page.',
        },
      },
    },
    footer: {
      rights: 'All rights reserved',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
    },
  },
  he: {
    nav: {
      home: 'בית',
      services: 'שירותים',
      portfolio: 'לקוחות',
      about: 'אודות',
      contact: 'צור קשר',
      getQuote: 'קבל הצעת מחיר',
    },
    hero: {
      title: 'פיתוח אפליקציות',
      subtitle: 'מובייל, דסקטופ ואינטרנט',
      description: 'אנו יוצרים אפליקציות חדשניות ומתקדמות כדי להצמיח את העסק שלך בעולם הדיגיטלי.',
      cta: 'התחל את הפרויקט שלך',
      learnMore: 'למד עוד',
    },
    services: {
      title: 'השירותים שלנו',
      subtitle: 'פתרונות מלאים לכל הצרכים הדיגיטליים שלך',
      mobile: {
        title: 'אפליקציות מובייל',
        description: 'אפליקציות מקוריות וחוצות פלטפורמות ל-iOS ו-Android עם הטכנולוגיות החדישות ביותר.',
      },
      desktop: {
        title: 'אפליקציות דסקטופ',
        description: 'תוכנות בעלות ביצועים גבוהים ל-Windows, macOS ו-Linux המותאמות לצרכי העסק שלך.',
      },
      web: {
        title: 'אפליקציות אינטרנט',
        description: 'אתרים ואפליקציות אינטרנט מודרניים, רספונסיביים ומותאמים ל-SEO.',
      },
      consulting: {
        title: 'ייעוץ',
        description: 'ייעוץ מומחים לאופטימיזציה של האסטרטגיה הדיגיטלית והתהליכים שלך.',
      },
    },
    features: {
      title: 'למה לבחור בנו?',
      quality: {
        title: 'איכות פרימיום',
        description: 'קוד נקי וניתן לתחזוקה העומד בסטנדרטים הגבוהים ביותר בתעשייה.',
      },
      speed: {
        title: 'אספקה מהירה',
        description: 'מתודולוגיה זריזה לאספקות מהירות וסדירות.',
      },
      support: {
        title: 'תמיכה 24/7',
        description: 'סיוע מתמשך להבטחת פעולה חלקה של האפליקציות שלך.',
      },
      innovation: {
        title: 'חדשנות',
        description: 'טכנולוגיות חדישות לפתרונות מודרניים וניתנים להרחבה.',
      },
    },
    clients: {
      title: 'הלקוחות שלנו',
      subtitle: 'הם בוטחים בנו עבור הפרויקטים הדיגיטליים שלהם',
      trustSection: {
        title: 'מומחיות מוכרת',
        description: 'מאז הקמתנו, זכינו ללוות חברות מתחומים שונים בטרנספורמציה הדיגיטלית שלהם. כל פרויקט הוא ייחודי ואנחנו מתאימים לצרכים הספציפיים של הלקוחות שלנו כדי לספק פתרונות מותאמים אישית שעולים על הציפיות שלהם.',
        stats: {
          clients: 'לקוחות מרוצים',
          projects: 'פרויקטים שהושלמו',
          satisfaction: 'שביעות רצון לקוחות',
        },
      },
    },
    contact: {
      title: 'צור קשר',
      subtitle: 'בוא נדבר על הפרויקט שלך',
      form: {
        name: 'שם מלא',
        email: 'אימייל',
        phone: 'טלפון',
        company: 'חברה',
        projectType: 'סוג פרויקט',
        message: 'הודעה',
        send: 'שלח',
        sending: 'שולח...',
        success: 'ההודעה נשלחה בהצלחה!',
        error: 'שגיאה בשליחת ההודעה. אנא נסה שוב.',
      },
      projectTypes: {
        mobile: 'אפליקציית מובייל',
        desktop: 'אפליקציית דסקטופ',
        web: 'אפליקציית אינטרנט',
        consulting: 'ייעוץ',
        other: 'אחר',
      },
    },
    about: {
      title: 'אודות YAPIO',
      subtitle: 'השותף הטכנולוגי המהימן שלך',
      story: {
        title: 'הסיפור שלנו',
        content: 'YAPIO נוסדה עם החזון לדמוקרטיזציה של הגישה לטכנולוגיות מתקדמות לעסקים בכל הגדלים. מאז התחלתנו, התמחינו בפיתוח אפליקציות חדשניות שהופכות רעיונות לפתרונות דיגיטליים קונקרטיים.',
      },
      mission: {
        title: 'המשימה שלנו',
        content: 'אנו תומכים בלקוחותינו בטרנספורמציה הדיגיטלית שלהם על ידי יצירת אפליקציות מובייל, דסקטופ ואינטרנט מותאמות אישית. המטרה שלנו היא לספק פתרונות טכנולוגיים שמניעים את הצמיחה והיעילות של העסק שלך.',
      },
      values: {
        title: 'הערכים שלנו',
        innovation: {
          title: 'חדשנות',
          description: 'אנו נשארים בחזית הטכנולוגיות החדישות ביותר כדי להציע פתרונות מודרניים וניתנים להרחבה.',
        },
        quality: {
          title: 'איכות',
          description: 'כל שורת קוד נכתבת בקפידה, בעקבות השיטות הטובות ביותר בתעשייה.',
        },
        collaboration: {
          title: 'שיתוף פעולה',
          description: 'אנו עובדים בשיתוף פעולה הדוק עם הלקוחות שלנו כדי להבין את הצרכים הספציפיים שלהם.',
        },
        reliability: {
          title: 'אמינות',
          description: 'אנו מתחייבים לספק פרויקטים בלוחות הזמנים המוסכמים עם תמיכה מתמשכת.',
        },
      },
      team: {
        title: 'הצוות שלנו',
        description: 'צוות נלהב של מפתחים, מעצבים ויועצים טכניים המוקדשים להצלחתך.',
      },
    },
    privacyPolicy: {
      title: 'מדיניות פרטיות',
      lastUpdated: 'עדכון אחרון',
      sections: {
        introduction: {
          title: 'הקדמה',
          content: 'ב-YAPIO, אנו מתחייבים להגן על הפרטיות שלך. מדיניות פרטיות זו מסבירה כיצד אנו אוספים, משתמשים ומגנים על המידע האישי שלך.',
        },
        dataCollection: {
          title: 'איסוף נתונים',
          content: 'אנו אוספים מידע שאתה מספק לנו ישירות, כגון השם, כתובת האימייל, מספר הטלפון ופרטי החברה שלך כשאתה יוצר איתנו קשר או מבקש הצעת מחיר.',
          types: {
            title: 'סוגי נתונים שנאספים:',
            items: [
              'מידע ליצירת קשר (שם, אימייל, טלפון)',
              'מידע על החברה',
              'פרטי הפרויקט וצרכים ספציפיים',
              'נתוני גלישה באתר',
            ],
          },
        },
        dataUsage: {
          title: 'שימוש בנתונים',
          content: 'אנו משתמשים במידע שלך כדי:',
          items: [
            'להגיב לפניותיך',
            'לספק את שירותי הפיתוח שלנו',
            'לשפר את האתר והשירותים שלנו',
            'להעדכן אותך על השירותים החדשים שלנו (בהסכמתך)',
          ],
        },
        dataProtection: {
          title: 'הגנה על נתונים',
          content: 'אנו מיישמים אמצעי אבטחה מתאימים כדי להגן על המידע האישי שלך מפני גישה לא מורשית, שינוי, חשיפה או הרס.',
        },
        dataSharing: {
          title: 'שיתוף נתונים',
          content: 'אנו לא מוכרים, מחליפים או משכירים את המידע האישי שלך לצדדים שלישיים. אנו עשויים לשתף את המידע שלך רק במקרים הבאים:',
          items: [
            'בהסכמתך המפורשת',
            'כדי לעמוד בחובה חוקית',
            'כדי להגן על הזכויות והביטחון שלנו',
          ],
        },
        cookies: {
          title: 'עוגיות',
          content: 'האתר שלנו משתמש בעוגיות כדי לשפר את חוויית הגלישה שלך. אתה יכול להגדיר את הדפדפן שלך לדחות עוגיות, אך זה עלול להשפיע על חלק מהתכונות של האתר.',
        },
        rights: {
          title: 'הזכויות שלך',
          content: 'יש לך זכות ל:',
          items: [
            'גישה לנתונים האישיים שלך',
            'תיקון או עדכון המידע שלך',
            'בקשת מחיקת הנתונים שלך',
            'התנגדות לעיבוד הנתונים שלך',
            'בקשת ניידות הנתונים שלך',
          ],
        },
        contact: {
          title: 'יצירת קשר',
          content: 'לכל שאלה בנוגע למדיניות פרטיות זו, אנא צור איתנו קשר בכתובת האימייל המופיעה בעמוד יצירת הקשר שלנו.',
        },
      },
    },
    termsOfService: {
      title: 'תנאי שימוש',
      lastUpdated: 'עדכון אחרון',
      sections: {
        acceptance: {
          title: 'קבלת התנאים',
          content: 'על ידי גישה ושימוש באתר YAPIO, אתה מסכים להיות מחויב לתנאי שימוש אלה. אם אינך מקבל תנאים אלה, אנא אל תשתמש באתר שלנו.',
        },
        services: {
          title: 'תיאור השירותים',
          content: 'YAPIO מספקת שירותי פיתוח אפליקציות מובייל, דסקטופ ואינטרנט, כמו גם שירותי ייעוץ טכני. השירותים שלנו מתוארים בפירוט באתר שלנו.',
        },
        intellectualProperty: {
          title: 'קניין רוחני',
          content: 'כל התוכן באתר זה, כולל טקסטים, תמונות, לוגואים וקוד מקור, הוא קניינה של YAPIO ומוגן על ידי חוקי קניין רוחני.',
          items: [
            'אינך רשאי לשכפל, להפיץ או לשנות את התוכן שלנו ללא רשות בכתב',
            'הסימנים המסחריים המוזכרים שייכים לבעליהם בהתאמה',
            'קוד המקור שפותח עבור הפרויקטים שלך שייך לך בהתאם לתנאי החוזים שלנו',
          ],
        },
        userResponsibilities: {
          title: 'אחריות המשתמש',
          content: 'בשימוש באתר שלנו, אתה מתחייב ל:',
          items: [
            'לספק מידע מדויק ועדכני',
            'לא להשתמש באתר למטרות בלתי חוקיות או לא מורשות',
            'לכבד זכויות קניין רוחני',
            'לא לנסות לפגוע בביטחון האתר',
          ],
        },
        projectTerms: {
          title: 'תנאי פרויקט',
          content: 'עבור פרויקטי פיתוח:',
          items: [
            'תנאים ספציפיים מוגדרים בחוזים נפרדים',
            'לוחות זמנים הם הערכות ועשויים להשתנות בהתאם למורכבות',
            'שינויים בהיקף עלולים להשפיע על לוחות זמנים ועלויות',
            'תמיכה ותחזוקה מוגדרות חוזית',
          ],
        },
        liability: {
          title: 'הגבלת אחריות',
          content: 'YAPIO לא יכולה להיות אחראית לנזקים עקיפים, תוצאתיים או נלווים הנובעים משימוש בשירותים שלנו או באתר שלנו, בגבולות המותרים על ידי החוק.',
        },
        privacy: {
          title: 'פרטיות',
          content: 'השימוש במידע האישי שלך נשלט על ידי מדיניות הפרטיות שלנו, שהיא חלק בלתי נפרד מתנאים אלה.',
        },
        modifications: {
          title: 'שינויים',
          content: 'אנו שומרים לעצמנו את הזכות לשנות את תנאי השימוש האלה בכל עת. שינויים יפורסמו בעמוד זה עם תאריך העדכון.',
        },
        termination: {
          title: 'סיום',
          content: 'אנו עשויים להשעות או לסיים את הגישה שלך לאתר שלנו במקרה של הפרה של תנאי השימוש האלה.',
        },
        governing: {
          title: 'חוק חל',
          content: 'תנאים אלה נשלטים על ידי החוקים החלים וכל מחלוקת תהיה נתונה לבתי המשפט המוסמכים של השיפוט שלנו.',
        },
        contact: {
          title: 'יצירת קשר',
          content: 'לכל שאלה בנוגע לתנאי השימוש האלה, אנא צור איתנו קשר דרך עמוד יצירת הקשר שלנו.',
        },
      },
    },
    footer: {
      rights: 'כל הזכויות שמורות',
      privacy: 'מדיניות פרטיות',
      terms: 'תנאי שימוש',
    },
  },
};
