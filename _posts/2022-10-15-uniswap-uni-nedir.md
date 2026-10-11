---
layout: post
title: Uniswap (UNI) Nedir? Merkeziyetsiz Finansın (DeFi) Temel Taşı
date: 2022-10-15 19:45
last_modified_at: 2026-10-11 09:25
by: faruk-guler
comments: true
categories: [Blockchain]
---

![Uniswap (UNI) Logosu](https://farukguler.com/assets/post_images/uni-swap.jpg)

Uniswap (UNI), geleneksel bir finans şirketi veya Binance, Coinbase ve BIST gibi merkezi bir borsa **değildir**. O, Ethereum blokzinciri üzerinde çalışan, aracısız ve **tamamen merkeziyetsiz bir borsa (DEX - Decentralized Exchange)** protokolüdür.

Uniswap'in temel misyonu; herhangi bir merkezi otoriteye, borsa onayına, listeleme ücretine veya kimlik doğrulamasına (KYC) ihtiyaç duymadan, **dünyadaki herkesin** herhangi bir ERC-20 token'ını bir diğeriyle doğrudan kendi cüzdanından **takas etmesine (swap)** olanak tanımaktır.

Protokolün DeFi dünyasında çığır açmasının nedeni, geleneksel finansın asırlık "emir defteri" (order book) modelini bir kenara bırakıp, **"Otomatik Piyasa Yapıcı" (Automated Market Maker - AMM)** modelini popülerleştirerek kripto dünyasının ana akım standardı haline getirmesidir. **UNI** ise bu devasa likidite ekosisteminin yerel (native) **yönetişim ve değer** token'ıdır.

---

## 1. Geleneksel Borsalar vs. Uniswap: "Borsa Problemi" ve Çözüm

Geleneksel borsalar (hem kripto para borsaları - CEX hem de hisse senedi piyasaları) iki kronik problemle karşı karşıyadır:

1. **Merkeziyet ve Saklama Riski (Custody):**  
   İşlem yapabilmek için varlıklarınızı borsanın cüzdanına yatırmanız gerekir. Kripto dünyasındaki *"Not your keys, not your coins"* (Anahtarlar sizde değilse, koinler sizin değildir) ilkesinin hatırlattığı gibi; borsa hack'lenirse, iflas ederse veya fonlarınızı dondurursa tüm varlığınızı kaybedebilirsiniz (Örn: FTX, Mt. Gox, Thodex).
2. **Emir Defteri (Order Book) ve Likidite Sorunu:**  
   Alım-satımın gerçekleşmesi için alıcıların ve satıcıların belirledikleri fiyatların eşleşmesi gerekir. Yeni, niş veya hacmi düşük bir varlıkta yeterli alıcı/satıcı (piyasa yapıcı - market maker) yoksa derinlik oluşmaz; varlık likit olmadığı için alınıp satılamaz.

| Özellik | Merkezi Borsalar (CEX) | Uniswap (DEX) |
| :--- | :--- | :--- |
| **Varlık Kontrolü** | Borsada (Saklamalı / Custodial) | Kullanıcıda (Saklamasız / Non-Custodial) |
| **Kimlik Doğrulama (KYC)** | Zorunlu | Gerekmez (Anonim ve İzinsiz) |
| **Fiyat Mekanizması** | Emir Defteri (Alıcı/Satıcı Eşleşmesi) | AMM ($x \times y = k$ Likidite Havuzları) |
| **Sansür Riski** | Yüksek (Hesap dondurulabilir) | Yok (Akıllı sözleşmeler durdurulamaz) |
| **Listeleme Süreci** | Borsanın onayı ve ücret gerekir | Tamamen izinsiz (Herkes anında havuz açabilir) |

### Uniswap'in AMM Çözümü: Likidite Havuzları

Uniswap, alıcı ve satıcıları karşı karşıya getirmek yerine **Likidite Havuzları (Liquidity Pools)** modelini kullanır:

* **Likidite Havuzu Nedir?**  
  Herhangi bir kullanıcı (Likidite Sağlayıcı - LP), eşit piyasa değerine sahip iki farklı token'ı (örneğin 1 ETH ve 3.000 USDC) akıllı sözleşmeye kilitleyerek bir havuz oluşturur veya mevcut havuza likidite ekler.
* **Takas Nasıl Gerçekleşir?**  
  ETH satıp USDC almak isteyen bir yatırımcı, karşı tarafta bir "satıcı" beklemez. ETH'sini doğrudan ETH/USDC havuzuna gönderir ve sözleşmeden anında karşılık gelen USDC'yi çeker.
* **Fiyat Nasıl Belirlenir?**  
  Fiyat, Vitalik Buterin'in formüle ettiği ve Hayden Adams'ın Uniswap ile hayata geçirdiği **Sabit Ürün Formülü (Constant Product Formula)** ile belirlenir:
  
  $$\mathbf{x \times y = k}$$
  
  Burada $x$ birinci token'ın havuzdaki miktarını, $y$ ikinci token'ın miktarını, $k$ ise sabit bir değeri temsil eder. Havuzdan bir token çekildiğinde ($x$ azaldığında), $k$ değerinin sabit kalması için diğer token ($y$) artmak zorundadır; bu da arzı azalan token'ın fiyatının otomatik olarak yükselmesini sağlar.

Bu sayede, en yeni ve düşük hacimli bir token için bile havuzda likidite olduğu müddetçe kesintisiz işlem yapılabilir.

---

## 2. Uniswap'in Evrimi: v1'den v4'e, UniswapX ve Unichain

Uniswap sürekli gelişen bir ekosistemdir; her yeni sürümünde DeFi ekosisteminin teknik standartlarını yeniden belirlemiştir:

### Uniswap v1 (Kasım 2018)
* Hayden Adams tarafından Ethereum Vakfı'nın küçük bir hibesiyle geliştirildi.
* Yalnızca **ETH <-> ERC-20** çiftlerini destekliyordu. İki ERC-20 token'ını takas etmek için (örn. DAI -> USDC), işlem önce DAI -> ETH, ardından ETH -> USDC şeklinde iki aşamada yapılıyordu (yüksek gaz maliyeti).

### Uniswap v2 (Mayıs 2020)
* **Doğrudan ERC-20 <-> ERC-20** takas çiftleri getirildi (ETH köprüsü zorunluluğu kalktı).
* **Flaş Takaslar (Flash Swaps):** Kullanıcıların teminatsız kredi çekip aynı blok içinde arbitraj yapıp borcu geri ödemesine olanak sağlandı.
* **Fiyat Kahinleri (TWAP - Time Weighted Average Price):** Diğer DeFi protokollerinin fiyat manipülasyonuna uğramadan Uniswap fiyatlarını güvenle referans alabilmesi sağlandı.

### Uniswap v3 (Mayıs 2021) — Konsantre Likidite Devrimi
* **Konsantre Likidite (Concentrated Liquidity):** v2'de LP'lerin sermayesi 0 dolardan sonsuza kadar tüm fiyat aralığına dağılıyordu. v3 ile LP'ler sermayelerini **belirli fiyat aralıklarına** odaklayabilir hale geldi (Örn: "Benim sermayem sadece ETH 3.000$ ile 3.500$ arasındayken kullanılsın").
* **Sermaye Verimliliği:** Bu yenilik sermaye verimliliğini **4.000 kata kadar** artırdı ve daha düşük fiyat kayması (slippage) sağladı.
* **Esnek Komisyon Kademeleri:** Havuzlar için risk profillerine göre %0.01 (stabilcoinler), %0.05, %0.30 ve %1.00 komisyon seçenekleri sunuldu.
* **NFT Tabanlı Pozisyonlar:** Her LP pozisyonu benzersiz bir fiyat aralığına sahip olduğu için, likidite payları standart ERC-20 yerine **ERC-721 (NFT)** olarak temsil edilmeye başlandı.

### Uniswap v4 (Ocak 2025'te Ana Ağda Başlatıldı)
Ocak 2025'te resmi olarak yayına alınan Uniswap v4, protokolün bugüne kadarki en esnek mimarisidir:
* **Hooks (Kancalar):** Havuzların çalışma mantığına geliştiricilerin özel eklentiler eklemesine imkan tanır. Bu sayede zincir üstü limit emirler, dinamik komisyonlar, volatiliteye göre ayarlanan spread'ler ve otomatik portföy dengeleme gibi özellikler yerleşik olarak inşa edilebilir.
* **Singleton Sözleşmesi:** Önceki sürümlerde her işlem çifti için ayrı bir akıllı sözleşme açılırken, v4 tüm havuzları **tek bir devasa sözleşmede (Singleton)** toplar. Bu mimari, havuz oluşturma maliyetlerini %99 oranında düşürür ve çoklu takaslarda (multi-hop swap) gaz ücretlerini inanılmaz derecede azaltır.
* **Flash Accounting & EIP-1153:** Geçici depolama (transient storage) standardını kullanarak ara transferleri ortadan kaldırır ve yalnızca işlem sonundaki net bakiye transfer edilir.
* **Yerel (Native) ETH Desteği:** Wrapped ETH (WETH) dönüştürme zorunluluğunu kaldırarak doğrudan saf ETH ile takas yapılmasına imkan tanır; bu da ek gaz tasarrufu sağlar.

### UniswapX ve Unichain (2025–2026)
* **UniswapX:** Hollanda müzayedesi (Dutch auction) mekanizmasına dayalı, zincir dışı emir eşleştirmesi yapan bir protokoldür. Kullanıcılar için **sıfır gaz ücretli takaslar**, başarısız işlemlerde maliyet olmaması, MEV (sandviç saldırısı) koruması ve zincirler arası (cross-chain) doğrudan likidite transferi sunar.
* **Unichain (Şubat 2026'da Ana Ağda Başlatıldı):** Uniswap Labs tarafından hayata geçirilen, DeFi için özel olarak optimize edilmiş OP Stack tabanlı Layer 2 blokzinciridir. Flashbots iş birliğiyle geliştirilen Rollup-Boost teknolojisi sayesinde 200-250 milisaniyelik alt-blok süreleri, yerleşik MEV koruması ve OP Superchain ekosisteminde yerel çapraz zincir likidite uyumluluğu sağlar.

---

## 3. DeFi'da Bilinmesi Gereken Kritik Riskler ve Kavramlar

Uniswap kullanırken veya likidite sağlarken karşılaşılan temel dinamikler şunlardır:

### 1. Geçici Kayıp (Impermanent Loss - IL)
Likidite sağlayıcılarının (LP) en önemli finansal riskidir:
* Bir havuza likidite yatırdığınızda, dış piyasada token'ların fiyat oranı birbirinden uzaklaşırsa havuz arbitrajcılar tarafından dengelenir.
* Fiyatlar ilk yatırdığınız andaki orandan ne kadar saparsa, havuzdaki varlıklarınızın toplam değeri, o varlıkları cüzdanda hiç dokunmadan tutmaya (HODL) kıyasla daha düşük kalabilir.
* Bu kayıp, varlıkları havuzdan çekene kadar "potansiyel/geçici"dir; fiyatlar eski oranına dönerse kayıp sıfırlanır. Ancak kalıcı bir fiyat ayrışmasında toplanan işlem komisyonları bu kaybı telafi edemezse LP net zarar edebilir.

### 2. Fiyat Kayması (Slippage) ve Fiyat Etkisi (Price Impact)
* **Fiyat Etkisi:** İşlem boyutunuzun havuzun toplam derinliğine oranıdır. Sığ bir havuzda büyük miktarda alım yaparsanız havuzdaki fiyat hızla fırlar.
* **Slippage Toleransı:** Emri gönderdiğiniz an ile işlemin blokzincirine dahil edildiği an arasında fiyatın ne kadar değişmesine izin verdiğinizi belirten yüzdedir (örn. %0.5). Piyasa bu aralığın dışına çıkarsa işlem güvenlik amacıyla iptal olur.

### 3. MEV ve Sandviç Saldırıları (Sandwich Attacks)
Ethereum ağındaki MEV arama botları (searchers), mempool'da bekleyen yüksek hacimli takas işlemlerinizi izler:
* İşleminizin hemen önüne daha yüksek gaz ödeyerek bir alım emri (front-running), işleminizin arkasına ise bir satış emri (back-running) yerleştirirler.
* Bu durum yatırımcının en kötü kabul edilebilir fiyattan işlem yapmasına ve aradaki farkın botlar tarafından sömürülmesine yol açar. (UniswapX ve Unichain bu problemi kökten çözmek için tasarlanmıştır).

### 4. Sahte ve Taklit Token Tuzakları (Scam / Honeypot)
Uniswap tamamen **izinsiz (permissionless)** olduğu için herkes saniyeler içinde istediği isim ve sembolle (örneğin sahte bir "USDT" veya "PEPE") token oluşturup havuz açabilir.
* Bilgisiz kullanıcılar arama çubuğunda aynı isimli sahte token'ı alarak dolandırılabilir.
* Bazı sahte sözleşmelerde sadece alıma izin verilir, satış fonksiyonu kilitlidir (Honeypot).
* **Korunma Yolu:** Asla sadece token adına güvenmeyin. İşlem yapmadan önce token'ın resmi akıllı sözleşme adresini (Contract Address) CoinMarketCap, CoinGecko veya Etherscan üzerinden teyit edin.

---

## 4. UNI Token'ı: Tokenomisi, Dağılımı ve Değer Modeli

UNI, Eylül 2020'de protokolün merkeziyetsizliğini sağlamak ve rakip AMM'lerin (özellikle SushiSwap'in likidite vampirliği saldırısının) önüne geçmek amacıyla piyasaya sürüldü.

### Token Arzı ve Dağılımı

* **Başlangıç Maksimum Arzı:** **1 Milyar UNI** (1.000.000.000).
* **Tarihi Airdrop:** 1 Eylül 2020'den önce Uniswap'i en az bir kez kullanan her bir cüzdana **400 UNI** hediye edildi.
* **Orijinal 4 Yıllık Dağılım Modeli (Eylül 2020 – Eylül 2024):**
  * **%60.00** Topluluğa (Hazine ve airdrop dahil).
  * **%21.26** Ekip üyelerine ve gelecekteki çalışanlara (4 yıllık hak ediş - vesting).
  * **%18.04** Yatırımcılara (4 yıllık hak ediş).
  * **%0.69** Danışmanlara (4 yıllık hak ediş).
* **Kilitlerin Tamamlanması ve Enflasyon:**  
  Eylül 2024 itibarıyla ilk 4 yıllık kilit açılış takvimi sona ermiştir. Bu tarihten itibaren protokolün uzun vadeli sürdürülebilirliğini, hazinesini ve teşviklerini desteklemek amacıyla **yıllık %2'lik kalıcı enflasyon modeli** devreye girmiştir. Enflasyon oranı ve basılan token'ların kullanımı UNI yönetişim oylamalarıyla kontrol edilir.

---

## 5. Tarihi Dönüşüm: "Fee Switch" (Ücret Düğmesi) ve Gelir Modeli

Yatırımcılar ve kullanıcılar açısından ekosistemdeki en önemli iki kavram şirketin yapısı ve protokol gelirleridir:

```
┌────────────────────────────────────────────────────────────────────────┐
│                          UNISWAP EKOSİSTEMİ                            │
├───────────────────────────────────┬────────────────────────────────────┤
│         UNISWAP LABS              │        UNISWAP PROTOKOLÜ           │
│   (Merkezi Şirket - ABD)          │   (Merkeziyetsiz Akıllı Sözleşme)  │
├───────────────────────────────────┼────────────────────────────────────┤
│ • uniswap.org web arayüzünü yönetir│ • Blokzincir üzerinde özerk çalışır│
│ • Uniswap Mobil Cüzdanını geliştirir│ • Değiştirilemez, sansürlenemez    │
│ • Belirli token takaslarında      │ • "Fee Switch" ile toplanan ücretler│
│   %0.25 Arayüz Ücreti alır        │   UNI yakımı ve protokole gider    │
└───────────────────────────────────┴────────────────────────────────────┘
```

### Fee Switch'in Aktivasyonu ("UNIfication" ve Devrim)

Yıllar boyunca UNI token'ı yalnızca bir "yönetişim" aracı olarak görülmüş, protokolün milyarlarca dolarlık işlem hacminden doğrudan değer yakalayamamıştı. Ancak bu durum tarihi bir oylama ile kökten değişti:

1. **Aktivasyon Oylaması:**  
   Uniswap yönetişiminde sunulan tarihi **"UNIfication"** teklifi, %99,9'un üzerinde ezici bir çoğunlukla onaylandı ve protokolün **"Fee Switch" (Ücret Düğmesi)** resmi olarak yürürlüğe girdi.
2. **Çalışma Mekanizması:**  
   * İşlem komisyonlarının bir kısmı (örneğin v2 havuzlarında komisyonun %0.25'i likidite sağlayıcılarına giderken, %0.05'lik kısmı protokole yönlendirildi).
   * Protokole aktarılan bu komisyonlar akıllı sözleşmeler aracılığıyla **"TokenJar"** havuzunda toplanarak piyasadan **UNI geri alımı ve kalıcı olarak yakılması (buyback & burn)** mekanizmasına bağlandı.
   * Aktivasyon sırasında protokol hazinesinden geçmiş dönem gelirlerini temsilen **100 milyon UNI kalıcı olarak yakıldı**.
3. **v4 ve Çoklu Zincir Genişlemesi:**  
   Yönetişim onaylarıyla bu gelir mekanizması Uniswap v4 havuzlarına ve Arbitrum, Base, BNB Chain, Polygon, OP Mainnet gibi çoklu ağlara genişletildi.
4. **Token Ekonomisine Etkisi:**  
   Bu adım ile birlikte UNI, salt spekülatif bir oy verme token'ı olmaktan çıkarak, protokolün devasa işlem hacmiyle doğrudan beslenen ve deflasyonist baskı altına giren **"üretken bir getiri varlığına" (productive asset)** dönüştü.

---

## 6. Pratik Rehber: Uniswap'ta Güvenli Takas (Swap) Nasıl Yapılır?

Uniswap'ı güvenle kullanmak için temel adımlar:

1. **Cüzdanınızı Hazırlayın:**  
   MetaMask, Rabby veya Coinbase Wallet gibi güvenilir bir Web3 cüzdanı edinin ve içine gaz ücretlerini karşılamak için bir miktar yerel ağ token'ı (Ethereum için ETH, Arbitrum için ETH, Base için ETH, Polygon için POL) yükleyin.
2. **Resmi Arayüze Bağlanın:**  
   Her zaman resmi adresi kullandığınızdan emin olun (`app.uniswap.org`). Oltalama (phishing) sitelerinden korunmak için adresi yer imlerinize ekleyin. Sağ üst köşeden cüzdanınızı bağlayın.
3. **Ağı ve Token'ları Seçin:**  
   İşlem yapmak istediğiniz ağı (Ethereum, Unichain, Base, Arbitrum, Optimism vb.) seçin. Takas etmek istediğiniz varlığı ve almak istediğiniz token'ı belirleyin.
   > **Önemli İpucu:** Eğer token popüler bir varlık değilse, arama çubuğuna token adını yazmak yerine Etherscan/CoinGecko üzerinden kopyaladığınız **orijinal sözleşme adresini (contract address)** yapıştırın.
4. **Ayarları Kontrol Edin ve Onaylayın:**  
   Sağ üstteki dişli çark simgesinden **Slippage Tolerance** oranını kontrol edin (normal piyasa şartlarında %0.1 - %0.5 arası yeterlidir). "Swap" butonuna tıklayın, cüzdanınızdan gelen harcama iznini (Approve) ve ardından işlem imzasını onaylayın. Birkaç saniye içinde işlem tamamlanacaktır.

---

## 7. Sonuç

Uniswap bir vaat veya teorik bir konsept değil; **Merkeziyetsiz Finans'ın (DeFi) can damarı ve likidite omurgasıdır.** Sansürlenemez mimarisi, izinsiz yapısı ve fon saklama riskini tamamen ortadan kaldıran akıllı sözleşmeleriyle geleneksel borsaların sunduğu hizmeti çok daha şeffaf bir zemine taşımıştır.

v1'deki basit AMM modelinden v3'ün konsantre likiditesine, v4'ün Hooks esnekliğinden UniswapX ve Unichain'e uzanan teknolojik yolculuk, Uniswap'in neden DEX pazarının tartışmasız lideri olduğunu kanıtlamaktadır. 

**Fee Switch**'in devreye girmesi ve geri alım-yakım (buyback & burn) mekanizmasının çalışmaya başlamasıyla birlikte UNI token'ı, kripto dünyasının en yüksek nakit akışına ve gerçek dünya kullanımına sahip temel "mavi çip" (blue-chip) varlıklarından biri olarak yerini sağlamlaştırmıştır.