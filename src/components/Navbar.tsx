
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { LoginModal } from "@/components/LoginModal";

export function Navbar() {
  const { cartCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-bennett-orange">Bennett<span className="text-bennett-green">Eats</span></span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-bennett-orange transition-colors">
            Home
          </Link>
          <Link to="/outlets" className="text-sm font-medium hover:text-bennett-orange transition-colors">
            Outlets
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-bennett-orange transition-colors">
            About
          </Link>
          {isAuthenticated && (
            <Link to="/orders" className="text-sm font-medium hover:text-bennett-orange transition-colors">
              My Orders
            </Link>
          )}
        </nav>
        
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-bennett-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
          
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/profile">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{user?.name}</span>
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="sm"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button 
              variant="default" 
              size="sm" 
              className="hidden md:inline-flex bg-bennett-orange hover:bg-bennett-orange/90"
              onClick={() => setShowLoginModal(true)}
            >
              Login
            </Button>
          )}
          
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b shadow-lg animate-fade-in">
          <div className="container py-4 flex flex-col gap-4">
            <Link 
              to="/" 
              className="text-sm font-medium p-2 hover:bg-gray-100 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/outlets" 
              className="text-sm font-medium p-2 hover:bg-gray-100 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Outlets
            </Link>
            <Link 
              to="/about" 
              className="text-sm font-medium p-2 hover:bg-gray-100 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            {isAuthenticated && (
              <Link 
                to="/orders" 
                className="text-sm font-medium p-2 hover:bg-gray-100 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Orders
              </Link>
            )}
            {isAuthenticated ? (
              <div className="flex flex-col gap-2">
                <Link 
                  to="/profile" 
                  className="text-sm font-medium p-2 hover:bg-gray-100 rounded-md flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  <span>{user?.name}</span>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button 
                variant="default" 
                size="sm" 
                className="bg-bennett-orange hover:bg-bennett-orange/90"
                onClick={() => {
                  setShowLoginModal(true);
                  setMobileMenuOpen(false);
                }}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      )}
      
      {/* Login Modal */}
      <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
    </header>
  );
}
