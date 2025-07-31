import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  phone: z.string().optional(),
});

type SignupForm = z.infer<typeof signupSchema>;

interface TeamSignupFormProps {
  onSuccess?: () => void;
}

export default function TeamSignupForm({ onSuccess }: TeamSignupFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupForm) => {
    setIsSubmitting(true);
    
    try {
      // Insert into team_signups table
      const { error: insertError } = await supabase
        .from("team_signups")
        .insert({
          email: data.email,
          name: data.name || null,
          phone: data.phone || null,
        });

      if (insertError) {
        if (insertError.code === "23505") {
          toast({
            title: "Already signed up!",
            description: "This email is already part of the STRONG40 team.",
            variant: "destructive",
          });
          return;
        }
        throw insertError;
      }

      // Call edge function to send welcome email
      const { error: emailError } = await supabase.functions.invoke("send-welcome-email", {
        body: {
          email: data.email,
          name: data.name || "Warrior",
        },
      });

      if (emailError) {
        console.warn("Welcome email failed to send:", emailError);
        // Don't fail the signup if email fails
      }

      toast({
        title: "Welcome to STRONG40!",
        description: "You've successfully joined the team. Check your email for next steps.",
      });

      reset();
      onSuccess?.();
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Signup failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card border rounded-lg p-6 shadow-lg max-w-md mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-foreground mb-2">Join the STRONG40 Team</h3>
        <p className="text-muted-foreground text-sm">
          Ready to transform your life? Join thousands of men over 40 who are building strength, 
          confidence, and legacy.
        </p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            {...register("email")}
            className="mt-1"
          />
          {errors.email && (
            <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="name" className="text-sm font-medium">
            Name (Optional)
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Your name"
            {...register("name")}
            className="mt-1"
          />
          {errors.name && (
            <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone" className="text-sm font-medium">
            Phone (Optional)
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Your phone number"
            {...register("phone")}
            className="mt-1"
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Joining..." : "Start Your Legacy"}
        </Button>
      </form>
      
      <p className="text-xs text-muted-foreground mt-4 text-center">
        By joining, you'll receive program updates and training tips. Unsubscribe anytime.
      </p>
    </div>
  );
}