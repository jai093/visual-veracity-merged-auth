// import { createContext, useContext, useEffect, useState, ReactNode } from "react";
// import { Session, User } from "@supabase/supabase-js";
// import { supabase } from "@/integrations/supabase/client";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// // ✅ Exporting AuthContextType to fix import issues in SignIn.tsx
// export interface AuthContextType {
//   user: User | null;
//   session: Session | null;
//   isAuthenticated: boolean;
//   signIn: (email: string, password: string) => Promise<void>;
//   signUp: (email: string, password: string) => Promise<void>;
//   signOut: () => Promise<void>;
//   logout: () => Promise<void>;
//   emailConfirmationSent: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [session, setSession] = useState<Session | null>(null);
//   const [emailConfirmationSent, setEmailConfirmationSent] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((event, session) => {
//       console.log("Auth event:", event);
//       setSession(session);
//       setUser(session?.user ?? null);

//       if (event === "SIGNED_IN") {
//         toast.success("Welcome to Visual Veracity Guard! You are logged in.");
//         navigate("/analyze");
//       }
//       if (event === "SIGNED_OUT") {
//         navigate("/login");
//       }
//       if (event === "USER_UPDATED") {
//         toast.success("Your account has been updated");
//       }
//     });

//     // Handle email error in URL hash
//     const hash = window.location.hash;
//     if (hash && hash.includes("error=")) {
//       const errorMsg = decodeURIComponent(hash.split("error=")[1].split("&")[0]);
//       toast.error(errorMsg || "Error with email confirmation");
//     }

//     // Fetch existing session on load
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session);
//       setUser(session?.user ?? null);
//     });

//     return () => subscription.unsubscribe();
//   }, [navigate]);

//   const signIn = async (email: string, password: string) => {
//     const { error } = await supabase.auth.signInWithPassword({ email, password });
//     if (error) {
//       if (error.message.includes("Email not confirmed")) {
//         toast.error("Please confirm your email before signing in.");
//       } else {
//         toast.error(error.message);
//       }
//       throw error;
//     }
//   };

//   const signUp = async (email: string, password: string) => {
//     const { error, data } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         emailRedirectTo: window.location.origin,
//       },
//     });

//     if (error) {
//       toast.error(error.message);
//       throw error;
//     }

//     if (data.user && !data.user.email_confirmed_at) {
//       setEmailConfirmationSent(true);
//       toast.success("Check your email to confirm your account!");
//     } else {
//       toast.success("Account created successfully!");
//     }
//   };

//   const signOut = async () => {
//     const { error } = await supabase.auth.signOut();
//     if (error) {
//       toast.error(error.message);
//       throw error;
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         session,
//         isAuthenticated: !!user,
//         signIn,
//         signUp,
//         signOut,
//         logout: signOut, // alias
//         emailConfirmationSent,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  logout: () => Promise<void>;
  emailConfirmationSent: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [emailConfirmationSent, setEmailConfirmationSent] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error.message);
      } else {
        setSession(data.session);
        setUser(data.session?.user ?? null);
      }
    };

    checkSession();

    const hash = window.location.hash;
    if (hash.includes('error=')) {
      const errorMsg = decodeURIComponent(hash.split('error=')[1].split('&')[0]);
      toast.error(errorMsg || "Error with email confirmation");
    }

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      if (error.message.includes("Email not confirmed")) {
        toast.error("Please confirm your email before signing in.");
      } else {
        toast.error(error.message);
      }
      throw error;
    }
    toast.success("Successfully signed in!");
  };

  const signUp = async (email: string, password: string) => {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`, // ✅ correct redirect
      },
    });

    if (error) {
      toast.error(error.message);
      throw error;
    }

    if (data.user && !data.user.email_confirmed_at) {
      setEmailConfirmationSent(true);
      toast.success("Check your email to confirm your account!");
    } else {
      toast.success("Account created successfully!");
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
      throw error;
    }
    toast.success("Signed out successfully!");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAuthenticated: !!user,
        signIn,
        signUp,
        signOut,
        logout: signOut,
        emailConfirmationSent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
