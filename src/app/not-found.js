import Link from 'next/link';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <section className="section section--cream" style={{ minHeight: '50vh' }}>
      <div className="container narrow">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p>The page you are looking for may have moved. Many older pages from the previous website now redirect to their closest equivalent.</p>
        <div className="btn-row">
          <Link className="btn btn--primary" href="/courses/">Browse courses</Link>
          <Link className="btn btn--secondary" href="/">Home</Link>
        </div>
      </div>
    </section>
  );
}
