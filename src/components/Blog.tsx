import plumberTeam from "@/assets/plumber-team.jpg";
import FadeIn from "@/components/FadeIn";
import { usePublishedBlogs } from "@/hooks/useBlogs";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Blog = () => {
  const { data: blogs, isLoading } = usePublishedBlogs();
  const displayBlogs = blogs?.slice(0, 3) || [];

  return (
    <section id="blog" className="pt-10 lg:pt-32 bg-white">
      <div className="container-custom section-padding">
        {/* Header */}
        <div className="text-center mb-12">
          <FadeIn>
            <p className="text-secondary font-medium mb-4">KNOWLEDGE</p>
          </FadeIn>
          <FadeIn delay={100}>
            <h2 className="text-primary">Read Updated Journal</h2>
          </FadeIn>
        </div>

        {/* Blog Grid */}
        {isLoading ? (
          <div className="text-center text-muted-foreground">Loading blogs...</div>
        ) : displayBlogs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayBlogs.map((post, index) => (
              <FadeIn key={post.id} delay={index * 100}>
                <Link to={`/blog/${post.slug}`}>
                  <article className="group cursor-pointer bg-inherit">
                    <div className="relative rounded-2xl overflow-hidden mb-4">
                      <img
                        src={post.image_url || plumberTeam}
                        alt={post.title}
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-4 left-4 bg-tertiary text-primary text-xs font-medium px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <h5 className="text-primary mb-2 group-hover:text-secondary transition-colors">
                      {post.title}
                    </h5>
                    <p className="text-muted-foreground text-sm">
                      {new Date(post.created_at).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })} · {post.read_time}
                    </p>
                  </article>
                </Link>
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">No blogs available yet.</div>
        )}

        <div className="flex w-full mt-16 items-center justify-center">
          <Link to="/blog">
            <Button
              size="default"
              className="group relative overflow-hidden font-semibold rounded-full px-6 bg-transparent hover:bg-transparent text-primary border border-primary"
            >
              <span className="flex items-center gap-2 transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0">
                See All Blogs
              </span>
              <span className="absolute inset-0 flex items-center justify-center gap-2 transition-all duration-300 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                See All Blogs
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;
