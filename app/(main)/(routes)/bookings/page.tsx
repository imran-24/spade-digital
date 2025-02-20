import BookingTable from "@/app/components/tables/booking-table";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const MyBookingsPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const bookings = await prisma.booking.findMany({
    where: {
      userId: userId,
    },
  });

  return (
    <div className='p-6'>
      <BookingTable data={bookings}  />
    </div>
  );
};

export default MyBookingsPage;
