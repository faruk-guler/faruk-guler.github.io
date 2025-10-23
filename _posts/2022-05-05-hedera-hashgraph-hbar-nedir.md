---
layout: post
title: Hedera (HBAR) Nedir? Blockchain'e Rakip Hashgraph Teknolojisi
date: 2022-05-05 11:18]
by: faruk-guler
comments: true
categories: [Blockchain]
---

![Hedera (HBAR) Logosu](https://farukguler.com/assets/post_images/hedera-hashgraph.jpg) Hedera (HBAR), geleneksel blockchain mimarisini kullanmayan, bunun yerine **"Hashgraph"** adı verilen patentli bir konsensüs (mutabakat) algoritması kullanan, kurumsal düzeyde bir halka açık dağıtık defter teknolojisidir (DLT).

Bitcoin veya Ethereum gibi "bloklardan" oluşan bir "zincir" (block-chain) yerine Hedera, "Gossip Protocol" (Dedikodu Protokolü) üzerine kurulu Yönlendirilmiş Asiklik Grafik (DAG) tabanlı bir yapı kullanır.

Bu benzersiz mimari, Hedera'nın saniyede 10.000'den fazla işlem (TPS) gerçekleştirmesini, 3-5 saniye içinde kesinliğe (finality) ulaşmasını ve işlem ücretlerini **$0.0001** gibi ultra düşük seviyelerde tutmasını sağlar. Hedera'nın temel amacı, hem merkeziyetsiz uygulamalar (dApp'ler) hem de büyük kurumsal sistemler için **"üçüncü nesil"** halka açık ağ olmaktır.

---

## Blockchain vs. Hashgraph: Temel Fark Nedir?

Hedera'yı anlamak için geleneksel blockchain'den farkını bilmek gerekir:

