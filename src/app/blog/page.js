import Link from 'next/link';
import Img from '@/components/Img';
import { PageHero } from '@/components/ui';
import { blogPosts, formatDate } from '@/lib/pages';
import s from './blog.module.css';

export const metadata = {
  title: 'Blog',
  description: 'Articles from Bali Yoga School about Yin yoga teacher training and sound healing training in Ubud.',
  alternates: { canonical: '/blog/' },
};

export default function Blog() {
  const posts = blogPosts();
  return (
    <>
      <PageHero crumbs={[{ label: 'Blog' }]} eyebrow="Blog" title="From the blog" lead="Selected articles from Bali Yoga School." />
      <section className="section">
        <div className="container">
          <div className={s.list}>
            {posts.map((p) => (
              <article key={p.slug} className={s.post} data-reveal>
                <div className={`frame ${s.image}`}>{p.image && <Img name={p.image} sizes="(min-width: 768px) 320px, 100vw" alt="" />}</div>
                <div>
                  <p className="small muted">{formatDate(p.date)}</p>
                  <h2 className={s.title}><Link href={p.path}>{p.title}</Link></h2>
                  <p>{p.excerpt}</p>
                  <Link className="text-link" href={p.path} aria-hidden="true" tabIndex={-1}>Read article</Link>
                </div>
              </article>
            ))}
          </div>
          <p className="notice" style={{ marginTop: 'var(--space-7)' }}>
            <strong>Archive not migrated.</strong> The original site has about 385 blog posts. Only articles whose full text was captured and checked are included here; whether the rest of the archive moves to the new site is awaiting a decision.
          </p>
        </div>
      </section>
    </>
  );
}
