import NextAuth from "next-auth";
import bcrypt from "bcrypt";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import User from "@/lib/models/user.model";

// NextAuth configuration

const authOptions = {
  // Configure one or more authentication providers
  pages: {
    signIn: "/sign-in",
  },

  // List of Providers
  providers: [
    // OAuth Authentication Providers
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),

    // Credentials Authentication Provider
    CredentialsProvider({
      name: "Credentials",

      // Define the credentials that are required
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      // Authorize function
      async authorize(credentials) {
        if (!credentials) return null;
        try {
          // Find the user in the database
          const user = await User.findOne({
            email: credentials.email.toLowerCase(),
          });

          // If the user is not found, return null
          if (!user) return null;

          // Compare the password
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          // If the password doesn't match, return null
          if (!passwordMatch) return null;

          // If the user is found and the password matches, return the user
          return {
            id: user._id,
            email: user.email,
            password: user.password,
            name: user.name,
          };
        } catch (error) {
          // If there is an error, log the error and return null
          console.error("Error authorising user", error);
          return null;
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
