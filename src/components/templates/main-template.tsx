import { Sidebar } from '@/components/organisms/sidebar';
import { Footer } from '@/components/organisms/footer';

export function MainTemplate({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <div className="pt-14 md:pl-60 md:pt-0">
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
