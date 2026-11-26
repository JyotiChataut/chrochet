export default function Footer() {
  return (
    <footer className="bg-cyan-950 text-cyan-100">
      <div className="max-w-screen-xl mx-auto px-4 py-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-caveat text-xl text-cyan-50">Jyoti Loops · loop happiness</p>
        <p className="text-sm text-cyan-300">© {new Date().getFullYear()} Jyoti Loops</p>
      </div>
    </footer>
  );
}
