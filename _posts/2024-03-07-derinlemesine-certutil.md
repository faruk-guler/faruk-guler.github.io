---
layout: post
title: "Derinlemesine CertUtil"
date: 2024-03-02 09:34
tag:
by: faruk-guler
comments: true
categories: [Windows OS]
---
![CERT Logosu](https://farukguler.com/assets/post_images/verify_cert.PNG)

# Derinlemesine CertUtil

## 📑 İçindekiler

1. [Giriş ve Genel Bakış](#1-giriş-ve-genel-bakış)
2. [5N1K: CertUtil Nedir?](#2-5n1k-certutil-nedir)
3. [Avantajlar ve Dezavantajlar](#3-avantajlar-ve-dezavantajlar)
4. [Temel Komut Grupları](#4-temel-komut-grupları)
5. [İleri Seviye Komutlar](#5-İleri-seviye-komutlar)
6. [Kurumsal PKI Yönetimi](#6-kurumsal-pki-yönetimi)
7. [Otomasyon ve Scripting](#7-otomasyon-ve-scripting)
8. [Gerçek Hayat Senaryoları](#8-gerçek-hayat-senaryoları)
9. [Sorun Giderme Karar Ağacı](#9-sorun-giderme-karar-ağacı)
10. [Performans ve Optimizasyon](#10-performans-ve-optimizasyon)
11. [Event Log ve İzleme](#11-event-log-ve-İzleme)
12. [Sık Yapılan Hatalar](#12-sık-yapılan-hatalar)
13. [Karşılaştırma Tablosu](#13-karşılaştırma-tablosu)
14. [Güvenlik ve Best Practices](#14-güvenlik-ve-best-practices)
15. [Komut Referans Tablosu](#15-komut-referans-tablosu)

---

## 1. Giriş ve Genel Bakış

Kurumsal IT altyapılarında **Public Key Infrastructure (PKI)**, güven zincirinin en kritik bileşenidir. Sertifikaların yönetimi, iptali, doğrulanması ve dağıtımı sürecinde görünmez ama hayati görevler üstlenir. Grafiksel araçların (MMC) yetersiz kaldığı noktada **CertUtil** devreye girer.

CertUtil, Windows Server'da yerleşik gelen ve CA (Certification Authority) yönetiminden sertifika doğrulamaya, CRL testlerinden yedekleme/geri yüklemeye kadar geniş bir yelpazede kullanılan komut satırı aracıdır.

---

## 2. 5N1K: CertUtil Nedir?

* **Ne?**: Windows ortamında PKI yönetimi, sertifika doğrulama, CRL/AIA/CDP testleri ve CA bakım görevlerini yapan yerleşik komut satırı aracıdır.
* **Neden?**: Grafik arayüzlerin gösteremediği detayları görmek, otomasyon sağlamak, hızlı sorun çözmek ve güvenlik denetimlerinde kanıt sunmak için kullanılır.
* **Nasıl?**: `certutil <komut> [parametreler]` (Örn: `certutil -store My`)
* **Nerede?**: Hem istemci hem sunucu makinelerde; özellikle Enterprise CA, Issuing CA, Offline Root CA ve Subordinate CA katmanlarında.
* **Ne zaman?**: Sertifika yenileme, hizmet kesintisi, CRL erişim hatası, zincir doğrulama problemi veya denetim raporu hazırlanması gerektiğinde.
* **Kim?**: Sistem yöneticileri, PKI yöneticileri, güvenlik analistleri, denetim ekipleri ve olay müdahale uzmanları.

---

## 3. Avantajlar ve Dezavantajlar

| ✅ Avantajlar | ❌ Dezavantajlar |
| :--- | :--- |
| **Yerleşik Araçtır**: Ekstra kurulum gerekmez, tüm Windows sistemlerde hazırdır. | **Öğrenme Eğrisi Yüksek**: Komut sayısı fazla, parametreler karmaşık. |
| **Derinlemesine Analiz**: GUI'nin göremediği zincir hataları ve CRL problemlerini gösterir. | **Yanlış Kullanım Riski**: `-setreg` gibi komutlar hatalı kullanılırsa servis kesintisine yol açabilir. |
| **Otomasyon Desteği**: PowerShell ve Batch ile entegre edilebilir. | **Yetki Gereksinimi**: Kritik komutlar için CA Admin yetkisi şarttır. |
| **CA Yönetiminde Güçlü**: Yedekleme, şablon yönetimi, CRL yayımı gibi her şeyi kapsar. | **Çıktılar Karmaşık**: `-dump` çıktılarını yorumlamak deneyim ister. |
| **Denetimlerde Kurtarıcı**: Hızlı kanıt sağlar. | **Üretim Kodunda Kullanım Önerilmez**: Microsoft, live site desteği garantisi vermez. |

---

## 4. Temel Komut Grupları

### 📂 Sertifika Depoları

Sertifikaları listelemek ve incelemek için kullanılır.
*Store Adları:* `My`, `CA`, `Root`, `TrustedPublisher`, `Remote Desktop`, `AIA`, `NTAuth`.

```powershell
# Bilgisayarın kişisel sertifika deposunu listeler
certutil -store My

# Kullanıcı sertifika deposunu gösterir
certutil -store -user My

# Her sertifikanın zincirini doğrular
certutil -verifystore My

# AIA container'ını görüntüle
certutil -viewstore AIA

# NTAuth container'ını görüntüle
certutil -viewstore NTAuth

# Depoya sertifika ekle (TrustedPublisher)
certutil -addstore TrustedPublisher cert.cer

# Depodan sertifika sil (Seri numarası ile)
certutil -delstore My "1A 2B 3C ..."
```

*Kullanım Senaryosu: Exchange veya IIS hizmet sertifikası görünmüyorsa `-store My` ile bakılır.*

### 🌐 CRL / AIA / CDP Testleri

Zincir doğrulama ve erişim testleri.

```powershell
# AIA/CDP linklerini test penceresinde gösterir
certutil -url cert.cer

# Zincir doğrulaması yapar ve CRL/OCSP'yi gerçek URL'den indirerek kontrol eder
certutil -urlfetch -verify cert.cer

# CRL önbelleğini temizler
certutil -urlcache * delete

# Belirli bir URL'den CRL çek ve önbelleğe al
certutil -urlcache -f http://pki.domain.com/crl/ca.crl
```

*Örnek: "Revocation status unknown" hatasında önce `-urlfetch` yapılır, sorun URL erişimindeyse `-urlcache * delete` ile önbellek temizlenir.*

### 🗄️ CA Veritabanı ve Şablon Yönetimi

CA yönetimi için kritik komutlar.

```powershell
# CA veritabanı kayıtlarını listeler
certutil -view

# CA'nın yayımladığı şablonları gösterir
certutil -catemplates

# CA registry ayarlarını getirir
certutil -getreg

# Tüm şablonları detaylı göster
certutil -v -template

# Belirli bir şablonu AD'den sorgula
certutil -dstemplate WebServer
```

### 💾 Yedekleme ve Geri Yükleme (DR)

Felaket kurtarma senaryoları.

```powershell
# Tam yedekleme (DB + Registry + Private Key)
certutil -backup D:\CA-Backup

# Sadece CA Veritabanını yedekle (önerilen)
certutil -backupdb D:\CA-Backup\DB

# CA Anahtarını yedekle (ÇIKTI ÇOK HASSAS!)
certutil -backupkey D:\CA-Backup\Keys

# Geri yükleme
certutil -restore D:\CA-Backup
certutil -restoredb D:\CA-Backup\DB
certutil -restorekey D:\CA-Backup\Keys
```

*Önemli: `-backupkey` çıktısı şifrelenmemiş ortamda saklanmamalıdır.*

### 🔧 Özel Anahtar Onarımı (RepairStore)

Hizmet sertifikası özel anahtarıyla eşleşmiyorsa (IIS, ADFS, Exchange sorunlarında):

```powershell
certutil -repairstore My <THUMBPRINT>
```

*Not: Thumbprint değerini yapıştırırken boşlukları kaldırın veya tırnak içinde kullanın.*

### 📄 Dosya Analizi ve Kod Dönüşümü

```powershell
# Sertifikanın tüm ayrıntılarını ASN.1 düzeyinde gösterir
certutil -dump cert.cer

# Base64 dönüştürme (DER -> Base64)
certutil -encode file.der file.cer

# DER formatına geri çevirme (Base64 -> DER)
certutil -decode file.cer file.der

# Hex dump oluştur
certutil -encodehex input.file output.hex

# Hex'ten binary'ye
certutil -decodehex input.hex output.bin

# Dosya Hash değerini hesapla (MD5)
certutil -hashfile dosya.exe MD5

# Dosya Hash değerini hesapla (SHA256)
certutil -hashfile dosya.exe SHA256
```

### 🔑 PFX / P12 Yönetimi

Özel anahtar içeren PFX dosyalarının yönetimi:

```powershell
# PFX dosyasını kişisel depoya (My) içe aktar
certutil -user -p "Sifre123" -importpfx my.pfx

# Sertifikayı ve özel anahtarı PFX olarak dışa aktar (NoCA: Zinciri dahil etme)
certutil -user -p "Sifre123" -exportpfx My <Serial> my.pfx NoCA

# PFX dosyasının şifresini kontrol et / içeriğini görüntüle
certutil -dump -p "Sifre123" my.pfx
```

---

## 5. İleri Seviye Komutlar

### 🔐 CA Registry Ayarları (setreg/getreg)

```powershell
# CRL yayım süresini ayarla (1 hafta)
certutil -setreg CA\CRLPeriodUnits 1
certutil -setreg CA\CRLPeriod "Weeks"

# Delta CRL ayarları (1 gün)
certutil -setreg CA\CRLDeltaPeriodUnits 1
certutil -setreg CA\CRLDeltaPeriod "Days"

# CRL Overlap Period (12 saat)
certutil -setreg CA\CRLOverlapPeriodUnits 12
certutil -setreg CA\CRLOverlapPeriod "Hours"

# Sertifika geçerlilik süresi (5 yıl)
certutil -setreg CA\ValidityPeriodUnits 5
certutil -setreg CA\ValidityPeriod "Years"

# Tam denetim etkinleştir
certutil -setreg CA\AuditFilter 127

# Ayarları kontrol et
certutil -getreg CA\CRLPeriodUnits
```

**⚠️ Kritik:** `-setreg` sonrası mutlaka `net stop certsvc && net start certsvc` ile servis yeniden başlatılmalıdır.

### 📡 Active Directory Entegrasyonu

```powershell
# Root CA sertifikasını AD'ye yayımla
certutil -dspublish -f RootCA.cer RootCA

# Enterprise CA bilgilerini görüntüle
certutil -EntInfo DOMAIN\CASERVER$

# Domain Controller bilgilerini göster
certutil -DCInfo

# AD'deki PKI nesnelerini göster
certutil -ds
```

### 🔍 Gelişmiş Sorgulama ve Raporlama

```powershell
# Bekleyen talepleri listele
certutil -view -restrict "Request.Disposition=9" -out "RequestID,RequesterName,CommonName"

# İptal edilmiş sertifikaları listele
certutil -view -restrict "Request.Disposition=21" -out "RequestID,SerialNumber,RevokedWhen"

# Belirli tarih aralığındaki sertifikaları getir
certutil -view -restrict "NotBefore>=01/01/2024,NotBefore<=12/31/2024" csv

# Süresi dolmuş sertifikaları bul
certutil -view -restrict "NotAfter<=$(Get-Date -Format 'MM/dd/yyyy')" -out "CommonName,NotAfter"

# Bekleyen (Pending) bir isteği onayla (Issue)
certutil -resubmit <RequestID>

# Bekleyen bir isteği reddet (Deny)
certutil -deny <RequestID>
```

**Disposition Kodları (Sertifika Durumları):**

| Kod | Durum | Açıklama |
| :--- | :--- | :--- |
| `9` | Pending | Bekleyen (onay bekliyor) |
| `15` | CA Denied | CA tarafından reddedilmiş |
| `20` | Issued | Verilmiş (aktif) |
| `21` | Revoked | İptal edilmiş |
| `30` | Failed | Başarısız |
| `31` | Under Submission | Gönderim sürecinde |

### 🛠️ CSP/KSP Yönetimi

```powershell
# Tüm CSP'leri listele
certutil -csplist

# CSP testleri çalıştır
certutil -csptest

# Belirli bir CSP ile anahtar oluştur
certutil -key -csp "Microsoft Software Key Storage Provider"
```

### 🔄 Sertifika İşlemleri

```powershell
# Sertifika iptal et (sebep kodu: 1=KeyCompromise)
certutil -revoke 1A2B3C4D5E6F 1

# Yeni CRL yayımla
certutil -crl

# Delta CRL yayımla
certutil -crl +CRL_DELTA

# CA sertifikasını al
certutil -ca.cert ca_cert.cer

# CA zincirini al
certutil -ca.chain ca_chain.p7b

# CA'ya ping at
certutil -ping
certutil -config "CASERVER\CA Name" -ping
```

**İptal Sebep Kodları:**

| Kod | Sebep | Kullanım Durumu |
| :--- | :--- | :--- |
| `0` | Unspecified | Genel iptal (sebep belirtilmemiş) |
| `1` | KeyCompromise | Özel anahtar ele geçirilmiş |
| `2` | CACompromise | CA'nın kendisi tehlikeye girmiş |
| `3` | AffiliationChanged | Kullanıcı kuruluştan ayrılmış |
| `4` | Superseded | Sertifika yenisiyle değiştirilmiş |
| `5` | CessationOfOperation | Hizmet durdurulmuş |
| `6` | CertificateHold | Geçici askıya alma (geri alınabilir) |

### 🔬 ASN.1 ve Hata Analizi

```powershell
# ASN.1 formatında sertifika parse et
certutil -asn cert.cer

# Detaylı ASN.1 çıktısı
certutil -v -asn cert.cer

# Hata kodunu çöz (HRESULT)
certutil -error 0x80090016
certutil -error 2148073494

# CRL dosyasını ASN.1 olarak incele
certutil -asn ca.crl
```

#### Sık Karşılaşılan Hata Kodları (HRESULT)

| Kod (Hex) | Kod (Dec) | Anlamı |
| :--- | :--- | :--- |
| `0x80092013` | `-2146885613` | Revocation server offline (CRL erişilemiyor) |
| `0x80092012` | `-2146885614` | Revocation function unable to check revocation (Zincir hatası) |
| `0x80090016` | `-2146893802` | Keyset does not exist (Özel anahtar yok/erişilemiyor) |
| `0x800B0101` | `-2146762495` | A required certificate is not within its validity period (Süresi dolmuş) |
| `0x800B0109` | `-2146762487` | Chain terminated in a root certificate which is not trusted (Root güvenilmiyor) |

### 📝 CertReq Entegrasyonu

```powershell
# Yeni sertifika talebi oluştur (INF dosyasından)
certreq -new request.inf request.req

# Talebi CA'ya gönder
certreq -submit request.req

# Bekleyen talebi al
certreq -retrieve <RequestID> cert.cer

# Sertifikayı yükle
certreq -accept cert.cer

# P7B zincirini görüntüle
certutil -dump -v cert.p7b
```

---

## 6. Kurumsal PKI Yönetimi

### 🏗️ Multi-Tier PKI Mimarisi

Kurumsal ortamlarda önerilen yapı:

```text
┌─────────────────────────┐
│   Offline Root CA       │  (Fiziksel güvenlik, ağdan izole)
│   Validity: 20 yıl      │
└───────────┬─────────────┘
            │
    ┌───────┴────────┐
    │                │
┌───▼────────┐  ┌───▼────────┐
│ Policy CA  │  │ Policy CA  │  (Offline/Semi-offline)
│ (Opsiyonel)│  │ (Opsiyonel)│
└───┬────────┘  └───┬────────┘
    │               │
┌───▼─────────────────▼───┐
│   Issuing CA (Online)   │  (7/24 aktif, sertifika dağıtır)
│   Validity: 5 yıl       │
└─────────────────────────┘
```

### 📋 CAPolicy.inf Örneği

Root CA kurulumu öncesi `C:\Windows\CAPolicy.inf` dosyası:

```ini
[Version]
Signature="$Windows NT$"

[PolicyStatementExtension]
Policies=AllIssuancePolicy
Critical=False

[AllIssuancePolicy]
OID=2.5.29.32.0

[BasicConstraintsExtension]
PathLength=2
Critical=True

[certsrv_server]
RenewalKeyLength=4096
RenewalValidityPeriod=Years
RenewalValidityPeriodUnits=20
CRLPeriod=Years
CRLPeriodUnits=10
LoadDefaultTemplates=0
AlternateSignatureAlgorithm=1
```

### 🌐 CDP/AIA URL Yapılandırması

```powershell
# CRL Distribution Point ayarla
certutil -setreg CA\CRLPublicationURLs "1:C:\Windows\system32\CertSrv\CertEnroll\%3%8%9.crl\n10:ldap:///CN=%7%8,CN=%2,CN=CDP,CN=Public Key Services,CN=Services,%6%10\n2:http://pki.domain.com/crl/%3%8%9.crl"

# AIA (Authority Information Access) ayarla
certutil -setreg CA\CACertPublicationURLs "1:C:\Windows\system32\CertSrv\CertEnroll\%1_%3%4.crt\n2:ldap:///CN=%7,CN=AIA,CN=Public Key Services,CN=Services,%6%11\n2:http://pki.domain.com/aia/%1_%3%4.crt"

# Ayarları kontrol et
certutil -getreg CA\CRLPublicationURLs
certutil -getreg CA\CACertPublicationURLs
```

**URL Değişkenleri:**

* `%1` = CA adı
* `%2` = Domain adı
* `%3` = CA sanitized name
* `%8` = CRL suffix
* `%9` = Delta CRL suffix

---

## 7. Otomasyon ve Scripting

### 📜 PowerShell ile Toplu Sertifika Kontrolü

```powershell
# Tüm sertifikaları kontrol et ve süresi dolacakları tespit et
$certs = certutil -store My | Select-String "Serial Number:"
foreach ($cert in $certs) {
    $serial = $cert -replace ".*: ", ""
    certutil -verify -urlfetch $serial
}
```

### ⚡ Auto-Enrollment Tetikleme (Pulse)

GPO ile dağıtılan sertifikaların anında alınmasını sağlamak için kullanılan sihirli komut:

```powershell
# Auto-enrollment olayını tetikle (Machine context)
certutil -pulse

# User context için
certutil -user -pulse
```

### 🔄 Otomatik CRL Yenileme Script'i

```powershell
# Günlük CRL yenileme (Task Scheduler ile çalıştır)
$logFile = "C:\Logs\CRL_Publish_$(Get-Date -Format 'yyyyMMdd').log"

try {
    certutil -crl | Out-File -Append $logFile
    Write-Output "$(Get-Date): CRL başarıyla yayımlandı" | Out-File -Append $logFile
} catch {
    Write-Output "$(Get-Date): HATA - $_" | Out-File -Append $logFile
    Send-MailMessage -To "admin@domain.com" -Subject "CRL Yayım Hatası" -Body $_
}
```

### 📊 CA Veritabanı Raporu

```powershell
# Son 30 günde verilen sertifikaları CSV'ye aktar
$startDate = (Get-Date).AddDays(-30).ToString("MM/dd/yyyy")
$endDate = (Get-Date).ToString("MM/dd/yyyy")

certutil -view -restrict "NotBefore>=$startDate,NotBefore<=$endDate" csv -out "RequestID,RequesterName,CommonName,NotBefore,NotAfter" > "C:\Reports\Certificates_Last30Days.csv"
```

### 🔐 Toplu Sertifika İptali

```powershell
# Belirli bir kullanıcının tüm sertifikalarını iptal et
$user = "DOMAIN\username"
$certs = certutil -view -restrict "RequesterName=$user" -out "SerialNumber"

foreach ($serial in $certs) {
    if ($serial -match "^[0-9a-f]+$") {
        certutil -revoke $serial 1  # 1 = KeyCompromise
        Write-Output "İptal edildi: $serial"
    }
}

# Yeni CRL yayımla
certutil -crl
```

---

## 8. Gerçek Hayat Senaryoları

### Senaryo 1: Exchange Hizmet Kesintisi

**Sorun:** Exchange OWA açılmıyor, kullanıcılar "sertifika hatası" alıyor.

**Çözüm Adımları:**

```powershell
# 1. Sertifikayı kontrol et
certutil -store My

# 2. Özel anahtar eşleşmesini kontrol et (Key Provider Name olmalı)
certutil -store My | Select-String -Context 0,15 "Subject: CN=mail.domain.com"

# 3. Eşleşme yoksa onar
certutil -repairstore My <thumbprint>

# 4. Zinciri doğrula
certutil -verify -urlfetch mail_cert.cer

# 5. IIS'i yeniden başlat
iisreset
```

### Senaryo 2: ADFS Login Sorunu

**Sorun:** Kullanıcılar ADFS üzerinden oturum açamıyor.

**Çözüm:**

```powershell
# 1. ADFS sertifikasını doğrula
certutil -verify -urlfetch adfs.cer

# 2. CRL erişimini test et
certutil -url adfs.cer

# 3. CRL URL'si 404 dönüyorsa, IIS'te CRL yayınını kontrol et
# 4. Önbelleği temizle
certutil -urlcache * delete

# 5. ADFS servisini yeniden başlat
Restart-Service adfssrv
```

### Senaryo 3: LDAPS Sertifika Problemi

**Sorun:** Uygulama DC'ye LDAPS (636) üzerinden bağlanamıyor.

**Çözüm:**

```powershell
# 1. DC sertifikasını kontrol et
certutil -store My

# 2. EKU kontrolü (Server Authentication olmalı)
certutil -dump dc_cert.cer | Select-String "Enhanced Key Usage"

# 3. Eksikse doğru şablonla yeni sertifika enroll et
# 4. DC'yi yeniden başlat
Restart-Computer -Force
```

### Senaryo 4: Toplu Sertifika Süresi Dolumu

**Sorun:** 100+ sertifikanın süresi aynı anda dolacak.

**Çözüm:**

```powershell
# 1. Süresi dolacak sertifikaları tespit et
$expiryDate = (Get-Date).AddDays(30).ToString("MM/dd/yyyy")
certutil -view -restrict "NotAfter<=$expiryDate" -out "CommonName,NotAfter,RequesterName" > expiring.txt

# 2. Otomatik yenileme için GPO ayarla
# 3. Manuel yenileme gerekiyorsa kullanıcılara bildirim gönder
```

### Senaryo 5: CA Veritabanı Bozulması

**Sorun:** CA hizmeti başlamıyor, veritabanı hatası veriyor.

**Çözüm:**

```powershell
# 1. Servisi durdur
net stop certsvc

# 2. Veritabanı tutarlılığını kontrol et
esentutl /g "C:\Windows\system32\CertLog\CA_Name.edb"

# 3. Hata varsa onar
esentutl /p "C:\Windows\system32\CertLog\CA_Name.edb"

# 4. Defragmente et
esentutl /d "C:\Windows\system32\CertLog\CA_Name.edb"

# 5. Servisi başlat
net start certsvc

# 6. Başarısızsa son yedekten geri yükle
certutil -restoredb D:\CA-Backup\DB
```

---

## 9. Sorun Giderme Karar Ağacı

```text
Sertifika Sorunu mu?
│
├─ Sertifika bulunamıyor
│  ├─ certutil -store My
│  └─ certutil -verifystore My
│
├─ Zincir doğrulama hatası
│  ├─ certutil -verify -urlfetch cert.cer
│  ├─ certutil -url cert.cer
│  └─ certutil -urlcache * delete
│
├─ Özel anahtar eşleşmiyor
│  └─ certutil -repairstore My <thumbprint>
│
├─ CRL erişim hatası
│  ├─ certutil -urlcache -f http://crl.url
│  └─ IIS/Web sunucu kontrolü
│
├─ CA servisi başlamıyor
│  ├─ Event Viewer kontrol
│  ├─ certutil -getreg (ayar kontrolü)
│  └─ certutil -restoredb (son çare)
│
└─ Performans sorunu
   ├─ CA veritabanı boyutu kontrol
   ├─ esentutl /d (defragment)
   └─ Eski kayıtları arşivle
```

---

## 10. Performans ve Optimizasyon

### 🚀 CA Veritabanı Optimizasyonu

```powershell
# Veritabanı boyutunu kontrol et
Get-Item "C:\Windows\system32\CertLog\*.edb" | Select-Object Name, @{N="SizeGB";E={[math]::Round($_.Length/1GB, 2)}}

# Offline defragmentasyon (servis durdurulmalı)
net stop certsvc
esentutl /d "C:\Windows\system32\CertLog\CA_Name.edb"
net start certsvc

# Online yedekleme sırasında log dosyalarını temizle
certutil -backupdb D:\Backup

# Eski istekleri arşivle (1 yıldan eski)
$cutoffDate = (Get-Date).AddYears(-1).ToString("MM/dd/yyyy")
certutil -view -restrict "NotBefore<$cutoffDate,Request.Disposition=20" -out "RequestID" | 
  ForEach-Object { certutil -deleterow $_ }
```

### ⚡ CRL Performans Ayarları

```powershell
# CRL boyutunu küçült (Delta CRL kullan)
certutil -setreg CA\CRLDeltaPeriodUnits 1
certutil -setreg CA\CRLDeltaPeriod "Hours"

# CRL yayım zamanlaması (düşük yoğunluk saatleri)
# Task Scheduler ile 02:00'de otomatik yayımla

# Base CRL'yi uzun tutarsanız delta daha küçük olur
certutil -setreg CA\CRLPeriodUnits 26
certutil -setreg CA\CRLPeriod "Weeks"
```

### 🔧 OCSP Yapılandırması

```powershell
# OCSP Responder kurulumu (CA'dan ayrı sunucu)
Install-WindowsFeature -Name ADCS-Online-Cert
Install-AdcsOnlineResponder

# OCSP yanıt imzalama sertifikası şablonu oluştur
# MMC > Certificate Templates > Manage > Duplicate "OCSP Response Signing"

# CA'da OCSP extension ekle
certutil -setreg CA\CRLPublicationURLs "...\n32:http://ocsp.domain.com/ocsp"

# OCSP test et
certutil -url cert.cer
```

---

## 11. Event Log ve İzleme

### 📊 Kritik Event ID'ler

| Event ID | Kaynak | Açıklama | Öncelik |
| :--- | :--- | :--- | :--- |
| **4887** | CertificationAuthority | CA başlatıldı | Info |
| **4888** | CertificationAuthority | CA durduruldu | Warning |
| **100** | CertificationAuthority | Başarısız sertifika isteği | Warning |
| **3** | CertificationAuthority | Sertifika veritabanı erişim hatası | Critical |
| **44** | CertificationAuthority | CRL yayımlandı | Info |
| **53** | CertificationAuthority | CRL yayım hatası | Critical |
| **80** | CertificationAuthority | Sertifika iptal edildi | Warning |

### 🔍 Event Log Sorguları

```powershell
# Son 24 saatteki CA hatalarını göster
Get-WinEvent -FilterHashtable @{
    LogName='Application'
    ProviderName='Microsoft-Windows-CertificationAuthority'
    Level=2  # Error
    StartTime=(Get-Date).AddDays(-1)
} | Select-Object TimeCreated, Id, Message | Format-Table -AutoSize

# Başarısız sertifika taleplerini bul
Get-WinEvent -FilterHashtable @{
    LogName='Application'
    ProviderName='Microsoft-Windows-CertificationAuthority'
    Id=100
} | Select-Object -First 10

# CRL yayım geçmişi
Get-WinEvent -FilterHashtable @{
    LogName='Application'
    ProviderName='Microsoft-Windows-CertificationAuthority'
    Id=44,53
} | Select-Object TimeCreated, Id, Message
```

### 📈 Proaktif İzleme Script'i

```powershell
# CA sağlık kontrolü ve alarm
$issues = @()

# 1. CRL geçerlilik kontrolü
$crl = certutil -dump ca.crl | Select-String "NextUpdate"
if ($crl -match "(\d{2}/\d{2}/\d{4}.*)") {
    $nextUpdate = [datetime]::Parse($matches[1])
    if ($nextUpdate -lt (Get-Date).AddHours(24)) {
        $issues += "CRL 24 saat içinde süresi dolacak!"
    }
}

# 2. Veritabanı boyutu kontrolü (>10GB uyarı)
$dbSize = (Get-Item "C:\Windows\system32\CertLog\*.edb").Length / 1GB
if ($dbSize -gt 10) {
    $issues += "Veritabanı boyutu ${dbSize}GB, defragmentasyon gerekli!"
}

# 3. Servis durumu
if ((Get-Service certsvc).Status -ne 'Running') {
    $issues += "CA servisi çalışmıyor!"
}

# 4. Yedekleme kontrolü
$lastBackup = (Get-ChildItem "D:\CA-Backup" | Sort-Object LastWriteTime -Descending | Select-Object -First 1).LastWriteTime
if ($lastBackup -lt (Get-Date).AddDays(-7)) {
    $issues += "Son yedekleme 7 günden eski: $lastBackup"
}

# Sorun varsa e-posta gönder
if ($issues.Count -gt 0) {
    $body = $issues -join "`n"
    Send-MailMessage -To "admin@domain.com" -Subject "CA Sağlık Uyarısı" -Body $body -SmtpServer "smtp.domain.com"
}
```

---

## 12. Sık Yapılan Hatalar

### ❌ Hata 1: Servis Restart Unutulması

**Sorun:** `-setreg` ile ayar değiştirildi ama CertSvc restart edilmedi.

**Belirti:** Yeni ayarlar uygulanmıyor, CRL süresi hala eski.

**Çözüm:**

```powershell
net stop certsvc && net start certsvc
# VEYA
Restart-Service certsvc
```

### ❌ Hata 2: CDP/AIA URL'lerinde İç Sunucu Adı

**Sorun:** CDP URL'sinde `http://INTERNALSERVER/crl/ca.crl` gibi iç sunucu adı kullanılmış.

**Belirti:** Dış ağdan sertifika doğrulaması başarısız.

**Çözüm:**

```powershell
# Public DNS kullan
certutil -setreg CA\CRLPublicationURLs "...\n2:http://pki.publicdomain.com/crl/%3%8%9.crl"
```

### ❌ Hata 3: Yedekleme Olmadan -setreg Kullanımı

**Sorun:** Registry değişikliği öncesi yedek alınmadı.

**Çözüm:**

```powershell
# ÖNCE yedek al
certutil -backup D:\Emergency-Backup
# SONRA değişiklik yap
certutil -setreg CA\CRLPeriodUnits 1
```

### ❌ Hata 4: Root CA'yı Domain'e Katma

**Sorun:** Offline Root CA domain member olarak kurulmuş.

**Belirti:** Network erişimi nedeniyle offline değil.

**Çözüm:** Root CA'yı standalone/workgroup olarak kur, ağdan fiziksel olarak izole et.

### ❌ Hata 5: Varsayılan Şablonları Üretimde Kullanma

**Sorun:** "User", "Computer" gibi default şablonlar direkt kullanılmış.

**Çözüm:** Duplicate edip kuruma özel OID ekle:

```powershell
# Şablon detaylarını OID ve ACL dahil görüntüle
certutil -v -dstemplate "MyCompany-Computer"
```

*Not: Şablon kopyalama işlemi grafik arayüzden veya `certutil -setcatemplates` komutu ile CA'ya ekleme şeklinde yapılır.*

### ❌ Hata 6: CRL Overlap Period Ayarlanmaması

**Sorun:** CRL publish olduktan hemen sonra eski CRL geçersiz oluyor.

**Belirti:** Zaman senkronizasyon farklılıklarında doğrulama hatası.

**Çözüm:**

```powershell
# En az 6-12 saat overlap ver
certutil -setreg CA\CRLOverlapPeriodUnits 12
certutil -setreg CA\CRLOverlapPeriod "Hours"
```

### ❌ Hata 7: PathLength Kısıtlaması Unutma

**Sorun:** Root CA sertifikasında PathLength=0 veya eksik.

**Belirti:** Subordinate CA kurulamıyor.

**Çözüm:** CAPolicy.inf'te `PathLength=2` (veya daha fazla) ayarla.

### 💡 İpucu: Otomasyon ve `-f` Parametresi

Komut dosyalarında (script) onay pencerelerini atlamak ve üzerine yazma işlemlerini zorlamak için `-f` (force) parametresini kullanın:

```powershell
# Örnek: Onay almadan kök sertifika ekle
certutil -f -addstore Root ca.cer
```

---

## 13. Karşılaştırma Tablosu

| Araç / Yöntem | Avantajlar | Dezavantajlar | Kullanım Alanı |
| :--- | :--- | :--- | :--- |
| **CertUtil** | Yerleşik, CA yönetimi, CRL testleri, yedekleme, detaylı analiz. | Öğrenme eğrisi yüksek, karmaşık çıktılar. | Günlük operasyon, denetim, olay çözümü. |
| **PowerShell (PSPKI)** | Nesne tabanlı, script otomasyonu, raporlamaya uygun. | Bazı düşük seviye CRL/AIA testlerinde yetersiz. | Rutin raporlama, dashboard entegrasyonu. |
| **OpenSSL** | Platform bağımsız, güçlü kripto analizi. | Windows AD CS ile entegre değil. | Linux/Unix tarafı, çapraz platform kontroller. |
| **MMC Konsolları** | Kolay kullanım, grafiksel arayüz. | Otomasyon yok, detaylı tanılama sınırlı. | Eğitim, basit inceleme, GUI tercihi. |
| **PKIView.msc** | CA sağlık durumu görsel takip. | Sadece görüntüleme, düzeltme yok. | Proaktif izleme, sağlık kontrolleri. |

---

## 14. Güvenlik ve Best Practices

### 🔒 Güvenlik Önlemleri

1. **Yetki Yönetimi**: CA üzerinde CertUtil kullanacak kişilerin rolleri sınırlı olmalı. "Herkes her komutu çalıştırabilir" olmamalı.
2. **Servis Restart**: `-setreg` sonrası **CertSvc** yeniden başlatılmalıdır. Restart edilmezse değişiklik uygulanmaz.
3. **Proxy / WAF Etkisi**: CRL/AIA testlerinde proxy araya giriyorsa `-urlfetch` yanlış sonuç dönebilir.
4. **DR Testleri**: Yedekleme/geri yükleme komutları (`-backupdb`, `-backupkey`) mutlaka test edilmelidir.
5. **Anahtar Güvenliği**: `-backupkey` çıktıları **çok hassastır**, kasada saklanmalı ve erişim loglanmalıdır.

### 📐 Mimari Best Practices

1. **Multi-Tier PKI**: 2-tier veya 3-tier mimari kullanın (Offline Root + Online Issuing).
2. **Offline Root CA**: Root CA fiziksel güvenlikli ortamda, ağdan izole tutulmalı.
3. **CAPolicy.inf Kullanımı**: CA kurulumu öncesi mutlaka hazırlayın.
4. **CDP/AIA URL'leri**: İç sunucu adları yerine public erişilebilir URL'ler kullanın.
5. **Düzenli Yedekleme**: Günlük otomatik yedekleme + aylık offline yedekleme.
6. **Rol Ayrımı**: CA Admin, Certificate Manager, Auditor rollerini ayırın.
7. **NTP Senkronizasyonu**: Tüm CA sunucuları güvenilir NTP kaynağına senkron olmalı.
8. **CA'yı DC'ye Kurmayın**: Güvenlik riski oluşturur, ayrı sunucu kullanın.
9. **Varsayılan Şablonları Kullanmayın**: Kuruma özel OID'ler ve şablonlar oluşturun.
10. **Denetim Etkin**: `AuditFilter=127` ile tam denetim aktif olmalı.

### 🔍 İzleme ve Bakım

```powershell
# Haftalık sağlık kontrolü scripti
$healthCheck = @{
    "CA Service Status" = (Get-Service certsvc).Status
    "CRL Validity" = certutil -dump ca.crl | Select-String "NextUpdate"
    "Database Size" = (Get-Item "C:\Windows\system32\CertLog\*.edb").Length / 1GB
    "Last Backup" = (Get-ChildItem "D:\CA-Backup" | Sort-Object LastWriteTime -Descending | Select-Object -First 1).LastWriteTime
}

$healthCheck | Format-Table -AutoSize
```

---

## 15. Komut Referans Tablosu

| Kategori | Komut | Açıklama | Örnek |
| :--- | :--- | :--- | :--- |
| **Yardım** | `certutil -?` | Temel yardım | `certutil -?` |
| | `certutil -v -?` | Detaylı yardım (gizli komutlar dahil) | `certutil -v -?` |
| **Depo** | `certutil -store` | Sertifika deposunu listele | `certutil -store My` |
| | `certutil -verifystore` | Depo doğrulama | `certutil -verifystore Root` |
| | `certutil -addstore` | Sertifika ekle | `certutil -addstore Root ca.cer` |
| | `certutil -delstore` | Sertifika sil | `certutil -delstore My <serial>` |
| | `certutil -importpfx` | PFX içe aktar | `certutil -importpfx my.pfx` |
| | `certutil -exportpfx` | PFX dışa aktar | `certutil -exportpfx My <seri> my.pfx` |
| **Doğrulama** | `certutil -verify` | Sertifika doğrula | `certutil -verify cert.cer` |
| | `certutil -urlfetch` | URL'den CRL/AIA çek | `certutil -urlfetch -verify cert.cer` |
| | `certutil -url` | URL testleri | `certutil -url cert.cer` |
| **CRL** | `certutil -crl` | Yeni CRL yayımla | `certutil -crl` |
| | `certutil -getcrl` | CRL indir | `certutil -getcrl ca.crl` |
| | `certutil -urlcache` | URL önbellek yönetimi | `certutil -urlcache * delete` |
| **CA Yönetim** | `certutil -view` | CA veritabanı sorgula | `certutil -view -restrict "Disposition=20"` |
| | `certutil -resubmit` | İsteği onayla | `certutil -resubmit 1234` |
| | `certutil -deny` | İsteği reddet | `certutil -deny 1234` |
| | `certutil -revoke` | Sertifika iptal et | `certutil -revoke 1A2B3C 1` |
| | `certutil -catemplates` | Şablonları listele | `certutil -catemplates` |
| | `certutil -ping` | CA bağlantı testi | `certutil -ping` |
| **Registry** | `certutil -setreg` | Registry ayarı değiştir | `certutil -setreg CA\CRLPeriodUnits 1` |
| | `certutil -getreg` | Registry ayarı oku | `certutil -getreg CA\CRLPeriodUnits` |
| **Yedekleme** | `certutil -backup` | Tam yedekleme | `certutil -backup D:\Backup` |
| | `certutil -backupdb` | Sadece DB yedekle | `certutil -backupdb D:\Backup\DB` |
| | `certutil -backupkey` | Anahtar yedekle | `certutil -backupkey D:\Backup\Key` |
| | `certutil -restore` | Geri yükle | `certutil -restore D:\Backup` |
| **Dosya** | `certutil -dump` | Sertifika detayları | `certutil -dump cert.cer` |
| | `certutil -encode` | Base64 encode | `certutil -encode file.der file.cer` |
| | `certutil -decode` | Base64 decode | `certutil -decode file.cer file.der` |
| | `certutil -hashfile` | Dosya hash hesapla | `certutil -hashfile file.exe SHA256` |
| **AD** | `certutil -dspublish` | AD'ye yayımla | `certutil -dspublish -f root.cer RootCA` |
| | `certutil -dstemplate` | Şablon bilgisi | `certutil -dstemplate WebServer` |
| | `certutil -EntInfo` | Enterprise CA bilgisi | `certutil -EntInfo DOMAIN\CA$` |
| | `certutil -DCInfo` | DC bilgisi | `certutil -DCInfo` |
| **Diğer** | `certutil -repairstore` | Anahtar eşleştir | `certutil -repairstore My <thumbprint>` |
| | `certutil -csplist` | CSP listele | `certutil -csplist` |
| | `certutil -template` | Tüm şablonlar | `certutil -template` |
| | `certutil -error` | Hata kodu açıklaması | `certutil -error 0x80090016` |
| | `certutil -pulse` | Auto-enrollment tetikle | `certutil -pulse` |

---

## 16. Kapanış

PKI, bir kurumun güven zincirini temsil eder. Zincirin en zayıf halkası, tüm yapıyı tehlikeye atabilir. **CertUtil**, bu zincirin her halkasını test etmek, doğrulamak ve gerektiğinde onarmak için en kritik silahtır. Sadece bir araç değil, güvenin sürdürülebilirliğinin garantisidir.

**CTA (Call to Action):** Bugün ortamınızdaki kritik sertifikaları kontrol edin:

```powershell
certutil -verify -urlfetch yourcert.cer
```

---

**Kaynak:** Tuğrul Kılıç (Medium) + Adam Bertram  <www.adamtheautomator.com>
