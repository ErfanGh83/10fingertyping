"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function SpeedFlame({ typeSpeed }: { typeSpeed: number }) {
  return (
    <div className="size-12 relative flex items-center justify-center text-black pb-8">
      <AnimatePresence>
        {typeSpeed >= 50 && (
          <motion.div
            key="flame"
            className="absolute z-0 w-full h-full"
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Image
              src="/animated/fire-flame.gif"
              alt="flame"
              fill
              className="object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`size-6 flex items-center justify-center text-xs absolute z-10 font-semibold mt-2 rounded-full bg-white ${
          typeSpeed >= 50 ? "text-black" : "border-[1px] border-gray-300"
        }`}
      >
        {typeSpeed}
      </div>
    </div>
  )
}
