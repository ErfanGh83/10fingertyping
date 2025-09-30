type Props = {
    shiftIsNeeded: boolean
}

const ShiftContainer = ({ shiftIsNeeded }: Props) => {

    return (
        <button
            className={`h-12 w-32 flex items-center justify-center text-xl rounded-md 
                ${shiftIsNeeded ? 'border-blue-500 text-blue-500 border-4 font-bold' : 'border-gray-500 text-gray-600 border-2'}`}
        >
            Shift
        </button>
    )
}

export default ShiftContainer