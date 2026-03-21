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

const links = [
  { name: "Hakkimizda", href: "/hakkimizda" },
  { name: "Blog", href: "/blog" },
  { name: "Urun Incelemeleri", href: "/urun-inceleme" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold text-green-400">Supplement</span>
              <span className="text-xl font-light text-white">Rehberi</span>
            </Link>
            <p className="text-sm text-gray-400 leading-6">
              Supplement dunyasi hakkinda tarafsiz incelemeler, karsilastirmalar ve rehber icerikler.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Kategoriler</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <Link href={cat.href} className="text-sm text-gray-400 hover:text-green-400 transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Sayfalar</h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-green-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Affiliate Disclosure */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-xs text-gray-500 leading-5">
            <strong>Affiliate Aciklama:</strong> Bu sitedeki bazi linkler affiliate linklerdir.
            Bu linkler uzerinden alisveris yaptiginizda bize komisyon kazandirabilir.
            Bu durum sizin odediginiz fiyati etkilemez. Tum incelemelerimiz tarafsiz ve
            bagimsizdir.
          </p>
        </div>

        <div className="mt-4 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Supplement Rehberi. Tum haklari saklidir.
        </div>
      </div>
    </footer>
  );
}
