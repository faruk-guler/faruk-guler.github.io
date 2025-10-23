---
layout: post
title: Monero (XMR) Nedir? Gerçek Gizlilik için Yaratılan Kripto Para
date: 2022-10-15 18:10
tag: [Blockchain, Gizlilik]
by: faruk-guler
comments: true
categories: [Blockchain]
---

![Monero (XMR) Logosu](https://farukguler.com/assets/post_images/xmr-secret-home.JPG) Monero (XMR), 2014 yılında piyasaya sürülen, temel amacı **tam gizlilik, anonimlik ve takip edilemezlik** olan, merkeziyetsiz bir kripto para birimidir. Bitcoin ve diğer birçok kripto paranın aksine, Monero'da işlemler herkese açık bir defterde (blockchain) kaydedilir, ancak bu kayıtlardaki **gönderici, alıcı ve miktar bilgileri tamamen gizlenir.**

Bitcoin'de tüm işlemler "şeffaftır" (pseudonymous - takma adlı). Bir cüzdan adresinin kime ait olduğunu bilmeseniz de, o adresin tüm işlem geçmişini ve bakiyesini herkes görebilir.

Monero'da ise bu mümkün değildir. Monero, gizliliği bir "seçenek" olarak sunmaz; **gizlilik varsayılan ve zorunludur.**

---

## Monero'nun Gizlilik Teknolojisi Nasıl Çalışır?

Monero, "Görünmezlik Üçgeni" olarak adlandırılabilecek üç temel kriptografik teknolojiyi bir arada kullanır:

### 1. Ring Signatures (Halka İmzalar): Göndericiyi Gizler

Bir Monero işlemi gönderdiğinizde, sizin dijital imzanız, blockchain'den alınan geçmişteki rastgele "sahte" imzalarla (decoys/sahte katılımcılar) karıştırılır ve bir "halka" oluşturulur.

* **Sonuç:** Ağ, bu "halka" içindeki bir grubun işlemi imzaladığını bilir, ancak **tam olarak hangi üyenin** işlemi gerçekleştirdiğini ayırt edemez.
* **Analoji:** Bir grup insanın arasına karışıp kalabalığın içinden bir mektup göndermek gibidir. Mektubun o gruptan geldiği bellidir, ancak kimden geldiği belli değildir.

### 2. Stealth Addresses (Gizli Adresler): Alıcıyı Gizler

Monero'da alıcının herkese açık bir "ana adresi" olsa da, fonlar asla doğrudan bu adrese gönderilmez.

* Gönderici, her bir işlem için alıcının ana adresini kullanarak **benzersiz ve tek kullanımlık** bir "gizli adres" (stealth address) oluşturur.
* Para bu tek kullanımlık adrese gönderilir. Sadece alıcı, kendi "özel görüntüleme anahtarı" (private view key) ile blockchain'i tarayarak bu tek kullanımlık adresin kendisine ait olduğunu anlayabilir.
* **Sonuç:** Blockchain'e dışarıdan bakan hiç kimse, hangi işlemin hangi alıcıya gittiğini veya farklı işlemlerin aynı alıcıya gidip gitmediğini anlayamaz.

### 3. RingCT (Ring Confidential Transactions): Miktarı Gizler

Monero'nun gizliliğini tamamlayan son parça da miktarın gizlenmesidir.

* RingCT, işlem miktarlarını kriptografik olarak şifreler.
* Ağ, **sıfır bilgi kanıtlarına (zero-knowledge proofs)** benzer bir yöntem kullanarak, gönderilen ve alınan miktarları *görmeden* matematiksel olarak işlemin geçerli olduğunu (örn. `girdi >= çıktı` olduğunu ve yeni para yaratılmadığını) doğrulayabilir.
* **Sonuç:** Sizin cüzdanınızda ne kadar XMR olduğunu veya bir başkasına ne kadar XMR gönderdiğinizi sizden başka kimse bilemez.

---

## Konsensüs ve Madencilik: RandomX

Monero, ağ güvenliği için **Proof-of-Work (PoW)** konsensüs mekanizmasını kullanır. Ancak Bitcoin'in SHA-256 algoritmasından farklı olarak, Monero **RandomX** adı verilen özel bir algoritma kullanır.

### ASIC Direnci ve Merkeziyetsizlik

* **RandomX**, özellikle genel amaçlı **CPU'lar (işlemciler)** üzerinde verimli çalışmak üzere tasarlanmıştır.
* Amacı, **ASIC** (Uygulamaya Özel Entegre Devre) adı verilen pahalı ve özel madencilik cihazlarına karşı **dirençli** olmaktır.
* Bitcoin'de ASIC cihazları madenciliği domine ederek büyük madencilik havuzları lehine merkezileşmeye yol açmıştır.
* Monero ise RandomX sayesinde, sıradan bir ev bilgisayarı işlemcisiyle bile madencilik yapılabilmesine olanak tanıyarak madencilik gücünü merkeziyetsiz tutmayı hedefler.

---

## XMR Tokenomiği ve "Tail Emission" (Kuyruk Emisyonu)

XMR, Monero ağındaki tüm işlemler için (gizli transferler) ödeme yapmak ve madencileri ödüllendirmek için kullanılan yerel para birimidir.

Monero'nun tokenomiğinde en dikkat çekici özellik "Halving" (yarılanma) olmamasıdır. Bunun yerine, "kuyruk emisyonu" (tail emission) adı verilen benzersiz bir modeli vardır:

* **Sürekli Blok Ödülü:** Monero'nun ana arz eğrisi (blok ödüllerinin zamanla azalması) Mayıs 2022 civarında sona erdi.
* Bitcoin'in aksine, Monero'da blok ödülü **asla sıfıra düşmez.**
* Bu tarihten sonra, ağ **sonsuza kadar** her yeni blok için madencilere sabit **0.6 XMR** ödül vermeye başlamıştır.

### Kuyruk Emisyonunun Amacı Nedir?

Bu tasarımın iki temel amacı vardır:

1.  **Kalıcı Güvenlik Teşviki:** Madencilerin ağı güvence altına almaları için her zaman istikrarlı bir teşvik (blok ödülü) olmasını sağlar. Ağın güvenliği, yalnızca değişken olan işlem ücretlerine (fee market) bağımlı kalmaz.
2.  **Dinamik Blok Boyutu:** Madenciler her zaman minimum bir ödül alacaklarını bildikleri için, işlem ücretleri düşük olsa bile ağı çalıştırmaya devam ederler.

Bu model, sonsuza kadar devam eden düşük ve öngörülebilir bir enflasyon oranı (yıllık %1'in altına düşen) yaratır.

---

## Zorluklar: Regülasyon ve Borsa Delistleri

Monero'nun sunduğu rakipsiz gizlilik, onu aynı zamanda yasal zorlukların da hedefi haline getirmiştir.

* **Yasa Dışı Kullanım:** Takip edilemez doğası nedeniyle Monero, fidye yazılımları (ransomware) ve darknet marketleri gibi yasa dışı faaliyetlerde tercih edilen bir para birimi olmuştur.
* **Regülasyon Baskısı (KYC/AML):** Dünyanın dört bir yanındaki düzenleyici kurumlar, "Müşterini Tanı" (KYC) ve "Kara Para Aklamayı Önleme" (AML) yasalarına uymaları için borsalara baskı yapmaktadır. Monero'nun gizliliği, borsaların bu yasalara uymasını teknik olarak imkansız hale getirdiği için, Binance, OKX ve Kraken (İngiltere/İrlanda) gibi birçok büyük borsa Monero'yu (XMR) listelerinden çıkarmak (delist) zorunda kalmıştır.

## Sonuç

Monero, "akıllı sözleşme platformu" veya "DeFi ekosistemi" olma iddiasında değildir. Tek bir şeye odaklanmıştır: Bitcoin'in ilk vaadi olan, ancak tam olarak yerine getiremediği **gerçek dijital nakit (P2P electronic cash)** olmak.

Sunduğu güçlü ve varsayılan gizlilik özellikleri onu teknik olarak en başarılı kripto paralardan biri yaparken, aynı özellikler onu düzenleyicilerin hedefi haline getirmiş ve ana akım benimsemesinin önündeki en büyük engel olmuştur.