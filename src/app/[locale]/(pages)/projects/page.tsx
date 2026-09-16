import { setRequestLocale } from 'next-intl/server';
import { ProjectsPage } from '@/components/pages/projects-page';

export default async function ProjectsRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProjectsPage />;
}
