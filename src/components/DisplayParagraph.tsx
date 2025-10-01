import React, { useEffect, useRef } from "react";
import SpeedFlame from "./SpeedFlame";

type Props = {
    text: string;
    currentIndex: number;
    wrongIndices: number[];
    typeSpeed: number;
};

const DisplayParagraph = ({ text, currentIndex, wrongIndices, typeSpeed }: Props) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const currentCharRef = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        if (containerRef.current && currentCharRef.current) {
            const container = containerRef.current;
            const charEl = currentCharRef.current;

            // Center the current character in the scrollable container
            const containerHeight = container.clientHeight;
            const charOffsetTop = charEl.offsetTop;
            const charHeight = charEl.clientHeight;

            container.scrollTo({
                top: charOffsetTop - containerHeight / 2 + charHeight / 2,
                behavior: "smooth",
            });
        }
    }, [currentIndex]);

    return (
        <div
            ref={containerRef}
            className="font-mono text-xl relative whitespace-pre-wrap 
               max-h-64 max-w-3/4 overflow-y-auto 
               px-6 py-12 rounded-lg border-2 border-blue-300
               bg-gray-50 shadow-inner leading-relaxed
               scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-200"
        >
            {text.split("").map((char, i) => {
                let className = "";

                if (i < currentIndex) {
                    className = wrongIndices.includes(i)
                        ? "text-red-500 bg-red-100"
                        : "text-blue-400";
                } else if (i === currentIndex) {
                    className = wrongIndices.includes(i)
                        ? "text-red-500 bg-blue-100 animate-pulse relative"
                        : "text-blue-600 bg-blue-100 animate-pulse relative";
                } else {
                    className = "text-gray-700";
                }

                return (
                    <span
                        key={i}
                        ref={i === currentIndex ? currentCharRef : null}
                        className="relative"
                    >
                        {char === " " ? (
                            <span className={`${className} inline-block w-2`}>
                                {/* Space with fixed width for alignment */}
                            </span>
                        ) : (
                            <span className={className}>{char}</span>
                        )}

                        {/* 🔥 Flame tracker */}
                        {i === currentIndex && (
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 pointer-events-none">
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
