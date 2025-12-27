'use client';

import { useEffect, useRef } from 'react';
import { useMantineColorScheme } from '@mantine/core';

interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
}

export function SpaceWarpBackground() {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const isDarkRef = useRef(isDark);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | undefined>(undefined);

  // Update ref when theme changes
  useEffect(() => {
    isDarkRef.current = isDark;
    if (canvasRef.current) {
      canvasRef.current.style.backgroundColor = isDark ? '#000000' : '#ffffff';
    }
  }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    // Initialize dots
    const dotCount = Math.floor(
      (window.innerWidth * window.innerHeight) / 15000,
    );
    dotsRef.current = Array.from({ length: dotCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      baseX: 0,
      baseY: 0,
    }));

    // Store base positions
    dotsRef.current.forEach((dot) => {
      dot.baseX = dot.x;
      dot.baseY = dot.y;
    });

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // Track pointer position (for touch devices)
    const handlePointerMove = (e: PointerEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('pointermove', handlePointerMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Adjust dot color based on current theme (read from ref)
      ctx.fillStyle = isDarkRef.current
        ? 'rgba(255, 255, 255, 0.6)'
        : 'rgba(0, 0, 0, 0.6)';

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const warpStrength = 100; // How strong the warp effect is
      const warpRadius = 200; // Radius of warp influence

      dotsRef.current.forEach((dot) => {
        // Calculate distance from mouse
        const dx = dot.baseX - mouseX;
        const dy = dot.baseY - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Apply warp effect
        if (distance < warpRadius) {
          const force = (warpRadius - distance) / warpRadius;
          const angle = Math.atan2(dy, dx);
          const warpAmount = force * warpStrength;

          dot.x = dot.baseX + Math.cos(angle) * warpAmount;
          dot.y = dot.baseY + Math.sin(angle) * warpAmount;
        } else {
          // Return to base position smoothly
          dot.x += (dot.baseX - dot.x) * 0.05;
          dot.y += (dot.baseY - dot.y) * 0.05;
        }

        // Update base position with slow drift
        dot.baseX += dot.vx;
        dot.baseY += dot.vy;

        // Wrap around edges
        if (dot.baseX < 0) dot.baseX = canvas.width;
        if (dot.baseX > canvas.width) dot.baseX = 0;
        if (dot.baseY < 0) dot.baseY = canvas.height;
        if (dot.baseY > canvas.height) dot.baseY = 0;

        // Draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      resizeCanvas();
      // Adjust dot count if needed
      const newDotCount = Math.floor((canvas.width * canvas.height) / 15000);
      if (newDotCount > dotsRef.current.length) {
        const additionalDots = Array.from(
          { length: newDotCount - dotsRef.current.length },
          () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            baseX: 0,
            baseY: 0,
          }),
        );
        additionalDots.forEach((dot) => {
          dot.baseX = dot.x;
          dot.baseY = dot.y;
        });
        dotsRef.current.push(...additionalDots);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        backgroundColor: isDark ? '#000000' : '#ffffff',
        pointerEvents: 'none',
      }}
    />
  );
}
