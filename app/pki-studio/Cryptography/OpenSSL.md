# 🔐 OpenSSL Sertifika Rehberi

> Self-Signed sertifika oluşturma, yönetme komutları.  
> Format dönüşümleri (.p12, .pfx, .der vb.) için → `certificate-extensions.md` dosyasına bakın.

---

## 1. Private Key Oluştur
```bash
openssl genrsa -out faruk.key 4096
```
> 4096 bit — Yüksek güvenlik

---

## 2. Private Key Kontrol Et
```bash
openssl rsa -in faruk.key -check
```

---

## 3. CSR Oluştur (SAN Dahil)

### Yöntem A — Hızlı (Tek Komut, Inline)
```bash
openssl req -new -key faruk.key -out guler.csr \
  -subj "/CN=bbb.guler.com" \
  -addext "subjectAltName=DNS:bbb.guler.com,DNS:*.guler.com"
```

### Yöntem B — Kurumsal (csr.conf ile)
Tüm ayarları ayrı bir dosyada tutmak okunabilirliği ve tekrar kullanımı artırır.

**1. `csr.conf` dosyasını oluştur:**
```ini
[req]
default_bits       = 4096
prompt             = no
distinguished_name = dn
req_extensions     = req_ext

[dn]
C  = TR
ST = Istanbul
L  = Istanbul
O  = Guler
OU = IT
emailAddress = admin@guler.com
CN = bbb.guler.com

[req_ext]
subjectAltName = @alt_names

[alt_names]
DNS.1 = bbb.guler.com
DNS.2 = *.guler.com
IP.1  = 192.168.1.100
```

**2. CSR'ı oluştur:**
```bash
openssl req -new -key faruk.key -out guler.csr -config csr.conf
```
> `prompt = no` sayesinde OpenSSL hiçbir soru sormaz; tüm değerler dosyadan okunur.

> Modern tarayıcılar SAN olmadan sertifikayı reddeder.

---

## 4. CSR Doğrula
```bash
openssl req -text -noout -verify -in guler.csr
```

---

## 5. Self-Signed Sertifika Oluştur
```bash
openssl x509 -req -days 3650 -in guler.csr \
  -signkey faruk.key \
  -out sertifika.crt \
  -sha256 \
  -copy_extensions copyall
```
> `-copy_extensions copyall` → SAN bilgilerini CSR'dan sertifikaya kopyalar. 10 yıl geçerli.

---

## 6. Sertifikayı Doğrula
```bash
openssl x509 -in sertifika.crt -text -noout
```
> Çıktıda `X509v3 Subject Alternative Name` görmelisiniz.

---

## 7. Sisteme Ekle (BBB için Zorunlu!)
```bash
sudo cp sertifika.crt /usr/local/share/ca-certificates/sertifika.crt
sudo update-ca-certificates
```
> Bu adım yapılmazsa BBB'nin kendi curl komutları sertifikayı reddeder.

---

## ⚡ Tek Komutla Hızlı Sertifika
```bash
openssl req -x509 -newkey rsa:4096 -nodes -sha256 -days 3650 \
  -keyout private.key \
  -out certificate.crt \
  -subj "/CN=bbb.guler.com" \
  -addext "subjectAltName=DNS:bbb.guler.com,DNS:*.guler.com"
```
> `-nodes` (no DES) → Private key **şifresiz** oluşturulur; Nginx/Apache restart sırasında şifre sorulmaz. Otomatik başlatma gereken sunucular için gereklidir.  
> ⚠️ **OpenSSL 3.x notu:** `-nodes` deprecated'dir; yerine `-noenc` kullanın. Her ikisi de çalışır.  
> Şifresiz key, SAN dahil, 10 yıllık — tam otomatik.

---

## 📦 Extras

### Public Key Oluştur
```bash
openssl rsa -in faruk.key -pubout -out faruk.pub
```

### Var Olan Sertifikadan Yeni CSR Oluştur
```bash
openssl x509 -x509toreq -sha256 -in sertifika.crt -out yeni.csr -signkey faruk.key
```

### Windows/IIS Formatına Çevir (.pfx / .p12)
```bash
openssl pkcs12 -export -out mycert.pfx -inkey faruk.key -in sertifika.crt
```

### PFX İçeriğini İncele
```bash
openssl pkcs12 -info -in mycert.pfx
```

### Key, CSR ve Sertifika Uyumunu Kontrol Et (Modulus Eşleştirme)
Anahtarın, imza isteğinin (CSR) ve sertifikanın aynı çifte ait olup olmadığını kontrol etmek için modüllerin MD5 özetleri karşılaştırılır (üç çıktı da aynı olmalıdır):
```bash
openssl rsa -noout -modulus -in faruk.key | openssl md5
openssl req -noout -modulus -in guler.csr | openssl md5
openssl x509 -noout -modulus -in sertifika.crt | openssl md5
```

### Uzak Sunucunun Sertifika Tarihlerini Göster
Bağlantının asılı kalmasını (hang) engellemek için `echo` ile pipe edilir:
```bash
echo | openssl s_client -connect bbb.guler.com:443 -servername bbb.guler.com 2>/dev/null \
  | openssl x509 -noout -dates
```

### Diffie-Hellman Parametresi Oluştur (PFS için)
```bash
openssl dhparam -out dhp-4096.pem 4096
```
> Nginx/WebRTC için Kusursuz İletim Gizliliği (Perfect Forward Secrecy) sağlar.

---

## 📚 Kaynaklar
- https://www.digicert.com/kb/csr-creation.htm
- https://www.digicert.com/easy-csr/openssl.htm
- https://ssl-config.mozilla.org
