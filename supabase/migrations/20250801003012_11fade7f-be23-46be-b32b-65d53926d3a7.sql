-- Create programs table
CREATE TABLE public.programs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  duration TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  image_url TEXT,
  is_popular BOOLEAN DEFAULT false,
  participants TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create workouts table
CREATE TABLE public.workouts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  duration TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  equipment TEXT NOT NULL,
  image_url TEXT,
  is_new BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  category TEXT DEFAULT 'All',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_programs table (user enrollments)
CREATE TABLE public.user_programs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  program_id UUID NOT NULL REFERENCES public.programs(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  progress_percentage INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused')),
  UNIQUE(user_id, program_id)
);

-- Create workout_sessions table (track individual workout completions)
CREATE TABLE public.workout_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  workout_id UUID NOT NULL REFERENCES public.workouts(id) ON DELETE CASCADE,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER,
  notes TEXT,
  status TEXT DEFAULT 'started' CHECK (status IN ('started', 'completed', 'abandoned'))
);

-- Enable Row Level Security
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for programs (public read access)
CREATE POLICY "Programs are viewable by everyone" 
ON public.programs FOR SELECT USING (true);

-- Create policies for workouts (public read access)
CREATE POLICY "Workouts are viewable by everyone" 
ON public.workouts FOR SELECT USING (true);

-- Create policies for user_programs (user-specific access)
CREATE POLICY "Users can view their own program enrollments" 
ON public.user_programs FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can enroll in programs" 
ON public.user_programs FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own program progress" 
ON public.user_programs FOR UPDATE 
USING (auth.uid() = user_id);

-- Create policies for workout_sessions (user-specific access)
CREATE POLICY "Users can view their own workout sessions" 
ON public.workout_sessions FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own workout sessions" 
ON public.workout_sessions FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own workout sessions" 
ON public.workout_sessions FOR UPDATE 
USING (auth.uid() = user_id);

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_programs_updated_at
  BEFORE UPDATE ON public.programs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_workouts_updated_at
  BEFORE UPDATE ON public.workouts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample programs data
INSERT INTO public.programs (title, description, duration, difficulty, image_url, is_popular, participants) VALUES
('The Legacy Transformation', 'A complete 30-day program designed for men 40+ to build lasting strength, confidence, and leadership qualities.', '30 Days', 'Intermediate', '/src/assets/workout-strength.jpg', true, 'Expert-Designed'),
('Foundation Builder', 'Perfect for beginners. Establish proper movement patterns and build a solid fitness foundation over 14 days.', '14 Days', 'Beginner', '/src/assets/workout-recovery.jpg', false, 'Science-Based'),
('Elite Performance', 'Advanced 7-day intensive for dedicated men looking to push their limits and achieve peak performance.', '7 Days', 'Advanced', '/src/assets/workout-mindset.jpg', false, 'Proven Methods');

-- Insert sample workouts data
INSERT INTO public.workouts (title, duration, difficulty, equipment, image_url, is_new, is_featured, category) VALUES
('Core Strength Builder', '25 min', 'Beginner', 'Bodyweight', '/src/assets/workout-strength.jpg', true, false, 'Strength'),
('HIIT Power Session', '20 min', 'Intermediate', 'Minimal Equipment', '/src/assets/workout-featured.jpg', false, true, 'HIIT'),
('Recovery & Mobility', '30 min', 'Beginner', 'Bodyweight', '/src/assets/workout-recovery.jpg', false, false, 'Recovery'),
('Mindset & Meditation', '15 min', 'Beginner', 'None', '/src/assets/workout-mindset.jpg', true, false, 'Mindset'),
('Advanced Strength', '45 min', 'Advanced', 'Full Equipment', '/src/assets/workout-strength.jpg', false, false, 'Strength'),
('Conditioning Circuit', '35 min', 'Intermediate', 'Minimal Equipment', '/src/assets/workout-featured.jpg', true, true, 'HIIT');