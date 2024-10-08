"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [isLandscape, setLandscape] = useState(false);
  const [clock, setClock] = useState({
    seconds: "00",
    minutes: "00",
    hours: "00",
    sMovement: 0,
    mMovement: 0,
    hMovement: 0,
  });

  function formatTime(time: number) {
    return time < 10 ? `0${time}` : `${time}`;
  }

  function handleDate() {
    const date = new Date();
    let hours = formatTime(date.getHours());
    let minutes = formatTime(date.getMinutes());
    let seconds = formatTime(date.getSeconds());

    const sMovement = +seconds * 6;
    const mMovement = +minutes * 6 + +seconds / 10;
    const hMovement = +hours * 30 + +minutes / 2 + +seconds / 120;

    setClock({ hours, minutes, seconds, sMovement, mMovement, hMovement });
  }

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (width > height) setLandscape(true);
    else setLandscape(false);
  }, []);

  useEffect(() => {
    const interval = setInterval(handleDate, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full h-full flex flex-col items-center justify-center gap-4">
      <div
        className={`relative aspect-square rounded-full bg-white border-8 md:border-[20px] ${
          isLandscape ? "h-full" : "w-full"
        }`}
      >
        <div className="absolute w-full h-full flex flex-col items-center pt-32">
          <span className="text-gray-500">bytecraftr</span>
        </div>

        {Array.from({ length: 12 }, (_, i) => i).map((numb) => {
          return (
            <div
              key={numb}
              className="absolute left-[calc(50%-28px)] origin-center w-14 h-full flex flex-col items-center pt-2"
              style={{ transform: `rotate(${numb * 30}deg)` }}
            >
              <span
                className="absolute text-black text-xl md:text-4xl text-center font-semibold"
                style={{ transform: `rotate(${0 - numb * 30}deg)` }}
              >
                {numb || 12}
              </span>
            </div>
          );
        })}

        {Array.from({ length: 60 }, (_, i) => i).map((numb) => {
          const hide = !(numb % 5);
          return (
            <div
              key={numb}
              className="absolute left-[calc(50%-28px)] origin-center w-14 h-full flex flex-col items-center gap-1 pt-3"
              style={{ transform: `rotate(${numb * 6}deg)` }}
            >
              <span
                className={`hidden md:block ${
                  hide ? "text-transparent" : "text-black text-xs"
                }`}
              >
                {numb}
              </span>
              {!hide && (
                <div className="w-1 aspect-square rounded-full bg-black" />
              )}
            </div>
          );
        })}

        {/* hours */}
        <div
          className={`absolute left-[calc(50%-6px)] origin-center w-[12px] h-full ${
            +clock.minutes ? "duration-100" : ""
          }`}
          style={{ transform: `rotate(${clock.hMovement}deg)` }}
        >
          <div className="absolute top-[25%] w-full h-[35%] bg-black rounded-lg border" />
        </div>
        {/* minutes */}
        <div
          className="absolute left-[calc(50%-3px)] origin-center w-[6px] h-full"
          style={{ transform: `rotate(${clock.mMovement}deg)` }}
        >
          <div className="absolute top-[10%] w-full h-[50%] bg-black rounded-lg border" />
        </div>
        {/* seconds */}
        <div
          className={`absolute left-[calc(50%-1px)] origin-center w-[2px] h-full ${
            +clock.seconds ? "duration-100" : ""
          }`}
          style={{ transform: `rotate(${clock.sMovement}deg)` }}
        >
          <div className="absolute top-[5%] w-full h-[60%] bg-red-500" />
          <span className="absolute top-10 md:top-14 md:-left-2 text-black md:text-2xl whitespace-nowrap rotate-90">
            시작
          </span>
        </div>

        <div className="absolute left-[calc(50%-8px)] top-[calc(50%-8px)] h-4 aspect-square rounded-full bg-white border-4 border-red-500" />
      </div>

      <div className="">
        {clock.hours}:{clock.minutes}:{clock.seconds}
      </div>
    </section>
  );
}
