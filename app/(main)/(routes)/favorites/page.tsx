"use client";

import { useState, useEffect } from "react";
import Rooms from "../rooms/_components/rooms";

const MyFavoritePage = () => {
  const [favoriteRooms, setFavoriteRooms] = useState([]);

  useEffect(() => {
    setFavoriteRooms(JSON.parse(localStorage.getItem("favoriteRooms") || "[]"));
  }, []);

  return (
    <div>
      <Rooms rooms={favoriteRooms} />
    </div>
  );
};

export default MyFavoritePage;
