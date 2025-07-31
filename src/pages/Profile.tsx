import { Settings, Edit2, Award, Calendar, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BottomNavigation } from "@/components/BottomNavigation";

export default function Profile() {
  const achievements = [
    { name: "First Workout", description: "Completed your first workout", earned: true },
    { name: "Week Warrior", description: "7 consecutive days", earned: true },
    { name: "Strength Builder", description: "Complete Foundation program", earned: false },
    { name: "Elite Performer", description: "Complete Advanced program", earned: false }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="text-2xl">JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold">John Doe</h1>
                  <p className="text-muted-foreground">Member since January 2024</p>
                  <Badge className="mt-2">Foundation Builder</Badge>
                </div>
                <Button variant="outline" size="icon">
                  <Edit2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-sm text-muted-foreground">Workouts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">28</div>
                  <div className="text-sm text-muted-foreground">Days Active</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">2</div>
                  <div className="text-sm text-muted-foreground">Programs</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg border ${achievement.earned ? 'bg-accent/5 border-accent/20' : 'bg-muted/5 border-muted/20'}`}
                  >
                    <div className="flex items-center gap-3">
                      <Award className={`w-6 h-6 ${achievement.earned ? 'text-accent' : 'text-muted-foreground'}`} />
                      <div>
                        <div className={`font-medium ${achievement.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {achievement.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {achievement.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Workout Schedule
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Target className="w-4 h-4 mr-2" />
                  Goals & Preferences
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  App Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
}