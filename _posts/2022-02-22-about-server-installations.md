---
layout: post
title: Fiziksel Sunucu (Bare-Metal) Kurulum ve Yönetim Rehberi 
date: 2022-02-22 15:59
by: faruk-guler
comments: true
categories: [Hybride]
---

<!-- wp:image {"id":1924,"sizeSlug":"large","linkDestination":"none"} -->
![Sunucu Kurulum Görseli](https://farukguler.com/assets/post_images/pic_server_install-1.jpg?w=980)
<!-- /wp:image -->

Bu döküman, veri merkezlerindeki **fiziksel sunucu (bare-metal)** donanımlarının kurulum süreçlerini, donanım katmanı yönetim arayüzlerini ve güvenlik standartlarını kapsayan en güncel rehberdir.

---

## **1. Kurulum Öncesi Hazırlık (Checklist)**

Sunucuya fiziksel müdahaleden önce aşağıdaki bilgilerin hazır olduğundan emin olunmalıdır:

* **Ağ Bilgileri:** OOB (iLO/iDRAC) için ayrılmış IP, Subnet Mask ve Gateway bilgileri.
* **İsimlendirme:** Sunucunun fiziksel etiketine ve sistem kayıtlarına işlenecek Hostname.
* **Araç Gereç:** Etiketleme makinesi, konsol kablosu (Serial/USB to DB9) ve rack montaj kitleri.
* **Uyumluluk:** Kurulacak İşletim Sistemi (OS) ile donanımın uyumluluğu (HCL - Hardware Compatibility List) kontrol edilmelidir.

---

## **2. Fiziksel Hazırlık ve Donanım Kontrolü**

* **Envanter ve Fiziksel Etiketleme:** Her sunucunun üzerindeki fiziksel **Seri Numarası (S/N)**, **MAC Adresi** ve **Servis Etiketi (Service Tag)** not edilmelidir.
* **Kablolama ve Portlar:**
  * **Management Port:** Sunucunun arkasındaki özel yönetim (iLO/iDRAC) portu.
  * **Data Portları:** Ağ trafiği için kullanılan fiziksel Ethernet veya Fiber portlar.
  * **Güç (PSU):** Yedekli güç kaynaklarının (Redundant PSU) farklı PDU'lara takıldığından emin olunmalıdır.
* **Hava Akışı (Airflow):** Sunucunun rack kabinindeki "Sıcak Koridor / Soğuk Koridor" düzenine uygun yönde takıldığından emin olunmalıdır.
* **Fiziksel Durum LED'leri:** Ön ve arka paneldeki hata (Health) LED'leri kontrol edilmelidir.

---

## **3. Donanım Yapılandırması (BIOS & RAID)**

* **RAID Yapılandırması:**
  * Güvenlik ve performans için donanım tabanlı array oluşturulmalıdır.
  * **Kritik:** RAID Controller batarya (BBWC/SuperCap) durumu kontrol edilmelidir; batarya arızalıysa yazma önbelleği (Write Cache) devre dışı kalır ve performans düşer.
* **BIOS / UEFI Ayarları:**
  * **Zaman Senkronizasyonu:** Güncel tarih ve saat (mümkünse NTP) ayarlanmalıdır. Yanlış zaman, SSL sertifikalarını ve logları bozar.
  * **Secure Boot:** Güvenlik için aktif edilmelidir.
  * **Power Profile:** Maximum Performance moduna alınmalıdır.
* **Firmware Kontrolü:** BIOS, RAID ve NIC firmware'lerinin en azından "Baseline" seviyesinde güncel olması sağlanmalıdır.

---

## **4. Uzak Yönetim (Out-of-Band Management - LOM)**

Sunucuları fiziksel olarak yanına gitmeden, anakart üzerindeki özel bir çip (BMC) aracılığıyla yönetmek için kullanılan arayüzler:

| MARKA | YÖNETİM ARAYÜZÜ | VARSAYILAN IP (Genellikle) | VARSAYILAN KULLANICI / ŞİFRE |
| :--- | :--- | :--- | :--- |
| **HPE** | **iLO** | DHCP (Veya 192.168.1.x) | Sunucu üzerindeki etikette yazar. |
| **DELL** | **iDRAC** | 192.168.0.120 | root / calvin (Veya etikette yazar). |
| **LENOVO** | **XCC** | DHCP (Veya 192.168.70.125) | USERID / PASSWORD (Etikete bakınız). |
| **SUPERMICRO** | **IPMI** | DHCP (Veya 192.168.0.120) | ADMIN / ADMIN |
| **FUJITSU** | **iRMC** | DHCP (Veya 192.168.0.1) | admin / admin (URL: /retsgui/) |

> [!IMPORTANT]
> **Fiziksel Bilgi Kartı (Pull-out Tag):** Modern sunucuların ön panelinde çekilince çıkan küçük bir kart bulunur. Markaya özel varsayılan şifre ve seri numarası genellikle bu kartta yer alır.
> [!TIP]
> **Arayüz Tanıma:** Eğer tarayıcıda `/retsgui/` uzantısını görüyorsanız bu bir **Fujitsu** sunucudur. `/redfish/` görüyorsanız modern herhangi bir marka olabilir.

---

## **5. Erişim Yöntemleri (Access Methods)**

Yönetim arayüzlerine şu yöntemlerle erişilebilir:

* **Web Arayüzü (HTTP/HTTPS):** En yaygın yöntemdir. Güncel sunucular HTML5 destekli konsol sunar (Java gerektirmez).
* **SSH (CLI):** Komut satırı üzerinden hızlı konfigürasyon ve log okuma için kullanılır.
* **Mobil Uygulamalar:** iLO Mobile veya Dell OpenManage Mobile aracılığıyla QR kod okutularak erişim sağlanabilir.
* **IPMI Tool:** Linux/Windows terminali üzerinden uzaktan yönetim komutları göndermek için kullanılır.

---

## **6. Güvenlik Sertleştirme (Security Hardening)**

* **Varsayılan Şifreler:** Fabrika çıkışı gelen şifreler ilk kurulumda kesinlikle değiştirilmelidir.
* **İzolasyon:** OOB portları kesinlikle dış dünyaya açılmamalı, izole bir **Management VLAN** üzerinden erişilmelidir.
* **Protokol Kısıtlama:** Unsecure protokoller (Telnet, HTTP, IPMI v1.5) kapatılmalı; SSH, HTTPS (TLS 1.3) kullanılmalıdır.
* **Sertifika Yönetimi:** Kurumsal SSL/TLS sertifikaları BMC arayüzlerine yüklenmelidir.

---

## **7. Kurulum ve Provisioning Arayüzleri**

* **HPE:** **Intelligent Provisioning** (Sürücüleri otomatik enjekte eder).
* **DELL:** **Lifecycle Controller (LCC)** (Donanım envanteri ve OS deployment).
* **LENOVO:** **XClarity Provisioning Manager**.

> [!TIP]
> **Sürücü (Driver) Notu:** Donanım kararlılığı için jenerik sürücüler yerine üreticinin sağladığı (SPP vb.) paketler kullanılmalıdır.

---

## **8. Bakım ve Yaşam Döngüsü (Maintenance)**

* **Donanım Testi (Diagnostics):** Kurulum bitiminde mutlaka kapsamlı donanım testi çalıştırılmalıdır.
* **Firmware Güncelleme:** BIOS, BMC ve RAID firmware'leri periyodik olarak kontrol edilmelidir.

---

## **9. Önemli Not: Sunucu Kapalıyken Erişim (BMC Mantığı)**

Yeni başlayanlar için en şaşırtıcı durum, sunucu kapatılsa dahi yönetim arayüzüne (iLO/iDRAC vb.) erişilmeye devam edilmesidir.

* **Bağımsızlık:** iLO/iDRAC (BMC), sunucunun anakartı üzerinde yer alan ancak ana işlemciden (CPU) ve İşletim Sistemi'nden (Windows/Linux) tamamen bağımsız çalışan küçük bir bilgisayardır.
* **Standby Power:** Sunucunun güç kablosu prize takılı olduğu sürece bu çip çalışır. Bu sayede sunucu kapalıyken bile donanım sağlığını kontrol edebilir ve sunucuya uzaktan **"Güç Ver" (Power On)** komutu gönderebilirsiniz.
* **Kritik Uyarı:** Sunucunun elektriğini tamamen kesmek istiyorsanız güç kablolarını fiziksel olarak çekmeniz gerekir.

---

## **10. Sanal Konsol ve Medya Yönetimi (KVM & Virtual Media)**

Fiziksel sunucunun yanına gitmeden işletim sistemi kurmanızı sağlayan en önemli özelliktir:

* **Sanal Medya (Virtual Media):** Kendi bilgisayarınızdaki bir ISO dosyasını (Windows Server, ESXi vb.) arayüz üzerinden sunucuya "sanal USB" olarak gösterebilirsiniz.
* **HTML5 Konsol:** Güncel sunucularda Java yüklemeden doğrudan tarayıcı üzerinden sunucunun ekranını görebilir, klavye ve fareyi kullanabilirsiniz.

---

## **11. Lisanslama Hakkında Kritik Not**

Birçok marka (HPE, Dell, Fujitsu), yönetim arayüzünün tüm özelliklerini ücretsiz sunmaz:

* **Basic vs. Advanced:** Bazı sunucularda işletim sistemi açılmaya başladığı anda uzaktan ekran görüntüsü (KVM) kesilebilir. Bu bir hata değil, **Advanced Lisans** eksikliğidir.
* **Satın Alma:** Uzaktan tam kontrol, gelişmiş güç yönetimi ve video kayıt özellikleri için genellikle bir kerelik lisans anahtarı girilmesi gerekir.

---

## **12. İzleme ve Alarm (Monitoring)**

Sunucunun başında değilken oluşabilecek donanım hataları için:

* **SNMP / Syslog:** BMC arayüzünden bir Syslog sunucusu veya SNMP adresi tanımlayarak; disk arızası, PSU kaybı veya aşırı ısınma durumlarında anlık e-posta veya alarm alabilirsiniz.

---

## **13. Yedeklilik ve Süreklilik (Redundancy)**

Sadece donanım kurmak yetmez, sunucunun kesintisiz çalışması sağlanmalıdır:

* **NIC Teaming / Bonding:** Sunucunun iki ağ portunu tek bir sanal port gibi birleştirerek; kablo kopması veya switch arızasında bağlantının kesilmemesi sağlanmalıdır.
* **MPIO (Multipath I/O):** Harici bir depolama ünitesine (Storage) bağlanılıyorsa, verinin birden fazla yol üzerinden akması sağlanmalıdır.
* **Güç Yedekliliği:** Güç kaynaklarının (PSU) sadece ikisinin de takılı olması yetmez; bunların farklı sigortalara/PDU'lara bağlı olduğu fiziksel olarak doğrulanmalıdır.

---

## **14. Profesyonel Etiketleme ve Dokümantasyon**

Bir arıza anında doğru kabloyu çekmek hayat kurtarır:

* **Kablo Etiketleme:** Her ağ kablosunun her iki ucuna "Kaynak-Hedef" (Örn: SRV01-NIC1 -> SW01-Port12) yazan etiketler takılmalıdır.
* **Rack Planı:** Sunucunun kabin içindeki tam yerini (U sayısı) gösteren bir şema tutulmalıdır.

---
*Son Güncelleme: 2026*
*Hazırlayan: faruk-guler*
