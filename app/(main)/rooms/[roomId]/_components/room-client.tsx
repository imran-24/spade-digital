"use client";

import React from "react";
import { Booking, Room } from "@prisma/client";
import BookingButton from "./booking-button";
import Bookings from "./bookings";
import Link from "next/link";

interface RoomClientProps {
  room: Room & {
    bookings: Booking[];
  };
}

const RoomClient = ({ room }: RoomClientProps) => {
  return (
    <div className='flex flex-col space-y-4 max-w-6xl w-full mx-auto  h-full'>
      <div className='mt-4 flex items-center justify-between'>
        <Link href={`/rooms/${room.id}`}  className='capitalize text-base p-1'>{room?.name}</Link>
        <div>
          {/* Booking Button Section */}
          <div>
            {room.bookings.length >= room?.capacity ? (
              <p className='text-red-500'>This room is full</p>
            ) : (
              <BookingButton roomId={room?.id} />
            )}
          </div>
        </div>
      </div>
      {!!room.bookings.length ? (
        <Bookings data={room.bookings} />
      ) : (
        <p>No booking yet</p>
      )}
    </div>
  );
};

export default RoomClient;
