// import { Routes, Route } from "react-router-dom";
// import { toast } from "sonner";
// import Index from "../pages/Index";
// import Analyze from "../pages/Analyze";
// import About from "../pages/About";
// import Docs from "../pages/Docs";
// import NotFound from "../pages/NotFound";
// import SignIn from "../pages/SignIn";
// import Login from "../pages/Login";
// import { useAuth } from "../contexts/AuthContext";

// const AppRoutes = () => {
//   const { isAuthenticated } = useAuth();

//   return (
//     <Routes>
//       <Route path="/" element={<Index />} />
//       <Route path="/about" element={<About />} />
//       <Route path="/docs" element={<Docs />} />
//       <Route path="/signin" element={<SignIn />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/auth/callback" element={<AuthCallback />} />
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

// export default AppRoutes;



import { Routes, Route, Navigate } from "react-router-dom";
import Index from "../pages/Index";
import Analyze from "../pages/Analyze";
import About from "../pages/About";
import Docs from "../pages/Docs";
import NotFound from "../pages/NotFound";
import SignIn from "../pages/SignIn";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import AuthCallback from "../pages/AuthCallback"; // <-- make sure this file exists!
import { useAuth } from "../contexts/AuthContext";

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/docs" element={<Docs />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/auth/callback" element={<AuthCallback />} />

      <Route
        path="/analyze"
        element={
          isAuthenticated ? (
            <Analyze />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

