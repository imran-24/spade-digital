import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {userId} = getAuth(req);

    if(!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    const { roomId, title, description, startTime, endTime, photoUrl } =
      await req.json();

      if (!title || !startTime || !roomId) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 }
        );
      }

      const existingRoom = await prisma.room.findFirst({
        where:{
          id: roomId
        },
        include:{
          bookings: true
        }
      })

      if(!existingRoom) return NextResponse.json(
        { error: "Room not found" },
        { status: 400 }
      );

      if(existingRoom.capacity === existingRoom.bookings.length) {

        return NextResponse.json(
          { error: "Room is fully booked" },
          { status: 400 }
        );
      }
      
      // Check for existing bookings with overlapping time
      const existingTimeConflict = await prisma.booking.findFirst({
        where: {
          roomId,
          userId,
          startTime,
          endTime,
        },
      });

      console.log(existingTimeConflict);

      if (existingTimeConflict) {
        return NextResponse.json(
        { error: "Time slot already booked" },
        { status: 400 }
        );
      }
    // const existingBooking = await prisma.booking.findFirst({
    //   where: {
    //     roomId,
    //   },
    // });

    // if (existingBooking) {
    //   return NextResponse.json(
    //     { error: "Room already booked" },
    //     { status: 400 }
    //   );
    // }

    const booking = await prisma.booking.create({
      data: { roomId, userId, title, description, startTime, endTime, photoUrl },
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
