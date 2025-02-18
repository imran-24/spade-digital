import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {userId} = getAuth(req);

    if(!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    const { roomId, title, description, startTime, endTime } =
      await req.json();

    console.log(roomId, userId, title, description, startTime, endTime);  
    // const existingBooking = await prisma.booking.findFirst({
    //   where: {
    //     roomId,
    //     OR: [{ startTime: { lte: endTime }, endTime: { gte: startTime } }],
    //   },
    // });

    // if (existingBooking) {
    //   return NextResponse.json(
    //     { error: "Room already booked" },
    //     { status: 400 }
    //   );
    // }

    const booking = await prisma.booking.create({
      data: { roomId, userId, title, description, startTime, endTime },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.log("BOOKING_POST", error);
    return NextResponse.json(
      { error: "Error creating booking" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({ include: { room: true } });
    return NextResponse.json(bookings);
  } catch (error) {
    console.log("BOOKINGS_GET", error)
    return NextResponse.json(
      { error: "Error fetching bookings" },
      { status: 500 }
    );
  }
}
