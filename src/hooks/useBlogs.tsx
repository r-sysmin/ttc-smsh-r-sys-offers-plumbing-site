import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  image_url: string | null;
  category: string;
  read_time: string | null;
  is_featured: boolean | null;
  published: boolean | null;
  created_at: string;
  updated_at: string;
}

export type BlogInsert = Omit<Blog, 'id' | 'created_at' | 'updated_at'>;
export type BlogUpdate = Partial<BlogInsert>;

// Fetch all published blogs (public)
export const usePublishedBlogs = () => {
  return useQuery({
    queryKey: ['blogs', 'published'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Blog[];
    },
  });
};

// Fetch single blog by slug (public)
export const useBlog = (slug: string) => {
  return useQuery({
    queryKey: ['blogs', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();
      
      if (error) throw error;
      return data as Blog | null;
    },
    enabled: !!slug,
  });
};

// Fetch all blogs (admin only)
export const useAllBlogs = () => {
  return useQuery({
    queryKey: ['blogs', 'all'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Blog[];
    },
  });
};

// Create blog (admin only)
export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (blog: BlogInsert) => {
      const { data, error } = await supabase
        .from('blogs')
        .insert(blog)
        .select()
        .single();
      
      if (error) throw error;
      return data as Blog;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
};

// Update blog (admin only)
export const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: BlogUpdate }) => {
      const { data, error } = await supabase
        .from('blogs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as Blog;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
};

// Delete blog (admin only)
export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
};
