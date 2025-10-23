---
layout: post
title: Nexa (NEXA) Nedir?
date: 2023-06-22 19:55
by: faruk-guler
comments: true
categories: [Blockchain]
---

![Nexa Protocol Logosu](https://faruk-guler.com/assets/post_images/nexa.webp) Nexa (NEXA), küresel finans sisteminin tamamını destekleyebilecek düzeyde **Layer 1 (Katman 1)** ölçeklenebilirliği sunma iddiasıyla yola çıkan, Proof-of-Work (PoW) tabanlı bir blockchain projesidir. Proje, günde **10 milyardan fazla işlemi** (saniyede yaklaşık 100.000 işlem - TPS) doğrudan ana zincir üzerinde işlemeyi hedeflemektedir. Bu, Visa gibi geleneksel ödeme ağlarının kapasitesine eşdeğer bir hedeftir.

Nexa'nın geliştirilmesinin arkasındaki itici güç, Bitcoin'in ölçeklenmesi ve protokol geliştirilmesi konusunda uzun yıllara dayanan deneyime sahip olan **Bitcoin Unlimited** ekibidir. Bu nedenle Nexa, Bitcoin'in orijinal "Eşten Eşe Elektronik Nakit Sistemi" vizyonunu korurken, modern donanım ve ağ teknolojilerinden yararlanarak ölçeklenebilirlik sorununu temelden çözmeyi amaçlar.

Nexa'nın felsefesi, Ethereum ekosisteminin benimsediği "Layer 2 Rollup'lar ile ölçeklenme" modelinden farklıdır. Nexa, **ana katmanın (Layer 1) kendisinin**, donanım ve bant genişliğindeki gelişmelerle (Moore Yasası benzeri bir ilerlemeyle) küresel talebi karşılayacak şekilde **doğrudan ölçeklenebileceğini** savunur.

---

## Nexa'nın Ölçeklenebilirlik İçin Geliştirdiği Çözümler

Nexa'nın iddialı TPS hedeflerine ulaşmasını sağlayan temel teknolojiler şunlardır:

### 1. Donanım Odaklı Ölçeklenme

Nexa'nın temel tezi, blockchain darboğazlarının yazılımsal sınırlamalardan çok, donanım (işlemci hızı, bellek, depolama ve bant genişliği) ile aşılabileceğidir. Bu nedenle Nexa protokolü, modern donanımların tüm potansiyelinden yararlanacak şekilde tasarlanmıştır:

* **İşlemci (CPU) Optimizasyonu:** İşlemlerin doğrulanması ve yürütülmesi, çok çekirdekli modern işlemcilerde paralel olarak çalışacak şekilde optimize edilmiştir.
* **Bant Genişliği (Bandwidth) Kullanımı:** Graphene ve Xthinner gibi teknolojilerle blok yayılımı optimize edilerek, büyük blokların bile ağ üzerinde hızla iletilmesi sağlanır.
* **Depolama (Storage):** Gelecekteki zincir boyutunu yönetmek için UTXO taahhütleri ve potansiyel budama (pruning) mekanizmaları üzerine kuruludur.

### 2. Graphene ve Xthinner: Ultra Verimli Blok Yayılımı

Bir blockchain'in hızını sınırlayan en önemli faktörlerden biri, yeni bulunan blokların ağdaki tüm düğümlere ne kadar hızlı yayılabildiğidir. Bloklar büyüdükçe (daha fazla işlem içerdikçe), bu yayılma süresi artar.

Nexa, bu sorunu Bitcoin Unlimited tarafından geliştirilen **Graphene** ve **Xthinner** teknolojileriyle çözer:

* **Nasıl Çalışır:** Bir madenci yeni bir blok bulduğunda, bloğun tamamını göndermek yerine, bloğun içindeki işlemlerin **kompakt bir temsilini (genellikle bir Bloom filtresi ve işlem karmaları)** gönderir. Diğer düğümler, zaten kendi mempool'larında (bekleyen işlem havuzu) bulunan bu işlem bilgilerini kullanarak bloğu **yerel olarak yeniden inşa ederler.**
* **Faydası:** Bu teknik, 1 GB gibi devasa bir bloğun bile ağda sadece birkaç on kilobaytlık bir veri gibi yayılmasını sağlar. Bu, Nexa'nın işlem hacmini artırmasının ve blok boyutunu büyütmesinin önündeki en büyük engellerden birini kaldırır.

### 3. NexaPow: Madencilik ve Ağ Performansı İlişkisi

Nexa, Bitcoin gibi **Proof-of-Work (PoW)** konsensüs mekanizmasını kullanır, ancak **NexaPow** adı verilen özel bir madencilik algoritmasıyla çalışır.

* **ASIC/FPGA Dostu:** NexaPow, madenciliğin zamanla daha verimli hale gelmesi için özel donanımlara (ASIC, FPGA) doğru ilerlemesini teşvik eder. Bu, ağın güvenliğini artırır ve donanım ölçeklenmesine paralel olarak ağ kapasitesinin de artmasını sağlar.
* **İşlem Doğrulama Teşviki:** Algoritma, madencilerin sadece hash bulmakla kalmayıp, aynı zamanda işlemleri verimli bir şekilde doğrulamalarını da teşvik edecek şekilde tasarlanmıştır.

### 4. UTXO Modeli Üzerinde Tokenlar ve Akıllı Sözleşmeler

Nexa, Ethereum'un Hesap Modeli yerine Bitcoin'in **UTXO (Harcanmamış İşlem Çıktısı)** modelini kullanır. Bu model, doğal olarak daha iyi ölçeklenebilirlik ve paralelleştirme yetenekleri sunar. Nexa, bu temeli modern özelliklerle genişletmiştir:

* **Token Groups (Token Grupları):** Bu, Nexa'nın en yenilikçi özelliklerinden biridir. Ethereum'daki ERC-20 (fungible token) veya ERC-721 (NFT) gibi token standartlarını, **karmaşık Layer 2 akıllı sözleşmelerine ihtiyaç duymadan, doğrudan Layer 1 protokol seviyesinde** oluşturmanıza olanak tanır.
    * **Avantajı:** Bu "yerel" token'lar, ana NEXA coini ile aynı hız, güvenlik ve ölçeklenebilirlik özelliklerine sahip olur. Token transferleri, NEXA transferleri kadar hızlı ve ucuzdur.
* **Akıllı Sözleşmeler:** Nexa, UTXO modeli üzerinde çalışabilen, ancak Ethereum'daki kadar karmaşık olmayan (Turing complete olmayan) daha basit ve güvenli akıllı sözleşme yetenekleri sunar. Bu sözleşmeler, token yönetimi, basit finansal anlaşmalar ve otomatize edilmiş kurallar gibi birçok kullanım durumu için yeterlidir.

---

## NEXA Coin: Ekosistemin Yakıtı

**NEXA**, Nexa ağının yerel kripto para birimidir ve ağın işleyişi için hayati öneme sahiptir.

1.  **İşlem Ücretleri (Gas):** Ağdaki tüm işlemlerin maliyetini karşılamak için kullanılır. Bu, NEXA transferleri, yeni token grupları oluşturma, akıllı sözleşme çalıştırma gibi işlemleri içerir. Ölçeklenebilirlik hedefi nedeniyle bu ücretlerin çok düşük kalması hedeflenir.
2.  **Madencilik Ödülleri:** PoW madencileri, ağı güvence altına aldıkları ve yeni bloklar ürettikleri için NEXA ile ödüllendirilirler.
3.  **Token Oluşturma Maliyeti:** Yeni bir "Token Group" oluşturmak isteyen kullanıcılar, bu işlem için belirli bir miktar NEXA ödemek zorundadır. Bu, ağda gereksiz token oluşturulmasını engeller.
4.  **Ekonomik Bant Genişliği:** Gelecekte, ağ kaynaklarını (örn. depolama, bant genişliği) kullanmanın maliyetini NEXA cinsinden ödeme gibi mekanizmalar geliştirilebilir.

---

## Tokenomi: 21 Trilyon Arz ve Bitcoin Benzeri Halving

Nexa'nın tokenomiği, Bitcoin'den esinlenmiş ancak farklı bir ölçekte tasarlanmıştır:

* **Maksimum Arz:** **21 Trilyon (21,000,000,000,000) NEXA**. Bu yüksek rakam, enflasyonist bir amaç taşımaz. Aksine, günlük işlemlerde kullanıcıların küçük ondalıklarla uğraşmak yerine tam sayılarla (örn. 1000 NEXA) daha kolay işlem yapabilmesini sağlamak içindir. Bitcoin'in Satoshilere bölünmesi gibi düşünülebilir.
* **Halving (Yarılanma):** Tıpkı Bitcoin gibi, Nexa'da da madencilere verilen blok ödülü yaklaşık **her 4 yılda bir yarıya iner.** Bu, zamanla yeni NEXA arzının azalmasını ve varlığın kıtlığının artmasını sağlar, potansiyel olarak deflasyonist bir etki yaratır.

---

### NEXA ve Bitcoin Unlimited Ekibi

Nexa'nın arkasındaki teknik gücün Bitcoin Unlimited ekibi olması, projeye önemli bir kredibilite katmaktadır. Bu ekip, Bitcoin protokolünün geliştirilmesi ve ölçeklenmesi konusunda yıllardır aktif olarak çalışmaktadır.

![NEXA Bitcoin Unlimited Ekibi](https://farukguler.com/assets/post_images/nexa-bu-team.png?w=768)

---

## Sonuç: Layer 1 Ölçeklenmesinin Sınırlarını Zorlamak

Nexa, blockchain dünyasındaki ölçeklenme sorununa cesur ve farklı bir çözüm öneren, teknik olarak iddialı bir projedir. Ethereum'un Layer 2 merkezli yaklaşımına karşı, donanım ve ağ optimizasyonlarıyla doğrudan Layer 1'i küresel ölçeğe taşımayı hedefler.

Graphene gibi yenilikçi teknolojileri, UTXO tabanlı yerel token sistemi ve deneyimli bir geliştirici ekibiyle Nexa, Bitcoin'in orijinal "dijital nakit" vizyonunu modern teknolojiyle yeniden canlandırma potansiyeline sahiptir. Başarısı, iddia ettiği performansı gerçek dünya koşullarında sürdürülebilir bir şekilde sunup sunamayacağına ve etrafında canlı bir ekosistem oluşturup oluşturamayacağına bağlı olacaktır.

---

Nexa projesi hakkında daha fazla detaylı bilgiye ulaşmak veya son gelişmeleri öğrenmek isterseniz, resmi web sitesini **[https://nexa.org](https://nexa.org/)** ve projenin teknik kaynaklarını **[https://gitlab.com/nexa](https://gitlab.com/nexa)** inceleyebilirsiniz. Ancak, lütfen unutmayın ki her kripto proje gibi, Nexa da riskler içerebilir, bu nedenle yatırım yapmadan önce dikkatli bir araştırma yapmanız (DYOR - Do Your Own Research) önemlidir.