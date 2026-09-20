import completedBathroom from "@/assets/completed-bathroom.jpg";
import completedKitchen from "@/assets/completed-kitchen.jpg";
import drainCleaning from "@/assets/drain-cleaning.jpg";
import FadeIn from "@/components/FadeIn";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

const projects = [
  {
    title: "Bathroom Repair",
    description: "Complete bathroom renovation with modern fixtures and plumbing upgrades.",
    image: completedBathroom,
  },
  {
    title: "Kitchen Installation",
    description: "New kitchen plumbing installation with water filtration system.",
    image: completedKitchen,
  },
  {
    title: "Drain Service",
    description: "Professional drain cleaning and repair service.",
    image: drainCleaning,
  },
];

const FeaturedWorks = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getCardWidth = (index: number) => {
    // If no card is hovered, first card takes 60%, others take 20%
    if (hoveredIndex === null) {
      return index === 0 ? "60%" : "20%";
    }
    // When hovering, hovered card takes 60%, others take 20%
    return hoveredIndex === index ? "60%" : "20%";
  };

  return (
    <section className="py-20 lg:py-32 bg-primary">
      <div className="container-custom section-padding">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
          <div>
            <FadeIn>
              <p className="text-tertiary font-medium mb-4">OUR PORTFOLIO</p>
            </FadeIn>
            <FadeIn delay={100}>
              <h2 className="text-white">
                Featured
                <br />
                Completed Works
              </h2>
            </FadeIn>
          </div>
          <FadeIn delay={200}>
            <p className="text-white max-w-xl mt-6 lg:mt-0">
              Explore our portfolio to see the high-quality plumbing projects we've completed. From emergency repairs to full-scale installations, our work demonstrates our commitment to excellence and customer satisfaction.
            </p>
          </FadeIn>
        </div>

        {/* Projects Grid */}
        <FadeIn delay={300}>
          <div className="flex gap-4">
            {projects.map((project, index) => (
              <div
                key={index}
                className="relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-1000 ease-in-out"
                style={{ width: getCardWidth(index) }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-80 object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-80" />

                {/* Arrow Icon - Only on hover */}
                <div className={`absolute top-4 right-4 transition-opacity duration-300 ${hoveredIndex === index || (hoveredIndex === null && index === 0) ? "opacity-100" : "opacity-0"
                  }`}>
                  <div className="w-10 h-10 rounded-full bg-tertiary flex items-center justify-center">
                    <ArrowUpRight className="h-5 w-5 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h5 className={`text-white text-3xl font-bold mb-2  ${hoveredIndex === index || (hoveredIndex === null && index === 0) ? "opacity-100" : "opacity-0"}`}>{project.title}</h5>
                  <p className={`text-white line-clamp-2 transition-opacity duration-300 ${hoveredIndex === index || (hoveredIndex === null && index === 0) ? "opacity-100" : "opacity-0"
                    }`}>
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default FeaturedWorks;
