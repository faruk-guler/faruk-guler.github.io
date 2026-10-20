---
layout: post
title: "SSL/TLS Versiyon ve Zafiyet Testleri — Linux & Windows"
date: 2025-09-22 23:11
by: faruk-guler
comments: true
categories: [Hacking - Security]
tags: [SSL, TLS, Kriptografi, Sıkılaştırma]
---

> **Kapsam:** Bu rehber hem Linux (OpenSSL) hem de Windows (PowerShell / openssl.exe) ortamlarında TLS sürüm testini ve açık port sorgusunu kapsar. Yalnızca yetkili olduğunuz sistemlerde çalıştırın.

---

![SSL ve TLS Karşılaştırması](https://farukguler.com/assets/post_images/ss-tls.jpg?w=589 "SSL ve TLS Kriptografik Protokolleri")

## OpenSSL ile TLS Sürüm Testi — Linux

Bu not; bir Linux makinesinde OpenSSL'in hangi SSL/TLS sürümleriyle iletişim kurabildiğini ve açık portların TLS kullanıp kullanmadığını test etmek içindir. Komutları yalnızca test yetkisine sahip olduğunuz sistemlerde çalıştırın.

## 1. Test Sertifikası Oluşturma

```bash
cd /tmp
openssl req -x509 -newkey rsa:2048 -nodes -keyout k.pem -out c.pem -days 1 -subj "/CN=localhost"
```

Bu komut; parolasız, 1 gün geçerli, geçici bir self-signed sertifika oluşturur.

## 2. Test Sunucusunu Başlatma

Ayrı bir terminalde (ya da sonuna `&` ekleyerek arka planda) çalıştırın:

```bash
openssl s_server -accept 4433 -key k.pem -cert c.pem -www
```

## 3. Her TLS Sürümünü Deneme

`s_client -help` çıktısından sürüm bayraklarını otomatik bulur:

```bash
for v in $(openssl s_client -help 2>&1 | grep -oE '^ *-(ssl3|tls1[_0-9]*)' | tr -d ' -'); do
  echo -n "$v: "
  openssl s_client -connect localhost:4433 -$v </dev/null 2>&1 \
    | grep -m1 -oE "Protocol: .*|no protocols available|alert.*" || echo RED
done
```

### Sonucu Okuma

| Çıktı | Anlamı |
| --- | --- |
| `Protocol: TLSv1.x` | Sürüm kabul edildi |
| `no protocols available` | İstemci tarafında devre dışı (güvenlik seviyesi) |
| `alert ...` | Sunucu bu sürümü reddetti |
| `RED` | Eşleşen çıktı bulunamadı |
| Listede yok | Bu OpenSSL derlemesinde mevcut değil (örn. `ssl3`) |

Modern sistemlerde beklenen sonuç: `tls1` ve `tls1_1` devre dışı, `tls1_2` ve `tls1_3` etkin.

> Bu test, OpenSSL'in **istemci tarafı** davranışını gösterir. Bir servisin hangi sürümleri kabul ettiğini görmek için o servisin kendi portuna karşı test yapmanız gerekir (bkz. bölüm 5).

## 4. Yardımcı Komutlar

Derlenmiş sürüm bayraklarını listele:

```bash
openssl s_client -help 2>&1 | grep -E "ssl3|tls1"
```

Sürüm zorlamadan müzakere edilen sonucu gör:

```bash
openssl s_client -connect localhost:4433 </dev/null 2>&1 | grep -E "Protocol|Cipher"
```

## 5. Açık Portlarda TLS Var mı?

```bash
for p in $(ss -tln | tail -n +2 | awk '{print $4}' | grep -v '^127\.' | grep -v '^\[::1\]' | sed 's/.*://' | sort -un); do
  if echo | timeout 5 openssl s_client -connect 127.0.0.1:$p 2>/dev/null | grep -q "BEGIN CERTIFICATE"; then
    echo "$p : TLS VAR"
  else
    echo "$p : TLS YOK (veya STARTTLS gerekli)"
  fi
done
```

### Kısıtlamalar

- Komut `127.0.0.1` üzerinden bağlanır. Yalnızca sunucunun gerçek IP'sine bağlı servisler yanlışlıkla "TLS YOK" görünebilir; bu durumda `127.0.0.1` yerine gerçek IP'yi kullanın.
- SMTP, IMAP ve LDAP gibi **STARTTLS** kullanan portlar "TLS YOK" olarak görünür. Bunlar için `-starttls smtp` gibi bir bayrak gerekir.
- SSH (22) TLS kullanmaz; "TLS YOK" sonucu doğrudur.

---

## 6. testssl.sh ile Kapsamlı TLS Analizi

`testssl.sh`, bir hedef üzerindeki TLS yapılandırmasını derinlemesine analiz eden açık kaynaklı bir araçtır. Sürüm desteği, şifre takımları, sertifika zinciri ve bilinen zafiyetler (BEAST, POODLE, Heartbleed vb.) dahil pek çok kontrolü otomatik olarak yapar.

### Kurulum

```bash
git clone --depth 1 https://github.com/drwetter/testssl.sh.git
cd testssl.sh
chmod +x testssl.sh
```

---

### `./testssl.sh -p 10.5.12.130:443` — Protokol Testi

```bash
./testssl.sh -p 10.5.12.130:443
```

**Ne yapar?**

`-p` (protocols) bayrağı; hedef sunucunun hangi SSL/TLS protokol sürümlerini desteklediğini tek tek test eder:

| Test Edilen Protokol | Beklenen Güvenli Sonuç |
| --- | --- |
| SSLv2 | ❌ Kapalı |
| SSLv3 | ❌ Kapalı |
| TLS 1.0 | ❌ Kapalı (eski) |
| TLS 1.1 | ❌ Kapalı (eski) |
| TLS 1.2 | ✅ Açık (güvenli) |
| TLS 1.3 | ✅ Açık (güvenli) |

> **Ne zaman kullanılır?** Bir sunucunun eski ve zayıf protokollere (SSLv2, SSLv3, TLS 1.0/1.1) kapı açıp açmadığını hızlıca doğrulamak için idealdir. Sıkılaştırma denetimlerinde ilk çalıştırılacak komuttur.

**Örnek çıktı:**

```text
 SSLv2      not offered (OK)
 SSLv3      not offered (OK)
 TLS 1      not offered (OK)
 TLS 1.1    not offered (OK)
 TLS 1.2    offered (OK)
 TLS 1.3    offered (OK)
```

---

### `./testssl.sh -E 10.5.12.130:443` — Şifre Takımı (Cipher Suite) Analizi

```bash
./testssl.sh -E 10.5.12.130:443
```

**Ne yapar?**

`-E` (each cipher) bayrağı; sunucunun desteklediği **tüm şifre takımlarını** (cipher suites) tek tek listeler ve her birinin güvenlik durumunu değerlendirir:

| Renk / Etiket | Anlamı |
| --- | --- |
| 🟢 `OK` / `STRONG` | Güçlü, kullanımı önerilen şifre |
| 🟡 `MEDIUM` | Orta güvenlik, dikkatli kullanılmalı |
| 🔴 `WEAK` / `DES` / `RC4` | Zayıf, devre dışı bırakılmalı |
| ⬛ `not offered` | Sunucu bu şifreyi desteklemiyor |

**Kontrol ettiği başlıca şeyler:**

- NULL, EXPORT, DES, RC4 gibi kırık şifreler
- Forward Secrecy (PFS) desteği (ECDHE, DHE)
- 3DES / SWEET32 açığına maruz kalan şifreler
- Anahtar uzunlukları (≥128 bit güvenli kabul edilir)

> **Ne zaman kullanılır?** Sunucunun şifre politikasını denetlemek, zayıf şifreleri kapatmak veya PCI-DSS / NIST uyumluluk kontrolü yaparken kullanılır.

---

### `./testssl.sh -E farukguler.com:8080` — Standart Dışı Port

```bash
./testssl.sh -E farukguler.com:8080
```

**Ne yapar?**

Bir önceki komutun aynısını yapar; tek fark hedefin **8080 portu** olmasıdır. testssl.sh herhangi bir port üzerinde TLS çalıştıran servisleri analiz edebilir (443'e kısıtlı değildir).

**Hangi durumlar için gereklidir?**

| Senaryo | Örnek |
| --- | --- |
| Uygulama sunucuları (Tomcat, JBoss vb.) | `:8080`, `:8443` |
| API gateway / reverse proxy | `:8080`, `:9443` |
| Dahili servisler | `:5000`, `:3443` |
| LDAPS | `:636` |
| SMTPS | `:465` |

> **İpucu:** Standart olmayan portlarda TLS kullanan servislerin şifre yapılandırması çoğu zaman 443'teki kadar sıkılaştırılmamış olur; bu nedenle bu test özellikle önemlidir.

---

### testssl.sh — Diğer Yararlı Bayraklar

| Bayrak | Açıklama |
| --- | --- |
| `-p` | Protokol sürümleri testi |
| `-E` | Tüm şifre takımları testi |
| `-U` | Tüm bilinen açıklar (BEAST, POODLE, Heartbleed, vb.) |
| `-S` | Sertifika bilgileri (geçerlilik, CN, SAN, zincir) |
| `-f` | Forward Secrecy desteği |
| `--html` | Sonuçları HTML olarak kaydet |
| `--json` | Sonuçları JSON olarak kaydet |
| `--severity HIGH` | Yalnızca yüksek ve kritik bulguları göster |

**Tam denetim (tüm kontroller bir arada):**

```bash
./testssl.sh --html 10.5.12.130:443
```

---

## 7. Temizlik

```bash
pkill -f "s_server -accept 4433"
rm -f /tmp/k.pem /tmp/c.pem
```

---

## TLS Sürüm Testi — Windows

> Windows'ta TLS testi için **PowerShell** (yerleşik) ve isteğe bağlı olarak **openssl.exe** (Win64 port) kullanılır.

## 1. Yerel Test Sertifikası Oluşturma (Windows)

Linux'ta `openssl req` ile sertifika oluşturduk. Windows'ta buna karşılık gelen PowerShell cmdlet'i `New-SelfSignedCertificate`'tir.

> ⚠️ **Yönetici (Administrator) yetkisi gerektirir.**

```powershell
# Sertifikayı Windows Certificate Store'a ekle (LocalMachine\My)
$cert = New-SelfSignedCertificate `
    -DnsName "localhost" `
    -CertStoreLocation "Cert:\LocalMachine\My" `
    -NotAfter (Get-Date).AddDays(1) `
    -KeyAlgorithm RSA `
    -KeyLength 2048

Write-Host "Sertifika oluşturuldu."
Write-Host "Thumbprint : $($cert.Thumbprint)"
Write-Host "Konu       : $($cert.Subject)"
Write-Host "Geçerlilik : $($cert.NotBefore) — $($cert.NotAfter)"

# Thumbprint'i sonraki adımlarda kullanmak üzere sakla
$thumbprint = $cert.Thumbprint
```

> **Not:** Linux'taki gibi `.pem` dosyası oluşturulmaz; sertifika doğrudan **Windows Sertifika Deposu**'na (Certificate Store) yazılır. Temizlik adımında `$thumbprint` değişkeniyle bu sertifika silinir.

---

## 2. PowerShell ile TLS Sürüm Testi (Belirli Host)

Bir hedefe hangi TLS sürümlerinin kabul edildiğini sorgular:

```powershell
# Test edilecek hedef
$target = "example.com"
$port   = 443

$versions = @(
    [System.Security.Authentication.SslProtocols]::Ssl3,   # ⚠️ .NET 6+ 'de Obsolete uyarısı verir
    [System.Security.Authentication.SslProtocols]::Tls,    # TLS 1.0
    [System.Security.Authentication.SslProtocols]::Tls11,  # TLS 1.1
    [System.Security.Authentication.SslProtocols]::Tls12,  # TLS 1.2
    [System.Security.Authentication.SslProtocols]::Tls13   # TLS 1.3
)

# Sertifika doğrulamasını atlayan callback (yalnızca test ortamı!)
$certCallback = [System.Net.Security.RemoteCertificateValidationCallback]{ $true }

foreach ($ver in $versions) {
    try {
        $tcp = [System.Net.Sockets.TcpClient]::new($target, $port)
        $ssl = [System.Net.Security.SslStream]::new($tcp.GetStream(), $false, $certCallback)
        $ssl.AuthenticateAsClient($target, $null, $ver, $false)
        Write-Host "$ver : KABUL EDİLDİ  (Şifre: $($ssl.CipherAlgorithm))" -ForegroundColor Green
        $ssl.Close(); $tcp.Close()
    } catch {
        Write-Host "$ver : REDDEDİLDİ / DESTEKLENMIYOR" -ForegroundColor Red
    }
}
```

## 3. Açık Portlarda TLS Var mı? (Port Tarama)

```powershell
# Dinlenen portları listele ve TLS destekleyip desteklemediklerini kontrol et
$listeningPorts = (Get-NetTCPConnection -State Listen).LocalPort | Sort-Object -Unique

# Sertifika doğrulamasını atlayan callback (yalnızca test ortamı!)
$certCallback = [System.Net.Security.RemoteCertificateValidationCallback]{ $true }

foreach ($port in $listeningPorts) {
    try {
        $tcp = [System.Net.Sockets.TcpClient]::new("127.0.0.1", $port)
        $ssl = [System.Net.Security.SslStream]::new($tcp.GetStream(), $false, $certCallback)
        $ssl.AuthenticateAsClient("localhost", $null,
            [System.Security.Authentication.SslProtocols]::Tls12, $false)
        Write-Host "Port $port : TLS VAR  (TLS 1.2+)" -ForegroundColor Green
        $ssl.Close(); $tcp.Close()
    } catch {
        Write-Host "Port $port : TLS YOK veya STARTTLS gerekli" -ForegroundColor Yellow
    }
}
```

## 4. Registry ile Sistem TLS Ayarlarını Sorgula

Windows'un hangi TLS sürümlerine izin verdiğini Registry'den okur:

```powershell
$basePath = "HKLM:\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols"

$protocols = @("SSL 2.0","SSL 3.0","TLS 1.0","TLS 1.1","TLS 1.2","TLS 1.3")

foreach ($proto in $protocols) {
    foreach ($role in @("Client","Server")) {
        $regPath = "$basePath\$proto\$role"
        $enabled = try {
            $val = (Get-ItemProperty -Path $regPath -Name "Enabled" -EA Stop).Enabled
            if ($val -eq 1) { "AÇIK" } elseif ($val -eq 0) { "KAPALI" } else { "Değer: $val" }
        } catch { "Registry kaydı yok (varsayılan)" }

        $disabledByDefault = try {
            (Get-ItemProperty -Path $regPath -Name "DisabledByDefault" -EA Stop).DisabledByDefault
        } catch { "-" }

        Write-Host ("{0,-10} | {1,-6} | Etkin: {2,-22} | VarsayılanDevre: {3}" `
            -f $proto, $role, $enabled, $disabledByDefault)
    }
}
```

### Örnek Çıktı

| Protokol | Rol    | Etkin                  | VarsayılanDevre |
|----------|--------|------------------------|-----------------|
| TLS 1.0  | Client | KAPALI                 | 1               |
| TLS 1.2  | Client | Registry kaydı yok     | -               |
| TLS 1.3  | Server | AÇIK                   | 0               |

> Registry kaydı yoksa Windows kendi varsayılanını uygular. Windows 11 / Server 2022 üzerinde TLS 1.3 varsayılan olarak **etkindir**.

## 5. openssl.exe ile TLS Sürüm Testi (Windows — İsteğe Bağlı)

Win64 OpenSSL kuruluysa (`winget install ShiningLight.OpenSSL` veya [slproweb.com](https://slproweb.com/products/Win32OpenSSL.html)):

```powershell
$target = "example.com:443"

@("tls1","tls1_1","tls1_2","tls1_3") | ForEach-Object {
    $result = & openssl s_client -connect $target -$_ *>&1 |
              Select-String -Pattern "Protocol|no protocols available|alert"
    Write-Host "$_ : $($result | Select-Object -First 1)"
}
```

## 6. Hızlı Özet — Windows TLS Komutları

| Amaç | Komut |
| --- | --- |
| .NET TLS sürüm durumu | `[System.Net.ServicePointManager]::SecurityProtocol` |
| Desteklenen sürümleri listele | `[enum]::GetNames([System.Security.Authentication.SslProtocols])` |
| Registry TLS durumu | `Get-ItemProperty "HKLM:\...\Protocols\TLS 1.2\Client"` |
| Açık portları listele | `Get-NetTCPConnection -State Listen` |
| openssl.exe ile test | `openssl s_client -connect host:443 -tls1_2` |

## 7. Windows Temizlik

Bölüm 1'de `New-SelfSignedCertificate` ile **Certificate Store'a** eklenen test sertifikasını sil:

```powershell
# $thumbprint değişkeni Bölüm 1'de tanımlanmıştı
# Eğer oturumu kapattıysanız thumbprint'i elle girin:
# $thumbprint = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"

if ($thumbprint) {
    Remove-Item -Path "Cert:\LocalMachine\My\$thumbprint" -Force
    Write-Host "Sertifika Certificate Store'dan silindi: $thumbprint" -ForegroundColor Green
} else {
    Write-Warning "`$thumbprint değişkeni bulunamadı. Sertifikayı elle silin:"
    Write-Host "  certlm.msc > Personal > Certificates > CN=localhost > Sil"
}
```

> **Alternatif (GUI):** `certlm.msc` → **Personal → Certificates** → `CN=localhost` → Sağ tık → **Delete**
>
> **Alternatif (certutil):**
>
> ```powershell
> certutil -delstore My "localhost"
> ```
