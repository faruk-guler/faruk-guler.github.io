---
layout: post
title: THORChain (RUNE) Nedir? Zincirler Arası Gerçek Takas
date: 2022-09-04 14:36
by: faruk-guler
comments: true
categories: [Blockchain]
---

![THORChain (RUNE) Logosu](https://farukguler.com/assets/post_images/thorchain.png) THORChain (RUNE), farklı blockchain ağlarının (Bitcoin, Ethereum, BNB Chain, vb.) yerel varlıklarını (native assets) **doğrudan takas etmenize** olanak tanıyan merkeziyetsiz bir cross-chain (zincirler arası) likidite protokolüdür.

Basitçe söylemek gerekirse, THORChain, **gerçek, yerel BTC'nizi** alıp, bunu **gerçek, yerel ETH'ye** dönüştürmenizi sağlar; bunu merkezi bir borsaya (CEX) veya bir köprüye (bridge) ihtiyaç duymadan, tamamen merkeziyetsiz bir şekilde yapar.

THORChain, kendisi **Cosmos SDK** üzerine kurulu bir Layer 1 blockchain'dir ve tüm bu zincirler arası takas sisteminin merkezinde yerel token'ı **RUNE** bulunur.

---

## THORChain'in Çözdüğü Problem: Köprüler ve "Sarılmış" Varlıklar

Geleneksel olarak, farklı iki blockchain'deki varlıkları takas etmenin iki yolu vardı:

1.  **Merkezi Borsa (CEX):** BTC'nizi bir borsaya yatırır, ETH'ye karşı satar ve ETH'nizi kendi cüzdanınıza çekersiniz. Bu, *merkezi*, *izne tabi* ve *velayet (custody)* gerektiren bir çözümdür.
2.  **Köprüler (Bridges) ve Sarılmış (Wrapped) Varlıklar:** BTC'nizi bir köprüye "kilitler" ve karşılığında Ethereum ağında "Wrapped BTC" (WBTC) alırsınız. Daha sonra bu WBTC'yi Uniswap gibi bir DEX'te ETH ile takas edersiniz.
    * **Sorun:** Bu yöntem, köprünün güvenliğine bağımlıdır (köprüler hack'lenebilir) ve elinizdeki varlık "gerçek" BTC değil, sadece bir borç senedidir.

THORChain, bu iki sorunu da ortadan kaldırır. **Sarmaya (wrapping) veya köprülemeye (bridging) gerek kalmadan**, varlıkların yerel halleriyle takas edilmesini sağlar.

---

## THORChain Nasıl Çalışır? Çekirdek Teknoloji

THORChain'in "sihri", üç temel bileşenin bir araya gelmesiyle çalışır:

### 1. RUNE: Evrensel Köprü Varlığı

THORChain'de bir "BTC/ETH" havuzu **bulunmaz**. Bunun yerine, her varlık **RUNE** ile eşleştirilir.

* Bir `BTC / RUNE` havuzu vardır.
* Bir `ETH / RUNE` havuzu vardır.
* Bir `BNB / RUNE` havuzu vardır.

Bir kullanıcı **BTC'den ETH'ye** takas yapmak istediğinde, THORChain arka planda iki işlem yapar:

1.  Kullanıcının BTC'sini alır ve `BTC / RUNE` havuzunda RUNE'a çevirir.
2.  Elde ettiği RUNE'u anında `ETH / RUNE` havuzunda ETH'ye çevirir ve yerel ETH'yi kullanıcıya gönderir.

RUNE, ağdaki tüm havuzlar arasında likiditeyi birbirine bağlayan "evrensel köprü varlığı" veya "yerleşim varlığı" (settlement asset) olarak görev yapar.

### 2. Eşik İmza Şemaları (TSS) - Threshold Signature Schemes

"THORChain, akıllı sözleşmesi olmayan Bitcoin'i nasıl yönetiyor?" sorusunun cevabı TSS'dir.

THORChain'in ağı, **THORNode** adı verilen düzinelerce düğüm (node) tarafından güvence altına alınır. Bu düğümler, ağdaki tüm likidite havuzlarının (Bitcoin, Ethereum, vb.) cüzdanlarını **kolektif olarak** kontrol eder.

* **TSS:** Bir varlığın (örn. BTC) havuzdan çıkması için, tek bir düğümün imzası yeterli değildir. Düğümlerin (Node'ların) üçte ikisi gibi büyük bir çoğunluğunun, işlemi kriptografik olarak (TSS) imzalaması gerekir.
* Bu, fonların tek bir varlığın kontrolünde olmamasını (non-custodial) ve çalınmasının aşırı derecede zor olmasını sağlar.

### 3. Sürekli Likidite Havuzları (CLP)

THORChain, takasları kolaylaştırmak için Uniswap benzeri bir Otomatik Piyasa Yapıcı (AMM) modeli kullanır. Likidite sağlayıcılar (LP'ler), havuza 50% varlık ve 50% RUNE (örn. 1000$ değerinde BTC ve 1000$ değerinde RUNE) yatırırlar. Karşılığında, takas ücretlerinden pay alırlar.

---

## RUNE Token'ının Ekonomik Modeli

RUNE, sadece bir "gas" token'ı değildir; THORChain'in **güvenlik ve ekonomik modelinin** tam merkezindedir.

1.  **Likidite Eşleşmesi (Zorunlu):**
    * Ağdaki her likidite havuzunun %50'si RUNE olmak zorundadır. Ağa 1 Milyar Dolarlık BTC, ETH, BNB likiditesi eklenirse, bu varlıkları eşleştirmek için **1 Milyar Dolarlık RUNE**'un da havuzlara kilitlenmesi gerekir. Bu, RUNE için güçlü bir ekonomik talep yaratır.

2.  **Ekonomik Güvenlik (Node Bağı - Bonding):**
    * Ağı çalıştıran THORNode'ların, **RUNE token'larını "bağlaması" (bond)** zorunludur.
    * **Teşvik Pendulumu (Incentive Pendulum):** Ağın güvenli kalması için, düğümlerin bağladığı (bonded) RUNE miktarının, havuzlardaki (pooled) RUNE miktarından daha fazla (ideal olarak 2 katı) olması gerekir.
    * **Güvenlik Garantisi:** Ağa kilitlenen toplam RUNE miktarı, havuzlardaki dış varlıkların (BTC, ETH vb.) değerinden her zaman daha fazladır. Düğümler (Node'lar) varlıkları çalmaya çalışırsa, kendi bağladıkları ve değer olarak daha fazla olan RUNE'larını kaybederler (slashing). Bu, **hırsızlığı ekonomik olarak kârsız hale getirir.**

3.  **Ağ Ücretleri (Gas):**
    * THORChain üzerindeki tüm takas işlemlerinde (swap fee) ve iç ağ işlemlerinde (gas) ücretler RUNE olarak ödenir.

4.  **Yönetişim:**
    * RUNE sahipleri, ağın geleceği, yeni eklenecek zincirler veya ücret değişiklikleri gibi konularda oy kullanabilir.

---

## Önemli Özellik: Impermanent Loss (Geçici Kayıp) Koruması

THORChain, likidite sağlayıcıları (LP) için en büyük risk olan "geçici kaybı" (Impermanent Loss) azaltmak için bir koruma mekanizması sunar. Bir LP, likiditesini havuzda yeterince uzun (örn. 100 gün) tutarsa, THORChain protokolü, LP'nin sadece varlıklarını tutsaydı elde edeceği değere kıyasla herhangi bir kayıp yaşamamasını garanti eder.
