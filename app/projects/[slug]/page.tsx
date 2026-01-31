import { Metadata } from 'next';
import ProjectDetailPage from './ProjectDetailPage';
import { PROJECTS } from '@/lib/projects';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Générer les métadonnées pour le SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  const projectName =
    project?.name || slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  const description =
    project?.fallbackDescription ||
    `Découvrez notre projet ${projectName} : développement web, applications mobiles et solutions sur mesure.`;

  const ogImage =
    project?.images.desktop?.[0] ||
    project?.images.mobile?.[0] ||
    project?.logo ||
    '/branding/fulllogo_nobuffer.png';

  return generateSEOMetadata({
    title: `${projectName} - Projet`,
    description,
    canonical: `https://yapio.io/projects/${slug}/`,
    ogImage,
    keywords: [
      'projet',
      'portfolio',
      projectName,
      'développement web',
      'application mobile',
      'IA',
      'logiciel sur mesure',
      'YAPIO',
    ],
  });
}

// Générer les routes statiques pour tous les projets
export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <ProjectDetailPage slug={slug} />;
}

