import Link from "next/link";
import { footerPages } from "@/lib/config";
import { getAllCategories } from "@/lib/notion-queries";

export default async function Footer() {
  const categories = await getAllCategories().catch(() => []);
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
              Independent, science-based supplement research. Every claim backed by peer-reviewed evidence.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">Topics</h3>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`} className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
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
            All content is independently researched. We cite primary sources from PubMed,
            peer-reviewed journals, and systematic reviews. No affiliate relationships influence our evaluations.
          </p>
          <p className="mt-4 text-xs text-zinc-300">
            &copy; {new Date().getFullYear()} Supplement Guide
          </p>
        </div>
      </div>
    </footer>
  );
}
