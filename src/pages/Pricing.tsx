import CTA from "@/components/CTA";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Check, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


// FlipButton component
const FlipButton = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <button className="group w-full relative px-8 py-4 bg-white border-secondary rounded-full overflow-hidden border">
    <span className="relative block overflow-hidden h-6">
      <span className="block transition-transform text-center duration-300 group-hover:-translate-y-full text-secondary font-semibold">
        {children}
      </span>
      <span className="text-center block transition-transform duration-300 group-hover:-translate-y-full text-secondary font-semibold">
        {children}
      </span>
    </span>
  </button>;
};

const pricingPlans = {
  residential: [
    {
      name: "Basic Plan",
      price: 50,
      billing: "Billed per hour",
      features: [
        "10% off All Service",
        "Leaking Pipes",
        "Gas Line Repair",
        "Water Heater Repair",
        "Toilet Installation",
      ],
      recommended: false,
    },
    {
      name: "Advanced Plan",
      price: 150,
      billing: "Billed per hour",
      features: [
        "15% off All Service",
        "Leaking Pipes",
        "Gas Line Repair",
        "Water Heater Repair",
        "Toilet Installation",
        "Burst Pipes",
      ],
      recommended: true,
    },
    {
      name: "Special Plan",
      price: 200,
      billing: "Billed per hour",
      features: [
        "All from Advanced",
        "Leaking Pipes",
        "Gas Line Repair & Installation",
        "Water Heater Installation",
        "Remodelling Washroom",
      ],
      recommended: false,
    },
  ],
  commercial: [
    {
      name: "Starter Plan",
      price: 100,
      billing: "Billed per hour",
      features: [
        "10% off All Service",
        "Commercial Pipe Repair",
        "Gas Line Inspection",
        "Water System Maintenance",
        "Emergency Response",
      ],
      recommended: false,
    },
    {
      name: "Business Plan",
      price: 250,
      billing: "Billed per hour",
      features: [
        "20% off All Service",
        "Full System Maintenance",
        "Gas Line Installation",
        "Water Heater Systems",
        "24/7 Priority Support",
        "Preventive Maintenance",
      ],
      recommended: true,
    },
    {
      name: "Enterprise Plan",
      price: 400,
      billing: "Billed per hour",
      features: [
        "All from Business",
        "Dedicated Account Manager",
        "Custom Solutions",
        "Full Building Systems",
        "Annual Inspection",
      ],
      recommended: false,
    },
  ],
};

const faqs = [
  {
    question: "What types of services do you offer?",
    answer:
      "We offer a wide range of plumbing services including pipe repair, drain cleaning, water heater installation, bathroom remodeling, gas line repair, and emergency plumbing services for both residential and commercial properties.",
  },
  {
    question: "How Much Does A Plumber Charge Per Hour?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.\n\nAenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.",
  },
  {
    question: "What Kind Of Work Can A Handyman Do?",
    answer:
      "A handyman can handle various tasks including minor plumbing repairs, fixture installations, pipe replacements, drain cleaning, and general maintenance work around your home or business.",
  },
  {
    question: "Does A Handyman Need Insurance?",
    answer:
      "Yes, professional handymen should carry liability insurance and be properly licensed. All our technicians are fully insured and bonded for your protection.",
  },
  {
    question: "Are your prices competitive, and do you provide estimates?",
    answer:
      "Yes, we offer competitive pricing and provide free estimates for all our services. Contact us to schedule an appointment with one of our experienced plumbers.",
  },
];

