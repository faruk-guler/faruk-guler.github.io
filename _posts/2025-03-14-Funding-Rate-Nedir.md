---
layout: post
title: Funding Rate Nedir?
date: 2024-03-11 18:29
tag: [Blockchain]
author: theguler
comments: true
categories: [Blockchain]
---

**Funding Rate (Fonlama Oranı)**, perpetual (sürekli) vadeli işlem piyasalarında long ve short pozisyonlar arasındaki dengeyi sağlamak için kullanılan bir mekanizmadır.  

- Vadeli fiyatın (futures price), spot fiyattan çok fazla sapmasını önler.  
- Belli periyotlarla (genellikle 8 saatte bir) traderlar arasında ödenir.  
- Borsa tarafından alınmaz; doğrudan traderlar arasında ödenir.  
- **Funding Rate pozitifse →** Long (uzun) pozisyon sahipleri, short (kısa) pozisyon sahiplerine ödeme yapar.  
- **Funding Rate negatifse →** Short pozisyon sahipleri, long pozisyon sahiplerine ödeme yapar.  

---

## 📊 Oranlar:

```sh
| Coin    | Funding Rate | Anlamı          |
|---------|--------------|-----------------|
| **CRV** | **-1.1268%** | **Negatif** (Short pozisyonlar aşırı fazla)  
| **RVN** | **0.0100%**  | **Nötr**  
| **BNX** | **2.3803%**  | **Pozitif** (Long pozisyonlar aşırı fazla)  

```

## 📈 Funding Rate Anlamları ve Strateji  

| Funding Rate Aralığı | Anlamı | Genel Strateji |
|----------------------|--------|---------------|
| **0.05 ve üstü** | **Yüksek Pozitif Funding** (Long pozisyonlar aşırı fazla) | SHORT! **(long squeeze riski var)** |
| **0.01 - 0.05** | **Orta Pozitif Funding** (Long pozisyonlar fazla ama aşırı değil) | Teknik analizle işlem yap  |
| **-0.01 ile 0.01 arası** | **Nötr Funding** (Long ve short dengeli) | Teknik analizle işlem yap |
| **-0.01 ile -0.05 arası** | **Orta Negatif Funding** (Short pozisyonlar fazla ama aşırı değil) | Teknik analizle işlem yap  |
| **-0.05 ve altı** | **Yüksek Negatif Funding** (Short pozisyonlar aşırı fazla) | LONG! **(short squeeze gelebilir)** |

📌 **Kaynak:** [NinjaTools Funding Rate](https://beta.ninjatools.io/Crypto/FundingRate)  

---

## 🎯 Long Squeeze vs. Short Squeeze

### **Long Squeeze:**
- Uzun (long) pozisyonların aşırı birikmesi ve fiyatın düşmesi sonucu, long pozisyonların toplu olarak likide edilmesidir.  
- **Genellikle yüksek pozitif funding rate ile birlikte görülür.**  
- **Fiyat hızla düşer.**  

### **Short Squeeze:**
- Kısa (short) pozisyonların aşırı birikmesi ve fiyatın yükselmesi sonucu, short pozisyonların toplu olarak likide edilmesidir.  
- **Genellikle yüksek negatif funding rate ile birlikte görülür.**  
- **Fiyat hızla yükselir.**  
