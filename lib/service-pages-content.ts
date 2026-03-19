import type { Language } from '@/lib/translations';

export type ServiceContentKey =
  | 'mobile'
  | 'desktop'
  | 'web'
  | 'consulting'
  | 'website'
  | 'automation';

export type ServicePageStep = { title: string; body: string };
export type ServicePageFaq = { q: string; a: string };
export type ServicePageMetric = { value: string; label: string };

export type ServicePageDetail = {
  labels: {
    deliverablesEyebrow: string;
    processEyebrow: string;
    deepDiveEyebrow: string;
    faqEyebrow: string;
    ctaHeadline: string;
    ctaSub: string;
    metricDisclaimer: string;
  };
  pages: Record<
    ServiceContentKey,
    {
      eyebrow: string;
      lead: string;
      narrative: string;
      deliverablesTitle: string;
      deliverables: string[];
      processTitle: string;
      steps: ServicePageStep[];
      deepDiveTitle: string;
      deepDive: string;
      metrics: ServicePageMetric[];
      faqTitle: string;
      faq: ServicePageFaq[];
      imageAltHero: string;
      imageAltPanel: string;
      imageAltAccent: string;
    }
  >;
};

const fr: ServicePageDetail = {
  labels: {
    deliverablesEyebrow: 'Livrables',
    processEyebrow: 'Méthode',
    deepDiveEyebrow: 'Expertise',
    faqEyebrow: 'FAQ',
    ctaHeadline: 'Un projet en tête ?',
    ctaSub: 'Expliquez-nous votre contexte : nous revenons vers vous avec une proposition claire et un planning réaliste.',
    metricDisclaimer: '* Indicateur cible après analyse de votre contexte.',
  },
  pages: {
    mobile: {
      eyebrow: 'Studio produit mobile',
      lead: 'De l’idée à l’App Store et au Play Store',
      narrative:
        'Chaque application commence par une compréhension fine de vos utilisateurs et de vos objectifs business. Nous prototypons rapidement, validons avec vous, puis développons avec des standards élevés : tests automatisés, performances, accessibilité et conformité aux exigences des stores.',
      deliverablesTitle: 'Ce que nous livrons concrètement',
      deliverables: [
        'Audit UX/UI, parcours utilisateur et architecture technique',
        'Maquettes interactives et design system évolutif',
        'Développement iOS / Android (natif, React Native ou Flutter)',
        'Authentification sécurisée, API, analytics et monitoring',
        'Soumission App Store & Play Store, conformité et mises à jour',
        'Documentation, transfert de compétences et plan de maintenance',
      ],
      processTitle: 'Notre façon de travailler',
      steps: [
        {
          title: 'Découverte & cadrage',
          body: 'Ateliers, personas, parcours critiques et backlog priorisé avec critères d’acceptation.',
        },
        {
          title: 'Design & prototype',
          body: 'Flows détaillés, UI sur mesure et prototype testable avant d’engager le développement.',
        },
        {
          title: 'Développement agile',
          body: 'Sprints courts, démos régulières, revue de code, CI/CD et qualité continue.',
        },
        {
          title: 'Mise en prod & suivi',
          body: 'Publication stores, observabilité, correctifs, évolutions et accompagnement post-lancement.',
        },
      ],
      deepDiveTitle: 'Pourquoi nous faire confiance',
      deepDive:
        'Nous maîtrisons l’écosystème mobile de bout en bout : notifications push, mode hors ligne, sécurité des données personnelles, et intégrations avec vos systèmes existants. Le code livré est structuré pour être maintenu en interne ou par nos équipes, avec une traçabilité claire des décisions techniques.',
      metrics: [
        { value: '8+', label: 'Années d’expérience' },
        { value: '20+', label: 'Clients accompagnés' },
        { value: '100%', label: 'Propriété du code client' },
      ],
      faqTitle: 'Questions fréquentes',
      faq: [
        {
          q: 'Natif ou cross‑platform ?',
          a: 'Nous recommandons selon budget, délais et exigences performance. React Native et Flutter couvrent la majorité des cas ; le natif pour des besoins très spécifiques (graphismes lourds, SDK propriétaires).',
        },
        {
          q: 'Qui possède le code source ?',
          a: 'Le code, les assets et la documentation vous appartiennent selon le contrat. Nous vous livrons le dépôt Git, les accès et les guides d’exploitation.',
        },
        {
          q: 'Quels délais pour un MVP ?',
          a: 'Souvent entre 8 et 16 semaines selon la complexité et les intégrations. Un planning détaillé suit la phase de cadrage et le backlog validé.',
        },
      ],
      imageAltHero: 'Personne utilisant une application sur smartphone',
      imageAltPanel: 'Équipe collaborant sur un projet mobile',
      imageAltAccent: 'Réunion produit autour d’un ordinateur portable',
    },
    desktop: {
      eyebrow: 'Applications web & SaaS',
      lead: 'Produits web sécurisés, scalables et prêts pour la production',
      narrative:
        'Nous construisons des applications web modernes : tableaux de bord, espaces clients, back-offices et SaaS B2B. L’accent est mis sur la sécurité (auth, rôles, audit), les performances perçues et une architecture qui supporte votre croissance sans refonte permanente.',
      deliverablesTitle: 'Périmètre typique d’une livraison',
      deliverables: [
        'Architecture front & back, modèle de données et API REST/GraphQL',
        'Interface responsive, accessibilité et états vides / erreurs',
        'Intégrations : paiement, emailing, webhooks, CRM, ERP',
        'Authentification, permissions fines et journalisation',
        'Environnements staging / prod, déploiement et sauvegardes',
        'Observabilité (logs, alertes) et documentation technique',
      ],
      processTitle: 'Du besoin au run',
      steps: [
        {
          title: 'Spécifications vivantes',
          body: 'User stories, maquettes clés et définition des risques sécurité / conformité.',
        },
        {
          title: 'Itérations livrables',
          body: 'Incréments déployables sur un environnement de recette pour validation continue.',
        },
        {
          title: 'Durcissement & perf',
          body: 'Tests, charge raisonnable, optimisation bundles et bonnes pratiques OWASP.',
        },
        {
          title: 'Go-live & exploitation',
          body: 'Bascule production, monitoring, procédures incident et roadmap évolutions.',
        },
      ],
      deepDiveTitle: 'Ingénierie web au quotidien',
      deepDive:
        'Nous travaillons avec des stacks éprouvées (React, Next.js, Node, bases SQL ou NoSQL selon le cas) et des patterns clairs : séparation des couches, validation des entrées, gestion d’erreurs explicite. L’objectif est un produit stable que vos équipes peuvent faire évoluer sans dette technique incontrôlée.',
      metrics: [
        { value: 'API', label: 'Intégrations maîtrisées' },
        { value: 'SaaS', label: 'Produits livrés' },
        { value: '24/7', label: 'Monitoring possible' },
      ],
      faqTitle: 'Questions fréquentes',
      faq: [
        {
          q: 'Pouvez-vous reprendre un projet existant ?',
          a: 'Oui : audit code et infra, plan de remédiation, puis itérations. Nous privilégions la transparence sur l’état réel du projet.',
        },
        {
          q: 'Hébergement : cloud, on-premise ?',
          a: 'Cloud public (Vercel, AWS, GCP, Azure) ou infrastructure client selon contraintes légales et techniques.',
        },
        {
          q: 'RGPD et données sensibles ?',
          a: 'Nous intégrons les exigences dès la conception : minimisation, chiffrement, registres de traitement et clauses adaptées.',
        },
      ],
      imageAltHero: 'Développeur devant un écran avec du code',
      imageAltPanel: 'Tableau de bord analytique sur ordinateur',
      imageAltAccent: 'Équipe de développement en open space',
    },
    web: {
      eyebrow: 'IA appliquée au métier',
      lead: 'Des cas d’usage mesurables, pas de gadgets',
      narrative:
        'L’IA n’a de valeur que si elle répond à un problème concret : réduire le temps de traitement, améliorer la qualité des réponses ou automatiser des tâches répétitives. Nous définissons des indicateurs avant développement, puis itérons sur des jeux de données représentatifs et des garde-fous humains.',
      deliverablesTitle: 'Types de solutions que nous déployons',
      deliverables: [
        'Assistants et chatbots branchés sur vos bases de connaissances',
        'Extraction, classification et routage de documents',
        'Enrichissement de données et scoring assisté',
        'Orchestration de workflows (humain + machine)',
        'Interfaces de supervision et traçabilité des décisions',
        'Accompagnement change management et formation',
      ],
      processTitle: 'Notre approche IA responsable',
      steps: [
        {
          title: 'Cadrage & données',
          body: 'Définition du périmètre, qualité des sources, conformité et limites du modèle.',
        },
        {
          title: 'Prototype mesuré',
          body: 'POC sur un sous-ensemble avec métriques de précision et temps gagné.',
        },
        {
          title: 'Industrialisation',
          body: 'API, sécurité, quotas, logs et intégration dans vos outils existants.',
        },
        {
          title: 'Amélioration continue',
          body: 'Collecte feedback, réentraînement ou ajustement prompts selon le cas.',
        },
      ],
      deepDiveTitle: 'Technique sans jargon inutile',
      deepDive:
        'Selon vos contraintes nous combinons modèles génératifs, modèles spécialisés ou règles métier classiques. Nous documentons les limites connues, les coûts d’inférence et les procédures de repli si le service IA est indisponible.',
      metrics: [
        { value: 'LLM', label: 'Intégrations' },
        { value: 'RAG', label: 'Bases documentaires' },
        { value: 'KPI', label: 'Suivi des gains' },
      ],
      faqTitle: 'Questions fréquentes',
      faq: [
        {
          q: 'Faut-il beaucoup de données ?',
          a: 'Pas toujours : un bon cadrage et des exemples représentatives suffisent souvent pour un premier service utile. Nous dimensionnons selon votre maturité data.',
        },
        {
          q: 'Où sont hébergées les données ?',
          a: 'Choix d’hébergement UE ou selon vos politiques ; options on-premise ou VPC dédié discutées en amont.',
        },
        {
          q: 'Coûts prévisibles ?',
          a: 'Nous estimons usage tokens / appels API et proposons des plafonds, caches et modèles adaptés au budget.',
        },
      ],
      imageAltHero: 'Représentation abstraite de l’intelligence artificielle',
      imageAltPanel: 'Serveurs et infrastructure data center',
      imageAltAccent: 'Écran affichant des données et graphiques',
    },
    consulting: {
      eyebrow: 'Logiciels métiers & CRM',
      lead: 'Des outils alignés sur vos processus réels',
      narrative:
        'Les logiciels génériques imposent souvent des compromis. Nous concevons des applications sur mesure autour de votre pipeline commercial, de votre production ou de votre relation client : écrans adaptés, règles métier explicites, droits par rôle et reporting qui répond aux questions de direction.',
      deliverablesTitle: 'Ce que couvre un projet type',
      deliverables: [
        'Modélisation des entités, workflows et règles métier',
        'CRM / pipeline, tâches, relances et historique client',
        'Back-office : stocks, facturation, validation, exports',
        'Tableaux de bord et exports comptables / BI',
        'Connecteurs vers outils existants (email, ERP, téléphonie)',
        'Formation équipes et documentation administrateur',
      ],
      processTitle: 'Co-conception avec vos équipes',
      steps: [
        {
          title: 'Immersion terrain',
          body: 'Interviews utilisateurs, cartographie processus et irritants actuels.',
        },
        {
          title: 'Spécification fonctionnelle',
          body: 'Maquettes, règles, matrices de droits et plan de migration données.',
        },
        {
          title: 'Développement & recette',
          body: 'Jeux de test métier, recette utilisateur et corrections avant production.',
        },
        {
          title: 'Déploiement & évolution',
          body: 'Accompagnement au changement, hotline projet et feuille de route produit.',
        },
      ],
      deepDiveTitle: 'ROI et adoption',
      deepDive:
        'Un logiciel sur mesure ne vaut que s’il est adopté. Nous prévoyons des phases pilotes, des droits progressifs et des tableaux de bord simples pour mesurer le gain de temps. La dette est maîtrisée grâce à des modules découplés et une veille sur les évolutions légales ou sectorielles.',
      metrics: [
        { value: 'CRM', label: 'Pipelines livrés' },
        { value: 'ERP', label: 'Connecteurs' },
        { value: '360°', label: 'Vision client' },
      ],
      faqTitle: 'Questions fréquentes',
      faq: [
        {
          q: 'Remplacer Excel ou un outil SaaS ?',
          a: 'Souvent un mix : nous migrons les données critiques et cohabitons temporairement avec l’existant pour limiter le risque.',
        },
        {
          q: 'Évolutivité ?',
          a: 'Architecture modulaire : nouveaux modules, nouveaux rôles ou nouveaux flux sans tout reconstruire.',
        },
        {
          q: 'Maintenance ?',
          a: 'Forfaits adaptés : correctifs, mises à jour sécurité, petites évolutions et support utilisateur.',
        },
      ],
      imageAltHero: 'Équipe en réunion autour d’un projet logiciel',
      imageAltPanel: 'Collaborateurs analysant des données sur écran',
      imageAltAccent: 'Présentation équipe en réunion de travail',
    },
    website: {
      eyebrow: 'Présence web & e‑commerce',
      lead: 'Un site rapide, trouvable et crédible',
      narrative:
        'Votre site est souvent le premier contact avec vos clients. Nous combinons identité visuelle forte, structure de contenu claire, performance (Core Web Vitals) et SEO technique pour que vos pages se positionnent et convertissent. L’e‑commerce inclut parcours d’achat, paiement et gestion catalogue selon vos besoins.',
      deliverablesTitle: 'Prestations incluses ou optionnelles',
      deliverables: [
        'Direction artistique, wireframes et maquettes responsive',
        'Intégration CMS (contenus éditables par vos équipes)',
        'SEO on-page, balisage structuré et analytics',
        'Formulaires, RGPD, cookies et pages légales',
        'E‑commerce : panier, paiement, livraisons, emails transactionnels',
        'Mise en ligne, SSL, sauvegardes et plan de mise à jour',
      ],
      processTitle: 'Lancement sans surprise',
      steps: [
        {
          title: 'Positionnement & arborescence',
          body: 'Messages clés, SEO sémantique et plan de pages validé ensemble.',
        },
        {
          title: 'Design & contenus',
          body: 'Maquettes, photos, textes optimisés et relecture avant intégration.',
        },
        {
          title: 'Développement & tests',
          body: 'Responsive, accessibilité de base, perf et tests navigateurs.',
        },
        {
          title: 'Mise en ligne & formation',
          body: 'Formation CMS, suivi post-lancement et recommandations éditoriales.',
        },
      ],
      deepDiveTitle: 'Performance & confiance',
      deepDive:
        'Nous optimisons images, polices et scripts pour des temps de chargement courts. La sécurité (mises à jour, sauvegardes) est intégrée dès le départ. Pour le e‑commerce, nous sécurisons les flux de paiement et la conformité des données clients.',
      metrics: [
        { value: 'SEO', label: 'Audit & mise en œuvre' },
        { value: 'LCP', label: 'Optimisation perf' },
        { value: 'CMS', label: 'Autonomie contenu' },
      ],
      faqTitle: 'Questions fréquentes',
      faq: [
        {
          q: 'Shopify, WooCommerce ou sur mesure ?',
          a: 'Nous recommandons selon votre catalogue, vos intégrations et votre équipe interne. Sur mesure quand les flux sont très spécifiques.',
        },
        {
          q: 'Qui rédige les textes ?',
          a: 'Nous pouvons structurer et optimiser ; la validation métier reste chez vous. Rédaction complète possible en option.',
        },
        {
          q: 'Après la mise en ligne ?',
          a: 'Forfaits maintenance : mises à jour, petites évolutions, monitoring uptime.',
        },
      ],
      imageAltHero: 'Création de site web et design sur écran',
      imageAltPanel: 'Designer travaillant sur une maquette web',
      imageAltAccent: 'Bureau moderne avec ordinateur et café',
    },
    automation: {
      eyebrow: 'Workflows & intégrations',
      lead: 'Moins de saisie manuelle, plus de fiabilité',
      narrative:
        'L’automatisation relie vos outils : CRM, compta, emails, fichiers, APIs métiers. Nous cartographions les flux, identifions les erreurs humaines récurrentes et mettons en place des pipelines robustes avec journalisation, alertes et reprises sur erreur.',
      deliverablesTitle: 'Exemples de chaînes automatisées',
      deliverables: [
        'Synchronisation bi-directionnelle entre CRM et outils internes',
        'Routage de leads, notifications et tâches créées automatiquement',
        'Extraction de pièces jointes, OCR et classement',
        'Rapports planifiés vers email ou stockage cloud',
        'Webhooks, files d’attente et idempotence',
        'Tableaux de bord de supervision des jobs',
      ],
      processTitle: 'Mise en œuvre maîtrisée',
      steps: [
        {
          title: 'Cartographie & quick wins',
          body: 'Inventaire des systèmes, volumes et premiers gains rapides identifiés.',
        },
        {
          title: 'Design du flux',
          body: 'Schéma des états, gestion erreurs, SLA et données sensibles.',
        },
        {
          title: 'Implémentation',
          body: 'Scripts, connecteurs no-code/low-code ou code selon criticité.',
        },
        {
          title: 'Exploitation',
          body: 'Monitoring, alertes, runbooks et amélioration continue.',
        },
      ],
      deepDiveTitle: 'Fiabilité avant tout',
      deepDive:
        'Une automatisation qui échoue silencieusement est pire que le manuel. Nous prévoyons des logs structurés, des alertes sur échecs, des files d’attente pour absorber les pics et des procédures de rollback. La documentation permet à vos équipes IT de reprendre la main.',
      metrics: [
        { value: 'API', label: 'Connecteurs' },
        { value: '−40%', label: 'Temps admin cible*' },
        { value: 'SLA', label: 'Surveillance' },
      ],
      faqTitle: 'Questions fréquentes',
      faq: [
        {
          q: 'Zapier / Make ou code custom ?',
          a: 'Nous choisissons selon criticité, volume et souveraineté des données. Le code custom pour les flux critiques ou très spécifiques.',
        },
        {
          q: 'Et si un outil change son API ?',
          a: 'Contrats de versionnement, tests de non-régression et veille ; évolutions planifiées dans la maintenance.',
        },
        {
          q: 'Sécurité des accès ?',
          a: 'Principe du moindre privilège, secrets vaultés, rotation des tokens et audit des accès.',
        },
      ],
      imageAltHero: 'Réseau mondial et connectivité numérique',
      imageAltPanel: 'Professionnelle travaillant sur plusieurs écrans',
      imageAltAccent: 'Équipe en collaboration sur un projet tech',
    },
  },
};

