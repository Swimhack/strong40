-- Create team_signups table for STRONG40 community signups
CREATE TABLE public.team_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  phone TEXT,
  signup_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.team_signups ENABLE ROW LEVEL SECURITY;

-- Create policies for team signups (public insert, no public read for privacy)
CREATE POLICY "Anyone can sign up for the team"
ON public.team_signups
FOR INSERT
WITH CHECK (true);

-- Only authenticated users can view signups (for admin purposes)
CREATE POLICY "Authenticated users can view signups"
ON public.team_signups
FOR SELECT
USING (auth.role() = 'authenticated');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_team_signups_updated_at
  BEFORE UPDATE ON public.team_signups
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add index for better performance on email lookups
CREATE INDEX idx_team_signups_email ON public.team_signups(email);
CREATE INDEX idx_team_signups_signup_date ON public.team_signups(signup_date);