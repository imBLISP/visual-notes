"use server"

import { userSchema } from "@/lib/zod"; 
import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@/utils/supabase/server'
import { z } from "zod";

// POST /api/auth/login
export const POST = async (req: NextRequest) => {
  try {
    // Parse and validate the incoming request body
    const body = await req.json();
    console.log('body', body);
    const loginData = userSchema.omit({id: true, avatar: true, username: true}).parse(body);

    // Initialize Supabase client within the request handler to access cookies and headers
    const supabase = createClient();

    // Attempt to sign in using Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginData.email,
      password: loginData.password,
    });

    // If authentication fails, return an error response
    if (error) {
      console.log('error while validating', error);
      return NextResponse.json(
        { message: "Invalid credentials", error: error.message },
        { status: 401 }
      );
    }

    // On successful login, return the user and session information
    return NextResponse.json({
      message: "Login successful",
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
