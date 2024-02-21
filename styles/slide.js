'use client'

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const pageVariants = {
    initial: {
        opacity: 0,
        x: "-100vw",
    },
    in: {
        opacity: 1,
        x: 0,
    },
    out: {
        opacity: 0,
        x: "100vw",
    },
};

const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
};

export const Slide = ({ children }) => {
    const pathname = usePathname();

    return (
        <motion.div
            key={pathname}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
        >
            {children}
        </motion.div>
    );
};