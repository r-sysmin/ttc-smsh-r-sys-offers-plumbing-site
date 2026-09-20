import heroGrid2 from "@/assets/hero-grid-2.jpg";
import plumberTeam from "@/assets/plumber-team.jpg";
import CTA from "@/components/CTA";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useBlog, usePublishedBlogs } from "@/hooks/useBlogs";
import DOMPurify from "dompurify";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const socialLinks = [
  { icon: Facebook, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Linkedin, href: "#" },
];

const BlogDetail = () => {
  const { slug } = useParams();
  const { data: post, isLoading } = useBlog(slug || "");
  const { data: allBlogs } = usePublishedBlogs();

  const relatedPosts = allBlogs?.filter((p) => p.slug !== slug).slice(0, 3) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <section className="py-32 md:py-40 text-center">
          <h1 className="text-primary">Blog not found</h1>
          <Link to="/blog" className="text-secondary hover:underline mt-4 inline-block">
            Back to blogs
          </Link>
        </section>
        <Footer />
      </div>
    );
  }

  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <FadeIn>
        <section className="pt-32 pb-8 bg-white">
          <div className="container-custom section-padding">
            {/* Meta */}
            <p className="text-muted-foreground text-sm text-center mb-4">
              {formattedDate} · {post.read_time}
            </p>

            {/* Title */}
            <h1 className="text-primary text-center max-w-3xl mx-auto mb-10">
              {post.title}
            </h1>

            {/* Main Image */}
            <div className="rounded-3xl overflow-hidden mb-8">
              <img
                src={post.image_url || plumberTeam}
                alt={post.title}
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Content Section */}
      <FadeIn>
        <section className="py-8 bg-white">
          <div className="container-custom section-padding">
            <div className="max-w-5xl mx-auto">
              {/* Intro Paragraph */}
              {post.excerpt && (
                <p className="text-muted-foreground mb-10 leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {/* Content */}
              {post.content ? (
                <div
                  className="prose prose-lg max-w-none text-muted-foreground mb-10"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(post.content, {
                      USE_PROFILES: { html: true },
                    }),
                  }}
                />
              ) : (
                <>
                  {/* Default content sections */}
                  <h4 className="text-primary mb-4">Avoid Costly Repairs</h4>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    As water heaters age, they become more prone to leaks and other malfunctions. Repairing an old water heater can become increasingly expensive, and these costs can add up quickly. By replacing your water heater before it fails, you can avoid the expense of frequent repairs.
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground mb-8 space-y-2">
                    <li>Regular maintenance can extend the life of your plumbing systems.</li>
                    <li>Early detection of issues can save you money on repairs.</li>
                    <li>Professional inspections ensure everything is working properly.</li>
                  </ul>

                  <h4 className="text-primary mb-4">Improve Efficiency</h4>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Newer water heater models are significantly more energy-efficient than older ones. Upgrading to a modern unit can help reduce your energy consumption and lower your utility bills. This is not only good for your wallet but also beneficial for the environment.
                  </p>

                  <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h4 className="text-primary mb-4">Increase Home Value</h4>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        A well-maintained plumbing system can increase your home's value and appeal to potential buyers.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Modern fixtures and efficient systems are attractive features that can set your property apart.
                      </p>
                    </div>
                    <div className="rounded-2xl overflow-hidden">
                      <img
                        src={heroGrid2}
                        alt="Plumber at work"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Share Section */}
              <div className="flex items-center justify-between py-6 px-4 rounded-lg bg-[#F4F4F7]">
                <span className="text-muted-foreground text-sm">Share the article</span>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="w-10 h-10 rounded-full group bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-white transition-colors"
                    >
                      <social.icon className="h-4 w-4 text-white group-hover:text-black" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Related Blogs Section */}
      {relatedPosts.length > 0 && (
        <FadeIn>
          <section className="pt-16 bg-white">
            <div className="container-custom section-padding">
              <h2 className="text-primary text-center mb-12">Related Blogs</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <FadeIn key={relatedPost.id} delay={index * 100}>
                    <Link to={`/blog/${relatedPost.slug}`}>
                      <article className="group cursor-pointer bg-inherit">
                        <div className="relative rounded-2xl overflow-hidden mb-4">
                          <img
                            src={relatedPost.image_url || plumberTeam}
                            alt={relatedPost.title}
                            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute top-4 left-4 bg-tertiary text-primary text-xs font-medium px-3 py-1 rounded-full">
                            {relatedPost.category}
                          </span>
                        </div>
                        <h5 className="text-primary mb-2 group-hover:text-secondary transition-colors">
                          {relatedPost.title}
                        </h5>
                        <p className="text-muted-foreground text-sm">
                          {new Date(relatedPost.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · {relatedPost.read_time}
                        </p>
                      </article>
                    </Link>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>
      )}

      <FadeIn>
        <CTA />
      </FadeIn>
      <Footer />
    </div>
  );
};

export default BlogDetail;
