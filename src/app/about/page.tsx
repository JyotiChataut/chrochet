import { Metadata } from 'next';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'About',
};

const projects = [
  { name: 'Coaster', src: '/assets/coaster.jpeg' },
  { name: 'Headband', src: '/assets/headband.jpeg' },
  { name: 'Muffler', src: '/assets/mufler.jpeg' },
  { name: 'Pouch', src: '/assets/pouch.jpeg' },
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow px-6 py-16 flex flex-col items-center text-center bg-gradient-to-br from-cyan-100 via-white to-cyan-50 text-cyan-900">
        <div className="max-w-2xl mb-12">
          <h1 className="font-caveat text-5xl font-bold text-cyan-950 mb-6">About this project</h1>

          <p className="text-lg leading-relaxed mb-4">
            Hello! I&apos;m just starting out on a journey to learn <strong>crocheting</strong> and{' '}
            <strong>coding</strong>, both at the same time.
          </p>

          <p className="text-lg leading-relaxed mb-4">
            This website is my little handmade experiment. I&apos;m using it to practice{' '}
            <strong>Next.js</strong> while exploring the cozy world of yarn, loops, and hooks.
          </p>

          <p className="text-lg leading-relaxed mb-4">
            I don&apos;t have a specific plan for this site yet. It&apos;s all part of the fun. As I
            learn new things about crocheting and coding, I&apos;ll keep adding, breaking, and
            improving parts of this project.
          </p>

          <p className="text-base italic text-cyan-700 mt-8">
            Thanks for stopping by, and happy stitching and coding!
          </p>
        </div>

        <div className="w-full max-w-4xl">
          <h2 className="font-caveat text-4xl font-bold text-cyan-950 mb-6">
            Some of my crochet projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-2">
            {projects.map((project, i) => (
              <figure
                key={project.name}
                className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition ${
                  i === 0 ? 'sm:col-span-2' : ''
                }`}
              >
                <Image
                  src={project.src}
                  alt={project.name}
                  width={600}
                  height={400}
                  className={`w-full object-cover ${i === 0 ? 'h-72 sm:h-80' : 'h-64'}`}
                />
                <figcaption className="p-4 text-cyan-800 font-medium">{project.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
