// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
// import { AuthContextType } from "../contexts/AuthContext";

// interface AuthContextProps extends AuthContextType {
//   login: (email: string, password: string) => Promise<void>;
// }

// const SignIn = () => {
//   const { login } = useAuth() as AuthContextProps;
//   const navigate = useNavigate();

//   const handleSignIn = () => {
//     login("demo@example.com", "password");
//     navigate("/analyze");
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Sign In</h1>
//       <button onClick={handleSignIn} className="bg-blue-500 text-white px-4 py-2 rounded">
//         Demo Sign In
//       </button>
//     </div>
//   );
// };

// export default SignIn;


// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";

// const SignIn = () => {
//   const { signIn } = useAuth();
//   const navigate = useNavigate();

//   const handleSignIn = async () => {
//     try {
//       await signIn("demo@example.com", "password");
//       navigate("/analyze");
//     } catch (err) {
//       console.error("Login failed", err);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Sign In</h1>
//       <button onClick={handleSignIn} className="bg-blue-500 text-white px-4 py-2 rounded">
//         Demo Sign In
//       </button>
//     </div>
//   );
// };

// export default SignIn;


import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // ✅ added useNavigate
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import { useAuth } from "@/contexts/AuthContext";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate(); // ✅

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn(email, password);
      navigate("/"); // ✅ redirect to home
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Log In" subtitle="Access your account">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email input */}
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-white/60" />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
            required
          />
        </div>

        {/* Password input */}
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-white/60" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-white/60 hover:text-white"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          className="w-full bg-white hover:bg-white/90 text-cyberblue"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>

        {/* Link to Sign Up */}
        <p className="text-center text-white/80">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-white hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default SignIn;
