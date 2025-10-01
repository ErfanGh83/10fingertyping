type Props = {
    isNext: boolean,
    pressedWrong: boolean
}

const SpaceBarContainer = ({ isNext, pressedWrong }: Props) => {

    return (
        <button
            className={`h-12 w-72 flex items-start justify-center text-xl bg-white rounded-md shadow-md 
                ${pressedWrong ? 'border-red-500 text-red-500 border-4' : isNext ? 'border-blue-500 text-blue-500 border-4' : 'border-gray-500 text-gray-600 border-2'}`}
        >
            -----
        </button>
    )
}

export default SpaceBarContainer