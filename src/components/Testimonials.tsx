import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import FadeIn from "@/components/FadeIn";

const testimonials = [{
  name: "Esther Steward",
  location: "San Francisco, CA",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ex urna, pretium id nunc vitae, aliquet dignissim nisi. Nullam.",
  avatar: avatar1
}, {
  name: "Bessie Cooper",
  location: "Chicago, IL",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ex urna, pretium id nunc vitae, aliquet dignissim nisi. Nullam.",
  avatar: avatar2
}, {
  name: "Annette Black",
  location: "Chicago, IL",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ex urna, pretium id nunc vitae, aliquet dignissim nisi. Nullam.",
  avatar: avatar3
}, {
  name: "Marvin Howard",
  location: "Chicago, IL",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ex urna, pretium id nunc vitae, aliquet dignissim nisi. Nullam.",
  avatar: avatar1
}, {
  name: "Marvin McKinney",
  location: "San Francisco, CA",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ex urna, pretium id nunc vitae, aliquet dignissim nisi. Nullam.",
  avatar: avatar2
}];

const TestimonialCard = ({
  name,
  location,
  text,
  avatar
}: typeof testimonials[0]) => <div className="bg-white rounded-2xl p-6 min-w-[320px] max-w-[320px] flex-shrink-0">
    <div className="flex items-center gap-3 mb-4">
      <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover" />
      <div>
        <h6 className="font-semibold text-base text-secondary">{name}</h6>
        <p className="text-muted-foreground text-sm">{location}</p>
      </div>
    </div>
    <p className="text-muted-foreground text-sm leading-relaxed">{text}</p>
  </div>;

const Testimonials = () => {
  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];
  return <section className="py-20 lg:py-32 bg-primary overflow-hidden">
    <div className="container-custom section-padding">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
        <div>
          <FadeIn>
            <p className="text-tertiary font-medium mb-4">TESTIMONIAL</p>
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
    </div>

    {/* Marquee Row 1 - Slides Left */}
    <FadeIn delay={300}>
      <div className="relative mb-4">
        <div className="flex gap-4 animate-marquee-left">
          {duplicatedTestimonials.map((testimonial, index) => <TestimonialCard key={`row1-${index}`} {...testimonial} />)}
        </div>
      </div>
    </FadeIn>

    {/* Marquee Row 2 - Slides Right */}
    <FadeIn delay={400}>
      <div className="relative">
        <div className="flex gap-4 animate-marquee-right">
          {duplicatedTestimonials.map((testimonial, index) => <TestimonialCard key={`row2-${index}`} {...testimonial} />)}
        </div>
      </div>
    </FadeIn>
  </section>;
};
export default Testimonials;