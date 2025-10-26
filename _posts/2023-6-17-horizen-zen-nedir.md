---
layout: post
title: Horizen (ZEN) Nedir? Gizlilik ve Ölçeklenebilirliğin Kesişimi
date: 2023-6-17 17:55
by: faruk-guler
comments: true
categories: [Blockchain]
---

![Horizen (ZEN) Logosu](https://farukguler.com/assets/post_images/zen.webp) Horizen (ZEN), kripto dünyasındaki en eski ve en teknik projelerden biridir, ancak misyonu zamanla evrim geçirmiştir. Başlangıçta bir "gizlilik coini" (privacy coin) olarak (ZenCash adıyla) yola çıksa da, bugün kendini **"merkeziyetsiz uygulamalar (dApps) için ölçeklenebilir bir ekosistem ve gizlilik platformu"** olarak tanımlamaktadır.

Horizen'in mimarisi iki temel direk üzerine kuruludur:
1.  **Opsiyonel Gizlilik:** ZK-SNARKs teknolojisini kullanan, Bitcoin benzeri güvenli bir ana (main) blockchain.
2.  **Sınırsız Ölçeklenebilirlik:** **Zendoo** adını verdiği, herkesin kendi özel (veya halka açık) blockchain'ini (sidechain) oluşturmasına izin veren devrim niteliğinde bir protokol.

**ZEN**, bu ekosistemin yerel (native) varlığıdır. Proof-of-Work madencileri, ağı güvence altına alan binlerce "Node" (düğüm) ve Zendoo platformu için "yakıt" olarak kullanılır.

---

## Horizen'in Çözmeye Çalıştığı İkili Problem

Horizen, blockchain dünyasının iki temel problemini aynı anda çözmeyi hedefler:

1.  **Gizlilik Problemi:** Bitcoin ve Ethereum gibi halka açık defterlerde *tüm işlemler* (gönderen, alıcı, miktar) herkes tarafından görülebilir. Bu, kurumsal veya kişisel finansal gizlilik için felakettir.
2.  **Ölçeklenebilirlik ve Esneklik Problemi:** Ethereum gibi "tek boyutlu" (monolithic) L1'lerde, tüm uygulamalar aynı kaynaklar (gas ücretleri, işlem hızı) için rekabet eder. Bu, ağı tıkar ve geliştiricileri kısıtlar.

---

## Horizen'in Çift Yönlü Çözümü: Gizlilik ve Zendoo

Horizen bu iki sorunu ana ağ ve yan zincirler olarak ayırır:

### 1. Ana Zincir (Mainchain): Opsiyonel Gizlilik
Horizen'in ana ağı, Bitcoin gibi Proof-of-Work (PoW) ile güvence altına alınır ancak ZCash'ten miras aldığı **ZK-SNARKs** teknolojisi sayesinde gelişmiş gizlilik sunar.

Kullanıcıların iki seçeneği vardır:
* **t-Adresleri (Transparent):** Bitcoin gibi şeffaf adresler. İşlemler herkes tarafından görülebilir.
* **z-Adresleri (Shielded):** ZK-SNARKs kullanan gizli adresler. Gönderen, alıcı ve miktar tamamen gizlenir.

Bu **"opsiyonel gizlilik"**, projenin hem şeffaflık hem de gizlilik ihtiyacına cevap vermesini sağlar (ancak bu durum, onu regülasyonların hedefi olmaktan kurtaramamıştır).

### 2. Zendoo: Gerçek Ölçeklenebilirlik Çözümü
Horizen'in "gelecek beklentisi" ve asıl inovasyonu burasıdır. **Zendoo**, herkesin Horizen ana ağına bağlı kendi **yan zincirini (sidechain)** oluşturmasına izin veren bir protokoldür.

* **Zendoo Nasıl Çalışır?** Tıpkı Polkadot (Parachain) veya Cosmos (Zones) gibi, ancak Bitcoin benzeri bir PoW ana zincirinin güvenliğiyle.
* **Özelleştirme:** Geliştiriciler bu yan zincirleri istedikleri gibi tasarlayabilirler: Farklı bir konsensüs (örn. Proof-of-Stake), farklı token'lar, yüksek hız veya tam gizlilik (veya tam şeffaflık) seçebilirler.
* **Güvenlik:** Bu yan zincirler, yaptıkları işlemlerin "doğruluğunu kanıtlayan" özetleri Horizen ana zincirine gönderir. Böylece, bir PoW ağının tam güvenliğinden faydalanırlar.

Bu mimari, Horizen'in ana zincirini (L1) yavaşlatmadan **sınırsız sayıda** uygulamanın (dApp) paralel olarak çalışmasına olanak tanır.

---

## Ağın Omurgası: Secure Nodes ve Super Nodes

Horizen'in merkeziyetsizliği, dünyadaki en geniş düğüm (node) ağlarından biri tarafından sağlanır. Bu ağ iki katmanlıdır ve ZEN tokenomiğinin temelini oluşturur:

1.  **Secure Nodes (Güvenli Düğümler):** Ağın temel katmanıdır (şu anda ~30.000+ adet). Ağı dinler, tam bir kopyasını tutar ve şifreli iletişimi sağlarlar. Çalıştırmak için **42 ZEN** kilitlenmesi gerekir.
2.  **Super Nodes (Süper Düğümler):** Daha güçlü makinelerdir (şu anda ~3.000+ adet). Asıl görevleri **Zendoo yan zincirlerini (sidechains)** barındırmak ve doğrulamaktır. Çalıştırmak için **500 ZEN** kilitlenmesi gerekir.

Bu düğümler, ağı güvence altına aldıkları için **blok ödüllerinden pay alırlar.**

---

## ZEN Token'ı: Token Arzı, Ekonomi ve Gelecek Beklentisi

ZEN'in tokenomisi, Bitcoin'in kıt arz felsefesini, node operatörlerini ve geliştirici hazinesini içeren benzersiz bir modelle birleştirir.

### Token Arzı ve Dağılımı (Tüm Gerçeklik)

* **Maksimum Arz:** **21.000.000 ZEN** (Tıpkı Bitcoin gibi, sert bir şekilde sınırlandırılmıştır).
* **Konsensüs:** Proof-of-Work (PoW).
* **Kritik Gerçek: Blok Ödülü Dağılımı**
    ZEN'in token ekonomisi, her yeni blokta çıkarılan ödülün nasıl paylaşıldığına dayanır. Bu, projenin hem en güçlü hem de en çok eleştirilen yönüdür:
    * **%60 Madenciler (Miners):** Ağı güvence altına alan PoW madencilerine gider.
    * **%10 Secure Nodes:** Ağı destekleyen güvenli düğüm operatörlerine dağıtılır.
    * **%10 Super Nodes:** Zendoo yan zincirlerini çalıştıran süper düğüm operatörlerine dağıtılır.
    * **%20 Horizen Hazinesi (Treasury):** Doğrudan projenin geliştirilmesi, pazarlaması ve ekosistem yatırımları için Horizen Vakfı'na (ve ilişkili kuruluşlara) gider.

**Ekonomik Etki:** Bu model, arzın %20'sinin sürekli olarak node operatörlerine (Secure + Super) dağıtılmasını sağlar. Bu durum, insanları ZEN satın alıp düğüm çalıştırmak (ve böylece ZEN'i kilitlemek) için teşvik eder. Ancak **%20'lik Hazine payı**, bir PoW projesi için "kurucu vergisi" olarak görüldüğünden toplulukta sıkça eleştirilen yüksek bir orandır.

