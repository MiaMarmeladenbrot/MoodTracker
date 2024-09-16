import React from "react";
import { Fugaz_One } from "next/font/google";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Dashboard() {
  const statuses = {
    num_days: 14,
    time_remaining: "13:14:26",
    date: new Date().toDateString(),
  };

  const moods = {
    "&*@#$": "😡",
    Sad: "😢",
    Existing: "😶",
    Good: "😊",
    Elated: "😍",
  };

  return (
    <div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16">
      <div className="grid grid-cols-3 gap-3 bg-indigo-50 text-indigo-500 rounded-lg p-4">
        {Object.keys(statuses).map((status, statusIndex) => (
          <div key={statusIndex}>
            <p className="font-medium uppercase pb-1 truncate">{status.replaceAll("_", " ")}</p>
            <p className={`${fugaz.className} text-base sm:text-lg truncate`}>{statuses[status]}</p>
          </div>
        ))}
      </div>

      <h4 className={`text-5xl sm:text-6xl md:text-7xl text-center ${fugaz.className}`}>
        How do you <span className="textGradient">feel</span> today?
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {Object.keys(moods).map((mood, moodIndex) => (
          <button
            key={moodIndex}
            className={`${
              moodIndex === 4 ? "col-span-2 sm:col-span-1" : ""
            } p-4 rounded-2xl purpleShadow duration-100 bg-indigo-50 hover:bg-indigo-200 text-center`}
          >
            <p className={`text-4xl sm:text-5xl md:text-6xl pb-3 ${fugaz.className}`}>
              {moods[mood]}
            </p>
            <p className={`text-indigo-500 text-xs sm:text-sm md:text-base ${fugaz.className}`}>
              {mood}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
