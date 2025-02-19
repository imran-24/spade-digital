"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
// import { startOfWeek } from "date-fns";

type Booking = {
  startTime: string;
  endTime: string;
};

const dummyBookings: Booking[] = [
  { startTime: "2025-02-20T10:00:00", endTime: "2025-02-20T10:30:00" },
  { startTime: "2025-02-21T14:00:00", endTime: "2025-02-21T14:30:00" },
  { startTime: "2025-02-22T09:00:00", endTime: "2025-02-22T09:30:00" },
];

const RoomAvailabilityCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  // const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 }); // Start from Monday

  const isBooked = (date: Date) => {
    return dummyBookings.some(
      (booking) =>
        new Date(booking.startTime).toDateString() === date.toDateString()
    );
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-3">Room Availability</h2>
      <Calendar
        value={selectedDate}
        onChange={(date) => setSelectedDate(date as Date)}
        tileClassName={({ date }) =>
          isBooked(date) ? "bg-red-400 text-white rounded" : "bg-green-200"
        }
      />
      <p className="mt-2 text-sm text-gray-600">
        <span className="text-red-500">■</span> Booked |{" "}
        <span className="text-green-500">■</span> Available
      </p>
    </div>
  );
};

export default RoomAvailabilityCalendar;
