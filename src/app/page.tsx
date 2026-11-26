'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Header from './components/Header';
import Footer from './components/Footer';
import StaticCard from './components/card/StaticCard';
import PopupCard from './components/card/PopupCard';

const images = [
  '/assets/coaster.jpeg',
  '/assets/headband.jpeg',
  '/assets/mufler.jpeg',
  '/assets/pouch.jpeg',
];

const videos = [
  { name: 'Reel 1', src: '/assets/reel1.mp4' },
  { name: 'Reel 2', src: '/assets/reel2.mp4' },
  { name: 'Reel 3', src: '/assets/reel3.mp4' },
];

function PauseIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) setPlaying(false);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setCurrent((p) => (p + 1) % images.length), 6000);
    return () => clearInterval(id);
  }, [playing]);

  const togglePlay = useCallback(() => setPlaying((p) => !p), []);

  return (
    <div className="min-h-screen flex flex-col bg-cyan-950">
      <Header />

      <main className="flex-grow">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0" aria-hidden="true">
            {images.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className={`object-cover transition-opacity duration-1000 ease-in-out ${
                  i === current ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>

          <StaticCard reopenPopup={() => setPopupVisible(true)} />
          <PopupCard visible={popupVisible} setVisible={setPopupVisible} />

          <button
            onClick={togglePlay}
            aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
            className="absolute bottom-6 right-6 z-20 flex items-center justify-center w-11 h-11 rounded-full bg-cyan-950/60 text-white border border-white/20 backdrop-blur-sm hover:bg-cyan-950/80"
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
        </section>

        {/* Reels */}
        <section className="px-6 py-16">
          <h2 className="font-caveat text-4xl font-bold text-cyan-50 text-center mb-8">
            Crochet reels
          </h2>
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <figure
                key={video.src}
                className="rounded-xl overflow-hidden bg-cyan-900/70 shadow-lg"
              >
                <video
                  controls
                  preload="none"
                  className="w-full aspect-video object-cover bg-cyan-950"
                  src={video.src}
                  aria-label={video.name}
                >
                  Your browser does not support the video tag.
                </video>
                <figcaption className="px-3 py-2 text-center text-cyan-50 font-medium">
                  {video.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
