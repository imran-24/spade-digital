import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        roomId: params.id,
      },
      include: { room: true },
    });
    return NextResponse.json(bookings);
  } catch (error) {
    console.log("BOOKINGS_GET", error);
    return NextResponse.json(
      { error: "Error fetching bookings" },
      { status: 500 }
    );
  }
}
