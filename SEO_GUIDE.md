# Guide SEO Hyper Optimisé - YAPIO

Ce guide explique comment utiliser le système SEO hyper optimisé mis en place pour le site YAPIO.

## 🚀 Fonctionnalités Implémentées

### 1. Métadonnées Avancées
- ✅ Système de génération automatique des métadonnées
- ✅ Open Graph et Twitter Cards optimisés
- ✅ Structured Data (Schema.org) automatique
- ✅ Balises meta de sécurité et performance
- ✅ Gestion multi-langue (FR/EN)

### 2. Fichiers SEO Essentiels
- ✅ `sitemap.xml` dynamique
- ✅ `robots.txt` optimisé
- ✅ `manifest.json` pour PWA
- ✅ Headers de sécurité et cache

### 3. Optimisations Techniques
- ✅ Core Web Vitals monitoring
- ✅ Lazy loading des images
- ✅ Préchargement des pages importantes
- ✅ Optimisation des performances
- ✅ Accessibilité automatique

### 4. Analytics et Monitoring
- ✅ Google Analytics 4
- ✅ Google Tag Manager
- ✅ Microsoft Clarity
- ✅ Hotjar (optionnel)
- ✅ Tracking des Core Web Vitals

### 5. Outils de Développement
- ✅ SEO Debugger (mode développement)
- ✅ Rapport SEO en temps réel
- ✅ Monitoring automatique

## 📋 Configuration Initiale

### 1. Variables d'Environnement

Créez un fichier `.env.local` basé sur `.env.example` :

```bash
cp .env.example .env.local
```

Remplissez les valeurs :
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` : ID Google Analytics 4
- `NEXT_PUBLIC_GTM_ID` : ID Google Tag Manager
- `NEXT_PUBLIC_GSC_VERIFICATION` : Code de vérification Google Search Console
- `NEXT_PUBLIC_SITE_URL` : URL de production du site

### 2. Domaine de Production

Modifiez les fichiers suivants avec votre domaine :
- `lib/seo.ts` : ligne 13 `const baseUrl = 'https://yapio.fr'`
- `app/sitemap.ts` : ligne 4 `const baseUrl = 'https://yapio.fr'`
- `app/robots.ts` : ligne 4 `const baseUrl = 'https://yapio.fr'`

### 3. Réseaux Sociaux

Mettez à jour les liens dans `lib/seo.ts` :
```typescript
sameAs: [
  'https://www.linkedin.com/company/yapio',
  'https://twitter.com/yapio_dev',
  'https://github.com/yapio',
],
```

## 🛠️ Utilisation

### Métadonnées par Page

Chaque page utilise le système de métadonnées :

```typescript
import { generateMetadata as generateSEOMetadata, pageSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEOMetadata(pageSEO.about);
```

### Ajouter une Nouvelle Page

1. Ajoutez la configuration dans `lib/seo.ts` :
```typescript
export const pageSEO = {
  // ... pages existantes
  newPage: {
    title: 'Titre de la nouvelle page',
    description: 'Description de la page',
    keywords: ['mot-clé1', 'mot-clé2'],
    canonical: `${baseUrl}/nouvelle-page/`,
    structuredData: [
      generateStructuredData('WebPage', {
        title: 'Titre de la page',
        description: 'Description de la page',
        url: `${baseUrl}/nouvelle-page/`,
      }),
    ],
  },
};
```

2. Mettez à jour le sitemap dans `app/sitemap.ts` :
```typescript
{
  url: `${baseUrl}/nouvelle-page/`,
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 0.8,
},
```

### SEO Debugger (Développement)

En mode développement, utilisez le SEO Debugger :
- Clic sur l'icône 🔍 en bas à gauche
- Ou raccourci : `Ctrl + Shift + S`

Le debugger affiche :
- Score SEO en temps réel
- Métriques de la page
- Problèmes détectés
- Recommandations

## 📊 Monitoring et Analytics

### Core Web Vitals

Les métriques sont automatiquement trackées :
- **LCP** (Largest Contentful Paint) : < 2.5s
- **FID** (First Input Delay) : < 100ms
- **CLS** (Cumulative Layout Shift) : < 0.1

### Événements Personnalisés

Utilisez le hook `useAnalytics` :

```typescript
import { useAnalytics } from '@/lib/analytics';

const { trackEvent, trackUserInteraction } = useAnalytics();

// Tracker un événement
trackEvent('button_click', {
  button_name: 'contact_form',
  page: 'homepage',
});

// Tracker une interaction
trackUserInteraction('button', 'click', 'contact-form');
```

## 🔧 Optimisations Avancées

### Images

- Utilisez les formats WebP/AVIF
- Ajoutez toujours un attribut `alt`
- Utilisez `loading="lazy"` pour les images non critiques

### Liens Internes

- Utilisez des ancres descriptives
- Évitez "cliquez ici"
- Ajoutez `title` pour plus de contexte

### Contenu

- Minimum 300 mots par page
- Structure H1 > H2 > H3 cohérente
- Un seul H1 par page

## 🚨 Vérifications Importantes

### Avant le Déploiement

1. **Testez le sitemap** : `/sitemap.xml`
2. **Vérifiez robots.txt** : `/robots.txt`
3. **Validez le structured data** : [Google Rich Results Test](https://search.google.com/test/rich-results)
4. **Testez les Core Web Vitals** : [PageSpeed Insights](https://pagespeed.web.dev/)

### Après le Déploiement

1. **Google Search Console** : Soumettez le sitemap
2. **Google Analytics** : Vérifiez le tracking
3. **Bing Webmaster Tools** : Soumettez le site
4. **Tests SEO** : Utilisez des outils comme Screaming Frog

## 📈 Métriques à Surveiller

### SEO Technique
- Temps de chargement < 3s
- Score PageSpeed > 90
- Core Web Vitals dans le vert
- 0 erreur 404

### Contenu
- Taux de rebond < 60%
- Temps sur la page > 2min
- Pages par session > 2

### Indexation
- Pages indexées dans Google Search Console
- Couverture sans erreurs
- Amélioration de l'expérience sur la page

## 🔄 Maintenance

### Mensuelle
- Vérifier les erreurs dans Search Console
- Analyser les Core Web Vitals
- Mettre à jour le contenu obsolète

### Trimestrielle
- Audit SEO complet
- Analyse de la concurrence
- Optimisation des mots-clés

### Annuelle
- Refonte des métadonnées
- Mise à jour du structured data
- Révision de la stratégie SEO

## 📞 Support

Pour toute question concernant le système SEO :
1. Consultez ce guide
2. Utilisez le SEO Debugger en développement
3. Vérifiez les logs dans la console du navigateur

## 🎯 Objectifs SEO

### Court terme (3 mois)
- [ ] Indexation complète du site
- [ ] Core Web Vitals dans le vert
- [ ] 0 erreur technique

### Moyen terme (6 mois)
- [ ] Positionnement sur les mots-clés principaux
- [ ] Augmentation du trafic organique de 50%
- [ ] Amélioration du taux de conversion

### Long terme (12 mois)
- [ ] Top 3 sur les requêtes principales
- [ ] Autorité de domaine > 30
- [ ] 1000+ visiteurs organiques/mois

---

*Ce système SEO est conçu pour évoluer avec votre site. N'hésitez pas à l'adapter selon vos besoins spécifiques.*
