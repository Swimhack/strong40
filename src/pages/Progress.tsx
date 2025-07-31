import { Calendar, TrendingUp, Award, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { BottomNavigation } from "@/components/BottomNavigation";

export default function Progress() {
  const stats = [
    { label: "Workouts Completed", value: "12", icon: Award },
    { label: "Current Streak", value: "5 days", icon: TrendingUp },
    { label: "Total Time", value: "8.5 hrs", icon: Calendar },
    { label: "Goals Achieved", value: "3/5", icon: Target }
  ];

  const currentProgram = {
    name: "Foundation Builder",
    progress: 65,
    daysLeft: 12
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Your Progress</h1>
            <p className="text-muted-foreground">Track your transformation journey</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-4 text-center">
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-accent" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Current Program */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Current Program
                <Badge variant="outline">{currentProgram.daysLeft} days left</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>{currentProgram.name}</span>
                  <span>{currentProgram.progress}%</span>
                </div>
                <ProgressBar value={currentProgram.progress} className="h-2" />
              </div>
              <p className="text-sm text-muted-foreground">
                You're making excellent progress! Keep up the momentum to complete your transformation.
              </p>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { workout: "Power Foundation", date: "Today", duration: "45 min" },
                  { workout: "Recovery Flow", date: "Yesterday", duration: "30 min" },
                  { workout: "Strength Circuit", date: "2 days ago", duration: "50 min" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                    <div>
                      <div className="font-medium">{activity.workout}</div>
                      <div className="text-sm text-muted-foreground">{activity.date}</div>
                    </div>
                    <Badge variant="outline">{activity.duration}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
}