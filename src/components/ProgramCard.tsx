import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Target, Star } from "lucide-react";

interface ProgramCardProps {
  title: string;
  description: string;
  duration: string;
  participants: string;
  rating: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  image: string;
  isPopular?: boolean;
}

export const ProgramCard = ({
  title,
  description,
  duration,
  participants,
  rating,
  difficulty,
  image,
  isPopular
}: ProgramCardProps) => {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-500/20 text-green-700 dark:text-green-400";
      case "Intermediate": return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400";
      case "Advanced": return "bg-red-500/20 text-red-700 dark:text-red-400";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
      {isPopular && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-accent text-accent-foreground font-semibold">
            MOST POPULAR
          </Badge>
        </div>
      )}
      
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute bottom-4 left-4 right-4">
          <Badge variant="outline" className={`${getDifficultyColor(difficulty)} border-white/20`}>
            {difficulty}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-xl group-hover:text-accent transition-colors">
          {title}
        </CardTitle>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{participants}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
          <div className="flex items-center gap-1 ml-auto">
            <Target className="w-4 h-4 text-accent" />
            <span className="text-sm text-accent font-medium">Goal Focused</span>
          </div>
        </div>

        <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
          Start Program
        </Button>
      </CardContent>
    </Card>
  );
};