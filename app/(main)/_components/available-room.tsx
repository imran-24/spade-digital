import React from "react";
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
  isFavorite?: boolean;
  last?: boolean;
}

const bookingSchema = z.object({
  startTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid start time",
  }),
});

const AvailableRoom = ({
  room,
  selectedDate,
  isFavorite,
  last,
}: AvailableRoomProps) => {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      //   setIsLoading(true);

      const startTime = new Date(data.startTime);
      const endTime = new Date(startTime.getTime() + 30 * 60000); // Add 30 minutes in milliseconds

      const response = await axios.post("/api/bookings", {
        title: "Meeting",
        roomId: room.id,
        startTime: data.startTime,
        endTime,
      });
      console.log("Booking created:", response.data);
    } catch (error) {
      console.error("Error creating booking:", error);
    } finally {
      //   setIsLoading(false);
    }
  };
  if (!selectedDate) return;

  return (
    <div className='w-full'>
      <div className='border p-4 rounded-lg '>
        <div className='flex justify-between items-center'>
          <p>{room.name}</p>
          <div className='flex items-center'>
            <p className='text-sm bg-neutral-200 rounded mr-1 px-1.5'>
              {room.capacity - room.bookings.length}
            </p>
            {isFavorite && (
              <Heart className='fill-rose-500 text-rose-500 size-4' />
            )}
            {last && (
              <span className='ml-2 text-sm text-gray-500'>
                <Eye className=' size-4' />
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
            <p className='input-error'>
              {errors.startTime?.message?.toString()}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AvailableRoom;
