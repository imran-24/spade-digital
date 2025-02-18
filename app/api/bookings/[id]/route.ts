import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: {id: string}}) {
  try {
    const { id } = params;
    const { userId, title, description, startTime, endTime } = await req.json();

    const existingBooking = await prisma.booking.findUnique({ where: { id } });

    if (existingBooking?.userId !== userId) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: { title, description, startTime, endTime },
    });

    return NextResponse.json(updatedBooking);
  } catch (error) {
    console.log("BOOKING_PUT", error)
    return NextResponse.json(
      { error: "Error updating booking" },
      { status: 500 }
    );
  }
}


export async function DELETE(req: NextRequest, { params }: {params: {id: string}}) {
  try {
    const { id } = params;
    const {userId } = getAuth(req);

    const existingBooking = await prisma.booking.findUnique({ where: { id } });

    if (existingBooking?.userId !== userId) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    await prisma.booking.delete({ where: { id } });
    return NextResponse.json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.log("BOOKING_DELETE", error)
    return NextResponse.json(
      { error: "Error deleting booking" },
      { status: 500 }
    );
  }
}
