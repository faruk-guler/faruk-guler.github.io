---
layout: post
title: Nexa (NEXA) Nedir? Bitcoin'in Ölçeklenebilirlik Rüyası mı?
date: 2023-10-15 00:44
by: faruk-guler
comments: true
categories: [Blockchain]
---

![Nexa Protocol Logosu](https://farukguler.com/assets/post_images/nexa.webp) Nexa (NEXA), günde 10 milyardan fazla işlemi (yaklaşık 100.000 TPS) destekleyebileceğini iddia eden, yeni nesil bir Layer 1 (Katman 1) blockchain ve kripto para birimidir.

Nexa'nın arkasındaki ekip, Bitcoin'in ölçeklenmesi tartışmalarında önemli bir rol oynayan **Bitcoin Unlimited** ekibidir. Bu proje, "dijital nakit" (P2P electronic cash) vizyonunu, Ethereum ve Layer 2'lerin benimsediği yoldan (Rollup'lar) farklı bir felsefeyle çözmeyi amaçlar.

Nexa'nın temel felsefesi, Ethereum'un "Layer 2'ler ile ölçeklenelim" yaklaşımının aksine, **Layer 1'in kendisinin donanım iyileştirmeleriyle (Moore Yasası) paralel olarak ölçeklenebileceğini** savunmaktır. Kısacası Nexa, Visa/Mastercard seviyesindeki işlem hacmini doğrudan ana zincirde (L1) işlemeyi hedefler.

---

## Nexa'nın Çekirdek Teknolojisi: Donanımla Ölçeklenme

Nexa'nın devasa ölçeklenebilirlik iddiaları, birbiriyle bağlantılı birkaç temel teknolojiye dayanmaktadır:

### 1. Graphene ve Xthinner (Blok Yayılımı)

Geleneksel blockchain'lerde (örn. Bitcoin) bir madenci yeni bir blok bulduğunda, o bloğun *tamamını* ağdaki diğer tüm düğümlere gönderir. Blok boyutu büyüdükçe (örn. 1 GB), bu yayılma (propagation) süresi çok uzar ve ağı yavaşlatır.

Nexa, Bitcoin Unlimited tarafından geliştirilen **Graphene** (ve onun bir varyasyonu olan **Xthinner**) teknolojisini kullanır. Bu teknoloji sayesinde, ağa bloğun tamamı değil, **sadece bloğun içindeki işlemlerin bir özeti (bloom filter)** gönderilir. Diğer düğümler, zaten kendi mempool'larında (bekleme havuzu) bulunan bu işlemleri kullanarak bloğu yeniden oluşturur.

* **Sonuç:** Bu, 1 GB'lık devasa bir bloğun bile ağda sanki birkaç kilobaytlık bir veriymiş gibi saniyeler içinde yayılmasını sağlar. Bu, Nexa'nın yüksek işlem hacminin kilit noktasıdır.

### 2. Proof-of-Work (PoW) ve NexaPow

Nexa, ağ güvenliği için Bitcoin gibi **Proof-of-Work (PoW)** konsensüsünü kullanır. Ancak, madencilik algoritması **NexaPow** olarak adlandırılan özel bir algoritmadır.

NexaPow, madencilerin işlemleri doğrulamak için hem CPU gücüne hem de bant genişliğine (bandwidth) ihtiyaç duymasını sağlayacak şekilde tasarlanmıştır. Bu, madenciliğin donanım optimizasyonları (ASIC, FPGA) ile ölçeklenmesine izin verirken, ağın yüksek işlem hacmini desteklemesini teşvik eder.

### 3. UTXO Modeli ve "Token Groups" (Yerel Token Desteği)

Nexa, Ethereum'un "Hesap Modeli" (Account Model) yerine Bitcoin'in **UTXO (Harcanmamış İşlem Çıktısı)** modelini kullanır. Ancak Nexa, bu modeli akıllı sözleşme yetenekleriyle genişletmiştir.

