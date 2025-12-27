'use client';
import { useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { useMounted } from '@mantine/hooks';
import { motion } from 'framer-motion';
import classes from './ThemeButton.module.css';

export const ThemeButton = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isMounted = useMounted();

  if (!isMounted) {
    return null;
  }

  const isDark = colorScheme === 'dark';

  return (
    <button
      onClick={toggleColorScheme}
      className={classes.themeToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-pressed={isDark}
    >
      {/* Rail/Track */}
      <motion.div
        className={classes.themeRail}
        animate={{
          backgroundColor: isDark
            ? 'rgba(0, 0, 0, 0.8)'
            : 'rgba(255, 255, 255, 0.8)',
          boxShadow: isDark
            ? '0 0 20px rgba(147, 51, 234, 0.3), inset 0 0 10px rgba(255, 255, 255, 0.1)'
            : '0 0 20px rgba(59, 130, 246, 0.3), inset 0 0 10px rgba(0, 0, 0, 0.1)',
          border: isDark
            ? '1px solid rgba(147, 51, 234, 0.5)'
            : '1px solid rgba(59, 130, 246, 0.5)',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {/* Knob */}
        <motion.div
          className={classes.themeKnob}
          animate={{
            x: isDark ? 24 : 0,
            backgroundColor: isDark ? '#9333ea' : '#3b82f6',
            boxShadow: isDark
              ? '0 0 20px rgba(147, 51, 234, 0.6), 0 4px 8px rgba(0, 0, 0, 0.3)'
              : '0 0 20px rgba(59, 130, 246, 0.6), 0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
            duration: 0.4,
          }}
        >
          <motion.div
            className={classes.themeIcon}
            animate={{
              rotate: isDark ? 360 : 0,
              scale: isDark ? 0.9 : 1,
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {isDark ? (
              <IconMoon size={16} color="white" />
            ) : (
              <IconSun size={16} color="white" />
            )}
          </motion.div>
        </motion.div>

        {/* Background grid pattern */}
        <motion.div
          className={classes.themeGrid}
          animate={{
            backgroundImage: isDark
              ? 'linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)'
              : 'linear-gradient(rgba(0, 0, 0, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.08) 1px, transparent 1px)',
            opacity: isDark ? 0.4 : 0.6,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
      </motion.div>
    </button>
  );
};
