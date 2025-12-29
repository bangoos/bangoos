import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#0B1220] text-slate-50 min-h-screen">
      <SiteHeader />
      <div className="pt-16">{children}</div>
      <SiteFooter />
    </div>
  );
}
