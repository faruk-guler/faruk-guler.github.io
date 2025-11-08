---
layout: post
title: Zcash (ZEC) Nedir? zk-SNARKs ile Opsiyonel Gizlilik
date: 2023-05-16 13:10
by: faruk-guler
comments: true
categories: [Blockchain]
---

![Zcash (ZEC) Logosu](https://farukguler.com/assets/post_images/z-cash.jpg)

Zcash (ZEC), 2016 yılında Bitcoin kod tabanından (fork) türetilmiş, merkeziyetsiz ve açık kaynaklı bir **gizlilik odaklı** kripto para birimidir. Projenin temel misyonu, Bitcoin'in (ve diğer tüm halka açık blockchain'lerin) doğasında bulunan **şeffaflık sorununu** çözmektir.

Zcash'in devrimi, **"zk-SNARKs"** (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) adı verilen, askeri düzeyde bir kriptografi teknolojisini kullanan ilk blockchain olmasıdır. Bu teknoloji, bir işlemin (örn. para transferi) **geçerli olduğunu**, işlemin kendisi hakkında (gönderen, alıcı, miktar) **hiçbir bilgiyi ifşa etmeden** kanıtlamaya olanak tanır.

Basitçe söylemek gerekirse, Zcash, kullanıcılara **finansal gizlilik** konusunda tam bir seçim özgürlüğü sunar: İsterlerse Bitcoin gibi şeffaf, isterlerse tamamen gizli işlemler yapabilirler.

---

## "Şeffaflık Problemi" ve Zcash'in Çözümü

Bitcoin, Ethereum ve benzeri blockchain'ler "anonim" değil, **"takma adlıdır" (pseudonymous)**. Bir cüzdan adresinin kime ait olduğunu bilemeyebilirsiniz, ancak o adrese giren, çıkan ve o adreste tutulan **tüm bakiye ve işlem geçmişi** sonsuza dek kamuya açıktır.

* **Problem:** Bir işletme, maaşları veya tedarikçi ödemelerini halka açık bir defterde yapmak istemez. Bir birey, bir kahve alarak tüm cüzdan bakiyesini kasiyere ifşa etmek istemez.

Zcash, bu sorunu "opsiyonel gizlilik" adı verilen çift adresli bir sistemle çözer:

### 1. t-Adresleri (Transparent - Şeffaf)
Bunlar, Bitcoin adresleri gibi çalışır. `t...` ile başlarlar. Bu adresler arasında yapılan tüm işlemler (T-to-T) halka açık defterde tam şeffaflıkla görülebilir.

### 2. z-Adresleri (Shielded - Korumalı)
Bunlar, Zcash'in asıl inovasyonudur. `z...` ile başlarlar ve zk-SNARKs kriptografisini kullanırlar. Bir z-Adresi'nden başka bir z-Adresi'ne (Z-to-Z) yapılan işlemde, blockchain'e sadece "belirsiz bir zamanda geçerli bir işlem gerçekleşti" bilgisi kaydedilir. **Gönderen, alıcı ve miktar tamamen şifrelenir.**

Bu iki sistem arasında dört tür işlem yapılabilir:
1.  **T-to-T:** Tamamen şeffaf (Bitcoin gibi).
2.  **T-to-Z:** "Koruma" (Shielding). Bir t-adresinden z-adresine para göndererek fonları gizli hale getirme.
3.  **Z-to-Z:** Tamamen gizli (Gerçek Zcash deneyimi).
4.  **Z-to-T:** "Korumayı Kaldırma" (Deshielding). Gizli fondan şeffaf bir adrese para gönderme (örn. bir borsaya yatırmak için).

---

## Çekirdek Teknoloji: zk-SNARKs ve "Trusted Setup" Evrimi

### zk-SNARKs
Zcash'in tüm gizliliği, bu "Sıfır Bilgi Kanıtı" teknolojisine dayanır. Bu, ağın, bakiyenizin yeterli olduğunu veya çifte harcama yapmadığınızı, bu bilgilerin *detayını* görmeden matematiksel olarak doğrulamasını sağlar.

### "Trusted Setup" (Güvenilir Kurulum) ve Çözümü
Zcash'in ilk versiyonları, zk-SNARKs'ın çalışması için gerekli olan ilk kriptografik parametreleri oluşturmak üzere **"Trusted Setup" (Güvenilir Kurulum)** adı verilen bir sürece ihtiyaç duyuyordu.
* **Risk:** Bu kurulum sırasında oluşturulan ve "toksik atık" (toxic waste) olarak adlandırılan gizli verinin, kurulumdan hemen sonra yok edilmesi gerekiyordu. Eğer bu veri yok edilmemiş ve birileri tarafından saklanmış olsaydı, o kişiler **sahte (counterfeit) ZEC** basabilirdi ve *hiç kimse bunu fark edemezdi*.
* **Çözüm (Halo Yükseltmesi):** Zcash ekibi (Electric Coin Co. - ECC), bu temel "güven" sorununu çözmek için yıllarca çalıştı. 2022'deki "NU5" güncellemesiyle **"Halo"** adı verilen yeni bir kriptografik buluşu devreye soktular. Halo, zk-SNARKs'ın **"güvenilir bir kuruluma ihtiyaç duymadan"** çalışmasını sağladı. Bu, Zcash'in en büyük varoluşsal riskini ortadan kaldıran devrim niteliğinde bir adımdı.

---

## ZEC Token: Arz, Ekonomi ve "Geliştirici Fonu"

ZEC'in tokenomisi, Bitcoin'i taklit eder ancak çok önemli ve tartışmalı bir farkı vardır.