### ZEN'in Kullanım Alanları:
1.  **Değer Saklama ve Transfer:** Bitcoin gibi (t-adres) veya Monero gibi (z-adres) kullanılabilir.
2.  **Düğüm Kilitleme (Staking):** Secure (42 ZEN) veya Super (500 ZEN) node çalıştırmak için kilitlenir. Bu, dolaşımdaki arz üzerinde sürekli bir talep/baskı yaratır.
3.  **Zendoo Platformu Yakıtı:** Geliştiricilerin Zendoo üzerinde kendi yan zincirlerini oluşturmaları ve ana ağ ile iletişim kurmaları (doğrulama işlemleri) için ZEN cinsinden ücret ödemeleri gerekir.

### Gelecek Beklentisi ve "Acı Gerçekler"

Horizen'in gelecekteki başarısı, iki büyük ve çelişkili faktöre bağlıdır:

**1. Negatif Beklenti (En Büyük Risk: Regülasyon):**
* **Gerçeklik:** Horizen, "opsiyonel" olmasına rağmen regülatörler tarafından **"Gizlilik Coini" (Privacy Coin)** olarak damgalanmıştır.
* **Acı Gerçek:** Bu damga nedeniyle Horizen (ZEN), Monero (XMR) ve ZCash (ZEC) ile birlikte **Binance (Avrupa), OKX, Bittrex** gibi dünyanın en büyük borsalarının çoğundan **kaldırılmıştır (delist edilmiştir).**
* **Etkisi:** Bu "delist" kararları, projenin likiditesini, erişilebilirliğini ve benimsenmesini felce uğratan en büyük engeldir. Bir projenin teknolojisi ne kadar iyi olursa olsun, insanlar ona kolayca erişemezse, değer kazanması çok zordur.

**2. Pozitif Beklenti (Teknolojik Kurtuluş: Zendoo):**
* **Gerçeklik:** Horizen'in 10 yıllık geleceği, "ZEN bir gizlilik coinidir" algısını kırıp **"Horizen, ZK-SNARKs teknolojisiyle güçlendirilmiş bir yan zincir (sidechain) platformudur"** algısını oturtmasına bağlıdır.
* **Potansiyel:** Zendoo, teknik olarak Polkadot veya Cosmos'a güçlü bir rakiptir. Özellikle gizliliğe ihtiyaç duyan kurumsal (B2B) veya merkeziyetsiz uygulamalar için (örneğin özel oylama sistemleri, gizli DeFi) mükemmel bir altyapı sunabilir.
* **Gelecek:** Eğer Horizen ekibi, Zendoo'nun bu teknolojik üstünlüğünü kullanarak *borsa listelemelerinden bağımsız* bir geliştirici ve dApp ekosistemi yaratmayı başarırsa, proje hayatta kalabilir ve büyüyebilir.

---

## Sonuç

Horizen (ZEN), teknik olarak piyasadaki en sofistike projelerden biridir. 21 milyonluk sert arz sınırı ve binlerce node tarafından desteklenen ağı güçlüdür.

Ancak proje, **teknolojik potansiyeli** ile **regülasyon gerçekliği** arasında sıkışmış durumdadır.

Horizen'in "gerçekliği" şudur: Artık basit bir gizlilik coini değildir; gizliliği bir *özellik* olarak kullanan karmaşık bir L1 yan zincir platformudur. Ancak hayatta kalması ve yatırımcısını kazandırması, **"gizlilik coini" lanetinden** kurtulup Zendoo platformunun somut bir benimsenme (adoption) görmesine bağlıdır.