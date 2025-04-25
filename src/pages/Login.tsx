
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Eye, EyeOff, Mail, Lock } from "lucide-react";
// import AuthLayout from "@/components/AuthLayout";
// import { useAuth } from "@/contexts/AuthContext";

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const { signIn } = useAuth();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     try {
//       await signIn(email, password);
//     } catch (error) {
//       console.error("Login error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <AuthLayout 
//       title="Welcome Back" 
//       subtitle="Log in to access DeepFake Detection System"
//     >
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="relative">
//           <Mail className="absolute left-3 top-3 h-5 w-5 text-white/60" />
//           <Input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
//             required
//           />
//         </div>

//         <div className="relative">
//           <Lock className="absolute left-3 top-3 h-5 w-5 text-white/60" />
//           <Input
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
//             required
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-3 text-white/60 hover:text-white"
//           >
//             {showPassword ? (
//               <EyeOff className="h-5 w-5" />
//             ) : (
//               <Eye className="h-5 w-5" />
//             )}
//           </button>
//         </div>

//         <Button 
//           type="submit" 
//           className="w-full bg-white hover:bg-white/90 text-cyberblue"
//           disabled={isLoading}
//         >
//           {isLoading ? "Logging in..." : "Log In"}
//         </Button>

//         <p className="text-center text-white/80">
//           Don't have an account?{" "}
//           <Link to="/signup" className="text-white hover:underline">
//             Sign Up
//           </Link>
//         </p>
//       </form>
//     </AuthLayout>
//   );
// };

// export default Login;


import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn(email, password);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyberprimary via-cybersecondary to-cyberaccent animate-gradientShift text-white">
      <div className="bg-black bg-opacity-40 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-cyberprimary via-cybersecondary to-cyberaccent bg-clip-text text-transparent animate-gradientShift">
          Welcome Back
        </h1>
        <p className="text-center text-white/70 mb-6">
          Log in to access DeepFake Detection System
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
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
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          <Button
            type="submit"
            className="w-full bg-white hover:bg-white/90 text-cyberblue font-semibold tracking-wide"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </Button>

          <p className="text-center text-white/80">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-white hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
