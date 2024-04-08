import NextAuth from "next-auth";
import bcrypt from "bcrypt";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import User from "@/lib/models/user.model";

const authOptions = {
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        try {
          const user = await User.findOne({
            email: credentials.email.toLowerCase(),
          });

          if (!user) return null;
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!passwordMatch) return null;
          return {
            id: user._id,
            email: user.email,
            password: user.password,
            name: user.name,
          };
        } catch (error) {
          console.error("Error authorizing user", error);
          return null;
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
