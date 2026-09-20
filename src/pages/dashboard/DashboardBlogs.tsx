/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import {
  Blog,
  BlogInsert,
  useAllBlogs,
  useCreateBlog,
  useDeleteBlog,
  useUpdateBlog,
} from "@/hooks/useBlogs";
import { Edit2, Eye, EyeOff, FileText, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const categories = ["Plumbing Tips", "Tips & Tricks", "Repair Tips", "Cleaning", "Maintenance"];

// Quill editor configuration
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "color",
  "background",
  "link",
  "image",
];

export default function DashboardBlogs() {
  const { isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { data: blogs, isLoading } = useAllBlogs();
  const createBlog = useCreateBlog();
  const updateBlog = useUpdateBlog();
  const deleteBlog = useDeleteBlog();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState<Partial<BlogInsert>>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image_url: "",
    category: "Plumbing Tips",
    read_time: "5 min read",
    is_featured: false,
    published: false,
  });

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate("/dashboard");
    }
  }, [isAdmin, loading, navigate]);

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      image_url: "",
      category: "Plumbing Tips",
      read_time: "5 min read",
      is_featured: false,
      published: false,
    });
    setEditingBlog(null);
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      image_url: blog.image_url || "",
      category: blog.category,
      read_time: blog.read_time || "5 min read",
      is_featured: blog.is_featured || false,
      published: blog.published || false,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.slug) {
      toast.error("Title and slug are required");
      return;
    }

    try {
      if (editingBlog) {
        await updateBlog.mutateAsync({
          id: editingBlog.id,
          updates: formData,
        });
        toast.success("Blog updated successfully");
      } else {
        await createBlog.mutateAsync(formData as BlogInsert);
        toast.success("Blog created successfully");
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error: any) {
      toast.error(error.message || "Failed to save blog");
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      await deleteBlog.mutateAsync(id);
      toast.success("Blog deleted successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete blog");
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  if (!isAdmin) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Blog Posts</h1>
          <p className="text-black mt-1">
            Create and manage blog content
          </p>
        </div>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button className="rounded-full">
              <Plus className="w-4 h-4 mr-2" />
              New Blog
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white border border-gray-200">
            <DialogHeader>
              <DialogTitle>
                {editingBlog ? "Edit Blog" : "Create New Blog"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      title: e.target.value,
                      slug: generateSlug(e.target.value),
                    });
                  }}
                  placeholder="Blog title"
                  className="mt-2 bg-transparent"
                />
              </div>

              <div>
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  placeholder="blog-url-slug"
                  className="mt-2 bg-transparent"
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  placeholder="Brief description of the blog"
                  className="mt-2 bg-transparent"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="content">Content</Label>
                <div className="mt-2 bg-white rounded-md border">
                  <ReactQuill
                    theme="snow"
                    value={formData.content || ""}
                    onChange={(value) =>
                      setFormData({ ...formData, content: value })
                    }
                    modules={modules}
                    formats={formats}
                    placeholder="Write your blog content here..."
                    className="min-h-[300px]"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  value={formData.image_url || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, image_url: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                  className="mt-2 bg-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full mt-2 px-3 py-2 border rounded-md bg-transparent"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="read_time">Read Time</Label>
                  <Input
                    id="read_time"
                    value={formData.read_time || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, read_time: e.target.value })
                    }
                    placeholder="5 min read"
                    className="mt-2 bg-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Switch
                    id="is_featured"
                    checked={formData.is_featured}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, is_featured: checked })
                    }
                  />
                  <Label htmlFor="is_featured">Featured</Label>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, published: checked })
                    }
                  />
                  <Label htmlFor="published">Published</Label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    resetForm();
                  }}
                  className="text-white"
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingBlog ? "Update Blog" : "Create Blog"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-white border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            All Posts ({blogs?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-primary">Loading...</div>
          ) : blogs && blogs.length > 0 ? (
            <div className="space-y-4">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-lg border border-gray-200 bg-gray-50"
                >
                  {blog.image_url && (
                    <img
                      src={blog.image_url}
                      alt={blog.title}
                      className="w-full md:w-24 h-24 object-cover rounded-lg"
                    />
                  )}

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-primary truncate">{blog.title}</p>
                      {blog.is_featured && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-primary line-clamp-2">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-primary">
                      <span>{blog.category}</span>
                      <span>{blog.read_time}</span>
                      <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${blog.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                      {blog.published ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                      {blog.published ? "Published" : "Draft"}
                    </span>

                    <button
                      onClick={() => handleEdit(blog)}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDeleteBlog(blog.id)}
                      className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-primary">
              No blog posts yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
