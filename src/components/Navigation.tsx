import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Newspaper,
  Shield,
  Video,
  LogIn,
  LogOut,
  User,
  Leaf,
  Brain,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const Navigation = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navItems = [
    { path: "/", label: "Alter", icon: Home },
    { path: "/news", label: "Whats New", icon: Newspaper },
    { path: "/environment", label: "Y/our Achivements", icon: Leaf },
    { path: "/psychology", label: "Mind Control", icon: Brain },
    { path: "/myths-facts", label: "Myth-Buster", icon: BookOpen },
    { path: "/privacy", label: "Privacy", icon: Shield },
    { path: "/video-search", label: "Find-Vid", icon: Video },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="glass border-b border-border/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-gradient">
            Alter-Nirvana
          </Link>

          <div className="flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1 bg-secondary rounded-md">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={signOut}
                  className="flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
