import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import IndustryFilters from "@/components/IndustryFilters";
import TemplateGallery from "@/components/TemplateGallery";


export default function HomePage() {
  return (
    <main className="w-full">
      <Hero />
      <section id="templates" className="py-16 bg-gray-100">
        <IndustryFilters />
        <TemplateGallery />
      </section>
      <HowItWorks />
      <Footer />
    </main>
  );
}
