'use client';

import { useEffect, useState } from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import StaticCard from './components/card/StaticCard';
import PopupCard from './components/card/PopupCard';

const images = [
  "/assets/coaster.jpeg",
  "/assets/headband.jpeg",
  "/assets/mufler.jpeg",
  "/assets/pouch.jpeg"
];

const videos = [
  { name: 'Reel 1', src: '/assets/reel1.mp4' },
  { name: 'Reel 2', src: '/assets/reel2.mp4' },
  { name: 'Reel 3', src: '/assets/reel3.mp4' },
];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [popupVisible, setPopupVisible] = useState(false); // ✅ popup state

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main
        className="flex-grow relative bg-center bg-cover bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url('${images[currentImageIndex]}')` }}
      >
        {/* Cyan overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-800/50 via-cyan-600/40 to-cyan-400/30 backdrop-blur-[1px] mix-blend-multiply z-0 pointer-events-none" />

        {/* Main content */}
        <div className="relative z-10">
          {/* ✅ Pass function to reopen the popup */}
          <StaticCard reopenPopup={() => setPopupVisible(true)} />
          <PopupCard visible={popupVisible} setVisible={setPopupVisible} />

          {/* Videos section */}
          <section className="mt-12 px-6">
            <h2 className="text-2xl font-bold text-white text-center mb-6">🎥 Crochet Reels</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <div key={video.name} className="rounded-lg overflow-hidden shadow-lg bg-white/10 backdrop-blur p-2">
                  <video
                    controls
                    className="w-full h-64 object-cover rounded-md"
                    src={video.src}
                  >
                    Your browser does not support the video tag.
                  </video>
                  <p className="mt-2 text-center text-white font-medium">{video.name}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
