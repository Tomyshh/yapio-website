import { Metadata } from 'next';
import ProjectDetailPage from './ProjectDetailPage';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Générer les métadonnées pour le SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const projectName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return {
    title: `${projectName} - YAPIO | Services Numériques`,
    description: `Découvrez notre projet ${projectName} : développement web, applications mobiles et solutions sur mesure.`,
    openGraph: {
      title: `${projectName} - YAPIO`,
      description: `Découvrez notre projet ${projectName}`,
      type: 'website',
    },
  };
}

// Générer les routes statiques pour tous les projets
export async function generateStaticParams() {
  const projects = [
    'chabbataim',
    'olim-service',
    'aerilux',
    'dtai',
    'havrouta',
    'security-bear',
    'kolot',
    'oz-leisrael',
    'i24-tv-channel'
  ];

  return projects.map((slug) => ({
    slug,
  }));
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <ProjectDetailPage slug={slug} />;
}

