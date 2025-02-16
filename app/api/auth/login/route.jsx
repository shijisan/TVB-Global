import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { SignJWT } from "jose";

export async function POST(req){

    const {username, password} = await req.json();

    try{
        const admin = await prisma.admin.findUnique({
            where: { username }
        });

        if (!admin){
            return NextResponse.json({message: "Admin not found"}, {status: 404});
        }

        const passwordCorrect = await compare(password, admin.password);

        if (!passwordCorrect){
            return NextResponse.json({message: "Password is incorrect"}, {status: 401});
        }

        const token = await new SignJWT({
            id: admin.id,
            username: admin.username
        })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("24h")
        .sign(new TextEncoder().encode(process.env.JWT_SECRET));

        const response = NextResponse.redirect(new URL("/admin/dashboard", req.url));
        
        response.headers.set("Set-Cookie", `authToken=${token}; HttpOnly; Secure; Path=/; Max-Age=86400`);

        return response;
    
    }
    catch(error){
        return NextResponse.json({message: "Server error."}, {status: 500});
    }
}