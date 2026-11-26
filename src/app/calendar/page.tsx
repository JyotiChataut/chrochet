import { Metadata } from 'next';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Calendar',
};

export default function Calendar() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex items-center justify-center px-6 py-16 bg-cyan-50">
        <div className="max-w-md text-center">
          <h1 className="font-caveat text-5xl font-bold text-cyan-950 mb-3">Calendar</h1>
          <p className="text-cyan-800 leading-relaxed">
            Workshops, markets, and meetups will show up here. Nothing scheduled yet.
          </p>
          <Link
            href="/"
            className="inline-block mt-6 text-cyan-700 underline underline-offset-4 hover:text-cyan-900 font-medium"
          >
            Back to home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
