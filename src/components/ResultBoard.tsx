import React from 'react'

type Props = {
    typeSpeed: number,
    accuracy: number
}

const ResultBoard = ({ typeSpeed, accuracy }: Props) => {
    return (
        <div
            className='size-fit p-8 flex flex-col gap-2 text-2xl font-semibold mt-2 bg-blue-100 border-4 rounded-md border-blue-400 text-blue-500'
        >
            <div className='flex flex-row gap-2'>
                🚀 Speed: <span className='text-blue-600'>{typeSpeed}</span> words/minute
            </div>

            <div className='flex flex-row gap-2'>
                🎯 Accuracy: <span className={`${accuracy >= 80 ? 'text-blue-600' : accuracy >= 60 ? 'text-yellow-400' : 'text-red-500'}`}>{accuracy < 0 ? 0 : accuracy}%</span>
            </div>
        </div>
    )
}

export default ResultBoard