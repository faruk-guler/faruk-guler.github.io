---
layout: post
title: "Serverler'de SSL/TLS Testleri ve Güvenliği -Linux"
date: 2025-09-22 23:14
by: faruk-guler
comments: true
categories: [Hacking - Security]
tags: [SSL, TLS, Kriptografi, Sıkılaştırma]
---

## 📌 Serverler'de SSL/TLS Testleri ve Güvenliği -Linux

Günümüz ağ ve sunucu güvenliğinde verinin iletim hattında (in-transit) şifrelenmesi en temel gereksinimlerden biridir. Ancak yalnızca "şifreleme kullanıyor olmak" tek başına yeterli değildir; arka planda hangi **protokol sürümünün** (SSLv2, SSLv3, TLS 1.0, 1.1, 1.2, 1.3) ve hangi **şifre takımlarının (cipher suites)** devrede olduğu kritik bir güvenlik parametresidir.

Eski protokoller (SSLv3, TLS 1.0 ve TLS 1.1) POODLE, BEAST ve SWEET32 gibi köklü kriptografik zafiyetlere davetiye çıkarırken; modern güvenlik standartları (PCI-DSS, NIST, ISO 27001) sistemlerde yalnızca **TLS 1.2 ve TLS 1.3** kullanımına izin vermektedir.

Bu rehberde;
* **İstemci Davranışını Test Etme:** Linux üzerinde OpenSSL'in hangi TLS sürümlerine izin verdiğini yerel bir geçici test sunucusu (`s_server`) ayağa kaldırarak doğrulamayı,
* **Açık Port Taraması:** Makinedeki açık portların TLS kullanıp kullanmadığını tespit etmeyi,
* **testssl.sh ile Kapsamlı Analiz:** Hem yerel sistemlerin hem de uzaktaki sunucuların (Linux veya Windows servisleri; IIS, RDP, LDAPS vb.) TLS yapılandırmalarını ve güvenlik açıklarını derinlemesine denetlemeyi adım adım inceleyeceğiz.

---

![SSL ve TLS Karşılaştırması](https://farukguler.com/assets/post_images/ssl-tls.png?w=589 "SSL ve TLS Kriptografik Protokolleri")

## 🧪 1. Aşama: Yerel TLS Sürüm Testi (OpenSSL)

Bu aşamada; OpenSSL'in sistemimizde hangi SSL/TLS sürümleriyle bağlantı kurabildiğini test etmek amacıyla geçici, kendinden imzalı bir sertifika üreterek izole bir yerel sunucu başlatacağız.

### 1. Test Sertifikası Oluşturma

```bash
cd /tmp
openssl req -x509 -newkey rsa:2048 -nodes -keyout k.pem -out c.pem -days 1 -subj "/CN=localhost"
```

Bu komut; parolasız, 1 gün geçerli, geçici bir self-signed sertifika oluşturur.

### 2. Test Sunucusunu Başlatma

Ayrı bir terminalde (ya da sonuna `&` ekleyerek arka planda) çalıştırın:

```bash
openssl s_server -accept 4433 -key k.pem -cert c.pem -www
```

### 3. Her TLS Sürümünü Deneme

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

> Bu test, OpenSSL'in **istemci tarafı** davranışını gösterir. Bir servisin hangi sürümleri kabul ettiğini görmek için o servisin kendi portuna karşı test yapmanız gerekir (bkz. 2. Aşama).

### 4. Yardımcı Komutlar

Derlenmiş sürüm bayraklarını listele:

```bash
openssl s_client -help 2>&1 | grep -E "ssl3|tls1"
```

Sürüm zorlamadan müzakere edilen sonucu gör:

```bash
openssl s_client -connect localhost:4433 </dev/null 2>&1 | grep -E "Protocol|Cipher"
```

## 🧪 2. Aşama: Açık Portlarda TLS Var mı? (Port Taraması)

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

## 🧪 3. Aşama: testssl.sh ile Kapsamlı TLS ve Zafiyet Analizi

`testssl.sh`, bir hedef üzerindeki TLS yapılandırmasını derinlemesine analiz eden açık kaynaklı bir araçtır. Sürüm desteği, şifre takımları, sertifika zinciri ve bilinen zafiyetler (BEAST, POODLE, Heartbleed vb.) dahil pek çok kontrolü otomatik olarak yapar.

### Kurulum

```bash
git clone --depth 1 https://github.com/drwetter/testssl.sh.git
cd testssl.sh
chmod +x testssl.sh
```

---

### Protokol Testi

```bash
./testssl.sh -p localhost:4433
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

### Şifre Takımı (Cipher Suite) Analizi

```bash
./testssl.sh -e localhost:4433
./testssl.sh -e 10.5.12.130:443
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

### `./testssl.sh -e farukguler.com:8080` — Standart Dışı Port

```bash
./testssl.sh -e farukguler.com:8080
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

### 💡 Windows Sunucuların Durumu

TLS işletim sisteminden bağımsız bir ağ protokolüdür. Dolayısıyla `testssl.sh` yalnızca Linux için değil; ağ üzerinden erişilebilen herhangi bir **Windows Server** için de doğrudan kullanılabilir.

Windows üzerinde test yapabilmek için sunucuda IIS (Web Sunucusu) kurulu olması şart değildir. Uzak Masaüstü (RDP), Active Directory (LDAPS) veya TLS şifrelemesi kullanan herhangi bir servis üzerinden sunucunun genel kriptografik durumu denetlenebilir. Dışarıdan yapılan bu ağ taraması; Windows sunucuya herhangi bir ajan veya yazılım kurmaya gerek kalmadan, işletim sisteminin ağa gerçekte hangi protokol ve şifreleme takımlarını sunduğunu doğrudan doğrulamayı sağlar.

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

## 🧹 4. Aşama: Temizlik

```bash
pkill -f "s_server -accept 4433"
rm -f /tmp/k.pem /tmp/c.pem
```

