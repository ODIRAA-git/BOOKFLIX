import { createContext } from "react";
import type { AuthError, User } from "@supabase/supabase-js";

export interface AuthContextValue {
  user: User | null;
  /** True until the initial session check has finished */
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
