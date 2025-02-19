

export const getRooms = async () => {
  const response = await fetch("/api/rooms");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};