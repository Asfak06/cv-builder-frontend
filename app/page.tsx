import Feature from "@/components/Feature";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import IndustryFilters from "@/components/IndustryFilters";
import TemplateGallery from "@/components/TemplateGallery";
import TemplatesHead from "@/components/TemplatesHead";



export default function HomePage() {
  return (
    <main className="w-full">
      <Header />
      <Hero />
      <section id="templates" className="py-[100px] bg-gray-100">
        <TemplatesHead />
        <IndustryFilters />
        <TemplateGallery />
      </section>
      <Feature />
      <HowItWorks />
      <Footer />
    </main>
  );
}
