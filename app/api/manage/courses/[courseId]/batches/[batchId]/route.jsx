import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
    try {
        const { courseId, batchId } = await params; 

        if (!batchId) {
            return NextResponse.json({ error: "Batch ID is required" }, { status: 400 });
        }

        const batch = await prisma.batch.findUnique({
            where: { id: parseInt(batchId), courseId: parseInt(courseId) },
            include: {
                Course: { select: { name: true } },
                Application: { select: { id: true, email: true, status: true } },
                StudentCourse: {
                    select: {
                        Student: { select: { id: true, name: true, email: true } }
                    }
                }
            }
        });

        if (!batch) {
            return NextResponse.json({ error: "Batch not found" }, { status: 404 });
        }

        return NextResponse.json({
            id: batch.id,
            name: batch.name,
            teacher: batch.teacher,
            startDate: batch.startDate,
            studentCount: batch.studentCount,
            maxStudents: batch.maxStudents,
            durationDays: batch.durationDays,
            durationHours: batch.durationHours,
            course: { name: batch.Course.name },
            applications: batch.Application.map(app => ({
                id: app.id,
                studentName: app.email,
                status: app.status
            })),
            students: batch.StudentCourse.map(sc => ({
                student: sc.Student
            })),
            updatedAt: new Date(),
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
