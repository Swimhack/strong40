import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  email: string;
  name: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name }: WelcomeEmailRequest = await req.json();

    console.log(`Sending welcome email to: ${email}`);

    const emailResponse = await resend.emails.send({
      from: "STRONG40 Team <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to STRONG40 - Your Legacy Starts Now",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to STRONG40</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa;">
            <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="margin: 0; color: white; font-size: 32px; font-weight: bold; letter-spacing: 2px;">STRONG40</h1>
                    <p style="margin: 10px 0 0 0; color: #cccccc; font-size: 16px;">Welcome to the Brotherhood</p>
                </div>
                
                <!-- Content -->
                <div style="padding: 40px 30px;">
                    <h2 style="margin: 0 0 20px 0; color: #1a1a1a; font-size: 24px;">Welcome, ${name}!</h2>
                    
                    <p style="margin: 0 0 20px 0; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                        You've just taken the first step toward building the strongest version of yourself. 
                        STRONG40 isn't just a fitness program—it's a community of men over 40 who refuse to settle for anything less than their best.
                    </p>
                    
                    <div style="background-color: #f8f9fa; border-left: 4px solid #1a1a1a; padding: 20px; margin: 30px 0;">
                        <h3 style="margin: 0 0 15px 0; color: #1a1a1a; font-size: 18px;">What happens next:</h3>
                        <ul style="margin: 0; padding-left: 20px; color: #4a4a4a;">
                            <li style="margin-bottom: 8px;">Access your personalized training programs</li>
                            <li style="margin-bottom: 8px;">Join our exclusive community discussions</li>
                            <li style="margin-bottom: 8px;">Get weekly tips from our expert trainers</li>
                            <li style="margin-bottom: 0;">Track your progress and celebrate wins</li>
                        </ul>
                    </div>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="#" style="display: inline-block; background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); color: white; text-decoration: none; padding: 15px 30px; border-radius: 6px; font-weight: bold; font-size: 16px;">Start Your First Workout</a>
                    </div>
                    
                    <p style="margin: 30px 0 0 0; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                        Remember: Every rep counts, every day matters, and every choice builds your legacy.
                    </p>
                    
                    <p style="margin: 20px 0 0 0; color: #4a4a4a; font-size: 16px;">
                        Stay Strong,<br>
                        <strong>The STRONG40 Team</strong>
                    </p>
                </div>
                
                <!-- Footer -->
                <div style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #e9ecef;">
                    <p style="margin: 0; color: #6c757d; font-size: 14px;">
                        You're receiving this because you joined STRONG40. 
                        <a href="#" style="color: #1a1a1a; text-decoration: none;">Unsubscribe</a> anytime.
                    </p>
                </div>
            </div>
        </body>
        </html>
      `,
    });

    if (emailResponse.error) {
      console.error("Resend error:", emailResponse.error);
      throw emailResponse.error;
    }

    console.log("Welcome email sent successfully:", emailResponse.data);

    return new Response(JSON.stringify({ success: true, data: emailResponse.data }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-welcome-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to send welcome email",
        details: error
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);