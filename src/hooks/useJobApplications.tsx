import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface JobApplication {
  id: string;
  career_id: string | null;
  job_title: string;
  full_name: string;
  email: string;
  phone: string;
  current_company: string | null;
  linkedin_url: string | null;
  cv_link: string | null;
  note: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface JobApplicationInsert {
  career_id?: string | null;
  job_title: string;
  full_name: string;
  email: string;
  phone: string;
  current_company?: string | null;
  linkedin_url?: string | null;
  cv_link?: string | null;
  note?: string | null;
}

// Fetch all job applications (admin)
export const useJobApplications = () => {
  return useQuery({
    queryKey: ["job-applications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("job_applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as JobApplication[];
    },
  });
};

// Create job application (public)
export const useCreateJobApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (application: JobApplicationInsert) => {
      const { data, error } = await supabase
        .from("job_applications")
        .insert(application)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
      toast.success("Application submitted successfully! We'll be in touch soon.");
    },
    onError: (error) => {
      toast.error(`Failed to submit application: ${error.message}`);
    },
  });
};

// Update job application status (admin)
export const useUpdateJobApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { data, error } = await supabase
        .from("job_applications")
        .update({ status })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
      toast.success("Application status updated");
    },
    onError: (error) => {
      toast.error(`Failed to update application: ${error.message}`);
    },
  });
};

// Delete job application (admin)
export const useDeleteJobApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("job_applications").delete().eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
      toast.success("Application deleted");
    },
    onError: (error) => {
      toast.error(`Failed to delete application: ${error.message}`);
    },
  });
};
