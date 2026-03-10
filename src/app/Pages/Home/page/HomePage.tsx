import HeroSection from "../../../Components/Organism/HeroSection";
import ProductGrid from "../../../Components/Organism/ProductGrid";
import NewsletterSubscribe from "../../../Components/Organism/NewsletterSubscribe";

export default function HomePage() {
  return (
    <>
      <HeroSection imageSrc="/Images/heroSectionPic.jpg" />
      <ProductGrid />
      <NewsletterSubscribe />
    </>
  );
}
