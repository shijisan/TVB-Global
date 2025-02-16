import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

async function getAuthUsername() {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;

    if (!token) return null;

    try {
        const { payload } = await jwtVerify(token, SECRET_KEY);
        return payload.username; 
    } catch (error) {
        return null;
    }
}

export async function GET(req) {
    try {
        const admins = await prisma.admin.findMany();
        return NextResponse.json(admins);
    } catch (error) {
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const authUsername = await getAuthUsername(); 
        if (!authUsername) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { username, password } = await req.json();

        if (!username || !password) {
            return NextResponse.json({ message: "Username and password are required" }, { status: 400 });
        }

        const hashedPassword = await hash(password, 10);

        const newAdmin = await prisma.admin.create({
            data: {
                username,
                password: hashedPassword,
                origin: authUsername, 
            },
        });

        return NextResponse.json(newAdmin, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error creating admin" }, { status: 500 });
    }
}
