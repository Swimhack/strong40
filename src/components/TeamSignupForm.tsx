import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  phone: z.string().optional(),
});

type SignupFormData = z.infer<typeof signupSchema>;

interface TeamSignupFormProps {
  trigger?: React.ReactNode;
  inline?: boolean;
}

export const TeamSignupForm = ({ trigger, inline = false }: TeamSignupFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      name: "",
      phone: "",
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true);
    try {
      // Insert into team_signups table
      const { error: insertError } = await supabase
        .from("team_signups")
        .insert([{
          email: data.email,
          name: data.name || null,
          phone: data.phone || null,
        }]);

      if (insertError) {
        if (insertError.code === '23505') {
          toast({
            title: "Already signed up!",
            description: "This email is already registered. Welcome to the STRONG40 community!",
            variant: "default",
          });
          setIsSuccess(true);
          return;
        }
        throw insertError;
      }

      // Send welcome email via edge function
      const { error: emailError } = await supabase.functions.invoke('send-welcome-email', {
        body: {
          email: data.email,
          name: data.name || 'STRONG40 Member',
        },
      });

      if (emailError) {
        console.error('Email error:', emailError);
        // Don't throw error for email issues, signup was successful
      }

      setIsSuccess(true);
      form.reset();
      toast({
        title: "Welcome to STRONG40!",
        description: "You've successfully joined the team. Check your email for next steps.",
      });
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Signup failed",
        description: "There was an error joining the team. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const FormContent = () => (
    <div className="space-y-6">
      {isSuccess ? (
        <div className="text-center space-y-4">
          <div className="text-6xl">💪</div>
          <h3 className="text-2xl font-bold text-foreground">Welcome to STRONG40!</h3>
          <p className="text-muted-foreground">
            You're officially part of the team. Check your email for your welcome message and next steps.
          </p>
        </div>
      ) : (
        <>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-foreground">Join the STRONG40 Team</h3>
            <p className="text-muted-foreground">
              Ready to transform your life? All you gotta do is show up.
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="your.email@example.com" 
                        type="email"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your name" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="(555) 123-4567" 
                        type="tel"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Joining the Team..." : "Join STRONG40"}
              </Button>
            </form>
          </Form>
        </>
      )}
    </div>
  );

  if (inline) {
    return <FormContent />;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="lg" className="font-semibold">
            Join the Team
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="sr-only">Join STRONG40</DialogTitle>
          <DialogDescription className="sr-only">
            Sign up to join the STRONG40 community
          </DialogDescription>
        </DialogHeader>
        <FormContent />
      </DialogContent>
    </Dialog>
  );
};