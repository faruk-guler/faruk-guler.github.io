---
layout: post
title: Arweave (AR) Nedir? İnternet'in Kalıcı Hafızası
date: 2023-7-12 18:30
by: faruk-guler
comments: true
categories: [Blockchain]
---

![Arweave (AR) Logosu](https://farukguler.com/assets/post_images/Arweave.jpg) Arweave (AR), **geleneksel** bir blockchain'den ziyade, verileri **kalıcı olarak** depolamak için tasarlanmış yeni bir tür depolama protokolüdür. O, "akıllı sözleşmelerin", web sitelerinin, dApp'lerin ve değerli verilerin yüzlerce, hatta binlerce yıl boyunca **değişmeden ve sansürlenemez** bir şekilde saklanmasını sağlayan **merkeziyetsiz bir kalıcı depolama ağıdır.**

Basitçe söylemek gerekirse, Arweave, internetin kaybolan veya değişen verilerine karşı bir "dijital İskenderiye Kütüphanesi" veya "zaman kapsülü" görevi görür. **AR**, bu ağa veri yüklemek için **bir kerelik** ödeme yapmak ve ağı güvence altına alan madencileri teşvik etmek için kullanılan yerel (native) kripto para birimidir.

Arweave'in misyonu, kripto endüstrisinin ve internetin en temel zorluklarından biri olan **"Kalıcılık Problemini"** çözmektir.

---

## "Kalıcılık Problemi" Nedir?

Günümüz interneti (Web2), doğası gereği son derece kırılgandır. Veriler kalıcı değildir; merkezi sunucularda barındırılır ve bu sunucuların sahiplerine (şirketler, hükümetler) bağımlıdır.

* Bir haber sitesi kapandığında, **arşivindeki tüm haberler kaybolur.**
* Bir şirketin API'si değiştiğinde, **ona bağlanan tüm uygulamalar bozulur.**
* Merkezi bir sunucu (örn. AWS) çöktüğünde, **ona bağlı binlerce web sitesi erişilemez hale gelir.**
* En önemlisi: "Sayfa Bulunamadı" (404 Hatası), internetin varsayılan durumudur. Veriler sürekli olarak kaybolur, bozulur veya sansürlenir.

**Asıl Problem:** Blockchain'ler bile (NFT'ler dahil) genellikle bu sorundan muzdariptir. Birçok NFT'nin *görüntüsü* (JPEG/PNG dosyası), blockchain üzerinde değil, merkezi bir sunucuda durur. Eğer o sunucu kapanırsa, NFT'niz "boş bir çerçeveye" dönüşür. Veri kalıcı değildir.

---

## Arweave'in Çözümü: Blockweave ve Depolama Fonu

Arweave, "verileri sonsuza dek saklama" vaadini üç temel teknoloji ile çözer:

### 1. Blockweave (Blok Dokuması)
Arweave, "blockchain" (blok zinciri) yerine **"blockweave"** (blok dokuması) adı verilen benzersiz bir veri yapısı kullanır.
* Bir blockchain'de, her yeni blok *sadece bir önceki bloğa* bağlanır.
* Bir blockweave'de ise, her yeni blok *sadece bir önceki bloğa DEĞİL*, aynı zamanda ağın geçmişinden **rastgele seçilmiş bir eski bloğa (recall block)** da bağlanır.

Bu yapı, madencileri sadece yeni işlemleri değil, aynı zamanda eski verileri de depolamaya zorlar.

### 2. Proof of Access (PoA - Erişim Kanıtı)
Arweave'in konsensüs mekanizması (PoW'un bir çeşidi) madencilerin *sadece* işlem gücüne değil, aynı zamanda **rastgele eski verilere ne kadar hızlı eriştiklerine** de dayanır. Bir sonraki bloğu çıkarmak için, madencinin o "rastgele eski bloğa" (recall block) sahip olduğunu ve ona anında erişebildiğini kanıtlaması gerekir.

Bu, madencileri **daha fazla veri depolamaya** teşvik eder. Ne kadar çok veri depolarlarsa, bir sonraki bloğu bulma ve AR token kazanma şansları o kadar artar.

### 3. Storage Endowment (Depolama Fonu)
Bu, Arweave'in ekonomik modelinin kalbidir. Bir veriyi Arweave'e yüklemek için **bir kerelik** bir AR ücreti ödersiniz.
* Bu ücretin küçük bir kısmı mevcut madencilere gider.
* Ancak ücretin **büyük bir kısmı**, faiz benzeri bir sistemle çalışan bir **"Depolama Fonu"na** (Endowment) aktarılır.
* Bu fon, depolama maliyetlerinin zamanla düşeceği varsayımına dayanarak (teknoloji geliştikçe depolama ucuzlar), gelecekteki madencilere yüzlerce yıl boyunca o veriyi saklamaları için **sürdürülebilir bir ödeme** yapmayı garanti eder.

Bu model, "bir kez öde, sonsuza dek sakla" felsefesini ekonomik olarak mümkün kılar.

---

## Arweave'in Hizmetleri: Sadece Arşivleme Değil

Arweave, verileri "dondurmaktan" çok daha fazlasını sunar:

