import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WorkoutCard } from "./WorkoutCard";
import strengthImage from "@/assets/workout-strength.jpg";
import recoveryImage from "@/assets/workout-recovery.jpg";
import mindsetImage from "@/assets/workout-mindset.jpg";
import featuredImage from "@/assets/workout-featured.jpg";

const workoutData = {
  featured: [
    {
      title: "Legacy Builder - Full Body Strength",
      image: featuredImage,
      duration: "45 min",
      difficulty: "Advanced" as const,
      equipment: "Barbells",
      isFeatured: true
    },
    {
      title: "Iron Foundation - Core Strength",
      image: strengthImage,
      duration: "30 min",
      difficulty: "Intermediate" as const,
      equipment: "Dumbbells",
      isNew: true
    },
    {
      title: "Veteran's Victory - Upper Body",
      image: strengthImage,
      duration: "35 min",
      difficulty: "Advanced" as const,
      equipment: "Mixed"
    }
  ],
  strength: [
    {
      title: "Champion's Circuit",
      image: strengthImage,
      duration: "40 min",
      difficulty: "Advanced" as const,
      equipment: "Barbells"
    },
    {
      title: "Power & Purpose",
      image: strengthImage,
      duration: "35 min",
      difficulty: "Intermediate" as const,
      equipment: "Dumbbells"
    },
    {
      title: "Strength After 40",
      image: strengthImage,
      duration: "30 min",
      difficulty: "Beginner" as const,
      equipment: "Bodyweight",
      isNew: true
    }
  ],
  recovery: [
    {
      title: "Restoration Ritual",
      image: recoveryImage,
      duration: "20 min",
      difficulty: "Beginner" as const,
      equipment: "Yoga Mat"
    },
    {
      title: "Active Recovery Flow",
      image: recoveryImage,
      duration: "25 min",
      difficulty: "Beginner" as const,
      equipment: "Foam Roller"
    },
    {
      title: "Mobility Mastery",
      image: recoveryImage,
      duration: "15 min",
      difficulty: "Intermediate" as const,
      equipment: "Stretching"
    }
  ],
  mindset: [
    {
      title: "Morning Warrior Meditation",
      image: mindsetImage,
      duration: "10 min",
      difficulty: "Beginner" as const,
      equipment: "None"
    },
    {
      title: "Leadership Visualization",
      image: mindsetImage,
      duration: "15 min",
      difficulty: "Intermediate" as const,
      equipment: "None"
    },
    {
      title: "Legacy Mindset Training",
      image: mindsetImage,
      duration: "20 min",
      difficulty: "Advanced" as const,
      equipment: "Journal",
      isNew: true
    }
  ]
};

export const CategoryTabs = () => {
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
          {workoutData.featured.map((workout, index) => (
            <WorkoutCard key={index} {...workout} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="strength" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workoutData.strength.map((workout, index) => (
            <WorkoutCard key={index} {...workout} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="recovery" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workoutData.recovery.map((workout, index) => (
            <WorkoutCard key={index} {...workout} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="mindset" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workoutData.mindset.map((workout, index) => (
            <WorkoutCard key={index} {...workout} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};