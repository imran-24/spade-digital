import { Booking } from "@prisma/client";
import React from "react";

const Bookings = ({ data }: { data: Booking[] }) => {
  const PAGE_SIZE = 10;
  const [page, setPage] = React.useState(1);

  const totalPages = Math.ceil((data?.length ?? 0) / PAGE_SIZE);

  const paginatedBookings = data.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

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
                Start Time
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                End Time
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {paginatedBookings.map((booking: Booking) => (
              <tr key={booking.id} className='hover:bg-gray-50'>
                <td className='px-6 py-4 whitespace-nowrap'>{booking.title}</td>
                <td className='px-6 py-4'>{booking.description}</td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {new Date(booking.startTime).toLocaleString()}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {new Date(booking.endTime).toLocaleString()}
                </td>
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
