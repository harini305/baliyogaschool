import images from '@/data/images.json';
import { PageHero, CtaBand } from '@/components/ui';
import { reviews } from '@/data/reviews';
import s from '../school.module.css';

export const metadata = {
  title: 'Student Reviews',
  description: 'Written reviews from Bali Yoga School students of the 200, 300 and 500 hour yoga teacher training courses.',
  alternates: { canonical: '/bali-yoga-school-reviews/' },
};

export default function Reviews() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'About', href: '/about-bali-yoga-school/' }, { label: 'Student reviews' }]}
        title="What our students say"
        lead="Written reviews shared by students of the teacher training courses, as published on the original reviews page. The reviews are undated and at least one dates from 2020–21."
        image="certificates-group"
      />
      <section className="section">
        <div className="container">
          <div className={s.reviewGrid}>
            {reviews.map((r) => {
              const im = images[r.image];
              return (
                <figure key={r.name} className={s.review} data-reveal>
                  <blockquote><p>“{r.text}”</p></blockquote>
                  <figcaption>
                    {im && <img src={im.src} alt="" width={96} height={96} loading="lazy" />}
                    <span><strong>{r.name}</strong><span>{r.course}</span></span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
