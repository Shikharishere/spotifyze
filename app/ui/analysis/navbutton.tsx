import {motion} from "framer-motion"
import Link from "next/link";
import React from "react";

export default function NavButton({ href, children} : { href: string, children: string}) {

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-3 sm:px-6 py-1 sm:py-2 rounded-full text-xs sm:text-xs font-semibold transition-colors ${
        'bg-white text-[#1DB954] border border-[#1DB954] hover:bg-[#1DB954] hover:text-white'
      }`}
    >
      <Link href={href}>{children}</Link>
    </motion.button>
  )
}