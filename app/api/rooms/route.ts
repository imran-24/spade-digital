import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
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

export async function GET() {
  try {
    const rooms = await prisma.room.findMany();
    return NextResponse.json(rooms);
  } catch (error) {
    console.log("ROOMS_GET", error)
    return NextResponse.json(
      { error: "Error fetching rooms" },
      { status: 500 }
    );
  }
}
