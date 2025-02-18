import React from "react";

import Heading from "@/app/components/Heading";
import BookingFrom from "./_components/booking-from";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const CreateBooking = async ({ params }: { params: { roomId: string } }) => {
  const room = await prisma.room.findUnique({
    where: {
      id: params.roomId,
    },
    include: {
      bookings: {
        orderBy: {
          startTime: "asc",
        },
      },
    },
  });

  if (!room) return;

  return (
    <div className='h-full'>

      <Link href={`/rooms/${room.id}`} className='capitalize text-lg p-1 px-2   flex items-center space-x-2 w-fit transition-all ease-in-out hover:bg-neutral-100 rounded-full'>
        <ArrowLeft className="text-black " />
        <p>{room?.name}</p>
      </Link>

      <div className='flex flex-col justify-center  gap-3 max-w-md mx-auto mt-4'>
        <Heading title='Create Booking' subtitle='Book this room' />
        <BookingFrom roomId={params.roomId} room={room} />
      </div>
    </div>
  );
};

export default CreateBooking;
