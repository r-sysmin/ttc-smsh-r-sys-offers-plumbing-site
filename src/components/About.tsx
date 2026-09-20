import plumberTeam from "@/assets/hero-4.png";
import plumberTeam1 from "@/assets/hero-41.png";
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const FlipButton = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return <Button variant="default" size="default" className="group relative overflow-hidden border border-primary text-white hover:text-primary">
    <span className="flex items-center gap-2 transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0">
      <Phone className="h-4 w-4" />
      {children}
    </span>
    <span className="absolute text-white inset-0 flex items-center justify-center gap-2 transition-all duration-300 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 bg-primary">
      <Phone className="h-4 w-4" />
      {children}
    </span>
  </Button>;
};

const features = [{
  title: "Experienced Professionals",
  description: "Our team consists of licensed, insured, and highly trained plumbers with years of experience."
}, {
  title: "Comprehensive Solutions",
  description: "From minor repairs to major installations, we handle all plumbing needs efficiently."
}];
const About = () => {
  return <section id="about" className="py-20 lg:py-32 bg-card">
    <div className="container-custom section-padding">
      <div className="grid lg:grid-cols-2 gap-28 items-center">
        {/* Left - Image */}
        <FadeIn>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden">
              <img src={plumberTeam} alt="Aquafix professional team" className="w-full h-auto object-cover" />
            </div>
            {/* Experience Badge */}
            <div className="absolute -bottom-12 w-[240px] h-[240px] -right-12 overflow-hidden rounded-xl text-white">
              <img src={plumberTeam1} alt="Aquafix professional team" className="h-full object-cover " />
            </div>
          </div>
        </FadeIn>

        {/* Right - Content */}
        <div>
          <FadeIn delay={100}>
            <p className="text-secondary mb-4 font-bold"> Who We Are</p>
          </FadeIn>
          <FadeIn delay={200}>
            <h2 className="text-primary mb-6 text-5xl">
              Trusted Plumbing Experts Since 1996
            </h2>
          </FadeIn>
          <FadeIn delay={300}>
            <p className="text-muted-foreground mb-8 font-semibold">
              For over two decades, we have been providing exceptional plumbing services to homes and businesses. Our commitment to quality and customer satisfaction sets us apart.
            </p>
          </FadeIn>

          {/* Features */}
          <div className="space-y-6 mb-8 text-white">
            {features.map((feature, index) => <FadeIn key={index} delay={400 + index * 100}>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-secondary stroke-white border rounded-full bg-primary" />
                </div>
                <div>
                  <h6 className="text-primary text-2xl mb-1 font-bold">{feature.title}</h6>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </FadeIn>)}
          </div>
          <Link to="tel:+1578365379">
            <FadeIn delay={600}>
              <FlipButton>Call +(1)578-365-379</FlipButton>
            </FadeIn>
          </Link>
        </div>
      </div>
    </div>
  </section>;
};
export default About;