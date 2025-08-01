import GoogleProvider from "next-auth/providers/google";
import { type NextAuthOptions } from "next-auth";
import { saveUserToSanity } from "./action";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            await saveUserToSanity(user);
            return true;
        },
    },
};
