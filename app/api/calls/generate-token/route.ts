// app/api/calls/generate-token/route.ts
import { StreamClient } from "@stream-io/node-sdk";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
const secret = process.env.STREAM_API_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, role } = body;

    if (!id || !name || !role) {
      return NextResponse.json(
        { success: false, error: "Missing parameters" },
        { status: 400 }
      );
    }

    // Create server-side client
    const serverClient = new StreamClient(apiKey, secret, { timeout: 3000 });

    // Upsert user with role (set role as 'admin' for supervisor, otherwise 'user')
    const userRole = role === 'supervisor' ? 'admin' : 'user';
    await serverClient.upsertUsers([
      {
        id: id,
        name: name,
        role: userRole,
//        custom: { role: role }, // store original role for custom logic
      },
    ]);

    // Generate token (valid for 24 hours)
    const validity = 60 * 60 * 24;
    const token = serverClient.generateUserToken({
      user_id: id,
      validity_in_seconds: validity,
    });

    if (!token) throw new Error("Token generation failed");

    return NextResponse.json({
      success: true,
      token: token,
    });
  } catch (error) {
    console.error("Token error:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}