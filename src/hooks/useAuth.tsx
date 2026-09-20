import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const initialCheckDone = useRef(false);

  useEffect(() => {
    let mounted = true;

    // Check for existing session FIRST
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;

      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        checkAdminRole(session.user.id).finally(() => {
          if (mounted) {
            setLoading(false);
            initialCheckDone.current = true;
          }
        });
      } else {
        setIsAdmin(false);
        setLoading(false);
        initialCheckDone.current = true;
      }
    });

    // THEN set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;

      setSession(session);
      setUser(session?.user ?? null);

      // Only show loading on initial auth check, not on subsequent state changes
      if (session?.user) {
        // Don't set loading=true if initial check is done
        if (!initialCheckDone.current) {
          setLoading(true);
        }

        checkAdminRole(session.user.id).finally(() => {
          if (mounted) {
            setLoading(false);
            initialCheckDone.current = true;
          }
        });
      } else {
        setIsAdmin(false);
        if (!initialCheckDone.current) {
          setLoading(false);
          initialCheckDone.current = true;
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const checkAdminRole = async (userId: string) => {
    // Use the security-definer function so we don't depend on reading user_roles via RLS
    const { data, error } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "admin",
    });

    if (error) {
      setIsAdmin(false);
      return;
    }

    setIsAdmin(Boolean(data));
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string, fullName?: string, phone?: string) => {
    const redirectUrl = `${window.location.origin}/`;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
          phone: phone,
        },
      },
    });
    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return {
    user,
    session,
    loading,
    isAdmin,
    signIn,
    signUp,
    signOut,
  };
};
