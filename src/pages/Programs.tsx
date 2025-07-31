import { Badge } from "@/components/ui/badge";
import { ProgramCard } from "@/components/ProgramCard";
import { BottomNavigation } from "@/components/BottomNavigation";

export default function Programs() {
  const programsData = [
    {
      title: "Foundation Builder",
      description: "Build essential strength and movement patterns with this comprehensive 4-week foundation program.",
      duration: "4 Weeks",
      participants: "Proven Methods",
      rating: 0,
      difficulty: "Beginner" as const,
      image: "/src/assets/workout-strength-new.jpg",
      isPopular: true
    },
    {
      title: "Power Transformation", 
      description: "Intensive 6-week program focused on developing real-world strength and explosive power.",
      duration: "6 Weeks",
      participants: "Expert Coaching",
      rating: 0,
      difficulty: "Intermediate" as const,
      image: "/src/assets/workout-featured-new.jpg",
      isPopular: false
    },
    {
      title: "Elite Performance",
      description: "Advanced 7-day intensive for dedicated men looking to push their limits and achieve peak performance.",
      duration: "7 Days", 
      participants: "Proven Methods",
      rating: 0,
      difficulty: "Advanced" as const,
      image: "/src/assets/workout-mindset-new.jpg",
      isPopular: false
    }
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programsData.map((program, index) => (
              <ProgramCard key={index} {...program} />
            ))}
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
}