**Token Groups (Token Grupları):** Nexa'nın en güçlü özelliklerinden biri, Ethereum'daki ERC-20 veya ERC-721 (NFT) gibi token'ları, *karmaşık akıllı sözleşmelere ihtiyaç duymadan* doğrudan protokol seviyesinde (L1) oluşturmaya izin vermesidir.

Bu, token transferlerinin ve yönetiminin, ana NEXA coinin transferleri kadar hızlı, ucuz ve ölçeklenebilir olduğu anlamına gelir.

---

## NEXA Coin'in Kullanım Alanları

**NEXA**, Nexa ağının yerel kripto para birimidir ve ekosistemde birden fazla rolü vardır:

1.  **Ağ Ücretleri (Gas):** Ağdaki tüm işlemler (NEXA transferleri, token oluşturma, akıllı sözleşme çalıştırma) için ödeme yapmakta kullanılır.
2.  **P2P Dijital Nakit:** Projenin ana hedefi doğrultusunda, kişiler arası anlık ve düşük maliyetli bir ödeme aracı olarak tasarlanmıştır.
3.  **Madencilik Ödülleri:** Ağı güvence altına alan PoW madencilerini ödüllendirmek için kullanılır.
4.  **Token Oluşturma:** Yeni "Token Groups" (NFT veya token) oluşturmak için kullanılır.

---

## Tokenomi: 21 Trilyon NEXA

Nexa'nın tokenomiği, Bitcoin'den ilham alır ancak farklı bir ölçektedir:

* **Maksimum Arz:** Bitcoin'in 21 milyon arzına karşılık, Nexa'nın maksimum arzı **21 Trilyon (21,000,000,000,000) NEXA** olarak belirlenmiştir.
* **Arz Felsefesi:** Bu devasa arz, projenin "enflasyonist" olduğu anlamına gelmez. Amaç, günlük kullanımda ve mikro ödemelerde insanların `0.00012` gibi ondalık sayılarla uğraşması yerine, `100 NEXA` veya `5000 NEXA` gibi tam sayılarla işlem yapabilmesini sağlamaktır. (Bitcoin'in 21 milyon arzına 100 milyon "Satoshi" eklenmesi gibi düşünülebilir.)
* **Halving (Yarılanma):** Tıpkı Bitcoin gibi, Nexa'nın blok ödülleri de yaklaşık **her 4 yılda bir yarıya iner (halving)**, bu da zamanla arzın azaldığı deflasyonist bir ekonomik model yaratır.

---

### NEXA ve Bitcoin Unlimited Ekibi

![NEXA Bitcoin Unlimited Ekibi](https://farukguler.com/assets/post_images/nexa-bu-team.png?w=768)

---

## Sonuç

Nexa, "dijital nakit" vizyonunu ve küresel ölçeklenebilirliği, Ethereum'un öncülük ettiği Layer 2 Rollup dünyasından tamamen farklı bir yolla, yani **Layer 1'i donanımsal olarak ölçeklendirerek** çözmeye çalışan son derece iddialı bir projedir.

Bitcoin Unlimited ekibinin teknik deneyimi ve Graphene gibi kanıtlanmış teknolojileri kullanması, onu dikkate değer kılmaktadır. Nexa, aslında "Eğer Bitcoin, başlangıçtaki blok boyutu sınırını hiç koymasaydı ve teknolojinin (internet hızı, depolama) gelişimine izin verseydi ne olurdu?" sorusunun modern bir cevabıdır.

---

Nexa projesi hakkında daha fazla detaylı bilgiye ulaşmak veya son gelişmeleri öğrenmek isterseniz, resmi web sitesini **[https://nexa.org](https://nexa.org/)** ve projenin diğer kaynaklarını **[https://gitlab.com/nexa](https://gitlab.com/nexa)** inceleyebilirsiniz. Ancak, lütfen unutmayın ki her kripto proje gibi, Nexa da riskler içerebilir, bu nedenle yatırım yapmadan önce dikkatli bir araştırma yapmanız önemlidir.