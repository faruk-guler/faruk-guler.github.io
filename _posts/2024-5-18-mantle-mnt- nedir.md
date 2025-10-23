---
layout: post
title: Mantle (MNT) Nedir? Hazine Destekli Modüler L2
date: 2024-5-18 11:40
tag: [Blockchain, Layer 2]
by: faruk-guler
comments: true
categories: [Blockchain]
---

![Mantle Network Logosu](https://farukguler.com/assets/post_images/mantle-mnt-logo.jpeg) Mantle Network (MNT), Ethereum'un ölçeklenebilirliğini artırmak için tasarlanmış, yüksek performanslı bir Layer 2 (Katman 2) blockchain'idir. Bir **Optimistic Rollup** olan Mantle, Ethereum'un güvenliğinden ödün vermeden işlemleri çok daha hızlı ve çok daha düşük gas ücretleriyle gerçekleştirmeyi hedefler.

Mantle'ı diğer L2 çözümlerinden (Arbitrum, Optimism vb.) ayıran iki temel özelliği vardır:

1.  **Modüler Mimari:** Geleneksel blockchain'lerin aksine "modüler" bir yapı benimser.
2.  **Devasa Hazine:** Dünyanın en büyük merkeziyetsiz hazinelerinden birine sahip olan **BitDAO** projesinin bir evrimi olarak doğmuştur.

Bu proje, BitDAO'nun $BIT token'ının $MNT'ye dönüştürülmesi ve tüm devasa (milyarlarca dolarlık) hazinenin bu yeni L2 ağının büyümesi için kullanılması kararıyla başlamıştır. Kısacası Mantle, "hazine destekli" bir Layer 2 ekosistemidir.

---

## Mantle'ın Farkı: Modüler Blockchain Mimarisi

Geleneksel (monolitik) blockchain'ler (Ethereum L1 gibi) üç temel görevi tek bir katmanda yapmaya çalışır:

1.  **Execution (Yürütme):** İşlemleri gerçekleştirme.
2.  **Consensus (Konsensüs):** İşlemlerin sırasına karar verme.
3.  **Data Availability (Veri Kullanılabilirliği):** İşlem verilerini depolama ve herkesin erişimine sunma.

Bu üç görevin tek bir yerde yapılması, "blockchain trilemması" olarak bilinen ölçeklenebilirlik, güvenlik ve merkeziyetsizlik sorunlarına yol açar.

Mantle ise **modüler** bir yaklaşım benimser:

* **Yürütme Katmanı (Execution):** Mantle'ın L2 ağı (EVM uyumlu).
* **Veri Kullanılabilirliği (DA) Katmanı:** **Mantle DA** (EigenDA teknolojisiyle güçlendirilmiştir).
* **Mutabakat ve Çözümleme (Settlement):** Ethereum L1.

### Mantle DA: Düşük Ücretlerin Sırrı

Mantle'ı ultra düşük ücretli yapan kilit teknolojisi, kendi Veri Kullanılabilirliği (DA) katmanıdır.

Diğer Optimistic Rollup'lar (örn. Optimism), işlem verilerini (calldata) doğrudan Ethereum L1'e yazarlar. Bu, pahalı olan kısımdır.

Mantle ise, işlem verilerini Ethereum L1 yerine, **EigenLayer**'ın "restaking" teknolojisini kullanan **Mantle DA** adlı ayrı bir düğüm (node) ağına gönderir. Bu düğümler verilerin kullanılabilir olduğunu onaylar ve Ethereum'a sadece bu onayın bir kanıtını gönderir. Bu yaklaşım, işlem maliyetlerini Ethereum'a veri yazmaktan **çok daha ucuza** mal eder.

---

## MNT Tokenı: BitDAO'nun Dönüşümü

MNT, Mantle ekosisteminin merkezinde yer alan çok yönlü bir token'dır. Bu token, eski **BitDAO ($BIT)** token'ının 1:1 oranında dönüştürülmesiyle (MIP-22 teklifi) oluşturulmuştur.

### MNT Token'ın İşlevleri

1.  **Gas Ücreti:** Mantle L2 ağındaki tüm işlem ücretleri (gas fees) $MNT token'ı ile ödenir.
2.  **Yönetişim (Governance):** $MNT sahipleri, Mantle ekosisteminin yönetiminde söz sahibidir. Özellikle de devasa **Mantle Hazinesi**'nin nasıl kullanılacağına (hibeler, yatırımlar, ekosistem fonları vb.) $MNT sahipleri karar verir.
3.  **Staking (Mantle DA Düğümleri):** MNT token'ı, Mantle'ın modüler DA katmanını güvence altına almak için EigenLayer'ın restaking mekanizmasıyla birlikte kullanılabilir.

---

## Mantle Hazinesi: Ekosistemin Büyüme Motoru

Mantle'ın en büyük rekabet avantajı, BitDAO'dan miras aldığı **devasa hazinesidir**. Bu hazine, milyarlarca dolarlık çeşitli kripto varlıklardan (ETH, USDC, MNT ve diğerleri) oluşur.

Bu hazine, bir "ekosistem fonu" olarak kullanılır:

* **Geliştirici Hibeleri:** Mantle üzerinde dApp (merkeziyetsiz uygulama) geliştiren ekiplere finansal destek sağlanır.
* **Likidite Sağlama:** Ekosistemdeki DeFi protokollerine likidite sağlayarak yeni kullanıcıları çeker.
* **Stratejik Yatırımlar:** Mantle ekosistemine değer katacak projelere yatırım yapılır.

### Mantle LSP (Liquid Staking Protocol)

Hazinenin ilk ve en önemli ürünlerinden biri **Mantle LSP**'dir. Bu, Mantle'ın yerel likit staking protokolüdür.

Kullanıcılar ETH'lerini bu protokole kilitler ve karşılığında **$mETH** (Mantle Staked ETH) alırlar. $mETH, tıpkı Lido'nun $stETH'i gibi, faiz getiren bir varlıktır ve Mantle L2 ağındaki DeFi protokollerinde serbestçe kullanılabilir. Bu, ağa hem değer hem de likidite çekmek için tasarlanmış stratejik bir hamledir.

---

## Sonuç

Mantle, sadece bir başka Ethereum Layer 2 çözümü değildir. O, **modüler bir mimariyi** (EigenDA ile ucuz veri kullanılabilirliği) ve **devasa bir merkeziyetsiz hazineyi (BitDAO mirası)** birleştiren benzersiz bir projedir.

Bu güçlü finansal destek, Mantle'a diğer L2'lerin sahip olmadığı bir "savaş sandığı" sağlar. Başarısı, bu hazineyi ne kadar verimli kullanarak geliştiricileri ve kullanıcıları kendi ekosistemine çekebileceğine bağlı olacaktır.