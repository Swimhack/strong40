import { useState } from "react";
import { X, Play, Clock, Zap, Dumbbell, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

interface WorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  workout: {
    title: string;
    image: string;
    duration: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    equipment: string;
    description?: string;
  };
}

export const WorkoutModal = ({ isOpen, onClose, workout }: WorkoutModalProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  if (!isOpen) return null;

  const handleStartWorkout = () => {
    toast({
      title: "Workout Started!",
      description: `Starting ${workout.title}. Let's build that strength!`,
    });
    onClose();
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from favorites" : "Added to favorites",
      description: `${workout.title} ${isBookmarked ? "removed from" : "added to"} your favorites.`,
    });
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-500/10 text-green-600 border-green-500/20";
      case "Intermediate": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "Advanced": return "bg-red-500/10 text-red-600 border-red-500/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardContent className="p-0">
          {/* Header with close button */}
          <div className="relative">
            <img 
              src={workout.image} 
              alt={workout.title}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <Button
              onClick={handleBookmark}
              variant="outline"
              size="icon"
              className={`absolute top-4 left-4 ${isBookmarked ? 'bg-accent text-accent-foreground' : 'bg-black/50 text-white border-white/20'}`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">{workout.title}</h2>
                <p className="text-muted-foreground">
                  {workout.description || `A focused ${workout.difficulty.toLowerCase()} workout designed to challenge and strengthen you.`}
                </p>
              </div>
            </div>

            {/* Workout Details */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{workout.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-muted-foreground" />
                <Badge variant="outline" className={getDifficultyColor(workout.difficulty)}>
                  {workout.difficulty}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{workout.equipment}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button onClick={handleStartWorkout} className="flex-1">
                <Play className="w-4 h-4 mr-2" />
                Start Workout
              </Button>
              <Button variant="outline" onClick={onClose}>
                Preview First
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};