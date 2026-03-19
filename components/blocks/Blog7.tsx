'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export interface Blog7Post {
  id: string;
  title: string;
  summary: string;
  label: string;
  author: string;
  published: string;
  url: string;
  image: string;
  imageAlt?: string;
}

export interface Blog7Props {
  tagline: string;
  heading: string;
  description: string;
  buttonText?: string;
  buttonUrl?: string;
  posts: Blog7Post[];
  readMoreLabel: string;
}

export function Blog7({
  tagline,
  heading,
  description,
  buttonText,
  buttonUrl,
  posts,
  readMoreLabel,
}: Blog7Props) {
  const showCta = Boolean(buttonText && buttonUrl);

  return (
    <section className="py-24 md:py-32" id="articles">
      <div className="container mx-auto flex max-w-7xl flex-col items-center gap-14 px-4 lg:px-8">
        <div className="text-center">
          <span className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-semibold text-white/90">
            {tagline}
          </span>
          <h2 className="mb-3 text-balance text-3xl font-semibold tracking-tight text-white md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
            {heading}
          </h2>
          <p className="mb-8 max-w-2xl text-pretty text-white/65 md:text-base lg:text-lg">
            {description}
          </p>
          {showCta && (
            <Link
              href={buttonUrl!}
              className="inline-flex items-center text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              {buttonText}
              <ArrowRight className="ml-2 size-4" />
            </Link>
          )}
        </div>
        <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="grid grid-rows-[auto_auto_1fr_auto] overflow-hidden rounded-lg border border-white/[0.08] bg-[rgba(255,255,255,0.03)] text-white shadow-sm"
            >
              <div className="relative aspect-[16/9] w-full bg-black/40">
                <Link
                  href={post.url}
                  className="block h-full transition-opacity duration-200 hover:opacity-85"
                >
                  <Image
                    src={post.image}
                    alt={post.imageAlt || post.title}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized
                  />
                </Link>
                <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/90 backdrop-blur-sm">
                  {post.label}
                </span>
              </div>
              <div className="flex flex-col space-y-1.5 p-6 pb-2">
                <h3 className="text-lg font-semibold leading-snug text-white md:text-xl">
                  <Link href={post.url} className="hover:underline">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-xs text-white/45">
                  {post.author} · {post.published}
                </p>
              </div>
              <div className="px-6 pb-2">
                <p className="text-sm leading-relaxed text-white/65">{post.summary}</p>
              </div>
              <div className="flex items-center p-6 pt-2">
                <Link
                  href={post.url}
                  className="inline-flex items-center text-sm font-medium text-white hover:text-primary hover:underline"
                >
                  {readMoreLabel}
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
