
import { createContext, useState, useContext, ReactNode } from "react";
import { useToast } from "@/components/ui/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  // Check for saved user in localStorage when component mounts
  useState(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  });

  // For demo purposes, we'll just simulate authentication
  const login = async (email: string, password: string) => {
    // Simulate server request
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple validation
    if (email && password.length >= 6) {
      const newUser = {
        id: "user1",
        name: email.split("@")[0],
        email: email
      };
      
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${newUser.name}!`,
      });
      
      return true;
    }
    
    toast({
      variant: "destructive",
      title: "Login failed",
      description: "Invalid email or password.",
    });
    
    return false;
  };

  const signup = async (name: string, email: string, password: string) => {
    // Simulate server request
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple validation
    if (name && email && password.length >= 6) {
      const newUser = {
        id: "user1",
        name: name,
        email: email
      };
      
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      
      toast({
        title: "Signup successful",
        description: `Welcome to Bennett Eats, ${name}!`,
      });
      
      return true;
    }
    
    toast({
      variant: "destructive",
      title: "Signup failed",
      description: "Please provide valid information.",
    });
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    
    toast({
      title: "Logged out successfully",
      description: "Come back soon!",
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user,
      login,
      signup,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
