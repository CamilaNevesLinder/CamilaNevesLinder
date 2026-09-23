import { Sidebar } from '@/components/organisms/sidebar';
import { BottomNav } from '@/components/organisms/bottom-nav';
import { Footer } from '@/components/organisms/footer';

export function MainTemplate({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <div className="pb-14 pt-14 md:pb-0 md:pl-60 md:pt-0">
        <main>{children}</main>
        <Footer />
      </div>
      <BottomNav />
    </>
  );
}
