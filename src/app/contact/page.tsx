import { Metadata } from 'next';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Contact',
};

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex items-center justify-center px-6 py-16 bg-cyan-50">
        <div className="max-w-md text-center">
          <h1 className="font-caveat text-5xl font-bold text-cyan-950 mb-3">Say hello</h1>
          <p className="text-cyan-800 leading-relaxed">
            A dedicated contact form is on its way. Until then, the quickest way to reach me is the
            feedback card on the home page.
          </p>
          <Link
            href="/"
            className="inline-block mt-6 px-5 py-2 rounded-full bg-cyan-700 text-white hover:bg-cyan-800 active:bg-cyan-900 font-medium shadow-sm"
          >
            Leave a note
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
