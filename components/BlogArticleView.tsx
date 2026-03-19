'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, Link2, Linkedin, Facebook } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { BlogArticle } from '@/lib/blog-articles';
import { cn } from '@/lib/cn';

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

export default function BlogArticleView({ article }: { article: BlogArticle }) {
  const { language, t, dir, isLoading } = useLanguage();
  const [activeId, setActiveId] = useState(article.sections[0]?.id ?? '');
  const [copied, setCopied] = useState(false);

  const locale = language === 'fr' ? 'fr-FR' : language === 'he' ? 'he-IL' : 'en-US';
  const publishedLabel = formatPublished(article.published, locale);

  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return window.location.href;
  }, []);

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(article.title[language]);

  const copyLink = useCallback(async () => {
    if (typeof window === 'undefined') return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const ids = article.sections.map((s) => s.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (els.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.1, 0.25, 0.5, 1] }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [article.sections]);

  if (isLoading || !t.blogPage) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-[#0A0A0A]">
        <div
          className="size-10 animate-spin rounded-full border-2 border-primary border-t-transparent"
          aria-hidden
        />
      </div>
    );
  }

  const asideOrder = dir === 'rtl' ? 'lg:order-2' : 'lg:order-1';
  const mainOrder = dir === 'rtl' ? 'lg:order-1' : 'lg:order-2';

  return (
    <article className="bg-[#0A0A0A] pb-24 pt-28 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog/"
          className="mb-10 inline-flex items-center gap-1 text-sm text-white/55 transition-colors hover:text-primary"
        >
          {dir === 'rtl' ? (
            <ArrowRight className="size-4" aria-hidden />
          ) : (
            <ArrowLeft className="size-4" aria-hidden />
          )}
          {t.blogPage.backToBlog}
        </Link>

        <header className="mb-10 max-w-4xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/45">
            {article.label[language]}
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {article.title[language]}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/65">
            {article.lead[language]}
          </p>
        </header>

        <div className="relative mb-14 aspect-[21/9] min-h-[220px] w-full overflow-hidden rounded-lg bg-black/50 sm:min-h-[280px] lg:min-h-[320px]">
          <Image
            src={article.image}
            alt={article.imageAlt[language]}
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
            unoptimized
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent px-4 py-5 sm:px-6 sm:py-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-wrap gap-8 text-sm">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wide text-white/55">
                    {t.blogPage.writtenBy}
                  </p>
                  <p className="mt-1 font-semibold text-white">YAPIO</p>
                </div>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wide text-white/55">
                    {t.blogPage.publishedOn}
                  </p>
                  <p className="mt-1 font-semibold text-white">{publishedLabel}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={copyLink}
                  className="inline-flex items-center gap-2 rounded-md border border-white/35 bg-black/30 px-3 py-2 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:border-white/60"
                >
                  {copied ? <Check className="size-3.5 text-emerald-400" /> : <Link2 className="size-3.5" />}
                  {copied ? t.blogPage.linkCopied : t.blogPage.copyLink}
                </button>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-9 items-center justify-center rounded-md border border-white/35 bg-black/30 text-white backdrop-blur-sm transition-colors hover:border-white/60"
                  aria-label={t.blogPage.shareLinkedIn}
                >
                  <Linkedin className="size-4" />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-9 items-center justify-center rounded-md border border-white/35 bg-black/30 text-white backdrop-blur-sm transition-colors hover:border-white/60"
                  aria-label={t.blogPage.shareFacebook}
                >
                  <Facebook className="size-4" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-9 items-center justify-center rounded-md border border-white/35 bg-black/30 text-xs font-bold text-white backdrop-blur-sm transition-colors hover:border-white/60"
                  aria-label={t.blogPage.shareX}
                >
                  𝕏
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className="grid gap-12 lg:grid-cols-12 lg:gap-14"
          dir={dir}
        >
          <aside className={cn('lg:col-span-4', asideOrder)}>
            <nav
              aria-label={t.blogPage.contents}
              className="lg:sticky lg:top-32"
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/45">
                {t.blogPage.contents}
              </p>
              <ul className="space-y-0 border-t border-white/10">
                {article.sections.map((section) => {
                  const active = activeId === section.id;
                  return (
                    <li key={section.id} className="border-b border-white/10">
                      <a
                        href={`#${section.id}`}
                        className={cn(
                          'group flex items-center justify-between gap-2 py-3.5 text-sm transition-colors',
                          active ? 'text-white' : 'text-white/55 hover:text-white/85'
                        )}
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          <span
                            className={cn(
                              'size-2 shrink-0 rounded-full border transition-colors',
                              active
                                ? 'border-emerald-400 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]'
                                : 'border-white/25 bg-transparent'
                            )}
                            aria-hidden
                          />
                          <span className="truncate font-medium">
                            {section.heading[language]}
                          </span>
                        </span>
                        <ArrowRight
                          className={cn(
                            'size-4 shrink-0 text-white/35 transition-transform group-hover:translate-x-0.5',
                            dir === 'rtl' && 'rotate-180'
                          )}
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          <div className={cn('lg:col-span-8', mainOrder)}>
            {article.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="mb-14 scroll-mt-36 last:mb-0"
              >
                <h2 className="mb-5 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {section.heading[language]}
                </h2>
                <div className="space-y-4 text-base leading-[1.75] text-white/72">
                  {section.paragraphs[language].map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
