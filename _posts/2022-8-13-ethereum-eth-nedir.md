---
layout: post
title: Ethereum (ETH) Nedir? Akıllı Sözleşmeler ve Merkeziyetsiz Gelecek
date: 2022-8-13 19:35
by: faruk-guler
comments: true
categories: [Blockchain]
---

![Ethereum (ETH) Logosu](https://farukguler.com/assets/post_images/ethereum-eth.JPG) Ethereum (ETH), sadece bir kripto para birimi değil, **merkeziyetsiz, açık kaynaklı ve akıllı sözleşme (smart contract)** çalıştırabilen küresel bir **"dünya bilgisayarıdır"**. 2013 yılında **Vitalik Buterin** tarafından bir whitepaper ile tanıtılan ve 2015'te hayata geçirilen Ethereum'un temel amacı, Bitcoin'in "dijital para" (P2P nakit) vaadinin ötesine geçmektir.

Bitcoin'i sadece "güvenli bir hesap makinesi" olarak düşünürseniz, Ethereum, üzerinde **her türlü merkeziyetsiz uygulamanın (dApp)** programlanıp çalıştırılabileceği, **küresel, sansürlenemez bir bilgisayardır.**

**ETH** ise, bu devasa bilgisayarın çalışmasını sağlayan "yakıt"tır.

---

## Ethereum'un Temel İnovasyonu: Akıllı Sözleşmeler ve EVM

Ethereum'un devrimi, "Akıllı Sözleşmeler" (Smart Contracts) konseptini hayata geçirmesidir.

### 1. Akıllı Sözleşmeler (Smart Contracts)

Akıllı sözleşme, şartları doğrudan kodun içine yazılmış, kendi kendini yürüten bir sözleşmedir. Tıpkı bir otomat (vending machine) gibi çalışır:

* **Olay:** Siz makineye (sözleşmeye) 10 TL atarsınız.
* **Kural:** Eğer atılan para 10 TL ise...
* **Yürütme:** ...o zaman içeceği (dijital varlığı) serbest bırak.

Bu basit mantık, blockchain üzerinde aracı (banka, avukat, noter) olmadan çalıştırıldığında, durdurulamaz, geri döndürülemez ve şeffaf bir şekilde çalışır. Merkeziyetsiz Finans'tan (DeFi) NFT'lere kadar her şey bu teknoloji üzerine kuruludur.

### 2. Ethereum Sanal Makinesi (EVM - Ethereum Virtual Machine)

Eğer akıllı sözleşmeler programlarsa, EVM de bu programların çalıştığı **işletim sistemidir.**

EVM, Ethereum ağındaki binlerce bilgisayarda (node) aynı anda çalışan, küresel ve izole bir "sanal bilgisayar"dır. Bir geliştirici "Solidity" dilinde bir akıllı sözleşme yazdığında, bu kod EVM üzerinde yayınlanır ve ağdaki herkes bu kodun şartlarına güvenebilir.

EVM, günümüzde endüstri standardı haline gelmiştir; Avalanche, Polygon, BNB Chain gibi birçok "EVM uyumlu" zincir, Ethereum'un bu başarılı işletim sistemini kopyalayarak yola çıkmıştır.

---

## "The Merge": Kripto Tarihinin En Büyük Yükseltmesi

Ethereum, 2015'ten 2022'ye kadar, Bitcoin gibi **Proof-of-Work (PoW)** adı verilen enerji yoğun bir madencilik sistemiyle çalıştı.

15 Eylül 2022'de, **"The Merge" (Birleşme)** olarak bilinen ve kripto tarihindeki en karmaşık teknik yükseltme olan bu olayla Ethereum, PoW'u terk ederek **Proof-of-Stake (PoS)** modeline geçti.

* **Proof-of-Work (PoW):** Madenciler, devasa bilgisayar gücü (enerji) harcayarak blokları çözer ve ETH kazanırdı.
* **Proof-of-Stake (PoS):** Artık madenci yok. Bunun yerine **"Doğrulayıcılar" (Validators)** var. Ağı güvence altına almak için fiziksel donanım yerine, **sermayelerini (32 ETH)** kilitlerler (stake ederler). Ağı dürüstçe doğrularlarsa yeni ETH ile ödüllendirilirler; hile yapmaya çalışırlarsa kilitledikleri ETH'leri kaybederler ("slashing").

Bu geçişin iki devasa sonucu oldu:

1.  **%99.9 Enerji Verimliliği:** Ethereum'un enerji tüketimi bir gecede %99.9'dan fazla azaldı.
2.  **"Ultrasound Money" Tokenomiği:** ETH'nin ekonomik modeli tamamen değişti.

---

## ETH Tokenomiği: "Ultrasound Money" (Sesten Hızlı Para)

ETH, Ethereum "dünya bilgisayarının" çalışması için zorunlu olan "yakıt"tır ve bu yakıta **"Gas"** denir. Ağda yaptığınız her işlem (transfer, takas, NFT mint'leme) bir miktar "gas" gerektirir ve bu ücret ETH olarak ödenir.

"The Merge" ve **EIP-1559** (Ethereum İyileştirme Önerisi) yükseltmeleri, ETH'nin tokenomiğini Bitcoin'den bile daha güçlü hale getirmiştir:

1.  **Staking (Talep Yaratma):** Ağı güvence altına almak için yüz binlerce doğrulayıcı, milyonlarca ETH'yi kilitlemek zorundadır. Bu, ETH'yi dolaşımdan çeken devasa bir "talep havuzu" (demand sink) yaratır.
2.  **EIP-1559 (Yakım Mekanizması):** Ethereum'da ödenen "gas" ücretleri artık doğrulayıcılara gitmiyor. Ücret şu iki parçadan oluşur:
    * **Priority Fee (Bahşiş):** İşleminizin öne çıkması için doğrulayıcıya verdiğiniz küçük bir "bahşiş".
    * **Base Fee (Ana Ücret):** Ağın yoğunluğuna göre belirlenen ana ücret. **Bu ücretin %100'ü yakılır (BURN) ve kalıcı olarak dolaşımdan kaldırılır.**

### Deflasyonist Mekanizma

* Ethereum, ağı güvence altına alan staker'lara ödül olarak **yeni ETH basar (enflasyon).**
* Ethereum, ağ kullanıldıkça işlem ücretlerinden (Base Fee) **ETH yakar (deflasyon).**

**Sonuç:** Eğer ağdaki aktivite (ve dolayısıyla yakılan ETH) miktarı, staker'lara dağıtılan yeni ETH miktarından **fazla olursa**, ETH'nin toplam arzı o gün **azalır.**

Bu, Ethereum'u potansiyel olarak **deflasyonist** bir varlık haline getirir. Ağ ne kadar çok kullanılırsa, o kadar çok ETH yakılır ve varlık o kadar kıtlaşır. Bu nedenle topluluk, Bitcoin'in "sağlam parasına" (Sound Money) karşılık ETH'ye **"Ultra Sağlam Para" (Ultrasound Money)** adını vermiştir.

---

## Ethereum'un Ölçeklenme Stratejisi: "Rollup Merkezli" Yol Haritası

Ethereum Layer 1 (ana ağ), şu anda bile yavaş ve pahalıdır. Bunun nedeni, **güvenlik ve merkeziyetsizlikten** asla ödün vermemesidir.

Ethereum'un ölçeklenme (hızlanma) stratejisi, ana ağı hızlandırmak değil, **Layer 2 (L2) Rollup** adı verilen çözümleri desteklemektir.

* **Layer 2'ler (Arbitrum, Optimism, Base, zkSync vb.):** Bunlar, Ethereum'un "üzerine" inşa edilmiş daha hızlı işlem katmanlarıdır. Binlerce işlemi kendi zincirlerinde toplar (rollup), bunları sıkıştırır ve tek bir kanıt olarak Ethereum ana ağına (L1) kaydederler.
* **Ethereum'un Rolü:** L1, bu L2'ler için nihai "güvenlik ve yerleşim katmanı" (security and settlement layer) olarak hizmet eder.

Ethereum'un gelecekteki vizyonu (Danksharding vb.), bu L2'lerin Ethereum'a veri kaydetmesini daha da ucuzlatarak tüm ekosistemi ölçeklendirmektir.

## Son Düşünceler;

Ethereum, sadece bir kripto para (ETH) değil, **Merkeziyetsiz Finans (DeFi), NFT (ERC-721), DAO'lar (Merkeziyetsiz Otonom Organizasyonlar)** ve tüm **Web3** devriminin temelini oluşturan platformdur.

"The Merge" ile enerji verimli Proof-of-Stake modeline geçen ve EIP-1559 ile deflasyonist bir ekonomik yapıya kavuşan Ethereum, "Rollup Merkezli" yol haritasıyla ölçeklenerek, internetin bir sonraki adımı için en büyük ve en güvenli "dünya bilgisayarı" olma konumunu pekiştirmektedir.