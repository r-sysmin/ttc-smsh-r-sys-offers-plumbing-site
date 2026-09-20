import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface QuoteRequest {
  id: string;
  user_id: string | null;
  full_name: string;
  phone: string;
  email: string | null;
  service_slug: string;
  service_title: string;
  complexity_label: string;
  complexity_multiplier: number;
  estimated_hours: number;
  urgency: string;
  base_price: number;
  estimated_min: number;
  estimated_max: number;
  notes: string | null;
  status: string;
  service_date: string | null;
  created_at: string;
  updated_at: string;
}

// Admin: Fetch all quote requests
export const useAllQuoteRequests = () => {
  return useQuery({
    queryKey: ["quote_requests"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("quote_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as QuoteRequest[];
    },
  });
};

// Update quote request status
export const useUpdateQuoteRequestStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { data, error } = await supabase
        .from("quote_requests")
        .update({ status })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quote_requests"] });
    },
  });
};

// Delete quote request
export const useDeleteQuoteRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("quote_requests").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quote_requests"] });
      queryClient.invalidateQueries({ queryKey: ["user_quotes"] });
    },
  });
};

// User: Fetch their own quote requests
export const useUserQuoteRequests = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["user_quotes", userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from("quote_requests")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as QuoteRequest[];
    },
    enabled: !!userId,
  });
};

// Create quote request (for logged-in users)
export const useCreateQuoteRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (quoteData: {
      user_id: string;
      full_name: string;
      phone: string;
      email: string | null;
      service_slug: string;
      service_title: string;
      complexity_label: string;
      complexity_multiplier: number;
      estimated_hours: number;
      urgency: string;
      base_price: number;
      estimated_min: number;
      estimated_max: number;
      notes: string | null;
      service_date: string | null;
    }) => {
      const { data, error } = await supabase
        .from("quote_requests")
        .insert(quoteData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_quotes"] });
      queryClient.invalidateQueries({ queryKey: ["quote_requests"] });
    },
  });
};
