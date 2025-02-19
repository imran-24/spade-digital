import prisma from "@/lib/prisma";
import Rooms from "./components/rooms";

export default async function Home() {

  const rooms = await prisma.room.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include:{
      bookings: true
    }
  });

  console.log(rooms);


  return (
    <div className='flex flex-col h-full'>
      <div className='mt-4'>
        {/* <Rooms rooms={rooms} /> */}
        {
          rooms.map(room => (
            <div key={room.id} className="">{room.name}</div>
          ))
        }
        {/* <RoomAvailabilityCalendar /> */}
      </div>
    </div>
  );
}