1.  **Permaweb (Kalıcı Web):** Blockweave'in üzerinde yer alan, insan tarafından okunabilir bir katmandır. Permaweb, **sonsuza kadar yaşayacak** web siteleri, bloglar, dApp'ler ve uygulamalar oluşturmanıza olanak tanır. Bir kez yüklendikten sonra asla kapatılamaz, değiştirilemez veya sansürlenemez.
2.  **Akıllı Sözleşmeler (SmartWeave):** Arweave, Ethereum'dan farklı bir akıllı sözleşme modeli kullanır. Hesaplama, ağın tamamı (madenciler) tarafından değil, **kullanıcının cihazı (client-side)** tarafından yapılır ("lazy evaluation" - tembel değerlendirme). Bu, çok daha ölçeklenebilir ve ucuz sözleşme etkileşimlerine olanak tanır.
3.  **Kalıcı NFT Depolaması:** NFT'lerin sadece "linkini" değil, *bizzat sanat eserinin kendisini (medya dosyasını)* zincir üzerinde kalıcı olarak depolamak için endüstri standardı haline gelmiştir.
4.  **Veri Erişilebilirlik (DA) Katmanı:** Solana (SOL) gibi yüksek hızlı blockchain'ler, devasa işlem geçmişlerini kalıcı olarak depolamak için Arweave'i bir "harici sabit disk" (veri erişilebilirlik katmanı) olarak kullanır.
5.  **Merkeziyetsiz Sosyal Medya:** Sansüre dayanıklı blog platformları, sosyal ağlar ve forumlar (Permaweb üzerinde).
6.  **Gerçek Dünya Varlıkları (RWA):** Tapu kayıtları, yasal belgeler, akademik makaleler gibi değişmemesi kritik olan belgelerin kalıcı arşivi.
7.  **Tarihsel Arşivleme:** Gazetecilik arşivi, tarihi belgeler veya "İnternet Arşivi" (Internet Archive) gibi girişimler için kalıcı bir yedek.

---

## AR Token'ı Ne İşe Yarar? (Ekonomik Kalıcılık)

**AR**, Arweave ekosisteminin ekonomik motorudur ve "sonsuz depolama" vaadini finanse eder. Maksimum arzı **66 Milyon AR** ile sınırlandırılmıştır.

1.  **Depolama İçin Ödeme (Tekel):**
    * Arweave ağına *herhangi bir* veri (web sitesi, NFT, belge, arşiv) yüklemek isteyen herkes, ödemeyi **yalnızca AR token** ile yapmak zorundadır.
    * Bu, "bir kerelik" bir ödemedir ve verinin boyutuna göre hesaplanır.

2.  **Depolama Fonu (Endowment) Teminatı:**
    * Kullanıcıların ödediği AR token'larının büyük çoğunluğu, ağın gelecekteki güvenliğini ve veri saklama maliyetlerini karşılamak için **Depolama Fonu**'na kilitlenir.
    * Bu, ağın dolar bazındaki depolama maliyeti düşse bile (ki teknoloji ilerledikçe düşer), madencilerin AR bazında teşvik edilmeye devam etmesini sağlar.

3.  **Madencilik Teşvikleri (Güvenlik):**
    * Madenciler, ağa yeni bloklar eklemek ve Proof of Access (Erişim Kanıtı) konsensüsüne katılarak eski verileri depoladıklarını kanıtlamak için **AR token** ile ödüllendirilir.
    * Bu, verileri *silmeyi* ekonomik olarak mantıksız, *saklamayı* ise son derece kârlı hale getirir.

---

## Arweave vs. Filecoin (FIL): Temel Fark

Arweave sıklıkla Filecoin ile karıştırılır, ancak ikisi temelde farklı amaçlara hizmet eder:

* **Filecoin (FIL):** "Airbnb" benzeri bir *depolama kiralama* pazarıdır. Kullanıcılar, verilerini belirli bir süre (örn. 6 ay, 1 yıl) saklamak için madencilerle anlaşır ve **sürekli ödeme** yaparlar. Ödemeyi durdurursanız, veriniz silinir. Bu, geçici ve "sıcak" depolama (Dropbox, AWS S3 alternatifi) için uygundur.
* **Arweave (AR):** Bir "müze" veya "kütüphane" gibidir. Veriyi kalıcı olarak arşivlemek için **bir kerelik ücret** ödersiniz. Bu, "soğuk" depolama ve değişmezlik (arşivleme) için uygundur.

---

## Sonuç

Arweave (AR), internetin nasıl çalıştığına dair temel bir sorunu ele alan, son derece iddialı bir projedir. "Bir kez öde, sonsuza dek sakla" modeli ve Blockweave/PoA teknolojisi ile verilerin geçiciliğine karşı kalıcı bir çözüm sunar.

Sadece bir depolama protokolü değil, aynı zamanda sansüre dayanıklı bir "Kalıcı Web" (Permaweb) ve diğer blockchain'ler için kritik bir Veri Erişilebilirlik (DA) katmanı olarak Arweave, Web3 altyapısının temel taşlarından biri olma potansiyeline sahiptir.