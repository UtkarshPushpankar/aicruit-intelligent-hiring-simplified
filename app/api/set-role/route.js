import { NextResponse } from "next/server";

export async function POST(request) {
  // Parse the incoming JSON data
  const body = await request.json();
  const { role, fullName, email, bio, companyName } = body;
  
  // TODO: Update the user record in your database.
  // For HR users, you might update their company name along with other details.
  // For demonstration, we assume the update is successful.

  // Return a JSON response with the role (or any other info if needed)
  return NextResponse.json({ role });
}
