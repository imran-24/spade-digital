"use client";

import React, { useEffect, useState } from "react";
import { Booking, Room } from "@prisma/client";
import BookingButton from "./booking-button";
import Bookings from "./bookings";
import Link from "next/link";
import { Heart } from "lucide-react";

export type RoomWithBooking = Room & {
  bookings: Booking[];
};

interface RoomClientProps {
  room: RoomWithBooking;
}

const RoomClient = ({ room }: RoomClientProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favoriteRoom = localStorage.getItem("favoriteRoom");
    localStorage.setItem('lastRoom', JSON.stringify(room));
    if (favoriteRoom) {
      const parsedRoom = JSON.parse(favoriteRoom);
      setIsFavorite(parsedRoom.id === room.id);
    }
  }, [room.id]);

  const unFavorite = (room: RoomWithBooking) => {
    const favoriteRooms = JSON.parse(localStorage.getItem("favoriteRooms") || "[]");
    const updatedRooms = favoriteRooms.filter((favRoom: RoomWithBooking) => favRoom.id !== room.id);
    localStorage.setItem("favoriteRooms", JSON.stringify(updatedRooms));
    setIsFavorite(false);
  };

  const makeFavorite = (room: RoomWithBooking) => {
    const favoriteRooms = JSON.parse(localStorage.getItem("favoriteRooms") || "[]");
    favoriteRooms.push(room);
    localStorage.setItem("favoriteRooms", JSON.stringify(favoriteRooms));
    setIsFavorite(true);
  };

  useEffect(() => {
    const favoriteRooms = JSON.parse(localStorage.getItem("favoriteRooms") || "[]");
    setIsFavorite(favoriteRooms.some((favRoom: RoomWithBooking) => favRoom.id === room.id));
  }, [room.id]);

  return (
    <div className='flex flex-col space-y-4 max-w-6xl w-full mx-auto  h-full'>
      <div className='mt-4 flex items-center justify-between'>
        <Link href={`/rooms/${room.id}`} className='capitalize text-base p-1'>
          {room?.name}
        </Link>
        <div className='flex items-center space-x-4'>
          <div className='flex items-center space-x-4'>
            {isFavorite ? (
              <button
                onClick={() => unFavorite(room)}
                className='flex items-center space-x-1'
              >
                <Heart className='fill-rose-500  transition-colors ease-in-out  size-5 text-white' />
              </button>
            ) : (
              <button
                onClick={() => makeFavorite(room)}
                className='flex items-center space-x-1'
              >
                <Heart className='fill-neutral-300  transition-colors ease-in-out  size-5 text-white' />
              </button>
            )}
          </div>
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
        <p className='px-1 text-neutral-500 text-sm'>No booking yet</p>
      )}
    </div>
  );
};

export default RoomClient;
