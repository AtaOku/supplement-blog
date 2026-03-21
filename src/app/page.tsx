import Link from "next/link";
import { getAllPosts, getAllReviews } from "@/lib/mdx";
import PostCard from "@/components/PostCard";
import ProductCard from "@/components/ProductCard";
import NewsletterForm from "@/components/NewsletterForm";

const categories = [
  { name: "Mitokondri", slug: "mitokondri", icon: "🔋", description: "CoQ10, NAD+, PQQ, taurin" },
  { name: "Longevity", slug: "longevity", icon: "⏳", description: "NMN, resveratrol, anti-aging" },
  { name: "Protein", slug: "protein", icon: "💪", description: "Whey, casein, vegan protein" },
  { name: "Kreatin", slug: "kreatin", icon: "⚡", description: "Performans ve guc artisi" },
  { name: "Vitamin", slug: "vitamin", icon: "🌟", description: "D3, B12, multivitamin" },
  { name: "Pre-Workout", slug: "pre-workout", icon: "🔥", description: "Antrenman oncesi takviye" },
  { name: "Amino Asit", slug: "amino-asit", icon: "🧬", description: "BCAA, EAA, glutamin" },
  { name: "Saglik", slug: "saglik", icon: "🛡️", description: "Omega-3, probiyotik, mineral" },
];

export default function Home() {
  const posts = getAllPosts().slice(0, 3);
  const reviews = getAllReviews().slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Dogru Supplement Secimi Icin{" "}
              <span className="text-green-600">Tarafsiz Rehber</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
              Bilimsel verilere dayali supplement incelemeleri, karsilastirmalar ve
              rehberler. Paranizin karsiligini en iyi sekilde alin.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/blog"
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Blog Yazilari
              </Link>
              <Link
                href="/urun-inceleme"
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Urun Incelemeleri
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Kategoriler</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/kategori/${cat.slug}`}
                className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:shadow-md hover:border-green-300 transition-all"
              >
                <span className="text-3xl">{cat.icon}</span>
                <h3 className="mt-2 font-semibold text-gray-900">{cat.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Reviews */}
      {reviews.length > 0 && (
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Son Urun Incelemeleri</h2>
              <Link href="/urun-inceleme" className="text-green-600 font-medium hover:text-green-700">
                Tumunu Gor &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <ProductCard key={review.slug} review={review} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Posts */}
      {posts.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Son Blog Yazilari</h2>
              <Link href="/blog" className="text-green-600 font-medium hover:text-green-700">
                Tumunu Gor &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
