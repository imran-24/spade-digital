import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const {userId, orgRole} = getAuth(req);

    if (!userId || orgRole !== process.env.NEXT_PUBLIC_IS_ADMIN)
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    const { name, capacity, amenities } = await req.json();

    const room = await prisma.room.create({
      data: { name, capacity, amenities },
    });

    return NextResponse.json(room, { status: 201 });
  } catch (error) {
    console.log("ROOM_POST", error);
    return NextResponse.json({ error: "Error creating room" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { userId } = getAuth(req);

    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    const rooms = await prisma.room.findMany();
    return NextResponse.json(rooms);
  } catch (error) {
    console.log("ROOMS_GET", error);
    return NextResponse.json(
      { error: "Error fetching rooms" },
      { status: 500 }
    );
  }
}
