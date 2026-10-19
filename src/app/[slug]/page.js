import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProgrammePage from '@/components/ProgrammePage';
import HubPage from '@/components/HubPage';
import RichSections from '@/components/RichSections';
import Img from '@/components/Img';
import { Breadcrumbs, Faq, CtaBand } from '@/components/ui';
import { rootProgrammes, programmeBySlug } from '@/lib/catalog';
import { hubSlugs, getHub } from '@/lib/hubs';
import { BLOG_SLUGS, blogPost, formatDate } from '@/lib/pages';

// Root-level original URLs: retreats, one-to-one sessions, hub listings and retained blog articles.
export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...rootProgrammes().map((p) => ({ slug: p.slug })),
    ...hubSlugs().map((slug) => ({ slug })),
    ...BLOG_SLUGS.map((slug) => ({ slug })),
  ];
}

function resolve(slug) {
  const p = programmeBySlug(slug);
  if (p && !p.path.startsWith('/courses/')) return { type: 'programme', data: p };
  const hub = getHub(slug);
  if (hub) return { type: 'hub', data: hub };
  const post = blogPost(slug);
  if (post) return { type: 'post', data: post };
  return null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const r = resolve(slug);
  if (!r) return {};
  const d = r.data;
  return { title: d.metaTitle || d.title, description: d.metaDescription || d.summary || d.excerpt, alternates: { canonical: `/${slug}/` } };
}

function Article({ post }) {
  return (
    <>
      <article>
        <header className="section section--cream" style={{ paddingBottom: 'var(--space-6)' }}>
          <div className="container narrow">
            <Breadcrumbs items={[{ label: 'Blog', href: '/blog/' }, { label: post.title }]} />
            <h1 data-hero-in>{post.title}</h1>
            <p className="muted small" data-hero-in>
              {formatDate(post.date)}{post.author ? ` · ${post.author}` : ''}
            </p>
          </div>
        </header>
        {post.image && (
          <div className="container narrow" style={{ marginTop: 'var(--space-6)' }}>
            <div className="frame" style={{ aspectRatio: '16 / 9' }}><Img name={post.image} priority sizes="(min-width: 840px) 760px, 100vw" /></div>
          </div>
        )}
        <div className="section">
          <div className="container narrow">
            <div className="prose" style={{ marginBottom: 'var(--space-6)' }}>{(post.intro || []).map((t, i) => <p key={i}>{t}</p>)}</div>
            <RichSections sections={post.sections} mode="prose" />
            {post.faqs?.filter((f) => f.a).length > 0 && (
              <div style={{ marginTop: 'var(--space-7)' }}>
                <h2>Questions</h2>
                <Faq items={post.faqs.filter((f) => f.a)} />
              </div>
            )}
            <p style={{ marginTop: 'var(--space-7)' }}><Link className="text-link" href="/blog/">Back to the blog</Link></p>
          </div>
        </div>
      </article>
      <CtaBand />
    </>
  );
}

export default async function RootSlugPage({ params }) {
  const { slug } = await params;
  const r = resolve(slug);
  if (!r) notFound();
  if (r.type === 'programme') return <ProgrammePage p={r.data} />;
  if (r.type === 'hub') return <HubPage hub={r.data} />;
  return <Article post={r.data} />;
}
