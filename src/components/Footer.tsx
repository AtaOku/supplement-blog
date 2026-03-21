import Link from "next/link";

const categories = [
  { name: "Mitokondri", href: "/kategori/mitokondri" },
  { name: "Longevity", href: "/kategori/longevity" },
  { name: "Protein", href: "/kategori/protein" },
  { name: "Kreatin", href: "/kategori/kreatin" },
  { name: "Vitamin", href: "/kategori/vitamin" },
  { name: "Pre-Workout", href: "/kategori/pre-workout" },
  { name: "Amino Asit", href: "/kategori/amino-asit" },
];

const pages = [
  { name: "Blog", href: "/blog" },
  { name: "Urun Incelemeleri", href: "/urun-inceleme" },
  { name: "Hakkimizda", href: "/hakkimizda" },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-baseline gap-1.5 mb-4">
              <span className="text-lg font-bold tracking-tight text-emerald-600">Supplement</span>
              <span className="text-lg font-light tracking-tight text-zinc-900">Rehberi</span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-sm">
              Bilimsel verilere dayali tarafsiz supplement incelemeleri, karsilastirmalar ve rehber icerikler.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">Kategoriler</h3>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <Link href={cat.href} className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">Sayfalar</h3>
            <ul className="space-y-2.5">
              {pages.map((page) => (
                <li key={page.name}>
                  <Link href={page.href} className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
                    {page.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Affiliate Disclosure */}
        <div className="mt-16 pt-8 border-t border-zinc-100">
          <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl">
            <span className="font-medium text-zinc-500">Affiliate Aciklama:</span> Bu sitedeki bazi linkler affiliate linklerdir.
            Bu linkler uzerinden alisveris yaptiginizda bize komisyon kazandirabilir.
            Tum incelemelerimiz tarafsiz ve bagimsizdir.
          </p>
          <p className="mt-4 text-xs text-zinc-300">
            &copy; {new Date().getFullYear()} Supplement Rehberi
          </p>
        </div>
      </div>
    </footer>
  );
}
