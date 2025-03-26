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

        // 1. Find user by email
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("User not found");
        }

        // 2. Validate password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        // 3. Return a minimal user object with the _id as 'id'
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name
        };
      }
    }),
    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
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
    async jwt({ token, user, account, profile }) {
      await connectDb();

      // If we have a user object, this is either credentials login
      // or the first OAuth login. Attach user.id to the token.
      if (user) {
        token.id = user.id; // from credentials
        token.name = user.name || token.name; // keep or override name if needed
        token.email = user.email || token.email;
      }

      // Handle OAuth logins on first sign in
      if (account && profile) {
        token.provider = account.provider;
        // Look for an existing user by email
        let existingUser = await User.findOne({ email: profile.email });
        if (!existingUser) {
          // If no user exists, create a new user record
          existingUser = await User.create({
            name: profile.name || profile.login,
            email: profile.email,
            provider: account.provider
          });
        }
        token.id = existingUser._id.toString();
      }

      return token;
    },
    async session({ session, token }) {
      // Attach the token’s id and provider to session.user
      session.user.id = token.id;
      session.user.provider = token.provider;
      return session;
    }
  }
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
