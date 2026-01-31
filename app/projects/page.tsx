import React from 'react';
import type { Metadata } from 'next';
import ProjectsPageClient from './ProjectsPageClient';
import { generateMetadata as generateSEOMetadata, pageSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEOMetadata(pageSEO.projects);

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
