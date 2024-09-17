"use client";
import React from "react";
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

export default function Logout() {
  const { logout, currentUser } = useAuth();
  const pathname = usePathname();

  return (
    <>
      {currentUser && pathname === "/dashboard" && (
        <Button text="Logout" clickHandler={logout}>
          Log out
        </Button>
      )}
    </>
  );
}
