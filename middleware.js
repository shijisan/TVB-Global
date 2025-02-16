import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {
    const { pathname } = req.nextUrl;

    if (pathname.startsWith("/admin/login")) {
        return NextResponse.next();
    }

    if (pathname.startsWith("/admin/")) {
        const authToken = req.cookies.get("authToken")?.value; 

        if (!authToken) {
            return NextResponse.redirect(new URL("/admin/login", req.url));
        }

        try {
            const { payload } = await jwtVerify(authToken, SECRET_KEY);

            const response = NextResponse.next();
            response.headers.set("adminIdHeader", payload.id); 
            return response;
        } catch (error) {
            return NextResponse.redirect(new URL("/admin/login", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/admin/:path*", 
};
