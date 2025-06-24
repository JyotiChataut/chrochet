'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Card({ reopenPopup }: { reopenPopup: () => void }) {
  return (
    <div className="relative z-10 flex items-center justify-center min-h-[80vh] px-4">
      <motion.div
        key="healing-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="relative bg-gradient-to-br from-cyan-800/70 via-cyan-600/60 to-cyan-400/40 backdrop-blur-sm border border-white/30 rounded-3xl shadow-lg p-8 max-w-xl w-full text-center text-white"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 font-serif tracking-wide drop-shadow">
          🌷 A Place to Grow
        </h1>

        <p className="text-md sm:text-lg leading-relaxed mb-3 font-light">
          This is my cozy little space on the internet — where I learn, create, and share both <strong>crochet</strong> and <strong>code</strong>.
        </p>

        <p className="text-sm text-white/90 mb-3">
          I’m building this with <strong>Next.js</strong>, and every yarn loop and every line of code is part of something that’s helping me feel stronger, calmer, and more myself.
        </p>

        <p className="text-sm text-white/80 mb-4 italic">
          I also share cute little reels 🧵💻 — because making progress is worth celebrating.
        </p>

        <a
          href="/about"
          className="inline-block mt-2 bg-white/20 hover:bg-white/40 transition text-white hover:text-cyan-950 px-5 py-2 rounded-full text-sm font-medium shadow-md"
        >
          Read My Journey
        </a>

        <button
          onClick={reopenPopup}
          className="mt-4 inline-block bg-pink-200 hover:bg-pink-300 transition text-cyan-900 px-5 py-2 rounded-full text-sm font-semibold shadow-md"
        >
          💬 Help Me Grow
        </button>

        <div className="mt-5 text-lg">💖 Thanks for being here</div>
      </motion.div>
    </div>
  );
}
