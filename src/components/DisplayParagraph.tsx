import React from "react";

type Props = {
    text: string;
    currentIndex: number;
    wrongIndices: number[];
};

const DisplayParagraph = ({ text, currentIndex, wrongIndices }: Props) => {
    return (
        <p className="font-mono text-xl">
            {text.split("").map((char, i) => {
                let className = "";

                if (i < currentIndex) {
                    // already typed
                    className = wrongIndices.includes(i)
                        ? "text-red-500 bg-red-100" // wrong char
                        : "text-gray-400"; // correct typed
                } else if (i === currentIndex) {
                    className = wrongIndices.includes(i)
                        ? "text-red-500 bg-blue-100 animate-pulse" // wrong char
                        : "text-blue-500 bg-blue-100 animate-pulse"; // current char
                } else {
                    className = "text-black"; // upcoming chars
                }

                return (
                    <span key={i} className={className}>
                        {char}
                    </span>
                );
            })}
        </p>
    );
};

export default DisplayParagraph;
