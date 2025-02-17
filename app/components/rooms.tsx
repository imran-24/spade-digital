"use client";

import { Booking, Room } from "@prisma/client";
import React, { useState } from "react";
import RoomFilter from "./room/room-filter";
import RoomList from "./room/room-list";
import Pagination from "./room/pagination";

export interface RoomsWithBookingsProps {
  rooms: (Room & {
    bookings: Booking[];
  })[];
}
// Import the new components (these will be created in separate files)
const Rooms = ({ rooms }: RoomsWithBookingsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [capacityFilter, setCapacityFilter] = useState("");
  const [amenityFilter, setAmenityFilter] = useState("");
  const itemsPerPage = 5;

  // Filter rooms based on capacity and amenities
  const filteredRooms = rooms.filter((room) => {
    const capacityMatch =
      !capacityFilter || room.capacity >= parseInt(capacityFilter);
    const amenityMatch =
      !amenityFilter || room.amenities?.includes(amenityFilter);
    return capacityMatch && amenityMatch;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);

  // Get unique amenities from all rooms
  const uniqueAmenities = Array.from(
    new Set(rooms.flatMap((room) => room.amenities || []))
  );


  return (
    <div className='max-w-4xl mx-auto p-6 border rounded-lg'>
      {/* Filter Controls */}
      <RoomFilter
        amenityFilter={amenityFilter}
        capacityFilter={capacityFilter}
        uniqueAmenities={uniqueAmenities}
        setCapacityFilter={setCapacityFilter}
        setAmenityFilter={setAmenityFilter}
      />

      <div className='bg-white rounded-lg shadow-sm'>
        <div className='grid grid-cols-3 bg-gray-50 p-4 rounded-t-lg font-semibold'>
          <div>Room Name</div>
          <div className='text-center'>Available Slots</div>
          <div className='text-center'>Actions</div>
        </div>

        <RoomList rooms={currentRooms} />

        {/* Pagination Controls */}
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default Rooms;
