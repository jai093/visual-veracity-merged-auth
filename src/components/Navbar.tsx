
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Button } from './ui/button';
// import { Menu, X } from 'lucide-react';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <nav className="bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b border-border">
//       <div className="container mx-auto px-4 md:px-6">
//         <div className="flex h-16 items-center justify-between">
//           <div className="flex items-center">
//             <Link to="/" className="flex items-center">
//               <div className="relative w-8 h-8 mr-2">
//                 <div className="absolute inset-0 bg-gradient-to-tr from-cyber-primary to-cyber-accent rounded-md"></div>
//                 <div className="absolute inset-0.5 bg-background rounded-md flex items-center justify-center">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="w-5 h-5 text-cyber-primary"
//                   >
//                     <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
//                     <path d="M8 11V5l4 1v5" />
//                     <path d="M16 11V5l-4 1" />
//                   </svg>
//                 </div>
//               </div>
//               <span className="font-display font-bold text-lg text-foreground">MediaWatchdog</span>
//             </Link>
//           </div>
          
//           <div className="hidden md:flex md:items-center md:space-x-6">
//             <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
//               Home
//             </Link>
//             <Link to="/analyze" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
//               Analyze Media
//             </Link>
//             <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
//               About
//             </Link>
//             <Link to="/docs" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
//               Documentation
//             </Link>
//           </div>
          
//           <div className="md:hidden">
//             <Button 
//               variant="ghost" 
//               size="icon"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               aria-label="Toggle menu"
//             >
//               {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//             </Button>
//           </div>
//         </div>
//       </div>
      
//       {/* Mobile menu */}
//       {isMenuOpen && (
//         <div className="md:hidden bg-background border-b border-border animate-fade-in">
//           <div className="container mx-auto px-4 py-4 space-y-2">
//             <Link 
//               to="/" 
//               className="block py-2 px-4 rounded-md text-foreground hover:bg-muted transition-colors"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Home
//             </Link>
//             <Link 
//               to="/analyze" 
//               className="block py-2 px-4 rounded-md text-foreground hover:bg-muted transition-colors"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Analyze Media
//             </Link>
//             <Link 
//               to="/about" 
//               className="block py-2 px-4 rounded-md text-foreground hover:bg-muted transition-colors"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               About
//             </Link>
//             <Link 
//               to="/docs" 
//               className="block py-2 px-4 rounded-md text-foreground hover:bg-muted transition-colors"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Documentation
//             </Link>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUserEmail(data?.session?.user?.email ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/signin');
  };

  return (
    <nav className="bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4 md:px-6 flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyber-primary to-cyber-accent rounded-md" />
            <div className="absolute inset-0.5 bg-background rounded-md flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-cyber-primary"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                <path d="M8 11V5l4 1v5" />
                <path d="M16 11V5l-4 1" />
              </svg>
            </div>
          </div>
          <span className="font-display font-bold text-lg text-foreground">MediaWatchdog</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">Home</Link>
          <Link to="/analyze" className="text-sm text-muted-foreground hover:text-foreground">Analyze Media</Link>
          <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">About</Link>
          <Link to="/docs" className="text-sm text-muted-foreground hover:text-foreground">Documentation</Link>
          {userEmail && (
            <>
              <span className="text-sm text-muted-foreground">{userEmail}</span>
              <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
            </>
          )}
        </div>

        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border px-4 py-2 space-y-2 animate-fade-in">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="block py-2 text-foreground">Home</Link>
          <Link to="/analyze" onClick={() => setIsMenuOpen(false)} className="block py-2 text-foreground">Analyze</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block py-2 text-foreground">About</Link>
          <Link to="/docs" onClick={() => setIsMenuOpen(false)} className="block py-2 text-foreground">Docs</Link>
          {userEmail && (
            <>
              <div className="text-sm text-muted-foreground">{userEmail}</div>
              <Button variant="outline" className="w-full" onClick={() => { setIsMenuOpen(false); handleSignOut(); }}>
                Sign Out
              </Button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
