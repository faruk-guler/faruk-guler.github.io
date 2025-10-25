---
layout: post
title: Kaspa (KAS) Nedir? Blockchain Trilemmasını Çözen BlockDAG
date: 2024-3-22 18:50
by: faruk-guler
comments: true
categories: [Blockchain]
---

![Kaspa (KAS) Logosu](https://farukguler.com/assets/post_images/kaspa-new.jpeg) Kaspa (KAS), blockchain teknolojisinin en temel sorunu olan **"Trilemma"yı** (Güvenlik, Ölçeklenebilirlik ve Merkeziyetsizlik arasında bir denge kurma zorunluluğu) çözmek için tasarlanmış, devrim niteliğinde bir Layer-1 (Katman-1) projesidir.

Geleneksel blockchain'lerin (Bitcoin gibi) aksine Kaspa, bir "zincir" (blockchain) yapısı değil, **"BlockDAG"** (Yönlendirilmiş Asiklik Grafik) adı verilen bir yapı kullanır. Bu yapı, onu şu anda var olan en hızlı ve en ölçeklenebilir Proof-of-Work (PoW) projesi yapmaktadır.

Basitçe söylemek gerekirse, Kaspa, Bitcoin'in güvenliğini ve "adil başlangıç" (fair launch) felsefesini alıp, bunu saniyede binlerce işlemi (TPS) kaldırabilecek bir hızla birleştirmeyi hedefler. **KAS**, bu ağdaki tüm işlem ücretleri için ve madencileri ödüllendirmek için kullanılan yerel (native) kripto para birimidir.

---

## "Blockchain Trilemması" ve Kaspa'nın Yaklaşımı

Blockchain'lerin çözemediği ünlü bir sorun vardır:
1.  **Güvenlik (Security):** Bitcoin'in PoW ile sağladığı gibi.
2.  **Merkeziyetsizlik (Decentralization):** Herkesin ağa katılabilmesi.
3.  **Ölçeklenebilirlik (Scalability):** Saniyede binlerce işlem yapabilme kapasitesi.

Geleneksel blockchain'lerde bu üçünden *sadece ikisini* seçebilirsiniz. Bitcoin güvenli ve merkeziyetsizdir ama yavaştır (yaklaşık 7 TPS). Solana ölçeklenebilir ve (göreceli) güvenlidir ancak merkeziyetsizliği tartışmalıdır.

**Kaspa'nın Çözümü:** Kaspa, bu üçünü bir arada sunabilmek için blockchain'in doğrusal yapısını terk eder.

---

## Kaspa'nın Teknolojisi: BlockDAG ve GHOSTDAG Protokolü

Kaspa'nın sırrı, paralel işlemleri nasıl ele aldığındadır.

### 1. Blockchain vs. BlockDAG
* **Blockchain (Bitcoin):** Ağda aynı anda iki geçerli blok bulunursa (iki madenci aynı anda blok bulursa), ağ birini seçmek zorundadır. Diğer blok "yetim" (orphan) kalır ve boşa gider. Bu, hızı sınırlar.
* **BlockDAG (Kaspa):** Kaspa, paralel olarak oluşturulan **tüm blokların** ağa dahil edilmesine izin verir. Hiçbir blok "yetim" kalmaz. Bir zincir yerine, birbirine bağlanan bloklardan oluşan bir "grafik" (ağaç benzeri bir yapı) düşünün.

### 2. GHOSTDAG Protokolü
Peki, paralel bloklar varsa "ana zinciri" kim belirliyor?

İşte burada Kaspa'nın kurucusu **Yonatan Sompolinsky**'nin (Ethereum whitepaper'ında da atıfta bulunulan GHOST protokolünün ortak yazarı) geliştirdiği **GHOSTDAG** protokolü devreye girer.

GHOSTDAG, bir oylama sistemi gibi çalışır:
1.  Ağdaki tüm paralel bloklara bakar.
2.  En çok "dürüst" bloğun onayını alan (en "ağır" olan) bloğu ana zincir olarak belirler.
3.  Diğer paralel blokları (Bitcoin'in aksine) çöpe atmaz. Onları da "yan zincir" olarak kabul eder ve ağın güvenliğine katkıda bulunmalarını sağlar.

Bu sistem, Kaspa'ya iki devasa avantaj sağlar:
* **İnanılmaz Blok Hızı:** Kaspa şu anda saniyede **bir blok (BPS)** hızında çalışmaktadır (Bitcoin 10 dakikada bir). Hedefi ise saniyede 10, hatta 100 bloğa ulaşmaktır.
* **Anında İşlem Onayı:** Yüksek blok hızı sayesinde, işlemler saniyeler içinde onaylanır (ortalama 10 saniyede) ve hızla geri döndürülemez hale gelir.

---

## Kaspa'nın (KAS) Ayırt Edici Özellikleri

Kaspa'yı diğer projelerden ayıran temel felsefesi:

1.  **%100 "Adil Başlangıç" (Fair Launch):**
    * **Ön Madencilik (Pre-mine) Yok:** Ekip, lansman öncesi kendilerine KAS ayırmadı.
    * **Ön Satış (ICO/IEO) Yok:** Hiçbir yatırımcıya özel satış yapılmadı.
    * **Ekip Tahsisi (Team Allocation) Yok:** Ağa giren her bir KAS, *sadece madencilik* yoluyla çıkarılmak zorundadır. Bu, Kaspa'yı Bitcoin'den bile daha "adil" bir lansmana sahip yapar (Satoshi'nin 1 milyon BTC'lik ön madenciliği hesaba katılırsa).

2.  **Proof-of-Work (PoW) Güvenliği:**
    * Kaspa, en güvenli ve kanıtlanmış konsensüs mekanizması olan PoW'u kullanır.
    * **kHeavyHash** adı verilen, enerji verimliliğine odaklanan ve gelecekte optik madencilik (fotonik) gibi teknolojilere uyum sağlayabilecek bir madencilik algoritması kullanır.

3.  **Akıllı Sözleşme Felsefesi (Modülerlik):**
    * Kaspa'nın **Temel Katmanında (L1)** akıllı sözleşmeler **bulunmaz.**
    * Bu, L1'in hızını ve güvenliğini korumak için alınmış *bilinçli* bir karardır. Ağ, sadece işlemleri onaylamaya odaklanır.
    * Akıllı sözleşme işlevselliği (DeFi, dApps vb.), gelecekte Kaspa L1'in üzerine inşa edilecek **Katman 2 (Layer 2 - Rollup'lar)** çözümleri aracılığıyla gelecektir.

---

## KAS Tokenomiği: "Kromatik Faz"

**KAS**, Kaspa ağının ekonomik motorudur. Tüm işlem ücretleri KAS ile ödenir ve madenciler KAS ile ödüllendirilir.

* **Maksimum Arz:** ~28.7 Milyar KAS
* **Emisyon Programı:** Kaspa, Bitcoin'in her 4 yılda bir aniden arzı yarıya indiren "halving" modelini kullanmaz.
* Bunun yerine **"Kromatik Faz"** adı verilen bir program kullanır: Blok ödülleri her ay, yumuşak bir eğriyle, geometrik olarak azalır. Bu, Bitcoin'in sert "arz şokları" yerine daha öngörülebilir ve pürüzsüz bir enflasyon (ve sonra deflasyon) modeli yaratır.

Tüm KAS arzının madenciliğinin 2037 yılı civarında tamamlanması beklenmektedir.

---

## Sonuç

Kaspa (KAS), bir "Ethereum katili" olmaya çalışmaz. O, "daha iyi bir Bitcoin" olmaya, yani "dijital gümüş" veya "hızlı dijital nakit" rolünü üstlenmeye çalışır.

BlockDAG yapısı sayesinde, Proof-of-Work'un "yavaş ve ölçeklenemez" olduğu yönündeki eski tezi çürütmektedir. %100 adil lansmanı, güçlü akademik temeli (Yonatan Sompolinsky) ve Trilemma'ya getirdiği radikal çözüm ile Kaspa, kripto para dünyasındaki en temel ve en yenilikçi Layer-1 projelerinden biri olarak kabul edilmektedir.