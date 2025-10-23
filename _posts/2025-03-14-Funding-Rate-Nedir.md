---
layout: post
title: Funding Rate (Fonlama Oranı) Nedir?
date: 2025-03-14 18:29
by: faruk-guler
comments: true
categories: [Blockchain]
---

**Funding Rate (Fonlama Oranı)**, kripto para piyasalarındaki "Perpetual" (Sürekli) Vadeli İşlem sözleşmelerinin fiyatını, dayanak varlığın **Spot (Anlık) Fiyatına** bağlı (pegged) tutmak için kullanılan hayati bir mekanizmadır.

Bu sözleşmelerin bir "son kullanma tarihi" olmadığı için, fiyatların spot piyasadan sonsuza kadar uzaklaşmasını engellemek zorunludur. Fonlama oranı, tam olarak bu dengeyi sağlar.

### Fonlama Oranının Temel Özellikleri

Verdiğiniz bilgiler son derece doğru:

* **Piyasa Dengeleyici:** Vadeli (futures) fiyat ile spot fiyat arasındaki sapmayı önler.
* **Periyot:** Genellikle her 8 saatte bir (borsaya göre 1 veya 4 saat de olabilir) uygulanır.
* **P2P Ödemesi:** Bu bir borsa ücreti **değildir**. Ödeme, doğrudan alıcı (long) ve satıcı (short) pozisyondaki trader'lar arasında yapılır.
* **Yön:**
    * **Pozitif Funding Rate:** Long (uzun) pozisyon sahipleri, Short (kısa) pozisyon sahiplerine ödeme yapar.
    * **Negatif Funding Rate:** Short pozisyon sahipleri, Long pozisyon sahiplerine ödeme yapar.

---

## Mekanizma Neden Var? Arbitraj Fırsatı

Fonlama oranının var olma nedeni **arbitrajı** teşvik etmektir. Bu mekanizma, piyasa yapıcıları ve arbitraj botlarını, fiyatı spot seviyesine geri getirmeye "teşvik eder".

**Senaryo 1: Fiyatlar Yükseliyor (Pozitif Funding)**

1.  Piyasada alım iştahı (Greed) çok yüksektir. Herkes "Long" pozisyon açar.
2.  Bu talep, vadeli işlem fiyatını, spot fiyatın (örn. Spot BTC 60.000$) **üzerine** (örn. Vadeli BTC 60.100$) iter.
3.  Fiyatlar saptığı için **Fonlama Oranı Pozitif** olur (örn. +0.05%).
4.  Bu, "Long pozisyonda olmanın bir maliyeti var, short pozisyonda olana 8 saatte bir %0.05 ödenecek" demektir.
5.  **Arbitrajcı Ne Yapar?** Fırsatı görür:
    * 60.100$'dan vadeli BTC'yi **short'lar**.
    * Aynı anda 60.000$'dan spot BTC **alır** (long'lar).
    * Bu "delta-nötr" pozisyonla 8 saatte bir %0.05'lik fonlama oranını risk almadan kazanır. Yaptığı short işlemi, vadeli fiyatı *aşağıya*, yani spot fiyata doğru geri çeker.

**Senaryo 2: Fiyatlar Düşüyor (Negatif Funding)**

