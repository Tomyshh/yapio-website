import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BlogArticleView from '@/components/BlogArticleView';
import { getBlogArticle, getAllBlogSlugs } from '@/lib/blog-articles';
import {
  generateBlogArticleMetadata,
  generateStructuredData,
  generateBreadcrumbList,
} from '@/lib/seo';

const BASE = 'https://www.yapio.io';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticle(slug);
  if (!article) return { title: 'Article | YAPIO' };
  return generateBlogArticleMetadata(article);
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getBlogArticle(slug);
  if (!article) notFound();

  const articleJson = generateStructuredData('Article', {
    title: article.seo.title,
    description: article.seo.description,
    url: `${BASE}/blog/${article.slug}/?lang=en`,
    datePublished: article.published,
    dateModified: article.published,
    image: article.image,
  });

  const breadcrumbJson = generateBreadcrumbList([
    { name: 'YAPIO', url: `${BASE}/` },
    { name: 'Blog', url: `${BASE}/blog/?lang=en` },
    { name: article.title.en, url: `${BASE}/blog/${article.slug}/?lang=en` },
  ]);

  return (
    <div className="min-h-screen bg-dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />
      <Navigation />
      <BlogArticleView article={article} />
      <Footer />
    </div>
  );
}
