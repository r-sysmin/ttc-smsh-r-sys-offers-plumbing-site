import CTA from "@/components/CTA";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Link } from "react-router-dom";

// Import existing images for works
import work1 from "@/assets/work-1.png";
import work2 from "@/assets/work-2.png";
import work3 from "@/assets/work-3.png";
import work4 from "@/assets/work-4.png";
import work5 from "@/assets/work-5.png";
import work6 from "@/assets/work-6.png";

const works = [
  {
    slug: "bathroom-repair",
    image: work1,
    title: "Bathroom Repair",
    description: "Complete bathroom renovation including new fixtures, modern plumbing installation, and water-efficient upgrades. Transformed an outdated space into a contemporary oasis."
  },
  {
    slug: "kitchen-repair",
    image: work2,
    title: "Kitchen Repair",
    description: "Full kitchen plumbing overhaul featuring new sink installation, dishwasher connection, and garbage disposal setup. Enhanced functionality and water efficiency."
  },
  {
    slug: "plumbing-installation",
    image: work3,
    title: "Plumbing Installation",
    description: "Professional pipe installation and fixture mounting for a new residential property. Ensured proper water pressure and drainage throughout the home."
  },
  {
    slug: "sewer-cleaning",
    image: work4,
    title: "Sewer Cleaning",
    description: "Deep sewer line cleaning and maintenance service. Removed years of buildup to restore optimal flow and prevent future blockages."
  },
  {
    slug: "commercial-renovation",
    image: work5,
    title: "Commercial Renovation",
    description: "Large-scale commercial plumbing project for a restaurant. Installed industrial-grade equipment and ensured compliance with health regulations."
  },
  {
    slug: "emergency-repair",
    image: work6,
    title: "Emergency Repair",
    description: "24/7 emergency response for a burst pipe. Quick action prevented significant water damage and restored service within hours."
  }
];

const Work = () => {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section with Work Cards */}
      <section className="pt-20 lg:pt-32 bg-white">
        <div className="container-custom section-padding">
          {/* Breadcrumb */}
          <div className="text-muted-foreground text-sm mb-4">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-primary">Work</span>
          </div>

          {/* Header */}
          <div className="flex max-md:flex-col gap-8 mb-16 justify-between">
            <h1 className="text-black text-7xl font-bold">Completed Works</h1>
            <p className="text-muted-foreground max-w-[468px] text-lg font-medium lg:pt-4">
              Expert Plumbing Solutions Tailored to Fulfill Your Home Repair and Maintenance Needs
            </p>
          </div>

          {/* Work Cards Grid - 2 columns */}
          <div className="grid md:grid-cols-2 gap-8 gap-y-16">
            {works.map((work, index) => (
              <FadeIn key={index} delay={index * 100}>
                <Link to={`/work/${work.slug}`} className="group cursor-pointer block">
                  {/* Image */}
                  <div className="overflow-hidden rounded-2xl mb-6">
                    <img
                      src={work.image}
                      alt={work.title}
                      className="w-full h-[420px] object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Content */}
                  <h5 className="text-black text-4xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {work.title}
                  </h5>
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    {work.description}
                  </p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>


      <CTA />

      <Footer />
    </div>
  );
};

export default Work;
