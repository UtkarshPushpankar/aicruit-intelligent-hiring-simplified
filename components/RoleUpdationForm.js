"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const RoleUpdationForm = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Pre-populate fields with session values if available.
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "", // "candidate" or "hr"
    companyName: "", // HR only
    bio: ""
  });
  const [error, setError] = useState(null);

  // If session is loaded, update default values
  useEffect(() => {
    if (session) {
      setFormData((prev) => ({
        ...prev,
        fullName: session.user.name || "",
        email: session.user.email || ""
      }));
    }
  }, [session]);

  // Generic change handler for all form inputs.
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission.
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Make sure we have session information.
    if (!session) {
      setError("User session not found. Please log in again.");
      return;
    }

    try {
      // Include the user ID from session in the payload.
      const payload = { userId: session.user.id, ...formData };
      const res = await fetch("/api/set-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        throw new Error("Failed to update role");
      }
      const data = await res.json();
      
      // Redirect based on the role returned by the API
      if (data.role === "candidate") {
        router.push("/CandidateDashboard");
      } else if (data.role === "hr") {
        router.push("/HRdashboard");
      } else {
        throw new Error("Unexpected role value");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (status === "loading") {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="max-w-md mx-auto relative overflow-hidden z-10 bg-gray-800 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-white mb-6">Update Your Profile</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium text-gray-300">
            User Type <span className="text-gray-400">(Candidate or HR)</span>
          </label>
          <select
            name="role"
            id="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
            required
          >
            <option value="">Select Role</option>
            <option value="candidate">Candidate</option>
            <option value="hr">HR</option>
          </select>
        </div>
        {formData.role === "hr" && (
          <div className="mb-4">
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-300">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              id="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
              required
            />
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="bio" className="block text-sm font-medium text-gray-300">
            Bio
          </label>
          <textarea
            name="bio"
            id="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={3}
            className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoleUpdationForm;
