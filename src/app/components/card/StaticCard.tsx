'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Card({ reopenPopup }: { reopenPopup: () => void }) {
  return (
    <div className="relative z-10 flex items-center justify-center min-h-[85vh] px-4">
      <motion.div
        key="healing-card"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative bg-cyan-950/80 backdrop-blur-sm border border-white/20 rounded-3xl p-8 max-w-xl w-full text-center text-white shadow-xl"
      >
        <h1 className="font-caveat text-4xl sm:text-5xl font-bold text-cyan-50">
          A place to grow
        </h1>

        <p className="mt-4 text-base sm:text-lg leading-relaxed text-white">
          This is my cozy little corner of the internet, where I learn, create, and share both{' '}
          <strong>crochet</strong> and <strong>code</strong>.
        </p>

        <p className="mt-3 text-sm text-cyan-50">
          I&apos;m building this with <strong>Next.js</strong>. Every yarn loop and every line of
          code is helping me feel stronger, calmer, and more myself.
        </p>

        <p className="mt-3 text-sm text-cyan-100 italic">
          I also share little reels, because making progress is worth celebrating.
        </p>

        <Link
          href="/about"
          className="inline-block mt-6 bg-white text-cyan-950 hover:bg-cyan-50 px-5 py-2 rounded-full text-sm font-semibold shadow-sm"
        >
          Read my journey
        </Link>

        <button
          onClick={reopenPopup}
          className="mt-3 ml-3 inline-block bg-rose-200 hover:bg-rose-300 text-cyan-950 px-5 py-2 rounded-full text-sm font-semibold shadow-sm"
        >
          Help me grow
        </button>

        <div className="mt-6 text-cyan-100">Thanks for being here</div>
      </motion.div>
    </div>
  );
}
