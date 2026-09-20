import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface Career {
  id: string;
  slug: string;
  title: string;
  type: string;
  location: string;
  about_the_role: string[];
  short_term_goals: string[];
  what_you_bring: string[];
  why_you_might_love: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CareerInsert {
  slug: string;
  title: string;
  type?: string;
  location: string;
  about_the_role?: string[];
  short_term_goals?: string[];
  what_you_bring?: string[];
  why_you_might_love?: string[];
  is_active?: boolean;
}

export interface CareerUpdate {
  slug?: string;
  title?: string;
  type?: string;
  location?: string;
  about_the_role?: string[];
  short_term_goals?: string[];
  what_you_bring?: string[];
  why_you_might_love?: string[];
  is_active?: boolean;
}

// Fetch all active careers (public)
export const useCareers = () => {
  return useQuery({
    queryKey: ["careers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("careers")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Career[];
    },
  });
};

// Fetch single career by slug
export const useCareerBySlug = (slug: string | undefined) => {
  return useQuery({
    queryKey: ["career", slug],
    queryFn: async () => {
      if (!slug) return null;
      const { data, error } = await supabase
        .from("careers")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) throw error;
      return data as Career | null;
    },
    enabled: !!slug,
  });
};

// Fetch all careers for admin (including inactive)
export const useAdminCareers = () => {
  return useQuery({
    queryKey: ["admin-careers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("careers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Career[];
    },
  });
};

// Create career
export const useCreateCareer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (career: CareerInsert) => {
      const { data, error } = await supabase
        .from("careers")
        .insert(career)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["careers"] });
      queryClient.invalidateQueries({ queryKey: ["admin-careers"] });
      toast.success("Career opening created successfully");
    },
    onError: (error) => {
      toast.error(`Failed to create career: ${error.message}`);
    },
  });
};

// Update career
export const useUpdateCareer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: CareerUpdate }) => {
      const { data, error } = await supabase
        .from("careers")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["careers"] });
      queryClient.invalidateQueries({ queryKey: ["admin-careers"] });
      toast.success("Career opening updated successfully");
    },
    onError: (error) => {
      toast.error(`Failed to update career: ${error.message}`);
    },
  });
};

// Delete career
export const useDeleteCareer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("careers").delete().eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["careers"] });
      queryClient.invalidateQueries({ queryKey: ["admin-careers"] });
      toast.success("Career opening deleted successfully");
    },
    onError: (error) => {
      toast.error(`Failed to delete career: ${error.message}`);
    },
  });
};
