import service1 from "@/assets/service-1.png";
import service2 from "@/assets/service-2.png";
import service3 from "@/assets/service-3.png";
import service4 from "@/assets/service-4.png";
import service5 from "@/assets/service-5.png";
import service6 from "@/assets/service-6.png";

export interface Service {
  number: string;
  image: string;
  title: string;
  slug: string;
  description: string;
  basePrice: number; // Base price per hour
  complexityOptions: ComplexityOption[];
}

export interface ComplexityOption {
  label: string;
  multiplier: number;
  description: string;
}

export const services: Service[] = [
  {
    number: "01",
    image: service1,
    title: "Faucet & Leak Repairs",
    slug: "faucet-leak-repairs",
    description:
      "Restore your plumbing fixtures to optimal condition. Our precise and efficient repairs help conserve water and enhance the functionality of your plumbing system.",
    basePrice: 75,
    complexityOptions: [
      { label: "Simple Repair", multiplier: 1, description: "Minor faucet fix or small leak" },
      { label: "Moderate Repair", multiplier: 1.5, description: "Multiple fixtures or hidden leaks" },
      { label: "Complex Repair", multiplier: 2, description: "Pipe replacement or major work" },
    ],
  },
  {
    number: "02",
    image: service2,
    title: "Remodeling Service",
    slug: "remodeling-service",
    description:
      "We work closely with you to design and install plumbing systems that meet your aesthetic and functional needs, transforming your spaces into modern, efficient areas.",
    basePrice: 150,
    complexityOptions: [
      { label: "Small Project", multiplier: 1, description: "Single fixture upgrade" },
      { label: "Medium Project", multiplier: 2, description: "Bathroom or kitchen partial remodel" },
      { label: "Large Project", multiplier: 3.5, description: "Full bathroom or kitchen remodel" },
    ],
  },
  {
    number: "03",
    image: service3,
    title: "Sewer Repair & Cleaning",
    slug: "sewer-repair-cleaning",
    description:
      "Our team is available 24/7 to tackle leaks, burst pipes, and other critical plumbing problems, ensuring your home or business runs smoothly.",
    basePrice: 125,
    complexityOptions: [
      { label: "Routine Cleaning", multiplier: 1, description: "Standard sewer line cleaning" },
      { label: "Minor Repair", multiplier: 1.75, description: "Small section repair or root removal" },
      { label: "Major Repair", multiplier: 3, description: "Full line replacement or excavation" },
    ],
  },
  {
    number: "04",
    image: service4,
    title: "Drain Cleaning & Repairs",
    slug: "drain-cleaning-repairs",
    description:
      "Using advanced tools and techniques, we remove blockages and buildup from your pipes, restoring proper flow and preventing future issues.",
    basePrice: 85,
    complexityOptions: [
      { label: "Simple Clog", multiplier: 1, description: "Single drain unclogging" },
      { label: "Multiple Drains", multiplier: 1.5, description: "2-3 drains or deeper blockage" },
      { label: "Main Line", multiplier: 2.5, description: "Main sewer line or camera inspection" },
    ],
  },
  {
    number: "05",
    image: service5,
    title: "Water Line Repair",
    slug: "water-line-repair",
    description:
      "Expert water line repairs and replacements to ensure clean water supply throughout your property with minimal disruption.",
    basePrice: 100,
    complexityOptions: [
      { label: "Minor Leak", multiplier: 1, description: "Small leak repair or fitting replacement" },
      { label: "Section Repair", multiplier: 2, description: "Partial pipe replacement" },
      { label: "Full Replacement", multiplier: 4, description: "Complete water line replacement" },
    ],
  },
  {
    number: "06",
    image: service6,
    title: "Gas Line Services",
    slug: "gas-line-services",
    description:
      "Safe and certified gas line installation, repair, and inspection by licensed professionals for your peace of mind.",
    basePrice: 150,
    complexityOptions: [
      { label: "Inspection", multiplier: 0.75, description: "Safety inspection and leak detection" },
      { label: "Minor Repair", multiplier: 1.5, description: "Small repair or fitting replacement" },
      { label: "Installation", multiplier: 3, description: "New gas line installation" },
    ],
  },
];

export const getServiceBySlug = (slug: string): Service | undefined => {
  return services.find((s) => s.slug === slug);
};
