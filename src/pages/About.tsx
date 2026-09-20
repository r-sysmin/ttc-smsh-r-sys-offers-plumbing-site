import plumberTeam from "@/assets/about-hero-1.png";
import mission from "@/assets/mission-1.png";
import vision from "@/assets/mission-2.png";
import profile1 from "@/assets/profile-1.png";
import profile2 from "@/assets/profile-2.png";
import profile3 from "@/assets/profile-3.png";
import profile4 from "@/assets/profile-4.png";
import profile5 from "@/assets/profile-5.png";
import profile6 from "@/assets/profile-6.png";
import heroGrid1 from "@/assets/timeline-1.png";
import heroGrid2 from "@/assets/timeline-2.png";
import heroGrid3 from "@/assets/timeline-3.png";
import heroGrid4 from "@/assets/timeline-4.png";
import CounterAnimation from "@/components/CounterAnimation";
import CTA from "@/components/CTA";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useCareers } from "@/hooks/useCareers";
import { ArrowUpRight, Briefcase, CheckCircle2, Clock3, Heart, MapPin, Shield, ShieldCheck, Users, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
const stats = [{
  value: 18,
  suffix: "+",
  label: "Year Experience",
  decimals: 0
}, {
  value: 12,
  suffix: "+",
  label: "Award Achieved",
  decimals: 0
}, {
  value: 25,
  suffix: "k",
  label: "Happy Clients",
  decimals: 0
}, {
  value: 25,
  suffix: "+",
  label: "Qualified Experts",
  decimals: 0
}];
const timelineData = [{
  year: "1996",
  title: "Company Establishment",
  description: "Aquafix started as a small local plumbing business and has grown into a trusted name in the industry. With decades of experience, we've earned a reputation for delivering reliable and high-quality plumbing services.",
  image: heroGrid1,
  position: "left"
}, {
  year: "2005",
  title: "Our Journey",
  description: "Aquafix began with a simple goal of providing exceptional plumbing solutions. Over the years, we've built a strong reputation for reliability, quality, and customer satisfaction, becoming a leader in the plumbing industry.",
  image: heroGrid2,
  position: "right"
}, {
  year: "2012",
  title: "Our Story",
  description: "From humble beginnings, Aquafix has evolved into a respected plumbing service provider. With years of expertise, we specialize in offering dependable services, focusing on excellence and care for our customers.",
  image: heroGrid3,
  position: "left"
}, {
  year: "2024",
  title: "Aquafix Overview",
  description: "Aquafix began as a local plumbing business and quickly grew into a well-known provider of expert services. Our focus on quality, reliability, and customer satisfaction has made us a trusted name in the industry.",
  image: heroGrid4,
  position: "right"
}];
const coreValues = [{
  title: "Highly Expert Team",
  description: "Our team comprises highly skilled team who bring years of experience and expertise to every project.",
  icon: Users
}, {
  title: "Quick Process",
  description: "We understand the importance of efficiency, which is why we prioritize a streamlined process for our clients.",
  icon: Zap
}, {
  title: "Anytime Service",
  description: "Emergencies can happen at any time, which is why we offer round-the-clock service to our clients.",
  icon: Clock3
}, {
  title: "Strong Commitment",
  description: "We are deeply committed to our clients' satisfaction. Our dedication to excellence is evident in our attention to detail.",
  icon: Heart
}, {
  title: "Responsibility",
  description: "We adhere to the highest ethical standards, prioritize safety in all our operations, and actively engage.",
  icon: Shield
}, {
  title: "Safety First",
  description: "The safety and well-being of our clients providing ongoing training, and equipping our team with the necessary tools.",
  icon: ShieldCheck
}];
const missionFeatures = ["Exceeding customer expectations with exceptional service and personalized care.", "Upholding honesty and transparency in all our interactions and business practices.", "Continuously adopting new technologies and methods to improve our services."];
const visionFeatures = ["Embrace new technologies and methods to enhance our service offerings.", "Build long-lasting relationships with our clients through integrity and transparency.", "Make a positive impact in the communities we serve through active engagement and support."];
const teamMembers = [{
  name: "Wade Warren",
  role: "Chief Repair",
  image: profile1
}, {
  name: "Brooklyn Simmons",
  role: "Installation and repairs",
  image: profile2
}, {
  name: "Robert Fox",
  role: "Technical evaluator",
  image: profile3
}, {
  name: "Darlene Robertson",
  role: "Technical evaluator",
  image: profile4
}, {
  name: "Kristin Watson",
  role: "Installation and repairs",
  image: profile5
}, {
  name: "Ralph Edwards",
  role: "Installation and repairs",
  image: profile6
}];
const FlipButton = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return <button className="group relative px-8 py-4 bg-white border-primary rounded-full overflow-hidden border">
    <span className="relative block overflow-hidden h-6">
      <span className="block transition-transform duration-300 group-hover:-translate-y-full text-primary font-semibold">
        {children}
      </span>
      <span className="absolute top-full left-0 block transition-transform duration-300 group-hover:-translate-y-full text-primary font-semibold">
        {children}
      </span>
    </span>
  </button>;
};

