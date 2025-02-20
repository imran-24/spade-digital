import prisma from "@/lib/prisma";
import Rooms from "./_components/rooms";

export const dynamic = "force-dynamic";
export default async function Home() {
  const rooms = await prisma.room.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      bookings: true,
    },
  });

  return (
    <div className='flex flex-col h-full'>
      <div className='mt-4'>
        <Rooms rooms={rooms} title="All Rooms"  />
      </div>
    </div>
  );
}
