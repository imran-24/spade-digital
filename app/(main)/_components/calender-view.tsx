"use client";

import { useEffect, useState } from "react";
import { RoomWithBooking } from "../(routes)/rooms/[roomId]/_components/room-client";
import axios from "axios";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Calendar } from "react-date-range";
import { generateSlots } from "@/lib/utils";
import Spinner from "@/app/components/spinner";
import AvailableRoom from "./available-room";
import { Room } from "@prisma/client";

const CalenderView = () => {
  const [favoriteRooms, setFavoriteRooms] = useState<Room[]>([]);
  const [lastVisited, setLastVisited] = useState<Room | null>(null);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favoriteRooms") || "[]"
    );
    const storedLastVisited = JSON.parse(
      localStorage.getItem("lastRoom") || "null"
    );
    setFavoriteRooms(storedFavorites);
    setLastVisited(storedLastVisited);
  }, []);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  //   const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [availableRooms, setAvailableRooms] = useState<RoomWithBooking[]>([]);
  const [loading, setLoading] = useState(false);

  const checkAvailability = async (date: Date) => {
    try {
      setAvailableRooms([]);
      setLoading(true);
      const response = await axios.get("/api/rooms");
      const rooms = response.data;

      const availableRooms = rooms.filter((room: RoomWithBooking) => {
        if (room.capacity <= room.bookings.length) return false;

        const bookingsOnDate = room.bookings.filter(
          (booking) =>
            new Date(booking.startTime).toDateString() === date.toDateString()
        );

        const now = new Date();

        const totalSlots = generateSlots(now);

        const bookedSlots = bookingsOnDate.map((booking) => {
          const time = new Date(booking.startTime);
          return `${time.getHours()}:${
            time.getMinutes() === 0 ? "00" : time.getMinutes()
          }`;
        });

        return totalSlots.some((slot) => !bookedSlots.includes(slot));
      });
      setLoading(false);
      return availableRooms;
    } catch (error) {
      setLoading(false);
      console.error("Error checking availability:", error);
      return [];
    }
  };

  const handleDateChange = async (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      const rooms = await checkAvailability(date);
      if (rooms.length) setAvailableRooms(rooms);
    }
    // setSelectedSlot(null); // Reset slot selection on date change
  };

  return (
    <div className='w-full flex flex-col md:flex-row gap-4 relative'>
      <div className='w-full md:flex-1 '>
        <Calendar
          date={selectedDate || new Date()}
          onChange={(date: Date) => handleDateChange(date)}
          className='custom-calendar w-full'
          minDate={new Date()}
          maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)} // 30 days from now
          color='#4F46E5' // indigo color
        />
        <style jsx global>{`
          .custom-calendar {
            width: 100% !important;
            max-width: 100%;
            font-size: 16px;
            padding: 1rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          .custom-calendar .rdrMonth {
            width: 100% !important;
          }
          .custom-calendar .rdrCalendarWrapper {
            width: 100% !important;
          }
        `}</style>
      </div>
      <div className='md:flex-1 flex flex-col gap-4 overflow-y-auto'>
        {availableRooms.map((room) => (
          <div key={room.id} className='flex flex-row items-center gap-2'>
            <AvailableRoom
              room={room}
              selectedDate={selectedDate}
              isFavorite={
                !!favoriteRooms.some((favRoom) => favRoom.id === room.id)
              }
              last={lastVisited?.id === room.id}
            />
          </div>
        ))}
        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default CalenderView;
