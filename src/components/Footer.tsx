import Link from "next/link";
import { categories, footerPages } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-baseline gap-1.5 mb-4">
              <span className="text-lg font-bold tracking-tight text-emerald-600">Supplement</span>
              <span className="text-lg font-light tracking-tight text-zinc-900">Guide</span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-sm">
              Unbiased, science-based supplement reviews, comparisons, and guides.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">Categories</h3>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/kategori/${cat.slug}`} className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">Pages</h3>
            <ul className="space-y-2.5">
              {footerPages.map((page) => (
                <li key={page.name}>
                  <Link href={page.href} className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
                    {page.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-100">
          <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl">
            <span className="font-medium text-zinc-500">Affiliate Disclosure:</span> Some links on this site are affiliate links.
            When you purchase through these links, we may earn a commission at no extra cost to you.
            All reviews are unbiased and independent.
          </p>
          <p className="mt-4 text-xs text-zinc-300">
            &copy; {new Date().getFullYear()} Supplement Guide
          </p>
        </div>
      </div>
    </footer>
  );
}
