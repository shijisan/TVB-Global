import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    const cookieStore = cookies();
    cookieStore.delete("authToken");

    return NextResponse.json({ success: true });
}
