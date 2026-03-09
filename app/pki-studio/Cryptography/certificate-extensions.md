# 🗂️ Sertifika Formatları, Uzantıları ve Dönüşüm Rehberi

> SSL/TLS dünyasında farklı şifreleme yapıları (PEM, DER, PKCS) ve onlarca farklı uzantı (.crt, .p12, .key) kullanılır.  
> Bu sayfa, hangi formattaki verinin hangi uzantıya sahip olması gerektiğini ve bunlar arasındaki dönüşümleri açıklar.

---

## 🏗️ Temel Format Türleri

Sertifikalar ve anahtarlar temelde **iki farklı şekilde** kodlanır:

1. **PEM (Privacy-Enhanced Mail):** Base64 (metin) formatındadır. `-----BEGIN...` ile başlar.
2. **DER (Distinguished Encoding Rules):** ASN.1 kodlu Binary (ikili) formattır. İnsan tarafından okunamaz.

PKCS ise bir standartlar bütünüdür. Örneğin PKCS#12 (p12/pfx), içinde her şeyi barındıran şifreli binary bir pakettir.

---

## 📋 Hızlı Karşılaştırma Tablosu

| Uzantı | Kodlama Türü | İçerik | Kullanım Yeri |
|---|---|---|---|
| `.pem` | PEM (metin) | Key, sertifika, CSR | Linux, Nginx, Apache |
| `.crt` | PEM veya DER | Sertifika | Linux, Nginx, Apache |
| `.cer` | PEM veya DER | Sertifika | Windows, tarayıcılar |
| `.key` | PEM | Private key | Linux, Nginx, Apache |
| `.csr` | PEM (metin) | Sertifika imzalama talebi | CA'ya gönderilir |
| `.der` | DER (binary) | Key veya sertifika | Java, donanımlar, IP Kameralar |
| `.p12` / `.pfx` | PKCS#12 (binary) | Key + Sertifika + Zincir | Windows, IIS, Java, F5, Azure |
| `.p7b` / `.p7c` | PKCS#7 (PEM) | Sertifika zinciri (key içermez)| Windows, Java, E-posta |
| `.jks` | JKS (binary) | Java KeyStore | Tomcat, Spring Boot, Wildfly |
| `.crl` | PEM veya DER | İptal edilen sertifika listesi | Kurumsal PKI / CA |
| `.p8` | PKCS#8 (PEM/DER) | Algoritma bağımsız private key| Apple Push, bazı REST API'ler |
| `.ca-bundle` | PEM | Birden fazla CA sertifikası | cPanel, WHM hosting panelleri |
| `.srl` | Metin | CA seri numarası | OpenSSL CA veritabanı |
| `.cnf` / `.conf` | Metin (INI) | OpenSSL yapılandırması | OpenSSL |
| `.ext` | Metin | X.509 uzantı ayarları | OpenSSL imzalama |

---

## 🔄 Format ve Uzantılar Arası Dönüşüm Komutları

En sık ihtiyaç duyulan dönüşüm işlemleri aşağıdadır. (Tümü OpenSSL ile yapılır).

### 1. PEM ↔ DER Dönüşümleri

```bash
# PEM Sertifikayı -> DER'e Çevir
openssl x509 -in dosya.pem -outform der -out dosya.der

# DER Sertifikayı -> PEM'e Çevir
openssl x509 -in dosya.der -inform der -out dosya.pem -outform pem

# PEM Private Key'i -> DER'e Çevir
openssl rsa -in dosya.key -outform der -out dosya.der

# DER Private Key'i -> PEM'e Çevir
openssl rsa -in dosya.der -inform der -out dosya.key -outform pem
```

---

### 2. Standart PEM → Paket (.pfx / .p12) Oluşturma

> Windows/IIS ve Azure gibi sistemler private key ve sertifikayı ayrı dosyalar halinde değil, tek bir `.pfx/.p12` paketi içinde şifreli olarak ister.

```bash
openssl pkcs12 -export \
  -out keystore.p12 \
  -inkey private.key \
  -in sertifika.crt \
  -certfile myCA.crt
```
> **Not:** Windows sistemlerinde `.p12` uzantısını `keystore.pfx` olarak değiştirebilirsiniz, format aynıdır. Girdi sertifikaların `.pem` veya `.crt` olması fark etmez.

