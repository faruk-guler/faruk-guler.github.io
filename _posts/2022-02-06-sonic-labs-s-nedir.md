---
layout: post
title: Sonic (S) Nedir? Fantom'un Ethereum L2 Olarak Yeniden Doğuşu
date: 2023-02-06 18:23
by: faruk-guler
comments: true
categories: [Blockchain]
---

![Sonic Network (S) Logosu](https://farukguler.com/assets/post_images/sonic-labs.jpg) Sonic (S), daha önce **Fantom (FTM)** olarak bilinen yüksek performanslı Layer 1 blockchain'in teknolojik evriminin bir sonraki aşamasıdır. Sonic, Fantom'un mevcut altyapısını tamamen yeniden tasarlayarak, onu Ethereum'a bağlı, ultra yüksek hızlı bir **Layer 2 (Katman 2) ağı** haline getiren devrim niteliğinde bir yükseltmedir.

Bu dönüşümün merkezinde, Fantom'un yerel token'ı **$FTM**'in, yeni ağın yerel varlığı olan **$S**'e **1:1 oranında** dönüştürülmesini içeren bir yeniden markalaşma ve token göçü (migration) bulunmaktadır.

Kısacası, Sonic; "Fantom 2.0"dır ve projenin "Layer 1 savaşlarından" çekilip, Ethereum ekosistemi içindeki en hızlı L2 olma yarışına katılması anlamına gelir.

---

## Fantom'dan (FTM) Sonic'e (S): Neden Bu Değişim?

Fantom (FTM), DAG (Lachesis) tabanlı konsensüsü sayesinde her zaman en hızlı Layer 1'lerden biri olmuştur. Ancak, tüm "monolitik" (tek parça) L1'ler gibi, o da bir darboğazla karşı karşıyaydı: **EVM (Ethereum Virtual Machine)**.

EVM, işlemleri "sıralı" (tek tek) işler. Fantom'un konsensüs motoru ne kadar hızlı olursa olsun, EVM'nin bu sıralı işlem mantığı, ağın gerçek potansiyeline ulaşmasını engelliyordu.

Ethereum'un "Rollup Merkezli" (Rollup-Centric) yol haritası L2'leri endüstri standardı haline getirirken, Fantom ekibi (yeni adıyla Sonic Labs) radikal bir karar aldı:

1.  Mevcut L1 teknolojisini bir kenara atmak yerine, onu **Ethereum için optimize edilmiş bir L2 motoruna** dönüştürmek.
2.  EVM darboğazını aşmak için **yeni bir sanal makine (FVM)** yaratmak.

---

## Sonic'in Çekirdek Teknolojisi: FVM ve Paralel İşleme

Sonic'in saniyede 2.000'den fazla işlem (TPS) ve 1 saniyenin altında işlem kesinliği (finality) gibi iddialı hedeflerinin arkasında iki ana teknoloji yatar:

### 1. Fantom Sanal Makinesi (FVM)

FVM, Sonic'in kalbidir. Geleneksel EVM'nin yerini alan, ancak onunla **tamamen geriye dönük uyumlu** olan yeni bir sanal makinedir.

* **Paralel İşleme (Parallel Execution):** FVM'nin en büyük devrimi budur. Standart EVM'nin aksine, FVM, birbiriyle ilgisi olmayan işlemleri **aynı anda (paralel olarak)** işleyebilir. Bu, özellikle yoğun DeFi ve oyun uygulamalarında performansı yüzlerce kat artırır.
* **EVM Uyumluluğu:** Geliştiriciler, Solidity dillerinde yazdıkları mevcut Ethereum akıllı sözleşmelerini **hiçbir değişiklik yapmadan** FVM üzerinde çalıştırabilir ve bu performans artışından anında faydalanabilirler.

### 2. Ethereum L2 Olarak Konumlanma (Modüler Mimari)

Sonic, artık "Ethereum katili" bir L1 değil, Ethereum'un en güçlü L2'lerinden biri olmayı hedefliyor.

* **Yerleşim (Settlement) ve Güvenlik:** Sonic, işlemlerini kendi ultra hızlı motorunda (FVM) işler, ancak bu işlemlerin "kesinliği" ve güvenliği için periyodik olarak Ethereum L1'e bir kanıt (proof) gönderir. (Bu, onu bir Optimistic L2 veya ZK-Rollup'a benzer bir yapıya sokar).
* **Modülerlik:** Bu, Sonic'in "modüler" bir yapıya kavuştuğu anlamına gelir. Yürütme (Execution) işini Sonic (FVM) yaparken, Güvenlik ve Veri Kullanılabilirliği (Security & DA) işlerini Ethereum'a bırakarak her iki dünyanın da en iyi yönlerini birleştirir.

---

## S Token: Yeni Ekosistemin Yakıtı

Sonic'in lansmanıyla birlikte, ekosistemin merkezi varlığı $S token'ı olacaktır.

### Token Göçü (FTM -> S)

En önemli değişiklik, mevcut $FTM token sahiplerinin varlıklarını yeni **$S** token'ına 1:1 oranında (1 FTM = 1 S) dönüştüreceği bir **göç (migration)** sürecinin başlayacak olmasıdır.

$S token'ının $FTM ile aynı temel işlevleri (ve daha fazlasını) üstlenmesi beklenmektedir:

1.  **Gas Ücretleri:** Sonic L2 ağındaki tüm işlem ücretleri $S ile ödenecektir.
2.  **Staking (Güvenlik):** Ağın sıralayıcılarını (sequencers) ve doğrulayıcılarını (validators) güvence altına almak için $S token'ları stake edilecektir.
3.  **Yönetişim (Governance):** $S sahipleri, Sonic Vakfı (Sonic Foundation) aracılığıyla protokolün geleceği, hazine kullanımı ve teknik yükseltmeler hakkında oy hakkına sahip olacaktır.

## "Sonic Labs" ve "Sonic Foundation"

Bu yeniden markalaşma ile Fantom'un arkasındaki yapılar da isim değiştirmektedir:

* **Sonic Labs:** Fantom'un (FTM) arkasındaki çekirdek geliştirme ekibinin (Fantom Foundation) yeni adıdır. Odak noktaları, FVM ve L2 altyapısı gibi temel teknolojileri geliştirmektir.
* **Sonic Foundation:** Ekosistemin büyümesi, hibeler, pazarlama ve yönetişimden sorumlu olan kuruluştur.

---

## Sonuç

Sonic, Fantom projesinin hayatta kalmak için attığı cesur ve stratejik bir adımdır. Layer 1 savaşlarının artık yerini Layer 2 rekabetine bıraktığını kabul eden ekip, yıllar içinde geliştirdikleri DAG tabanlı konsensüs ve FVM gibi üstün teknolojileri, kripto dünyasının ana güvenlik ve yerleşim katmanı olan Ethereum'a bir "performans motoru" olarak sunmaktadır.

Bu hamle, Fantom'u (artık Sonic'i) doğrudan Arbitrum, Optimism ve diğer L2 devleriyle rekabete sokmakta ve "en hızlı EVM L2" unvanı için iddialı bir yarış başlatmaktadır.