import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { ProgramCard } from "@/components/ProgramCard";
import { BottomNavigation } from "@/components/BottomNavigation";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Program {
  id: string;
  title: string;
  description: string;
  duration: string;
  participants: string;
  rating: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  image: string;
  isPopular: boolean;
}

export default function Programs() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const { data, error } = await supabase
          .from('programs')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        const formattedPrograms = data.map(program => ({
          id: program.id,
          title: program.title,
          description: program.description || '',
          duration: program.duration,
          participants: program.participants || '',
          rating: 0,
          difficulty: program.difficulty as "Beginner" | "Intermediate" | "Advanced",
          image: program.image_url || '',
          isPopular: program.is_popular || false
        }));

        setPrograms(formattedPrograms);
      } catch (error: any) {
        toast({
          title: "Error loading programs",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, [toast]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="px-4 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="bg-accent/10 text-accent border-accent/20 mb-4">
              TRANSFORMATION PROGRAMS
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your <span className="text-accent">Strength Journey</span> Starts Here
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Structured programs designed to take you from where you are to where you want to be.
            </p>
          </div>

          {/* Programs Grid */}
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map((program) => (
                <ProgramCard key={program.id} {...program} />
              ))}
            </div>
          )}
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
}