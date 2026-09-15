import { setRequestLocale } from 'next-intl/server';

export default async function SobrePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="mx-auto max-w-[720px] px-6 py-24">
      <h1 className="text-espresso font-serif text-[40px] font-bold">
        Sobre mim
      </h1>
      <p className="text-taupe mt-4 text-lg leading-relaxed">
        Conteúdo em breve.
      </p>
    </section>
  );
}
