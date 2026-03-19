'use client';

import { useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getBlogListingMeta } from '@/lib/blog-articles';
import { Blog7 } from '@/components/blocks/Blog7';

function formatPublished(iso: string, locale: string) {
  try {
    return new Date(iso + 'T12:00:00').toLocaleDateString(locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

export default function BlogListingClient() {
  const { language, t, isLoading } = useLanguage();

  const posts = useMemo(() => {
    const locale = language === 'fr' ? 'fr-FR' : language === 'he' ? 'he-IL' : 'en-US';
    return getBlogListingMeta(language).map((p) => ({
      id: p.id,
      title: p.title,
      summary: p.summary,
      label: p.label,
      author: p.author,
      published: formatPublished(p.published, locale),
      url: `/blog/${p.slug}/`,
      image: p.image,
      imageAlt: p.imageAlt,
    }));
  }, [language]);

  if (isLoading || !t.blogPage) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center bg-dark">
        <div
          className="size-10 animate-spin rounded-full border-2 border-primary border-t-transparent"
          aria-hidden
        />
      </div>
    );
  }

  return (
    <Blog7
      tagline={t.blogPage.tagline}
      heading={t.blogPage.heading}
      description={t.blogPage.description}
      posts={posts}
      readMoreLabel={t.blogPage.readMore}
    />
  );
}
