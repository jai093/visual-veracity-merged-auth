
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Eye, EyeOff, Mail, Lock } from "lucide-react";
// import AuthLayout from "@/components/AuthLayout";
// import { useAuth } from "@/contexts/AuthContext";

// const Signup = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const { signUp, emailConfirmationSent } = useAuth();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     try {
//       await signUp(email, password);
//     } catch (error) {
//       console.error("Signup error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (emailConfirmationSent) {
//     return (
//       <AuthLayout 
//         title="Check Your Email" 
//         subtitle="We've sent a confirmation link to your email address"
//       >
//         <div className="space-y-6 text-center">
//           <div className="p-6 bg-white/10 rounded-lg">
//             <Mail className="mx-auto h-12 w-12 text-white mb-4" />
//             <p className="text-white text-lg">
//               Please check your inbox at <strong>{email}</strong> and click the confirmation link to activate your account.
//             </p>
//           </div>
          
//           <div className="text-white/80">
//             <p>Didn't receive an email? Check your spam folder or</p>
//             <Button 
//               variant="link" 
//               className="text-white underline p-0 h-auto" 
//               onClick={() => window.location.reload()}
//             >
//               try signing up again
//             </Button>
//           </div>
          
//           <div className="pt-4">
//             <Link to="/login">
//               <Button className="w-full bg-white hover:bg-white/90 text-cyberblue">
//                 Back to Login
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </AuthLayout>
//     );
//   }

//   return (
//     <AuthLayout 
//       title="Create Account" 
//       subtitle="Join us in fighting against deepfake content"
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
//           {isLoading ? "Creating account..." : "Sign Up"}
//         </Button>

//         <p className="text-center text-white/80">
//           Already have an account?{" "}
//           <Link to="/login" className="text-white hover:underline">
//             Log In
//           </Link>
//         </p>
//       </form>
//     </AuthLayout>
//   );
// };

// export default Signup;


import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import { useAuth } from "@/contexts/AuthContext";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, emailConfirmationSent } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signUp(email, password);
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (emailConfirmationSent) {
    return (
      <AuthLayout
        title="Check Your Email"
        subtitle="We've sent a confirmation link to your email address"
      >
        <div className="space-y-6 text-center">
          <div className="p-6 bg-white/10 rounded-lg backdrop-blur-md">
            <Mail className="mx-auto h-12 w-12 text-white mb-4" />
            <p className="text-white text-lg">
              Please check your inbox at <strong>{email}</strong> and click the confirmation link to activate your account.
            </p>
          </div>

          <div className="text-white/80">
            <p>Didn't receive an email? Check your spam folder or</p>
            <Button
              variant="link"
              className="text-white underline p-0 h-auto"
              onClick={() => window.location.reload()}
            >
              try signing up again
            </Button>
          </div>

          <div className="pt-4">
            <Link to="/login">
              <Button className="w-full bg-white hover:bg-white/90 text-cyberblue">
                Back to Login
              </Button>
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyberprimary via-cybersecondary to-cyberaccent animate-gradientShift text-white">
      <div className="bg-black bg-opacity-40 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-cyberprimary via-cybersecondary to-cyberaccent bg-clip-text text-transparent animate-gradientShift">
          Create Account
        </h1>
        <p className="text-center text-white/70 mb-6">
          Join us in fighting against deepfake content
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
            {isLoading ? "Creating account..." : "Sign Up"}
          </Button>

          <p className="text-center text-white/80">
            Already have an account?{" "}
            <Link to="/login" className="text-white hover:underline">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
