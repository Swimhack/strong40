import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Zap, Dumbbell, Play, Bookmark } from "lucide-react";
import { WorkoutModal } from "./WorkoutModal";

interface WorkoutCardProps {
  title: string;
  image: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  equipment: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

export const WorkoutCard = ({ 
  title, 
  image, 
  duration, 
  difficulty, 
  equipment, 
  isNew, 
  isFeatured 
}: WorkoutCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-500/20 text-green-700 dark:text-green-400";
      case "Intermediate": return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400";
      case "Advanced": return "bg-red-500/20 text-red-700 dark:text-red-400";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <>
      <Card 
        className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {isNew && (
              <Badge className="bg-accent text-accent-foreground font-semibold">
                NEW
              </Badge>
            )}
            {isFeatured && (
              <Badge className="bg-primary text-primary-foreground font-semibold">
                FEATURED
              </Badge>
            )}
          </div>

          {/* Play Button Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button size="icon" variant="secondary" className="rounded-full w-12 h-12">
              <Play className="w-5 h-5 fill-current" />
            </Button>
          </div>

          {/* Bookmark */}
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-3 right-3 w-8 h-8 bg-black/20 hover:bg-black/40 text-white"
            onClick={(e) => {
              e.stopPropagation();
              // Bookmark functionality handled in modal
            }}
          >
            <Bookmark className="w-4 h-4" />
          </Button>
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-3 line-clamp-2 group-hover:text-accent transition-colors">
            {title}
          </h3>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Dumbbell className="w-4 h-4" />
              <span>{equipment}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Badge variant="outline" className={getDifficultyColor(difficulty)}>
              <Zap className="w-3 h-3 mr-1" />
              {difficulty}
            </Badge>
            
            <Button variant="ghost" size="sm" className="text-accent hover:text-accent/80">
              Start Workout
            </Button>
          </div>
        </CardContent>
      </Card>

      <WorkoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        workout={{ title, image, duration, difficulty, equipment }}
      />
    </>
  );
};