* **Blockchain:** Madenciler veya doğrulayıcılar, bir grup işlemi bir "bloka" koymak için yarışır. Genellikle sadece bir blok kazanır ve zincire eklenir. Diğerleri tarafından oluşturulan "yetim" bloklar atılır ve bu da enerji/zaman kaybına yol açar. Ağda "çatallanma" (fork) riski her zaman vardır.
* **Hashgraph (Hedera'nın Yöntemi):** Bu sistemde "blok" yoktur ve hiçbir işlem atılmaz. Bunun yerine şu süreç işler:
    1.  **Gossip about Gossip (Dedikodu hakkında dedikodu):** Ağdaki bir düğüm (node) yeni bir işlem öğrendiğinde, bu bilgiyi rastgele seçtiği birkaç başka düğüme "dedikodu" olarak aktarır.
    2.  Bu düğümler de aldıkları bilgiyi (kimden, ne zaman aldıkları bilgisiyle birlikte) kendi seçtikleri diğer düğümlere aktarır.
    3.  Bu süreç, tüm ağın yeni bilgiyi saniyeler içinde "üstel" bir hızla öğrenmesini sağlar.
    4.  **Sonuç:** Ağ, tüm işlemlerin sırasını ve zaman damgasını, bloklara ihtiyaç duymadan, matematiksel bir kesinlikle (aBFT - Asenkron Bizans Hata Toleransı) belirler. Çatallanma (fork) olasılığı yoktur ve hiçbir işlem boşa gitmez.

---

## Hedera'nın Kurumsal Yönetimi: Yönetim Konseyi

Hedera'nın merkeziyetsizlik yaklaşımı da teknik yapısı kadar benzersizdir. Ağ, tek bir kişi veya vakıf tarafından değil, **Hedera Yönetim Konseyi (Governing Council)** tarafından yönetilir.

Bu konsey, farklı endüstrilerden ve coğrafyalardan **39 adede kadar** dünya lideri kuruluştan oluşur.

* **Üyeler:** Google, IBM, Boeing, DLA Piper (küresel hukuk firması), ServiceNow, Dell, abrdn (varlık yöneticisi) ve Shinhan Bank (Güney Kore'nin en büyük bankalarından biri) gibi dev şirketler bu konseyin üyeleridir.
* **İşleyiş:** Her üyenin eşit oy hakkı vardır ve üyelikleri **süre sınırlıdır** (maksimum iki dönem). Bu, tek bir şirketin veya küçük bir grubun ağı ele geçirmesini engellemek için tasarlanmıştır. Algoritmanın mucidi olan **Swirlds** şirketi ise konseyin daimi bir üyesidir.
* **Görevi:** Bu konsey, ağın yazılım güncellemelerini onaylar, ağ ücretlerini belirler ve platformun stratejik yönü hakkında kararlar alır.

---

## Hedera'nın Temel Hizmetleri

Hedera, geliştiricilere üç ana hizmet sunar:

### 1. Hedera Token Service (HTS)

Bu, Hedera'nın en güçlü özelliklerinden biridir. HTS, geliştiricilerin Ethereum'daki gibi karmaşık ve pahalı bir "akıllı sözleşme" yazmasına gerek kalmadan, **doğrudan protokol seviyesinde (native)** token (hem fungible/ERC-20 benzeri hem de NFT) oluşturmasına olanak tanır.

* **Avantajı:** HTS ile oluşturulan token'lar, ağın yerel parası olan HBAR ile aynı hıza, güvenliğe ve ultra düşük işlem ücretlerine sahip olur. Ayrıca, protokol seviyesinde "KYC", "dondurma" (freeze) ve "silme" (wipe) gibi kurumsal uyumluluk özellikleri de içerir.

### 2. Hedera Consensus Service (HCS)

HCS, "konsensüsün kendisini bir hizmet olarak" sunar. Herhangi bir web2 veya web3 uygulamasının, kendi sistemindeki olaylar için Hedera ağından **güvenilir bir zaman damgası** ve **adil bir sıralama** almasını sağlar.

* **Kullanım Alanı:** Bir tedarik zinciri uygulaması, bir ürünün her hareketini HCS'ye bir mesaj olarak gönderebilir. HCS, bu mesajın değiştirilemez ve sıralı bir kaydını tutar. Bu, tam bir akıllı sözleşme çalıştırmaktan çok daha hızlı ve ucuz bir "dijital noter" hizmetidir.

### 3. Akıllı Sözleşmeler (Smart Contracts)

Hedera, Solidity dilinde yazılmış Ethereum akıllı sözleşmeleriyle (EVM) tam uyumludur. Geliştiriciler, Ethereum'daki dApp'lerini kolayca Hedera'ya taşıyabilir ve ağın yüksek hızından/düşük ücretlerinden faydalanabilirler.

---

## HBAR Token'ı Ne İşe Yarar?

**HBAR**, Hedera ağının yerel (native) kripto para birimidir ve iki temel işlevi vardır:

1.  **Ağ Yakıtı (Fuel):**
    * HTS ile token oluşturmak, HCS'ye mesaj göndermek, akıllı sözleşme çalıştırmak veya basit bir HBAR transferi yapmak gibi ağ üzerindeki **tüm hizmetlerin ve işlem ücretlerinin** ödenmesinde kullanılır. Maksimum arzı **50 Milyar HBAR** ile sınırlandırılmıştır.

2.  **Ağ Güvenliği (Proxy Staking):**
    * Hedera, ağı güvence altına almak için Proof-of-Stake (PoS) mekanizmasını kullanır. Ancak bu, "Proxy Staking" adı verilen farklı bir modeldir.
    * **Proxy Staking (Vekaleten Staking):** HBAR sahipleri, token'larını ağın güvenliğine katkıda bulunmak için bir doğrulayıcı düğüme (şu anda konsey üyeleri tarafından çalıştırılan) "vekâleten" atayabilirler.
    * **Kilit Fark:** Geleneksel staking'in aksine, proxy staking'de HBAR'lar **kilitlenmez**. Kullanıcı, token'larını cüzdanında tutmaya ve istediği an harcamaya devam eder, ancak bu token'lar aynı anda ağın güvenliğine (oy ağırlığına) katkı sağlar ve kullanıcıya pasif gelir (staking ödülü) kazandırır.
