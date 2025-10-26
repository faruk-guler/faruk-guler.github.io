---
layout: post
title: Numeraire (NMR) Nedir? Veri Bilimcilerinin Yönettiği Merkeziyetsiz Hedge Fonu
date: 2022-9-14 18:00
by: faruk-guler
comments: true
categories: [Blockchain]
---

![Numeraire (NMR) Logosu](https://farukguler.com/assets/post_images/numerai-nmr.jpg) Numeraire (NMR), bir blockchain, bir Layer 1 (Katman 1) veya bir DeFi platformu **değildir**. O, **Numerai** adında, San Francisco merkezli, gerçek dünya hisse senedi piyasalarında işlem yapan **bir hedge fonunun (yatırım fonu)** kullandığı **kripto-ekonomik bir teşvik protokolüdür.**

Projenin misyonu, geleneksel hedge fonlarının "kapalı kapı" modelini kırmak ve **dünyanın en iyi borsa tahmin modelini ("Metamodel")** binlerce anonim veri bilimcisinden oluşan küresel bir ağ aracılığıyla **"kitle kaynak (crowdsource)"** yoluyla elde etmektir.

**NMR**, bu sistemin merkezinde yer alan, son derece spesifik bir amaca hizmet eden (ERC-20) token'ıdır: Veri bilimcilerinin kendi tahmin modellerine **"güvendiklerini kanıtlamak"** için kullandıkları bir **staking (kilitleme) ve yakım (burning)** aracıdır.

---

## "Geleneksel Hedge Fon" Problemi Nedir?

Geleneksel Wall Street fonları (örn. Citadel, Renaissance) şöyle çalışır:
1.  En iyi üniversitelerden (MIT, Harvard) bir avuç "star" kantitatif analisti (quant) işe alır.
2.  Onlara milyonlarca dolar maaş öder.
3.  Bu analistler, piyasayı yenmek için gizli "kara kutu" (black box) algoritmalar yazar.
4.  **Problem:** Bu model pahalıdır, yetenek havuzu dardır (sadece işe aldıklarıyla sınırlıdır) ve bu "star" analistlerin modelleri bir süre sonra çalışmayı durdurabilir (alpha decay).

---

## Numerai'nin Radikal Çözümü: Kripto-Ekonomik Turnuva

Numerai, bu modeli tersine çevirir: "En iyi 10 analisti işe almaktansa, ya dünyadaki 10.000 analistin *hepsine* şans verirsek?"

İşte sistemin adım adım çalışma şekli:

1.  **Veri Sağlama:** Numerai, binlerce farklı hisse senedine ait **şifrelenmiş (obfuscated) finansal veriyi** haftalık olarak yayınlar. (Veri bilimciler hangi hisse senedini veya hangi veriyi (P/E, momentum vb.) analiz ettiklerini *bilmezler*, sadece desenleri görürler. Bu, stratejinin çalınmasını engeller.)
2.  **Turnuva (The Tournament):** Dünyanın dört bir yanındaki binlerce anonim veri bilimcisi bu veriyi indirir, kendi yapay zeka (AI) ve makine öğrenimi (ML) modellerini eğitir ve borsanın bir sonraki hafta hangi yöne gideceğine dair **tahminlerini** Numerai'ye geri yükler.
3.  **Staking (Bahis):** Burası NMR'nin devreye girdiği yerdir. Bir veri bilimcisi, tahmininin *gerçekten iyi* olduğuna inanıyorsa, tahminine olan güvenini kanıtlamak için **NMR token'larını o tahmine "stake eder" (kilitler).**
4.  **Metamodel (Ana Model):** Numerai, gelen tüm bu binlerce (ve NMR stake edilmiş) tahmini alır, bunları birleştirir ve **"Metamodel"** adını verdiği tek bir "ana" ticaret sinyali oluşturur.
5.  **Ticaret (Trading):** Numerai hedge fonu (gerçek, SEC onaylı bir fon), ABD hisse senedi piyasalarında bu Metamodel'e dayanarak **gerçek para ile** alım-satım yapar.

---

## NMR Token'ı: Dâhice ve Acımasız Tokenomik

NMR'nin tokenomisi, kripto dünyasındaki en ilginç ve en acımasız mekanizmalardan biridir. Bu, bir "al-tut" (HODL) token'ından çok, bir **"performans kanıtı"** aracıdır.

Bir veri bilimcisi için iki senaryo vardır:

1.  **KAZANÇ (Model İyi Çalışırsa):**
    * Veri bilimcinin modeli doğru tahminler yapar ve Numerai fonuna *para kazandırırsa* (ve model "orijinal" ise, yani başkalarının kopyası değilse), o veri bilimcisi **daha fazla NMR token ile ödüllendirilir.**
    * Bu ödüller, protokol tarafından yeni basılan (enflasyonist) NMR'lardan veya fondan ödenir.

2.  **KAYIP (Model Kötü Çalışırsa - YAKIM):**
    * Veri bilimcinin modeli kötü performans gösterir ve Numerai fonuna *para kaybettirirse*...
    * ...o model üzerine kilitlediği (stake ettiği) **NMR token'ları geri alınamaz bir şekilde YAKILIR (BURNED) ve yok edilir.**

Bu, bir "skin in the game" (kaybedecek bir şeyi olma) mekanizmasıdır. Veri bilimcileri sadece iyi modeller göndererek ödül kazanmaz; kötü modeller göndererek **cezalandırılırlar.** Bu, herkesin sadece en iyi modelini göndermesini sağlar.

---

## Token Arzı ve Gelecek Beklentisi

### Token Arzı (Gerçeklik)

* **Maksimum Arz:** **11.000.000 NMR** ile sert bir şekilde sınırlandırılmıştır.
* **Mevcut Arz:** Dolaşımdaki arz yaklaşık 6.5 Milyon NMR'dir. Kalan token'ların çoğu, turnuva ödülleri olarak gelecekte dağıtılmak üzere Numerai hazinesinde tutulmaktadır.
* **Arz Dinamiği (Kritik Gerçek):** NMR token'ı hem enflasyonist hem de deflasyonist bir dinamiğe sahiptir:
    * **Enflasyonist Baskı:** Turnuvada *iyi performans* gösterenlere ödül olarak yeni NMR'ler basılır ve dağıtılır (Maksimum 11 Milyon sınıra ulaşana kadar).
    * **Deflasyonist Baskı (Yakım):** Turnuvada *kötü performans* gösterenlerin stake ettiği NMR'ler **kalıcı olarak yakılır.**

**Sonuç:** Dolaşımdaki arzın artması veya azalması, veri bilimcilerinin kolektif olarak ne kadar "başarılı" olduğuna bağlıdır. Eğer çok fazla kötü model varsa, net etki deflasyonist olabilir.

### Gelecek Beklentisi ve "Acı Gerçekler"

NMR'nin gelecekteki değeri, tek bir şeye, ama çok zor bir şeye bağlıdır: **Numerai'nin Metamodel'i, S&P 500'ü veya diğer endeksleri uzun vadede, istikrarlı bir şekilde yenebilir mi?**

**1. Pozitif Beklenti (The Bull Case):**
* Metamodel giderek daha akıllı hale gelir ve fonun performansı (AUM - Yönetilen Varlık) büyür.
* Fonun performansı büyüdükçe, veri bilimcilerine dağıtılacak ödüller artar.
* Ödüller arttıkça, daha fazla (ve daha iyi) veri bilimcisi turnuvaya katılır.
* Daha fazla katılımcı, modeline güvenmek için piyasadan **NMR satın almak zorunda kalır** (stake etmek için).
* **Bu, mükemmel bir "talep döngüsü" (demand loop) yaratır:** Fonun başarısı = NMR'ye olan talebin artması. NMR'nin değeri, spekülasyondan ziyade, *fonun performansına* ve *katılımcı sayısına* bağlanır.

**2. Negatif Beklenti (The Bear Case / Acı Gerçekler):**
* **Gerçek 1 (Zorluk):** Piyasayı istikrarlı bir şekilde yenmek, "finansın kutsal kâsesidir" ve neredeyse imkansızdır. Dünyanın en büyük fonları bile bunu başaramazken, anonim bir kalabalığın bunu yapabileceğinin garantisi yoktur.
* **Gerçek 2 (Ölüm Sarmalı - Death Spiral):** Ya Metamodel *başarısız* olursa?
    * Fon para kaybeder -> Veri bilimcilerinin stake ettiği NMR'ler yakılır -> Veri bilimciler para kaybeder ve sinirlenip platformu terk eder -> Daha az katılımcı, Metamodel'in daha da kötüleşmesine neden olur -> Bu, daha fazla para kaybına yol açar. Bu bir "ölüm sarmalıdır".
* **Gerçek 3 (Merkeziyet Riski):** Bu bir DAO (Merkeziyetsiz Otonom Organizasyon) değildir. **Numerai (Richard Craib'in şirketi)** hâlâ veriyi kontrol eder, fonu yönetir, kuralları belirler ve Metamodel'i çalıştırır. Proje "merkeziyetsizleşiyor" olsa da, kaderi hâlâ merkezi bir ekibe bağlıdır.

---

## Sonuç

Numeraire (NMR), kripto dünyasındaki en "zeki" ve en cüretkâr deneylerden biridir. Basit bir L1 veya DeFi projesi değildir. O, **"İnsan + Makine + Kripto-Ekonomi"** kullanarak dünyanın en zor problemlerinden birini (piyasayı yenmek) çözmeye çalışan, yüksek riskli, yüksek ödüllü bir protokoldür.

NMR'ye yatırım yapmak, "bu blockchain daha hızlı" demek değildir; bu, **"Binlerce anonim veri bilimcisinin kolektif zekâsı, Wall Street'in en pahalı 'star' analistlerini yenebilir"** tezine yapılmış bir bahistir.