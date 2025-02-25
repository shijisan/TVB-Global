import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const courses = await prisma.course.findMany({
            include: { Batch: true, Certificate: true, StudentCourse: true }
        });
        return NextResponse.json(courses);
    } catch (error) {
        console.error("Error fetching courses:", error);
        return NextResponse.json({ message: "Failed to fetch courses" }, { status: 500 });
    }
}

export async function POST(req) {
    const { name, description, price } = await req.json();
    try {
        const course = await prisma.course.create({
            data: { name, description, price: parseFloat(price), updatedAt: new Date }
        });
        return NextResponse.json(course, { status: 201 });
    } catch (error) {
        console.error("Error creating course:", error);
        return NextResponse.json({ message: "Failed to create course" }, { status: 500 });
    }
}
