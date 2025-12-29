import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#0B1220] text-white min-h-screen">
      <SiteHeader />
      <div className="pt-16">
        <div className="container mx-auto px-6 max-w-4xl w-full">{children}</div>
      </div>
      <SiteFooter />
    </div>
  );
}
