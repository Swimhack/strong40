import { useState } from "react";
import { Search as SearchIcon, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WorkoutCard } from "@/components/WorkoutCard";
import { BottomNavigation } from "@/components/BottomNavigation";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filters = ["all", "strength", "cardio", "recovery", "mindset"];
  
  const workouts = [
    {
      title: "Power Foundation",
      image: "/src/assets/workout-strength-new.jpg",
      duration: "45 min",
      difficulty: "Intermediate" as const,
      equipment: "Dumbbells",
      isNew: false,
      isFeatured: true
    },
    {
      title: "Recovery Flow",
      image: "/src/assets/workout-recovery-new.jpg", 
      duration: "30 min",
      difficulty: "Beginner" as const,
      equipment: "Mat",
      isNew: true,
      isFeatured: false
    }
  ];

  const filteredWorkouts = workouts.filter(workout => 
    workout.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Find Your Perfect Workout</h1>
            <p className="text-muted-foreground">Search through our comprehensive library</p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search workouts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-8 overflow-x-auto">
            {filters.map((filter) => (
              <Badge
                key={filter}
                variant={selectedFilter === filter ? "default" : "outline"}
                className="cursor-pointer capitalize"
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </Badge>
            ))}
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkouts.map((workout, index) => (
              <WorkoutCard key={index} {...workout} />
            ))}
          </div>

          {filteredWorkouts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No workouts found. Try adjusting your search.</p>
            </div>
          )}
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
}