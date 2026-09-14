import Image from 'next/image';

const TAGS = [
  'TypeScript',
  'JavaScript',
  'React',
  'React Native',
  'NestJS',
  'Next.js',
];

export function Hero() {
  return (
    <section className="bg-cream flex min-h-[70vh] items-center justify-center px-6 py-16">
      <div className="border-rose/40 bg-cream/[0.18] w-full max-w-[960px] rounded-[30px] border p-[60px] shadow-[0_6px_18px_color-mix(in_srgb,var(--color-espresso)_6%,transparent)] backdrop-blur-md">
        <div className="flex items-center justify-between gap-7">
          <div>
            <p className="text-taupe mb-[18px] font-mono text-sm uppercase tracking-wide">
              Florianópolis, SC
            </p>
            <h1 className="font-display text-espresso text-[68px] font-bold leading-[0.95] tracking-tight">
              Camila Neves Linder
            </h1>
            <p className="text-rose text-[68px] font-bold italic leading-[0.95] tracking-tight">
              full stack developer.
            </p>
          </div>

          <div className="border-rose size-[180px] shrink-0 overflow-hidden rounded-[18px] border shadow-[0_6px_16px_color-mix(in_srgb,var(--color-espresso)_12%,transparent)]">
            <Image
              src="/camila.png"
              alt="Camila Neves Linder"
              width={180}
              height={180}
              priority
              className="size-full object-cover object-[center_20%]"
            />
          </div>
        </div>

        <div className="bg-rose/40 my-9 h-px w-full" />

        <p className="text-taupe text-[23px] leading-relaxed">
          Do banco de dados à interface, arquitetura, API e aplicação no ar.
        </p>

        <div className="mt-[26px] flex flex-wrap gap-2.5">
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="bg-rose/[0.32] text-espresso rounded-[3px] px-4 py-2 font-mono text-[15px] uppercase tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-[26px] flex flex-wrap items-center gap-[30px]">
          <a
            href="#work"
            className="text-espresso font-mono text-[17px] underline underline-offset-[5px]"
          >
            Ver trabalho →
          </a>
          <a
            href="#contact"
            className="text-espresso font-mono text-[17px] underline underline-offset-[5px]"
          >
            Entrar em contato →
          </a>
        </div>
      </div>
    </section>
  );
}
