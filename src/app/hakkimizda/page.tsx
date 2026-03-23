import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkimizda",
  description: "Supplement Rehberi hakkinda bilgi.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Hakkimizda</h1>

      <div className="prose">
        <p>
          Supplement Rehberi, supplement dunyasinda tarafsiz ve bilimsel verilere dayali
          icerikler ureten bagimsiz bir platformdur. Amacimiz, tuketicilerin dogru supplement
          secimi yapmasina yardimci olmaktir.
        </p>

        <h2>Misyonumuz</h2>
        <p>
          Supplement pazarinda cok fazla yaniltici bilgi ve abartili pazarlama bulunmaktadir.
          Biz, bilimsel arastirmalari baz alarak tarafsiz incelemeler ve rehberler sunuyoruz.
        </p>

        <h2>Nasil Calisiyoruz?</h2>
        <ul>
          <li>Her urunu detayli olarak inceliyoruz</li>
          <li>Bilimsel calismalara referans veriyoruz</li>
          <li>Tarafsiz puanlama sistemi kullaniyoruz</li>
          <li>Okuyucu geri bildirimlerini dikkate aliyoruz</li>
        </ul>

        <h2>Affiliate Aciklama</h2>
        <p>
          Bu sitedeki bazi linkler affiliate linklerdir. Bu linkler uzerinden alisveris
          yaptiginizda bize komisyon kazandirabilir. Bu durum sizin odediginiz fiyati
          etkilemez. Tum incelemelerimiz tarafsiz ve bagimsizdir. Affiliate geliri,
          sitemizin isletme masraflarini karsilamak icin kullanilmaktadir.
        </p>
      </div>
    </div>
  );
}
