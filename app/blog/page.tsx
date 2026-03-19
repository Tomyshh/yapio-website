import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BlogListingClient from '@/components/BlogListingClient';
import { generateBlogIndexMetadata, pageSEO } from '@/lib/seo';

export const metadata: Metadata = generateBlogIndexMetadata();

export default function BlogPage() {
  const webPageLd = pageSEO.blog.structuredData?.[0];

  return (
    <div className="min-h-screen bg-dark">
      {webPageLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
        />
      ) : null}
      <Navigation />
      <BlogListingClient />
      <Footer />
    </div>
  );
}
