import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import IndustryFilters from "@/components/IndustryFilters";
import TemplateGallery from "@/components/TemplateGallery";
import CreateCv from "../components/Feature.tsx";
import Header from "../components/Header.tsx";
import TemplatesHead from "../components/TemplatesHead.tsx";


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
      <CreateCv />
      <HowItWorks />
      <Footer />
    </main>
  );
}
