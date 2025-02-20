"use client";

import { useModalStore } from "@/hooks/use-modal-store";
import { ClerkLoaded, ClerkLoading, useAuth, UserButton } from "@clerk/nextjs";
import React from "react";
import Button from "./Button";
import Link from "next/link";
import Spinner from "./spinner";
import { usePathname } from "next/navigation";

const isAdmin = process.env.NEXT_PUBLIC_IS_ADMIN;

const Navbar = () => {
  const pathname = usePathname()
  console.log(pathname)
  const { orgRole } = useAuth();
  const modalStore = useModalStore();

  const isOpen = modalStore.type === "createRoom";

  return (
    <div className='p-6 bg-white sticky top-0 z-10 space-y-2'>
      <div className='flex items-center justify-between  '>
        <Link href={"/"} className='text-xl'>
          Meeting Room Booking System
        </Link>

        <ClerkLoading>
          <Spinner />
        </ClerkLoading>
        <ClerkLoaded>
          {orgRole === isAdmin && (
            <div className='hidden sm:flex'>
              <Button
                label='Create Room'
                disabled={isOpen}
                small
                onClick={() => modalStore.onOpen("createRoom")}
              />
            </div>
          )}
          <div className='flex items-center space-x-4'>

            <UserButton />
          </div>
        </ClerkLoaded>
      </div>
      <div className="flex items-center gap-2">
        <Link href={`/rooms`} className={`block text-text-base  hover:bg-neutral-200 transition-all ease-in-out duration-200  p-1 rounded-lg ${pathname === '/rooms' ? 'bg-neutral-200' : 'bg-neutral-100'}`}>
          All Rooms
        </Link>
        <Link href={`/bookings`} className={`block text-text-base  hover:bg-neutral-200 transition-all ease-in-out duration-200  p-1 rounded-lg ${pathname === '/bookings' ? 'bg-neutral-200' : 'bg-neutral-100'}`}>
          My Bookings
        </Link>
        <Link href={`/favorites`} className={`block text-text-base  hover:bg-neutral-200 transition-all ease-in-out duration-200  p-1 rounded-lg ${pathname === '/favorites' ? 'bg-neutral-200' : 'bg-neutral-100'}`}>
          Favorites
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
