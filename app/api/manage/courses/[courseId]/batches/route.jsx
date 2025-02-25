import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
    const { courseId } = await params;
    try {
        const course = await prisma.course.findUnique({
            where: { id: parseInt(courseId) },
        });

        const batches = await prisma.batch.findMany({
            where: { courseId: parseInt(courseId) },
        });

        return NextResponse.json({ course, batches });
    } catch (error) {
        console.error("GET Error:", error);
        return NextResponse.json({ message: "Failed to fetch Course and Batches" }, { status: 500 });
    }
}

export async function POST(req, { params }) {
    const { courseId } = await params;
    const { batchName, batchTeacher, batchDurationDays, batchDurationHours, batchStartDate, batchMaxStudents } = await req.json();

    try {
        const newBatch = await prisma.batch.create({
            data: {
                name: batchName,
                teacher: batchTeacher,
                durationDays: parseInt(batchDurationDays), // ✅ Fixed mapping
                durationHours: parseInt(batchDurationHours), // ✅ Added missing field
                startDate: new Date(batchStartDate), // ✅ Fixed typo
                maxStudents: parseInt(batchMaxStudents),
                courseId: parseInt(courseId),
                updatedAt: new Date(), // ✅ Added updatedAt field
            },
        });

        return NextResponse.json(newBatch);
    } catch (error) {
        console.error("POST Error:", error);
        return NextResponse.json({ message: "Failed to create batch" }, { status: 500 });
    }
}
