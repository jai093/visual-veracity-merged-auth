import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function handleAuth() {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error(error);
      }
      if (data?.session) {
        navigate("/analyze"); // Redirect to your dashboard after login
      } else {
        navigate("/login"); // If no session, redirect to login
      }
    }

    handleAuth();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Signing you in...</h1>
    </div>
  );
};

export default AuthCallback;
