"use client";
import React, { useState } from "react";
import { Fugaz_One, Passero_One } from "next/font/google";
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { signup, login } = useAuth();

  async function handleSubmit() {
    if (!email || !password || password.length < 6) {
      setErrorMessage("Please give a valid email and a password longer than 5 characters.");
      return;
    }

    setAuthenticating(true);
    try {
      if (isRegister) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage("Sorry, something went wrong there.");
    } finally {
      setAuthenticating(false);
    }
  }

  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4">
      <h3 className={`text-4xl sm:text-5xl md:text-6xl ${fugaz.className}`}>
        {isRegister ? "Register" : "Log in"}
      </h3>
      <p>You&apos;re one step away!</p>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <input
        value={email}
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        className="w-full max-w-[350px] mx-auto px-3 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none focus:border-x-indigo-600"
        placeholder="Email"
      />
      <input
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        className="w-full max-w-[350px] mx-auto px-3 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none focus:border-x-indigo-600"
        placeholder="Password"
      />
      <div className="max-w-[350px] w-full mx-auto">
        <Button text={authenticating ? "Submitting" : "Submit"} full clickHandler={handleSubmit} />
      </div>

      <p>
        {isRegister ? "Already have an account? " : "Don't have an account? "}
        <button onClick={() => setIsRegister(!isRegister)} className="text-indigo-600">
          {isRegister ? "Log in" : "Register"}
        </button>
      </p>
    </div>
  );
}
