---
layout: post
title: Uniswap (UNI) Nedir? Merkeziyetsiz Finansın (DeFi) Temel Taşı
date: 2022-10-15 19:45
by: faruk-guler
comments: true
categories: [Blockchain]
---

![Uniswap (UNI) Logosu](https://farukguler.com/assets/post_images/uni-swap.jpg) Uniswap (UNI), bir şirket veya geleneksel bir borsa (Binance veya BIST gibi) **değildir**. O, Ethereum blockchain'i üzerinde çalışan, **tamamen merkeziyetsiz bir borsa (DEX)** protokolüdür.

Uniswap'ın misyonu, herhangi bir aracıya, "listeleme" iznine veya kimlik doğrulamasına (KYC) ihtiyaç duymadan, **herkesin** herhangi bir Ethereum (ERC-20) token'ını bir diğeriyle **takas etmesine (swap)** olanak tanımaktır.

Protokolün devrim niteliğinde olmasının nedeni, "emir defterli" (order book) sistemi terk edip, **"Otomatik Piyasa Yapıcı" (Automated Market Maker - AMM)** adı verilen bir modeli icat etmesidir. **UNI**, bu protokolün yerel (native) **yönetişim (governance)** token'ıdır ve sahiplerine protokolün geleceğinde söz hakkı verir.

---

## "Borsa Problemi" ve Uniswap'in Çözümü

Geleneksel borsalar (hem kripto hem de hisse senedi) iki temel sorunla boğuşur:

1.  **Merkeziyet ve Saklama (Custody):** Varlıklarınızı (coin veya hisse) alıp satmak için borsanın "cüzdanına" yatırmanız gerekir. Borsa hack'lenirse, iflas ederse veya hesabınızı dondurursa, **tüm paranızı kaybedersiniz.** (Örn: FTX, Mt. Gox).
2.  **Emir Defteri (Order Book) ve Likidite:** Alım-satım, alıcıların (örn. 100 TL'den 10 adet) ve satıcıların (örn. 101 TL'den 5 adet) emirlerinin eşleşmesine dayanır. Yeni veya az bilinen bir varlık için yeterli alıcı/satıcı (piyasa yapıcı) yoksa, o varlık alınıp satılamaz (likit değildir).

**Uniswap'in AMM Çözümü:**
Uniswap, alıcı ve satıcıları eşleştirmek yerine, **"Likidite Havuzları"** adı verilen devasa dijital varlık havuzları yaratır.

* **Likidite Havuzu Nedir?** Herhangi bir kullanıcı (Likidite Sağlayıcı - LP) tarafından, eşit değerde iki varlığın (örn. 1 ETH ve 3.000 USDC) kilitlendiği bir akıllı sözleşmedir.
* **Nasıl Çalışır?** Bir kullanıcı ETH satıp USDC almak istediğinde, bir "satıcı" aramaz. Bunun yerine, ETH'sini ETH/USDC havuzuna atar ve havuzdan karşılığında USDC alır.
* **Fiyat Nasıl Belirlenir?** Fiyat, $x \cdot y = k$ adı verilen basit bir matematik formülüne göre **otomatik** olarak belirlenir. (Havuzdaki 'x' token'ı azalırsa, fiyatı 'y' token'ına göre artar).

Bu sistem, en bilinmeyen token için bile, havuzda likidite olduğu sürece *her zaman* bir alım/satım fiyatı olmasını garanti eder.

---

## Uniswap'in Ayırt Edici Özellikleri

1.  **Otonom ve Değişmez (Immutable):**
    * Uniswap protokolü, bir kez Ethereum ağına yüklendikten sonra **durdurulamaz, değiştirilemez veya sansürlenemez** bir dizi akıllı sözleşmedir. Kurucuları (Uniswap Labs) istese bile protokolü kapatamaz.

2.  **İzinsiz (Permissionless):**
    * Herhangi bir token'ı listelemek için kimseden izin almanıza gerek yoktur. Bir token oluşturup (örn. YENICOIN) karşısına ETH koyarak (YENICOIN/ETH havuzu) anında bir piyasa yaratabilirsiniz.

3.  **Saklamasız (Non-Custodial):**
    * Takas yaparken varlıklarınız asla Uniswap'in veya bir başkasının kontrolüne geçmez. Tüm işlemler doğrudan kendi kripto cüzdanınızdan (örn. MetaMask) gerçekleşir. Kontrol %100 sizdedir.

4.  **Konsantre Likidite (Uniswap v3):**
    * Protokolün en son ve en önemli devrimi budur. Eski AMM'lerde (v2), likiditeniz 0 dolardan sonsuza kadar tüm fiyat aralığına yayılırdı.
    * **Uniswap v3**, likidite sağlayıcıların sermayelerini **belirli fiyat aralıklarına "konsantre etmelerine"** olanak tanır. (Örn: "Benim 3.000 USDC'm sadece ETH fiyatı 2.900$ ile 3.100$ arasındayken kullanılsın.").
    * Bu, sermayeyi **4000 kat daha verimli** hale getirir ve Uniswap'i dünyanın en likit DEX'i yapar.

---

## UNI Token'ı: Token Arzı, Ekonomi ve Gelecek Beklentisi

UNI token'ının tokenomisi, diğer projelerin "utility" token'larından farklıdır. UNI, şu anda öncelikle bir **Yönetişim (Governance)** token'ıdır.

### Token Arzı ve Dağılımı

* **Maksimum Arz:** **1 Milyar UNI** (1.000.000.000).
* **Dağılım Modeli:** Bu 1 Milyar token'ın tamamı 4 yıllık bir süreç (Eylül 2020 - Eylül 2024) içinde dağıtılmak üzere planlandı. Kilitlerin tamamı Eylül 2024 itibarıyla açılmıştır.
    * **%60.00** Topluluğa (Bunun %15'i tarihi Airdrop ile, kalanı likidite madenciliği programları için hazineye ayrıldı).
    * **%21.26** Ekip üyelerine (4 yıl kilitli).
    * **%18.04** Yatırımcılara (4 yıl kilitli).
    * **%0.69** Danışmanlara (4 yıl kilitli).
* **Enflasyon:** 4 yıllık dağıtım süreci sona erdikten sonra (Eylül 2024), protokolün hazinesinin tükenmemesi ve uzun vadeli gelişimi fonlayabilmesi için **yıllık %2'lik kalıcı bir enflasyon** oranı başlamıştır. Bu oran da UNI sahipleri tarafından yönetişim yoluyla değiştirilebilir.
* **Gerçeklik:** Ekip ve yatırımcı kilitleri açık olduğu için teknik olarak 1 Milyar UNI'nin tamamı dolaşımdadır. Ancak, bu arzın **çok büyük bir kısmı** (%40+) protokolün kendi Hazinesinde (Treasury) kilitlidir ve sadece yönetişim oylarıyla harcanabilir.

### Mevcut Kullanım Alanı: Yönetişim

UNI sahipleri, Uniswap protokolünün geleceği hakkında oy kullanır. Bu oylamalar, protokolün hazinesindeki milyarlarca doların nasıl harcanacağı, hangi yeni zincirlerde (örn. Arbitrum, Polygon) konuşlandırılacağı veya en önemlisi **"Ücret Düğmesinin" (Fee Switch)** açılıp açılmayacağı gibi konuları kapsar.

### Gelecek Beklentisi ve "Fee Switch" (Asıl Değer Önerisi)

İşte UNI token'ının "gerçek" yatırım tezinin başladığı yer burasıdır.

* **Mevcut Durum:** Şu anda UNI token'ı, bir şirketin oy kullanma hakkı veren ama **temettü (kâr payı) vermeyen** hissesi gibidir. Protokol, yapılan takaslardan (swap) muazzam bir gelir (fee) yaratır, ancak bu gelirin **%100'ü** Likidite Sağlayıcılara (LP'ler) gider. UNI sahipleri protokolün gelirinden **sıfır pay** alır.
* **Potansiyel Gelecek (Fee Switch):** Protokolün kodunda, **"Ücret Düğmesi"** adı verilen teknik bir mekanizma mevcuttur. Bu "düğme" teknik olarak "kapalı" durumdadır.
* **Gelecek Beklentisi:** UNI için tüm uzun vadeli değer beklentisi, bu "Fee Switch"in UNI sahiplerinin oylarıyla **"açılmasına"** bağlıdır.
* **Eğer bu düğme açılırsa:** Protokol, elde ettiği işlem ücretlerinin bir kısmını (topluluk teklifleri genelde 1/10 ile 1/4 arası bir oranı tartışır) doğrudan **UNI token sahiplerine veya UNI stake edenlere** dağıtmaya başlar.
* **Etkisi:** Bu gerçekleştiği an, UNI, spekülatif bir yönetişim token'ı olmaktan çıkar; kripto dünyasının en kârlı ve en çok kullanılan protokollerinden birinin kârını (pasif gelir) doğrudan sahiplerine dağıtan, "temettü" ödeyen bir **"verim varlığına" (productive asset)** dönüşür.
* **Engel:** Bunun önündeki en büyük engel yasal belirsizliklerdir. ABD'deki SEC (Menkul Kıymetler ve Borsa Komisyonu) gibi düzenleyicilerin, bu tür bir mekanizmanın UNI'yi bir **"menkul kıymet" (security)** olarak sınıflandırmasından endişe edilmektedir. (Uniswap Labs, bu konuda SEC'den bir "Wells Notice" uyarısı almıştır).

---

## Sonuç

Uniswap, "bir gün kullanılacak" teorik bir proje değildir. O, **Merkeziyetsiz Finans'ın (DeFi) temel altyapısıdır.** Zaten çalışıyor, her gün milyarlarca dolarlık işlem hacmi yapıyor ve on binlerce token için birincil likidite merkezi konumunda.

UNI token'ının gelecekteki değeri ise tek bir "gerçekliğe" bağlıdır: Topluluğun, yasal riskleri göğüsleyerek **"Fee Switch"i açıp açmayacağı.** Eğer bu gerçekleşirse, UNI, kripto dünyasının en değerli "mavi çip" (blue-chip) varlıklarından biri olma potansiyeline sahiptir.