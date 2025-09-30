"use client"

import React, { useEffect, useState } from 'react'
import KeyContainer from '@/components/KeyContainer'
import { exampleParagraph1 } from '../../../public/api'
import { keysList } from '../../../public/api'
import { useKeyPress } from '@/hooks/useKeyPress'
import { compareKeys, isUsingAlt, returnNextCharByIndex } from '@/utils'
import SpaceBarContainer from '@/components/SpaceBarContainer'
import ShiftContainer from '@/components/ShiftContainer'
import DisplayParagraph from '@/components/DisplayParagraph'
import { useTimer } from '@/hooks/useTimer'
import Timer from '@/components/Timer'

const Page = () => {

    const pressedKey = useKeyPress()
    const { time, start, stop, reset } = useTimer()
    const [nextChar, setNextChar] = useState<string | null>(null)
    const [wrongKeyPressed, setWrongKeyPressed] = useState(false)
    const [shiftIsNeeded, setShiftIsNeeded] = useState(false)
    const [index, setIndex] = useState<number>(0)
    const [paragraph, setParagraph] = useState<string | null>(null)
    const [wrongIndices, setWrongIndices] = useState<number[]>([])
    const [finished, setFinished] = useState<boolean>(false)
    const [started, setStarted] = useState<boolean>(false)
    const [paused, setPaused] = useState<boolean>(false)
    const [running, setRunning] = useState<boolean>(false)
    const [typeSpeed, setTypeSpeed] = useState<number>(0)
    const [typedChars, setTypedChars] = useState<number>(0)

    useEffect(() => {
        setParagraph(exampleParagraph1)
    }, [])

    useEffect(() => {
        if (paragraph && started) {
            setNextChar(paragraph[0])
            setIndex(0)
            start()
            setRunning(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [started])

    useEffect(() => {
        if (!started && pressedKey === ' ') {
            setStarted(true)
        }
        else if (started && !running && pressedKey === ' ') {
            setPaused(false)
        }

        if (nextChar && pressedKey && running) {
            if (compareKeys(nextChar, pressedKey) === false) {
                if (pressedKey !== "Shift") {
                    setWrongKeyPressed(true);
                    setWrongIndices((prev) => [...prev, index]);
                }
            }
            else {
                setTypedChars(prev => prev + 1)
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
            if (nextCharacter && index < paragraph.length) {
                setNextChar(nextCharacter)
            }
            else {
                finishTrial()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index])

    useEffect(() => {
        if (nextChar && isUsingAlt(nextChar)) {
            setShiftIsNeeded(true)
        }
    }, [nextChar])

    useEffect(() => {
        setTypeSpeed(calculateCPM(typedChars, time))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [time])

    const handlePause = () => {
        if (started) {
            if (!paused) {
                setRunning(false)
                setPaused(true)
                stop()
            }
            else {
                setRunning(true)
                setPaused(false)
                start()
            }
        }
    }

    const finishTrial = () => {
        setFinished(true)
        setNextChar(null)
        setRunning(false)
        stop()
    }

    const handleReset = () => {
        setTypedChars(0)
        setTypeSpeed(0)
        setIndex(0)
        setNextChar(null)
        setPaused(false)
        reset()
        setStarted(false)
        setFinished(false)
    }

    const calculateCPM = (typedChars: number, time: number) => {
        if (time === 0) return 0;

        const timeInMinutes = time / 1000 / 60;
        const cpm = (typedChars / timeInMinutes) / 5;

        return Math.floor(cpm);
    };


    return (
        <div
            className='w-screen h-screen bg-white text-black relative'
        >
            <div
                className='size-full flex flex-col items-center justify-center gap-12'
            >
                <div className='size-fit text-2xl'>
                    {typeSpeed}
                </div>

                <DisplayParagraph text={paragraph ? paragraph : ""} currentIndex={index} wrongIndices={wrongIndices ? wrongIndices : []} />

                <div
                    className='w-fit flex flex-col gap-2 items-center justify-center'
                >
                    {
                        keysList.map((keysRow, index) => (

                            <div key={index} className={`w-fit flex flex-row gap-2 items-center justify-center ${index === 3 ? 'mr-32' : index === 0 ? 'mr-12' : ''
                                }`}>
                                <>
                                    {
                                        index === 3 && <ShiftContainer shiftIsNeeded={shiftIsNeeded} wrongKeyPressed={wrongKeyPressed} />
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

                <div className='size-fit flex flex-row-reverse gap-4'>
                    {
                        !started && !finished &&
                        <button
                            onClick={() => setStarted(true)}
                            className='size-fit p-2 rounded-md text-xl text-white cursor-pointer bg-blue-500 hover:bg-blue-600'
                        >
                            Start
                        </button>
                    }

                    {
                        started && !finished &&
                        <button
                            onClick={handlePause}
                            className={`size-fit p-2 rounded-md text-xl text-white cursor-pointer ${running ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'
                                }`}
                        >
                            {running ? 'Stop' : 'Continue'}
                        </button>
                    }

                    {
                        started &&
                        <button
                            onClick={handleReset}
                            className='size-fit p-2 rounded-md text-xl text-white cursor-pointer bg-red-500 hover:bg-red-600'
                        >
                            Restart
                        </button>
                    }
                </div>

                <Timer time={time} />
            </div>
        </div>
    )
}

export default Page