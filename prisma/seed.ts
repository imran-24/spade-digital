import prisma from "@/lib/prisma";


async function main() {
  console.log("Seeding database...");

  // Create rooms
await prisma.room.createMany({
    data: [
      {
        name: "Conference Room A",
        capacity: 10,
        amenities: ["Projector", "Whiteboard", "WiFi"],
      },
      {
        name: "Small Meeting Room B",
        capacity: 4,
        amenities: ["WiFi", "TV Screen"],
      },
      {
        name: "Executive Board Room C",
        capacity: 15,
        amenities: ["Projector", "Sound System", "Conference Phone"],
      },
      {
        name: "Tech Hub D",
        capacity: 6,
        amenities: ["Smart TV", "Whiteboard", "WiFi"],
      },
      {
        name: "Creative Space E",
        capacity: 8,
        amenities: ["Bean Bags", "Mood Lighting", "Sound System"],
      },
    ],
  });

  console.log("Rooms created");

  // Fetch all room IDs
  const allRooms = await prisma.room.findMany();
  const roomIds = allRooms.map((room) => room.id);

  // Create bookings
  await prisma.booking.createMany({
    data: [
      {
        roomId: roomIds[0],
        userId: "user1",
        title: "Team Meeting",
        description: "Weekly team sync-up",
        startTime: new Date("2025-02-20T10:00:00Z"),
        endTime: new Date("2025-02-20T10:30:00Z"),
        photoUrl: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Meeting1",
      },
      {
        roomId: roomIds[1],
        userId: "user2",
        title: "Client Call",
        description: "Quarterly review with stakeholders",
        startTime: new Date("2025-02-21T14:00:00Z"),
        endTime: new Date("2025-02-21T14:30:00Z"),
        photoUrl: "https://via.placeholder.com/150/00FF00/FFFFFF?text=Meeting2",
      },
      {
        roomId: roomIds[2],
        userId: "user3",
        title: "Board Meeting",
        description: "Strategic planning session",
        startTime: new Date("2025-02-22T09:00:00Z"),
        endTime: new Date("2025-02-22T09:30:00Z"),
        photoUrl: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Meeting3",
      },
      {
        roomId: roomIds[3],
        userId: "user4",
        title: "Tech Workshop",
        description: "New framework introduction",
        startTime: new Date("2025-02-23T13:00:00Z"),
        endTime: new Date("2025-02-23T13:30:00Z"),
        photoUrl: "https://via.placeholder.com/150/FFA500/FFFFFF?text=Meeting4",
      },
      {
        roomId: roomIds[4],
        userId: "user5",
        title: "Creative Brainstorm",
        description: "Product ideation session",
        startTime: new Date("2025-02-24T16:00:00Z"),
        endTime: new Date("2025-02-24T16:30:00Z"),
        photoUrl: "https://via.placeholder.com/150/800080/FFFFFF?text=Meeting5",
      },
      {
        roomId: roomIds[0],
        userId: "user6",
        title: "HR Interview",
        description: "Candidate assessment",
        startTime: new Date("2025-02-25T11:00:00Z"),
        endTime: new Date("2025-02-25T11:30:00Z"),
        photoUrl: "https://via.placeholder.com/150/008080/FFFFFF?text=Meeting6",
      },
      {
        roomId: roomIds[1],
        userId: "user7",
        title: "Marketing Strategy",
        description: "Campaign planning",
        startTime: new Date("2025-02-26T15:00:00Z"),
        endTime: new Date("2025-02-26T15:30:00Z"),
        photoUrl: "https://via.placeholder.com/150/DC143C/FFFFFF?text=Meeting7",
      },
      {
        roomId: roomIds[2],
        userId: "user8",
        title: "Product Demo",
        description: "Showcasing new features",
        startTime: new Date("2025-02-27T10:30:00Z"),
        endTime: new Date("2025-02-27T11:00:00Z"),
        photoUrl: "https://via.placeholder.com/150/FFD700/000000?text=Meeting8",
      },
      {
        roomId: roomIds[3],
        userId: "user9",
        title: "Engineering Standup",
        description: "Daily progress updates",
        startTime: new Date("2025-02-28T09:30:00Z"),
        endTime: new Date("2025-02-28T10:00:00Z"),
        photoUrl: "https://via.placeholder.com/150/4682B4/FFFFFF?text=Meeting9",
      },
      {
        roomId: roomIds[4],
        userId: "user10",
        title: "Finance Review",
        description: "Budget allocation discussion",
        startTime: new Date("2025-02-28T14:30:00Z"),
        endTime: new Date("2025-02-28T15:00:00Z"),
        photoUrl:
          "https://via.placeholder.com/150/A52A2A/FFFFFF?text=Meeting10",
      },
    ],
  });

  console.log("Bookings created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
