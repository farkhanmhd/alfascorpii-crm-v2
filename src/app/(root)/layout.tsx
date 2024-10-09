import Sidenav from "@/components/fragments/sidenav";
import SectionHeader from "@/components/fragments/header/SectionHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidenav />
      <main className="h-screen w-screen pl-[400px] pt-14">
        <SectionHeader />
        {children}
      </main>
    </>
  );
}
