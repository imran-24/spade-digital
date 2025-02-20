"use client";

import React, { MouseEvent, useEffect, useState } from "react";
import { Booking, Room } from "@prisma/client";
import BookingButton from "./booking-button";
import Link from "next/link";
import { Heart } from "lucide-react";
import BookingTable from "@/app/components/tables/booking-table";

export type RoomWithBooking = Room & {
  bookings: Booking[];
};

interface RoomClientProps {
  room: RoomWithBooking;
}

const RoomClient = ({ room }: RoomClientProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favoriteRooms = JSON.parse(
      localStorage.getItem("favoriteRooms") || "[]"
    );
    setIsFavorite(
      favoriteRooms.some((favRoom: RoomWithBooking) => favRoom.id === room.id)
    );
  }, [room.id]);

  const toggleFavorite = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const favoriteRooms = JSON.parse(
      localStorage.getItem("favoriteRooms") || "[]"
    );

    if (isFavorite) {
      const updatedRooms = favoriteRooms.filter(
        (favRoom: RoomWithBooking) => favRoom.id !== room.id
      );
      localStorage.setItem("favoriteRooms", JSON.stringify(updatedRooms));
    } else {
      localStorage.setItem(
        "favoriteRooms",
        JSON.stringify([...favoriteRooms, room])
      );
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div className='flex flex-col space-y-4 max-w-6xl w-full mx-auto h-full'>
      <div className='mt-4 flex items-center justify-between'>
        <Link href={`/rooms/${room.id}`} className='capitalize text-base p-1'>
          {room.name}
        </Link>
        <div className='flex items-center space-x-4'>
          <button onClick={toggleFavorite} className='flex items-center space-x-1'>
            <Heart
              className={`size-5 text-white transition-colors ease-in-out ${
                isFavorite ? "fill-rose-500" : "fill-neutral-300"
              }`}
            />
          </button>
          <div>
            {room.bookings.length >= room.capacity ? (
              <p className='text-red-500'>This room is full</p>
            ) : (
              <BookingButton roomId={room.id} />
            )}
          </div>
        </div>
      </div>
      {room.bookings.length ? (
        <BookingTable data={room.bookings} />
      ) : (
        <p className='px-1 text-neutral-500 text-sm'>No booking yet</p>
      )}
    </div>
  );
};

export default RoomClient;
