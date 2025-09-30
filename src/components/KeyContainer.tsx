import React from 'react'

type Props = {
    keyText: string,
    alt?: string | null,
    isNext: boolean,
    pressedWrong: boolean
}

const KeyContainer = ({ keyText, alt, isNext, pressedWrong }: Props) => {


    return (
        <button
            className={`size-12 flex items-center justify-center text-xl rounded-md relative 
                ${pressedWrong ? 'border-red-500 text-red-500 border-4 font-bold' : isNext ? 'border-blue-500 text-blue-500 border-4 font-bold' : 'border-gray-500 text-gray-600 border-2'}`}
        >
            {alt ? alt : keyText}

            {
                alt && 
                <p className='absolute z-10 bottom-0 right-0 text-xs m-1'>{keyText}</p>
            }
        </button>
    )
}

export default KeyContainer