const About = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [animatedYears, setAnimatedYears] = useState<Set<number>>(new Set());
  const { data: careers, isLoading: careersLoading } = useCareers();

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const rect = timelineRef.current.getBoundingClientRect();
      const timelineHeight = timelineRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate how much of the timeline has been scrolled past
      const startOffset = windowHeight * 0.9; // Start filling when timeline is 10% from top
      const scrolled = startOffset - rect.top;
      const totalScrollable = timelineHeight + startOffset - windowHeight * 0.3;

      const progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);
      setScrollProgress(progress);

      // Track which years have become active
      timelineData.forEach((_, index) => {
        const itemProgress = (index + 1) / timelineData.length;
        const isActive = progress >= itemProgress - 0.15;
        if (isActive && !animatedYears.has(index)) {
          setAnimatedYears(prev => new Set(prev).add(index));
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [animatedYears]);
  return <div className="min-h-screen">
    <Header />
    <main>
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pb-32 bg-primary-foreground text-primary">
        <div className="container-custom section-padding text-primary-foreground">
          <FadeIn>
            <div className="flex lg:flex-row w-full flex-col gap-12 items-end justify-between mb-12">
              <div>
                <h1 className="leading-tight text-black font-bold text-6xl">
                  Quality Plumbing<br />and Reliable Service
                </h1>
              </div>
              <div className="flex max-w-[468px] items-center">
                <p className="text-black text-justify">
                  Experience top-notch plumbing solutions and dependable service. Our commitment to quality ensures your plumbing needs are met with reliability and expertise.
                </p>
              </div>
            </div>
          </FadeIn>
          <FadeIn>
            {/* Hero Image with Stats */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden">
                <img src={plumberTeam} alt="Quality Plumbing Service" className="w-full h-[400px] lg:h-[500px] object-cover" />
              </div>

              {/* Stats Overlay */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white rounded-2xl shadow-xl px-8 py-6">
                <div className="flex divide-x divide-gray-200">
                  {stats.map((stat, index) => <div key={index} className="px-6 first:pl-0 last:pr-0 text-center">
                    <div className="flex items-baseline justify-center gap-0.5 text-4xl md:text-5xl font-bold mb-1 text-primary">
                      <CounterAnimation
                        target={stat.value}
                        decimals={stat.decimals}
                        suffix={stat.suffix}
                        duration={2000}
                        suffixClassName="text-tertiary "
                      />
                    </div>
                    <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
                  </div>)}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-32 lg:py-40 bg-primary">
        <div className="container-custom section-padding">
          <div className="text-center mb-16">
            <p className="text-tertiary font-bold mb-4">Our Story</p>
            <h2 className="text-white">Know More About Us</h2>
          </div>

          {/* Timeline */}
          <div className="relative" ref={timelineRef}>
            {/* Center Line - Background */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/20 -translate-x-1/2 hidden lg:block" />

            {/* Center Line - Animated Fill */}
            <div
              className="absolute left-1/2 top-0 w-0.5 bg-tertiary -translate-x-1/2 hidden lg:block transition-all duration-100 ease-out"
              style={{ height: `${scrollProgress * 100}%` }}
            />

            <div className="space-y-16">
              {timelineData.map((item, index) => {
                const itemProgress = (index + 1) / timelineData.length;
                const isActive = scrollProgress >= itemProgress - 0.15;
                const hasBeenAnimated = animatedYears.has(index);
                const shouldAnimate = hasBeenAnimated && isActive;

                return (
                  <FadeIn key={index} delay={index * 150}>
                    <div className={`flex flex-col lg:flex-row items-center gap-8 ${item.position === 'right' ? 'lg:flex-row-reverse' : ''}`}>
                      {/* Image Side */}
                      <div className={`w-full lg:w-5/12 transition-all duration-700 ${shouldAnimate
                        ? 'opacity-100 translate-y-0'
                        : hasBeenAnimated
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-8'
                        }`}>
                        <div className="rounded-2xl overflow-hidden">
                          <img src={item.image} alt={item.title} className="w-full h-64 object-cover" />
                        </div>
                        {item.position === 'left' && <div className="mt-6 lg:block hidden">
                          <h4 className="text-white font-bold mb-2">{item.title === "Our Journey" || item.title === "Aquafix Overview" ? item.title : ""}</h4>
                          {(item.title === "Our Journey" || item.title === "Aquafix Overview") && <p className="text-white/60 text-sm">{item.description}</p>}
                        </div>}
                      </div>

                      {/* Year Badge */}
                      <div className="lg:w-2/12 flex justify-center relative">
                        <div
                          className={`font-bold px-4 py-2 rounded-full text-sm z-10 transition-all duration-500 ${isActive
                            ? 'bg-tertiary text-primary scale-110'
                            : 'bg-white/20 text-white/60'
                            }`}
                        >
                          {item.year}
                        </div>
                      </div>

                      {/* Content Side */}
                      <div className={`w-full lg:w-5/12 transition-all duration-700 ${shouldAnimate
                        ? 'opacity-100 translate-y-0'
                        : hasBeenAnimated
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-8'
                        }`}>
                        <h4 className={`font-bold mb-3 transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/60'}`}>{item.title}</h4>
                        <p className={`text-sm leading-relaxed transition-colors duration-500 ${isActive ? 'text-white/80' : 'text-white/40'}`}>{item.description}</p>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 lg:py-32 bg-[#F0F3F8]">
        <div className="container-custom section-padding">
          {/* Header Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <div>
              <p className="text-secondary font-bold mb-4">Values</p>
              <h2 className="text-primary">Our Core Values</h2>
            </div>
            <div className="flex items-center">
              <p className="text-muted-foreground">
                We believe in the power of teamwork. Our diverse team of skilled professionals collaborates seamlessly to tackle even the most complex plumbing challenges. By fostering a culture of collaboration, respect.
              </p>
            </div>
          </div>

          {/* 6 Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, index) => <FadeIn key={index} delay={index * 100}>
              <div className="bg-white rounded-2xl p-8 border border-gray-100 h-full">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center mb-6">
                  <value.icon className="w-6 h-6 text-tertiary" />
                </div>
                <h5 className="text-primary font-bold mb-3">{value.title}</h5>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </div>
            </FadeIn>)}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container-custom section-padding">
          <div className="text-center mb-20">
            <p className="text-secondary font-bold mb-4">Mission & Vision</p>
            <h2 className="text-black font-bold">Turning Your Plumbing<br />Needs into Reality</h2>
          </div>

          <div className="space-y-24">
            {/* Mission */}
            <FadeIn>
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="rounded-2xl overflow-hidden">
                  <img src={mission} alt="Our Mission" className="w-full h-80 lg:h-96 object-cover" />
                </div>
                <div>
                  <h3 className="text-black font-bold mb-4">Our Mission</h3>
                  <p className="text-muted-foreground mb-8 font-semibold text-justify leading-relaxed">
                    At Aquafix, our mission is to provide top-quality plumbing services that ensure the safety, functionality, and efficiency. We are committed to delivering exceptional customer service, reliable solutions, and expert craftsmanship.
                  </p>
                  <ul className="space-y-4">
                    {missionFeatures.map((feature, index) => <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 text-secondary fill-primary stroke-white flex-shrink-0" />
                      <span className="text-muted-foreground text-lg">{feature}</span>
                    </li>)}
                  </ul>
                </div>
              </div>
            </FadeIn>
            <FadeIn>
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                <div>
                  <h3 className="text-black font-bold mb-4">Our Vision</h3>
                  <p className="text-muted-foreground mb-8 font-semibold text-justify leading-relaxed">
                    Our vision is to be the leading provider of plumbing services in our community, our integrity, innovation, and excellence. We aim to set the standard for quality and reliability in the plumbing industry.
                  </p>
                  <ul className="space-y-4">
                    {visionFeatures.map((feature, index) => <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 text-secondary fill-primary stroke-white flex-shrink-0" />
                      <span className="text-muted-foreground text-lg">{feature}</span>
                    </li>)}
                  </ul>
                </div>
                <div className="rounded-2xl overflow-hidden">
                  <img src={vision} alt="Our Vision" className="w-full h-80 lg:h-96 object-cover" />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 lg:py-32 bg-[#F5F7FA]">
        <div className="container-custom section-padding">
          <div className="text-center mb-16">
            <p className="text-secondary font-bold mb-4">Our Experts</p>
            <h2 className="text-primary">Meet Our Expert Plumbers</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {teamMembers.map((member, index) => <FadeIn key={index} delay={index * 80}>
              <div className="bg-white rounded-2xl p-6 transition-all duration-300 group">
                <div className="rounded-xl overflow-hidden mb-4 group-hover:bg-accent bg-[#E8ECF4]">
                  <img src={member.image} alt={member.name} className="h-[460px] object-cover group-hover:scale-105 transition-all duration-300" />
                </div>
                <h5 className="text-secondary font-bold transition-colors">{member.name}</h5>
                <p className="text-muted-foreground text-base transition-colors">{member.role}</p>
              </div>
            </FadeIn>)}
          </div>
          <Link to={"/career"} className="flex items-center justify-center">
            <FlipButton>Become an Expert</FlipButton>
          </Link>
        </div>
      </section>

      {/* Job Openings Section */}
      <section className="pt-20 lg:pt-32 bg-white">
        <div className="container-custom section-padding">
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div>
              <p className="text-secondary font-bold mb-4">Career</p>
              <h2 className="text-primary text-4xl lg:text-5xl">
                Opportunities to<br />Join Our Team
              </h2>
            </div>
            <div className="flex items-end">
              <p className="text-muted-foreground">
                We offer a dynamic and supportive work environment that encourages professional growth and development. As part of our team, you'll have the opportunity to work on diverse projects.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {careersLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                <p className="text-muted-foreground">Loading positions...</p>
              </div>
            ) : careers && careers.length > 0 ? (
              careers.map((otherJob, index) => (
                <FadeIn key={index} delay={index * 100}>
                  <Link
                    to={`/career/${otherJob.slug}`}
                    className={`bg-[#E8ECF4] cursor-pointer rounded-xl px-6 py-5 flex items-center justify-between hover:bg-accent transition-all group duration-300`}
                  >
                    <div className="flex items-center gap-8 flex-wrap">
                      <h5 className="text-primary font-bold min-w-[200px]">
                        {otherJob.title}
                      </h5>
                      <div className="flex items-center gap-6">
                        <span className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Briefcase className="w-4 h-4" />
                          {otherJob.type}
                        </span>
                        <span className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {otherJob.location}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-6 h-6 text-secondary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                </FadeIn>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No positions available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <CTA />
    </main>
    <Footer />
  </div>;
};
export default About;