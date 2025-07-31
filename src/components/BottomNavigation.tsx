import { Home, Search, Calendar, BarChart3, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Explore", id: "explore", path: "/" },
  { icon: Search, label: "Search", id: "search", path: "/search" },
  { icon: Calendar, label: "Programs", id: "programs", path: "/programs" },
  { icon: BarChart3, label: "Progress", id: "progress", path: "/progress" },
  { icon: User, label: "Profile", id: "profile", path: "/profile" }
];

export const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="max-w-md mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-colors",
                "hover:bg-accent/10 hover:text-accent",
                "text-muted-foreground",
                location.pathname === item.path && "text-accent" // Active state based on current route
              )}
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};