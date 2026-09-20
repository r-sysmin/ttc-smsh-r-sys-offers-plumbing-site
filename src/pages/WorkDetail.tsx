import CTA from "@/components/CTA";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Check, CheckCircle2, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Link, useParams } from "react-router-dom";

// Import images
import bathroomRemodel from "@/assets/bathroom-remodel.jpg";
import completedBathroom from "@/assets/completed-bathroom.jpg";
import completedKitchen from "@/assets/completed-kitchen.jpg";
import drainCleaning from "@/assets/drain-cleaning.jpg";
import faucetRepair from "@/assets/faucet-repair.jpg";
import heroGrid1 from "@/assets/hero-grid-1.jpg";
import heroGrid2 from "@/assets/hero-grid-2.jpg";
import heroGrid3 from "@/assets/hero-grid-3.jpg";
import heroGrid4 from "@/assets/hero-grid-4.jpg";
import problem1 from "@/assets/problem-1.png";
import problem2 from "@/assets/problem-11.png";
import solution1 from "@/assets/solution-1.png";
import solution2 from "@/assets/solution-11.png";

const worksData: Record<string, {
  image: string;
  title: string;
  description: string;
  detailTitle: string;
  detailDescription: string;
  overview: string[];
  client: string;
  budget: string;
  services: string;
  location: string;
  date: string;
  workSteps: { number: string; title: string; description: string }[];
  problems: string[];
  solutions: string[];
}> = {
  "bathroom-repair": {
    image: completedBathroom,
    title: "Bathroom Repair",
    description: "Complete bathroom renovation including new fixtures, modern plumbing installation, and water-efficient upgrades. Transformed an outdated space into a contemporary oasis.",
    detailTitle: "Revitalized Bathroom with Expert Repairs",
    detailDescription: "At mas viverra adipiscing at in tellus integer feugiat. Nibh praesent fusce id velit ut tortor. Sagittis id in a codnegue qoura semper eget. At lectus eros duis convallis. Proin odio semper et velit felis eget. Naque blandit!",
    overview: [
      "Neque sodales ut etiam sit amet poroz. Non telus orci ac auctor. Et id at lobortis tristique. At helta egestas sit a dus",
      "Non tellus erqu es libis consequat id id feugiat taborisam",
      "Non tellus orci ac auctor Ut blandit bibendum adipiscing liberra nequs dis. Et id at lobortis tristique a.",
    ],
    client: "Insight Studio",
    budget: "$300.00",
    services: "All Drain Cleaning",
    location: "3891 Ranchview, California 62639",
    date: "February 20, 2026",
    workSteps: [
      { number: "01", title: "Booking & Inspection", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." },
      { number: "02", title: "Work Planning", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." },
      { number: "03", title: "Fix And Install", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." },
      { number: "04", title: "Works Completed", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." }
    ],
    problems: ["Exceeding customer expectations with exceptional service and personalized care.", "Upholding honesty and transparency in all our interactions and business practices.", "Continuously adopting new technologies and methods to improve our services."],
    solutions: ["Implemented cutting-edge plumbing solutions to enhance efficiency and reliability.", "Provided comprehensive maintenance plans to ensure long-term performance.", "Utilized eco-friendly materials and practices to promote sustainability."]
  },
  "kitchen-repair": {
    image: completedKitchen,
    title: "Kitchen Repair",
    description: "Full kitchen plumbing overhaul featuring new sink installation, dishwasher connection, and garbage disposal setup. Enhanced functionality and water efficiency.",
    detailTitle: "Modern Kitchen Plumbing Excellence",
    detailDescription: "Complete transformation of the kitchen plumbing system with state-of-the-art fixtures and efficient water management solutions. Our expert team delivered exceptional results.",
    overview: [
      "Complete sink and faucet replacement with modern fixtures",
      "Dishwasher connection and drainage optimization",
      "Garbage disposal installation and pipe routing",
    ],
    client: "Home Solutions Inc",
    budget: "$450.00",
    services: "Kitchen Plumbing",
    location: "1542 Oak Street, California 94102",
    date: "January 15, 2026",
    workSteps: [
      { number: "01", title: "Booking & Inspection", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." },
      { number: "02", title: "Work Planning", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." },
      { number: "03", title: "Fix And Install", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." },
      { number: "04", title: "Works Completed", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." }
    ],
    problems: ["Exceeding customer expectations with exceptional service and personalized care.", "Upholding honesty and transparency in all our interactions and business practices.", "Continuously adopting new technologies and methods to improve our services."],
    solutions: ["Implemented cutting-edge plumbing solutions to enhance efficiency and reliability.", "Provided comprehensive maintenance plans to ensure long-term performance.", "Utilized eco-friendly materials and practices to promote sustainability."]
  },
  "plumbing-installation": {
    image: faucetRepair,
    title: "Plumbing Installation",
    description: "Professional pipe installation and fixture mounting for a new residential property. Ensured proper water pressure and drainage throughout the home.",
    detailTitle: "Complete Residential Plumbing Setup",
    detailDescription: "Full-scale plumbing installation for a newly constructed residential property, ensuring optimal water pressure and efficient drainage systems throughout the entire home.",
    overview: [
      "Main water line installation and pressure optimization",
      "Complete bathroom and kitchen fixture mounting",
      "Drainage system setup with proper venting",
    ],
    client: "BuildRight Construction",
    budget: "$1,200.00",
    services: "New Installation",
    location: "789 Maple Avenue, California 90001",
    date: "December 10, 2025",
    workSteps: [
      { number: "01", title: "Booking & Inspection", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." },
      { number: "02", title: "Work Planning", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." },
      { number: "03", title: "Fix And Install", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." },
      { number: "04", title: "Works Completed", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." }
    ],
    problems: ["Exceeding customer expectations with exceptional service and personalized care.", "Upholding honesty and transparency in all our interactions and business practices.", "Continuously adopting new technologies and methods to improve our services."],
    solutions: ["Implemented cutting-edge plumbing solutions to enhance efficiency and reliability.", "Provided comprehensive maintenance plans to ensure long-term performance.", "Utilized eco-friendly materials and practices to promote sustainability."]
  },
  "sewer-cleaning": {
    image: drainCleaning,
    title: "Sewer Cleaning",
    description: "Deep sewer line cleaning and maintenance service. Removed years of buildup to restore optimal flow and prevent future blockages.",
    detailTitle: "Professional Sewer Line Restoration",
    detailDescription: "Comprehensive sewer cleaning service using advanced hydro-jetting technology to remove years of accumulated debris and restore optimal flow to the entire drainage system.",
    overview: [
      "Video inspection to identify blockage locations",
      "High-pressure hydro-jetting for thorough cleaning",
      "Root removal and preventive treatment application",
    ],
    client: "Property Management Co",
    budget: "$550.00",
    services: "Sewer Cleaning",
    location: "2468 Pine Road, California 95814",
    date: "November 28, 2025",
    workSteps: [
      { number: "01", title: "Booking & Inspection", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." },
      { number: "02", title: "Work Planning", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." },
      { number: "03", title: "Fix And Install", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." },
      { number: "04", title: "Works Completed", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." }
    ],
    problems: ["Exceeding customer expectations with exceptional service and personalized care.", "Upholding honesty and transparency in all our interactions and business practices.", "Continuously adopting new technologies and methods to improve our services."],
    solutions: ["Implemented cutting-edge plumbing solutions to enhance efficiency and reliability.", "Provided comprehensive maintenance plans to ensure long-term performance.", "Utilized eco-friendly materials and practices to promote sustainability."]
  },
  "commercial-renovation": {
    image: bathroomRemodel,
    title: "Commercial Renovation",
    description: "Large-scale commercial plumbing project for a restaurant. Installed industrial-grade equipment and ensured compliance with health regulations.",
    detailTitle: "Restaurant Plumbing Compliance Project",
    detailDescription: "Complete commercial plumbing renovation for a high-volume restaurant, including industrial-grade equipment installation and full compliance with local health and safety regulations.",
    overview: [
      "Industrial dishwasher and grease trap installation",
      "Health code compliant drainage system setup",
      "Hot water system upgrade for commercial use",
    ],
    client: "Gourmet Dining Group",
    budget: "$3,500.00",
    services: "Commercial Plumbing",
    location: "555 Restaurant Row, California 92101",
    date: "October 5, 2025",
    workSteps: [
      { number: "01", title: "Booking & Inspection", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." },
      { number: "02", title: "Work Planning", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." },
      { number: "03", title: "Fix And Install", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." },
      { number: "04", title: "Works Completed", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." }
    ],
    problems: ["Exceeding customer expectations with exceptional service and personalized care.", "Upholding honesty and transparency in all our interactions and business practices.", "Continuously adopting new technologies and methods to improve our services."],
    solutions: ["Implemented cutting-edge plumbing solutions to enhance efficiency and reliability.", "Provided comprehensive maintenance plans to ensure long-term performance.", "Utilized eco-friendly materials and practices to promote sustainability."]
  },
  "emergency-repair": {
    image: heroGrid1,
    title: "Emergency Repair",
    description: "24/7 emergency response for a burst pipe. Quick action prevented significant water damage and restored service within hours.",
    detailTitle: "Rapid Emergency Pipe Repair",
    detailDescription: "Swift emergency response to a burst pipe situation, preventing extensive water damage through quick action and professional repair work completed within hours of the initial call.",
    overview: [
      "Immediate water shutoff and damage assessment",
      "Emergency pipe replacement and leak sealing",
      "Water damage prevention and cleanup coordination",
    ],
    client: "Johnson Family",
    budget: "$280.00",
    services: "Emergency Services",
    location: "123 Elm Street, California 94601",
    date: "September 18, 2025",
    workSteps: [
      { number: "01", title: "Booking & Inspection", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." },
      { number: "02", title: "Work Planning", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." },
      { number: "03", title: "Fix And Install", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." },
      { number: "04", title: "Works Completed", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." }
    ],
    problems: ["Exceeding customer expectations with exceptional service and personalized care.", "Upholding honesty and transparency in all our interactions and business practices.", "Continuously adopting new technologies and methods to improve our services."],
    solutions: ["Implemented cutting-edge plumbing solutions to enhance efficiency and reliability.", "Provided comprehensive maintenance plans to ensure long-term performance.", "Utilized eco-friendly materials and practices to promote sustainability."]
  },
};

const WorkDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const work = slug ? worksData[slug] : null;

  if (!work) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Work Not Found</h1>
          <Link to="/work" className="text-primary hover:underline">
            Back to Work
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 lg:pt-32 bg-card">
        <div className="container-custom section-padding">
          {/* Breadcrumb */}
          <FadeIn>
            <div className="text-muted-foreground text-sm mb-4 text-center">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/work" className="hover:text-primary transition-colors">Work</Link>
            </div>
          </FadeIn>

          {/* Title */}
          <FadeIn delay={100}>
            <h1 className="text-black font-bold text-center mb-4">{work.title}</h1>
          </FadeIn>

          {/* Description */}
          <FadeIn delay={200}>
            <p className="text-muted-foreground font-medium text-center max-w-2xl mx-auto mb-12">
              {work.description}
            </p>
          </FadeIn>

          {/* Hero Image */}
          <FadeIn delay={300}>
            <div className="rounded-2xl overflow-hidden">
              <img
                src={work.image}
                alt={work.title}
                className="w-full h-[300px] md:h-[500px] object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Work Details Section */}
      <section className="bg-card">
        <div className="container-custom pt-20 section-padding">
          <div className="grid lg:grid-cols-3 gap-0">
            {/* Left Content */}
            <div className="lg:col-span-2 max-w-[640px]">
              <FadeIn>
                <span className="text-primary font-bold uppercase tracking-wider">
                  Work Details
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-black mt-2 mb-6">
                  {work.detailTitle}
                </h2>
                <p className="text-muted-foreground font-medium leading-relaxed mb-8">
                  {work.detailDescription}
                </p>
              </FadeIn>

              <FadeIn delay={100}>
                <h3 className="text-2xl font-bold text-black mb-4">Overview</h3>
                <p className="text-muted-foreground font-medium mb-6">
                  Amet erat consetetur in sit id volutpat. Sit quidtincm porsenris sem faibua
                  eget et sem. Ut blandit librero tabendum adipiscing liberra neque dis.
                </p>
              </FadeIn>

              <FadeIn delay={200}>
                <ul className="space-y-4">
                  {work.overview.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-muted-foreground font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1 min-w-[460px] -translate-x-[55px]">
              <FadeIn delay={300}>
                <div className="bg-[#f4f4f7] rounded-2xl p-8 shadow-sm">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <span className="text-black text-2xl font-bold">Client</span>
                      <p className="text-muted-foreground font-semibold">{work.client}</p>
                    </div>

                    <div className="space-y-2">
                      <span className="text-black text-2xl font-bold">Budget</span>
                      <p className="text-muted-foreground font-semibold">{work.budget}</p>
                    </div>

                    <div className="space-y-2">
                      <span className="text-black text-2xl font-bold">Services</span>
                      <p className="text-muted-foreground font-semibold">{work.services}</p>
                    </div>

                    <div className="space-y-2">
                      <span className="text-black text-2xl font-bold">Location</span>
                      <p className="text-muted-foreground font-semibold">{work.location}</p>
                    </div>

                    <div className="space-y-2">
                      <span className="text-black text-2xl font-bold">Date</span>
                      <p className="text-muted-foreground font-semibold">{work.date}</p>
                    </div>

                    <div>
                      <span className="text-black text-2xl font-bold block mb-3">Share On</span>
                      <div className="flex gap-3">
                        <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white hover:bg-secondary/90 transition-colors">
                          <Facebook className="w-4 h-4" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white hover:bg-secondary/90 transition-colors">
                          <Twitter className="w-4 h-4" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white hover:bg-secondary/90 transition-colors">
                          <Linkedin className="w-4 h-4" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white hover:bg-secondary/90 transition-colors">
                          <Instagram className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card lg:py-32 pb-8 lg:pb-16">
        <div className="grid gap-12 lg:grid-cols-2 container-custom section-padding">
          {/* Left - 2x2 Image Grid */}
          <div className="flex gap-8 h-fit">
            <div className="flex flex-col gap-4">
              <FadeIn delay={100}>
                <div className="rounded-xl overflow-hidden mt-12 h-[320px]">
                  <img
                    src={heroGrid1}
                    alt="Working process 1"
                    className="w-full h-full object-cover"
                  />
                </div>
              </FadeIn>
              <FadeIn delay={200}>
                <div className="rounded-xl overflow-hidden h-[280px]">
                  <img
                    src={heroGrid2}
                    alt="Working process 2"
                    className="w-full h-full object-cover"
                  />
                </div>
              </FadeIn>
            </div>
            <div className="flex flex-col gap-4">
              <FadeIn delay={100}>
                <div className="rounded-xl overflow-hidden h-[290px]">
                  <img
                    src={heroGrid3}
                    alt="Working process 3"
                    className="w-full h-full object-cover"
                  />
                </div>
              </FadeIn>
              <FadeIn delay={200}>
                <div className="rounded-xl overflow-hidden h-[310px]">
                  <img
                    src={heroGrid4}
                    alt="Working process 4"
                    className="w-full h-full object-cover"
                  />
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <FadeIn>
              <p className="text-primary font-bold mb-4">Working Process</p>
              <h3 className="text-4xl md:text-5xl font-bold text-secondary mb-4">Process We Follow</h3>
              <p className="text-muted-foreground max-w-2xl mb-12">
                Sagittis orci a scelerisque purus semper eget. At lectus urna duis convallis. Porta nibh venenatis cras sed felis eget. Neque laoreet
              </p>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-x-8 gap-y-10">
              {work.workSteps.map((step, index) => (
                <FadeIn key={index} delay={index * 100}>
                  <div className="flex flex-col gap-4">
                    <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center flex-shrink-0">
                      <span className="text-primary text-lg font-bold">{step.number}</span>
                    </div>
                    <div>
                      <h5 className="text-xl font-bold text-secondary mb-2">{step.title}</h5>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-card lg:py-16 pb-8 lg:pb-16">
        <div className="container-custom section-padding">
          <div className="flex justify-center flex-col items-center w-full mb-20">
            <h2 className="text-black font-bold mb-4">Problem & Solution</h2>
            <p className="text-muted-foreground font-medium text-center max-w-2xl">At risus viverra adipiscing at in tellus integer feugiat. Nisl pretium fusce id velit ut tortor. Sagittis orci a scelerisque purus semper eget. At lectus urna duis convallis.</p>
          </div>

          <div className="space-y-24">

            <FadeIn>
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                <div>
                  <h3 className="text-black font-bold mb-4">Problem</h3>
                  <p className="text-muted-foreground mb-8 font-semibold text-justify leading-relaxed">
                    Amet orci euismod in mi elit aliquam. Sit sollicitudin posuere arcu sem facilisis eget sit enim. Ut blandit laoreet bibendum adipiscing libero neque dui. Nisl pretium fusce id velit ut tortor. Sagittis orci a scelerisque purus semper eget.
                  </p>
                  <ul className="space-y-4">
                    {work.problems.map((problem, index) => <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 text-secondary fill-primary stroke-white flex-shrink-0" />
                      <span className="text-muted-foreground text-lg">{problem}</span>
                    </li>)}
                  </ul>
                </div>
                {/* Right - Image */}
                <FadeIn className="h-[90%]">
                  <div className="relative h-full">
                    <div className="rounded-3xl h-full overflow-hidden">
                      <img src={problem1} alt="Aquafix professional team" className="h-full object-cover" />
                    </div>
                    {/* Experience Badge */}
                    <div className="absolute -bottom-12 w-[240px] h-[240px] -left-12 border-8 border-white overflow-hidden rounded-xl text-white">
                      <img src={problem2} alt="Aquafix professional team" className="h-full object-cover " />
                    </div>
                  </div>
                </FadeIn>
              </div>
            </FadeIn>
            {/* Solutions */}
            <FadeIn>
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left - Image */}
                <FadeIn>
                  <div className="relative">
                    <div className="rounded-3xl overflow-hidden">
                      <img src={solution1} alt="Aquafix professional team" className="w-full h-auto object-cover" />
                    </div>
                    {/* Experience Badge */}
                    <div className="absolute -bottom-12 w-[240px] h-[240px] -right-12 border-8 border-white overflow-hidden rounded-xl text-white">
                      <img src={solution2} alt="Aquafix professional team" className="h-full object-cover " />
                    </div>
                  </div>
                </FadeIn>
                <div>
                  <h3 className="text-black font-bold mb-4">Solutions</h3>
                  <p className="text-muted-foreground mb-8 font-semibold text-justify leading-relaxed">
                    Amet orci euismod in mi elit aliquam. Sit sollicitudin posuere arcu sem facilisis eget sit enim. Ut blandit laoreet bibendum adipiscing libero neque dui. Nisl pretium fusce id velit ut tortor. Sagittis orci a scelerisque purus semper eget.
                  </p>
                  <ul className="space-y-4">
                    {work.solutions.map((solution, index) => <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 text-secondary fill-primary stroke-white flex-shrink-0" />
                      <span className="text-muted-foreground text-lg">{solution}</span>
                    </li>)}
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
};

export default WorkDetail;
