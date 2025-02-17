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
  const { onOpen, isOpen } = useModalStore();

  return (
    <div className='mb-4 flex items-center justify-between'>
      <Link href={"/"} className='text-lg'>Meeting Room booking System</Link>

      <ClerkLoading>
        <Loader2 className='text-gray-500 animate-spin' />
      </ClerkLoading>
      <ClerkLoaded>
        {orgRole === isAdmin && (
          <div className=''>
            <Button
              label='Create Room'
              disabled={isOpen}
              onClick={() => onOpen("createRoom")}
            />
          </div>
        )}
        <UserButton />
      </ClerkLoaded>
    </div>
  );
};

export default Navbar;
