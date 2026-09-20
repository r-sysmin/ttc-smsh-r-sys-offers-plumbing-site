import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export interface UserProfile {
  id: string;
  user_id: string;
  full_name: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

export const useUserProfile = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["user_profile", userId],
    queryFn: async () => {
      if (!userId) return null;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          // No profile found
          return null;
        }
        throw error;
      }
      return data as UserProfile;
    },
    enabled: !!userId,
  });
};
