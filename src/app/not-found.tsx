import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h1 className="text-6xl font-bold text-zinc-900 mb-4">404</h1>
      <p className="text-zinc-500 mb-8 text-center max-w-md">
        This page doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="bg-zinc-900 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-zinc-800 active:scale-[0.98] transition-all"
        >
          Go Home
        </Link>
        <Link
          href="/blog"
          className="border border-zinc-200 text-zinc-700 px-6 py-3 rounded-xl text-sm font-medium hover:bg-zinc-50 transition-all"
        >
          Browse Blog
        </Link>
      </div>
    </div>
  );
}
