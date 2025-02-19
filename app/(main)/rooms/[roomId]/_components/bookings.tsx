import { useAuth } from "@clerk/nextjs";
import { Booking } from "@prisma/client";
import axios from "axios";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import React, { MouseEvent } from "react";

const Bookings = ({ data }: { data: Booking[] }) => {
  const router = useRouter();
  const { userId } = useAuth();
  const PAGE_SIZE = 10;
  const [page, setPage] = React.useState(1);

  const totalPages = Math.ceil((data?.length ?? 0) / PAGE_SIZE);

  console.log(data, userId);
  const paginatedBookings = data.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

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
      // Handle error (e.g., show toast notification)
    }
  };

  const handlePrevPage = () => setPage((p) => Math.max(1, p - 1));
  const handleNextPage = () => setPage((p) => (p < totalPages ? p + 1 : p));

  return (
    <div className='space-y-4'>
      <div className='overflow-x-auto rounded-lg border'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Title
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Description
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Date
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Time
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {paginatedBookings.map((booking: Booking) => (
              <tr key={booking.id} className='hover:bg-gray-50'>
                <td className='px-6 py-4 whitespace-nowrap'>{booking.title}</td>
                <td className='px-6 py-4'>{booking.description}</td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {format(new Date(booking.startTime), "PPP")}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {format(new Date(booking.startTime), "p")} -{" "}
                  {format(new Date(booking.endTime), "p")}
                </td>
                {userId == booking.userId ? (
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <button
                      onClick={(e) => handleCancelBooking(e, booking.id)}
                      className='text-white bg-black rounded-full text-sm font-semibold p-1 px-2'
                    >
                      Cancel
                    </button>
                  </td>
                ) : (
                  <td className="px-6 text-sm  py-4 whitespace-nowrap"><p className="">-</p></td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className='flex justify-center gap-2 p-4'>
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className='px-3 py-1 rounded bg-gray-100 disabled:opacity-50'
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setPage(index + 1)}
            className={`px-3 py-1 rounded ${
              page === index + 1 ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={page >= totalPages}
          className='px-3 py-1 rounded bg-gray-100 disabled:opacity-50'
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Bookings;
