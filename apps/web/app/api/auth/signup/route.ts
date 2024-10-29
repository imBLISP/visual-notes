"use server";

import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@/utils/supabase/server';
import { userSchema } from "@/lib/zod"; 

// POST /api/auth/signup
export const POST = async (req: NextRequest) => {
  console.log("@@api-log: api/auth/signup")
  try {
    // Parse and validate the incoming request body
    const body = await req.json();
    const signupData = userSchema.omit({id: true, avatar: true}).parse(body);

    // Initialize Supabase client within the request handler to access cookies and headers
    const supabase = createClient();

    // Attempt to sign up using Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email: signupData.email,
      password: signupData.password,
      options: {
        data: {
          username: signupData.username
        }
      }
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
    console.error('error', err);
    // Handle invalid requests or errors
    return NextResponse.json(
      { message: "Invalid request", error: err.message },
      { status: 400 }
    );
  }
};
