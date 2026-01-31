export type Language = 'fr' | 'en' | 'he';

export const translations = {
  fr: {
    nav: {
      home: 'Accueil',
      services: 'Services',
      portfolio: 'Projets',
      about: 'À propos',
      contact: 'Contact',
      getQuote: 'Demander un devis',
    },
    hero: {
      title: 'Services Numériques sur Mesure',
      subtitle: 'Applications • IA • Logiciels',
      description: 'Nous transformons vos idées en solutions digitales performantes : applications mobiles et web, intégration d\'intelligence artificielle et développement de logiciels personnalisés.',
      cta: 'Démarrer votre projet',
      learnMore: 'En savoir plus',
      secondaryCta: 'Voir nos services',
      studio: 'Studio produit & ingénierie',
      eyebrow: 'Design. Développement. Livraison.',
      pills: {
        deadlines: 'Délais clairs',
        maintainable: 'Code maintenable',
        support: 'Support réactif',
      },
      offer: {
        kicker: 'Ce que vous obtenez',
        title: 'Une exécution premium.',
        description: 'Un process simple, une communication nette, et une livraison propre.',
        items: [
          'Design UI moderne et épuré',
          'Développement performant (Web & Mobile)',
          'SEO + tracking + bonnes pratiques',
        ],
      },
      metrics: [
        { k: '8+', v: 'années d’expérience' },
        { k: '20+', v: 'clients servis' },
        { k: '10+', v: 'projets livrés' },
        { k: '100%', v: 'implication' },
      ],
    },
    services: {
      title: 'Nos Services',
      subtitle: 'Des solutions digitales innovantes pour propulser votre entreprise',
      badge: 'Ce que nous faisons',
      learnMore: 'En savoir plus',
      mobile: {
        title: 'Applications Mobiles',
        description: 'Développement d\'applications natives et cross-platform pour iOS et Android, alliant performance et expérience utilisateur exceptionnelle.',
      },
      desktop: {
        title: 'Applications Web',
        description: 'Création de sites web et applications web modernes, responsives, sécurisées et optimisées pour vos besoins métier.',
      },
      web: {
        title: 'Intégration IA',
        description: 'Intégration de l\'intelligence artificielle dans vos processus : chatbots, analyse de données, automatisation et machine learning.',
      },
      consulting: {
        title: 'Logiciels Sur Mesure',
        description: 'Développement de solutions logicielles personnalisées adaptées à vos besoins spécifiques et à votre secteur d\'activité.',
      },
    },
    features: {
      title: 'Pourquoi nous choisir ?',
      badge: 'Nos avantages',
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
      title: 'Nos Projets',
      subtitle: 'Découvrez nos réalisations et projets digitaux',
      viewMore: 'Voir',
      capturesLabel: 'Captures d\'écran',
      trustSection: {
        title: 'Une expertise reconnue',
        description: 'Depuis notre création, nous avons eu le privilège d\'accompagner des entreprises de différents secteurs dans leur transformation digitale. Chaque projet est unique et nous nous adaptons aux besoins spécifiques de nos clients pour livrer des solutions sur mesure qui dépassent leurs attentes.',
        stats: {
          clients: 'Clients satisfaits',
          projects: 'Projets réalisés',
          satisfaction: 'Satisfaction client',
        },
      },
      projects: {
        chabbataim: 'Applications web et mobile pour un restaurant en ligne',
        olimService: 'Services d\'accompagnement et conciergerie administrative',
        aerilux: 'Solutions d\'éloignement de pigeons',
        dtai: 'Expertise en intelligence artificielle dans la transcription et traduction',
        havrouta: 'Plateforme éducative moderne et interactive',
        securityBear: 'Solutions de surveillance et caméras de sécurité',
        kolot: 'Site de recherche intelligente d\'enregistrement vocaux de prières toraniques',
        ozLeisrael: 'Site de présentation du programme Oz Leisrael',
        i24TvChannel: 'Solution de transcription et traduction en temps réel avec affichage des sous-titres pour la chaîne i24news',
      },
    },
    projects: {
      backToPortfolio: 'Retour au portfolio',
      year: 'Année',
      category: 'Catégorie',
      technologies: 'Technologies utilisées',
      gallery: 'Galerie',
      desktopVersion: 'Version Desktop',
      mobileVersion: 'Version Mobile',
      noImages: 'Visuels à venir prochainement',
      exploreOtherProjects: 'Découvrez nos autres projets',
      exploreDescription: 'Explorez notre portfolio et découvrez nos réalisations',
      viewProject: 'Voir le projet',
      viewAllProjects: 'Voir tous nos projets',
      interestedTitle: 'Intéressé par un projet similaire ?',
      interestedDescription: 'Contactez-nous pour discuter de votre projet et découvrir comment nous pouvons vous aider.',
      contactUs: 'Nous contacter',
      closeLightbox: 'Appuyez sur Échap ou cliquez à l\'extérieur pour fermer',
      lightboxMobile: 'Mobile',
      lightboxDesktop: 'Desktop',
    },
    contact: {
      title: 'Contactez-nous',
      subtitle: 'Discutons de votre projet',
      badge: 'Parlons de votre projet',
      infoTitle: 'Informations de contact',
      infoLabels: {
        Email: 'Email',
        WhatsApp: 'WhatsApp',
        Location: 'Localisation',
      },
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
        selectPlaceholder: '---',
      },
      projectTypes: {
        mobile: 'Application Mobile',
        desktop: 'Application Web',
        web: 'Intégration IA',
        consulting: 'Logiciel Sur Mesure',
        other: 'Autre',
      },
    },
    about: {
      title: 'À propos de YAPIO',
      subtitle: 'Votre partenaire technologique de confiance',
      badge: 'Qui sommes-nous',
      story: {
        title: 'Notre Histoire',
        content: 'YAPIO a été fondée avec la vision de démocratiser l\'accès aux technologies de pointe pour les entreprises de toutes tailles. Depuis nos débuts, nous nous sommes spécialisés dans la création de solutions numériques innovantes qui transforment les idées en réalité digitale.',
      },
      mission: {
        title: 'Notre Mission',
        content: 'Nous accompagnons nos clients dans leur transformation digitale en créant des applications mobiles, des sites web performants, en intégrant l\'intelligence artificielle et en développant des logiciels sur mesure. Notre objectif est de fournir des solutions technologiques qui stimulent la croissance et l\'efficacité de votre entreprise.',
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
      cta: 'Travaillons ensemble',
      stats: {
        clients: 'Clients satisfaits',
        projects: 'Projets réalisés',
        experience: 'Années d\'expérience',
        passion: 'Passion',
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
          content: 'YAPIO fournit des services de développement d\'applications mobiles et web, d\'intégration d\'intelligence artificielle et de création de logiciels sur mesure. Nos services sont décrits en détail sur notre site web.',
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
      portfolio: 'Projects',
      about: 'About',
      contact: 'Contact',
      getQuote: 'Get a Quote',
    },
    hero: {
      title: 'Custom Digital Services',
      subtitle: 'Apps • AI • Software',
      description: 'We transform your ideas into high-performing digital solutions: mobile and web applications, artificial intelligence integration, and custom software development.',
      cta: 'Start Your Project',
      learnMore: 'Learn More',
      secondaryCta: 'View services',
      studio: 'Product studio & engineering',
      eyebrow: 'Design. Development. Delivery.',
      pills: {
        deadlines: 'Clear timelines',
        maintainable: 'Maintainable code',
        support: 'Responsive support',
      },
      offer: {
        kicker: 'What you get',
        title: 'Premium execution.',
        description: 'A simple process, clear communication, and clean delivery.',
        items: [
          'Modern, clean UI design',
          'High-performance development (Web & Mobile)',
          'SEO + tracking + best practices',
        ],
      },
      metrics: [
        { k: '8+', v: 'years of experience' },
        { k: '20+', v: 'clients served' },
        { k: '10+', v: 'projects delivered' },
        { k: '100%', v: 'commitment' },
      ],
    },
    services: {
      title: 'Our Services',
      subtitle: 'Innovative digital solutions to propel your business',
      badge: 'What we do',
      learnMore: 'Learn more',
      mobile: {
        title: 'Mobile Applications',
        description: 'Development of native and cross-platform applications for iOS and Android, combining performance with exceptional user experience.',
      },
      desktop: {
        title: 'Web Applications',
        description: 'Creation of modern, responsive, secure websites and web applications optimized for your business needs.',
      },
      web: {
        title: 'AI Integration',
        description: 'Integration of artificial intelligence into your processes: chatbots, data analysis, automation, and machine learning.',
      },
      consulting: {
        title: 'Custom Software',
        description: 'Development of personalized software solutions tailored to your specific needs and industry sector.',
      },
    },
    features: {
      title: 'Why Choose Us?',
      badge: 'Our advantages',
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
      title: 'Our Projects',
      subtitle: 'Discover our digital achievements and projects',
      viewMore: 'View',
      capturesLabel: 'Screenshots',
      trustSection: {
        title: 'Recognized expertise',
        description: 'Since our inception, we have had the privilege of supporting companies from different sectors in their digital transformation. Each project is unique and we adapt to the specific needs of our clients to deliver tailor-made solutions that exceed their expectations.',
        stats: {
          clients: 'Satisfied clients',
          projects: 'Completed projects',
          satisfaction: 'Client satisfaction',
        },
      },
      projects: {
        chabbataim: 'Web and mobile applications for an online restaurant',
        olimService: 'Support services and administrative concierge',
        aerilux: 'Pigeon deterrent solutions',
        dtai: 'Artificial intelligence expertise in transcription and translation',
        havrouta: 'Modern and interactive educational platform',
        securityBear: 'Surveillance solutions and security cameras',
        kolot: 'Intelligent search site for Torah prayer voice recordings',
        ozLeisrael: 'Presentation site for the Oz Leisrael program',
        i24TvChannel: 'Real-time transcription and translation solution with subtitle display for i24news channel',
      },
    },
    projects: {
      backToPortfolio: 'Back to portfolio',
      year: 'Year',
      category: 'Category',
      technologies: 'Technologies used',
      gallery: 'Gallery',
      desktopVersion: 'Desktop Version',
      mobileVersion: 'Mobile Version',
      noImages: 'Visuals coming soon',
      exploreOtherProjects: 'Explore our other projects',
      exploreDescription: 'Explore our portfolio and discover our work',
      viewProject: 'View project',
      viewAllProjects: 'View all our projects',
      interestedTitle: 'Interested in a similar project?',
      interestedDescription: 'Contact us to discuss your project and discover how we can help you.',
      contactUs: 'Contact us',
      closeLightbox: 'Press Esc or click outside to close',
      lightboxMobile: 'Mobile',
      lightboxDesktop: 'Desktop',
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Let\'s discuss your project',
      badge: 'Let\'s talk about your project',
      infoTitle: 'Contact information',
      infoLabels: {
        Email: 'Email',
        WhatsApp: 'WhatsApp',
        Location: 'Location',
      },
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
        selectPlaceholder: '---',
      },
      projectTypes: {
        mobile: 'Mobile Application',
        desktop: 'Web Application',
        web: 'AI Integration',
        consulting: 'Custom Software',
        other: 'Other',
      },
    },
    about: {
      title: 'About YAPIO',
      subtitle: 'Your trusted technology partner',
      badge: 'Who we are',
      story: {
        title: 'Our Story',
        content: 'YAPIO was founded with the vision of democratizing access to cutting-edge technologies for businesses of all sizes. Since our beginnings, we have specialized in creating innovative digital solutions that transform ideas into digital reality.',
      },
      mission: {
        title: 'Our Mission',
        content: 'We support our clients in their digital transformation by creating mobile applications, high-performance websites, integrating artificial intelligence, and developing custom software. Our goal is to provide technological solutions that drive the growth and efficiency of your business.',
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
      cta: 'Let\'s Work Together',
      stats: {
        clients: 'Satisfied clients',
        projects: 'Completed projects',
        experience: 'Years of experience',
        passion: 'Passion',
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
          content: 'YAPIO provides mobile and web application development services, artificial intelligence integration, and custom software creation. Our services are described in detail on our website.',
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
      portfolio: 'פרויקטים',
      about: 'אודות',
      contact: 'צור קשר',
      getQuote: 'קבל הצעת מחיר',
    },
    hero: {
      title: 'שירותים דיגיטליים מותאמים אישית',
      subtitle: 'אפליקציות • בינה מלאכותית • תוכנות',
      description: 'אנו הופכים את הרעיונות שלך לפתרונות דיגיטליים מתקדמים: אפליקציות מובייל ואינטרנט, שילוב בינה מלאכותית ופיתוח תוכנות מותאמות אישית.',
      cta: 'התחל את הפרויקט שלך',
      learnMore: 'למד עוד',
      secondaryCta: 'צפה בשירותים',
      studio: 'סטודיו מוצר והנדסה',
      eyebrow: 'עיצוב. פיתוח. מסירה.',
      pills: {
        deadlines: 'לוחות זמנים ברורים',
        maintainable: 'קוד ניתן לתחזוקה',
        support: 'תמיכה מהירה',
      },
      offer: {
        kicker: 'מה תקבלו',
        title: 'ביצוע פרימיום.',
        description: 'תהליך פשוט, תקשורת ברורה, ומסירה נקייה.',
        items: [
          'עיצוב UI מודרני ונקי',
          'פיתוח ביצועים גבוהים (ווב ומובייל)',
          'SEO + מעקב + שיטות עבודה מומלצות',
        ],
      },
      metrics: [
        { k: '8+', v: 'שנות ניסיון' },
        { k: '20+', v: 'לקוחות' },
        { k: '10+', v: 'פרויקטים שנמסרו' },
        { k: '100%', v: 'מחויבות' },
      ],
    },
    services: {
      title: 'השירותים שלנו',
      subtitle: 'פתרונות דיגיטליים חדשניים להצמחת העסק שלך',
      badge: 'מה אנחנו עושים',
      learnMore: 'למד עוד',
      mobile: {
        title: 'אפליקציות מובייל',
        description: 'פיתוח אפליקציות מקוריות וחוצות פלטפורמות ל-iOS ו-Android, המשלבות ביצועים עם חוויית משתמש יוצאת דופן.',
      },
      desktop: {
        title: 'אפליקציות אינטרנט',
        description: 'יצירת אתרים ואפליקציות אינטרנט מודרניים, רספונסיביים, מאובטחים ומותאמים לצרכי העסק שלך.',
      },
      web: {
        title: 'שילוב בינה מלאכותית',
        description: 'שילוב בינה מלאכותית בתהליכים שלך: צ\'אטבוטים, ניתוח נתונים, אוטומציה ולמידת מכונה.',
      },
      consulting: {
        title: 'תוכנות מותאמות אישית',
        description: 'פיתוח פתרונות תוכנה מותאמים אישית לצרכים הספציפיים שלך ולענף התעשייה שלך.',
      },
    },
    features: {
      title: 'למה לבחור בנו?',
      badge: 'היתרונות שלנו',
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
      title: 'הפרויקטים שלנו',
      subtitle: 'גלה את ההישגים והפרויקטים הדיגיטליים שלנו',
      viewMore: 'ראה',
      capturesLabel: 'צילומי מסך',
      trustSection: {
        title: 'מומחיות מוכרת',
        description: 'מאז הקמתנו, זכינו ללוות חברות מתחומים שונים בטרנספורמציה הדיגיטלית שלהם. כל פרויקט הוא ייחודי ואנחנו מתאימים לצרכים הספציפיים של הלקוחות שלנו כדי לספק פתרונות מותאמים אישית שעולים על הציפיות שלהם.',
        stats: {
          clients: 'לקוחות מרוצים',
          projects: 'פרויקטים שהושלמו',
          satisfaction: 'שביעות רצון לקוחות',
        },
      },
      projects: {
        chabbataim: 'אפליקציות אינטרנט ומובייל למסעדה מקוונת',
        olimService: 'שירותי ליווי וקונסיירז\' אדמיניסטרטיבי',
        aerilux: 'פתרונות להרחקת יונים',
        dtai: 'מומחיות בבינה מלאכותית בתחום תמלול ותרגום',
        havrouta: 'פלטפורמה חינוכית מודרנית ואינטראקטיבית',
        securityBear: 'פתרונות מעקב ומצלמות אבטחה',
        kolot: 'אתר חיפוש חכם של הקלטות קוליות של תפילות תורניות',
        ozLeisrael: 'אתר הצגה של תוכנית עוז לישראל',
        i24TvChannel: 'פתרון תמלול ותרגום בזמן אמת עם הצגת כתוביות לערוץ i24news',
      },
    },
    projects: {
      backToPortfolio: 'חזרה לתיק העבודות',
      year: 'שנה',
      category: 'קטגוריה',
      technologies: 'טכנולוגיות בשימוש',
      gallery: 'גלריה',
      desktopVersion: 'גרסת דסקטופ',
      mobileVersion: 'גרסת מובייל',
      noImages: 'תמונות יגיעו בקרוב',
      exploreOtherProjects: 'גלה את הפרויקטים האחרים שלנו',
      exploreDescription: 'חקור את תיק העבודות שלנו וגלה את ההישגים שלנו',
      viewProject: 'צפה בפרויקט',
      viewAllProjects: 'צפה בכל הפרויקטים שלנו',
      interestedTitle: 'מעוניין בפרויקט דומה?',
      interestedDescription: 'צור איתנו קשר כדי לדון על הפרויקט שלך ולגלות כיצד נוכל לעזור לך.',
      contactUs: 'צור קשר',
      closeLightbox: 'לחץ Esc או לחץ מחוץ לסגירה',
      lightboxMobile: 'מובייל',
      lightboxDesktop: 'דסקטופ',
    },
    contact: {
      title: 'צור קשר',
      subtitle: 'בוא נדבר על הפרויקט שלך',
      badge: 'בוא נדבר על הפרויקט שלך',
      infoTitle: 'פרטי קשר',
      infoLabels: {
        Email: 'אימייל',
        WhatsApp: 'וואטסאפ',
        Location: 'מיקום',
      },
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
        selectPlaceholder: '---',
      },
      projectTypes: {
        mobile: 'אפליקציית מובייל',
        desktop: 'אפליקציית אינטרנט',
        web: 'שילוב בינה מלאכותית',
        consulting: 'תוכנה מותאמת אישית',
        other: 'אחר',
      },
    },
    about: {
      title: 'אודות YAPIO',
      subtitle: 'השותף הטכנולוגי המהימן שלך',
      badge: 'מי אנחנו',
      story: {
        title: 'הסיפור שלנו',
        content: 'YAPIO נוסדה עם החזון לדמוקרטיזציה של הגישה לטכנולוגיות מתקדמות לעסקים בכל הגדלים. מאז התחלתנו, התמחינו ביצירת פתרונות דיגיטליים חדשניים שהופכים רעיונות למציאות דיגיטלית.',
      },
      mission: {
        title: 'המשימה שלנו',
        content: 'אנו תומכים בלקוחותינו בטרנספורמציה הדיגיטלית שלהם על ידי יצירת אפליקציות מובייל, אתרי אינטרנט מתקדמים, שילוב בינה מלאכותית ופיתוח תוכנות מותאמות אישית. המטרה שלנו היא לספק פתרונות טכנולוגיים שמניעים את הצמיחה והיעילות של העסק שלך.',
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
      cta: 'בוא נעבוד ביחד',
      stats: {
        clients: 'לקוחות מרוצים',
        projects: 'פרויקטים שהושלמו',
        experience: 'שנות ניסיון',
        passion: 'תשוקה',
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
          content: 'YAPIO מספקת שירותי פיתוח אפליקציות מובייל ואינטרנט, שילוב בינה מלאכותית ויצירת תוכנות מותאמות אישית. השירותים שלנו מתוארים בפירוט באתר שלנו.',
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
