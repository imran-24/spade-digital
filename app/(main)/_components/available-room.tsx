"use client";

import React, { MouseEvent, useState } from "react";
import { RoomWithBooking } from "../(routes)/rooms/[roomId]/_components/room-client";
import DateSlotPicker from "../(routes)/rooms/[roomId]/booking/create/_components/date-slot-picker";
import { z } from "zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Eye, Heart } from "lucide-react";

interface AvailableRoomProps {
  room: RoomWithBooking;
  selectedDate: Date | null;
  last: boolean;
}

const bookingSchema = z.object({
  startTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid start time",
  }),
});

const AvailableRoom = ({ room, last, selectedDate }: AvailableRoomProps) => {
  const [isFavorite, setIsFavorite] = useState(() => {
    const favoriteRooms = JSON.parse(
      localStorage.getItem("favoriteRooms") || "[]"
    );
    return favoriteRooms.some(
      (favRoom: RoomWithBooking) => favRoom.id === room.id
    );
  });

  const toggleFavorite = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const favoriteRooms = JSON.parse(
      localStorage.getItem("favoriteRooms") || "[]"
    );
    const updatedRooms = isFavorite
      ? favoriteRooms.filter(
          (favRoom: RoomWithBooking) => favRoom.id !== room.id
        )
      : [...favoriteRooms, room];

    localStorage.setItem("favoriteRooms", JSON.stringify(updatedRooms));
    setIsFavorite(!isFavorite);
  };

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      
      if(room.capacity === room.bookings.length) {
        window.alert("Room is fully booked!");
        return;
      }
      const startTime = new Date(data.startTime);
      const endTime = new Date(new Date(startTime).getTime() + 30 * 60000);
      
      const response = await axios.post("/api/bookings", {
        title: "Meeting",
        roomId: room.id,
        startTime,
        endTime,
      });
      window.alert("Booking created successfully!");
      console.log("Booking created:", response.data);
    } catch (error) {
      window.alert("Error creating booking!");
      console.error("Error creating booking:", error);
    }
  };

  if (!selectedDate) return null;

  return (
    <div className='w-full border rounded-lg p-4'>
      <div className='flex justify-between items-center'>
        <p>{room.name}</p>
        <div className='flex items-center space-x-1'>
          <p className='text-sm bg-neutral-200 rounded px-1'>
            {room.capacity - room.bookings.length}
          </p>
          <button onClick={toggleFavorite} className='flex items-center'>
            <Heart
              className={`size-5 text-white transition-colors ease-in-out ${
                isFavorite ? "fill-rose-500" : "fill-neutral-300"
              }`}
            />
          </button>
          {last && (
            <span className='ml-2 text-sm text-gray-500'>
              <Eye className='size-4' />
            </span>
          )}
        </div>
      </div>
      <p className='text-sm py-1 text-neutral-500'>
        {room.amenities.join(", ")}
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DateSlotPicker
          bookings={room.bookings}
          date={selectedDate}
          setStartDate={setValue}
        />
        {errors.startTime && (
          <p className='input-error'>{errors.startTime.message}</p>
        )}
      </form>
    </div>
  );
};

export default AvailableRoom;
