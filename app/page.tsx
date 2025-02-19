'use client';

// import prisma from "@/lib/prisma";
import { Room } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { getRooms } from './actions/get-rooms';
// import Rooms from "./components/rooms";

export default function Home() {


  const { data: rooms = [], isLoading, error } = useQuery({
    queryKey: ['rooms'],
    queryFn: getRooms,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading rooms</div>;


  return (
    <div className='flex flex-col h-full'>
      <div className='mt-4'>
        {/* <Rooms rooms={rooms} /> */}
        {
          rooms.map((room: Room) => (
            <div key={room.id} className="">{room.name}</div>
          ))
        }
        {/* <RoomAvailabilityCalendar /> */}
      </div>
    </div>
  );
}
