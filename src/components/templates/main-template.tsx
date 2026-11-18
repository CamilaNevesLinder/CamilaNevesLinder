import { BottomNav } from '@/components/organisms/bottom-nav';
import { Footer } from '@/components/organisms/footer';
import { SiteHeader } from '@/components/organisms/site-header';

export function MainTemplate({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="pb-28 md:pb-0">
        <SiteHeader />
        <main>{children}</main>
        <Footer />
      </div>
      <BottomNav />
    </>
  );
}
