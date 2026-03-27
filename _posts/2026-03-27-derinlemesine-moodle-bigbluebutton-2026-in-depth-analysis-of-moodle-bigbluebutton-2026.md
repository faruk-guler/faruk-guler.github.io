---
layout: post
title: 🎓 Derinlemesine Moodle & BigBlueButton 2026 - 🎓 Deep Dive analysis of Moodle & BigBlueButton 2026
subtitle: "Üniversiteler ve BT Yöneticileri İçin Ölçeklenebilir ve Yerli Dokümantasyon ve Daha Fazlası"
date: 2026-03-27 20:45:00 +0300
by: faruk-guler
comments: true
categories: [Hybride]
tags: [Moodle, BigBlueButton, IT-Admin, Greenlight, Pilos, Kurumsal, Altyapı]
---

![BBB-moodle Logosu](https://farukguler.com/assets/post_images/bbb-moodle-logo.png)

---

## 📌 Bu Proje Nedir?

Bu depo, **Moodle** (LMS) ve **BigBlueButton** (Video Konferans) platformlarını kurumsal seviyede kurmak, yönetmek ve ölçeklendirmek isteyen **sistem yöneticileri**, **DevOps mühendisleri** ve **sunucu yöneticileri** için hazırlanmış eksiksiz bir Türkçe teknik dokümantasyon setidir.

> Geleneksel "next-next" kurulum kılavuzlarından farklı olarak, bu rehber gerçek dünya senaryolarına (sınav haftası darboğazları, NAT arkası sorunları, SSL kriz yönetimi) odaklanır.

---

Üniversite bilgi işlem daire başkanlıkları ve kurumsal eğitim departmanları için sınav haftaları, binlerce eşzamanlı kullanıcı ve "1007 WebRTC" hataları bir kabusa dönüşebilir. 2026 standartlarında, bu karmaşayı yönetmek artık bir seçenek değil, zorunluluktur.

Bu ihtiyaca yönelik geliştirdiğim **[moodle-bbb-stack](https://github.com/faruk-guler/moodle-bbb-stack)** reposu, sadece bir kurulum betiği değil; kurumsal seviyede bir **BT Altyapı ve Mimari Rehberi**'dir.

---

## 🏛️ Neden Stack?

Piyasada çok sayıda genel geçer doküman olsa da, **moodle-bbb-stack** doğrudan akademik ve kurumsal ihtiyaçların yarattığı darboğazlara (bottleneck) çözüm odaklıdır.

### 🎯 BT Yöneticileri İçin Öne Çıkan Avantajlar:

* **Güncel Mimari Uyumu:** Moodle 5.1’in yeni `/public` dizin yapısı ve BBB 3.0’ın Mediasoup motoru gibi "en yeni" teknolojiler, üretim (production) ortamı standartlarında ele alınmıştır.
* **Sorun Odaklı Çözümler:** NAT arkasında çalışan sunuculardaki ses/video sorunlarından, PostgreSQL performans tuning ayarlarına kadar "gerçek dünya" senaryoları işlenmiştir.
* **Tam Entegrasyon:** Sadece yazılımları kurmakla kalmaz; **Scalelite** yük dengeleyici, **Redis** cache katmanı ve **SSO (SAML2/OIDC)** kimlik doğrulama gibi kurumsal bileşenleri tek bir çatı altında toplar.

---

## 🛠️ Stack İçeriğinde Neler Var?

Bu depo, bir sistem yöneticisinin el kitabı niteliğindedir:

1.  **Moodle SysAdmin Rehberi (15 Bölüm):** PHP 8.4 optimizasyonu, Redis session yönetimi ve güvenli vhost yapılandırmaları.
2.  **BBB v3.0 Master Class (17 Bölüm):** Kurento'dan Mediasoup'a geçiş, Coturn (TURN/STUN) sunucu kurulumu ve ağ topolojisi.
3.  **Altyapı ve Güvenlik:** Merkezi log yönetimi, DMARC destekli e-posta altyapısı ve kurumsal güvenlik sıkılaştırmaları.



---

## 🚀 BT Ekipleri İçin Çağrı: Bu Kaynağı Neden Okumalısınız?

Eğer bir üniversitede veya büyük bir eğitim kurumunda BT sistemlerinden sorumluysanız;
* Sınav haftalarında sistemin kilitlenmesini istemiyorsanız,
* Öğrencilerin "kameram açılmıyor" şikayetlerini kökten çözmek istiyorsanız,
* Maliyetli bulut çözümleri yerine kendi "on-premise" gücünüzü maksimize etmeyi hedefliyorsanız,

Bu depo sizin için hazırlandı.

👉 **Hemen İnceleyin ve Yıldızlayın:** [github.com/faruk-guler/moodle-bbb-stack](https://github.com/faruk-guler/moodle-bbb-stack)

---

## 📢 Katkıda Bulunun ve Geliştirin

Bu proje, açık kaynak topluluğunun gücüyle büyüyor. Siz de kendi kurumunuzda uyguladığınız "best practice" yöntemlerini repoya katkı (Pull Request) olarak sunabilir, BT camiasındaki bu Türkçe kaynak birikimine destek olabilirsiniz.

---
*Yazar: faruk-guler - IT Server and Virtualization Management Computer Science* *[farukguler.com](https://www.farukguler.com)*