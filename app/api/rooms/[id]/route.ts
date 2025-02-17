import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: {params: {id: string}}) {
  try {
    const { id } = params;
    const { name, capacity, amenities } = await req.json();

    const updatedRoom = await prisma.room.update({
      where: { id },
      data: { name, capacity, amenities },
    });

    return NextResponse.json(updatedRoom);
  } catch (error) {
    console.log("ROOM_PUT", error)
    return NextResponse.json({ error: "Error updating room" }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest, { params }: {params: {id: string}}) {
  try {
    const { id } = params;

    const bookings = await prisma.booking.findMany({ where: { roomId: id } });
    if (bookings.length > 0) {
      return NextResponse.json(
        { error: "Cannot delete booked room" },
        { status: 400 }
      );
    }

    await prisma.room.delete({ where: { id } });
    return NextResponse.json({ message: "Room deleted successfully" });
  } catch (error) {
    console.log("ROOM_DELETE", error);
    return NextResponse.json({ error: "Error deleting room" }, { status: 500 });
  }
}
