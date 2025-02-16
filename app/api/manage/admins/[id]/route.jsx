import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

async function getAdminIdFromToken() {
	const cookieStore = cookies(); 
	const token = cookieStore.get("authToken")?.value;

	if (!token) return null;

	try {
		const { payload } = await jwtVerify(token, SECRET_KEY);
		return payload.id;
	} catch (error) {
		return null;
	}
}

export async function GET(req, context) {
	const { params } = context; 
	const adminId = await getAdminIdFromToken();
	if (!adminId) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const admin = await prisma.admin.findUnique({
		where: { id: params.id },
	});

	if (!admin) {
		return NextResponse.json({ error: "Admin not found" }, { status: 404 });
	}

	return NextResponse.json(admin);
}

export async function PUT(req, context) {
	const { params } = context; 
	const adminId = await getAdminIdFromToken();
	if (!adminId) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { username, password } = await req.json();

	const updatedAdmin = await prisma.admin.update({
		where: { id: params.id },
		data: {
			username,
			...(password && { password: await bcrypt.hash(password, 10) }), 
		},
	});

	return NextResponse.json(updatedAdmin);
}

export async function DELETE(req, context) {
	const { params } = context; 
	const adminId = await getAdminIdFromToken();
	if (!adminId) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	await prisma.admin.delete({
		where: { id: params.id },
	});

	return NextResponse.json({ success: true });
}