const en: ServicePageDetail = {
  labels: {
    deliverablesEyebrow: 'Deliverables',
    processEyebrow: 'How we work',
    deepDiveEyebrow: 'Expertise',
    faqEyebrow: 'FAQ',
    ctaHeadline: 'Ready to start?',
    ctaSub: 'Tell us about your context—we’ll respond with a clear proposal and a realistic timeline.',
    metricDisclaimer: '* Indicative target after assessing your context.',
  },
  pages: {
    mobile: {
      eyebrow: 'Mobile product studio',
      lead: 'From idea to App Store & Play Store',
      narrative:
        'Every app starts with a clear understanding of your users and business goals. We prototype fast, validate with you, then build to a high bar: automated tests, performance, accessibility, and store compliance.',
      deliverablesTitle: 'What we actually ship',
      deliverables: [
        'UX/UI audit, user journeys, and technical architecture',
        'Interactive mockups and an evolvable design system',
        'iOS / Android development (native, React Native, or Flutter)',
        'Secure auth, APIs, analytics, and monitoring',
        'App Store & Play Store submission, compliance, and updates',
        'Documentation, handover, and a maintenance plan',
      ],
      processTitle: 'How we collaborate',
      steps: [
        {
          title: 'Discovery & scope',
          body: 'Workshops, personas, critical paths, and a prioritized backlog with acceptance criteria.',
        },
        {
          title: 'Design & prototype',
          body: 'Detailed flows, bespoke UI, and a testable prototype before heavy engineering.',
        },
        {
          title: 'Agile delivery',
          body: 'Short sprints, regular demos, code review, CI/CD, and continuous quality.',
        },
        {
          title: 'Launch & follow-up',
          body: 'Store releases, observability, fixes, iterations, and post-launch support.',
        },
      ],
      deepDiveTitle: 'Why work with us',
      deepDive:
        'We cover the full mobile stack: push notifications, offline modes, personal data protection, and integrations with your existing systems. Codebases are structured for long-term maintenance—with clear technical decisions documented.',
      metrics: [
        { value: '8+', label: 'Years experience' },
        { value: '20+', label: 'Clients served' },
        { value: '100%', label: 'You own the code' },
      ],
      faqTitle: 'Common questions',
      faq: [
        {
          q: 'Native or cross-platform?',
          a: 'We recommend based on budget, timeline, and performance needs. React Native and Flutter fit most cases; native when requirements are very specific.',
        },
        {
          q: 'Who owns the source code?',
          a: 'You own code, assets, and docs per contract. We hand over the Git repo and operational guides.',
        },
        {
          q: 'Typical MVP timeline?',
          a: 'Often 8–16 weeks depending on scope and integrations. A detailed plan follows discovery.',
        },
      ],
      imageAltHero: 'Person using a mobile app on a smartphone',
      imageAltPanel: 'Team collaborating on a mobile project',
      imageAltAccent: 'Product meeting around a laptop',
    },
    desktop: {
      eyebrow: 'Web apps & SaaS',
      lead: 'Secure, scalable products ready for production',
      narrative:
        'We build modern web applications: dashboards, customer portals, back offices, and B2B SaaS. Focus areas: security (auth, roles, audit), perceived performance, and architecture that grows with you.',
      deliverablesTitle: 'Typical delivery scope',
      deliverables: [
        'Front/back architecture, data model, REST/GraphQL APIs',
        'Responsive UI, accessibility, empty and error states',
        'Integrations: payments, email, webhooks, CRM, ERP',
        'Authentication, fine-grained permissions, and audit logs',
        'Staging/prod environments, deployment, and backups',
        'Observability (logs, alerts) and technical documentation',
      ],
      processTitle: 'From need to run',
      steps: [
        {
          title: 'Living specifications',
          body: 'User stories, key mockups, and security/compliance risk mapping.',
        },
        {
          title: 'Shippable increments',
          body: 'Deployable slices on a staging environment for continuous validation.',
        },
        {
          title: 'Hardening & performance',
          body: 'Tests, sensible load checks, bundle optimization, OWASP-minded practices.',
        },
        {
          title: 'Go-live & operations',
          body: 'Production cutover, monitoring, incident playbooks, and roadmap.',
        },
      ],
      deepDiveTitle: 'Day-to-day engineering',
      deepDive:
        'We use proven stacks (React, Next.js, Node, SQL or NoSQL as appropriate) with clear layering, input validation, and explicit error handling—so your team can evolve the product without runaway technical debt.',
      metrics: [
        { value: 'API', label: 'Integrations' },
        { value: 'SaaS', label: 'Products shipped' },
        { value: '24/7', label: 'Monitoring options' },
      ],
      faqTitle: 'Common questions',
      faq: [
        {
          q: 'Can you take over an existing project?',
          a: 'Yes: code/infra audit, remediation plan, then iterative delivery—with transparency on the real state of the system.',
        },
        {
          q: 'Cloud vs on-prem?',
          a: 'Public cloud (Vercel, AWS, GCP, Azure) or your infrastructure depending on legal/technical constraints.',
        },
        {
          q: 'GDPR & sensitive data?',
          a: 'Privacy by design: minimization, encryption, processing records, and appropriate contractual clauses.',
        },
      ],
      imageAltHero: 'Developer working at a computer with code on screen',
      imageAltPanel: 'Analytics dashboard on a laptop',
      imageAltAccent: 'Development team in an open office',
    },
    web: {
      eyebrow: 'Applied AI',
      lead: 'Measurable use cases—not gimmicks',
      narrative:
        'AI only matters if it solves a real problem: faster processing, better answers, or fewer repetitive tasks. We define KPIs before building, iterate on representative datasets, and keep human guardrails where needed.',
      deliverablesTitle: 'Solutions we deploy',
      deliverables: [
        'Assistants & chatbots grounded on your knowledge base',
        'Document extraction, classification, and routing',
        'Data enrichment and assisted scoring',
        'Workflow orchestration (human + machine)',
        'Supervision UI and decision traceability',
        'Change management and training support',
      ],
      processTitle: 'Responsible AI approach',
      steps: [
        {
          title: 'Scope & data',
          body: 'Problem framing, source quality, compliance, and model boundaries.',
        },
        {
          title: 'Measured prototype',
          body: 'POC on a subset with accuracy and time-saved metrics.',
        },
        {
          title: 'Industrialization',
          body: 'APIs, security, quotas, logs, and integration with existing tools.',
        },
        {
          title: 'Continuous improvement',
          body: 'Feedback loops, retraining or prompt tuning as appropriate.',
        },
      ],
      deepDiveTitle: 'Technical clarity',
      deepDive:
        'Depending on constraints we combine generative models, specialized models, or classic business rules. We document known limits, inference costs, and fallback procedures if the AI path is unavailable.',
      metrics: [
        { value: 'LLM', label: 'Integrations' },
        { value: 'RAG', label: 'Doc bases' },
        { value: 'KPI', label: 'Gain tracking' },
      ],
      faqTitle: 'Common questions',
      faq: [
        {
          q: 'Do we need huge datasets?',
          a: 'Not always: good framing and representative examples often suffice for a first useful service.',
        },
        {
          q: 'Where is data hosted?',
          a: 'EU or per your policies; on-prem or dedicated VPC options discussed upfront.',
        },
        {
          q: 'Predictable costs?',
          a: 'We estimate token/API usage and propose caps, caching, and model choices aligned with budget.',
        },
      ],
      imageAltHero: 'Abstract visualization of artificial intelligence',
      imageAltPanel: 'Servers in a data center environment',
      imageAltAccent: 'Screen showing analytics charts',
    },
    consulting: {
      eyebrow: 'Business software & CRM',
      lead: 'Tools aligned with how you really work',
      narrative:
        'Generic tools force compromises. We design bespoke applications around your sales pipeline, operations, or customer relationship: tailored screens, explicit business rules, role-based permissions, and executive-ready reporting.',
      deliverablesTitle: 'Typical project coverage',
      deliverables: [
        'Entity modeling, workflows, and business rules',
        'CRM / pipeline, tasks, follow-ups, and customer history',
        'Back office: inventory, invoicing, validation, exports',
        'Dashboards and accounting / BI exports',
        'Connectors to existing tools (email, ERP, telephony)',
        'Team training and administrator documentation',
      ],
      processTitle: 'Co-design with your teams',
      steps: [
        {
          title: 'Field immersion',
          body: 'User interviews, process mapping, and pain-point analysis.',
        },
        {
          title: 'Functional specification',
          body: 'Mockups, rules, permission matrices, and data migration plan.',
        },
        {
          title: 'Build & UAT',
          body: 'Business test cases, user acceptance, and pre-production fixes.',
        },
        {
          title: 'Rollout & evolution',
          body: 'Change management, project hotline, and product roadmap.',
        },
      ],
      deepDiveTitle: 'ROI and adoption',
      deepDive:
        'Custom software only pays off if people use it. We plan pilots, progressive permissions, and simple dashboards to measure time saved. Modularity limits debt and we watch for legal or sector changes.',
      metrics: [
        { value: 'CRM', label: 'Pipelines delivered' },
        { value: 'ERP', label: 'Connectors' },
        { value: '360°', label: 'Customer view' },
      ],
      faqTitle: 'Common questions',
      faq: [
        {
          q: 'Replace Excel or a SaaS tool?',
          a: 'Often a mix: migrate critical data and coexist temporarily to reduce risk.',
        },
        {
          q: 'Future-proofing?',
          a: 'Modular architecture: new modules, roles, or flows without rebuilding everything.',
        },
        {
          q: 'Maintenance?',
          a: 'Tailored plans: fixes, security updates, small changes, and user support.',
        },
      ],
      imageAltHero: 'Team meeting around a software project',
      imageAltPanel: 'Colleagues reviewing data on a screen',
      imageAltAccent: 'Team presentation in a workshop',
    },
    website: {
      eyebrow: 'Web presence & e‑commerce',
      lead: 'Fast, findable, credible',
      narrative:
        'Your site is often the first touchpoint. We combine strong visual identity, clear content structure, performance (Core Web Vitals), and technical SEO so pages rank and convert. E‑commerce covers checkout, payments, and catalog management as needed.',
      deliverablesTitle: 'Included or optional services',
      deliverables: [
        'Art direction, wireframes, and responsive mockups',
        'CMS integration (editable by your team)',
        'On-page SEO, structured data, and analytics',
        'Forms, GDPR, cookies, and legal pages',
        'E‑commerce: cart, payments, shipping, transactional email',
        'Go-live, SSL, backups, and update plan',
      ],
      processTitle: 'Launch without surprises',
      steps: [
        {
          title: 'Positioning & IA',
          body: 'Key messages, semantic SEO, and a validated sitemap.',
        },
        {
          title: 'Design & copy',
          body: 'Mockups, imagery, optimized copy, and proofreading before build.',
        },
        {
          title: 'Development & QA',
          body: 'Responsive layout, baseline a11y, performance, and cross-browser checks.',
        },
        {
          title: 'Go-live & training',
          body: 'CMS training, post-launch follow-up, and editorial guidance.',
        },
      ],
      deepDiveTitle: 'Performance & trust',
      deepDive:
        'We optimize images, fonts, and scripts for fast loads. Security (updates, backups) is built in from day one. For commerce, we secure payment flows and customer data handling.',
      metrics: [
        { value: 'SEO', label: 'Audit & execution' },
        { value: 'LCP', label: 'Perf tuning' },
        { value: 'CMS', label: 'Content autonomy' },
      ],
      faqTitle: 'Common questions',
      faq: [
        {
          q: 'Shopify, WooCommerce, or custom?',
          a: 'We recommend based on catalog size, integrations, and your internal team. Custom when flows are highly specific.',
        },
        {
          q: 'Who writes copy?',
          a: 'We can structure and optimize; domain validation stays with you. Full copywriting available as an option.',
        },
        {
          q: 'After launch?',
          a: 'Maintenance retainers: updates, small evolutions, uptime monitoring.',
        },
      ],
      imageAltHero: 'Web design creation on a monitor',
      imageAltPanel: 'Designer working on a website mockup',
      imageAltAccent: 'Modern desk with laptop and coffee',
    },
    automation: {
      eyebrow: 'Workflows & integrations',
      lead: 'Less manual entry, more reliability',
      narrative:
        'Automation connects your tools: CRM, accounting, email, files, business APIs. We map flows, target recurring human errors, and implement robust pipelines with logging, alerts, and error recovery.',
      deliverablesTitle: 'Example automated chains',
      deliverables: [
        'Bi-directional sync between CRM and internal tools',
        'Lead routing, notifications, and auto-created tasks',
        'Attachment extraction, OCR, and filing',
        'Scheduled reports to email or cloud storage',
        'Webhooks, queues, and idempotency',
        'Job supervision dashboards',
      ],
      processTitle: 'Controlled rollout',
      steps: [
        {
          title: 'Map & quick wins',
          body: 'System inventory, volumes, and first high-impact automations.',
        },
        {
          title: 'Flow design',
          body: 'State diagram, error handling, SLAs, and sensitive data paths.',
        },
        {
          title: 'Implementation',
          body: 'Scripts, no-code/low-code, or custom code by criticality.',
        },
        {
          title: 'Operations',
          body: 'Monitoring, alerts, runbooks, and continuous improvement.',
        },
      ],
      deepDiveTitle: 'Reliability first',
      deepDive:
        'Silent automation failures are worse than manual work. We add structured logs, failure alerts, queues for spikes, and rollback procedures. Documentation helps your IT team take ownership.',
      metrics: [
        { value: 'API', label: 'Connectors' },
        { value: '−40%', label: 'Admin time target*' },
        { value: 'SLA', label: 'Monitoring' },
      ],
      faqTitle: 'Common questions',
      faq: [
        {
          q: 'Zapier / Make vs custom?',
          a: 'We choose by criticality, volume, and data sovereignty. Custom for critical or highly specific flows.',
        },
        {
          q: 'What if an API changes?',
          a: 'Versioning contracts, regression tests, and planned maintenance updates.',
        },
        {
          q: 'Access security?',
          a: 'Least privilege, vaulted secrets, token rotation, and access audits.',
        },
      ],
      imageAltHero: 'Global network and digital connectivity',
      imageAltPanel: 'Professional working across multiple monitors',
      imageAltAccent: 'Team collaborating on a tech project',
    },
  },
};

