---
layout: post
title: Stellar (XLM) Nedir? Sınır Tanımayan Finansal Köprü
date: 2023-10-11 19:55
by: faruk-guler
comments: true
categories: [Blockchain]
---

![Stellar (XLM) Logosu](https://farukguler.com/assets/post_images/stellar-lumens.JPG) Stellar (XLM), herkes için açık, hızlı, düşük maliyetli ve erişilebilir bir küresel finansal ağ oluşturmayı amaçlayan merkeziyetsiz bir Layer 1 (Katman 1) blockchain protokolüdür. **Lümen (XLM)**, bu ağın yerel (native) kripto para birimidir.

2014 yılında, Ripple'ın (XRP) da kurucu ortaklarından olan **Jed McCaleb** ve Joyce Kim tarafından kurulan Stellar, kâr amacı gütmeyen **Stellar Development Foundation (SDF)** tarafından yönetilmektedir.

Stellar'ın temel amacı, bankalar, ödeme sağlayıcıları ve bireyler arasında, farklı para birimlerini (hem itibari para hem de dijital varlık) saniyeler içinde ve neredeyse sıfır maliyetle transfer edebilen bir "köprü" altyapısı sunmaktır.

---

## Stellar'ın Amacı: Ripple'dan Neden Farklı?

Stellar'ın kurucusu Jed McCaleb'in Ripple'dan ayrılıp Stellar'ı kurması nedeniyle, iki proje sıkça karşılaştırılır. Her ikisi de sınır ötesi ödemelere odaklanmış olsa da, felsefeleri ve hedef kitleleri farklıdır:

* **Ripple (XRP):** Genellikle mevcut bankacılık sistemini optimize etmeye, bankalar arası büyük hacimli ödemelere (SWIFT sistemine rakip) ve kurumsal çözümlere odaklanır.
* **Stellar (XLM):** Daha çok "bankasızlara" (unbanked) ve son kullanıcılara (bireyler) odaklanır. Amacı, finansal sisteme erişimi olmayan milyarlarca insana hızlı ve ucuz havale (remittance) ve mikro ödeme imkanı sunmaktır.

Kısacası, Ripple'ı "B2B" (kurumdan kuruma) olarak düşünürseniz, Stellar daha çok "B2C" (kurumdan tüketiciye) veya "P2P" (kişiden kişiye) bir yaklaşım benimser.

---

## Stellar'ın Teknolojisi Nasıl Çalışır?

Stellar, Bitcoin'in Proof-of-Work (PoW) veya diğer ağların Proof-of-Stake (PoS) mekanizmalarını kullanmaz. Bu nedenle Stellar'da **madencilik veya staking ödülü yoktur.**

Bunun yerine, ağ **Stellar Consensus Protocol (SCP)** adı verilen benzersiz bir mutabakat algoritması kullanır.

### Stellar Consensus Protocol (SCP)

SCP, bir **Federated Byzantine Agreement (FBA)** modelidir. Bu sistem şöyle çalışır:

1.  Ağdaki her doğrulayıcı (validator) düğüm, güvendiği diğer düğümlerden oluşan bir "güven listesi" (Quorum Slice) belirler.
2.  Bir işlemin onaylanması için, bir düğümün kendi güvendiği düğümlerin çoğunluğundan onay alması gerekir.
3.  Bu "güven ağları" birbiriyle kesiştiğinde, tüm ağ üzerinde saniyeler içinde küresel bir fikir birliğine varılır.

Bu model, PoW gibi enerji yoğun değildir ve PoS gibi sermaye kilitlemesi gerektirmez. Sonuç olarak, işlemler **3-5 saniye** içinde kesinleşir ve maliyeti neredeyse sıfırdır (ortalama 0.00001 XLM).

---

## Stellar Ekosisteminin Kilit Bileşenleri

### 1. "Anchor" (Çapa) Sistemi

Stellar'ın en güçlü özelliği "Anchor" olarak bilinen aracı kurumlardır. Anchor'lar, geleneksel finans dünyası ile Stellar ağı arasında köprü kuran güvenilir varlıklardır (örn. bankalar, ödeme işlemcileri, fintek şirketleri).

**Görevi:** Bir Anchor, gerçek dünyadaki bir varlığı (örn. USD, EUR, BRL) alır, bunu Stellar ağı üzerinde 1:1 oranında dijital bir token (stablecoin) olarak ihraç eder.

**Örnek:** Siz bir Anchor'a 100 USD gönderirsiniz, o da sizin Stellar cüzdanınıza 100 "USD-Token" gönderir. Artık bu 100 USD-Token'ı saniyeler içinde ve sıfır maliyetle dünyanın herhangi bir yerindeki başka bir Stellar cüzdanına gönderebilirsiniz. Alıcı kişi de bu 100 USD-Token'ı kendi ülkesindeki bir Anchor'a vererek yerel para birimi olarak geri çekebilir.

### 2. Yerleşik Merkeziyetsiz Borsa (DEX)

Stellar protokolü, çekirdek koduna gömülü bir **merkeziyetsiz borsaya (DEX)** sahiptir. Bu, kullanıcıların Uniswap gibi harici bir akıllı sözleşmeye ihtiyaç duymadan, doğrudan protokol seviyesinde token takası yapabilmelerini sağlar.

Ağdaki tüm varlıklar (USD-Token, EUR-Token, XLM, BTC-Token vb.) bu DEX üzerinde birbirine karşı işlem görebilir.

---

## Lümen (XLM) Token'ı Ne İşe Yarar?

Ağın yerel varlığı olan Lümen (XLM), ekosistemde üç kritik role sahiptir:

1.  **İşlem Ücretleri ve Spam Koruması:**
    * Ağdaki her işlem, çok küçük bir XLM ücreti (0.00001 XLM) gerektirir. Bu ücret, ağa yönelik kötü niyetli spam (DDoS) saldırılarını ekonomik olarak anlamsız kılmak için vardır.
    * Her Stellar cüzdanının aktif hale gelmesi için minimum **1 XLM** bakiyesi bulundurması zorunludur. Bu da boş cüzdanlar oluşturularak ağın şişirilmesini engeller.

2.  **Köprü Para Birimi (Bridge Currency):**
    * XLM, ağın yerel DEX'inde bir "köprü varlık" görevi görür.
    * **Örnek:** Bir kullanıcı Meksika Pezosu (MXN) gönderip Nijerya Nairası (NGN) almak istiyorsa ancak bu iki varlık arasında doğrudan bir pazar (likidite) yoksa, Stellar otomatik olarak şu işlemi yapar: **MXN → XLM → NGN**.
    * XLM, likit olmayan varlıklar arasında anında takas yapılabilmesini sağlar.

3.  **Yönetişim (Dolaylı):** XLM, ağdaki yönetişim oylamalarında kullanılmaz çünkü protokol güncellemeleri Masternode'lar (doğrulayıcılar) tarafından oylanır.

### Tokenomi: Sabit Arz

Stellar ilk piyasaya sürüldüğünde 100 milyar XLM arzı vardı ve yıllık %1 enflasyon mekanizmasına sahipti.

Ancak 2019 yılında, Stellar Development Foundation (SDF) radikal bir kararla **55 milyar XLM'i yaktı (burn etti)** ve enflasyon mekanizmasını tamamen kaldırdı.

Mevcut toplam arz **50 milyar XLM** ile sınırlandırılmıştır ve bu arz sabittir. Bu, zamanla token üzerinde deflasyonist bir etki yaratabilir.

## Özetle:

Stellar, "bankasızları bankalaştırma" vizyonuyla yola çıkan, teknik olarak kanıtlanmış bir projedir. Gerçek dünya varlıklarını (stablecoin'ler, CBDC'ler - Dijital Merkez Bankası Paraları) tokenize etmek ve bunları saniyeler içinde küresel olarak transfer etmek için tasarlanmış en verimli altyapılardan birini sunar. Hızı, ultra düşük maliyetleri ve Anchor sistemi, onu özellikle havale (remittance) ve mikro ödemeler için güçlü bir oyuncu yapmaktadır.