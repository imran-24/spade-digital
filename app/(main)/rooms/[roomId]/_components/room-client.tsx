"use client";

import React from "react";
import { Booking, Room } from "@prisma/client";
import BookingButton from "./booking-button";
import Bookings from "./bookings";

interface RoomClientProps {
  room: Room & {
    bookings: Booking[];
  };
}

const RoomClient = ({ room }: RoomClientProps) => {
  return (
    <div className='flex flex-col space-y-4  h-full'>
      <div className='flex items-center justify-between'>
        <h2 className='capitalize text-lg'>{room?.name}</h2>
        <div>
          {/* Booking Button Section */}
          <div className='mt-4'>
            {room.bookings.length >= room?.capacity ? (
              <p className='text-red-500'>This room is already full</p>
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
