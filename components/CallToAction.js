"use client";
import Link from "next/link";
import React from "react";
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";

export default function CallToAction() {
  const { currentUser } = useAuth();

  return (
    <>
      {!currentUser && (
        <div className="grid grid-cols-2 gap-4 w-fit mx-auto">
          <Link href="/dashboard">
            <Button text={"Sign up"} />
          </Link>
          <Link href="/dashboard">
            <Button text={"Login"} dark />
          </Link>
        </div>
      )}

      {currentUser && (
        <div className="flex justify-center">
          <Link href="/dashboard">
            <Button dark text={"Go to Dashboard"} />
          </Link>
        </div>
      )}
    </>
  );
}
