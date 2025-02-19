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
    <div className='flex items-center justify-between h-16 p-6 bg-white'>
      <Link href={"/"} className='text-lg'>Meeting Room Booking System</Link>

      <ClerkLoading>
        <Loader2 className='text-gray-500 animate-spin' />
      </ClerkLoading>
      <ClerkLoaded>
        {orgRole === isAdmin && (
          <div className='hidden sm:flex'>
            <Button
              label='Create Room'
              disabled={isOpen}
              onClick={() => modalStore.onOpen("createRoom")}
            />
          </div>
        )}
        <UserButton />
      </ClerkLoaded>
    </div>
  );
};

export default Navbar;
