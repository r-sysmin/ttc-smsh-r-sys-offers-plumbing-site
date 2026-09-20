import heroPlumber from "@/assets/hero-plumber.jpg";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useCareerBySlug, useCareers } from "@/hooks/useCareers";
import { useCreateJobApplication } from "@/hooks/useJobApplications";
import { useUserProfile } from "@/hooks/useUserProfile";
import { ArrowUpRight, Briefcase, CheckCircle2, Loader2, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { z } from "zod";

// Validation schemas
const nameSchema = z.string().trim().min(1, "Name is required").max(100);
const emailSchema = z.string().trim().email("Invalid email address").max(255);
const phoneSchema = z.string().trim().min(1, "Phone is required").max(20);

const Career = () => {
  const { slug } = useParams();
  const { data: careers, isLoading: careersLoading } = useCareers();
  const { user } = useAuth();
  const { data: profile } = useUserProfile(user?.id);

  const { data: currentCareer, isLoading: careerLoading } = useCareerBySlug(slug);

  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [currentCompany, setCurrentCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [cvLink, setCvLink] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const createApplication = useCreateJobApplication();

  // Auto-fill form when user is logged in
  useEffect(() => {
    if (user) {
      // Set email from user auth
      if (user.email && !email) {
        setEmail(user.email);
      }

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
  }, [user, profile, email, fullName, phone]);

  // Get first career as default if no slug or career not found
  const job = currentCareer || (careers && careers.length > 0 ? careers[0] : null);

  // Get other job openings (excluding current)
  const otherJobs = careers?.filter((j) => j.slug !== job?.slug).slice(0, 3) || [];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    const nameResult = nameSchema.safeParse(fullName);
    if (!nameResult.success) {
      newErrors.fullName = nameResult.error.errors[0].message;
    }

    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      newErrors.email = emailResult.error.errors[0].message;
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

    if (!validateForm() || !job) return;

    await createApplication.mutateAsync({
      career_id: job.id,
      job_title: job.title,
      full_name: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      current_company: currentCompany.trim() || null,
      linkedin_url: linkedin.trim() || null,
      cv_link: cvLink.trim() || null,
      note: note.trim() || null,
    });

    // Reset form on success
    setFullName("");
    setEmail("");
    setCurrentCompany("");
    setPhone("");
    setLinkedin("");
    setCvLink("");
    setNote("");
    setErrors({});
  };

  if (careersLoading || careerLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center py-32">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container-custom mx-auto section-padding py-32 text-center">
          <h1 className="text-4xl font-bold text-black mb-4">No Open Positions</h1>
          <p className="text-muted-foreground mb-8">
            We don't have any open positions at the moment. Please check back later!
          </p>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4">
        <div className="container-custom mx-auto section-padding text-center">
          <FadeIn>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-primary">Career</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Job Title Section */}
      <section className="pb-12 px-4">
        <div className="container-custom mx-auto section-padding text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
              {job.title}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Join our team and make a difference. We're looking for passionate
              individuals who are ready to grow their career in the plumbing
              industry.
            </p>
            <a
              href="#openings"
              className="inline-flex items-center gap-2 text-secondary font-bold hover:underline"
            >
              View all positions
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 px-4">
        <div className="container-custom mx-auto section-padding">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Left Column - Image & Content */}
            <div className="lg:col-span-8">
              <FadeIn>
                {/* Hero Image */}
                <div className="rounded-2xl overflow-hidden mb-12">
                  <img
                    src={heroPlumber}
                    alt={job.title}
                    className="w-full h-[300px] md:h-[400px] object-cover"
                  />
                </div>

                {/* About the Role */}
                <div className="mb-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
                    About the role
                  </h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    {job.about_the_role.map((text, index) => (
                      <p key={index}>{text}</p>
                    ))}
                  </div>
                </div>

                {/* In the short term, you will */}
                <div className="mb-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
                    In the short term, you will
                  </h2>
                  <ul className="space-y-3">
                    {job.short_term_goals.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 mt-1 text-secondary fill-primary stroke-white flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What you bring to the table */}
                <div className="mb-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
                    What you bring to the table
                  </h2>
                  <ul className="space-y-3">
                    {job.what_you_bring.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 mt-1 text-secondary fill-primary stroke-white flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Why you might love working here */}
                <div className="mb-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
                    Why you might love working here
                  </h2>
                  <ul className="space-y-3">
                    {job.why_you_might_love.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 mt-1 text-secondary fill-primary stroke-white flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </div>

            {/* Form */}
            <div className="bg-[#f4f4f7] h-fit rounded-2xl p-8 sticky top-10 lg:col-span-4">
              <h2 className="text-3xl font-bold text-black mb-6">Apply This Role</h2>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="block font-medium text-black mb-2">
                    Full Name *
                  </label>
                  <Input
                    className="bg-transparent h-12"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="text-destructive text-sm mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block font-medium text-black mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    className="bg-transparent h-12"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block font-medium text-black mb-2">
                    Current Company
                  </label>
                  <Input
                    className="bg-transparent h-12"
                    value={currentCompany}
                    onChange={(e) => setCurrentCompany(e.target.value)}
                    placeholder="Enter your current company"
                  />
                </div>

                <div>
                  <label className="block font-medium text-black mb-2">
                    Phone *
                  </label>
                  <Input
                    type="tel"
                    placeholder="Ex. +123 456 789"
                    className="bg-transparent border-border h-12"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {errors.phone && (
                    <p className="text-destructive text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block font-medium text-black mb-2">
                    LinkedIn
                  </label>
                  <Input
                    className="bg-transparent h-12"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>

                <div>
                  <label className="block font-medium text-black mb-2">
                    CV Link
                  </label>
                  <Input
                    className="bg-transparent h-12"
                    value={cvLink}
                    onChange={(e) => setCvLink(e.target.value)}
                    placeholder="Link to your CV/Resume"
                  />
                </div>

                <div>
                  <label className="block font-medium text-black mb-2">
                    Note
                  </label>
                  <Textarea
                    placeholder="Tell us why you're interested in this role..."
                    className="bg-transparent border-border min-h-[10px]"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:text-accent/80 text-primary-foreground py-6"
                  disabled={createApplication.isPending}
                >
                  {createApplication.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Apply"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Other Opportunities Section */}
      {otherJobs.length > 0 && (
        <section id="openings" className="py-16 px-4 bg-[#f4f4f7]">
          <div className="container-custom mx-auto section-padding">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">
                Other Opportunities
              </h2>


              <div className="space-y-4">
                {otherJobs.map((otherJob, index) => (

                  <FadeIn key={index} delay={index * 100}>
                    <Link
                      key={otherJob.slug}
                      to={`/career/${otherJob.slug}`}
                      className={`${otherJob.slug === slug ? "bg-accent" : "bg-[#E8ECF4]"
                        } cursor-pointer rounded-xl px-6 py-5 flex items-center justify-between hover:bg-accent transition-all group duration-300`}
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
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Career;
