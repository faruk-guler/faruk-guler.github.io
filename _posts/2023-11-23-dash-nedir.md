---
layout: post
title: Dash Nedir? Masternode ve DAO ile Güçlenen Dijital Nakit
date: 2023-11-23 17:30
tag: [Blockchain, DAO]
by: faruk-guler
comments: true
categories: [Blockchain]
---

![Dash (Digital Cash) Logosu](https://farukguler.com/assets/post_images/dash-nedir.jpg) Dash (DASH), "Dijital Nakit" (Digital Cash) mottosuyla yola çıkan, anlık ve gizli işlemlere odaklanmış, merkeziyetsiz bir ödeme ağı ve kripto para birimidir. 2014 yılında Bitcoin kod tabanından (Litecoin forku olarak) "XCoin" adıyla doğmuş, kısa bir süre sonra "Darkcoin" olarak yeniden markalanmış ve son olarak 2015 yılında "Dash" adını almıştır.

Dash'in temel amacı, Bitcoin'in ölçeklenebilirlik ve hız sorunlarını aşarak, hem çevrimiçi hem de fiziksel satış noktalarında (POS) kullanılabilecek, kullanımı kolay, hızlı ve düşük maliyetli bir dijital nakit alternatifi sunmaktır.

Bunu başarmak için Dash, Bitcoin'den farklı olarak **iki katmanlı (two-tier)** bir ağ mimarisi ve kendi kendini finanse eden **merkeziyetsiz bir otonom organizasyon (DAO)** modeli geliştirmiştir.

---

## Dash'in Benzersiz Mimarisi: Masternode Ağı

Bitcoin'in (ve birçok kripto paranın) aksine, Dash'in ağı iki farklı katmandan oluşur.

### Katman 1: Proof-of-Work (PoW) Madencileri

Bu katman, Bitcoin'e benzer şekilde çalışır. Madenciler, **X11** adı verilen bir karma algoritması kullanarak işlemleri doğrular ve yeni bloklar oluşturarak ağı güvence altına alırlar. Bu katman, ağın temel güvenliğini ve değişmezliğini sağlar.

### Katman 2: Proof-of-Service (PoSe) Masternode'ları

Dash'in asıl inovasyonu bu katmandadır. Masternode'lar, ağa özel hizmetler sunan güçlü sunuculardır (full node'lardır). Bir Masternode çalıştırabilmek için, operatörün **1.000 DASH** token'ını teminat olarak kilitlemesi gerekir.

Bu 1.000 DASH'lık teminat, Masternode sahibinin ağın yararına çalışmasını garanti altına alır (kötü niyetli davranışlar ödülleri kaybetmelerine yol açar). Masternode'lar, ağın omurgasını oluşturur ve aşağıdaki kritik özellikleri mümkün kılar:

---

## Dash'in Kilit Özellikleri

Masternode ağı sayesinde Dash, standart kripto paraların sunamadığı iki temel özelliği sunar:

### 1. InstantSend (Anlık Transferler)

Geleneksel blockchain'lerde bir işlemin "kesinleşmesi" için birden fazla blok onayı (örn. Bitcoin'de 10-60 dakika) beklenmesi gerekir. Bu durum, bir kahve alırken kullanmak için elverişsizdir.

**InstantSend**, bu sorunu çözer. Bir InstantSend işlemi yapıldığında, Masternode ağından küçük bir grup (quorom) bu işlemi saniyeler içinde "kilitler". Bu kilitleme, işlemin henüz bir bloğa yazılmamış olsa bile geri döndürülemez (çifte harcamaya karşı korumalı) olduğunu garanti eder. Bu sayede, fiziksel mağazalarda 1-2 saniye içinde ödeme onayı alınabilir.

### 2. CoinJoin (İsteğe Bağlı Gizlilik)

Dash, kullanıcılara isteğe bağlı bir gizlilik özelliği sunar. **CoinJoin** (eski adıyla PrivateSend), bir gizlilik protokolüdür.

Kullanıcı bu özelliği etkinleştirdiğinde, Dash'leri Masternode'lar aracılığıyla otomatik bir karıştırma (mixing) sürecine girer. Masternode'lar, birden fazla kullanıcıdan gelen fonları alır, bunları standart birimlere (örn. 10, 1, 0.1 DASH) böler, karıştırır ve yeni adreslere dağıtır. Bu süreç, fonların orijinal kaynağını ve hedefini takip etmeyi son derece zorlaştırarak işlem geçmişini gizler.

---

## Dash DAO: Kendi Kendini Finanse Eden Hazine

Dash'in en devrimci yönlerinden biri, sürdürülebilir bir geliştirme ve pazarlama bütçesi yaratmış olmasıdır.

Bitcoin'de blok ödülünün %100'ü madencilere gider. Dash'te ise blok ödülü **üçe bölünür**:

* **%20 → Merkeziyetsiz Hazine (DAO):** Bu pay, doğrudan ağın kontrolündeki bir "hazine" fonuna aktarılır.
* **%48 → Masternode'lar:** İkinci katman hizmetlerini sundukları ve teminat kilitledikleri için ödüllendirilirler.
* **%32 → Madenciler:** Ağı güvence altına aldıkları için ödüllendirilirler.

*(Not: Bu yüzdeler, ağın yönetişim kararlarıyla zaman içinde değişmiştir. Güncel model 20/48/32 şeklindedir.)*

### Hazine Nasıl Çalışır?

Her ay, topluluktan herkes (geliştiriciler, pazarlamacılar, araştırmacılar) hazineden fon almak için projeler önerebilir. Bu projeler, **tüm Masternode sahipleri tarafından oylanır.**

* Eğer bir proje (örn. "Yeni bir mobil cüzdan geliştirmek" veya "Belirli bir bölgede Dash'i tanıtmak için reklam kampanyası yapmak") yeterli "EVET" oyu alırsa, hazineden otomatik olarak fonlanır.
* Yeterli oyu alamazsa fonlanmaz.

Bu sistem, Dash'i dünyanın ilk **Merkeziyetsiz Otonom Organizasyonlarından (DAO)** biri yapar. Ağ, gelişimini ve büyümesini finanse etmek için dışarıdan bağışlara veya merkezi bir şirkete bağımlı değildir.

## Son olarak;

Dash, basit bir Bitcoin kopyası olmanın çok ötesinde, iki katmanlı ağı (Masternode'lar) ve kendi kendini finanse eden hazine modeli (DAO) ile kripto para dünyasında pek çok yeniliğe öncülük etmiş bir projedir. Anlık transferler (InstantSend) ve isteğe bağlı gizlilik (CoinJoin) özellikleriyle, "dijital nakit" olma vizyonunu teknik olarak desteklemeyi amaçlamaktadır.