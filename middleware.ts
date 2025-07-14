import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Protected routes pattern
export default withAuth(
    function middleware(req) {
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => {
                // If there's a valid session token, authorize the user
                return !!token;
            },
        },
    }
);

// Tell Next which routes this applies to
export const config = {
    matcher: [
        // "/dashboard/:path*",
        // "/admin/:path*",
        "/booking/:path*",
        "/profile/:path*",
    ],
};
