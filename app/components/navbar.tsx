"use client";

import { useModalStore } from "@/hooks/use-modal-store";
import { ClerkLoaded, ClerkLoading, useAuth, UserButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import React from "react";
import Button from "./Button";
import Link from "next/link";

const isAdmin = process.env.NEXT_PUBLIC_IS_ADMIN;

const Navbar = () => {
  const { orgRole } = useAuth();
  const modalStore = useModalStore();

  const isOpen = modalStore.type === "createRoom";

  return (
    <div className='flex items-center justify-between h-20 p-6 bg-white'>
      <Link href={"/"} className='text-xl'>
        Meeting Room Booking System
      </Link>

      <ClerkLoading>
        <Loader2 className='text-gray-500 animate-spin' />
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
        {/* <div className='flex items-center space-x-4'>
          <Link href={"/favorites"}>
            <Heart className='fill-rose-500 hover:fill-rose-700 transition-colors ease-in-out  size-8 text-white' />
          </Link>
          <UserButton />
        </div> */}
      </ClerkLoaded>
    </div>
  );
};

export default Navbar;
