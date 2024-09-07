import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import Discord from "next-auth/providers/discord";
import { prisma } from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [Discord],
	callbacks: {
		session({ session, user }) {
			session.user.id = user.id;
			return session;
		},
	},
});
