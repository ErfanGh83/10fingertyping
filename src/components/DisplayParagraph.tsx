import React from "react";
import SpeedFlame from "./SpeedFlame";

type Props = {
    text: string;
    currentIndex: number;
    wrongIndices: number[];
    typeSpeed: number;
};

const DisplayParagraph = ({ text, currentIndex, wrongIndices, typeSpeed }: Props) => {
    return (
        <div className="font-mono text-xl relative whitespace-pre-wrap">
            {text.split("").map((char, i) => {
                let className = "";

                if (i < currentIndex) {
                    className = wrongIndices.includes(i)
                        ? "text-red-500 bg-red-100"
                        : "text-blue-400";
                } else if (i === currentIndex) {
                    className = wrongIndices.includes(i)
                        ? "text-red-500 bg-blue-100 animate-pulse relative"
                        : "text-blue-500 bg-blue-100 animate-pulse relative";
                } else {
                    className = "text-black";
                }

                return (
                    <span key={i} className={`relative inline-block`}>
                        <p className={className}>
                            {char}
                        </p>
                        {/* 🔥 Flame appears only on current char */}
                        {i === currentIndex && (
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                                <SpeedFlame typeSpeed={typeSpeed} />
                            </div>
                        )}
                    </span>
                );
            })}
        </div>
    );
};

export default DisplayParagraph;