---

### 3. Paket (.p12 / .pfx) İçeriğini Dışarı Çıkarma

> Windows'tan (.pfx) dışarı alınan bir sertifikayı Linux/Nginx sisteminde kullanmak için içindeki anahtar ve sertifikayı ayrı ayrı `.pem` formatında dışarı çıkarmanız gerekir.

```bash
# 1. İçindeki her şeyi görmek için:
openssl pkcs12 -info -in keystore.p12

# 2. Yalnızca Private Key'i çıkarmak için (-nodes şifrelemeyi kaldırır):
openssl pkcs12 -in keystore.p12 -nocerts -nodes -out private.key
# OpenSSL 3.x'te: -nodes yerine -noenc kullanın

# 3. Yalnızca Sertifikayı çıkarmak için:
openssl pkcs12 -in keystore.p12 -nokeys -out sertifika.crt
```

---

### 4. PKCS#7 (.p7b) → PEM (.crt/ .cer)

Genellikle root/intermediate (zincir) sertifikalar toplu olarak bu formatta gelir.

```bash
openssl pkcs7 -in dosya.p7b -print_certs -out tam_zincir.crt
```

---

### 5. Java Keystore (.jks) Dönüşümleri

> Modern Java (Spring Boot) artık PKCS#12 (.p12) kullanmaktadır. Ancak eski Java (Tomcat) sistemleri JKS formatını (.jks) isteyebilir.

```bash
# Mevcut bir .p12 paketini -> .jks formatına çevir
keytool -importkeystore \
  -srckeystore keystore.p12 -srcstoretype PKCS12 \
  -destkeystore keystore.jks -deststoretype JKS
```

---

### 6. Standart Private Key (PKCS#1) → PKCS#8 (.p8)

> Apple Push Notifications (APNs) ve JWT kullanan bazı modern API'ler anahtarın PKCS#8 (.p8) formatında olmasını zorunlu tutar.

```bash
openssl pkcs8 -topk8 -inform PEM -outform PEM \
  -in private.key -out private.p8 -nocrypt
```

---

## 🔒 Let's Encrypt / Certbot İsimlendirme Standardı

Let's Encrypt (Certbot) aracı sertifika uzantılarına pek takılmaz, dosyaları görevi belirterek `.pem` ismiyle saklar (Hepsi PEM formatındadır):

| Dosya Adı | Ne İşe Yarar? | Nginx / Apache Karşılığı |
|---|---|---|
| `privkey.pem` | Sadece Private Key | `ssl_certificate_key` |
| `cert.pem` | Sadece alan adınızın Sertifikası | Nadiren tek başına kullanılır |
| `chain.pem` | Let's Encrypt Kök ve Ara Sertifikaları | `ssl_trusted_certificate` |
| `fullchain.pem`| `cert.pem` + `chain.pem` (İkisi bir arada) | `ssl_certificate` |

---

## 📌 Hangi Uzantıyı Nereye Koymalıyım?

| İşlem / Platform | Doğru Uzantı Beklentisi |
|---|---|
| **Nginx / Apache** | .crt, .pem, .key |
| **Linux CA Listesi** (`/usr/local/share/ca-certificates/`)| KESİNLİKLE **`.crt`** (Debian/Ubuntu algılamaz)|
| **Windows Sunucu (IIS)** | `.pfx` |
| **Windows Client (Kişisel PC import)** | `.crt` VEYA `.p12` |
| **Java Tomcat / Wildfly** | `.p12` VEYA `.jks` |
| **CA Firmasına Gönderilecek Talep Formu** | `.csr` |
| **Apple Push / Modern API Key** | `.p8` |
| **E-Posta S/MIME** | `.p7b` VEYA `.p12` |

---

## 📚 Kaynaklar
- https://www.digicert.com/kb/ssl-support/openssl-quick-reference-guide.htm
- https://ssl-config.mozilla.org
- https://www.rfc-editor.org/rfc/rfc7292 (PKCS#12)
- https://www.rfc-editor.org/rfc/rfc5958 (PKCS#8)

> Sertifika oluşturma ve CA kurulumu için → `OpenSSL.md` ve `OpenSSL_CA.md` dosyalarına bakın.
