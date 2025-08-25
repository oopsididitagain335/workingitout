// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import UserModel from '../../../models/User';
import dbConnect from '../../../lib/db';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await dbConnect();

        const user = await UserModel.findOne({ email: credentials?.email }).select('+password');
        if (!user) throw new Error('Invalid email or password');

        const isMatch = await user.comparePassword(credentials!.password);
        if (!isMatch) throw new Error('Invalid email or password');

        // Return minimal user info (don't return password)
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          username: user.username,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt' as const,
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      (session.user as any) = token.user;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
