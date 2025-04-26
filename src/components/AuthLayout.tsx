
// import { ReactNode } from "react";

// interface AuthLayoutProps {
//   children: ReactNode;
//   title: string;
//   subtitle: string;
// }

// const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyberpurple to-cyberblue p-4">
//       <div className="w-full max-w-md backdrop-blur-xl bg-white/10 p-8 rounded-2xl shadow-xl border border-white/20 animate-fade-in">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
//           <p className="text-white/80">{subtitle}</p>
//         </div>
//         {children}
//       </div>
//     </div>
//   );
// };

// export default AuthLayout;


// src/components/AuthLayout.tsx
import { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

const AuthLayout = ({ title, subtitle, children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#090E24] to-[#1B1F3B] px-4">
      <div className="max-w-md w-full bg-zinc-900/80 border border-white/10 rounded-lg shadow-lg p-8 backdrop-blur-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white">{title}</h1>
          {subtitle && <p className="text-sm text-white/70 mt-2">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;

