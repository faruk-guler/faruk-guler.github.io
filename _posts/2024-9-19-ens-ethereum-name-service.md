---
layout: post
title: ENS (Ethereum Name Service) Nedir? Blockchain'in Alan Adı Sistemi
date: 2024-9-19 19:50
by: faruk-guler
comments: true
categories: [Blockchain]
---

![Ethereum Name Service (ENS) Logosu](https://farukguler.com/assets/post_images/ens-ethereum-name-service.JPG) Ethereum Name Service (ENS), **Ethereum blockchain'i** üzerine kurulu, dağıtık, açık ve genişletilebilir bir **isimlendirme sistemidir.** Temel amacı, internetin Alan Adı Sistemi'nin (DNS - Domain Name System) yaptığı gibi, insanların okuması zor olan makine tarafından okunabilir tanımlayıcıları (Ethereum adresleri gibi `0x...` ile başlayan uzun karakter dizileri) **insan tarafından okunabilir isimlere** dönüştürmektir.

En popüler kullanımı, karmaşık Ethereum cüzdan adreslerini, `vitalik.eth` veya `farukguler.eth` gibi **`.eth` uzantılı, hatırlanması kolay isimlere** bağlamaktır.

ENS, sadece cüzdan adreslerini basitleştirmekle kalmaz; aynı zamanda merkeziyetsiz web sitelerine, kullanıcı profillerine ve diğer blockchain adreslerine de işaret edebilen çok yönlü bir **Web3 kullanıcı adı** standardı sunar. **ENS**, bu sistemin yönetişim token'ıdır.

---

## ENS'in Çözdüğü Problem: Kullanıcı Deneyimi (UX) Engeli

Blockchain teknolojisinin ana akım olarak benimsenmesinin önündeki en büyük engellerden biri, kullanıcı deneyiminin (UX) karmaşıklığıdır. Özellikle de cüzdan adresleri:

* **Uzun ve Anlaşılmaz:** `0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B` gibi bir adresi ezberlemek veya hatasız yazmak neredeyse imkansızdır.
* **Hata Riski:** Birine kripto para gönderirken adreste tek bir karakter hatası yapmak, fonların **kalıcı olarak kaybolmasına** neden olabilir.

İnternetin ilk günlerinde IP adreslerini (`192.168.1.1`) hatırlamak yerine `google.com` gibi alan adlarını kullanmaya başlamamız gibi, ENS de Web3'ü **kullanıcı dostu** hale getirmek için benzer bir çözüm sunar.

---

## ENS Nasıl Çalışır? (Akıllı Sözleşme Mimarisi)

ENS, doğrudan **Ethereum blockchain'i üzerinde çalışan bir dizi akıllı sözleşmeden** oluşur. İki ana bileşeni vardır:

### 1. ENS Registry (Kayıt Defteri)

Bu, sistemin temel taşıdır. Hangi alan adının (`.eth` ismi) kime ait olduğunu ve bu adın hangi "Resolver"a (Çözücü) işaret ettiğini kaydeden ana akıllı sözleşmedir. Kayıt Defteri oldukça basittir ve nadiren güncellenir.

### 2. Resolvers (Çözücüler)

Bunlar, asıl "çeviri" işini yapan akıllı sözleşmelerdir. Bir `.eth` adı sorgulandığında, Resolver bu ismin hangi verilere (Ethereum adresi, Bitcoin adresi, IPFS içerik karması, avatar URL'si vb.) karşılık geldiğini döndürür. Kullanıcılar, isimlerinin hangi Resolver'ı kullanacağını ve o Resolver içinde hangi kayıtları tutacağını belirleyebilirler.

### `.eth` Alan Adı Kaydı

Bir `.eth` adı almak, geleneksel bir alan adı (`.com`, `.net`) kiralamaya benzer:

1.  **Arama:** Kullanıcı, istediği `.eth` adının (örn. `mycrypto.eth`) müsait olup olmadığını ENS arayüzleri (örn. `app.ens.domains`) üzerinden kontrol eder.
2.  **Kayıt (Kiralama):** Ad müsaitse, kullanıcı bu adı belirli bir süre (genellikle en az 1 yıl) için **ETH ödeyerek** kiralar. Kiralama ücreti, ismin uzunluğuna göre değişir (kısa isimler daha pahalıdır).
3.  **Yönetim:** Kiralama süresi boyunca, isim tamamen kullanıcının kontrolündedir. Süresi dolmadan yenilenmezse, isim tekrar herkesin kaydına açılır.

Kaydedilen her `.eth` adı, teknik olarak bir **NFT (ERC-721 token'ı)** olarak temsil edilir. Bu, `.eth` adınızı OpenSea gibi pazar yerlerinde **alabileceğiniz, satabileceğiniz veya transfer edebileceğiniz** anlamına gelir.

---

## Cüzdan Adreslerinden Daha Fazlası: ENS'in Kullanım Alanları

Bir ENS adı sadece bir Ethereum adresine işaret etmek zorunda değildir. Şunları da yapabilir:

* **Diğer Kripto Adresleri:** Bitcoin, Litecoin, Dogecoin gibi farklı blockchain adreslerinizi tek bir `.eth` adı altında birleştirebilirsiniz.
* **Merkeziyetsiz Web Siteleri (dWeb):** İsminizi, IPFS veya Swarm gibi merkeziyetsiz depolama ağlarında barındırılan bir web sitesinin içerik karmasına (content hash) yönlendirebilirsiniz. (Örn. `mywebsite.eth` adresini tarayıcınızda açmak).
* **Profil Bilgileri:** Avatarınızı, e-posta adresinizi, X/Twitter veya GitHub profilinizi ve diğer metin tabanlı bilgileri `.eth` adınıza ekleyebilirsiniz. Bu, merkeziyetsiz bir kimlik (Decentralized Identity - DID) oluşturmanın bir yoludur.

---

## ENS Token'ı Ne İşe Yarar? (Yönetişim ve DAO)

**ENS**, Ethereum Name Service protokolünün yerel **yönetişim (governance)** token'ıdır. Maksimum arzı **100 Milyon ENS** ile sınırlandırılmıştır.

ENS token'ının birincil ve en önemli işlevi, protokolün **merkeziyetsiz yönetimine** katılmaktır.

### ENS DAO (Merkeziyetsiz Otonom Organizasyon)

Kasım 2021'de, ENS protokolünün kontrolü, çekirdek ekibinden **ENS DAO** adı verilen topluluk tarafından yönetilen bir yapıya devredilmiştir.

Bu geçiş, kripto tarihindeki en büyük ve en başarılı **airdrop**'lardan biriyle gerçekleşti. Geçmişte `.eth` adı kaydetmiş olan tüm kullanıcılara, geriye dönük olarak **ENS token'ları** hediye edildi.

ENS token sahipleri, DAO aracılığıyla şunları yapabilirler:

* **Protokol Güncellemeleri:** Protokolün nasıl geliştirileceği veya değiştirileceği konusunda teklifler sunabilir ve oy kullanabilirler.
* **Hazine Yönetimi:** DAO'nun sahip olduğu (kayıt ücretlerinden gelen) ETH ve ENS hazinesinin nasıl harcanacağına (hibeler, ekosistem projeleri vb.) karar verebilirler.
* **Fiyatlandırma ve Parametreler:** `.eth` isimlerinin kayıt ücretleri, kiralama süreleri gibi temel parametreler üzerinde söz sahibi olabilirler.

**Önemli Not:** `.eth` isimlerini kaydetmek veya yenilemek için **ENS token'ı kullanılmaz.** Bu ücretler **ETH** ile ödenir ve DAO hazinesine gider. ENS token'ı öncelikli olarak bir **yönetişim hakkı** temsil eder.


Ethereum Name Service (ENS), sadece bir "isim hizmeti" olmanın ötesinde, **Web3'ün kullanıcı deneyimini (UX) iyileştiren** ve **merkeziyetsiz kimlik** kavramına temel oluşturan kritik bir altyapı katmanıdır.

`vitalik.eth` gibi basit isimler sayesinde, blockchain teknolojisini daha az korkutucu ve daha erişilebilir hale getirir. ENS DAO aracılığıyla topluluğa devredilen yönetimi ile de, merkeziyetsizlik ilkesini somutlaştıran en önemli projelerden biri olarak öne çıkmaktadır.