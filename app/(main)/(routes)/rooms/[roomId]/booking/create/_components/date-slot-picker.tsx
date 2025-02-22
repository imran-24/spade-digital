// components/DateSlotPicker.tsx
"use client";

import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Booking } from "@prisma/client";
import { generateSlots, getBookedSlots } from "@/lib/utils";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import SlotList from "./slot-list";

// const bookedSlots = {
//   "2025-02-20": ["10:00", "10:30", "14:00"], // Example booked times
//   "2025-02-21": ["12:00", "12:30"],
// };

interface DateSlotPickerProps {
  setStartDate?: (
    name: "startTime",
    value: string,
    options?: { shouldValidate?: boolean; shouldDirty?: boolean }
  ) => void;
  date?: Date;
  bookings: Booking[];
}

const DateSlotPicker = ({
  setStartDate,
  date,
  bookings,
}: DateSlotPickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    date || new Date()
  );
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [allSlots, setAllSlots] = useState<string[]>([]);
  const [bookedSlots, setBookedSlots] = useState({});

  useEffect(() => {
    if (selectedDate) {
      setAllSlots(generateSlots(selectedDate));
      const formattedBookings = getBookedSlots(bookings);
      setBookedSlots(formattedBookings);
    }
  }, [selectedDate, bookings]);

  useEffect(() => {
    const date = getSelectedDateTime();
    if (date && setStartDate) {
      setStartDate("startTime", date.toString(), {
        shouldValidate: true,
        shouldDirty: true,
      });
      console.log(date);
    }
  }, [selectedDate, selectedSlot, setStartDate]);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedSlot(null); // Reset slot selection on date change
  };

  // concatinate date and time
  const getSelectedDateTime = () => {
    if (!selectedDate || !selectedSlot) return null;

    const [hours, minutes] = selectedSlot.split(":").map(Number);
    const dateTime = new Date(selectedDate);
    dateTime.setHours(hours, minutes, 0, 0);

    return dateTime;
  };

  // format the selectedDate
  const formattedDate = selectedDate
    ? format(selectedDate, "yyyy-MM-dd")
    : null;

  // unavailable slots
  const unavailableSlots: string[] =
    (bookedSlots[formattedDate as keyof typeof bookedSlots] as string[]) || [];

  return (
    <div className='bg-white rounded-xl space-y-1 w-full'>
      <div className='flex flex-col lg:flex-row  gap-2 '>
        {/* <label className='block text-sm  text-gray-500'>Select Date</label> */}
        {!date && (
          <div className="flex-1">
            <h2 className='block text-sm font-medium text-gray-700'>
              Choose Your Time
            </h2>
            <Calendar
              date={selectedDate || new Date()}
              onChange={(date: Date) => handleDateChange(date)}
              minDate={new Date()}
              className='w-full custom-calendar'
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
        )}

        {selectedDate && (
          <div className='space-y-10 flex-1'>
            <label className='block text-sm font-medium text-gray-700'>
              Available Time Slots
            </label>
            {allSlots.length ? (
              <SlotList
                selectedSlot={selectedSlot}
                allSlots={allSlots}
                unavailableSlots={unavailableSlots}
                onSelect={setSelectedSlot}
              />
            ) : (
              <p className='block text-sm  text-neutral-500'>
                Sorry, no slots available
              </p>
            )}
          </div>
        )}
      </div>

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
