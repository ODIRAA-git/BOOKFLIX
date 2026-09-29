import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  // Check for existing session on mount and keep it in sync
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = (email: string, password: string, fullName: string) =>
    supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

  const signIn = (email: string, password: string) =>
    supabase.auth.signInWithPassword({
      email,
      password,
    });

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return { user, signUp, signIn, signOut };
}
