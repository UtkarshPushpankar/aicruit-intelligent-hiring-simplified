import { NextResponse } from "next/server";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

export async function POST(request) {
  await connectDb();
  const body = await request.json();
  const { userId, role, fullName, email, bio, companyName } = body;

  if (!userId || !role) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    // Prepare the update data
    const updateData = { role, bio, fullName, email };
    if (role === "hr") {
      updateData.companyName = companyName;
    }
    // Update the user record
    const updated = await User.findByIdAndUpdate(userId, updateData, { new: true });
    return NextResponse.json({ message: "Profile updated", role: updated.role });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
