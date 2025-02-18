// components/DateSlotPicker.tsx
"use client";

import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, addMinutes, isBefore, isEqual } from "date-fns";
import { Booking } from "@prisma/client";

// const bookedSlots = {
//   "2025-02-20": ["10:00", "10:30", "14:00"], // Example booked times
//   "2025-02-21": ["12:00", "12:30"],
// };

const generateSlots = (date: Date) => {
  const startTime = new Date(date);
  startTime.setHours(9, 0, 0, 0); // Start at 9:00 AM
  const endTime = new Date(date);
  endTime.setHours(18, 0, 0, 0); // End at 5:00 PM

  const slots = [];
  let current = startTime;

  // If the date is today, only show future slots
  const now = new Date();
  const isToday = now.toDateString() === date.toDateString();

  while (isBefore(current, endTime) || isEqual(current, endTime)) {
    if (!isToday || isBefore(now, current)) {
      slots.push(format(current, "HH:mm"));
    }
    current = addMinutes(current, 30);
  }

  return slots;
};

interface DatePickerProps {
  setStartDate: (name: "startTime", value: string) => void;
  bookings: Booking[];
}

const DateSlotPicker = ({ setStartDate, bookings }: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [allSlots, setAllSlots] = useState<string[]>([]);
  const [bookedSlots, setBookedSlots] = useState({});

  useEffect(() => {
    if (selectedDate) {
      setAllSlots(generateSlots(selectedDate));
      const formattedBookings = bookings.reduce((acc: { [key: string]: string[] }, booking) => {
        const date = format(new Date(booking.startTime), 'yyyy-MM-dd');
        const time = format(new Date(booking.startTime), 'HH:mm');
        
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(time);
        return acc;
      }, {});
      setBookedSlots(formattedBookings);
    }
  }, [selectedDate, bookings]);

  useEffect(() => {
    const date = getSelectedDateTime();
    if (date) {
      setStartDate("startTime", date.toString());
      console.log(date);
    }
  }, [selectedDate, selectedSlot, setStartDate]);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedSlot(null); // Reset slot selection on date change
  };

  const getSelectedDateTime = () => {
    if (!selectedDate || !selectedSlot) return null;

    const [hours, minutes] = selectedSlot.split(":").map(Number);
    const dateTime = new Date(selectedDate);
    dateTime.setHours(hours, minutes, 0, 0);

    return dateTime;
  };

  const formattedDate = selectedDate
    ? format(selectedDate, "yyyy-MM-dd")
    : null;
  const unavailableSlots: string[] =
    (bookedSlots[formattedDate as keyof typeof bookedSlots] as string[]) || [];

  return (
    <div className='bg-white rounded-xl space-y-1 w-full'>
      <h2 className='block text-sm font-medium text-gray-700'>Choose Your Time</h2>

      <div className='space-y-2 w-full'>
        <label className='block text-sm  text-gray-500'>
          Select Date
        </label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={new Date()}
          required
          className='w-full p-2 border border-gray-300 outline-none  rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-sm'
          placeholderText='Pick a date'
          dateFormat='MMMM d, yyyy'
          calendarClassName='shadow-xl border-none'
        />
      </div>

      {selectedDate && (
        <div className='space-y-2'>
          <label className='block text-sm font-medium text-gray-700'>
            Available Time Slots
          </label>
            {allSlots.length ? (
            <div className='grid grid-cols-4 sm:grid-cols-6 gap-2'>
              {allSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                disabled={unavailableSlots.includes(slot)}
                className={`
                p-3 rounded-lg transition-all duration-200 font-medium text-sm
                ${
                  unavailableSlots.includes(slot)
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : selectedSlot === slot
                  ? "bg-indigo-600 text-white shadow-md hover:bg-indigo-700 transform hover:scale-105"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-indigo-500 hover:text-indigo-600 hover:shadow-md"
                }
                `}
              >
                {slot}
              </button>
              ))}
            </div>
            ) : (
            <p className="block text-sm  text-neutral-500">Sorry, no slots available</p>
            )}
        </div>
      )}

      {selectedSlot && (
        <div className='mt-6 p-4 bg-indigo-50 rounded-lg'>
          <p className='text-sm text-indigo-800 font-medium'>
            Selected: {format(selectedDate!, "MMMM d, yyyy")} at {selectedSlot}
          </p>
        </div>
      )}
    </div>
  );
};

export default DateSlotPicker;
