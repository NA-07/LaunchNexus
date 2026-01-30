import { Menu } from "lucide-react";
import { Button } from "../ui/Button";
import { useState } from "react";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/clerk-react";

export function Header({ onLogoClick, onNavigateLanding }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn, isLoaded, user } = useUser();

  const handleLogoClick = () => {
    // If signed in, go to dashboard; otherwise go to landing
    if (isSignedIn) {
      window.location.hash = '#dashboard';
    } else {
      onLogoClick?.();
    }
  };

  const handleFeatures = () => {
    onNavigateLanding?.();
    window.location.hash = '#features';
  };

  const handleHowItWorks = () => {
    onNavigateLanding?.();
    window.location.hash = '#how-it-works';
  };

  const handleAbout = () => {
    onNavigateLanding?.();
    window.location.hash = '#about';
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={handleLogoClick}
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity cursor-pointer border-none p-0 m-0 appearance-none"
          >
            PathFinder
          </button>
          
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={handleFeatures} className="text-gray-700 hover:text-blue-600 transition-colors bg-none border-none p-0 cursor-pointer font-normal">
              Features
            </button>
            <button onClick={handleHowItWorks} className="text-gray-700 hover:text-blue-600 transition-colors bg-none border-none p-0 cursor-pointer font-normal">
              How It Works
            </button>
            <button onClick={handleAbout} className="text-gray-700 hover:text-blue-600 transition-colors bg-none border-none p-0 cursor-pointer font-normal">
              About
            </button>
            
            {/* Auth Buttons */}
            {isLoaded && (
              isSignedIn ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">Welcome, {user?.firstName || 'User'}!</span>
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <SignInButton mode="redirect" forceRedirectUrl="/#dashboard">
                    <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                      Log In
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="redirect" forceRedirectUrl="/#dashboard">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Sign Up
                    </Button>
                  </SignUpButton>
                </div>
              )
            )}
          </nav>

          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <button onClick={handleFeatures} className="text-gray-700 hover:text-blue-600 transition-colors py-2 bg-none border-none p-0 cursor-pointer font-normal text-left">
              Features
            </button>
            <button onClick={handleHowItWorks} className="text-gray-700 hover:text-blue-600 transition-colors py-2 bg-none border-none p-0 cursor-pointer font-normal text-left">
              How It Works
            </button>
            <button onClick={handleAbout} className="text-gray-700 hover:text-blue-600 transition-colors py-2 bg-none border-none p-0 cursor-pointer font-normal text-left">
              About
            </button>
            
            {/* Mobile Auth Buttons */}
            {isLoaded && (
              isSignedIn ? (
                <div className="flex items-center justify-center gap-3 py-2">
                  <span className="text-sm text-gray-600">Welcome, {user?.firstName || 'User'}!</span>
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <SignInButton mode="redirect" forceRedirectUrl="/#dashboard">
                    <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 w-full">
                      Log In
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="redirect" forceRedirectUrl="/#dashboard">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">
                      Sign Up
                    </Button>
                  </SignUpButton>
                </div>
              )
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
