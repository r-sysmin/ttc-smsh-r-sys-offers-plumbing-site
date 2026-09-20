import About from "@/components/About";
import Blog from "@/components/Blog";
import CTA from "@/components/CTA";
import Experience from "@/components/Experience";
import FeaturedWorks from "@/components/FeaturedWorks";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Solutions from "@/components/Solutions";
import Testimonials from "@/components/Testimonials";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header isDark={true} />
      <main>
        <Hero />
        <Experience />
        <Services />
        <FeaturedWorks />
        <About />
        <Solutions />
        <Testimonials />
        <Blog />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
