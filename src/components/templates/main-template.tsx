import { Sidebar } from '@/components/organisms/sidebar';

export function MainTemplate({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <main className="pt-14 md:pl-60 md:pt-0">{children}</main>
    </>
  );
}
