import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WorkoutCard } from "./WorkoutCard";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Workout {
  id: string;
  title: string;
  image: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  equipment: string;
  isNew?: boolean;
  isFeatured?: boolean;
  category: string;
}

export const CategoryTabs = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const { data, error } = await supabase
          .from('workouts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        const formattedWorkouts = data.map(workout => ({
          id: workout.id,
          title: workout.title,
          image: workout.image_url || '',
          duration: workout.duration,
          difficulty: workout.difficulty as "Beginner" | "Intermediate" | "Advanced",
          equipment: workout.equipment,
          isNew: workout.is_new || false,
          isFeatured: workout.is_featured || false,
          category: workout.category || 'All'
        }));

        setWorkouts(formattedWorkouts);
      } catch (error: any) {
        toast({
          title: "Error loading workouts",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, [toast]);

  const getWorkoutsByCategory = (category: string) => {
    if (category === 'featured') {
      return workouts.filter(w => w.isFeatured);
    }
    return workouts.filter(w => w.category.toLowerCase() === category);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <Tabs defaultValue="featured" className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-8">
        <TabsTrigger value="featured" className="text-sm font-medium">Featured</TabsTrigger>
        <TabsTrigger value="strength" className="text-sm font-medium">Strength</TabsTrigger>
        <TabsTrigger value="recovery" className="text-sm font-medium">Recovery</TabsTrigger>
        <TabsTrigger value="mindset" className="text-sm font-medium">Mindset</TabsTrigger>
      </TabsList>

      <TabsContent value="featured" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getWorkoutsByCategory('featured').map((workout) => (
            <WorkoutCard key={workout.id} {...workout} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="strength" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getWorkoutsByCategory('strength').map((workout) => (
            <WorkoutCard key={workout.id} {...workout} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="recovery" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getWorkoutsByCategory('recovery').map((workout) => (
            <WorkoutCard key={workout.id} {...workout} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="mindset" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getWorkoutsByCategory('mindset').map((workout) => (
            <WorkoutCard key={workout.id} {...workout} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};