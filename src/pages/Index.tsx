
import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { BrandShowcase } from "@/components/home/BrandShowcase";
import { Features } from "@/components/home/Features";
import { Newsletter } from "@/components/home/Newsletter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <FeaturedProducts />
        <CategoryShowcase />
        <Features />
        <BrandShowcase />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
};

export default Index;
