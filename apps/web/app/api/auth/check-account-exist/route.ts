"use server"

import { userSchema } from "@/lib/zod"; 
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { userTable } from "@/lib/schema";

// Define an interface for the user record
interface UserRecord {
  email: string;
  avatar: string | null; // Assuming avatar can be null
}

// POST /api/auth/check-account-exist
export const POST = async (req: NextRequest) => {
  try {
    // Parse and validate the incoming request body
    const body = await req.json();;
    
    const loginData = userSchema.omit({id: true, avatar: true, username: true}).parse(body);

    const email = loginData?.email;

    // Update the type of userRecord
    const userRecord: UserRecord[] = await db
      .select({
        email: userTable.email,
        avatar: userTable.avatar // Assuming avatar is a field in userTable
      })
      .from(userTable)
      .where(eq(userTable.email, email));
    
    if (userRecord.length === 0) {
      return NextResponse.json(
        { success: false, message: 'User not found'},
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: true, message: 'User exist', data: {email: userRecord[0]?.email, avatar: userRecord[0]?.avatar || null} }
    );
  } catch (err: any) {
    // Handle invalid requests or errors
    return NextResponse.json(
      { success: false, message: "Invalid request", error: err.message },
      { status: 400 }
    );
  }
};
