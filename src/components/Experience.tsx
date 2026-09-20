import plumberTeam from "@/assets/hero-2.png";
import CounterAnimation from "@/components/CounterAnimation";
import FadeIn from "@/components/FadeIn";
import { Link } from "react-router-dom";

const stats = [{
  number: 18,
  suffix: "+",
  label: "Year Experience",
  decimals: 0
}, {
  number: 4.3,
  suffix: "k",
  label: "Happy Clients",
  decimals: 1
}, {
  number: 25,
  suffix: "+",
  label: "Qualified Experts",
  decimals: 0
}];

// FlipButton component
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

const Experience = () => {
  return <section className="py-20 lg:py-32 bg-card">
    <div className="container-custom section-padding">
      {/* Top Text */}
      <div className="text-center max-w-5xl mx-auto mb-16">
        <FadeIn>
          <p className="text-primary font-bold  mb-4">Welcome to Aquafix</p>
        </FadeIn>
        <FadeIn delay={100}>
          <h2 className="text-black font-bold text-5xl">
            With years of industry experience, our team of skilled professionals is dedicated to providing top-notch solutions.
          </h2>
        </FadeIn>
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left - Image */}
        <FadeIn delay={200}>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden max-h-[500px]">
              <img src={plumberTeam} alt="Aquafix plumber with customer" className="w-full h-auto object-cover" />
            </div>
          </div>
        </FadeIn>

        {/* Right - Text Content */}
        <div>
          <FadeIn delay={300}>
            <h3 className="text-black font-bold mb-6">
              We focus on customer satisfaction and quality
            </h3>
          </FadeIn>
          <FadeIn delay={400}>
            <p className="text-muted-foreground mb-8">
              Our team of skilled professionals is dedicated to providing top-notch solutions and exceptional customer service. Our commitment to quality workmanship, ensuring that every job is done right the first time.
            </p>
          </FadeIn>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => <FadeIn key={index} delay={500 + index * 100}>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-1 text-primary">
                  <CounterAnimation
                    target={stat.number}
                    decimals={stat.decimals}
                    suffix={stat.suffix}
                    duration={2000}
                    suffixClassName="text-tertiary"
                  />
                </div>
                <p className="text-black text-sm font-medium">{stat.label}</p>
              </div>
            </FadeIn>)}
          </div>
          <Link to="/about">
            <FadeIn delay={800}>
              <FlipButton>About Us</FlipButton>
            </FadeIn>
          </Link>
        </div>
      </div>
    </div>
  </section>;
};
export default Experience;