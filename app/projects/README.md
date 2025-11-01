# Pages Projets Dynamiques

Ce dossier contient le système de pages dynamiques pour afficher les détails de chaque projet du portfolio.

## Structure

```
app/projects/[slug]/
├── page.tsx              # Route dynamique et métadonnées SEO
├── ProjectDetailPage.tsx # Composant client pour l'affichage du projet
└── README.md            # Documentation
```

## Fonctionnalités

### 1. Routes Dynamiques
Chaque projet est accessible via une URL unique :
- `/projects/chabbataim`
- `/projects/olim-service`
- `/projects/aerilux`
- `/projects/dtai`
- `/projects/havrouta`
- `/projects/security-bear`
- `/projects/kolot`
- `/projects/oz-leisrael`
- `/projects/i24-tv-channel`

### 2. Génération Statique (SSG)
Les pages sont pré-générées au build grâce à `generateStaticParams()`, ce qui garantit :
- ✅ Performances optimales
- ✅ SEO optimal
- ✅ Expérience utilisateur rapide

### 3. Métadonnées SEO Dynamiques
Chaque page projet a ses propres métadonnées optimisées pour le référencement :
- Title personnalisé
- Description adaptée
- Open Graph tags

### 4. Design Moderne
Les pages projets incluent :
- 🎨 Header avec retour au portfolio
- 🖼️ Hero section avec logo et informations du projet
- 📅 Métadonnées (année, catégorie)
- 🔧 Technologies utilisées
- 🖼️ Galerie d'images (desktop et mobile)
- 🔍 Lightbox pour visualiser les images en grand
- 📞 Section CTA pour contact

### 5. Multilingue
Le système supporte 3 langues :
- 🇫🇷 Français
- 🇬🇧 Anglais
- 🇮🇱 Hébreu

## Ajouter un Nouveau Projet

### 1. Ajouter le slug dans `generateStaticParams()`

```typescript
export async function generateStaticParams() {
  const projects = [
    // ... projets existants
    'nouveau-projet', // Ajouter ici
  ];
  
  return projects.map((slug) => ({
    slug,
  }));
}
```

### 2. Ajouter la configuration dans `ProjectDetailPage.tsx`

```typescript
const projectsConfig = [
  // ... projets existants
  {
    name: 'Nouveau Projet',
    description: getProjectDescription('nouveauProjet'),
    color: 'from-blue-400 to-cyan-400',
    bg_color: 'bg-blue-500/10',
    border_color: 'border-blue-400/20',
    display_order: 9,
    desktop_images: [
      '/projects/Nouveau Projet/image1-desktop.png'
    ],
    mobile_images: [
      '/projects/Nouveau Projet/app-mobile.png'
    ],
    technologies: ['React', 'Node.js', 'MongoDB'],
    year: '2024',
    category: 'Application Web'
  }
];
```

### 3. Ajouter les traductions dans `lib/translations.ts`

```typescript
clients: {
  projects: {
    // ... projets existants
    nouveauProjet: 'Description du nouveau projet',
  },
}
```

### 4. Ajouter les assets

Créer le dossier et ajouter les images :
```
public/projects/Nouveau Projet/
├── logo.png              # Logo du projet (requis)
├── image1-desktop.png    # Captures desktop (optionnel)
└── app-mobile.png        # Captures mobile (optionnel)
```

### 5. Mettre à jour le Portfolio

Dans `components/Portfolio.tsx`, ajouter la même configuration :

```typescript
{
  name: 'Nouveau Projet',
  description: getProjectDescription('nouveauProjet'),
  color: 'from-blue-400 to-cyan-400',
  bg_color: 'bg-blue-500/10',
  border_color: 'border-blue-400/20',
  display_order: 9,
  desktop_images: [
    '/projects/Nouveau Projet/image1-desktop.png'
  ],
  mobile_images: [
    '/projects/Nouveau Projet/app-mobile.png'
  ]
}
```

## Bonnes Pratiques

### Nommage des Slugs
- Utiliser des tirets pour séparer les mots : `mon-projet`
- Tout en minuscules
- Pas de caractères spéciaux

### Images
- **Logos** : Format PNG avec fond transparent recommandé
- **Desktop** : Aspect ratio 16:9 recommandé (1920x1080px)
- **Mobile** : Aspect ratio 9:16 recommandé (1080x1920px)
- Optimiser les images pour le web (compression, taille)

### Couleurs
Utiliser des gradients Tailwind pour cohérence :
- `from-blue-400 to-cyan-400`
- `from-purple-400 to-pink-400`
- `from-green-400 to-teal-400`
- etc.

## Technologies Utilisées

- **Next.js 15** : Framework React avec App Router
- **TypeScript** : Typage statique
- **Tailwind CSS** : Styling
- **Lucide React** : Icônes
- **next/image** : Optimisation des images

## Performance

Les pages sont optimisées pour :
- ⚡ Chargement rapide (SSG)
- 📱 Responsive design
- 🎨 Animations fluides
- 🖼️ Images lazy-loading
- ♿ Accessibilité

## Maintenance

Pour maintenir le système :
1. Vérifier régulièrement les liens
2. Optimiser les nouvelles images
3. Tester sur mobile et desktop
4. Vérifier les traductions
5. Valider le SEO avec Google Search Console

