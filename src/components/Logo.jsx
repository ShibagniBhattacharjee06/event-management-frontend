import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';

const Logo = ({ className, size = 40, animated = true }) => {
    const theme = useTheme();
    // Using the primary color for the logo, or white if on a dark background/header
    const strokeColor = theme.palette.mode === 'dark' ? '#fff' : '#000';

    const draw = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (i) => ({
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { delay: i * 0.2, type: "spring", duration: 1.5, bounce: 0 },
                opacity: { delay: i * 0.2, duration: 0.01 }
            }
        })
    };

    return (
        <motion.div
            className={className}
            initial={animated ? "hidden" : "visible"}
            animate="visible"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <motion.svg
                width={size}
                height={size}
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                whileHover={{ scale: 1.05 }}
            >
                {/* Geometric Abstract E shape */}
                <motion.path
                    d="M30 30 H70"
                    stroke={strokeColor}
                    strokeWidth="6"
                    strokeLinecap="round"
                    variants={draw}
                    custom={0}
                />
                <motion.path
                    d="M30 50 H60"
                    stroke={strokeColor}
                    strokeWidth="6"
                    strokeLinecap="round"
                    variants={draw}
                    custom={1}
                />
                <motion.path
                    d="M30 70 H70"
                    stroke={strokeColor}
                    strokeWidth="6"
                    strokeLinecap="round"
                    variants={draw}
                    custom={2}
                />
                {/* Circle Ring */}
                <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke={strokeColor}
                    strokeWidth="4"
                    strokeLinecap="round"
                    variants={draw}
                    custom={3}
                    style={{ rotate: -90, transformOrigin: '50% 50%' }}
                />
            </motion.svg>
        </motion.div>
    );
};

export default Logo;
