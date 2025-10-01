"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function SpeedFlame({ typeSpeed }: { typeSpeed: number }) {
  return (
    <div className="size-8 relative flex items-center justify-center text-black">
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
        className={`size-fit text-xs absolute z-10 font-semibold mt-2 ${
          typeSpeed >= 50 ? "text-black rounded-full bg-white" : ""
        }`}
      >
        {typeSpeed}
      </div>
    </div>
  )
}
