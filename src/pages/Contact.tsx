import contact from "@/assets/contact-1.png";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { services } from "@/data/services";
import { useAuth } from "@/hooks/useAuth";
import { useUserProfile } from "@/hooks/useUserProfile";
import { supabase } from "@/integrations/supabase/client";
import { Clock, DollarSign, Mail, MapPin, Phone, Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "sonner";
import type { QuoteData } from "./QuoteCalculator";

const contactInfo = [
  {
    icon: Mail,
    title: "Chat to sale",
    description: "Email us for scheduling",
    value: "hello@aquafix.com",
    href: "mailto:hello@aquafix.com",
  },
  {
    icon: MapPin,
    title: "Visit our office",
    description: "Visit us for scheduling",
    value: "100 Smart Street VIC 3066 AU",
    href: "https://www.google.com/maps",
  },
  {
    icon: Phone,
    title: "Contact us",
    description: "Call us for scheduling",
    value: "+(1)578-365-379",
    href: "tel:+1578365379",
  },
];

const Contact = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { data: profile } = useUserProfile(user?.id);

  const quoteData = location.state?.quoteData as QuoteData | undefined;
  const planData = location.state?.planData as { planName: string; planType: string; price: number } | undefined;

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    service: quoteData?.serviceSlug || "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill form with user data when logged in
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: profile?.full_name || prev.fullName,
        email: user.email || prev.email,
        phone: profile?.phone || prev.phone,
      }));
    }
  }, [user, profile]);

  useEffect(() => {
    if (quoteData) {
      setFormData(prev => ({
        ...prev,
        service: quoteData.serviceSlug,
      }));
    }
  }, [quoteData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      if (quoteData) {
        // Submit quote request to database
        const { error } = await supabase.from("quote_requests").insert({
          full_name: formData.fullName,
          phone: formData.phone,
          email: formData.email || null,
          service_slug: quoteData.serviceSlug,
          service_title: quoteData.serviceTitle,
          complexity_label: quoteData.complexityLabel,
          complexity_multiplier: quoteData.complexityMultiplier,
          estimated_hours: quoteData.estimatedHours,
          urgency: quoteData.urgency,
          base_price: quoteData.basePrice,
          estimated_min: quoteData.estimatedMin,
          estimated_max: quoteData.estimatedMax,
          notes: formData.notes || null,
        });

        if (error) throw error;

        toast.success("Quote request submitted successfully! We'll contact you soon.");
      } else if (planData) {
        // Submit plan inquiry to database
        const { error } = await supabase.from("quote_requests").insert({
          full_name: formData.fullName,
          phone: formData.phone,
          email: formData.email || null,
          service_slug: `${planData.planType}-plan`,
          service_title: `${planData.planName} (${planData.planType})`,
          complexity_label: "Plan Inquiry",
          complexity_multiplier: 1,
          estimated_hours: 1,
          urgency: "standard",
          base_price: planData.price,
          estimated_min: planData.price,
          estimated_max: planData.price,
          notes: formData.notes || null,
        });

        if (error) throw error;

        toast.success("Plan inquiry submitted successfully! We'll contact you soon.");
      } else {
        // Regular contact form - save to contacts table
        const { error } = await supabase.from("contacts").insert({
          full_name: formData.fullName,
          phone: formData.phone,
          email: formData.email || null,
          service: formData.service || null,
          notes: formData.notes || null,
        });

        if (error) throw error;

        toast.success("Message sent successfully! We'll get back to you soon.");
      }

      // Reset form
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        service: "",
        notes: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container-custom mx-auto text-center">
          <FadeIn>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-primary">Contact</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
              {quoteData ? "Request Official Quote" : planData ? "Plan Inquiry" : "Contact Us"}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {quoteData
                ? "Complete your information below and we'll send you an official quote based on your estimate."
                : planData
                  ? "Fill in your details and we'll contact you about the selected plan."
                  : "Get in touch with our team for any questions or to schedule a service."}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Quote Summary (if coming from calculator or pricing) */}
      {(quoteData || planData) && (
        <section className="pb-8 px-4">
          <div className="container mx-auto section-padding">
            <FadeIn>
              <div className="max-w-4xl mx-auto bg-primary rounded-2xl p-6 text-primary-foreground">
                <h3 className="text-xl font-bold mb-4">
                  {quoteData ? "Your Quote Summary" : "Selected Plan"}
                </h3>
                {quoteData ? (
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-3">
                      <Wrench className="w-5 h-5 text-accent" />
                      <div>
                        <p className="text-sm text-primary-foreground/70">Service</p>
                        <p className="font-medium">{quoteData.serviceTitle}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-accent" />
                      <div>
                        <p className="text-sm text-primary-foreground/70">Hours</p>
                        <p className="font-medium">{quoteData.estimatedHours} hrs</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-accent" />
                      <div>
                        <p className="text-sm text-primary-foreground/70">Urgency</p>
                        <p className="font-medium capitalize">{quoteData.urgency}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-accent" />
                      <div>
                        <p className="text-sm text-primary-foreground/70">Estimate</p>
                        <p className="font-bold text-lg">${quoteData.estimatedMin} - ${quoteData.estimatedMax}</p>
                      </div>
                    </div>
                  </div>
                ) : planData ? (
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-primary-foreground/70">Plan Name</p>
                      <p className="font-medium">{planData.planName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-primary-foreground/70">Type</p>
                      <p className="font-medium capitalize">{planData.planType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-primary-foreground/70">Rate</p>
                      <p className="font-bold text-lg">${planData.price}/hr</p>
                    </div>
                  </div>
                ) : null}
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Contact Form Section */}
      <section className="pb-20 px-4">
        <div className="container mx-auto section-padding">
          <FadeIn>
            <div className="grid lg:grid-cols-2 gap-12 mx-auto">
              {/* Image */}
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={contact}
                  alt="Plumber at work"
                  className="w-full h-full object-cover min-h-[400px]"
                />
              </div>

              {/* Form */}
              <div className="bg-[#f4f4f7] rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-black mb-6">
                  {quoteData || planData ? "Your Information" : "Get In Touch"}
                </h2>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label className="block font-medium text-black mb-2">
                      Full Name <span className="text-destructive">*</span>
                    </label>
                    <Input
                      className="bg-transparent h-12"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-black mb-2">
                      Phone <span className="text-destructive">*</span>
                    </label>
                    <Input
                      type="number"
                      placeholder="Ex. +123 456 789"
                      className="bg-transparent border-border"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-black mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      className="bg-transparent border-border"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  {!quoteData && !planData && (
                    <div>
                      <label className="block font-medium text-black mb-2">
                        Select A Service
                      </label>
                      <Select
                        value={formData.service}
                        onValueChange={(value) => setFormData({ ...formData, service: value })}
                      >
                        <SelectTrigger className="bg-transparent border-border">
                          <SelectValue placeholder="Choose a service..." />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service.slug} value={service.slug}>
                              {service.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div>
                    <label className="block font-medium text-black mb-2">
                      {quoteData || planData ? "Additional Notes" : "Note"}
                    </label>
                    <Textarea
                      placeholder="Type here..."
                      className="bg-transparent border-border min-h-[120px]"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:text-accent/80 text-primary-foreground py-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "Submitting..."
                      : quoteData
                        ? "Submit Quote Request"
                        : planData
                          ? "Submit Plan Inquiry"
                          : "Submit"}
                  </Button>
                </form>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="pb-20 px-4">
        <div className="container-custom section-padding">
          <FadeIn>
            <div className="grid md:grid-cols-3 gap-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-[#f4f4f7] rounded-2xl p-6"
                >
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-4">
                    <info.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-1">
                    {info.title}
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    {info.description}
                  </p>
                  <a
                    href={info.href}
                    className="font-medium text-primary hover:underline"
                  >
                    {info.value}
                  </a>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;