"use server";

import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@/utils/supabase/server';  // Assuming this is where your Supabase client is located
import { z } from "zod";

// Zod schema for validating signup input
const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// POST /api/auth/signup
export const POST = async (req: NextRequest) => {
  try {
    // Parse and validate the incoming request body
    const body = await req.json();
    const signupData = SignupSchema.parse(body);

    // Initialize Supabase client within the request handler to access cookies and headers
    const supabase = createClient();

    // Attempt to sign up using Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email: signupData.email,
      password: signupData.password,
    });

    // If sign-up fails, return an error response
    if (error) {
      return NextResponse.json(
        { message: "Signup failed", error: error.message },
        { status: 400 }
      );
    }

    // On successful signup, return the user and session information
    return NextResponse.json({
      message: "Signup successful",
      user: data.user,
      session: data.session,
    });
  } catch (err: any) {
    // Handle invalid requests or errors
    return NextResponse.json(
      { message: "Invalid request", error: err.message },
      { status: 400 }
    );
  }
};
