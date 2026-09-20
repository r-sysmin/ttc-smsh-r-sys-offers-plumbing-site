import CTA from "@/components/CTA";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateServiceInquiry } from "@/hooks/useServiceInquiries";
import { Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { z } from "zod";

// Import images
import bathroomRemodel from "@/assets/bathroom-remodel.jpg";
import drainCleaning from "@/assets/drain-cleaning.jpg";
import faucetRepair from "@/assets/faucet-repair.jpg";
import heroGrid1 from "@/assets/hero-grid-1.jpg";
import heroGrid2 from "@/assets/hero-grid-2.jpg";
import heroGrid3 from "@/assets/hero-grid-3.jpg";
import plumberTeam from "@/assets/plumber-team.jpg";
import { useAuth } from "@/hooks/useAuth";
import { useUserProfile } from "@/hooks/useUserProfile";

// Validation schemas
const nameSchema = z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters");
const phoneSchema = z.string().trim().min(1, "Phone is required").max(20, "Phone must be less than 20 characters");

// Service data
const servicesData: Record<string, {
  title: string;
  description: string;
  image: string;
  aboutTitle: string;
  aboutDescription: string;
  included: string[];
  benefits: string[];
  workSteps: { number: string; title: string; description: string }[];
}> = {
  "faucet-leak-repairs": {
    title: "Faucet & Leak Repairs",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vivamus ut vulputesql imperdiet quis ut pellentesque risus commodo tincidunt.",
    image: faucetRepair,
    aboutTitle: "About this Service",
    aboutDescription: "At risus viverra adipiscing at in tellus integer feugiat. Nisl pretium fusce id velit ut tortor. Sagittis eu a odio aliquam ata. Pretium aenean pharetra magna ac placeat vestibulum. Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi tristique. Vivamus at augue eget arcu dictum varius duis at.",
    included: [
      "Neque sodales ut etiam sit amet nisl purus. Non tellus cras ac auctor, Et id et lobortis tristique. Mi tellus volutpat ac a duis",
      "Non tellus vulputate lectus consequat sit at fringilla bibendum",
      "Non tellus cras ac auctor. Ut blandit lorem t bibendum aliquam Blanm neque dui. Et id et lobortis tristique."
    ],
    benefits: [
      "Neque sodales ut etiam sit amet nisl purus. Non tellus cras ac auctor, Et id et lobortis tristique. Mi tellus volutpat ac a duis",
      "Non tellus vulputate lectus consequat sit at fringilla bibendum",
      "Non tellus cras ac auctor Ut blandit lorem t bibendum aliquam Blanm neque dui. Et id et lobortis tristique.",
      "Non tellus vulputate lectus consequat sit at fringilla bibendum"
    ],
    workSteps: [
      { number: "01", title: "Booking & Inspection", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." },
      { number: "02", title: "Work Planning", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." },
      { number: "03", title: "Fix And Install", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." },
      { number: "04", title: "Works Completed", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." }
    ]
  },
  "remodeling-service": {
    title: "Remodelling Service",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vivamus ut vulputesql imperdiet quis ut pellentesque risus commodo tincidunt.",
    image: bathroomRemodel,
    aboutTitle: "About this Service",
    aboutDescription: "At risus viverra adipiscing at in tellus integer feugiat. Nisl pretium fusce id velit ut tortor. Sagittis eu a odio aliquam ata. Pretium aenean pharetra magna ac placeat vestibulum. Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi tristique. Vivamus at augue eget arcu dictum varius duis at.\n\nLaureet ut elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque. Magna non augue lectus consequat sit at fringilla bibendum. Elit id sed lobortis tristique. Mi tellus volutpat",
    included: [
      "Neque sodales ut etiam sit amet nisl purus. Non tellus cras ac auctor, Et id et lobortis tristique. Mi tellus volutpat ac a duis",
      "Non tellus vulputate lectus consequat sit at fringilla bibendum",
      "Non tellus cras ac auctor. Ut blandit lorem t bibendum aliquam Blanm neque dui. Et id et lobortis tristique."
    ],
    benefits: [
      "Neque sodales ut etiam sit amet nisl purus. Non tellus cras ac auctor, Et id et lobortis tristique. Mi tellus volutpat ac a duis",
      "Non tellus vulputate lectus consequat sit at fringilla bibendum",
      "Non tellus cras ac auctor Ut blandit lorem t bibendum aliquam Blanm neque dui. Et id et lobortis tristique.",
      "Non tellus vulputate lectus consequat sit at fringilla bibendum"
    ],
    workSteps: [
      { number: "01", title: "Booking & Inspection", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." },
      { number: "02", title: "Work Planning", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." },
      { number: "03", title: "Fix And Install", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." },
      { number: "04", title: "Works Completed", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." }
    ]
  },
  "sewer-repair-cleaning": {
    title: "Sewer Repair & Cleaning",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vivamus ut vulputesql imperdiet quis ut pellentesque risus commodo tincidunt.",
    image: drainCleaning,
    aboutTitle: "About this Service",
    aboutDescription: "At risus viverra adipiscing at in tellus integer feugiat. Nisl pretium fusce id velit ut tortor. Sagittis eu a odio aliquam ata. Pretium aenean pharetra magna ac placeat vestibulum. Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi tristique. Vivamus at augue eget arcu dictum varius duis at.\n\nLaureet ut elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque. Magna non augue lectus consequat sit at fringilla bibendum. Elit id sed lobortis tristique. Mi tellus volutpat",
    included: [
      "Neque sodales ut etiam sit amet nisl purus. Non tellus cras ac auctor, Et id et lobortis tristique. Mi tellus volutpat ac a duis",
      "Non tellus vulputate lectus consequat sit at fringilla bibendum",
      "Non tellus cras ac auctor. Ut blandit lorem t bibendum aliquam Blanm neque dui. Et id et lobortis tristique."
    ],
    benefits: [
      "Neque sodales ut etiam sit amet nisl purus. Non tellus cras ac auctor, Et id et lobortis tristique. Mi tellus volutpat ac a duis",
      "Non tellus vulputate lectus consequat sit at fringilla bibendum",
      "Non tellus cras ac auctor Ut blandit lorem t bibendum aliquam Blanm neque dui. Et id et lobortis tristique.",
      "Non tellus vulputate lectus consequat sit at fringilla bibendum"
    ],
    workSteps: [
      { number: "01", title: "Booking & Inspection", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." },
      { number: "02", title: "Work Planning", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." },
      { number: "03", title: "Fix And Install", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." },
      { number: "04", title: "Works Completed", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." }
    ]
  },
  "drain-cleaning-repairs": {
    title: "Drain Cleaning & Repairs",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vivamus ut vulputesql imperdiet quis ut pellentesque risus commodo tincidunt.",
    image: heroGrid1,
    aboutTitle: "About this Service",
    aboutDescription: "At risus viverra adipiscing at in tellus integer feugiat. Nisl pretium fusce id velit ut tortor. Sagittis eu a odio aliquam ata. Pretium aenean pharetra magna ac placeat vestibulum. Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi tristique. Vivamus at augue eget arcu dictum varius duis at.\n\nLaureet ut elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque. Magna non augue lectus consequat sit at fringilla bibendum. Elit id sed lobortis tristique. Mi tellus volutpat",
    included: [
      "Neque sodales ut etiam sit amet nisl purus. Non tellus cras ac auctor, Et id et lobortis tristique. Mi tellus volutpat ac a duis",
      "Non tellus vulputate lectus consequat sit at fringilla bibendum",
      "Non tellus cras ac auctor. Ut blandit lorem t bibendum aliquam Blanm neque dui. Et id et lobortis tristique."
    ],
    benefits: [
      "Neque sodales ut etiam sit amet nisl purus. Non tellus cras ac auctor, Et id et lobortis tristique. Mi tellus volutpat ac a duis",
      "Non tellus vulputate lectus consequat sit at fringilla bibendum",
      "Non tellus cras ac auctor Ut blandit lorem t bibendum aliquam Blanm neque dui. Et id et lobortis tristique.",
      "Non tellus vulputate lectus consequat sit at fringilla bibendum"
    ],
    workSteps: [
      { number: "01", title: "Booking & Inspection", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." },
      { number: "02", title: "Work Planning", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." },
      { number: "03", title: "Fix And Install", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." },
      { number: "04", title: "Works Completed", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." }
    ]
  },
  "water-line-repair": {
    title: "Water Line Repair",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vivamus ut vulputesql imperdiet quis ut pellentesque risus commodo tincidunt.",
    image: heroGrid2,
    aboutTitle: "About this Service",
    aboutDescription: "At risus viverra adipiscing at in tellus integer feugiat. Nisl pretium fusce id velit ut tortor. Sagittis eu a odio aliquam ata. Pretium aenean pharetra magna ac placeat vestibulum. Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi tristique. Vivamus at augue eget arcu dictum varius duis at.\n\nLaureet ut elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque. Magna non augue lectus consequat sit at fringilla bibendum. Elit id sed lobortis tristique. Mi tellus volutpat",
    included: [
      "Neque sodales ut etiam sit amet nisl purus. Non tellus cras ac auctor, Et id et lobortis tristique. Mi tellus volutpat ac a duis",
      "Non tellus vulputate lectus consequat sit at fringilla bibendum",
      "Non tellus cras ac auctor. Ut blandit lorem t bibendum aliquam Blanm neque dui. Et id et lobortis tristique."
    ],
    benefits: [
      "Neque sodales ut etiam sit amet nisl purus. Non tellus cras ac auctor, Et id et lobortis tristique. Mi tellus volutpat ac a duis",
      "Non tellus vulputate lectus consequat sit at fringilla bibendum",
      "Non tellus cras ac auctor Ut blandit lorem t bibendum aliquam Blanm neque dui. Et id et lobortis tristique.",
      "Non tellus vulputate lectus consequat sit at fringilla bibendum"
    ],
    workSteps: [
      { number: "01", title: "Booking & Inspection", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." },
      { number: "02", title: "Work Planning", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." },
      { number: "03", title: "Fix And Install", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." },
      { number: "04", title: "Works Completed", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." }
    ]
  },
  "gas-line-services": {
    title: "Gas Line Services",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vivamus ut vulputesql imperdiet quis ut pellentesque risus commodo tincidunt.",
    image: heroGrid3,
    aboutTitle: "About this Service",
    aboutDescription: "At risus viverra adipiscing at in tellus integer feugiat. Nisl pretium fusce id velit ut tortor. Sagittis eu a odio aliquam ata. Pretium aenean pharetra magna ac placeat vestibulum. Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi tristique. Vivamus at augue eget arcu dictum varius duis at.\n\nLaureet ut elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque. Magna non augue lectus consequat sit at fringilla bibendum. Elit id sed lobortis tristique. Mi tellus volutpat",
    included: [
      "Neque sodales ut etiam sit amet nisl purus. Non tellus cras ac auctor, Et id et lobortis tristique. Mi tellus volutpat ac a duis",
      "Non tellus vulputate lectus consequat sit at fringilla bibendum",
      "Non tellus cras ac auctor. Ut blandit lorem t bibendum aliquam Blanm neque dui. Et id et lobortis tristique."
    ],
    benefits: [
      "Neque sodales ut etiam sit amet nisl purus. Non tellus cras ac auctor, Et id et lobortis tristique. Mi tellus volutpat ac a duis",
      "Non tellus vulputate lectus consequat sit at fringilla bibendum",
      "Non tellus cras ac auctor Ut blandit lorem t bibendum aliquam Blanm neque dui. Et id et lobortis tristique.",
      "Non tellus vulputate lectus consequat sit at fringilla bibendum"
    ],
    workSteps: [
      { number: "01", title: "Booking & Inspection", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." },
      { number: "02", title: "Work Planning", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." },
      { number: "03", title: "Fix And Install", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." },
      { number: "04", title: "Works Completed", description: "Amet cras vulputate in mi elit dapibus. Et odio facilisi posuere eros sem facilisi eget et enim." }
    ]
  }
};

// FlipButton component
const FlipButton = ({
  children,
  variant = "primary"
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) => {
  const bgClass = variant === "primary" ? "bg-primary" : "bg-secondary";
  return (
    <button className={`group relative px-8 py-4 ${bgClass} rounded-full overflow-hidden`}>
      <span className="relative block overflow-hidden h-6">
        <span className="block transition-transform duration-300 group-hover:-translate-y-full text-white font-semibold">
          {children}
        </span>
        <span className="absolute top-full left-0 block transition-transform duration-300 group-hover:-translate-y-full text-white font-semibold">
          {children}
        </span>
      </span>
    </button>
  );
};

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = servicesData[slug || ""] || servicesData["remodeling-service"];
  const { user } = useAuth();
  const { data: profile } = useUserProfile(user?.id);

  // Form state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedService, setSelectedService] = useState(slug || "remodeling");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const createInquiry = useCreateServiceInquiry();

  // Auto-fill form when user is logged in
  useEffect(() => {
    if (user) {
      // Set full name from profile or user metadata
      if (!fullName) {
        const name = profile?.full_name || user.user_metadata?.full_name || "";
        setFullName(name);
      }

      // Set phone from profile or user metadata
      if (!phone) {
        const userPhone = profile?.phone || user.user_metadata?.phone || "";
        setPhone(userPhone);
      }
    }
  }, [user, profile, fullName, phone]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    const nameResult = nameSchema.safeParse(fullName);
    if (!nameResult.success) {
      newErrors.fullName = nameResult.error.errors[0].message;
    }

    const phoneResult = phoneSchema.safeParse(phone);
    if (!phoneResult.success) {
      newErrors.phone = phoneResult.error.errors[0].message;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const serviceName = servicesData[selectedService]?.title || service.title;

    await createInquiry.mutateAsync({
      service_name: serviceName,
      full_name: fullName.trim(),
      phone: phone.trim(),
      note: note.trim() || null,
      user_id: user?.id || null,
    });


    // Reset form on success
    setFullName("");
    setPhone("");
    setNote("");
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Service Title Section */}
      <section className="bg-transparent py-12">
        <div className="container-custom section-padding py-12">
          {/* Breadcrumb */}
          <div className="text-muted-foreground text-sm mb-6">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/services" className="hover:text-primary transition-colors">Service</Link>
          </div>

          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-4">
              <h2 className="text-black text-5xl md:text-7xl font-bold">{service.title}</h2>
              <Link to="/quote">
                <FlipButton variant="primary">Get A Quote</FlipButton>
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <p className="text-muted-foreground text-lg max-w-xl mb-12">{service.description}</p>
          </FadeIn>

          {/* Hero Image */}
          <FadeIn delay={200}>
            <div className="rounded-xl overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* About Section with Contact Form */}
      <section className="pt-16">
        <div className="container-custom section-padding">
          <div className="flex lg:flex-row flex-col gap-24">
            {/* Left - About Content */}
            <div className="w-full max-w-[640px]">
              <FadeIn>
                <p className="text-primary font-semibold mb-4">Service Details</p>
                <h3 className="text-4xl md:text-5xl font-bold text-black mb-6">{service.aboutTitle}</h3>
              </FadeIn>

              <FadeIn delay={100}>
                <div className="text-muted-foreground font-medium leading-relaxed mb-8 whitespace-pre-line">
                  {service.aboutDescription}
                </div>
              </FadeIn>

              <FadeIn delay={200}>
                <h4 className="text-2xl font-bold text-black mb-4">What is included?</h4>
                <div className="space-y-4">
                  {service.included.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <p className="text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
              <section className=" py-16 lg:py-32">
                <div className="container-custom">
                  <FadeIn>
                    <p className="text-primary font-bold mb-4">Working Process</p>
                    <h3 className="text-4xl md:text-5xl font-bold text-black mb-4">How We Work</h3>
                    <p className="text-muted-foreground max-w-2xl mb-12">
                      Sagittis cras et auctor neque purus amet. At tellus ura duis convallis. Porta ultrices orci cras sed fells eget. Neque lorem!
                    </p>
                  </FadeIn>

                  <div className="grid md:grid-cols-2 gap-12">
                    {service.workSteps.map((step, index) => (
                      <FadeIn key={index} delay={index * 100}>
                        <div className="flex flex-col gap-4">
                          <div className="w-14 h-14 rounded-full border border-secondary flex items-center justify-center flex-shrink-0">
                            <span className="text-secondary font-bold">{step.number}</span>
                          </div>
                          <div>
                            <h5 className="text-2xl font-bold text-black mb-2">{step.title}</h5>
                            <p className="text-muted-foreground font-medium">{step.description}</p>
                          </div>
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                </div>
              </section>

              {/* Service Benefits Section */}
              <section className="pt-16">
                <div className="container-custom">
                  <div className="grid gap-16 items-center">
                    {/* Left - Benefits Content */}
                    <div>
                      <FadeIn>
                        <p className="text-primary font-bold mb-4">Benefits</p>
                        <h3 className="text-3xl md:text-5xl font-bold text-black mb-6">Service Benefits</h3>
                        <p className="text-muted-foreground font-medium mb-8">
                          At risus viverra adipiscing at in tellus integer feugiat. Nisl pretium fusce id velit ut
                          tortor. Sagittis eu a odio aliquam ata semper eget. At tellus ura duis convallis.
                          Porta ultrices orci cras sed fells eget. Neque lorem!
                        </p>
                      </FadeIn>

                      <FadeIn delay={100}>
                        <div className="space-y-4">
                          {service.benefits.map((benefit, index) => (
                            <div key={index} className="flex gap-3">
                              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                              <p className="text-muted-foreground font-medium">{benefit}</p>
                            </div>
                          ))}
                        </div>
                      </FadeIn>
                    </div>

                    {/* Right - Image */}
                    <FadeIn delay={200}>
                      <div className="rounded-xl overflow-hidden">
                        <img
                          src={plumberTeam}
                          alt="Service Benefits"
                          className="w-full h-[400px] object-cover"
                        />
                      </div>
                    </FadeIn>
                  </div>
                </div>
              </section>
            </div>

            {/* Right - Contact Form */}
            <div className="flex sticky top-10 h-fit justify-end">
              <FadeIn className="w-[460px]" delay={300}>
                <div className="bg-[#f4f4f7]  p-8 rounded-xl">
                  <h4 className="text-3xl font-bold text-black mb-6">Get In Touch</h4>

                  <form className="space-y-8" onSubmit={handleSubmit}>
                    <div>
                      <label className=" font-bold text-black mb-2 block">Full Name</label>
                      <Input
                        className="bg-transparent h-12"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your name"
                      />
                      {errors.fullName && (
                        <p className="text-destructive text-sm mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className=" font-bold text-black mb-2 block">Phone</label>
                      <Input
                        className="bg-transparent border-border h-12"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your phone number"
                      />
                      {errors.phone && (
                        <p className="text-destructive text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className=" font-bold text-black mb-2 block">Select A Service</label>
                      <Select value={selectedService} onValueChange={setSelectedService}>
                        <SelectTrigger className="bg-transparent h-12 border-border">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="remodeling-service">Remodelling Service</SelectItem>
                          <SelectItem value="faucet-leak-repairs">Faucet & Leak Repairs</SelectItem>
                          <SelectItem value="sewer-repair-cleaning">Sewer Repair & Cleaning</SelectItem>
                          <SelectItem value="drain-cleaning-repairs">Drain Cleaning & Repairs</SelectItem>
                          <SelectItem value="water-line-repair">Water Line Repair</SelectItem>
                          <SelectItem value="gas-line-services">Gas Line Services</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className=" font-bold text-black mb-2 block">Short Note</label>
                      <Textarea
                        placeholder="Type here.."
                        className="bg-transparent border-border min-h-[100px]"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-secondary/90 text-white py-6"
                      disabled={createInquiry.isPending}
                    >
                      {createInquiry.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </form>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>


      <CTA />
      <Footer />
    </div>
  );
};

export default ServiceDetail;
