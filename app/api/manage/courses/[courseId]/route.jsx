import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
    const { courseId } = await params;
    try {
        const course = await prisma.course.findUnique({
            where: { id: parseInt(courseId) },
            include: { Batch: true, Certificate: true, StudentCourse: true }
        });
        if (!course) {
            return NextResponse.json({ message: "Course not found" }, { status: 404 });
        }
        return NextResponse.json(course);
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch course" }, { status: 500 });
    }
}

export async function PATCH(req, { params }) {
    const { courseId } = await params;
    const { name, description, price } = await req.json();

    try {
        const updatedCourse = await prisma.course.update({
            where: { id: parseInt(courseId) },
            data: { name, description, price: parseFloat(price) }
        });
        return NextResponse.json(updatedCourse);
    } catch (error) {
        return NextResponse.json({ message: "Failed to update course" }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    const { courseId } = await params;
    try {
        await prisma.course.delete({ where: { id: parseInt(courseId) } });
        return NextResponse.json({ message: "Course deleted successfully" });
    } catch (error) {
        return NextResponse.json({ message: "Failed to delete course" }, { status: 500 });
    }
}
