"use client";

import { Booking, Room } from "@prisma/client";
import React, { useState } from "react";
import RoomFilter from "./room-filter";
import { useAuth } from "@clerk/nextjs";
import RoomTable from "@/app/components/tables/room-table";

const isAdmin = process.env.NEXT_PUBLIC_IS_ADMIN;

export interface RoomsWithBookingsProps {
  rooms: (Room & {
    bookings: Booking[];
  })[];
  admin?: boolean;
  title?: "All Rooms"
}
// Import the new components (these will be created in separate files)
const Rooms = ({ rooms, title }: RoomsWithBookingsProps) => {
  const { orgRole } = useAuth();
  const admin = isAdmin === orgRole;

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
    <div className='max-w-4xl overflow-x-auto  mx-auto p-6 border rounded-lg'>
      <h2 className='text-lg'>{title}</h2>

      {/* Filter Controls */}
      <RoomFilter
        amenityFilter={amenityFilter}
        capacityFilter={capacityFilter}
        uniqueAmenities={uniqueAmenities}
        setCapacityFilter={setCapacityFilter}
        setAmenityFilter={setAmenityFilter}
      />
      <RoomTable
        rooms={currentRooms}
        admin={admin}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Rooms;
