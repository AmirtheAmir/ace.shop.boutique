import HeroSection from "../../Components/Organism/HeroSection";
import ProductGrid from "../../Components/Organism/ProductGrid";
import NewsletterSubscribe from "../../Components/Organism/NewsletterSubscribe";
import ViewAllButton from "../../Components/Atoms/ViewAllButton";
import { getStorageAsset } from "@/lib/storage";

export default function HomePage() {
  return (
    <>
      <HeroSection imageSrc={getStorageAsset("watch_banner.png")} />

      <div className="flex flex-col gap-4">
        <ProductGrid />

        <div className="flex justify-center">
          <ViewAllButton href="/collection/all" />
        </div>
      </div>

      <NewsletterSubscribe />
    </>
  );
}