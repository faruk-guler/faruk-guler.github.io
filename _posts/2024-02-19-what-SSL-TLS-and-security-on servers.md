---
layout: post
title: "SSL/TLS Nedir ve Sunucularda Güvenlik - What is SSL/TLS and Security on Servers"
date: 2024-02-19 20:23
by: faruk-guler
comments: true
categories: [Hacking - Security]
tags: [SSL, TLS, Kriptografi, Hardening]
---

![SSL ve TLS Karşılaştırması](https://farukguler.com/assets/post_images/ss-tls.jpg?w=589 "SSL ve TLS Kriptografik Protokolleri")

> **Hedef Kitle:** Siber Güvenlik Uzmanları, Sistem ve Ağ Yöneticileri, DevOps & Güvenlik Mühendisleri  
> **Kapsam:** Kriptografik Protokol Mimarisi, Zafiyet Analizi, Ağ Seviyesinde Denetim (Active Directory & Linux), GPO Dağıtımı, Rollback Stratejileri ve Servis Sertleştirme (IIS, Nginx, Apache, Postfix)

---

## Yönetici Özeti (Quick Reference Matrix)

| Protokol | IETF RFC | Durum | Anahtar Değişimi | Mesaj Doğrulama (MAC) | El Sıkışma Gecikmesi | Kurumsal Eylem |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **SSL 2.0 / 3.0** | RFC 6101 | ⛔ Güvensiz | Statik RSA, DH | Zayıf MAC (MD5/SHA-1) | 2-RTT | **Derhal Kapatılmalı** |
| **TLS 1.0 / 1.1** | RFC 2246 / 4346 | ⛔ Deprecated (RFC 8996) | Statik RSA, DH, DHE | HMAC (MD5/SHA-1) | 2-RTT | **Derhal Kapatılmalı** |
| **TLS 1.2** | RFC 5246 | ✅ Güvenli (Standart) | (EC)DHE, Statik RSA* | HMAC-SHA256 / SHA384 | 2-RTT | **Etkin Tutulmalı** (Zayıf cipher'lar elenerek) |
| **TLS 1.3** | RFC 8446 | 🚀 Altın Standart | Yalnızca (EC)DHE | Doğrudan AEAD | **1-RTT** (0-RTT opsiyonel) | **Öncelikli Etkinleştirilmeli** |

\* *TLS 1.2'de statik RSA anahtar değişimi İleri Gizlilik (Forward Secrecy - PFS) sağlamaz; yalnızca ECDHE/DHE şifre paketleri PFS sunar.*

---

## 1. Kriptografik Mimari ve Protokol Evrimi

**TLS (Transport Layer Security)**, internet ve yerel ağlar üzerindeki iletişim güvenliğini sağlayan temel kriptografik kalkandır. Üç ana prensip üzerine inşa edilir:
1. **Gizlilik (Confidentiality):** Araya giren saldırganlar (eavesdropper) trafiği okuyamaz (Simetrik AEAD şifreleme).
2. **Bütünlük (Integrity):** Aktarılan verinin manipüle edilmediği garanti edilir (AEAD kimlik doğrulama etiketi).
3. **Kimlik Doğrulama (Authentication):** İstemci, X.509 dijital sertifikalarıyla sunucunun kimliğini doğrular (Karşılıklı mTLS ile sunucu da istemciyi doğrular).

| Dönem | Protokol | Güvenlik Durumu | Kriptografik Gerekçe ve Evrim |
| :--- | :--- | :--- | :--- |
| **1995 - 1996** | SSL 2.0 / 3.0 | ⛔ Güvensiz | İlk web şifreleme öncüleri; POODLE ve yapısal MAC zaafları nedeniyle terk edildi. |
| **1999 - 2006** | TLS 1.0 / 1.1 | ⛔ Deprecated (RFC 8996) | SSL halefi; CBC dolgu açıkları ve zayıf hash bağımlılıkları sebebiyle kullanımdan kalktı. |
| **2008** | **TLS 1.2** (RFC 5246) | ✅ Güvenli (Standart) | SHA-256 HMAC, AEAD ve ECDHE desteği; günümüz kurumsal omurgası. |
| **2018** | **TLS 1.3** (RFC 8446) | 🚀 Altın Standart | 1-RTT gecikme, zorunlu PFS, entegre AEAD, şifreli el sıkışma paketleri. |
| **Gelecek** | **Kuantum Sonrası (PQC)** | 🔮 Geleceğe Hazırlık | ML-KEM / Kyber tabanlı hibrit anahtar değişimi (`X25519Kyber768`). |

### 1.1 SSL ve Erken TLS Neden Terk Edildi?
- **CBC Dolgu Zafiyetleri (Padding Oracle):** Eski blok şifreleme modlarında (CBC) şifreleme ve MAC doğrulama ayrık adımlarla yürütülüyordu (MAC-then-Encrypt). Bu tasarım, zamanlama farklılıklarından yararlanan **POODLE**, **BEAST** ve **Lucky Thirteen** gibi saldırılara yol açtı.
- **İleri Gizlilik (Forward Secrecy - PFS) Eksikliği:** Eski RSA el sıkışmasında istemci rastgele bir ön anahtarı (*Pre-Master Secret*) sunucunun açık anahtarıyla şifrelerdi. Saldırgan ağ trafiğini kaydedip yıllar sonra sunucunun özel anahtarını ele geçirirse geçmişe dönük tüm oturumları çözebiliyordu.
- **Zayıf ve Kırılmış Kriptografik Algoritmalar:** MD5 ve SHA-1 özetleme fonksiyonlarında çarpışma (collision) saldırıları kanıtlanmış; RC4 ve 3DES (Sweet32) gibi şifreleyiciler güvenlik standartlarını karşılayamaz hale gelmiştir.

### 1.2 TLS 1.3 Mimarisi: Neler Değişti?
TLS 1.3, protokol mimarisinde radikal bir sadeleştirmeye gitmiştir:
1. **Zorunlu İleri Gizlilik (Mandatory PFS):** Statik RSA ve statik DH anahtar değişimi tamamen kaldırılmıştır. Tüm anahtar anlaşmaları geçici eliptik eğrilerle **(ECDHE)** veya sonlu alan Diffie-Hellman **(DHE)** ile yapılır.
2. **Yalnızca AEAD Şifreleme:** CBC modları ve bağımsız HMAC mekanizmaları kaldırılmış; şifreleme ve bütünlük kontrolünü tek adımda gerçekleştiren **AEAD** (AES-GCM, AES-CCM, ChaCha20-Poly1305) algoritmaları zorunlu kılınmıştır.
3. **El Sıkışma Şifrelemesi:** `ServerHello` paketinden sonra iletilen tüm el sıkışma yükü (sunucu sertifikası dahil) ağ üzerinde şifrelenir. Bu sayede pasif ağ dinleyicileri hangi sertifikanın kullanıldığını göremez.
4. **Bağımsız Cipher Suite Tanımı:** TLS 1.2'deki karmaşık `TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384` tanımları yerine; anahtar değişimi uzantılarla yürütülür, şifreleme paketi yalnızca simetrik algoritmayı ve HKDF hash motorunu belirtir (`TLS_AES_256_GCM_SHA384`).

---

## 2. El Sıkışma (Handshake) Mimarisi: TLS 1.2 vs TLS 1.3

Aşağıdaki akışlar, TLS 1.2'deki 2-RTT gecikmesi ile TLS 1.3'teki 1-RTT optimizasyonu ve şifrelenmiş el sıkışma adımlarını karşılaştırmaktadır:

#### TLS 1.2 El Sıkışma Akışı (Tam El Sıkışma - 2-RTT)
```text
İstemci (Client)                                                     Sunucu (Server)
   |                                                                        |
   | ------------ (1) ClientHello --------------------------------------->  | (TLS sürümleri, Cipher Suites)
   | <----------- (2) ServerHello, Sertifika, ServerKeyExchange ----------  | (Açık metin X.509, DH parametresi)
   |                                                                        |
   | ------------ (3) ClientKeyExchange, [ChangeCipherSpec], Finished --->  | (Anahtar parçası, ilk şifreli özet)
   | <----------- (4) [ChangeCipherSpec], Finished -----------------------  | (Oturum anahtarları doğrulandı)
   |                                                                        |
   | <====================== (5) 🔒 Şifreli Uygulama Trafiği ======================> [Toplam: 2-RTT Gecikme]
```

#### TLS 1.3 Modern El Sıkışma Akışı (1-RTT)
```text
İstemci (Client)                                                     Sunucu (Server)
   |                                                                        |
   | ------------ (1) ClientHello + KeyShare + Desteklenen Gruplar + SNI -> | (Geçici ECDHE açık anahtar parçası)
   | <----------- (2) ServerHello + KeyShare -----------------------------  | (Sunucu ECDHE açık anahtar parçası)
   |                                                                        |
   |       [!] Bu adımdan itibaren iletilen el sıkışma paketleri şifrelidir:
   | <----------- (3) {EncryptedExtensions, Şifreli Sertifika, Verify, Finished}
   |                                                                        |
   | ------------ (4) {Finished} -----------------------------------------> | (Doğrulama tamamlandı)
   |                                                                        |
   | <====================== (5) 🔒 Şifreli Uygulama Trafiği ======================> [Toplam: 1-RTT Gecikme]
```

> [!WARNING]
> **TLS 1.3 0-RTT (Early Data) Güvenlik Riski (Replay Attack):**  
> 0-RTT özelliği, daha önce bağlantı kurulmuş sunucuya ilk pakette veri gönderilmesine olanak tanır. Ancak bu veri İleri Gizlilik (PFS) sağlamaz ve aradaki saldırganın paketi kopyalayıp sunucuya tekrar iletmesine (Replay Attack) açıktır.  
> **Kural:** 0-RTT yalnızca yan etkisiz (idempotent / `GET`) isteklerde kullanılmalı; veritabanı yazma, para transferi ve kimlik doğrulama içeren `POST`/`PUT` isteklerinde kesinlikle devre dışı bırakılmalıdır.

---

## 3. Kurumsal Ağda Denetim ve Teşhis (Discovery & Auditing)

Eski protokolleri kapatmadan önce kurum içinde kimlerin bu protokollere bağımlı olduğunu tespit etmek, hizmet kesintilerini önlemenin ilk adımıdır.

### 3.1 Dış ve İç Ağ Tarama Araçları

```bash
# 1. Nmap ile hedef porttaki şifreleme paketlerini ve TLS sürümlerini listeleme
nmap --script ssl-enum-ciphers -p 443,636,3389 192.168.1.0/24 -oN subnet_tls_raporu.txt

# 2. testssl.sh ile yerel ve intranet servisleri derinlemesine test etme (Qualys SSL Labs alternatifi)
./testssl.sh --severity HIGH --protocols --standard https://192.168.1.50:443
```

> [!CAUTION]
> **OpenSSL 3.x ve RHEL `crypto-policies` İstemci Yanılgısı:**  
> Modern Linux dağıtımlarında (Ubuntu 22.04+, RHEL 9+, Debian 12+) OpenSSL 3.x istemci tarafında varsayılan olarak TLS 1.0 ve 1.1'i engeller (`SECLEVEL=2`). Bu durumda:
> ```bash
> openssl s_client -connect hedef-sunucu:443 -tls1
> ```
> komutu sunucudan bağımsız olarak yerel kütüphanede `no protocols available` hatası verir. Bu durum sunucunun güvenli olduğu yanılgısını yaratır. Gerçek sunucu desteğini görmek için doğrudan `nmap` veya `testssl.sh` kullanılmalıdır.

---

### 3.2 Windows SCHANNEL Kayıt Defteri Durum Tespiti

Bir Windows sunucu veya istemcide protokollerin işletim sistemi varsayılanında mı yoksa elle mi değiştirildiğini sorgulamak için yönetici PowerShell konsolunda çalıştırın:

```powershell
$basePath = "HKLM:\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols"
Get-ChildItem -Path $basePath -ErrorAction SilentlyContinue | ForEach-Object {
    $proto = $_.PSChildName
    "Server", "Client" | ForEach-Object {
        $role = $_
        $key = Get-ItemProperty -Path "$basePath\$proto\$role" -ErrorAction SilentlyContinue
        [PSCustomObject]@{
            Protokol          = $proto
            Rol               = $role
            Enabled           = if ($null -eq $key.Enabled) { "Varsayılan (OS)" } elseif ($key.Enabled -eq 1) { "AÇIK (1)" } else { "KAPALI (0)" }
            DisabledByDefault = if ($null -eq $key.DisabledByDefault) { "Varsayılan (OS)" } elseif ($key.DisabledByDefault -eq 1) { "KAPALI (1)" } else { "AÇIK (0)" }
        }
    }
} | Format-Table -AutoSize
```

> [!NOTE]
> **Kayıt Defteri Boş Çıkarsa:** Windows'ta `Protocols` altında kayıt olmaması sistemin "İşletim Sistemi Varsayılanları" (OS Defaults) ile çalıştığını gösterir:
> - **Windows Server 2016 / 2019 / Win 10:** TLS 1.0, 1.1 ve 1.2 varsayılan olarak açıktır.
> - **Windows Server 2022 / Win 11:** TLS 1.2 ve TLS 1.3 varsayılan olarak etkindir.
> - **Windows Server 2025 / Win 11 24H2:** TLS 1.0 ve 1.1 işletim sistemi düzeyinde varsayılan olarak kapatılmıştır.

---

### 3.3 Domain Controller'da Eski İstemcileri ve IP Adreslerini Yakalama

Windows `Schannel` olay günlükleri güvenlik gereği istemci IP adresini içermez. Eski istemcilerin IP adreslerini tespit etmek için şu adımlar uygulanmalıdır:

#### 1. Schannel Ayrıntılı Loglamayı Açma
```cmd
reg add "HKLM\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL" /v "EventLogging" /t REG_DWORD /d 7 /f
```
- **Event ID 36880:** Başarılı el sıkışma ve anlaşılan protokol/cipher.
- **Event ID 36874:** Ortak şifre paketi veya protokol bulunamadığında el sıkışma hatası.

#### 2. LDAPS (Port 636) için Yerel Paket İzleme (`pktmon`) ile IP Tespiti
```cmd
:: 1. Port 636 filtresi ekle ve yakalamayı başlat
pktmon filter add ldaps_filter -p 636
pktmon start --capture --file-name ldaps_trace.etl

:: 2. Trafik oluştuktan sonra yakalamayı durdur ve pcapng'ye dönüştür
pktmon stop
pktmon etl2pcap ldaps_trace.etl --out ldaps_trace.pcapng
```
Oluşturulan `ldaps_trace.pcapng` dosyasını Wireshark ile açıp filtre uygulayın:
```text
tls.handshake.type == 1 && (tls.handshake.version == 0x0301 || tls.handshake.version == 0x0302)
```
Bu filtre, doğrudan TLS 1.0 (`0x0301`) ve TLS 1.1 (`0x0302`) ile gelen paketlerin kaynak IP adreslerini döker.

#### 3. IIS Web Sitelerinde W3C Günlüklerine TLS Sürümü Ekleme
IIS Manager -> `Logging` -> `Select Fields` -> `Custom Fields` alanına iki değişken ekleyin:
- Alan Adı: `Crypt-Protocol`, Kaynak Türü: `Server Variable`, Kaynak Adı: `CRYPT_PROTOCOL`
- Alan Adı: `Crypt-Cipher`, Kaynak Türü: `Server Variable`, Kaynak Adı: `CRYPT_CIPHER_ALG_ID`

*Hex Değer Çözümleme Tablosu:*
- `0x0080` = TLS 1.0  
- `0x0200` = TLS 1.1  
- `0x0800` = TLS 1.2  
- `0x2000` = TLS 1.3  

---

## 4. Kurumsal Bağımlılık ve Risk Analizi (Pre-Hardening Checklist)

Sunucularda eski protokolleri devre dışı bırakmadan önce şu kritik kurumsal bağımlılıklar gözden geçirilmelidir:

| Kontrol Adımı | Kritik Bağımlılık Sorusu | Risk / Olası Kesinti | Zorunlu Eylem |
| :---: | :--- | :--- | :--- |
| **1. Adım** | Ortamda .NET 3.5 / 4.x ERP veya muhasebe yazılımı var mı? | TLS 1.0 kapatılınca SQL / Web servis bağlantıları anında kopar. | Kayıt defterinde `SchUseStrongCrypto=1` anahtarlarını sisteme işleyin. |
| **2. Adım** | Eski NAS / SAN / LDAPS (Port 636) entegrasyonu var mı? | Firmware TLS 1.2 desteklemiyorsa AD iletişimi ve paylaşımlar durur. | Firmware güncelleyin veya LDAPS desteğini önceden doğrulayın. |
| **3. Adım** | İstemcilerden sunuculara Uzak Masaüstü (RDP) erişimi yapılıyor mu? | CredSSP cipher uyuşmazlığında sunucuya uzaktan yönetim kilitlenebilir. | NLA ve CredSSP ortak şifre paketlerini test sunucusunda doğrulayın. |
| **4. Adım** | Sunucuda internete açık Port 25 SMTP MTA trafiği var mı? | Katı TLS dayatılırsa e-postalar düz metne düşer (cleartext fallback) veya teslim edilmez. | Port 25 trafiğini fırsatçı (opportunistic `may`) bırakın; katı TLS'i Port 587 submission'da uygulayın. |

1. **.NET Framework StrongCrypto Tuzağı:** .NET 3.5, 4.0 ve 4.5.x uygulamaları (ERP, bankacılık ve muhasebe yazılımları), kayıt defterinde `SchUseStrongCrypto` etkinleştirilmediğinde işletim sisteminde TLS 1.0 kapatıldığı an SQL Server veya web servislerine bağlanırken çöker.
2. **RDP / CredSSP Kilitlenmesi:** Uzak Masaüstü bağlantıları Ağ Düzeyinde Kimlik Doğrulama (NLA) sırasında CredSSP protokolünü SCHANNEL tünelinde çalıştırır. İstemci ile sunucu arasında ortak cipher kalmazsa uzak erişim tamamen kesilebilir.
3. **NAS ve Storage Cihazları:** NAS cihazınız Active Directory üzerinden kimlik doğrulaması yapıyorsa (LDAPS port 636) ve firmware'i TLS 1.2 desteklemiyorsa AD iletişimi kopar, kullanıcılar dosya paylaşımlarına erişemez.
4. **Postfix Port 25 Fallback Tuzağı:** Sunucular arası genel e-posta aktarımında Port 25 katı biçimde `>=TLSv1.2` zorlanırsa, eski sunucularla STARTTLS anlaşması yapılamaz ve e-postalar şifresiz düz metin (cleartext fallback) olarak iletilir ya da teslim edilemez.

---

## 5. Windows Server & Active Directory Sıkılaştırma Rehberi

### 5.1 Kurumsal Kayıt Defteri Sıkılaştırma Şablonu (`Hardening-SCHANNEL.reg`)

Aşağıdaki şablon:
- PCT 1.0, SSL 2.0/3.0, TLS 1.0 ve TLS 1.1'i hem istemci hem sunucu rollerinde tamamen kapatır (`Enabled=0`, `DisabledByDefault=1`).
- Modern TLS 1.2 ve TLS 1.3'ü açar (`Enabled=1`, `DisabledByDefault=0`).
- Sweet32 (3DES), RC4 ve MD5 algoritmalarını kilitler.
- .NET Framework 2.0/3.5 ve 4.x için 32-bit & 64-bit StrongCrypto zorlamasını sisteme yazar.

```reg
Windows Registry Editor Version 5.00

; ========================================================
; 1. Eski Protokolleri Devre Dışı Bırakma
; ========================================================
[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\Multi-Protocol Unified Hello\Client]
"Enabled"=dword:00000000
"DisabledByDefault"=dword:00000001

[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\Multi-Protocol Unified Hello\Server]
"Enabled"=dword:00000000
"DisabledByDefault"=dword:00000001

[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\PCT 1.0\Client]
"Enabled"=dword:00000000
"DisabledByDefault"=dword:00000001

[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\PCT 1.0\Server]
"Enabled"=dword:00000000
"DisabledByDefault"=dword:00000001

[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\SSL 2.0\Client]
"Enabled"=dword:00000000
"DisabledByDefault"=dword:00000001

[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\SSL 2.0\Server]
"Enabled"=dword:00000000
"DisabledByDefault"=dword:00000001

[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\SSL 3.0\Client]
"Enabled"=dword:00000000
"DisabledByDefault"=dword:00000001

[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\SSL 3.0\Server]
"Enabled"=dword:00000000
"DisabledByDefault"=dword:00000001

[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.0\Client]
"Enabled"=dword:00000000
"DisabledByDefault"=dword:00000001

[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.0\Server]
"Enabled"=dword:00000000
"DisabledByDefault"=dword:00000001

[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.1\Client]
"Enabled"=dword:00000000
"DisabledByDefault"=dword:00000001

[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.1\Server]
"Enabled"=dword:00000000
"DisabledByDefault"=dword:00000001

; ========================================================
; 2. Güvenli Protokolleri Etkinleştirme (TLS 1.2 & TLS 1.3)
; ========================================================
[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.2\Client]
"Enabled"=dword:00000001
"DisabledByDefault"=dword:00000000

[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.2\Server]
"Enabled"=dword:00000001
"DisabledByDefault"=dword:00000000

[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.3\Client]
"Enabled"=dword:00000001
"DisabledByDefault"=dword:00000000

[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.3\Server]
"Enabled"=dword:00000001
"DisabledByDefault"=dword:00000000

; ========================================================
; 3. Zayıf Şifreleyici ve Hash Algoritmalarını Kapatma
; ========================================================
[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Ciphers\Triple DES 168]
"Enabled"=dword:00000000

[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Ciphers\RC4 128/128]
"Enabled"=dword:00000000

[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Ciphers\RC4 40/128]
"Enabled"=dword:00000000

[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Ciphers\RC4 56/128]
"Enabled"=dword:00000000

[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Hashes\MD5]
"Enabled"=dword:00000000

; ========================================================
; 4. .NET Framework StrongCrypto Zorlaması (32-bit ve 64-bit)
; ========================================================
[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\.NETFramework\v4.0.30319]
"SchUseStrongCrypto"=dword:00000001
"SystemDefaultTlsVersions"=dword:00000001

[HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Microsoft\.NETFramework\v4.0.30319]
"SchUseStrongCrypto"=dword:00000001
"SystemDefaultTlsVersions"=dword:00000001

[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\.NETFramework\v2.0.50727]
"SchUseStrongCrypto"=dword:00000001
"SystemDefaultTlsVersions"=dword:00000001

[HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Microsoft\.NETFramework\v2.0.50727]
"SchUseStrongCrypto"=dword:00000001
"SystemDefaultTlsVersions"=dword:00000001
```

---

### 5.2 Diffie-Hellman Anahtar Boyutu ve GPO Cipher Sıralaması

#### 1. Minimum Diffie-Hellman Anahtar Uzunluğunu 2048-bit Yapma
```cmd
reg add "HKLM\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\KeyExchangeAlgorithms\Diffie-Hellman" /v "ServerMinKeyBitLength" /t REG_DWORD /d 2048 /f
reg add "HKLM\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\KeyExchangeAlgorithms\Diffie-Hellman" /v "ClientMinKeyBitLength" /t REG_DWORD /d 2048 /f
```

#### 2. Group Policy ile Cipher Suite Sırasını Düzenleme
GPMC -> `Computer Configuration` -> `Administrative Templates` -> `Network` -> `SSL Configuration Settings` -> **SSL Cipher Suite Order**:
İlkeyi **Enabled** yapın ve listenin en başına TLS 1.3 şifreleyicileri gelecek şekilde şu tek satırı girin:

```text
TLS_AES_256_GCM_SHA384,TLS_AES_128_GCM_SHA256,TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_DHE_RSA_WITH_AES_256_GCM_SHA384,TLS_DHE_RSA_WITH_AES_128_GCM_SHA256
```

> [!IMPORTANT]
> Bu GPO listesinde TLS 1.3 şifreleme paketleri en başta yer almazsa, Windows Server 2022/2025 ve Windows 11 kayıt defterinde TLS 1.3 açık olsa dahi TLS 1.3 el sıkışmasını gerçekleştiremeyebilir.

---

### 5.3 Acil Geri Alma (Rollback) ve GPO Tattooing Koruması

> [!CAUTION]
> **GPO Tattooing Tehlikesi:**  
> Group Policy Preferences (GPP) ile uygulanan kayıt defteri değerleri, GPO silinse dahi sistemde kalmaya devam eder. Startup Script ise her açılışta ayarları tekrar basar.  
> Bu yüzden geri alma işlemine **MUTLAKA ilgili GPO bağlantısını (link) keserek** başlanmalıdır!

```text
[1. GPO Bağlantısını Kes] ===> [2. Rollback Scripti]     ===> [3. Kademeli Reboot]      ===> [4. Servis Doğrulaması]
Sıkılaştırma GPO'sunu          Kayıt defterini OS             Sunucuları planlı bakım        testssl / nmap ile
OU'dan un-link edin.           varsayılanına döndürün         pencerelerinde sırayla         uygulamaların açıldığını
(Tattooing döngüsünü önleyin)  (PowerShell temizlik scripti)  yeniden başlatın.              teyit edin.
```

#### PowerShell ile Temizleme Scripti (`Rollback-SCHANNEL.ps1`)
```powershell
# 1. Eklenen SCHANNEL Protokollerini Silerek OS Varsayılanına Döndürme
$protocols = @("SSL 2.0", "SSL 3.0", "TLS 1.0", "TLS 1.1", "TLS 1.2", "TLS 1.3", "PCT 1.0", "Multi-Protocol Unified Hello")
foreach ($p in $protocols) {
    Remove-Item "HKLM:\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\$p" -Recurse -Force -ErrorAction SilentlyContinue
}

# 2. Şifreleyici Kısıtlamalarını Kaldırma
$ciphers = @("Triple DES 168", "RC4 128/128", "RC4 40/128", "RC4 56/128")
foreach ($c in $ciphers) {
    Remove-Item "HKLM:\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Ciphers\$c" -Recurse -Force -ErrorAction SilentlyContinue
}
Remove-Item "HKLM:\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Hashes\MD5" -Recurse -Force -ErrorAction SilentlyContinue

# 3. Diffie-Hellman Anahtar Kısıtlamalarını Kaldırma
$dhKey = "HKLM:\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\KeyExchangeAlgorithms\Diffie-Hellman"
Remove-ItemProperty -Path $dhKey -Name "ServerMinKeyBitLength" -ErrorAction SilentlyContinue
Remove-ItemProperty -Path $dhKey -Name "ClientMinKeyBitLength" -ErrorAction SilentlyContinue

# 4. .NET StrongCrypto Anahtarlarını Temizleme
$netPaths = @(
    "HKLM:\SOFTWARE\Microsoft\.NETFramework\v4.0.30319",
    "HKLM:\SOFTWARE\WOW6432Node\Microsoft\.NETFramework\v4.0.30319",
    "HKLM:\SOFTWARE\Microsoft\.NETFramework\v2.0.50727",
    "HKLM:\SOFTWARE\WOW6432Node\Microsoft\.NETFramework\v2.0.50727"
)
foreach ($path in $netPaths) {
    Remove-ItemProperty -Path $path -Name "SchUseStrongCrypto" -ErrorAction SilentlyContinue
    Remove-ItemProperty -Path $path -Name "SystemDefaultTlsVersions" -ErrorAction SilentlyContinue
}

Write-Host "SCHANNEL ve .NET kısıtlamaları kaldırıldı. Lütfen sunucuyu yeniden başlatın (Reboot)." -ForegroundColor Green
```

---

## 6. Linux İşletim Sistemi Seviyesinde Sıkılaştırma

### 6.1 RHEL / Rocky / AlmaLinux / Fedora (`crypto-policies`)
RHEL tabanlı sistemlerde tüm kriptografik kütüphaneler (OpenSSL, GnuTLS, NSS, Java) merkezi politika motoruyla yönetilir:

```bash
# Mevcut politikayı görüntüleme
update-crypto-policies --show

# Sistem genelinde TLS 1.0 ve 1.1'i kapatıp en az TLS 1.2 seviyesini zorlama:
sudo update-crypto-policies --set DEFAULT
```

> [!WARNING]
> Üretim ortamlarında `update-crypto-policies --set FUTURE` seçeneğini kullanırken dikkatli olun. `FUTURE` profili, asimetrik anahtarlarda en az 3072-bit zorunluluğu getirir; bu durum kurum içindeki 2048-bit RSA sertifikalarına sahip servislerle iletişimi koparabilir.

---

### 6.2 Debian / Ubuntu (`/etc/ssl/openssl.cnf`)
Debian ve Ubuntu dağıtımlarında OpenSSL kütüphanesini kullanan uygulamalar için minimum TLS sürümünü sistem genelinde zorlayın:

```ini
# /etc/ssl/openssl.cnf dosyasının sonuna ekleyin veya düzenleyin:
[system_default_sect]
MinProtocol = TLSv1.2
CipherString = DEFAULT@SECLEVEL=2
```

> [!NOTE]
> Bu yapılandırma OpenSSL'e dinamik olarak bağlı araçları (curl, python, nginx vb.) etkiler. Go yerleşik yığını (`crypto/tls`) ve Java yığını (`/etc/java-*/security/java.security` altındaki `jdk.tls.disabledAlgorithms`) bağımsız olarak sıkılaştırılmalıdır.

---

## 7. Servis Bazlı Sertleştirme (IIS, Nginx, Apache, Postfix)

### 7.1 Microsoft IIS 10.0+ ve HSTS
Windows Server 2019+ GUI üzerinden veya `web.config` ile Strict-Transport-Security başlığını en az 1 yıl (`31536000` saniye) süreli tanımlayın:

```xml
<system.webServer>
  <httpProtocol>
    <customHeaders>
      <add name="Strict-Transport-Security" value="max-age=31536000; includeSubDomains" />
    </customHeaders>
  </httpProtocol>
</system.webServer>
```

---

### 7.2 Nginx Yapılandırması (A+ Skoru & PFS & OCSP Stapling)
`/etc/nginx/nginx.conf` veya ilgili site yapılandırma bloğu:

```nginx
# Yalnızca modern TLS sürümleri
ssl_protocols TLSv1.2 TLSv1.3;

# Modern PFS ve AEAD şifreleme paketleri (TLS 1.2 için)
ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384';
ssl_prefer_server_ciphers off;

# Oturum önbelleği ve STEK anahtar sızıntısı riskine karşı ticket kapatma
ssl_session_cache shared:SSL:10m;
ssl_session_timeout 1d;
ssl_session_tickets off;

# Sertifika doğrulama gecikmesini önleyen OCSP Stapling
ssl_stapling on;
ssl_stapling_verify on;
resolver 1.1.1.1 8.8.8.8 valid=300s;
resolver_timeout 5s;

# HSTS Başlığı (1 Yıl)
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

---

### 7.3 Apache HTTP Server Yapılandırması
`/etc/apache2/mods-available/ssl.conf` veya `/etc/httpd/conf.d/ssl.conf`:

```apache
# Yalnızca TLS 1.2 ve 1.3
SSLProtocol -all +TLSv1.2 +TLSv1.3

# PFS ve AEAD şifreleme paketleri
SSLCipherSuite ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384
SSLHonorCipherOrder off
SSLSessionTickets off

# OCSP Stapling
SSLUseStapling On
SSLStaplingCache "shmcb:logs/ssl_stapling(32768)"

# HSTS Başlığı
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```

---

### 7.4 Postfix E-Posta Sunucusu (MTA)
E-posta mimarisinde iki farklı trafik türü bulunur:
1. **İstemci Gönderimi (Port 587 Submission):** Zorunlu TLS (`encrypt`) ve kimlik doğrulama gerektirir.
2. **Sunucular Arası E-Posta Alışverişi (Port 25 SMTP):** Fırsatçı TLS (`may`) kullanılır.

#### `/etc/postfix/main.cf`
```text
# Zorunlu TLS oturumlarında TLS 1.2 ve üzerini zorunlu tut
smtpd_tls_mandatory_protocols = >=TLSv1.2
smtp_tls_mandatory_protocols = >=TLSv1.2

# DİKKAT: smtpd_tls_protocols ve smtp_tls_protocols satırlarına katı TLS 1.2 dayatmayın!
# İnternet genelindeki Port 25 trafiğinde fırsatçı TLS Postfix varsayılanında kalmalıdır.
```

#### `/etc/postfix/master.cf`
```text
submission inet n       -       y       -       -       smtpd
  -o syslog_name=postfix/submission
  -o smtpd_tls_security_level=encrypt
  -o smtpd_tls_mandatory_protocols=>=TLSv1.2
  -o smtpd_sasl_auth_enable=yes
```

---

## 8. Doğrulama ve Güvenlik Denetimi

Sunucular yeniden başlatıldıktan sonra Qualys SSL Labs üzerinde A+ skoru alınabilmesi için şu koşulların sağlandığını doğrulayın:

1. **Sertifika Zinciri:** Sertifika geçerli, eksiksiz ara kök sertifikalara (Intermediate CA) sahip ve en az 2048-bit RSA ya da 256-bit ECC olmalıdır.
2. **Protokoller:** SSL 2.0, 3.0, TLS 1.0 ve 1.1 tamamen kapalı; TLS 1.2 ve TLS 1.3 açık olmalıdır.
3. **Şifreleyiciler:** 3DES, RC4 ve MD5 kesinlikle elenmiş olmalı; İleri Gizlilik (ECDHE) desteklenmelidir.
4. **HSTS:** `max-age` değeri en az 6 ay (önerilen: 1 yıl = `31536000`) olan `Strict-Transport-Security` başlığı dönmelidir (HSTS olmadan alınabilecek en yüksek not **A** ile sınırlıdır).

#### Written by faruk-guler with love in Turkey 💖
