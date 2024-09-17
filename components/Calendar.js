"use client";
import React, { useState } from "react";
import { gradients } from "@/utils/gradients";
import { baseRating } from "@/utils/ratings";

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
  console.log({ completeData });

  const now = new Date();
  const currMonth = now.getMonth();
  const [selectedMonth, setSelectedMonth] = useState(monthsArr[currMonth]);

  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

  const numericMonth = monthsArr.indexOf(selectedMonth);
  const data = completeData?.[selectedYear]?.[numericMonth] || {};
  console.log(data);

  function handleIncrementMonth(val) {
    // +1 or -1
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
  );
}
