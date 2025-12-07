import { FloatingOrbs } from "@/components/ui/FloatingOrbs";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { QuoteCarousel } from "@/components/landing/QuoteCarousel";
import { Footer } from "@/components/landing/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingOrbs />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <QuoteCarousel />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