1.  Piyasada panik (Fear) hakimdir. Herkes "Short" pozisyon açar.
2.  Bu arz, vadeli işlem fiyatını, spot fiyatın (örn. Spot BTC 60.000$) **altına** (örn. Vadeli BTC 59.900$) iter.
3.  Fiyatlar saptığı için **Fonlama Oranı Negatif** olur (örn. -0.05%).
4.  Bu, "Short pozisyonda olmanın bir maliyeti var, long pozisyonda olana 8 saatte bir %0.05 ödenecek" demektir.
5.  **Arbitrajcı Ne Yapar?**
    * 59.900$'dan vadeli BTC'yi **long'lar**.
    * Aynı anda elindeki spot BTC'yi 60.000$'dan **satar** (short'lar).
    * Risk almadan %0.05 kazanır. Yaptığı long işlemi, vadeli fiyatı *yukarıya*, yani spot fiyata doğru geri çeker.

---

| Coin    | Funding Rate | Anlamı                                                      |
|:--------|:-------------|:------------------------------------------------------------|
| **CRV** | **-1.1268%** | **Aşırı Negatif** (Short pozisyonlar aşırı fazla)           |
| **RVN** | **0.0100%**  | **Nötr / Hafif Pozitif** (Dengeli veya hafif long eğilimli) |
| **BNX** | **2.3803%**  | **Aşırı Pozitif** (Long pozisyonlar aşırı fazla)            |

## Strateji: Fonlama Oranı ve Açık Faiz (Open Interest)

Fonlama oranı, piyasa duyarlılığını (sentiment) gösteren bir pusuladır. Ancak bir "squeeze" (sıkışma) tahmin etmek için tek başına yeterli değildir. İhtiyacımız olan ikinci kritik veri **Açık Faiz (Open Interest - OI)**'dir.

* **Açık Faiz (OI):** Piyasada o anda açık olan (kapatılmamış) toplam long ve short pozisyonların toplam değeridir. Piyasada ne kadar "para" (bomba) biriktiğini gösterir.

**Gerçek tehlike senaryosu şudur: `Yüksek Fonlama Oranı + Yüksek Açık Faiz`**

Bu, piyasanın tek bir yöne (long veya short) aşırı kalabalıklaştığını (crowded trade) ve büyük bir "av" (likidite) biriktiğini gösterir.

### 📈 Funding Rate Anlamları ve Strateji Tablosu

Aşağıdaki tablo, fonlama oranını okumak için genel bir rehberdir. (Not: Aşırı yüksek/düşük oranlar, bir squeeze için ana sinyaldir.)

| Oran (8 Saatlik) | Piyasa Yorumu | Potansiyel Strateji (Riskli!) |
| :--- | :--- | :--- |
| **0.05% ve üstü** | **Aşırı Pozitif (Aşırı Açgözlülük)**<br> Piyasada long pozisyonlar aşırı birikmiş. "Long" olmak çok pahalı. | **Kontra SHORT Arama.**<br> Piyasa, long pozisyonları "avlamak" (long squeeze) için bir düşüşe çok müsaittir. |
| **0.01% - 0.05%** | **Pozitif (Yükseliş Beklentisi)**<br> Piyasada long iştahı var, ancak henüz aşırı değil. | Teknik analize göre işlem yapılabilir. Trendi takip et (long). |
| **-0.01% ile 0.01%** | **Nötr (Dengeli Piyasa)**<br> Standart oran. Long ve short pozisyonlar dengeli. | Piyasa yönsüzdür. Teknik analize odaklanılmalı. |
| **-0.01% - -0.05%** | **Negatif (Düşüş Beklentisi)**<br> Piyasada short iştahı var, ancak henüz aşırı değil. | Teknik analize göre işlem yapılabilir. Trendi takip et (short). |
| **-0.05% ve altı** | **Aşırı Negatif (Aşırı Korku/Panik)**<br> Piyasada short pozisyonlar aşırı birikmiş. "Short" olmak çok pahalı. | **Kontra LONG Arama.**<br> Piyasa, short pozisyonları "avlamak" (short squeeze) için bir yükselişe çok müsaittir. |

---

## 🎯 Squeeze Nedir? (Long vs. Short)

Squeeze, fonlama oranının ve açık faizin zirve yaptığı anlarda, piyasa yapıcıların (veya "balinaların") biriken bu likiditeyi (stop-loss emirleri ve likidasyon seviyeleri) patlatmak için fiyatı ani ve sert bir şekilde hareket ettirmesidir.

### Long Squeeze (Long Sıkışması)

1.  **Durum:** Piyasa aşırı long (alım) pozisyondadır. Fonlama oranı **çok pozitiftir** (+0.05% ve üstü) ve Açık Faiz yüksektir. Herkes yükseliş beklemektedir.
2.  **Tetikleyici:** Balinalar, fiyatı kasıtlı olarak aşağı doğru sertçe satar.
3.  **Sonuç:** Fiyat düştükçe, long pozisyonların stop-loss emirleri tetiklenir (bu da satışı artırır). Fiyat daha da düşünce, kaldıraçlı long pozisyonlar **likide olmaya** (sıfırlanmaya) başlar.
4.  Her likidasyon, otomatik bir "satış" emridir ve bu da fiyatın daha da sert düşmesine (kademeli çöküş / cascade) neden olur.
5.  **Fiyat hızla düşer.**

### Short Squeeze (Short Sıkışması)

1.  **Durum:** Piyasa aşırı short (satış) pozisyondadır. Fonlama oranı **çok negatiftir** (-0.05% ve altı) ve Açık Faiz yüksektir. Herkes düşüş beklemektedir.
2.  **Tetikleyici:** Balinalar, fiyatı kasıtlı olarak yukarı doğru sertçe alır.
3.  **Sonuç:** Fiyat yükseldikçe, short pozisyonların stop-loss emirleri tetiklenir (bu da alışı artırır). Fiyat daha da yükselince, kaldıraçlı short pozisyonlar **likide olmaya** (sıfırlanmaya) başlar.
4.  Her likidasyon, otomatik bir "alış" emridir ve bu da fiyatın daha da sert yükselmesine (kademeli ralli) neden olur.
5.  **Fiyat hızla yükselir.** (Örn: GameStop olayı veya 2021'deki birçok kripto rallisi).

### Özet

Fonlama oranı, bir pozisyonu tutmanın **maliyetini** veya **getirisini** gösteren bir araçtır. Açık Faiz ise o pozisyonda ne kadar **barut** biriktiğini gösterir. Bir trader, bu iki veriyi birleştirerek piyasanın aşırı kalabalık olup olmadığını analiz edebilir ve potansiyel sıkışma (squeeze) fırsatlarını kollayabilir.