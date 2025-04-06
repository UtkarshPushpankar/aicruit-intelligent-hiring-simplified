// /app/api/interviews/route.js
import { NextResponse } from "next/server";
import connectDb from "@/db/connectDb";
import Interview from "@/models/Interview";

// GET: Fetch all interviews for a candidate (using candidateId as query param)
export async function GET(request) {
  await connectDb();
  const { searchParams } = new URL(request.url);
  const candidateId = searchParams.get("candidateId");
  
  if (!candidateId) {
    return NextResponse.json({ error: "Missing candidateId" }, { status: 400 });
  }
  
  try {
    const interviews = await Interview.find({ candidateId });
    return NextResponse.json({ interviews });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
