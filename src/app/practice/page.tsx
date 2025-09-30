"use client"

import React, { useEffect, useState } from 'react'
import KeyContainer from '@/components/KeyContainer'
import { exampleParagraph1 } from '../../../public/api'
import { keysList } from '../../../public/api'
import { useKeyPress } from '@/hooks/useKeyPress'
import { compareKeys, isUsingAlt, returnNextCharByIndex } from '@/utils'
import SpaceBarContainer from '@/components/SpaceBarContainer'
import ShiftContainer from '@/components/ShiftContainer'

const Page = () => {

    const pressedKey = useKeyPress()
    const [nextChar, setNextChar] = useState<string | null>(null)
    const [wrongKeyPressed, setWrongKeyPressed] = useState(false)
    const [shiftIsNeeded, setShiftIsNeeded] = useState(false)
    const [index, setIndex] = useState<number>(0)
    const [paragraph, setParagraph] = useState<string | null>(null)
    const [finished, setFinished] = useState<boolean>(false)
    const [started, setStarted] = useState<boolean>(false)
    const [running, setRunning] = useState<boolean>(false)

    useEffect(() => {
        setParagraph(exampleParagraph1)
    }, [])

    useEffect(() => {
        if (paragraph) {
            setNextChar(paragraph[0])
            setIndex(0)
            setRunning(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [started])

    useEffect(() => {
        if(!started && pressedKey === ' ') {
            setStarted(true)
        }

        if (nextChar && pressedKey) {
            if (compareKeys(nextChar, pressedKey) === false) {
                if (pressedKey !== "Shift") {
                    setWrongKeyPressed(true);
                }
            }
            else {
                setWrongKeyPressed(false)
                setIndex(prev => prev + 1)
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pressedKey])

    useEffect(() => {
        setShiftIsNeeded(false)

        if (paragraph) {
            const nextCharacter = returnNextCharByIndex(paragraph, index)
            if (nextCharacter) {
                setNextChar(nextCharacter)
            }
            else {
                setFinished(true)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index])

    useEffect(() => {
        if (nextChar && isUsingAlt(nextChar)) {
            setShiftIsNeeded(true)
        }
    }, [nextChar])

    return (
        <div
            className='w-screen h-screen bg-white text-black'
        >
            <div
                className='size-full flex flex-col items-center justify-center gap-12'
            >
                <h2 className='text-2xl text-black font-semibold'>{exampleParagraph1}</h2>

                <div
                    className='w-fit flex flex-col gap-2 items-center justify-center'
                >
                    {
                        keysList.map((keysRow, index) => (

                            <div key={index} className={`w-fit flex flex-row gap-2 items-center justify-center ${
                                index === 3 ? 'mr-32' : index === 0 ? 'mr-12' : ''
                            }`}>
                                <>
                                    {
                                        index === 3 && <ShiftContainer shiftIsNeeded={shiftIsNeeded} />
                                    }
                                    {
                                        keysRow.map((key) => (
                                            <KeyContainer key={key.key} keyText={key.key} alt={nextChar === key.alt ? key.alt : null} isNext={(key.key.toLowerCase() === nextChar?.toLowerCase() || key.alt === nextChar)} pressedWrong={wrongKeyPressed && (key.key.toLowerCase() === nextChar?.toLowerCase() || key.alt === nextChar)} />
                                        ))
                                    }
                                </>
                            </div>
                        ))
                    }

                    <div className='size-fit'>
                        <SpaceBarContainer isNext={nextChar === ' '} pressedWrong={wrongKeyPressed && nextChar === ' '} />
                    </div>
                </div>
                <button
                    onClick={() => setStarted(!started)}
                    className={`size-fit p-2 rounded-md text-xl text-white cursor-pointer ${
                            started ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                >
                    {
                        started ? 'Stop' : 'Start'
                    }
                </button>
            </div>
        </div>
    )
}

export default Page