const PricingCard = ({
  plan,
  index,
  planType,
  onSelectPlan,
}: {
  plan: (typeof pricingPlans.residential)[0];
  index: number;
  planType: "residential" | "commercial";
  onSelectPlan: (plan: typeof pricingPlans.residential[0], planType: "residential" | "commercial") => void;
}) => {
  const isRecommended = plan.recommended;

  return (
    <FadeIn className="h-full" delay={index * 100}>
      <div className="relative h-full">
        {isRecommended && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
            <span className="bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-sm font-medium">
              Recommended
            </span>
          </div>
        )}
        <div
          className={`rounded-2xl p-8 h-full flex flex-col ${isRecommended
            ? "bg-primary text-primary-foreground"
            : "bg-[#f4f4f7]"
            }`}
        >
          <p
            className={`font-medium ${isRecommended ? "text-white" : "text-muted-foreground"
              }`}
          >
            {plan.name}
          </p>

          <div className="mt-4 mb-2">
            <span className="text-5xl font-bold">${plan.price}</span>
            <span
              className={`text-base ${isRecommended ? "text-white" : "text-muted-foreground"
                }`}
            >
              /Hour
            </span>
          </div>

          <p
            className={`text-sm pb-6 border-b ${isRecommended
              ? "text-primary-foreground/70 border-primary-foreground/20"
              : "text-muted-foreground border-border"
              }`}
          >
            {plan.billing}
          </p>

          <div className="mt-6">
            <h4
              className={`font-bold text-xl mb-4 ${isRecommended ? "text-accent" : "text-black"
                }`}
            >
              What's included
            </h4>

            <ul className="space-y-3">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${isRecommended ? "bg-accent" : "bg-primary"
                      }`}
                  >
                    <Check
                      className={`w-3 h-3 ${isRecommended
                        ? "text-accent-foreground"
                        : "text-primary-foreground"
                        }`}
                    />
                  </div>
                  <span
                    className={`text-sm ${isRecommended ? "text-primary-foreground/90" : "text-black"
                      }`}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto pt-8">
            <button
              onClick={() => onSelectPlan(plan, planType)}
              className="w-full py-3 rounded-lg font-medium text-center block transition-all"
            >
              <FlipButton>Get Started</FlipButton>
            </button>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};
const FAQItem = ({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <div
      className={`rounded-xl mb-3 transition-all duration-300 ${isOpen ? "bg-accent" : "bg-[#f4f4f7]"
        }`}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between text-left"
      >
        <span
          className={`font-bold text-2xl ${isOpen ? "text-accent-foreground" : "text-black"
            }`}
        >
          {faq.question}
        </span>
        <div className="flex-shrink-0 ml-4">
          <X className={`w-5 h-5 text-accent-foreground transition-transform ${isOpen ? "" : "rotate-45"}`} />
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-60 pb-6 px-6" : "max-h-0"
          }`}
      >
        <p className="text-accent-foreground/80 font-medium whitespace-pre-line">{faq.answer}</p>
      </div>
    </div>
  );
};

const Pricing = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"residential" | "commercial">(
    "residential"
  );
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const handleSelectPlan = (plan: typeof pricingPlans.residential[0], planType: "residential" | "commercial") => {
    navigate("/contact", {
      state: {
        planData: {
          planName: plan.name,
          planType,
          price: plan.price,
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-white">
        <div className="container-custom section-padding text-center">
          <FadeIn>
            <div className="flex items-center justify-center gap-2 text-sm mb-6">
              <Link to="/" className="text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-primary font-medium">Pricing</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6">
              Pricing Plan
            </h1>

            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Expert and Reliable Solutions Tailored to Meet Your Home Repair and
              Maintenance Needs, Ensuring Quality, Efficiency, and Complete Customer
              Satisfaction.
            </p>
          </FadeIn>

          {/* Toggle */}
          <FadeIn delay={100}>
            <div className="inline-flex bg-card rounded-full p-1.5 mt-10">
              <button
                onClick={() => setActiveTab("residential")}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${activeTab === "residential"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
                  }`}
              >
                Residential Service
              </button>
              <button
                onClick={() => setActiveTab("commercial")}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${activeTab === "commercial"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground "
                  }`}
              >
                Commercial Service
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 bg-white">
        <div className="container-custom section-padding">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricingPlans[activeTab].map((plan, index) => (
              <PricingCard
                key={plan.name}
                plan={plan}
                index={index}
                planType={activeTab}
                onSelectPlan={handleSelectPlan}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pt-16 lg:pt-24 bg-white">
        <div className="container-custom section-padding">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
              Still have questions?
            </h2>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="max-w-5xl mx-auto">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  faq={faq}
                  isOpen={openFAQ === index}
                  onToggle={() => setOpenFAQ(openFAQ === index ? null : index)}
                />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <CTA />

      <Footer />
    </div>
  );
};

export default Pricing;