// /app/api/applications/route.js
import { NextResponse } from "next/server";
import connectDb from "@/db/connectDb";
import Application from "@/models/Application";

// GET: Fetch all applications for a given candidate (candidateId passed as a query param)
export async function GET(request) {
  await connectDb();
  const { searchParams } = new URL(request.url);
  const candidateId = searchParams.get("candidateId");
  
  if (!candidateId) {
    return NextResponse.json({ error: "Missing candidateId" }, { status: 400 });
  }
  
  try {
    const applications = await Application.find({ candidateId });
    return NextResponse.json({ applications });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST: Create a new application
export async function POST(request) {
  await connectDb();
  const body = await request.json();
  const { candidateId, jobTitle, company } = body;
  
  if (!candidateId || !jobTitle || !company) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  
  try {
    const newApp = await Application.create({ candidateId, jobTitle, company });
    return NextResponse.json({ message: "Application submitted", application: newApp }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
