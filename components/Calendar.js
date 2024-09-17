"use client";
import React, { useState } from "react";
import { gradients } from "@/utils/gradients";
import { baseRating } from "@/utils/ratings";
import { Fugaz_One } from "next/font/google";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

const months = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sept",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};
const monthsArr = Object.keys(months);
const dayList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function Calendar({ demo, completeData, handleSetMood }) {
  const now = new Date();
  const currMonth = now.getMonth();
  const [selectedMonth, setSelectedMonth] = useState(monthsArr[currMonth]);

  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

  const numericMonth = monthsArr.indexOf(selectedMonth);
  const data = completeData?.[selectedYear]?.[numericMonth] || {};

  function handleIncrementMonth(val) {
    if (numericMonth + val < 0) {
      // set the month value equal to 11 and decrement the year
      setSelectedYear((curr) => curr - 1);
      setSelectedMonth(monthsArr[monthsArr.length - 1]);
    } else if (numericMonth + val > 11) {
      // set month equal to 0 and increment the year
      setSelectedYear((curr) => curr + 1);
      setSelectedMonth(monthsArr[0]);
    } else {
      setSelectedMonth(monthsArr[numericMonth + val]);
    }
  }

  const monthNow = new Date(selectedYear, monthsArr.indexOf(selectedMonth), 1);
  const firstDayOfMonth = monthNow.getDay();
  const daysInMonth = new Date(selectedYear, monthsArr.indexOf(selectedMonth) + 1, 0).getDate();

  const daysToDisplay = firstDayOfMonth + daysInMonth;
  const numRows = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0);

  const getDayInfo = (dayIndex, dayOfWeekIndex, rowIndex) => {
    const isToday = dayIndex === now.getDate();
    const dayDisplay =
      dayIndex > daysInMonth
        ? false
        : rowIndex === 0 && dayOfWeekIndex < firstDayOfMonth
        ? false
        : true;

    const color = demo
      ? gradients.indigo[baseRating[dayIndex]]
      : dayIndex in data
      ? gradients.indigo[data[dayIndex]]
      : "white";

    return {
      isToday,
      dayDisplay,
      color,
    };
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <button className="mr-auto " onClick={() => handleIncrementMonth(-1)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width={15}>
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
          </svg>
        </button>
        <p className={`text-center capitalize ${fugaz.className} textGradient `}>
          {selectedMonth} {selectedYear}
        </p>
        <button className="ml-auto" onClick={() => handleIncrementMonth(1)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width={15}>
            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10">
        {[...Array(numRows).keys()].map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-7 gap-1">
            {dayList.map((dayOfWeek, dayOfWeekIndex) => {
              let dayIndex = rowIndex * 7 + dayOfWeekIndex - (firstDayOfMonth - 1);
              const { isToday, dayDisplay, color } = getDayInfo(dayIndex, dayOfWeekIndex, rowIndex);

              if (!dayDisplay) {
                return <div className="bg-white" key={dayOfWeekIndex} />;
              }

              return (
                <div
                  style={{ background: color }}
                  key={dayOfWeekIndex}
                  className={`text-xs smd:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg ${
                    isToday ? "border-indigo-400" : "border-indigo-100"
                  } ${color === "white" ? "text-indigo-400" : "text-white"}`}
                >
                  <p>{dayIndex}</p>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}
