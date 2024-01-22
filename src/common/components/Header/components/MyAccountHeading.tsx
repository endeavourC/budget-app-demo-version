"use client";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { signOut } from "next-auth/react";
import {
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
  Button,
} from "@nextui-org/react";
import Link from "next/link";

export const MyAccountHeading = () => {
  const onLogout = () => {
    signOut();
  };

  return (
    <div className="flex items-center justify-end pr-[40px]">
      <Dropdown>
        <DropdownTrigger>
          <Button className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primaryColor to-primaryColor/50 flex items-center justify-center cursor-pointer">
            <FaUserCircle className="fill-white text-2xl" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu variant="faded">
          <DropdownItem key="edit" startContent={<FaUserCircle />}>
            <Link href="/my-account">My account</Link>
          </DropdownItem>
          <DropdownItem
            key="delete"
            onClick={onLogout}
            startContent={<BiLogOut />}
          >
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
