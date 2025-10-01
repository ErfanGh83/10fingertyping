import React from "react";
import Image from "next/image";

type Props = {
  time: number; // time in milliseconds
};

const Timer = ({ time }: Props) => {

  const totalSeconds = Math.floor(time / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = time % 1000;

  const format = (num: number, digits = 2) => String(num).padStart(digits, "0");
  const formatMillis = (num: number) => String(num).padStart(3, "0");

  return (
    <div className="w-56 h-36 flex items-center justify-center relative">
      <div className="bg-black text-green-400 font-mono text-3xl px-1 rounded-md shadow-lg w-48 absolute z-10 h-[92px] -mb-4 flex items-center justify-center">
        {hours > 0 && `${format(hours)}:`}
        {format(minutes)}:{format(seconds)}:{formatMillis(milliseconds)}
      </div>

      <Image src={'/images/clock-bg.png'} alt="clock" fill className="object-cover"/>
    </div>
  );
};

export default Timer;
