"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function SpeedFlame({ typeSpeed }: { typeSpeed: number }) {
  return (
    <div className="size-20 relative flex items-center justify-center">
      <AnimatePresence>
        {typeSpeed >= 50 && (
          <motion.div
            key="flame"
            className="absolute z-0 w-full h-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
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
        className={`size-fit text-2xl absolute z-10 mt-6 font-semibold ${
          typeSpeed >= 50 ? "text-white text-shadow-lg" : ""
        }`}
      >
        {typeSpeed}
      </div>
    </div>
  )
}
