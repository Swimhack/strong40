import { Home, Search, Calendar, BarChart3, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Explore", id: "explore" },
  { icon: Search, label: "Search", id: "search" },
  { icon: Calendar, label: "Programs", id: "programs" },
  { icon: BarChart3, label: "Progress", id: "progress" },
  { icon: User, label: "Profile", id: "profile" }
];

export const BottomNavigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="max-w-md mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-colors",
                "hover:bg-accent/10 hover:text-accent",
                "text-muted-foreground",
                item.id === "explore" && "text-accent" // Active state for current page
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