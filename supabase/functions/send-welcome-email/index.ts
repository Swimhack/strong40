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
      subject: "Welcome to STRONG40 - Your Legacy Starts Now! 💪",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to STRONG40</title>
          </head>
          <body style="font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); color: white; padding: 40px 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="margin: 0; font-size: 42px; font-weight: bold; letter-spacing: 2px;">STRONG40</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">ALL YOU GOTTA DO IS SHOW UP</p>
            </div>
            
            <div style="background: white; padding: 40px 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
              <h2 style="color: #1a1a1a; margin-top: 0; font-size: 24px;">Welcome to the team, ${name}! 🎉</h2>
              
              <p style="font-size: 16px; margin-bottom: 20px;">
                You've just taken the most important step toward transforming your life. At 40+, you're not slowing down - you're just getting started.
              </p>
              
              <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin: 25px 0;">
                <h3 style="color: #1a1a1a; margin-top: 0; font-size: 18px;">What happens next?</h3>
                <ul style="margin: 0; padding-left: 20px;">
                  <li style="margin-bottom: 8px;">🏋️ Access to expert-developed workout programs</li>
                  <li style="margin-bottom: 8px;">📊 Science-based training protocols</li>
                  <li style="margin-bottom: 8px;">🎯 Results-focused approach for men 40+</li>
                  <li style="margin-bottom: 8px;">💪 Community support from like-minded men</li>
                </ul>
              </div>
              
              <p style="font-size: 16px; margin-bottom: 20px;">
                <strong>Remember:</strong> The hardest part isn't the workout - it's showing up. 
                But you've already proven you can do hard things by taking this first step.
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://strong40.com" style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px;">
                  Start Your First Workout
                </a>
              </div>
              
              <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
              
              <p style="font-size: 14px; color: #666; text-align: center; margin-bottom: 0;">
                Questions? Just reply to this email - we're here to help you succeed.
              </p>
              
              <p style="font-size: 14px; color: #666; text-align: center; margin-top: 20px;">
                <strong>The STRONG40 Team</strong><br>
                Building stronger men, one workout at a time.
              </p>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Welcome email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      messageId: emailResponse.data?.id 
    }), {
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
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);