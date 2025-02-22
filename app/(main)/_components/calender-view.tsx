"use client";

import { useState } from "react";
import { RoomWithBooking } from "../(routes)/rooms/[roomId]/_components/room-client";
import axios from "axios";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Calendar } from "react-date-range";
import { generateSlots } from "@/lib/utils";
import Spinner from "@/app/components/spinner";
import AvailableRoom from "./available-room";

const CalenderView = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableRooms, setAvailableRooms] = useState<RoomWithBooking[]>([]);
  const [loading, setLoading] = useState(false);

  const checkAvailability = async (date: Date) => {
    try {
      setAvailableRooms([]);
      setLoading(true);
      const { data: rooms } = await axios.get("/api/rooms");

      const availableRooms = rooms.filter((room: RoomWithBooking) => {
        if (room.capacity <= room.bookings.length) return false;

        const bookingsOnDate = room.bookings.filter(
          (booking) =>
            new Date(booking.startTime).toDateString() === date.toDateString()
        );

        const totalSlots = generateSlots(date);
        const bookedSlots = bookingsOnDate.map((booking) => {
          const time = new Date(booking.startTime);
          return `${time.getHours()}:${
            time.getMinutes() === 0 ? "00" : time.getMinutes()
          }`;
        });

        return totalSlots.some((slot) => !bookedSlots.includes(slot));
      });

      setAvailableRooms(availableRooms);
      return availableRooms;
    } catch (error) {
      console.error("Error checking availability:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = async (date: Date) => {
    setSelectedDate(date);
    const rooms = await checkAvailability(date);
    if (rooms.length) setAvailableRooms(rooms);
  };

  return (
    <div className='w-full flex flex-col lg:flex-row gap-4 relative'>
      <div className='w-full md:flex-1'>
        <Calendar
          date={selectedDate || new Date()}
          onChange={handleDateChange}
          className='custom-calendar w-full'
          minDate={new Date()}
          maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
          color='#4F46E5'
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
      <div className='md:flex-1 flex flex-col gap-4'>
        {loading && <div className="flex-1 w-full h-full flex items-center justify-center"><Spinner /></div>}
        {availableRooms.map((room) => (
          <div key={room.id} className='flex flex-row items-center gap-2'>
            <AvailableRoom
              room={room}
              selectedDate={selectedDate}
              last={room.id === (JSON.parse(localStorage.getItem("lastRoom") || "null")?.id)}
            />
          </div>
        ))}
        {(!availableRooms.length && !loading && selectedDate) &&  <p>No slots available</p>}
      </div>
    </div>
  );
};

export default CalenderView;
