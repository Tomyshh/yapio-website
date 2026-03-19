import React from 'react';
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ServiceDetail from '@/components/ServiceDetail';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getServiceMeta, SERVICE_SLUGS } from '@/lib/services';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meta = getServiceMeta(slug);
  if (!meta) {
    return { title: 'Service | YAPIO' };
  }
  return generateSEOMetadata({
    title: meta.title,
    description: meta.description,
    canonical: `https://www.yapio.io/services/${slug}`,
    keywords: [meta.title, 'YAPIO', 'service', 'développement'],
  });
}

export default async function ServicePage() {
  return (
    <div className="min-h-screen bg-dark">
      <Navigation />
      <ServiceDetail />
      <Footer />
    </div>
  );
}
