import { Booking } from "@prisma/client";
import { addMinutes, format, isBefore, isEqual } from "date-fns";

export const generateSlots = (date: Date) => {
  const startTime = new Date(date);
  startTime.setHours(9, 0, 0, 0); // Start at 9:00 AM
  const endTime = new Date(date);
  endTime.setHours(23, 0, 0, 0); // End at 11:00 PM

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

export const getBookedSlots = (bookings: Booking[]) => {
  const formattedBookings = bookings.reduce(
    (acc: { [key: string]: string[] }, booking) => {
      const date = format(new Date(booking.startTime), "yyyy-MM-dd");
      const time = format(new Date(booking.startTime), "HH:mm");

      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(time);
      return acc;
    },
    {}
  );

  return formattedBookings;
};
