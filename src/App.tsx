
// import { useState, useEffect } from "react";
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner, toast } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
// import Index from "./pages/Index";
// import Analyze from "./pages/Analyze";
// import About from "./pages/About";
// import Docs from "./pages/Docs";
// import NotFound from "./pages/NotFound";
// import SignIn from "./pages/Signin";
// import Login from "./pages/Login";
// import { AuthProvider, useAuth } from "./contexts/AuthContext";

// const Navbar = () => {
//   const { isAuthenticated, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/signin");
//   };

//   return (
//     <nav className="p-4 bg-gray-100 flex justify-between items-center">
//       <div className="space-x-4">
//         <Link to="/">Home</Link>
//         <Link to="/analyze">Analyze Media</Link>
//         <Link to="/about">About</Link>
//         <Link to="/docs">Documentation</Link>
//         {!isAuthenticated && (
//           <>
//             <Link to="/signin">Sign In</Link>
//             <Link to="/login">Login</Link>
//           </>
//         )}
//         {isAuthenticated && (
//           <button onClick={handleLogout}>Sign Out</button>
//         )}
//       </div>
//     </nav>
//   );
// };

// const AppRoutes = () => {
//   const { isAuthenticated } = useAuth();

//   return (
//     <Routes>
//       <Route path="/" element={<Index />} />
//       <Route path="/about" element={<About />} />
//       <Route path="/docs" element={<Docs />} />
//       <Route path="/signin" element={<SignIn />} />
//       <Route path="/login" element={<Login />} />
//       <Route
//         path="/analyze"
//         element={isAuthenticated ? (
//           <>
//             {toast.success("Welcome to Visual Veracity Guard! You are logged in.")}
//             <Analyze />
//           </>
//         ) : (
//           <Login />
//         )}
//       />
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// };

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <AuthProvider>
//         <BrowserRouter>
//           <Navbar />
//           <AppRoutes />
//         </BrowserRouter>
//       </AuthProvider>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar"; // Make sure Navbar is imported
import AppRoutes from "./routes/AppRoutes"; // Import AppRoutes properly

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          {/* <Navbar />     */}
          <AppRoutes /> {/*Only routes here*/}
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