const he: ServicePageDetail = {
  labels: {
    deliverablesEyebrow: 'תוצרים',
    processEyebrow: 'שיטת עבודה',
    deepDiveEyebrow: 'מומחיות',
    faqEyebrow: 'שאלות נפוצות',
    ctaHeadline: 'מוכנים להתחיל?',
    ctaSub: 'ספרו לנו על ההקשר — נחזור עם הצעה ברורה ולוח זמנים ריאלי.',
    metricDisclaimer: '* יעד אינדיקטיבי לאחר ניתוח ההקשר שלכם.',
  },
  pages: {
    mobile: {
      eyebrow: 'סטודיו למוצר מובייל',
      lead: 'מהרעיון ועד App Store ו‑Play Store',
      narrative:
        'כל אפליקציה מתחילה בהבנה מעמיקה של המשתמשים והמטרות העסקיות. אנחנו בונים אב‑טיפוס מהר, מאמתים איתכם, ואז מפתחים ברמה גבוהה: בדיקות אוטומטיות, ביצועים, נגישות ועמידה בדרישות החנויות.',
      deliverablesTitle: 'מה אנחנו מוסרים בפועל',
      deliverables: [
        'ביקורת UX/UI, מסעות משתמש וארכיטקטורה טכנית',
        'מוקאפים אינטראקטיביים ומערכת עיצוב מתפתחת',
        'פיתוח iOS / Android (נייטיב, React Native או Flutter)',
        'אימות מאובטח, API, אנליטיקה ומוניטורינג',
        'הגשה ל‑App Store ו‑Play Store, עמידה בתקנים ועדכונים',
        'תיעוד, העברת ידע ותוכנית תחזוקה',
      ],
      processTitle: 'איך אנחנו עובדים',
      steps: [
        {
          title: 'גילוי והיקף',
          body: 'סדנאות, פרסונות, נתיבים קריטיים ו‑backlog ממוספר עם קריטריוני קבלה.',
        },
        {
          title: 'עיצוב ואב‑טיפוס',
          body: 'זרימות מפורטות, UI מותאם ואב‑טיפוס לבדיקה לפני פיתוח כבד.',
        },
        {
          title: 'אספקה אג׳ילית',
          body: 'ספרינטים קצרים, דמו קבוע, סקירת קוד, CI/CD ואיכות מתמשכת.',
        },
        {
          title: 'השקה ומעקב',
          body: 'פרסום בחנות, ניטור, תיקונים, איטרציות ותמיכה אחרי ההשקה.',
        },
      ],
      deepDiveTitle: 'למה לבחור בנו',
      deepDive:
        'אנחנו שולטים במכלול המובייל: התראות push, מצב offline, הגנת מידע אישי ואינטגרציה למערכות קיימות. הקוד מובנה לתחזוקה ארוכת טווח עם תיעוד החלטות טכניות.',
      metrics: [
        { value: '8+', label: 'שנות ניסיון' },
        { value: '20+', label: 'לקוחות' },
        { value: '100%', label: 'בעלות על הקוד אצלכם' },
      ],
      faqTitle: 'שאלות נפוצות',
      faq: [
        {
          q: 'נייטיב או cross‑platform?',
          a: 'המלצה לפי תקציב, לוח זמנים וביצועים. React Native ו‑Flutter מתאימים לרוב המקרים; נייטיב כשיש דרישות מאוד ספציפיות.',
        },
        {
          q: 'למי שייך קוד המקור?',
          a: 'לכם לפי החוזה. אנחנו מוסרים מאגר Git, גישות ומדריכי תפעול.',
        },
        {
          q: 'כמה זמן ל‑MVP?',
          a: 'לרוב 8–16 שבועות תלוי בהיקף ובאינטגרציות. תוכנית מפורטת אחרי שלב הגדרה.',
        },
      ],
      imageAltHero: 'אדם משתמש באפליקציה בסמארטפון',
      imageAltPanel: 'צוות משתף פעולה בפרויקט מובייל',
      imageAltAccent: 'פגישת מוצר סביב מחשב נייד',
    },
    desktop: {
      eyebrow: 'אפליקציות ווב ו‑SaaS',
      lead: 'מוצרים מאובטחים, סקיילביליים ומוכנים לייצור',
      narrative:
        'אנחנו בונים אפליקציות ווב מודרניות: דשבורדים, פורטלים, back office ו‑SaaS B2B. דגש על אבטחה (אימות, תפקידים, ביקורת), ביצועים תפיסתיים וארכיטקטורה שגדלה איתכם.',
      deliverablesTitle: 'היקף אספקה טיפוסי',
      deliverables: [
        'ארכיטקטורת front/back, מודל נתונים ו‑API REST/GraphQL',
        'ממשק רספונסיבי, נגישות ומצבי ריק/שגיאה',
        'אינטגרציות: תשלום, אימייל, webhooks, CRM, ERP',
        'אימות, הרשאות מדויקות ויומני ביקורת',
        'סביבות staging/prod, פריסה וגיבויים',
        'ניטור (לוגים, התראות) ותיעוד טכני',
      ],
      processTitle: 'מהצורך ועד הרצה',
      steps: [
        {
          title: 'מפרט חי',
          body: 'User stories, מוקאפים מרכזיים ומיפוי סיכוני אבטחה/ציות.',
        },
        {
          title: 'מסירות קטנות',
          body: 'אינקרמנטים הניתנים לפריסה לסביבת בדיקה לאימות מתמשך.',
        },
        {
          title: 'חיזוק וביצועים',
          body: 'בדיקות, עומס סביר, אופטימיזציה ושיטות OWASP.',
        },
        {
          title: 'עלייה לייצור ותפעול',
          body: 'מעבר production, ניטור, נהלי אירועים ו‑roadmap.',
        },
      ],
      deepDiveTitle: 'הנדסה יומיומית',
      deepDive:
        'Stacks מוכחים (React, Next.js, Node, SQL/NoSQL לפי הצורך), הפרדת שכבות, ולידציה וטיפול בשגיאות מפורש — כדי שהצוות שלכם יוכל להתפתח בלי חוב טכני בלתי מבוקר.',
      metrics: [
        { value: 'API', label: 'אינטגרציות' },
        { value: 'SaaS', label: 'מוצרים שנמסרו' },
        { value: '24/7', label: 'אפשרות ניטור' },
      ],
      faqTitle: 'שאלות נפוצות',
      faq: [
        {
          q: 'אפשר לקחת פרויקט קיים?',
          a: 'כן: ביקורת קוד/תשתית, תוכנית תיקון ואז איטרציות — בשקיפות מלאה.',
        },
        {
          q: 'ענן מול on‑prem?',
          a: 'ענן ציבורי או תשתית שלכם לפי מגבלות משפטיות/טכניות.',
        },
        {
          q: 'GDPR ומידע רגיש?',
          a: 'פרטיות מתחילת התכנון: מזעור, הצפנה, רישומי עיבוד וסעיפים מתאימים.',
        },
      ],
      imageAltHero: 'מפתח עובד מול מסך עם קוד',
      imageAltPanel: 'דשבורד אנליטי על מחשב נייד',
      imageAltAccent: 'צוות פיתוח במשרד פתוח',
    },
    web: {
      eyebrow: 'בינה מלאכותית יישומית',
      lead: 'מקרי שימוש מדידים — לא גימיקים',
      narrative:
        'AI שווה רק אם פותר בעיה אמיתית: עיבוד מהיר יותר, תשובות טובות יותר או פחות משימות חוזרות. אנחנו מגדירים KPI לפני הפיתוח, עובדים על דאטה מייצגת ושומרים על בקרות אנושיות.',
      deliverablesTitle: 'פתרונות שאנחנו מטמיעים',
      deliverables: [
        'עוזרים וצ׳אטבוטים מבוססי מאגר ידע',
        'חילוץ, סיווג וניתוב מסמכים',
        'העשרת נתונים וציון מסייע',
        'אורקסטרציה של workflows (אדם + מכונה)',
        'ממשקי פיקוח ומעקב אחר החלטות',
        'ליווי שינוי ארגוני והדרכה',
      ],
      processTitle: 'גישת AI אחראית',
      steps: [
        {
          title: 'היקף ונתונים',
          body: 'גבולות הבעיה, איכות מקורות, ציות וגבולות המודל.',
        },
        {
          title: 'אב‑טיפוס מדיד',
          body: 'POC על תת‑קבוצה עם מדדי דיוק וחיסכון בזמן.',
        },
        {
          title: 'תעשייתיות',
          body: 'APIs, אבטחה, מכסות, לוגים ואינטגרציה לכלים קיימים.',
        },
        {
          title: 'שיפור מתמשך',
          body: 'משוב, אימון מחדש או כיוון prompts לפי הצורך.',
        },
      ],
      deepDiveTitle: 'בהירות טכנית',
      deepDive:
        'לפי הצורך משלבים מודלים גנרטיביים, מודלים ייעודיים או כללי עסק קלאסיים. מתעדים מגבלות, עלויות inference ותרחישי גיבוי כששירות ה‑AI לא זמין.',
      metrics: [
        { value: 'LLM', label: 'אינטגרציות' },
        { value: 'RAG', label: 'בסיסי מסמכים' },
        { value: 'KPI', label: 'מעקב רווח' },
      ],
      faqTitle: 'שאלות נפוצות',
      faq: [
        {
          q: 'צריך המון דאטה?',
          a: 'לא תמיד: מסגור טוב ודוגמאות מייצגות מספיקות לעיתים לשירות ראשון שימושי.',
        },
        {
          q: 'איפה מאוחסן המידע?',
          a: 'EU או לפי מדיניות שלכם; אפשרויות on‑prem או VPC ייעודי.',
        },
        {
          q: 'עלויות צפויות?',
          a: 'אומדן שימוש tokens/API, תקרות, cache ובחירת מודלים לפי תקציב.',
        },
      ],
      imageAltHero: 'ויזואליזציה מופשטת של בינה מלאכותית',
      imageAltPanel: 'שרתים בסביבת דאטה סנטר',
      imageAltAccent: 'מסך עם גרפים ואנליטיקה',
    },
    consulting: {
      eyebrow: 'תוכנות עסקיות ו‑CRM',
      lead: 'כלים שמתאימים לתהליכים האמיתיים שלכם',
      narrative:
        'כלים גנריים יוצרים פשרות. אנחנו מתכננים אפליקציות מותאמות לצנרת המכירות, לתפעול או לקשר לקוח: מסכים מותאמים, כללי עסק מפורשים, הרשאות לפי תפקיד ודוחות להנהלה.',
      deliverablesTitle: 'כיסוי פרויקט טיפוסי',
      deliverables: [
        'מידול ישויות, workflows וכללי עסק',
        'CRM / צנרת, משימות, מעקבים והיסטוריית לקוח',
        'Back office: מלאי, חשבוניות, אישור, ייצוא',
        'דשבורדים וייצוא לחשבונאות / BI',
        'מחברים לכלים קיימים (אימייל, ERP, טלפוניה)',
        'הדרכת צוותים ותיעוד למנהלי מערכת',
      ],
      processTitle: 'שיתוף פעולה עם הצוותים שלכם',
      steps: [
        {
          title: 'שקיעה בשטח',
          body: 'ראיונות משתמשים, מיפוי תהליכים וניתוח כאבים.',
        },
        {
          title: 'מפרט פונקציונלי',
          body: 'מוקאפים, כללים, מטריצות הרשאות ותוכנית מיגרציה.',
        },
        {
          title: 'פיתוח ו‑UAT',
          body: 'תרחישי בדיקה עסקית, קבלת משתמשים ותיקונים לפני ייצור.',
        },
        {
          title: 'הטמעה והתפתחות',
          body: 'ניהול שינוי, קו חם לפרויקט ו‑roadmap מוצר.',
        },
      ],
      deepDiveTitle: 'ROI ואימוץ',
      deepDive:
        'תוכנה מותאמת משתלמת רק אם משתמשים בה. אנחנו מתכננים פיילוטים, הרשאות הדרגתיות ודשבורדים פשוטים למדידת חיסכון בזמן. מודולריות מגבילה חוב ומעקב אחר שינויים רגולטוריים.',
      metrics: [
        { value: 'CRM', label: 'צנרות שנמסרו' },
        { value: 'ERP', label: 'מחברים' },
        { value: '360°', label: 'תמונת לקוח' },
      ],
      faqTitle: 'שאלות נפוצות',
      faq: [
        {
          q: 'להחליף Excel או SaaS?',
          a: 'לעיתים שילוב: מיגרציה של נתונים קריטיים וחיים זמנית עם הישן להפחתת סיכון.',
        },
        {
          q: 'עתידיות?',
          a: 'ארכיטקטורה מודולרית: מודולים, תפקידים או זרימות חדשות בלי לבנות הכל מחדש.',
        },
        {
          q: 'תחזוקה?',
          a: 'חבילות מותאמות: תיקונים, עדכוני אבטחה, שינויים קטנים ותמיכה.',
        },
      ],
      imageAltHero: 'פגישת צוות סביב פרויקט תוכנה',
      imageAltPanel: 'עמיתים בוחנים נתונים על מסך',
      imageAltAccent: 'מצגת צוות בסדנה',
    },
    website: {
      eyebrow: 'נוכחות ווב ואי‑מסחר',
      lead: 'מהיר, ניתן למציאה ואמין',
      narrative:
        'האתר הוא לעיתים נקודת המגע הראשונה. אנחנו משלבים זהות ויזואלית חזקה, מבנה תוכן ברור, ביצועים (Core Web Vitals) ו‑SEO טכני כדי לדרג ולהמיר. אי‑מסחר כולל תשלום וקטלוג לפי הצורך.',
      deliverablesTitle: 'שירותים כלולים או אופציונליים',
      deliverables: [
        'אמנות חזותית, wireframes ומוקאפים רספונסיביים',
        'אינטגרציית CMS (עריכה עצמית)',
        'SEO on-page, נתונים מובנים ואנליטיקה',
        'טפסים, GDPR, עוגיות ודפים משפטיים',
        'אי‑מסחר: עגלה, תשלום, משלוח, אימיילים טרנזקציוניים',
        'עלייה לאוויר, SSL, גיבויים ותוכנית עדכונים',
      ],
      processTitle: 'השקה בלי הפתעות',
      steps: [
        {
          title: 'מיקום ומבנה אתר',
          body: 'מסרים, SEO סמנטי ומפת אתר מאושרת.',
        },
        {
          title: 'עיצוב ותוכן',
          body: 'מוקאפים, תמונות, טקסטים מותאמים וקריאה לפני בנייה.',
        },
        {
          title: 'פיתוח ובדיקות',
          body: 'רספונסיביות, נגישות בסיסית, ביצועים ודפדפנים.',
        },
        {
          title: 'עלייה והדרכה',
          body: 'הדרכת CMS, מעקב אחרי השקה והנחיות עריכה.',
        },
      ],
      deepDiveTitle: 'ביצועים ואמון',
      deepDive:
        'אופטימיזציה לתמונות, פונטים וסקריפטים לטעינה מהירה. אבטחה (עדכונים, גיבויים) מהיום הראשון. באי‑מסחר מאבטחים תשלומים וטיפול בנתוני לקוחות.',
      metrics: [
        { value: 'SEO', label: 'ביקורת ויישום' },
        { value: 'LCP', label: 'כיוון ביצועים' },
        { value: 'CMS', label: 'אוטונומיית תוכן' },
      ],
      faqTitle: 'שאלות נפוצות',
      faq: [
        {
          q: 'Shopify, WooCommerce או מותאם?',
          a: 'המלצה לפי קטלוג, אינטגרציות וצוות פנימי. מותאם כשהזרימות מאוד ספציפיות.',
        },
        {
          q: 'מי כותב טקסטים?',
          a: 'אנחנו יכולים לבנות ולמטב; האימות המקצועי אצלכם. כתיבה מלאה כאופציה.',
        },
        {
          q: 'אחרי העלייה?',
          a: 'חבילות תחזוקה: עדכונים, שינויים קטנים, ניטור זמינות.',
        },
      ],
      imageAltHero: 'יצירת אתר ועיצוב על מסך',
      imageAltPanel: 'מעצב עובד על מוקאפ אתר',
      imageAltAccent: 'שולחן עבודה מודרני עם לפטופ וקפה',
    },
    automation: {
      eyebrow: 'Workflows ואינטגרציות',
      lead: 'פחות הקלדה ידנית, יותר אמינות',
      narrative:
        'אוטומציה מחברת כלים: CRM, חשבונאות, אימייל, קבצים, APIs עסקיים. אנחנו ממפים זרימות, מזהים טעויות חוזרות ומיישמים צינורות עם לוגים, התראות ושחזור משגיאות.',
      deliverablesTitle: 'דוגמאות לשרשראות אוטומטיות',
      deliverables: [
        'סנכרון דו‑כיווני בין CRM לכלים פנימיים',
        'ניתוב לידים, התראות ומשימות שנוצרות אוטומטית',
        'חילוץ מצורפים, OCR וסידור',
        'דוחות מתוזמנים לאימייל או ענן',
        'Webhooks, תורים ואידמפוטנטיות',
        'דשבורדים לפיקוח על jobs',
      ],
      processTitle: 'הטמעה מבוקרת',
      steps: [
        {
          title: 'מיפוי וניצולים מהירים',
          body: 'מלאי מערכות, נפחים ואוטומציות בעלות השפעה ראשונה.',
        },
        {
          title: 'תכנון זרימה',
          body: 'דיאגרמת מצבים, טיפול בשגיאות, SLA ונתיבי מידע רגיש.',
        },
        {
          title: 'יישום',
          body: 'סקריפטים, no/low-code או קוד לפי קריטיות.',
        },
        {
          title: 'תפעול',
          body: 'ניטור, התראות, runbooks ושיפור מתמשך.',
        },
      ],
      deepDiveTitle: 'אמינות לפני הכל',
      deepDive:
        'כשל אוטומטי שקט גרוע יותר מעבודה ידנית. אנחנו מוסיפים לוגים מובנים, התראות כשלים, תורים לעומסים ונהלי rollback. התיעוד מאפשר ל‑IT שלכם לקחת אחריות.',
      metrics: [
        { value: 'API', label: 'מחברים' },
        { value: '−40%', label: 'יעד זמן אדמין*' },
        { value: 'SLA', label: 'ניטור' },
      ],
      faqTitle: 'שאלות נפוצות',
      faq: [
        {
          q: 'Zapier / Make מול קוד?',
          a: 'בחירה לפי קריטיות, נפח וריבונות מידע. קוד לזרימות קריטיות או מאוד ספציפיות.',
        },
        {
          q: 'מה אם API משתנה?',
          a: 'חוזי גרסאות, בדיקות רגרסיה ועדכוני תחזוקה מתוכננים.',
        },
        {
          q: 'אבטחת גישות?',
          a: 'הרשאות מינימליות, סודות ב‑vault, רוטציית טוקנים וביקורת גישה.',
        },
      ],
      imageAltHero: 'רשת עולמית וקישוריות דיגיטלית',
      imageAltPanel: 'מקצועית עובדת מול מסכים מרובים',
      imageAltAccent: 'צוות משתף פעולה בפרויקט טק',
    },
  },
};

const byLang: Record<Language, ServicePageDetail> = {
  fr,
  en,
  he,
};

export function getServicePageDetail(
  language: Language,
  serviceKey: ServiceContentKey
): { labels: ServicePageDetail['labels']; page: ServicePageDetail['pages'][ServiceContentKey] } {
  const bundle = byLang[language] ?? byLang.fr;
  return {
    labels: bundle.labels,
    page: bundle.pages[serviceKey],
  };
}
