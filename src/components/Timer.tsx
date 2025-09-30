import React from "react";

type Props = {
  time: number; // time in milliseconds
};

const Timer = ({ time }: Props) => {
  // Convert milliseconds
  const totalSeconds = Math.floor(time / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = time % 1000;

  // Format numbers with leading zeros
  const format = (num: number, digits = 2) => String(num).padStart(digits, "0");
  const formatMillis = (num: number) => String(num).padStart(3, "0");

  return (
    <div className="bg-black text-green-400 font-mono text-3xl px-6 py-3 rounded-md shadow-lg w-fit">
      {hours > 0 && `${format(hours)}:`}
      {format(minutes)}:{format(seconds)}:{formatMillis(milliseconds)}
    </div>
  );
};

export default Timer;
