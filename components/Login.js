import React from "react";
import { Fugaz_One } from "next/font/google";
import Button from "./Button";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Login() {
  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4">
      <h3 className={`text-4xl sm:text-5xl md:text-6xl ${fugaz.className}`}>Login / register</h3>
      <p>You're one step away!</p>
      <input
        className="w-full max-w-[350px] mx-auto px-3 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none focus:border-x-indigo-600"
        placeholder="Email"
      />
      <input
        className="w-full max-w-[350px] mx-auto px-3 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none focus:border-x-indigo-600"
        placeholder="Password"
      />
      <div className="max-w-[350px] w-full mx-auto">
        <Button text="Submit" full />
      </div>

      <p>
        Don't have an account? <span className="text-indigo-600">Sign up</span>
      </p>
    </div>
  );
}
