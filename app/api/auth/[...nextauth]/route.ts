import NextAuth, { SessionStrategy } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = ({
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_AUTH_GOOGLE_ID!,
            clientSecret: process.env.NEXT_AUTH_GOOGLE_SECRET!,
        }),
    ],
    secret: process.env.NEXT_AUTH_SECRET,
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt" as SessionStrategy,
    },
});

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
