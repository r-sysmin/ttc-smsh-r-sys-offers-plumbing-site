import plumberTeam from "@/assets/plumber-team.jpg";
import CTA from "@/components/CTA";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { usePublishedBlogs } from "@/hooks/useBlogs";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const categories = ["All", "Latest", "Popular", "Plumbing Tips", "Tips & Tricks"];
const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: blogs, isLoading } = usePublishedBlogs();

  const featuredPost = useMemo(() => {
    return blogs?.find((b) => b.is_featured) || blogs?.[0];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    if (!blogs) return [];
    if (activeCategory === "All" || activeCategory === "Latest") {
      return blogs;
    }
    if (activeCategory === "Popular") {
      return blogs.slice(0, 6);
    }
    return blogs.filter((b) => b.category === activeCategory);
  }, [blogs, activeCategory]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-accent motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Loading...</span>
        </div>
      </div>
    );
  }

  return <div className="min-h-screen bg-white">
    <Header />

    {/* Hero Section */}
    <FadeIn>
      <section className="pt-32 pb-16 bg-white">
        <div className="container-custom section-padding">
          {/* Breadcrumb */}
          <p className="text-muted-foreground text-sm mb-4">Home / Blogs</p>

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-12">
            <h1 className="text-black font-bold">Our Latest Blogs</h1>
            <p className="text-muted-foreground max-w-lg font-medium ">
              Stay informed with our latest insights, tips, and updates on plumbing trends and solutions. Dive into expert advice and discover how to maintain your plumbing systems.
            </p>
          </div>

          {/* Featured Blog */}
          {featuredPost && (
            <Link to={`/blog/${featuredPost.slug}`}>
              <div className="bg-[#F4F4F7] rounded-3xl overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-12">
                  <div className="relative pl-12 py-10">
                    <img src={featuredPost.image_url || plumberTeam} alt={featuredPost.title} className="w-full h-[420px] object-cover rounded-2xl" />
                    <span className="absolute top-16 left-16 bg-tertiary text-primary text-sm font-medium px-4 py-1 rounded-full">
                      {featuredPost.category}
                    </span>
                  </div>
                  <div className="pr-12 flex flex-col justify-center bg-neutral-100">
                    <p className="text-secondary font-bold mb-3">Featured Blog</p>
                    <h3 className="text-black font-bold mb-4">{featuredPost.title}</h3>
                    <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                    <p className="text-muted-foreground text-sm">
                      {new Date(featuredPost.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · {featuredPost.read_time}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
      </section>
    </FadeIn>

    {/* All Blogs Section */}
    <FadeIn>
      <section className="py-16 bg-white">
        <div className="container-custom section-padding">
          <h2 className="text-primary text-center mb-8">All Latest Blogs</h2>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(category => <button key={category} onClick={() => setActiveCategory(category)} className={`px-6 py-2 rounded-full border border-border hover:border-primary text-sm font-medium transition-all ${activeCategory === category ? "bg-primary text-white" : "bg-white text-primary"}`}>
              {category}
            </button>)}
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((post, index) => <FadeIn key={post.id} delay={index * 100}>
              <Link to={`/blog/${post.slug}`}>
                <article className="group cursor-pointer bg-inherit">
                  <div className="relative rounded-2xl overflow-hidden mb-4">
                    <img src={post.image_url || plumberTeam} alt={post.title} className="w-full h-[340px] object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-4 left-4 bg-tertiary text-primary text-xs font-medium px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <h5 className="text-black font-bold mb-3 group-hover:text-secondary transition-colors">
                    {post.title}
                  </h5>
                  <p className="text-muted-foreground font-medium text-base">
                    {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · {post.read_time}
                  </p>
                </article>
              </Link>
            </FadeIn>)}
          </div>
        </div>
      </section>
    </FadeIn>

    <FadeIn>
      <CTA />
    </FadeIn>
    <Footer />
  </div>;
};
export default Blog;