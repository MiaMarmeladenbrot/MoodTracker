"use client";
import React, { useEffect, useState } from "react";
import { Fugaz_One } from "next/font/google";
import Calendar from "./Calendar";
import { useAuth } from "@/context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Loading from "./Loading";
import Login from "./Login";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Dashboard() {
  const { currentUser, userDataObj, setUserDataObj, loading } = useAuth();
  const [moodData, setMoodData] = useState({});
  const now = new Date();

  useEffect(() => {
    if (!currentUser || !userDataObj) return;
    setMoodData(userDataObj);
  }, [currentUser, userDataObj]);

  function countValues() {
    let totalNumOfDays = 0;
    let sumMoods = 0;
    for (let year in moodData) {
      for (let month in moodData[year]) {
        for (let day in moodData[year][month]) {
          let daysMood = moodData[year][month][day];
          totalNumOfDays++;
          sumMoods += daysMood;
        }
      }
    }
    return { num_days: totalNumOfDays, average_mood: (sumMoods / totalNumOfDays).toFixed(1) };
  }

  const statuses = {
    ...countValues(),
    time_remaining: `${23 - now.getHours()}H ${60 - now.getMinutes()}M`,
  };

  async function handleSetMood(mood) {
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();

    try {
      const newData = { ...userDataObj };
      if (!newData?.[year]) newData[year] = {};
      if (!newData?.[year]?.[month]) newData[year][month] = {};

      newData[year][month][day] = mood;

      // update current state
      setMoodData(newData);
      // update global state
      setUserDataObj(newData);
      // update firebase
      const docRef = doc(db, "users", currentUser.uid);
      const res = await setDoc(
        docRef,
        {
          [year]: {
            [month]: {
              [day]: mood,
            },
          },
        },
        { merge: true }
      );
    } catch (error) {
      console.log("failed to set data", error.message);
    }
  }

  const moods = {
    "&*@#$": "😡",
    Sad: "😢",
    Existing: "😶",
    Good: "😊",
    Elated: "😍",
  };

  if (loading) {
    return <Loading />;
  }

  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16">
      <div className="grid grid-cols-3 gap-3 bg-indigo-50 text-indigo-500 rounded-lg p-4">
        {Object.keys(statuses).map((status, statusIndex) => (
          <div key={statusIndex}>
            <p className="font-medium capitalize pb-1 truncate">{status.replaceAll("_", " ")}</p>
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
            onClick={() => handleSetMood(moodIndex + 1)}
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

      <Calendar completeData={moodData} handleSetMood={handleSetMood} />
    </div>
  );
}
