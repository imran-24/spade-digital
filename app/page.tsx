// import prisma from "@/lib/prisma";
import { Room } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
// import Rooms from "./components/rooms";

export default async function Home() {

  'use client';


  const getRooms = async () => {
    const response = await fetch('/api/rooms');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

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
