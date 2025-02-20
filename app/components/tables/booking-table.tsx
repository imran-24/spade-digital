"use client";

import Pagination from "@/app/components/pagination";
import { useAuth } from "@clerk/nextjs";
import { Booking } from "@prisma/client";
import axios from "axios";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import React, { MouseEvent, useMemo } from "react";

const PAGE_SIZE = 5;

const BookingTable = ({ data }: { data: Booking[] }) => {
  const router = useRouter();
  const { userId } = useAuth();
  const [page, setPage] = React.useState(1);

  const { totalPages, paginatedBookings } = useMemo(() => {
    const total = Math.ceil(data.length / PAGE_SIZE);
    const paginated = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    return { totalPages: total, paginatedBookings: paginated };
  }, [data, page]);

  const handleCancelBooking = async (
    e: MouseEvent<HTMLButtonElement>,
    bookingId: string
  ) => {
    e.stopPropagation();
    try {
      await axios.delete(`/api/bookings/${bookingId}`);
      window.alert("Booking deleted");
      router.refresh();
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

  const formatTime = (date: Date | string) => format(new Date(date), "p");
  const formatDate = (date: Date | string) => format(new Date(date), "PPP");

  return (
    <div className='space-y-4'>
      <div className='overflow-x-auto rounded-lg border'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              {["Title", "Description", "Date", "Time", "Actions"].map((header) => (
                <th
                  key={header}
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {paginatedBookings.map((booking: Booking) => (
              <tr key={booking.id} className='hover:bg-gray-50'>
                <td className='px-6 py-4 whitespace-nowrap'>{booking.title}</td>
                <td className='px-6 py-4'>{booking.description}</td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {formatDate(booking.startTime)}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {userId === booking.userId ? (
                    <button
                      onClick={(e) => handleCancelBooking(e, booking.id)}
                      className='text-white bg-black rounded-full text-sm font-semibold p-1 px-2'
                    >
                      Cancel
                    </button>
                  ) : (
                    <p>-</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination currentPage={page} setCurrentPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default BookingTable;
