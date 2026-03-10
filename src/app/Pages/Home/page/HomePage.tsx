import HeroSection from "../../../Components/Organism/HeroSection";
import ProductGrid from "../../../Components/Organism/ProductGrid";
import NewsletterSubscribe from "../../../Components/Organism/NewsletterSubscribe";
import { getStorageAsset } from "@/lib/storage";


export default function HomePage() {
  return (
    <>
      <HeroSection imageSrc={getStorageAsset("watch_banner.png")} />
      <ProductGrid />
      <NewsletterSubscribe />
    </>
  );
}
