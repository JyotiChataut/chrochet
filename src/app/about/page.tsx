import { Metadata } from 'next';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer'; // Make sure this path is correct

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
          <h1 className="text-4xl font-bold mb-6">🧶 About This Project</h1>

          <p className="text-lg leading-relaxed mb-4">
            Hello! I’m just starting out on a journey to learn <strong>crocheting</strong> and <strong>coding</strong> — both at the same time!
          </p>

          <p className="text-lg leading-relaxed mb-4">
            This website is my little handmade experiment. I’m using it to practice <strong>Next.js</strong> while exploring the cozy world of yarn, loops, and hooks.
          </p>

          <p className="text-lg leading-relaxed mb-4">
            I don’t have a specific plan for this site yet — it’s all part of the fun! As I learn new things about crocheting and coding,
            I’ll keep adding, breaking, and improving parts of this project.
          </p>

          <p className="text-base italic text-cyan-700 mt-8">
            Thanks for stopping by — and happy stitching & coding!
          </p>
        </div>

        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-semibold mb-6">🧵 Some of My Crochet Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-2">
            {projects.map((project) => (
              <div key={project.name} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                <Image
                  src={project.src}
                  alt={project.name}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 text-cyan-800 font-medium">{project.name}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
