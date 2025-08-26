import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import UserModel from '../../../models/User';
import dbConnect from '../../../lib/db';

// Define the expected shape of the user object returned by authorize()
declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    name?: string;
    username?: string;
  }

  // Add `user` to JWT and Session
  interface JWT {
    user?: User;
  }

  interface Session {
    user: User;
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null; // Return null if validation fails
        }

        try {
          await dbConnect();

          // Find user and include password (stored hashed)
          const user = await UserModel.findOne({ email: credentials.email }).select('+password');
          if (!user) return null;

          const isPasswordValid = await user.comparePassword(credentials.password);
          if (!isPasswordValid) return null;

          // Return only safe fields (password is not included)
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name ?? '',
            username: user.username ?? '',
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null; // Fail gracefully
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt' as const,
  },
  pages: {
    signIn: '/login', // Custom login page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user; // Attach user on login
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user; // Sync user data to session
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
