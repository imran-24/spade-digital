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
    <div className='h-full relative  px-6 py-4'>
      <Link
        href={`/rooms/${room.id}`}
        className='capitalize absolute  text-lg p-2  flex items-center space-x-2 w-fit transition-all ease-in-out hover:bg-neutral-100 rounded-full'
      >
        <ArrowLeft className='text-black ' />
        {/* <p className="tracking-tight">{room?.name}</p> */}
      </Link>

      <div className='flex flex-col justify-center  gap-4 max-w-3xl mx-auto mt-4'>
        <Heading title={room?.name} subtitle={"Book a slot for meeting"} />
        <BookingFrom roomId={params.roomId} room={room} />
      </div>
    </div>
  );
};

export default CreateBooking;
