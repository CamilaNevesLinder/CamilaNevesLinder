import { setRequestLocale } from 'next-intl/server';
import { ContactPage } from '@/components/pages/contact-page';

export default async function ContactRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContactPage />;
}
