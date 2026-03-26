import { HeroSection } from "@/components/home/HeroSection";
import { AppsShowcase } from "@/components/home/AppsShowcase";
import { RecentArticles } from "@/components/home/RecentArticles";
import { RecentMaterials } from "@/components/home/RecentMaterials";
import { CTABanner } from "@/components/home/CTABanner";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AppsShowcase />
      <RecentArticles />
      <RecentMaterials />
      <CTABanner />
    </>
  );
}
