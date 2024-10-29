"use server"

import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@/utils/supabase/server'

// POST /api/oauth/authorize
export const POST = async (req: NextRequest) => {
  try {
    // Parse and validate the incoming request body
    const body = await req.json();
    const {provider} = body;
    console.log('body', body);

    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: 'http://localhost:3000/api/auth/callback'
      }
    })

    if(error){
      console.log(error);
      throw new Error(error.message);
    }
    console.log('data', data.url);
    if (data.url) {
      return NextResponse.json({
        message: "Useer authorized",
        redirectUrl: data.url
      }, { status: 200 }) // use the redirect API for your server framework
    }
   
    return NextResponse.json({
      message: "Enable to authorize user"},
      {status: 500,
    });
    
  } catch (err: any) {
    // Handle invalid requests or errors
    console.error(err);
    return NextResponse.json(
      { message: "Invalid request", error: err.message },
      { status: 400 }
    );
  }
};
