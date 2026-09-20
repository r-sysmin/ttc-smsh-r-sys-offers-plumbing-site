import avatar1 from "@/assets/avatar-1.jpg";
import heroPlumber from "@/assets/hero-plumber.jpg";
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { Link } from "react-router-dom";

const FlipButton = ({
  children,
  variant = "light"
}: {
  children: React.ReactNode;
  variant?: "light" | "dark";
}) => {
  const bgClass = variant === "light"
    ? "bg-tertiary text-primary hover:bg-tertiary/90"
    : "bg-primary text-white hover:bg-primary/90";
  return (
    <Button size="default" className={`group relative overflow-hidden font-semibold rounded-full px-6 ${bgClass}`}>
      <span className="flex items-center gap-2 font-bold transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0">
        {variant === "dark" && <Phone className="h-4 w-4" />}
        {children}
      </span>
      <span className="absolute inset-0 flex font-bold items-center justify-center gap-2 transition-all duration-300 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
        {variant === "dark" && <Phone className="h-4 w-4" />}
        {children}
      </span>
    </Button>
  );
};

const CTA = () => {
  return (
    <section id="contact" className="py-20 lg:py-32 bg-white">
      <div className="container-custom section-padding">
        <FadeIn>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Card - with image */}
            <div className="lg:col-span-2 rounded-3xl overflow-hidden relative min-h-[320px]">
              {/* Background Image */}
              <img
                src={heroPlumber}
                alt="Plumber at work"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/65 to-transparent" />
              {/* Content */}
              <div className="relative z-10 p-8 lg:p-12 flex flex-col justify-center h-full max-w-md">
                <p className="text-tertiary text-sm font-medium mb-3">Looking for Plumbing Services?</p>
                <h2 className="text-white mb-8">Let's discuss the details</h2>
                <div>
                  <Link to="/quote">
                    <FlipButton variant="light">Get A Quote</FlipButton>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Card */}
            <div className="bg-tertiary rounded-3xl p-8 lg:p-10 flex flex-col justify-center min-h-[320px]">
              {/* Avatar */}
              <div className="mb-6">
                <div className="w-16 h-16 rounded-full border-4 border-secondary overflow-hidden">
                  <img
                    src={avatar1}
                    alt="Wade Warren"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Text */}
              <p className="text-primary font-semibold text-xl leading-relaxed mb-8">
                This is Wade Warren, Chief Repair at Aquafix. I am here to answer all your questions.
              </p>
              {/* Button */}
              <Link to="tel:+1578365379">
                <FlipButton variant="dark">Call +(1)578-365-379</FlipButton>
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default CTA;