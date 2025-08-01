import { X, Calendar, Users, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
  program: {
    id?: string;
    title: string;
    description: string;
    duration: string;
    participants: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    image: string;
  };
}

export const ProgramModal = ({ isOpen, onClose, program }: ProgramModalProps) => {
  const { toast } = useToast();
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleStartProgram = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to enroll in programs.",
          variant: "destructive"
        });
        return;
      }

      if (!program.id) {
        toast({
          title: "Program Error",
          description: "Program ID not found. Please try again.",
          variant: "destructive"
        });
        return;
      }

      // Check if already enrolled
      const { data: existingEnrollment } = await supabase
        .from('user_programs')
        .select('id')
        .eq('user_id', user.id)
        .eq('program_id', program.id)
        .maybeSingle();

      if (existingEnrollment) {
        toast({
          title: "Already Enrolled",
          description: "You're already enrolled in this program. Check your progress!",
        });
        onClose();
        return;
      }

      // Enroll user in program
      const { error } = await supabase
        .from('user_programs')
        .insert({
          user_id: user.id,
          program_id: program.id,
          progress_percentage: 0,
          status: 'active'
        });

      if (error) throw error;

      toast({
        title: "Program Started!",
        description: `Welcome to ${program.title}. Your transformation begins now!`,
      });
      onClose();
    } catch (error: any) {
      toast({
        title: "Enrollment Failed",
        description: error.message,
        variant: "destructive"
      });
    }
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
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <Card 
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <CardContent className="p-0">
          {/* Header with close button */}
          <div className="relative">
            <img 
              src={program.image} 
              alt={program.title}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-4 right-4">
              <Badge variant="outline" className={getDifficultyColor(program.difficulty)}>
                {program.difficulty}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="mb-6">
              <h2 id="modal-title" className="text-3xl font-bold mb-3">{program.title}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {program.description}
              </p>
            </div>

            {/* Program Details */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Calendar className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Duration</div>
                  <div className="font-semibold">{program.duration}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Users className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Coaching</div>
                  <div className="font-semibold">{program.participants}</div>
                </div>
              </div>
            </div>

            {/* What You'll Get */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">What You'll Get</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <span>Structured workout plan with video demonstrations</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <span>Progressive overload tracking and guidance</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <span>Nutrition guidelines and meal planning support</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <span>Recovery protocols and mobility work</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                onClick={handleStartProgram} 
                className="flex-1 min-h-[44px]" 
                size="lg"
                aria-label={`Start ${program.title} program`}
              >
                Start Program
              </Button>
              <Button 
                variant="outline" 
                onClick={onClose} 
                size="lg"
                className="min-h-[44px]"
                aria-label="Close and learn more later"
              >
                Learn More
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};