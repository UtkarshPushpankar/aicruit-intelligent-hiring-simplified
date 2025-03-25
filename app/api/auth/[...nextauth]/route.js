import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import connectDb from "@/db/connectDb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await connectDb();
        const { email, password } = credentials;
        // Find user by email in the unified User collection
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("User not found");
        }
        // Validate password using bcrypt
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          throw new Error("Invalid credentials");
        }
        return { id: user._id.toString(), email: user.email, name: user.name };
      }
    }),
    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    // GitHub OAuth Provider
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account, profile }) {
      await connectDb();
      // Handle OAuth logins on first sign in:
      if (account && profile) {
        token.provider = account.provider;
        // Look for an existing user by email
        let user = await User.findOne({ email: profile.email });
        if (!user) {
          // If no user exists, create a new user record
          user = await User.create({
            name: profile.name || profile.login,
            email: profile.email,
            provider: account.provider
          });
        }
        token.id = user._id.toString();
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.provider = token.provider;
      return session;
    }
  }
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
