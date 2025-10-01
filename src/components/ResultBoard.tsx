import Link from 'next/link'
import React from 'react'
import { BsShare } from 'react-icons/bs'
import { IoArrowForward } from 'react-icons/io5'
import { PiRanking } from 'react-icons/pi'

type Props = {
    typeSpeed: number,
    accuracy: number,
    time: number
}

const ResultBoard = ({ typeSpeed, accuracy, time }: Props) => {

    const totalSeconds = Math.floor(time / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = time % 1000;

    const format = (num: number, digits = 2) => String(num).padStart(digits, "0");
    const formatMillis = (num: number) => String(num).padStart(3, "0");

    return (
        <div className='w-[460px] h-56 flex flex-col'>
            <div
                className='size-full flex flex-col pl-4 justify-center gap-2 text-2xl font-semibold bg-blue-100 border-4 rounded-md border-blue-200 text-blue-500'
            >
                <div className='flex flex-row gap-2'>
                    🚀 Speed: <span className='text-blue-600'>{typeSpeed}</span> words/minute
                </div>

                <div className='flex flex-row gap-2'>
                    🎯 Accuracy: <span className={`${accuracy >= 80 ? 'text-blue-600' : accuracy >= 60 ? 'text-yellow-400' : 'text-red-500'}`}>{accuracy < 0 ? 0 : accuracy}%</span>
                </div>

                <div className='flex flex-row gap-2'>
                    ⏱️ Time:
                    <span className='text-blue-600'>
                        {hours > 0 && `${format(hours)}:`}
                        {format(minutes)}:{format(seconds)}.{formatMillis(milliseconds)}
                    </span>
                </div>
            </div>

            <div className='w-full h-16 flex flex-row items-start justify-end gap-2 -mt-6 px-4'>
                <button className='size-10 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer'>
                    <BsShare className='text-xl font-bold text-white' />
                </button>

                <button className='size-10 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer'>
                    <PiRanking className='text-xl font-bold text-white' />
                </button>

                <div className='flex flex-col items-center justify-center'>
                    <Link className='size-10 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer' href={'/practice'}>
                        <IoArrowForward className='text-xl font-bold text-white' />
                    </Link>
                    <p className='font-semibold text-xs text-blue-500'>next</p>
                </div>
            </div>
        </div>
    )
}

export default ResultBoard
