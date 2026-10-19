import { notFound } from 'next/navigation';
import ProgrammePage from '@/components/ProgrammePage';
import { courseProgrammes, programmeBySlug } from '@/lib/catalog';

export const dynamicParams = false;

export function generateStaticParams() {
  return courseProgrammes().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = programmeBySlug(slug);
  if (!p) return {};
  return { title: p.metaTitle || p.title, description: p.metaDescription || p.summary, alternates: { canonical: p.path } };
}

export default async function CoursePage({ params }) {
  const { slug } = await params;
  const p = programmeBySlug(slug);
  if (!p || !p.path.startsWith('/courses/')) notFound();
  return <ProgrammePage p={p} />;
}