### Token Arzı ve Modeli
* **Maksimum Arz:** **21.000.000 ZEC** (Tıpkı Bitcoin gibi, sert bir şekilde sınırlandırılmıştır).
* **Konsensüs:** Proof-of-Work (PoW). Madenciler, **Equihash** algoritmasını kullanarak ağı güvence altına alır.
* **Emisyon Modeli:** Tıpkı Bitcoin gibi, yaklaşık her **4 yılda bir "halving" (yarılanma)** yaşayarak blok ödülleri yarıya düşer.

### Kritik Gerçek: Blok Ödülü Dağılımı ("Dev Fund")
Bitcoin'de blok ödülünün %100'ü madencilere gider. Zcash'te ise, projenin gelişimini *sürdürülebilir* bir şekilde finanse etmek için blok ödülü bölünmüştür.

2020 halving'inden sonra (ZIP 1014) devreye giren mevcut model şöyledir:
* **%80 → Madenciler:** Ağı güvence altına aldıkları için ödüllendirilirler.
* **%20 → Geliştirme Fonu (Dev Fund):** Bu pay, projenin çekirdek geliştiricilerini ve ekosistemi fonlamak için ayrılır. Bu %20'lik pay da kendi içinde şöyle bölünür:
    * **%8 Electric Coin Co. (ECC):** Projenin arkasındaki ana geliştirme şirketi.
    * **%7 Zcash Community Grants:** Topluluk tarafından oylanan bağımsız projelere, geliştiricilere ve girişimlere hibe sağlar.
    * **%5 Zcash Foundation:** ECC'den bağımsız, ağın yönetişimini, altyapısını ve benimsenmesini destekleyen kâr amacı gütmeyen vakıf.

**Ekonomik Etki:** Bu model, Zcash'in (Bitcoin'in aksine) sürekli olarak birinci sınıf kriptograflar ve mühendisler tarafından fonlanmasını sağlar. Ancak bazı eleştirmenler, bunu "kurucu vergisi" olarak adlandırarak projenin merkeziyetsizliğine gölge düşürdüğünü savunur.

---

## Gelecek Beklentisi: Fırsatlar ve Engeller

Zcash'in geleceği, onun üstün teknolojisi ile pazarın ve düzenleyicilerin sert gerçekleri arasındaki mücadeleye bağlıdır.

### Projenin Güçlü Yanları (Potansiyel):
1.  **Sınıfının En İyisi Kriptografi:** zk-SNARKs ve "Halo" yükseltmesi, Zcash'i kriptografik olarak piyasadaki en gelişmiş projelerden biri yapar. ZK-rollup'ların (L2) popülerleşmesi, bu teknolojinin ne kadar değerli olduğunu kanıtlamıştır.
2.  **Sürdürülebilir Finansman:** %20 Geliştirme Fonu, projenin on yıllar boyunca (rakiplerinin aksine) geliştirilmeye devam etmesini ve pazar koşullarından (ayı piyasaları) daha az etkilenmesini sağlar.
3.  **Proof-of-Stake Geçişi (Planlanan):** ECC, Zcash'i PoW'dan Proof-of-Stake'e (PoS) geçirmek için bir teklif (ZIP 1024) sundu. Eğer bu gerçekleşirse, ağ enerji verimli hale gelecek, ZEC sahipleri staking geliri elde edebilecek ve gizli işlemler (shielded transactions) daha kolay ve ölçeklenebilir hale gelebilecektir.

### Projenin Önündeki Engeller (Zorluklar):
1.  **Regülasyon Baskısı (En Büyük Engel):** Zcash, "gizlilik coini" olarak damgalanmıştır. Bu durum, regülatörlerin (Mali Eylem Görev Gücü - FATF) baskısıyla, **Binance (Avrupa), OKX, Bittrex** ve diğer birçok büyük borsadan **kaldırılmasına (delist edilmesine)** yol açmıştır. Bu, projenin likiditesini, erişilebilirliğini ve benimsenmesini öldüren birincil sorundur.
2.  **"Opsiyonel Gizlilik" Paradoksu:** Gizlilik *isteğe bağlı* olduğunda, çoğu insan (kolaylık veya borsa uyumluluğu için) T-adresleri kullanır. Bu, "gizlilik setini" (içinde saklanabileceğiniz kalabalığı) küçültür. Monero'nun "varsayılan olarak gizli" (mandatory privacy) olması, bu açıdan daha güçlü bir gizlilik modeli olarak görülür.
3.  **PoS Geçişi Belirsizliği:** PoS'a geçiş teklifi, projenin geleceği için kritik olsa da, aynı zamanda topluluğu bölen ve madencileri karşısına alan büyük bir teknik ve politik zorluktur. Bu geçişin nasıl ve ne zaman olacağı belirsizdir.

---

## Sonuç

Zcash (ZEC), kriptografik olarak en gelişmiş ve en önemli gizlilik projelerinden biridir. "Güvenilir kurulum" sorununu Halo ile çözerek teknolojisini mükemmelleştirmiştir ve sürdürülebilir bir finansman modeline sahiptir.

Ancak projenin "gerçekliği", teknolojisinin değil, **algısının** kurbanı olmasıdır. "Gizlilik coini" etiketi, ona en çok ihtiyaç duyulan (borsalar ve ana akım benimseme) yerlerden dışlanmasına neden olmaktadır.

Zcash'in gelecekteki başarısı, bu düzenleyici fırtınayı atlatmasına, "opsiyonel gizliliğin" benimsenmesini artırmasına ve (muhtemelen) PoS'a başarılı bir geçiş yapmasına bağlıdır.