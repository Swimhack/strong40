import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Users, Star, TrendingUp, Loader2 } from "lucide-react";
import { CategoryTabs } from "@/components/CategoryTabs";
import { ProgramCard } from "@/components/ProgramCard";
import { BottomNavigation } from "@/components/BottomNavigation";
import TeamSignupModal from "@/components/TeamSignupModal";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-strong-man-new.jpg";

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

const Index = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const { data, error } = await supabase
          .from('programs')
          .select('*')
          .order('is_popular', { ascending: false })
          .limit(3);

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
    <div className="min-h-screen relative pb-20">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 leading-tight">
              STRONG<span className="text-accent">40</span>
            </h1>
            <div className="h-1 w-24 bg-accent mx-auto mb-8"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            All You Gotta Do Is Show Up
          </h2>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            For men 40+ ready to become unstoppable. Build the body and mindset that commands respect.
          </p>

          {/* Hero Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-lg px-4 py-2">
              <Clock className="w-5 h-5 text-accent" />
              <span className="text-white font-medium">45 min sessions</span>
            </div>
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-lg px-4 py-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              <span className="text-white font-medium">Advanced</span>
            </div>
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-lg px-4 py-2">
              <Users className="w-5 h-5 text-accent" />
              <span className="text-white font-medium">Legacy Building</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <TeamSignupModal 
              trigger={
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-3 text-lg min-h-[44px]"
                  aria-label="Start your legacy transformation program"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Your Legacy
                </Button>
              }
            />
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/10 hover:border-white/80 font-semibold px-8 py-3 text-lg backdrop-blur-sm min-h-[44px]"
              onClick={() => document.getElementById('value-section')?.scrollIntoView({ behavior: 'smooth' })}
              aria-label="Learn more about our programs"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Workout Discovery Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-accent/10 text-accent border-accent/20 mb-4">
              YOUR PATH TO STRENGTH
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Your Next <span className="text-accent">Challenge</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Carefully curated workouts designed for men 40+ ready for excellence.
            </p>
          </div>

          <CategoryTabs />
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Transform Your <span className="text-accent">Legacy</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Structured programs that deliver real results for men who are serious about their transformation.
            </p>
          </div>

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
      </section>

      {/* Value Proposition Section */}
      <section id="value-section" className="py-20 px-4 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Transform Into The <span className="text-accent">Strong Man You're Meant To Be</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-accent">Expert</div>
              <div className="text-muted-foreground">Developed</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-accent">Science</div>
              <div className="text-muted-foreground">Based</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-accent">Premium</div>
              <div className="text-muted-foreground">Content</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-accent">Results</div>
              <div className="text-muted-foreground">Focused</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Index;
